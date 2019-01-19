import { param2Obj } from '@/utils'
const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    // console.log(username)
    // 把用户户名返回
    return userMap[username]
  },
  getUserInfo: config => {
    // 取出token
    const { token } = param2Obj(config.url)
    console.log('截取之后的token')
    console.log(token)
    // 如果有当前的这个用户的信息则返回
    if (userMap[token]) {
      return userMap[token]
    } else {
      // 没有的话直接返回false
      return false
    }
  }
}
