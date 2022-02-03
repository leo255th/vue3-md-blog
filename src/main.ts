import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './api/api.interceptors'  // 导入axios http请求守卫
import './router/router.interceptor' // 导入路由守卫
const app=createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount('#app')
// createApp(App).use(store).use(router).mount('#app')