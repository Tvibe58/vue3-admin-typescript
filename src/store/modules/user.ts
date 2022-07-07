import { Module } from 'vuex'
import { TypeRootState } from '@/store/type'
import api from '@/framework/modules/api/make'
import storage from 'localforage'

export interface TypeModuleStateUser {
  token: string;
  userInfo: {
    avatar: string,
    name: string,
    userSidebar: Array<any>
  },
}

export const moduleUser: Module<TypeModuleStateUser, TypeRootState> = {
  state: () => ({
    token: '',
    userInfo: {
      avatar: '',
      name: '',
      userSidebar: []
    }
  }),
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        api.sendRequest('user.login', userInfo).then((res: any) => {
          const tokenValue = res.data.access_token
          storage.setItem('OAuthToken', tokenValue)
          commit('SET_TOKEN', tokenValue)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    LogOut({ commit }) {
      return api.mockRequest('user.logout').then(() => {
        commit('SET_TOKEN', '')
        storage.removeItem('OAuthToken')
      })
    },
    // 获取用户信息
    GetInfo({ commit }) {
      return api.mockRequest('user.info', '1').then((res: any) => {
        console.log('get user info')
        commit('SET_USER_INFO', res.data)
      })
    }
  }
}
