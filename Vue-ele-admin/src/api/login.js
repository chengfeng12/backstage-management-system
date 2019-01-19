// 引入请求文件
import request from '@/utils/request'

export function loginByUsername (username, password) {
  const data = {
    username,
    password
  }
  // console.log(data)
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function getUserInfo (token) {
  return request({
    url: '/user/info',
    method: 'get',
    // 这个地方是要传参数的，这样的话可以截取路由中的token
    params: { token }
  })
}
