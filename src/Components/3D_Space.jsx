import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './Space.css';

export default function ModelView() {
  const [roomData, setRoomData] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/getData');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRoomData(data);
      } catch (error) {
        console.error("Could not fetch room data:", error);
      }
    };

    fetchData();
  }, []);

  function createTextSprite(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '24px Arial';
    context.fillStyle = 'rgba(255, 255, 255, 1)';
    context.fillText(text, 50, 50);
  
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(10, 5, 1);
  
    return sprite;
  }

  
  

  useEffect(() => {
    if (!roomData) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Set a dark background

    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.set(0, 50, 50); // Adjusted camera position for better view
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x000000); // Set clear color to black
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    new OrbitControls(camera, renderer.domElement);

    // Add an AxesHelper to visualize the axes
    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    // Add a GridHelper to visualize the grid on the floor
    const gridHelper = new THREE.GridHelper(100, 100);
    scene.add(gridHelper);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1).normalize();
    scene.add(directionalLight);

    // Random color function
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    // Create room meshes based on the new data format
    // Assuming roomData is in the correct format with position being the bottom-left corner of each room
    Object.entries(roomData.rooms).forEach(([name, { dimensions, position }]) => {
      const geometry = new THREE.BoxGeometry(dimensions.width, dimensions.height, dimensions.depth);
      const material = new THREE.MeshPhongMaterial({ color: getRandomColor() });
      const roomMesh = new THREE.Mesh(geometry, material);
    
      const halfWidth = dimensions.width / 2;
      const halfDepth = dimensions.depth / 2;
      roomMesh.position.set(position.x + halfWidth, dimensions.height / 2, position.z + halfDepth);
      
      console.log(`${name} position: `, roomMesh.position); // Log to debug
      
      scene.add(roomMesh);

      const label = createTextSprite(name);
      label.position.set(
        position.x + halfWidth, // x position
        dimensions.height + 1,  // slightly above the room mesh
        position.z + halfDepth  // z position
      );
      scene.add(label);
    });
    

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
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

  return (
    <div className='view'>
      <div className='container' ref={containerRef} style={{ width: '800px', height: '620px', border: '3px solid', boxShadow: '5px 5px 4px' }}/>
    </div>
  );
}
