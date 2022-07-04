import { Module } from 'vuex'
import { TypeRootState } from '@/store/type'
import api from '@/framework/modules/api/make'
import storage from 'localforage'

export interface TypeModuleStateUser {
  token: string;
}

export const moduleUser: Module<TypeModuleStateUser, TypeRootState> = {
  state: () => ({
    token: ''
  }),
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
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
      commit('SET_TOKEN', '')
      storage.removeItem('OAuthToken')
    }
  }
}
