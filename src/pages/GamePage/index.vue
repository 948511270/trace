<script setup lang="ts">
import { getCurrentInstance, ref, onMounted, Ref } from 'vue';
import request from '@/utils/request'

// 获取$router对象
const instance = getCurrentInstance();
const router = instance?.proxy?.$router;


console.log("模式：", router?.currentRoute.value.query.mode);
const latitude: Ref<string> = ref('')
const longitude: Ref<string> = ref('')
const country: Ref<string> = ref('')
const capital: Ref<string> = ref('')
const placename: Ref<string> = ref('')

const submitForm = () => {
    const formData = new FormData();
    if (image.value != null) {
        let validInputElement: HTMLInputElement = image.value as HTMLInputElement;
        if (validInputElement.files) {
            const imageFile = validInputElement.files[0];
            formData.append('image', imageFile);
        }

        formData.append('latitude', latitude.value);
        formData.append('longitude', longitude.value);
        formData.append('country', country.value);
        formData.append('capital', capital.value);
        formData.append('placename', placename.value);
    }
    //  展示 FormData 数据，运行时请删去
    for (let entry of formData.entries()) {
        const [fieldName, value] = entry;
        console.log(fieldName, value);
        // 在这里可以对每个表单字段做一些操作，比如将其发送到服务器
    }

    request.post("http://192.168.98.1:3000/addScene", formData)
        .then((res) => {
            console.log("res", res);

        }).catch((err)=>{
            console.log(err);
            
        })
}
const getScene = () =>{
    
    request.get("http://192.168.98.1:3000/getScene")
        .then((res) => {
            console.log("res", res);

        }).catch((err)=>{
            console.log(err);
            
        })
}


const image = ref(null)
onMounted(() => {

});
</script>

<template>
    <form @submit.prevent="submitForm">
        <!-- <form> -->
        <label for="image">选择图片：</label>
        <input type="file" id="image" ref="image" accept="image/*"><br><br>

        <label for="latitude">经度：</label>
        <input type="text" id="latitude" v-model="latitude"><br><br>

        <label for="longitude">纬度：</label>
        <input type="text" id="longitude" v-model="longitude"><br><br>

        <label for="location">国家：</label>
        <input type="text" id="location" v-model="country"><br><br>
        
        <label for="location">首都：</label>
        <input type="text" id="location" v-model="capital"><br><br>

        <label for="location">地名：</label>
        <input type="text" id="location" v-model="placename"><br><br>

        <button type="submit">上传图片</button>
    </form>
    <div @click="getScene">获取场景</div>
</template>

<style scoped lang="scss"></style>