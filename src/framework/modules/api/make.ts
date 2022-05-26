import request from './request'
import list from '@/api/entry'
import { ElMessage } from 'element-plus'

interface Target {
  name: string,
  url: string,
  unAuth: boolean,
  method: string,
  [propName: string]: any
}

function getTarget (name: any) {
  let target: any = list
  name.split('.').forEach((item: any) => {
    if (!target[item]) console.error(`'${name}' was not found in api module`)
    target = target[item]
  })
  if (target.name !== name) console.error(`Invalid name: ${name} !== ${target.name}`)
  return target
}

async function sendRequest (name: string, data = '') {
  const target: any = getTarget(name)
  if (!target.url) throw new Error(`Invalid property 'url' of '${name}'`)

  const output = (res: any) => {
    return new Promise((resolve, reject) => {
      if (res && res.success) {
        if (res.data) {
          if (target.filter && typeof target.filter === 'function') {
            const data = target.filter(res)
            if (!data) {
              resolve(res)
              console.error(`You maybe missing 'return' for closure in '${name}'`)
            } else {
              resolve(data)
            }
          } else {
            resolve(res)
          }
        }
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
        reject(res.message)
      }
    })
  }
  // 根据不同的类型，进行参数拼接和执行不同的方法
  let result = null
  const config: any = {
    name: name,
    unAuth: target.unAuth || false
  }
  switch (target.method) {
    case 'POST':
      // if (data && typeof data === 'object' && 'page' in data) data.pageNumber = data.page
      await request.post(target.url, data, config).then(res => {
        result = res
      })
      break
    case 'GET':
      await request.get(target.url, Object.assign({}, {
        params: data
      }, config)).then(res => {
        result = res
      })
      break
    case 'PUT':
      await request.get(`${target.url}/${data}`, config).then(res => {
        result = res
      })
      break
    case 'DELETE':
      await request.delete(`${target.url}/${data}`, config).then(res => {
        result = res
      })
      break
    default:
      throw new Error(`Invalid property 'method' of ${name}`)
  }
  return output(result)
}

export default {
  install: function (app: any) {
    // app.config.globalProperties.$api = api
    // Vue.prototype.$api = (name: string, data: any) => sendRequest(name, data)
    app.config.globalProperties.$api = (name: string, data: any) => sendRequest(name, data)
  },
  sendRequest
}
