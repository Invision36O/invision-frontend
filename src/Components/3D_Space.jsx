import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './Space.css'; 
import { TextureLoader } from 'three';


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

  useEffect(() => {
    if (!roomData) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Dark background for better visibility

    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.set(0, 50, 50);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

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

    // Load textures for the wall and the floor
    const brickTexture = new THREE.TextureLoader().load('/assets/brick_wall_006_diff_4k.jpg');
    // Replace with the path to your brick texture image
    const brickMaterial = new THREE.MeshPhongMaterial({ map: brickTexture });
    
    // Loop through each room to create the floor and walls
    Object.entries(roomData.rooms).forEach(([roomName, roomDetails]) => {
      // Floor creation
      const floorColor = new THREE.Color('grey'); // Grey color for the floor
      const floorGeometry = new THREE.PlaneGeometry(roomDetails.dimensions.width, roomDetails.dimensions.depth);
      const floorMaterial = new THREE.MeshPhongMaterial({ color: floorColor, side: THREE.DoubleSide });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2; // Rotate to lie flat
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
      const frontWall = new THREE.Mesh(frontWallGeometry, brickMaterial);
      frontWall.position.set(
        roomDetails.position.x + roomDetails.dimensions.width / 2,
        wallHeight / 2,
        roomDetails.position.z
      );
      scene.add(frontWall);

      const backWall = new THREE.Mesh(frontWallGeometry, brickMaterial);
      backWall.position.set(
        roomDetails.position.x + roomDetails.dimensions.width / 2,
        wallHeight / 2,
        roomDetails.position.z + roomDetails.dimensions.depth
      );
      scene.add(backWall);

      // Side walls
      const sideWallGeometry = new THREE.PlaneGeometry(roomDetails.dimensions.depth, wallHeight);
      const leftWall = new THREE.Mesh(sideWallGeometry, brickMaterial);
      leftWall.position.set(
        roomDetails.position.x,
        wallHeight / 2,
        roomDetails.position.z + roomDetails.dimensions.depth / 2
      );
      leftWall.rotation.y = Math.PI / 2;
      scene.add(leftWall);

      const rightWall = new THREE.Mesh(sideWallGeometry, brickMaterial);
      rightWall.position.set(
        roomDetails.position.x + roomDetails.dimensions.width,
        wallHeight / 2,
        roomDetails.position.z + roomDetails.dimensions.depth / 2
      );
      rightWall.rotation.y = Math.PI / 2;
      scene.add(rightWall);

      // Room label
      const label = createTextSprite(roomName);
      label.position.set(
        roomDetails.position.x + roomDetails.dimensions.width / 2,
        wallHeight + 1,
        roomDetails.position.z + roomDetails.dimensions.depth / 2
      );
      scene.add(label);
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

    return () => window.removeEventListener('resize', handleResize);
  }, [roomData]);

  return (
    <div className='view'>
      <div className='container' ref={containerRef} style={{ width: '800px', height: '620px', border: '3px solid', boxShadow: '5px 5px 4px' }}/>
    </div>
  );
}
