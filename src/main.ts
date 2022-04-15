import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/styles/index.scss'
import plugin from '@/framework/components/svgIcon/plugin'

createApp(App)
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(plugin, {
    imports: []
  })
  .use(store)
  .use(router)
  .mount('#app')
