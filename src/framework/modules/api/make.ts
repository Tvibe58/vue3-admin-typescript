import request from './request'
import list from '@/api/entry'
import { ElMessage } from 'element-plus'
import { sleep } from '@/utils/index'

function getTarget(name: string) {
  let target: any = list
  name.split('.').forEach((item: any) => {
    if (!target[item]) console.error(`'${name}' was not found in api module`)
    target = target[item]
  })
  if (target.name !== name) console.error(`Invalid name: ${name} !== ${target.name}`)
  return target
}

async function mockRequest(name: string, data = '') {
  const target = getTarget(name)
  const mockData = typeof target.mockData === 'function' ? target.mockData(data) : (target.mockData || null)

  console.log(`%cMocking request:%c『${target.description}』「${name}」`, 'color: #8edf8e; background: #333; padding: 3px 0 3px 10px; border-radius: 3px 0 0 3px', 'color: #fff; background: #333; padding: 3px 10px 3px 0; border-radius: 0 3px 3px 0', data)

  if (!mockData) console.log(`%cMocking response:『${target.description}』「${name}」 missing 'mockData' property`, 'color: #cab029; background: #333; padding: 3px 10px; border-radius: 3px')
  else console.log(`%cMocking response:%c『${target.description}』「${name}」`, 'color: #cab029; background: #333; padding: 3px 0 3px 10px; border-radius: 3px 0 0 3px', 'color: #fff; background: #333; padding: 3px 10px 3px 0; border-radius: 0 3px 3px 0', mockData)

  await sleep(880) // 加一丢丢延迟舒缓一下紧张的气氛

  return {
    success: true,
    data: mockData
  }
}

async function sendRequest(name: string, data = '') {
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
    app.config.globalProperties.$api = (name: string, data: any) => sendRequest(name, data)
  },
  mockRequest,
  sendRequest
}
