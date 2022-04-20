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

const app = createApp(App)

// 全局注册Icons组件
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons])
})

app
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(plugin, {
    imports: []
  })
  .use(store)
  .use(router)
  .mount('#app')
