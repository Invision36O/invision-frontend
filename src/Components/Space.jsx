import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './Space.css';

export default function ModelView() {
  const containerRef = useRef(null);
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/getData');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRoomData(data);
        console.log(data)
         // This will trigger a re-render
      } catch (error) {
        console.error("Could not fetch room data:", error);
      }
    };

    fetchData();
  }, []);

  // Create the 3D models when roomData is available
  useEffect(() => {
    if (!roomData) return; // Skip if roomData is not yet loaded

    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xabcdef);

    const aspectRatio = container.offsetWidth / container.offsetHeight;
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
    camera.position.set(0, 50, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1, 1, 2);
    scene.add(directionalLight);

    // Process and add room meshes using roomData
    Object.entries(roomData.rooms).forEach(([name, details]) => {
      if (!details.dimensions || !details.position) {
        console.warn(`Room data for '${name}' is incomplete.`);
        return;
      }
      const [width, depth] = details.dimensions.split('x').map(Number);
      const geometry = new THREE.BoxGeometry(width, 2.5, depth);
      const material = new THREE.MeshPhongMaterial({
        color: Math.random() * 0xffffff,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
      });
      const roomMesh = new THREE.Mesh(geometry, material);
      roomMesh.position.set(details.position.x, 1.25, details.position.z);
      scene.add(roomMesh);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

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
      container.removeChild(renderer.domElement);
    };
  }, [roomData]); // This effect runs whenever roomData changes

  return (
    <div className='view'>
      <div className='container' ref={containerRef} style={{ minHeight: '200px', minWidth: '300px', width: '800px', height: '620px', border: '3px solid', boxShadow: '5px 5px 4px' }}/>
    </div>  
  );
}