<template>
  <div class="model-box">
    <div ref="modelbox" class="w-full h-full relative overflow-hidden">
      <div
        v-if="!loaded"
        class="absolute h-full left-0 w-full text-center z-10 flex justify-center items-center flex-col pointer-events-none text-gray-500 font-bold"
      >
        {{ loading }}
        <p class="text-gray-500 text-xs">模型加载中</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, inject, ref } from "vue";

import { OrbitControls } from '../utils/OrbitControls';
import { GLTFLoader } from '../utils/GLTFLoader'
import { RGBELoader } from '../utils/RGBELoader'
// const OrbitControls = require('three/examples/jsm/controls/OrbitControls.js');

import * as THREE from 'three'
// const THREE = window.THREE
console.log(THREE.glTFLoader)
console.log(OrbitControls, "OrbitControls");
// 模型加载的dom
const modelbox = ref(null);

const init = () => {
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 1;

  const scene = new THREE.Scene();

  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const material = new THREE.MeshNormalMaterial();

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const loader = new GLTFLoader().setPath('/');
  loader.load('astronaut.gltf', function (gltf) {

    scene.add(gltf.scene);


  });

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(modelbox.value.clientWidth - 10, modelbox.value.clientHeight);
  renderer.setAnimationLoop(animation);
  // document.body.appendChild( renderer.domElement );
  modelbox.value.appendChild(renderer.domElement);

  // animation

  function animation(time) {

    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    renderer.render(scene, camera);

  }
}
onMounted(() => {
  init()
})
</script>
<style scoped>
.model-box {
  height: 100%;
  width: 100%;
  background-color: transparent;
  position: relative;
  box-sizing: border-box;
  perspective: 800px;
  padding: 10px;
}
.bgimg {
  transform: translateY(0);
}
</style>