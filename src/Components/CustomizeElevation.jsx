import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { useLocation } from 'react-router-dom';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './CustomizeElevation.css';
import Navbar from '../Layouts/Navbar';
import axios from 'axios';

export default function CustomizeElevation() {
  ;;
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const selectedObjectRef = useRef(null);
  const [objects, setObjects] = useState([]);
  const { state } = useLocation();
  const modelData = state?.modelData; 
  const serverUrl = 'http://localhost:3001';// This is the path you pass from the FrontElevationList component
 
  console.log(modelData)

  useEffect(() => {

    const fetchObjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/objects3D/objects');
        setObjects(response.data);
      } catch (error) {
        console.error('Failed to fetch objects:', error);
      }
    };

    fetchObjects();

    sceneRef.current = new THREE.Scene();
    const container = containerRef.current;
    cameraRef.current = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    cameraRef.current.position.z = 5;

    rendererRef.current = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(rendererRef.current.domElement);

    new OrbitControls(cameraRef.current, rendererRef.current.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    sceneRef.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    sceneRef.current.add(directionalLight);
  
    const gltfLoader = new GLTFLoader();
    const modelPath =modelData?.modelPath;
    const path=serverUrl+'/'+modelPath;
    console.log(path);
   // modelData.modelPath;
    gltfLoader.load(`${serverUrl}/${modelPath}`, (gltfScene) => {
      sceneRef.current.add(gltfScene.scene);
    }, undefined, error => {
      console.error('An error happened', error);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    const handleResize = () => {
      cameraRef.current.aspect = container.clientWidth / container.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(container.clientWidth, container.clientHeight);
    };

    const onObjectClick = (event) => {
      // Calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components
      const rect = containerRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width * 2 - 1;
      const y = -(event.clientY - rect.top) / rect.height * 2 + 1;
    
      const mouse = new THREE.Vector2(x, y);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);
      const intersects = raycaster.intersectObjects(sceneRef.current.children, true);
    
      if (intersects.length > 0) {
        let target = intersects[0].object;
    
        // Ascend through the parent objects until you find the root object or scene
        while (target.parent !== null && target.parent !== sceneRef.current) {
          target = target.parent;
        }
    
        selectedObjectRef.current = target;
      } else {
        // Deselect object when clicking on empty space if desired
        selectedObjectRef.current = null;
      }
    };
    
    containerRef.current.addEventListener('click', onObjectClick);
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    let ctrlPressed = false;

    // Enhance OrbitControls to disable during object rotation
    const orbitControls = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    orbitControls.enabled = true; // Enable by default
  
    document.addEventListener('keydown', (event) => {
      if (event.key === "Control") { // Detect Ctrl key press
        ctrlPressed = true;
        orbitControls.enabled = false; // Disable OrbitControls when Ctrl is pressed
      }
    });
  
    document.addEventListener('keyup', (event) => {
      if (event.key === "Control") { // Detect Ctrl key release
        ctrlPressed = false;
        orbitControls.enabled = true; // Re-enable OrbitControls
      }
    });
  
    const onMouseMove = (event) => {
      if (!selectedObjectRef.current || !ctrlPressed) return;
      
      // Only execute when Ctrl is pressed
      const deltaX = event.movementX;
      const deltaY = event.movementY;
      const rotationSpeed = 0.005; // Adjust as needed
  
      selectedObjectRef.current.rotation.y += deltaX * rotationSpeed;
      selectedObjectRef.current.rotation.x += deltaY * rotationSpeed;
  
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
  
    containerRef.current.addEventListener('mousemove', onMouseMove);
    


    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown',handleKeyDown);
      // document.removeEventListener('keyup');
      containerRef.current.removeEventListener('click', onObjectClick);
      containerRef.current.removeEventListener('mousemove', onMouseMove);
      if (containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [modelData]);

  const handleDragStart = (e, model) => {
    e.dataTransfer.setData("application/my-app", model.destinationPath);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const destinationPath = e.dataTransfer.getData("application/my-app");
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 2 - 1;
    const y = -(e.clientY - rect.top) / rect.height * 2 + 1;

    const vector = new THREE.Vector3(x, y, 0.5);
    vector.unproject(cameraRef.current);

    const raycaster = new THREE.Raycaster(cameraRef.current.position, vector.sub(cameraRef.current.position).normalize());
    const intersects = raycaster.intersectObjects(sceneRef.current.children, true);

    if (intersects.length > 0) {
      const position = intersects[0].point;
      loadModelIntoScene(destinationPath, position);
    }
  };

  const loadModelIntoScene = (path, position) => {
    const loader = new GLTFLoader();
    const modelPath = `http://localhost:3001/${path.replace(/\\/g, '/')}`;

    loader.load(
      `${basePath}${modelPath}`,
      (gltf) => {
        const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
        const size = boundingBox.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = 1.0 / maxDimension;
        gltf.scene.scale.set(scale, scale, scale);
        gltf.scene.position.copy(position);
        gltf.scene.userData.modelId = gltf.scene.uuid;
      gltf.scene.traverse(child => {
        if (child.isMesh) {
          child.userData.isSelectable = true;
        }
      });
      console.log(gltf.scene.userData)
        sceneRef.current.add(gltf.scene);
        
        selectedObjectRef.current = gltf.scene; // Keep reference to the current object

        rendererRef.current.render(sceneRef.current, cameraRef.current); // Render the scene
      },
      undefined,
      (error) => {
        console.error('An error happened while loading the model:', error);
      }
    );
  };

  useEffect(() => {
    const container = containerRef.current;
    const onSceneClick = (event) => {
      // Convert click position to normalized device coordinates
      mouse.current.x = (event.clientX / container.clientWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / container.clientHeight) * 2 + 1;
    
      // Update raycaster
      raycasterRef.current.setFromCamera(mouse.current, cameraRef.current);
    
      // Attempt to intersect selectable objects
      const intersects = raycasterRef.current.intersectObjects(scene.children, true);
    
      const selected = intersects.find(intersect => intersect.object.userData.isSelectable);
    
      if (selected) {
        // Here, 'selected' is your intersected model
        const model = selected.object;
        selectedObjectRef.current = model;
        console.log(model)
      } else {
        selectedObjectRef.current = null;
        console.log("didnot find anything")
      }
    };
  
    container.addEventListener('click', onSceneClick);
  
    return () => {
      container.removeEventListener('click', onSceneClick);
    };
  }, [sceneRef.scene, selectedObjectRef]);

  const handleKeyDown = (event) => {
    if (!selectedObjectRef.current) return;
    const step = 0.1; // Step size for moving the object
    const scaleStep = 0.0001;
      const rotationStep = Math.PI / 180 * 5;
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();//
        selectedObjectRef.current.position.y += step;
        break;
      case 'ArrowDown':
        event.preventDefault();//
        selectedObjectRef.current.position.y -= step;
        break;
      case 'ArrowLeft':
        event.preventDefault();//
        selectedObjectRef.current.position.x -= step;
        break;
      case 'ArrowRight':
        event.preventDefault();//
        selectedObjectRef.current.position.x += step;
        break;
      case '+':
          if (event.ctrlKey) { 
            event.preventDefault();// Scale up the object
            selectedObjectRef.current.scale.x += scaleStep;
            selectedObjectRef.current.scale.y += scaleStep;
            selectedObjectRef.current.scale.z += scaleStep;
          }
          break;
      case '-':
          if (event.ctrlKey) {
            event.preventDefault(); // Scale down the object
            selectedObjectRef.current.scale.x -= scaleStep;
            selectedObjectRef.current.scale.y -= scaleStep;
            selectedObjectRef.current.scale.z -= scaleStep;
          }
          break;
      case 'Q': // Rotate left around Y axis
      selectedObjectRef.current.rotation.y -= rotationStep;
      break;
    case 'E': // Rotate right around Y axis
      selectedObjectRef.current.rotation.y += rotationStep;
      break;
    case 'W': // Rotate up around X axis
      selectedObjectRef.current.rotation.x -= rotationStep;
      break;
    case 'S': // Rotate down around X axis
      selectedObjectRef.current.rotation.x += rotationStep;
      break;
    case 'A': // Roll left around Z axis
      selectedObjectRef.current.rotation.z += rotationStep;
      break;
    case 'D': // Roll right around Z axis
      selectedObjectRef.current.rotation.z -= rotationStep;
      break;
        default:
          break;
    
   
    }
    rendererRef.current.render(sceneRef.current, cameraRef.current); // Re-render the scene after moving the object
  };
  return (
  <div className='customize-elevation-app'>
    {/* <Navbar /> */}
    <div className="customize-elevation">
      <div
        ref={containerRef}
        className="model-container"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* Your 3D model container */}
      </div>
      <aside className="sidebar">
        <div className="catalogue-container">
          <h3>Catalogue</h3>
          <div className="catalogue-grid">
            {objects.map((object, index) => (
              <div
                key={index}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, object)}
                className="catalogue-item"
              >
                <img src={`http://localhost:3001/${object.imagepath}`} alt={object.name} />
                <div className="catalogue-item-title">{object.name}</div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  </div>
);

  
}