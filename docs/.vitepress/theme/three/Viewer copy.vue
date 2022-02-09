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

import * as THREE from 'three'
import OrbitControls from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// 模型loader
const MANAGER = new THREE.LoadingManager();
const THREE_PATH = `https://unpkg.com/three@0.${THREE.REVISION}.x`
const DRACO_LOADER = new DRACOLoader(MANAGER).setDecoderPath(`${THREE_PATH}/examples/js/libs/draco/gltf/`);
const KTX2_LOADER = new KTX2Loader(MANAGER).setTranscoderPath(`${THREE_PATH}/examples/js/libs/basis/`);

// 节流
const throttle = (fn, wait = 100) => {
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null;
      }, wait);
    }
  };
};

// 模型加载的dom
const modelbox = ref(null);
// 加载进度
const loading = ref('0%');
// 加载完成
const loaded = ref(false);

let camera, scene, renderer;

// 初始化
function init() {
  const container = document.createElement('div');
  modelbox.value.appendChild(container);
  // 创建场景
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(modelbox.value.clientWidth - 10, modelbox.value.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // 色调映射的曝光级别
  renderer.toneMappingExposure = 1;
  // 定义渲染器的输出编码
  renderer.outputEncoding = THREE.sRGBEncoding;
  // 自动清除
  renderer.autoClear = true;

  container.appendChild(renderer.domElement);
  // 创建相机
  camera = new THREE.PerspectiveCamera(50, modelbox.value.clientWidth / modelbox.value.clientHeight, 0.1, 1000);
  // camera.position.set(0, 100, 0);
  // camera.zoom = 30

  // 环境设置
  const environment = new RoomEnvironment();
  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  scene = new THREE.Scene();
  // scene.background = new THREE.Color(0xbbbbbb);
  scene.environment = pmremGenerator.fromScene(environment).texture;
  // 网格
  /* const grid = new THREE.GridHelper(50, 10, 0xffffff, 0xffffff);
  grid.material.opacity = 0.5;
  grid.material.depthWrite = false;
  grid.material.transparent = true;
  scene.add(grid);*/
  // 加载模型
  loadModel();
  // 光源
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 10, 1);
  scene.add(light);

  // 创建控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render); // use if there is no animation loop
  controls.minDistance = 400;
  controls.maxDistance = 400;
  // 设置相机位置
  controls.target.set(0, modelbox.value.scrollHeight / 3, 0);
  controls.enableZoom = false;
  // controls.enableRotate = false
  controls.autoRotate = true;
  // 相机移动
  controls.enablePan = false 

  // 固定垂直角度
  controls.maxPolarAngle = Math.PI / 2
  controls.minPolarAngle = Math.PI / 2


  // 水平角度
  controls.minAzimuthAngle = Math.PI * 0.3
  controls.maxAzimuthAngle = Math.PI * 0.6
  controls.update();

  window.addEventListener('resize', onWindowResize);

}
// 加载模型
const loadModel = () => {
  const loader = new GLTFLoader();
  loader.setCrossOrigin('anonymous')
    .setDRACOLoader(DRACO_LOADER)
    .setKTX2Loader(KTX2_LOADER.detectSupport(renderer))
    .setMeshoptDecoder(MeshoptDecoder);

  loader.load('/astronaut.gltf', (gltf) => {

    // coffeemat.glb was produced from the source scene using gltfpack:
    // gltfpack -i coffeemat/scene.gltf -o coffeemat.glb -cc -tc
    // The resulting model uses EXT_meshopt_compression (for geometry) and KHR_texture_basisu (for texture compression using ETC1S/BasisLZ)
    var box = new THREE.Box3();
    //通过传入的object3D对象来返回当前模型的最小大小，值可以使一个mesh也可以使group
    box.expandByObject(gltf.scene);

    const box1 = new THREE.Box3().setFromObject(gltf.scene);
    let x = box.max.x - box.min.x;
    let y = box.max.y - box.min.y;
    // 获取模型最大边然后设置缩放比例
    let _size = 300 / Math.abs(x);
    if (y > x) {
      _size = 300 / Math.abs(y);
    }
    let yPosition = Math.abs((box.min.y)) * _size
    let zPosition = box.min.y * _size * 0
    console.log(gltf.scene, box1, "box size", x, y, _size, yPosition, box.min.y);
    // 位置
    gltf.scene.position.x = 0
    gltf.scene.position.z = 0
    gltf.scene.position.y = zPosition;
    // 模型按比例缩放
    gltf.scene.scale.set(_size, _size, _size);

    scene.add(gltf.scene);

    loaded.value = true;
    render();

  }, throttle((xhr) => {
    if (xhr.lengthComputable) {
      const percentComplete = xhr.loaded / xhr.total * 100
      loading.value = Math.round(percentComplete, 2) + '%';
    }
  }, 100), function ( error ) {
		console.log('An error happened', error );
	});
}

// 渲染
function onWindowResize() {
  if(modelbox.value) {
    camera.aspect = modelbox.value.clientWidth / modelbox.value.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(modelbox.value.clientWidth, modelbox.value.clientHeight);
    render();
  } else {
    window.removeEventListener('resize', onWindowResize);
  }
  
}

// 渲染
function render() {
  renderer.render(scene, camera);
}
// 初始化并加载模型
const loadModelManual = () => {
  init();
  render();
}

onMounted(() => {
  loadModelManual()
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