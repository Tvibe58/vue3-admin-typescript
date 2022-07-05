import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { TypeRootState } from './type'
import { moduleUser } from './modules/user'
import { moduleApps } from './modules/app'

// 定义 injection key
export const key: InjectionKey<Store<TypeRootState>> = Symbol('')

export const store = createStore<TypeRootState>({
  state: {
    count: 0
  },
  modules: {
    user: moduleUser,
    app: moduleApps
  }
})

// 定义自己的 `useStore` 组合式函数
export function userStore<T = TypeRootState>() {
  return baseUseStore<T>(key)
}
