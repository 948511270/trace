<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import MenuEarth from '@/components/MenuEarth/index.vue'

// 获取$router对象
const instance = getCurrentInstance();
const router = instance?.proxy?.$router;

  
const handleClick: (mode: number) => void = (mode) => {
  router?.push({
	name:'GamePage',
	query:{
		mode:mode
	}
  })
  
};


</script>

<template>
	<div class="container">
		<img src="@/assets/coollogo_com-11210134.jpg" alt="标题" id="menu-title">
		<MenuEarth id="menu-earth"></MenuEarth>
		<div class="button-bar">
			<div class="custom-button" @click="handleClick(1)">场景——国家（文字）</div>
			<div class="custom-button" @click="handleClick(2)">场景——距离（点击）</div>
			<div class="custom-button" @click="handleClick(3)">场景——国家（轮廓）</div>
			<div class="custom-button" @click="handleClick(4)">首都名称——方向（上下左右）</div>
		</div>

	</div>
</template>

<style scoped lang="scss">
.container {
	#menu-earth {
		position: relative;
	}

	#menu-title {
		position: absolute;
		transform: scale(2);
		top: 5vh;
		left: 38vw;
		z-index: 999;
	}

	.button-bar {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		/* 使用负偏移的百分比将元素居中 */
		top: 79vh;
		width: 80vw;
		z-index: 999;

		.custom-button {
			margin: 0 0 2vh 0;
			padding: 10px 20px;
			/* 按钮内边距 */
			border: 2px solid white;
			/* 白色边框 */
			border-radius: 20px;
			/* 椭圆圆角 */
			background-color: #ffffff;
			/* 白色背景 */
			box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
			/* 灰色阴影向内 */
			color: #000000;
			/* 按钮文字颜色 */
			font-size: 16px;
			/* 字体大小 */
			cursor: pointer;
			/* 鼠标样式为手型 */
			outline: none;
			/* 去除默认的焦点样式 */
			text-align: center;
			/* 文字居中 */
			line-height: 1;
			/* 保证文字在按钮中垂直居中 */
			transition: all 0.3s ease;
			/* 过渡效果，可根据需要调整 */
		}

		.custom-button:hover {
			box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);
			/* 悬停时的阴影效果 */
		}
	}



}
</style>