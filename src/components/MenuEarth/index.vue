<script setup lang="ts">
import * as THREE from "three";
import { ref, onMounted, Ref } from "vue";
import { OrbitControls } from "three/examples/jsm/Addons.js";
let screenDom: Ref<HTMLElement | null> = ref(null);
let progress: Ref<number> = ref(0);

onMounted(() => {

// 创建场景
let scene = new THREE.Scene();
// 创建相机
let camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100000
);

camera.position.set(0, 80, 300);

// 创建渲染器
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// 将画布添加到页面中
if (screenDom.value !== null) {
    // 使用非空断言 ! 告诉 TypeScript 该值不会为 null
    screenDom.value.appendChild(renderer.domElement);
    // 进行后续操作
} else {
    // 处理值为 null 的情况
}

// 创建控制器
let controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;//自动旋转
controls.enableZoom = false; // 禁用缩放

// 创建星空的背景
scene.background = new THREE.Color(0x030311);

// 使用点材质创建星空效果
const vertices: number[] = [];
for (let i = 0; i < 500; i++) {
    const vertex = new THREE.Vector3();
    vertex.x = 800 * Math.random() - 400;
    vertex.y = 800 * Math.random() - 400;
    vertex.z = 800 * Math.random() - 400;
    vertices.push(vertex.x, vertex.y, vertex.z);
}

// 星空效果
let starsGeometry = new THREE.BufferGeometry();
starsGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(vertices), 3)
);

// 加载点材质纹理
const starsTexture = new THREE.TextureLoader().load("./stars.png");
const starsMaterial = new THREE.PointsMaterial({
    size: 2,
    sizeAttenuation: true, // 尺寸衰减
    color: 0x4d76cf,
    transparent: true,
    opacity: 1,
    map: starsTexture,
});

let stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);
stars.position.y = 30; // 通过修改 y 坐标将其向上移动

// 发光地球
let lightTexture = new THREE.TextureLoader().load("./earth.jpg");
let lightEarthGeometry = new THREE.SphereGeometry(53, 32, 32);
let lightEarthMaterial = new THREE.MeshBasicMaterial({
    map: lightTexture,
    alphaMap: lightTexture,
    blending: THREE.AdditiveBlending,
    transparent: true,
});
let lightEarth = new THREE.Mesh(lightEarthGeometry, lightEarthMaterial);
scene.add(lightEarth);
lightEarth.position.y = 30; // 通过修改 y 坐标将其向上移动

// 添加地球内外发光精灵
let spriteTexture = new THREE.TextureLoader().load("./glow.png");
let spriteMaterial = new THREE.SpriteMaterial({
    map: spriteTexture,
    color: 0x4d76cf,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
});
let sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(155, 155, 0);
scene.add(sprite);
sprite.position.y = 30; // 通过修改 y 坐标将其向上移动

// 内发光
let spriteTexture1 = new THREE.TextureLoader().load("./innerGlow.png");
let spriteMaterial1 = new THREE.SpriteMaterial({
    map: spriteTexture1,
    color: 0x4d76cf,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
});
let sprite1 = new THREE.Sprite(spriteMaterial1);
sprite1.scale.set(128, 128, 0);
scene.add(sprite1);
sprite1.position.y = 30; // 通过修改 y 坐标将其向上移动

function render() {
    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();

THREE.DefaultLoadingManager.onProgress = function (item, loaded, total) {
    console.log("item, loaded, total",item, loaded, total);
    const stringValue: string = new Number((loaded / total) * 100).toFixed(2); // 获取保留两位小数的字符串
    const numValue2: number = Number(stringValue); // 使用Number将字符串转换为数字类型
    progress.value = numValue2
    console.log("progress.value",progress.value);
    
};
});
</script>

<template>
<div class="home">
		<div class="canvas-container" ref="screenDom"></div>
		<div class="progress" v-if="progress != 100">
			<span>地球加载中：{{ progress }}%</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
body {
	background-color: #000;
}

.canvas-container {
	width: 100vw;
	height: 100vh;
}

.home {
	width: 100vw;
	height: 100vh;
	transform-origin: 0 0;
}

.progress {
	position: fixed;
	top: 0;
	left: 0;
	width: 1920px;
	height: 1080px;
	z-index: 101;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	color: #fff;
}
</style>