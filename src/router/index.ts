import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/home',
        name: 'Home',
        // 异步加载，打包时代码分割，性能优化
        component: () => import('../pages/Home/index.vue') 
    },
    {
        path: '/menu',
        name: 'Menu',
        component: () => import('../pages/Menu/index.vue')
    },
    {
        path: '/gamepage',
        name: 'GamePage',
        component: () => import('../pages/GamePage/index.vue')
    },
    {
        path:'/',
        redirect:'/menu'
    }
]

const router = createRouter({
    history: createWebHistory(), // 路由模式：history模式
    routes: routes
})

export default router;
