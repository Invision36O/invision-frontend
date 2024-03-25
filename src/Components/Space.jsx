import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import './Space.css';


export default function ModelView() {

  const [roomData, setRoomData] = useState(null);
  const [models, setModels] = useState([]);
  const containerRef = useRef(null);
  const loadedModel = null;
  const cameraRef = useRef(null); 
  // Additional ref for tracking the selected model in the scene
  const selectedModelRef = useRef(null);
  
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const [selectedObject, setSelectedObject] = useState(null);
  const [isRotating, setIsRotating] = useState(false);
  const [indicator, setIndicator] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/space/getData');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRoomData(data);
      } catch (error) {
        console.error('Could not fetch room data:', error);
      }
    };

    fetchData();

    const fetchModels = async () => {
      try {
        const response = await fetch('http://localhost:3001/model/getModels');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setModels(data);
        console.log(data);
      } catch (error) {
        console.error('Could not fetch room data:', error);
      }
    };

    fetchModels();
  }, []); 


  function createTextSprite(text, color = '#FFF') {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '24px Arial';
    context.fillStyle = color;
    context.fillText(text, 50, 50);
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(10, 5, 1);
    return sprite;
  }

  const scene = useRef(new THREE.Scene()).current;
  scene.background = new THREE.Color(0x000000);// Dark background for better visibility

  useEffect(() => {
    if (!roomData) return;

    const container = containerRef.current;
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.set(0, 50, 50);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1).normalize();
    scene.add(directionalLight);

    // Load HDR environment map
    const loader = new RGBELoader();
    loader.setDataType(THREE.FloatType);
    loader.load(
      '../assets/environment/kloofendal_misty_morning_puresky_2k.hdr',
      (texture) => {
        const envSphere = new THREE.Mesh(
          new THREE.SphereGeometry(100, 32, 32),
          new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide })
        );
        scene.add(envSphere);

        const animate = () => {
          requestAnimationFrame(animate);

          if (loadedModel && loadedModel.scene) {
            loadedModel.scene.rotation.x += 0.00;
            loadedModel.scene.rotation.y += 0.00;
            loadedModel.scene.rotation.z += 0.00;

            envSphere.rotation.copy(loadedModel.scene.rotation);
            envSphere.position.copy(loadedModel.scene.position);
          }

          controls.update();
          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (error) => {
        console.error('Error loading HDR environment map:', error);
        scene.background = new THREE.Color(0xabcdef);
      }
    );

    // Define brick material here
    const brickTexture = new THREE.TextureLoader().load('/assets/patterned_brick_wall_02_diff_4k.jpg');
    const brickMaterial = new THREE.MeshPhongMaterial({ map: brickTexture, side: THREE.DoubleSide });

    // Load wood door texture
    const woodDoorTexture = new THREE.TextureLoader().load('/assets/door.jpg');
      const woodDoorMaterial = new THREE.MeshPhongMaterial({
      map: woodDoorTexture,
      // bumpMap: woodDoorBumpMap,
      // bumpScale: 0.05, // Adjust the scale for the right effect
      side: THREE.DoubleSide
    });

 
    // Loop through each room to create the floor, walls, and doors
    Object.entries(roomData.rooms).forEach(([roomName, roomDetails]) => {
      console.log('Room Details:', roomData.rooms.Terrace);
      // Floor creation
      const floorColor = new THREE.Color('grey'); 
      const floorGeometry = new THREE.PlaneGeometry(roomDetails.dimensions.width, roomDetails.dimensions.depth);
      const floorMaterial = new THREE.MeshPhongMaterial({ color: floorColor, side: THREE.DoubleSide });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2; 
      floor.position.set(
        roomDetails.position.x + roomDetails.dimensions.width / 2,
        0,
        roomDetails.position.z + roomDetails.dimensions.depth / 2
      );
      scene.add(floor);

      // Walls creation
      const wallThickness = 0.1;
      const wallHeight = roomDetails.dimensions.height;

      // Front and back walls
      const frontWallGeometry = new THREE.PlaneGeometry(roomDetails.dimensions.width, wallHeight);
      const frontWallMaterial = new THREE.MeshPhongMaterial({ map: brickTexture, side: THREE.DoubleSide });
      const frontWall = new THREE.Mesh(frontWallGeometry, frontWallMaterial);
      frontWall.position.set(
        roomDetails.position.x + roomDetails.dimensions.width / 2,
        wallHeight / 2,
        roomDetails.position.z
      );
      scene.add(frontWall);

      const backWallMaterial = new THREE.MeshPhongMaterial({ map: brickTexture, side: THREE.DoubleSide });
      const backWall = new THREE.Mesh(frontWallGeometry, backWallMaterial);
      backWall.position.set(
        roomDetails.position.x + roomDetails.dimensions.width / 2,
        wallHeight / 2,
        roomDetails.position.z + roomDetails.dimensions.depth
      );
      scene.add(backWall);

      // Side walls
      const sideWallGeometry = new THREE.PlaneGeometry(roomDetails.dimensions.depth, wallHeight);
      const leftWallMaterial = new THREE.MeshPhongMaterial({ map: brickTexture, side: THREE.DoubleSide });
      const leftWall = new THREE.Mesh(sideWallGeometry, leftWallMaterial);
      leftWall.position.set(
        roomDetails.position.x,
        wallHeight / 2,
        roomDetails.position.z + roomDetails.dimensions.depth / 2
      );
      leftWall.rotation.y = Math.PI / 2;
      scene.add(leftWall);

      const rightWallMaterial = new THREE.MeshPhongMaterial({ map: brickTexture, side: THREE.DoubleSide });
      const rightWall = new THREE.Mesh(sideWallGeometry, rightWallMaterial);
      rightWall.position.set(
        roomDetails.position.x + roomDetails.dimensions.width,
        wallHeight / 2,
        roomDetails.position.z + roomDetails.dimensions.depth / 2
      );
      rightWall.rotation.y = Math.PI / 2;
      scene.add(rightWall);
      
     
    });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

 

    const handleResize = () => {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    };

    window.addEventListener('resize', handleResize);


  return () => {
    window.removeEventListener('resize', handleResize);
  
  };

    
  }, [roomData]);

  
 useEffect(() => {
  const container = containerRef.current;

  const onSceneClick = (event) => {
    // Calculate mouse position in normalized device coordinates (-1 to +1) for both axes
    mouse.current.x = (event.clientX / container.clientWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / container.clientHeight) * 2 + 1;

    raycasterRef.current.setFromCamera(mouse.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const intersect = intersects[0].object;

      if (event.shiftKey && selectedObject) {
       
        loadModelIntoScene(selectedObject, intersects[0].point);
      } else {
        
        const model = intersects.find(intersect => intersect.object.isModel === true);
        if (model) {
          setSelectedObject(model.object);
          document.documentElement.style.cursor = 'grabbing'; // Update cursor immediately on click
        }
      }
    }
  };

  container.addEventListener('click', onSceneClick);

  return () => {
    container.removeEventListener('click', onSceneClick);
  };
}, [selectedObject]); 


