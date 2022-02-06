import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './api/api.interceptors'  // 导入axios http请求守卫
import './router/router.interceptor' // 导入路由守卫
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
  extend(md:any){
    //
  }
});
const app=createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(VueMarkdownEditor);
app.mount('#app')
// createApp(App).use(store).use(router).mount('#app')