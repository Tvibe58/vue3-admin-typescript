import { Module } from 'vuex'
import { TypeRootState } from '@/store/type'
import Cookies from 'js-cookie'
import {
  getSidebarStatus,
  getSize,
  setSidebarStatus,
  setSize
} from '@/utils/cookies'
export enum DeviceType {
  Mobile,
  Desktop
}

export interface TypeModuleStateApps {
  device: DeviceType;
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  };
  size: string
}

export const moduleApps: Module<TypeModuleStateApps, TypeRootState> = {
  state: () => ({
    device: DeviceType.Desktop,
    sidebar: {
      opened: getSidebarStatus() !== '0',
      withoutAnimation: false
    },
    size: 'medium'
  }),
  mutations: {
    TOGGLE_SIDEBAR: (state, withoutAnimation: boolean) => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = withoutAnimation
      if (state.sidebar.opened) {
        setSidebarStatus('1')
      } else {
        setSidebarStatus('0')
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation: boolean) => {
      Cookies.set('sidebarStatus', '1')
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device: DeviceType) => {
      state.device = device
    }
  },
  actions: {
    ToggleSideBar: ({ commit }, withoutAnimation: boolean) => {
      commit('TOGGLE_SIDEBAR', withoutAnimation)
    },
    CloseSideBar({ commit }, withoutAnimation: boolean) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device: DeviceType) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}
