import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import './ModelView.css';

export default function CustomizeElevation() {
  const containerRef = useRef(null);
  const staticModelURL = 'C://FYP//invision-backend//modeluploads//scene.gltf'; // Replace with your actual model URL

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    new OrbitControls(camera, renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(staticModelURL, (gltfScene) => {
      scene.add(gltfScene.scene);
      gltfScene.scene.position.set(0, 0, 0);
    });

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 0);
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
  }, [staticModelURL]);

  return (
    <div className="modelview">
      <div className="container" ref={containerRef} style={{ minHeight: '200px', minWidth: '300px', width: '800px', height: '620px' }} />
    </div>
  );
}
