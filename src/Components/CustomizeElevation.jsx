import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './CustomizeElevation.css'; // Assuming you have this CSS file ready
import Navbar from '../Layouts/Navbar';
import axios from 'axios';

export default function CustomizeElevation() {
  const containerRef = useRef(null);
  const folderPath = 'http://localhost:3001/modeluploads/modern_home_elevation_2';
  const [objects, setObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);

  useEffect(() => {

    const fetchObjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/objects3D/objects'); // Adjust this URL to match your actual API endpoint
        setObjects(response.data); // Assuming the response data is the array of objects
      } catch (error) {
        console.error('Failed to fetch objects:', error);
      }
    };

    fetchObjects();

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5; 

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0); // the default
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    new OrbitControls(camera, renderer.domElement);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(`${folderPath}/model.gltf`, (gltfScene) => {
      scene.add(gltfScene.scene);
    }, undefined, error => {
      console.error('An error happened', error);
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  const handleObjectClick = async (object) => {
    try {
      setSelectedObject(object);
      // Assuming 'object.destinationPath' is the URL to the GLTF model file
      // You may need to modify this if your path is different or requires additional processing
      const response = await axios.get(object.destinationPath);
      console.log(response)
    } catch (error) {
      console.error('Error fetching object details:', error);
    }
  };


  return (
    <div className='Navbar'>
    <Navbar /> {/* Assuming Navbar is your navigation component */}
    <div className="customize-elevation">
      <div ref={containerRef} className="model-container">
        {/* THREE.js scene will be attached to this container */}
      </div>
      <aside className="sidebar">
        <h3>Catalogue</h3>
        <ul>
          {objects.map(object => (
            <li key={object._id} onClick={() => handleObjectClick(object)}>
              {object.name}
              {/* Additional elements can be added here if needed */}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  </div>
  );
}
