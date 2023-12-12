import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import './ModelView.css';
import axios from 'axios';
export default function ModelView() {

  const [modelURL, setModelURL] = useState(null);
  const handleImageChange = async (event) => {
    console.log("Upload File")
    const files = event.target.files;
  
    if (files.length > 0) {
      const formData = new FormData();
  
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }
  
      try {
        const response = await axios.post('http://localhost:3001/model/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
          const modelURL = response.data.subfolderpath;
          setModelURL(modelURL);
          console.log(modelURL)
        } else {
          console.error('Model upload failed:', response.data.error);
        }
      } catch (error) {
        console.error('Error uploading Model:', error);
      }
    }
 };
  
 const uploadFolder = async (event) => {
  console.log("Upload Folder")
  const files = event.target.files;

  if (files.length > 0) {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }

    try {
      const response = await axios.post('http://localhost:3001/model/uploadzip', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const modelURL = `uploads/` + response.data.files;
        setModelURL(modelURL);
        console.log(modelURL)
      } else {
        console.error('Model upload failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error uploading Model:', error);
    }
  }
};

  const containerRef = useRef(null);

  useEffect(() => {

    if(modelURL){

    const container = containerRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 600);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const backendURL = `http://localhost:3001/`;
    console.log(backendURL+modelURL)

    let loadedModel;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(backendURL+modelURL, (gltfScene) => {
      loadedModel = gltfScene;

      gltfScene.scene.rotation.y = Math.PI / 8;
      gltfScene.scene.position.y = 3;
      gltfScene.scene.scale.set(1, 1, 1);
      scene.add(gltfScene.scene);
    });
 
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1, 1, 2);
    scene.add(directionalLight);

    const loader = new RGBELoader();
    loader.setDataType(THREE.FloatType);
    loader.load('../assets/environment/kloofendal_misty_morning_puresky_2k.hdr',(texture) => {
        
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

    const handleResize = () => {
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

    }
  }, [modelURL]);

  return (
    <div className='color'>
    <div className='buttons'>
<input type="file" accept=".gltf,.glb" style={{ display: 'none' }} onChange={handleImageChange} id="modelFileInput" />
<button className="import-btn" onClick={() => document.getElementById('modelFileInput').click()}>Upload Model</button>

<input type="file" accept=".zip" style={{ display: 'none' }} onChange={uploadFolder} id="folderFileInput" />
<button className="import-btn" onClick={() => document.getElementById('folderFileInput').click()}>Upload Folder</button>
</div>

<div className='container' ref={containerRef} style={{minHeight:'200',minWidth:'300',width: '800px',height: '620px', border: '3px solid', boxShadow:'5px 5px 4px'}}/>
    </div>
  );
}
