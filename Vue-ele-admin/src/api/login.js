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