useEffect(() => {
  const handleKeyDown = (event) => {
    // Ensure there's a selected object to manipulate
    if (!selectedObject) return;

    // Add 'PageUp' and 'PageDown' to the array of keys that prevent default actions
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', '+', '=', 'PageUp', 'PageDown'].includes(event.key)) {
      event.preventDefault();
    }

    let moveDistance = 0.09; // Movement distance

    switch (event.key) {
      case '+':
      case '=': // Scale up
        selectedObject.scale.x += 0.1;
        selectedObject.scale.y += 0.1;
        selectedObject.scale.z += 0.1;
        break;
      case '-': // Scale down
        selectedObject.scale.x -= 0.1;
        selectedObject.scale.y -= 0.1;
        selectedObject.scale.z -= 0.1;
        break;
      case 'ArrowUp': // Move forward
        selectedObject.position.z -= moveDistance;
        break;
      case 'ArrowDown': // Move backward
        selectedObject.position.z += moveDistance;
        break;
      case 'ArrowLeft': // Move left
        selectedObject.position.x -= moveDistance;
        break;
      case 'ArrowRight': // Move right
        selectedObject.position.x += moveDistance;
        break;
      case 'PageUp': // Move up
        selectedObject.position.y += moveDistance;
        break;
      case 'PageDown': // Move down
        selectedObject.position.y -= moveDistance;
        break;
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [selectedObject]); // This effect depends on selectedObject


useEffect(() => {
  // Key down and key up handlers to toggle rotation mode
  const handleKeyDown = (event) => {
    if (event.key === 'r' || event.key === 'R') {
      setIsRotating(true);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'r' || event.key === 'R') {
      setIsRotating(false);
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  };
}, []);

useEffect(() => {
  let lastX;

  const handleMouseMove = (event) => {
    if (!isRotating || !selectedObject) return;

    if (lastX !== undefined) {
      // Calculate mouse movement
      const deltaX = event.clientX - lastX;

      // Rotation speed factor
      const rotationSpeed = 0.01;

      // Apply rotation around the Y axis
      selectedObject.rotation.y += deltaX * rotationSpeed;
    }

    // Update lastX for the next movement event
    lastX = event.clientX;
  };

  if (isRotating) {
    window.addEventListener('mousemove', handleMouseMove);
  } else {
    window.removeEventListener('mousemove', handleMouseMove);
    lastX = undefined; // Reset lastX when not rotating
  }

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, [isRotating, selectedObject]);




  

  const handleDrop = (e) => {
    e.preventDefault();
    const destinationPath = e.dataTransfer.getData("application/my-app");
  
    // Assuming you have a function to load models by their path
    loadModelIntoScene(destinationPath);
  };


  const loadModelIntoScene = (path, position)=> {
    const loader = new GLTFLoader();
    const modelPath = `http://localhost:3001/${path.replace(/\\/g, '/')}`;
  
    console.log(`Loading model from: ${modelPath}`);
    
    loader.load(modelPath, (gltf) => {
      gltf.scene.position.set(position.x, position.y, position.z); // Set the model's position
      scene.add(gltf.scene);
        setSelectedObject(gltf.scene);
        console.log("Model added to the scene:", gltf.scene);
       
      },
      undefined, // Progress callback (optional)
      (error) => {
        console.error('An error happened while loading the model:', error);
        // Add a cube as a fallback or indicator
        addCubeToScene();
      }
    );
    document.documentElement.style.cursor = '';
  };
  
  const handleModelClick = (model) => {
    setSelectedObject(model.destinationPath); 
  document.documentElement.style.cursor = 'grabbing';
  };
  
  const addCubeToScene = () => {
    console.log("Attempting to add a cube to the scene"); // Debugging
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    scene.add(cube); // Assuming `scene` is the correct reference
    console.log("Cube added to the scene as a fallback/indicator.");
  };
  return (
    <>
    
   
  <div className="main-container">
    <div className="left-container">
      <div className="space">
        <div className="view">
        <div
  className="container" 
  ref={containerRef}
  onDragOver={(e) => e.preventDefault()}
  onDrop={handleDrop}
  style={{ margin: '3%', width: '700px', height: '520px' }}
/>
        </div>
        <a href="/map"><button className='button'>Upload Map</button></a>
      </div>
    </div>

    <div className="right-container">
      <div className="objlayout">
      <div className="models">
          {models.map((model, index) => (
            <div
              key={index}
             onClick={() => handleModelClick(model)}
             className="model-item"
           >
             <img src={`http://localhost:3001/${model.image}`} height={100} width={100} alt=""/>
       
           </div>
         ))}
      </div>
      </div>

    </div>

 
</div>

    </>
  );

};