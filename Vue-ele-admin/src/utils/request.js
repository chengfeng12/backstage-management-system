// 封装一个路由请求拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios的实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
})

// 发送请求的拦截器
service.interceptors.request.use(
  config => {
    console.log('我是请求拦截器')
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    console.reject(error)
  }
)

// 接收请求的拦截器
service.interceptors.response.use(
  response => response,
  error => {
    // console.log('我是返回的拦截器')
    // console.log(error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 10000
    })
    return Promise.reject(error)
  }
)
export default service
