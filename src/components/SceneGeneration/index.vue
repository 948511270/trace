<script setup lang="ts">
import {  onMounted, ref, Ref} from 'vue';
import request from '@/utils/request'
import emitter from '@/utils/bus';

// 获取场景图片 
let imageUrlRef: Ref<string | undefined> = ref(undefined);
const getScene = () => {

  request.get("http://192.168.98.1:3000/getScene")
    .then((res) => { 
      // 他妈的，一开始 res.data.buffer.data数据是number类型数组，number数组不能转成blob
      const uint8Array = new Uint8Array(res.data.buffer.data);
      const blob = new Blob([uint8Array], { type: 'image/png' });
      imageUrlRef.value = URL.createObjectURL(blob)
      // 将正确答案从SceneGeneration组件传给ButtonInteracion组件    
      emitter.emit('sendAnswer',res.data.placename)
    }).catch((err) => {
      console.log(err);

    })
}

// 调整场景图片大小
const containerDomRef = ref<HTMLElement | null>(null);
const containerWidthRef = ref<number>(0);
const containerHeightRef = ref<number>(0);

const adjustImageSize = () => { 
  const container = containerDomRef.value;
  if (container) {
    containerWidthRef.value = container.clientWidth;
    containerHeightRef.value = container.clientHeight;
  }

  const img = new Image();
  img.src = imageUrlRef.value as string;

  img.onload = () => {
    
    if (containerDomRef.value) {
      containerDomRef.value.style.width = '100%';
      containerDomRef.value.style.height = '100%';
    }
  };
}

onMounted(() => {
  getScene()
});

</script>

<template>
<div class="scene">
    <img v-if="imageUrlRef" :src="imageUrlRef" alt="场景图片，请等待加载..." ref="containerDomRef" class="responsive-image"
      @load="adjustImageSize">
  </div>
</template>

<style scoped lang="scss">
.scene{
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}
</style>