<script setup lang="ts">
import { ref, Ref } from 'vue';
import cities from '@/utils/cities';
import emitter from '@/utils/bus';


let targetValueRef: Ref<string> = ref("default");
emitter.on('sendAnswer', async e => {
    targetValueRef.value = e as string
    await generateAnswerSequence()

})
interface Button {
    label: string;
    value: string;
    color: string;
}

const isDisabledRef = ref<boolean>(false)
const buttons = ref<Button[]>([
    { label: "Button 1", value: "value_1", color: "#636363" },
    { label: "Button 2", value: "value_2", color: "#636363" },
    { label: "Button 3", value: "value_3", color: "#636363" },
    { label: "Button 4", value: "value_4", color: "#636363" },
]);

const checkValue = (value: string, index: number) => {
    if (value === targetValueRef.value) {
        buttons.value[index].color = "#6bf370";
    } else {
        buttons.value[index].color = "#f44336";
    }
    isDisabledRef.value = true
};

const generateAnswerSequence = () => {
    // 此处使用立即执行函数是因为每次执行一次这个函数逻辑都要创建一个citiesCopy，为了尽可能地少占用内存，使用立即执行函数。
    (function () {
        var citiesCopy = cities.slice();
        // 生成一个随机索引
        let randomIndex = Math.floor(Math.random() * buttons.value.length);

        buttons.value[randomIndex].label = targetValueRef.value
        buttons.value[randomIndex].value = targetValueRef.value
        buttons.value.forEach(function (button: Button, index: number) {
            if (index !== randomIndex) {

                if (citiesCopy.length === 0) {
                    return null; // 如果数组为空，返回 null 或者其他适当的值，表示没有可选择的值了
                }
                var randomIndex2 = Math.floor(Math.random() * cities.length);
                var randomCity = cities[randomIndex2];
                cities.splice(randomIndex2, 1); // 从数组中移除已选择的值
                button.label = randomCity.chinese
                button.value = randomCity.chinese

            }
        });
    })();
}



</script>

<template>
    <div>
        <span>请选择你的答案：</span>
        <div class="interaction">
            <div id="button-container">
                <button v-for="(button, index) in buttons" :key="index" 
                    :style="{ backgroundColor: button.color }"
                    @click="checkValue(button.value, index)"
                    :disabled="isDisabledRef">
                    {{ button.label }}
                </button>

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.interaction {
    position: relative;
    width: 100%;

    #button-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: stretch;
        height: 30vh;

        button {
            padding: 2vh 1.1vh;
            font-size: 20px;
            margin: 2vh 0.8vh;
            cursor: pointer;
            width: 80%;
            border-radius: 2.3vh;
            transition: background-color 0.3s ease;
            opacity: 0.7;
            color: white;
            border: none;
            transition: none;
        }

        .green-background {
            background-color: #6bf370;

        }

        .red-background {
            background-color: #f44336;

        }

        .gray-background {
            background-color: #636363;

        }
    }
}
</style>