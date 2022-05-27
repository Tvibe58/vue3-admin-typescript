import axios from 'axios'
import storage from 'localforage'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: '/',
  timeout: 30000
})

service.interceptors.request.use(
  async(config: any) => {
    if (!config.unAuth) {
      await storage.getItem('OAuthToken').then(token => {
        console.log(token)
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        } else {
          console.log(`'${config.name}: 'invalid token and auth required`)
          // router.push({
          //   name: 'Login'
          // })
          return false
        }
      })
    }
    return config
  }, error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  async response => {
    return response.data
  },
  error => {
    if (error.response && error.response.status === 401) {
      ElMessage({
        message: '登录凭证已过期',
        type: 'error',
        duration: 5000
      })
    } else if (error.response && error.response.data && error.response.data.message) {
      ElMessage({
        message: error.response.data.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
