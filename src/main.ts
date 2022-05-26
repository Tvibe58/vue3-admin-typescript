import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import * as Icons from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/styles/index.scss'
import plugin from '@/framework/components/svgIcon/plugin'
import api from '@/framework/modules/api/make'

const app = createApp(App)

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: any
  }
}

// 全局注册Icons组件
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons])
})

// 在原型上扩展,这样不用在每个页面都导入request
// app.config.globalProperties.$api = api

app
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(plugin, {
    imports: []
  })
  .use(api)
  .use(store)
  .use(router)
  .mount('#app')
