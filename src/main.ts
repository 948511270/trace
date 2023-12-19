// main.ts
import { createApp } from 'vue'
import App from './App.vue'
// 引入清除默认样式
import './style.css'

import router from './router' // 引入 router

const app = createApp(App)
app.use(router) // 注册 router

app.mount('#app')
