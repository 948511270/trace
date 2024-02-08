<script setup lang="ts">
import { getCurrentInstance, onMounted, onUpdated, onBeforeMount } from 'vue';
import SceneGeneration from '@/components/SceneGeneration/index.vue';
import ButtonInteracion from '@/components/ButtonInteraction/index.vue';


// 获取$router对象
const instance = getCurrentInstance();
const router = instance?.proxy?.$router;
const mode = router?.currentRoute.value.query.mode
// console.log("模式：", router?.currentRoute.value.query.mode);

onMounted(() => {

});
onUpdated(() => {

})
onBeforeMount(() => {

})
</script>

<template>
  <!-- 如果mode是1，2，3时，才需要显示场景 -->
  <div class="scene-generation" v-if="mode === '1' || mode === '2' || mode === '3'">
    <!-- 如果选择的是第一个：场景——国家（文字） -->
    <template v-if="mode === '1'">
      <scene-generation></scene-generation>
      
    </template>
      
  </div>
  <div class="button-interacion">
    <!-- 如果选择的是第一个：场景——国家（文字） -->
    <template v-if="mode === '1'">
      <button-interacion></button-interacion>
    </template>
      
  </div>
</template>

<style scoped lang="scss">
body,
html {
  height: 100%;
  width: 100%;
  margin: 0;
  font-family: Arial, sans-serif;
  text-align: center;
}

// 和scene-generation组件有关的css
.scene-generation {
  text-align: center;
  height: 33vh;
}

.button-interacion{
  position: fixed;
  bottom: 0;
  text-align: center;
  width: 100%;
  height: 67vh;
}

/* 添加媒体查询以适配小屏幕设备 */
@media screen and (max-width: 600px) {
  button {
    width: 100%;
  }
}
</style>