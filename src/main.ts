import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import * as Icons from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/styles/index.scss'
import plugin from '@/framework/components/svgIcon/plugin'
import api from '@/framework/modules/api/make'
import { Store } from 'vuex'
import { TypeAllState } from '@/store/type'
import '@/framework/modules/permission'

const app = createApp(App)

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: any,
    // 为 `this.$store` 提供类型声明
    $store: Store<TypeAllState>
  }
}

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
  .use(api)
  .use(store, key)
  .use(router)
  .mount('#app')
