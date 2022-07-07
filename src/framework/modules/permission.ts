import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { ElMessage } from 'element-plus'
import storage from 'localforage'

NProgress.configure({ showSpinner: false })// NProgress configuration

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  const ssid = to.query.ssid?.toString()

  if (ssid) {
    storage.setItem('OAuthToken', atob(ssid)).then(() => {
      next({
        path: '/',
        replace: true
      })
    })
  } else {
    storage.getItem('OAuthToken').then(token => {
      if (token) {
        if (to.path === '/login') {
          next({
            path: '/'
          })
          NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
        } else {
          if (store.state.user.userInfo.userSidebar.length === 0) {
            next()
            store.dispatch('GetInfo').then(() => { // 拉取用户信息
              next()
            }).catch((err) => {
              store.dispatch('LogOut').then(() => {
                ElMessage.error(err || 'Verification failed, please login again')
                next({
                  path: '/'
                })
              })
            })
          } else {
            next()
          }
        }
      } else {
        if (whiteList.indexOf(to.path) !== -1) {
          next()
        } else {
          next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
          NProgress.done()
        }
      }
    })
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
