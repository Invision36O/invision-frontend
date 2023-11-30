import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import './Space.css';
import axios from 'axios';


export default function ModelView() {

    const [roomData, setRoomData] = useState(null);
    const containerRef = useRef(null);
    const loader = new RGBELoader();

    useEffect(() => {

        const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:3001/getData');
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
            const data = await response.json();
            console.log(data);
            setRoomData(data);
            // console.log(roomData);
    
            } catch (error) {
              console.error("Could not fetch room data:", error);
            }
          };

    fetchData();

    },[]);

useEffect(() =>{
    if (!roomData) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 600);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
 
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1, 1, 2);
    scene.add(directionalLight);
    
    loader.setDataType(THREE.FloatType);
    loader.load(
      '../assets/environment/kloofendal_misty_morning_puresky_2k.hdr',
      (texture) => {
        Object.entries(roomData.rooms).forEach(([name, details], index) => {
            if (!details.dimensions || !details.position) {
              console.warn(`Room data for '${name}' is incomplete.`);
              return;
            }
            const [width, depth] = details.dimensions.split('x').map(Number);
            const geometry = new THREE.BoxGeometry(width, 2.5, depth);
            const material = new THREE.MeshPhongMaterial({
              color: 0x5A5A5A,
              transparent: true,
              opacity: 0.5,
              side: THREE.DoubleSide,
            });
            const roomMesh = new THREE.Mesh(geometry, material);
          
            // Increment the z value for each room to create separation
            roomMesh.position.set(details.position.x, 1.25, index * 5);
          
            console.log(`Room ${name}:`, roomMesh.position, details.dimensions);
          
            scene.add(roomMesh);
          });
          

        const envSphere = new THREE.Mesh(
          new THREE.SphereGeometry(100, 32, 32),
          new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide })
        );
        scene.add(envSphere);

        const animate = () => {
          requestAnimationFrame(animate);
        
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

  }, [roomData]);


  return (
    <div className='view'>

<div className='container' ref={containerRef} style={{minHeight:'200',minWidth:'300',width: '800px',height: '620px', border: '3px solid', boxShadow:'5px 5px 4px'}}/>
    </div>
  );
}
