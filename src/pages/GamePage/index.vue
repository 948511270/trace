<script setup lang="ts">
import { getCurrentInstance, onMounted, onUpdated, onBeforeMount, ref, Ref } from 'vue';
import request from '@/utils/request'

// 获取$router对象
const instance = getCurrentInstance();
const router = instance?.proxy?.$router;


console.log("模式：", router?.currentRoute.value.query.mode);


let imageUrlRef: Ref<string | undefined> = ref(undefined);
const getScene = () => {

  request.get("http://192.168.98.1:3000/getScene")
    .then((res) => {
      console.log("res", res.data.buffer);

      // 他妈的，一开始 res.data.buffer.data数据是number类型数组，number数组不能转成blob
      const uint8Array = new Uint8Array(res.data.buffer.data);
      const blob = new Blob([uint8Array], { type: 'image/png' });
      imageUrlRef.value = URL.createObjectURL(blob)


    }).catch((err) => {
      console.log(err);

    })
}


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
  console.log("onMounted");
  getScene()
});
onUpdated(() => {
  // URL.revokeObjectURL(imageUrl);
  console.log("updated");
  console.log("imageUrlRef", imageUrlRef.value);
  // URL.revokeObjectURL(imageUrlRef.value as string)
})
onBeforeMount(() => {

})
</script>

<template>
  <div class="container">
    <img v-if="imageUrlRef" :src="imageUrlRef" alt="场景图片，请等待加载..." ref="containerDomRef" class="responsive-image"
      @load="adjustImageSize">

  </div>
</template>

<style scoped lang="scss">
body,
html {
  height: 100%;
  width: 100%;
  margin: 0;
  overflow: hidden;
}

.container {
  text-align: center;
  height: 33vh;

  .responsive-image {
    max-width: 100%;
    overflow: hidden;
    display: inline-block;
  }

}
</style>