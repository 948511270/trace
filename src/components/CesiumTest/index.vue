<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as Cesium from 'cesium'


const viewerRef = ref();
onMounted(async () => {
    try {

        await createCesium();
        await searchFunc()

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})

const createCesium = async () => {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwODExNTllMi1lZWVjLTRkOTQtODZiNS0wOTZhMzA5ODE4ZDUiLCJpZCI6MTc5Njc1LCJpYXQiOjE3MDA1MzY2ODB9.JiWqQqzYd1yiBuWAQFQ7chCyx4n-FG4D9yYrJcRIBO8'
    viewerRef.value = new Cesium.Viewer('cesiumContainer', {
        navigationHelpButton: false, // 隐藏帮助按钮
        animation: false, // 隐藏动画控制
        timeline: false, // 隐藏时间轴
        geocoder: true,//隐藏搜索框
        homeButton: false,//隐藏回家按钮
        fullscreenButton: false,//隐藏全屏按钮
        sceneModePicker: false,
        baseLayerPicker: false,

    })
    // 隐藏cesium的logo
    if (viewerRef.value.cesiumWidget.creditContainer instanceof HTMLElement) {
        viewerRef.value.cesiumWidget.creditContainer.style.display = 'none'
    }

}


const searchFunc = async () => {
    // 获取 Geocoder 控件
    if (viewerRef.value) {

        let geocoder = viewerRef.value.geocoder;
        // 设置 Geocoder 的查询关键字
        var searchKeyword = 'Kenya'; // 你要搜索的关键字
        geocoder.viewModel.searchText = searchKeyword;
        // 执行 Geocoder 的搜索
        geocoder.viewModel.search();

        // 监听 Geocoder 的 complete 事件，当搜索完成时执行跳转
        geocoder.viewModel.complete.addEventListener(function (searchResults: { results?: any[], query?: string }) {
            console.log("complete");
            console.log("searchResults", searchResults);

            // if (searchResults.results && searchResults.results.length > 0) {
            //     // 获取第一个搜索结果的位置
            //     var firstResult = searchResults.results[0];
            //     var destination = firstResult.destination;
            //     console.log("firstResult", firstResult);
            //     console.log("destination", destination);

            //     // 设置相机视图，平滑飞行到目标位置
            //     viewerRef.value.camera.flyTo({
            //         destination: destination
            //     });
            // }
        });
    }
}

</script>

<template>
    <div id="cesiumContainer">
    </div>
</template>

<style scoped lang="scss">
body,
html,
div {
    padding: 0;
    margin: 0;
}

#cesiumContainer {
    height: 33vh;
    width: 100%;
}
</style>