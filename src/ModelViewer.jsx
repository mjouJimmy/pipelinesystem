import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ModelViewer = () => {
  const mountRef = useRef(null);

  const cloneModel = (scene, obj, x, y, z, num) => {
    const cloneObj = obj.clone();
    cloneObj.position.set(x, y, z);
    scene.add(cloneObj);
  }

  useEffect(() => {
    // 创建场景、相机和渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff); // 设置为灰色
    mountRef.current.appendChild(renderer.domElement);

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(directionalLight);

    // 加载 GLB 模型
    const loader = new GLTFLoader();
    loader.load('/demo.glb', (glb) => {
      cloneModel(scene, glb.scene,0,0,0);
      cloneModel(scene, glb.scene,1.2,0,0);
      cloneModel(scene, glb.scene,2.4,0,0);
      cloneModel(scene, glb.scene,3.6,0,0);
      cloneModel(scene, glb.scene,4.8,0,0);
      cloneModel(scene, glb.scene,6,0,0);
    }, undefined, (error) => {
      console.error(error);
    });

    // 设置相机位置
    camera.position.set(7, 2, 4);
    camera.rotateY(0.7)

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // 清理
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ModelViewer;