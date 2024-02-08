import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'
//配置根路径为 @
import  path  from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),cesium()],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'src')
    }
  },
  server:{
    proxy:{
      '/profile':{
        target:'http://192.168.98.1',
        changeOrigin:true,
      },
    }
  }
})
