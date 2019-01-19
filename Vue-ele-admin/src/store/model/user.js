import { loginByUsername, getUserInfo } from '@/api/login'
import { getToken, setToken } from '@/utils/auth'
const user = {
  state: {
    token: getToken(),
    user: '',
    status: '',
    code: '',
    name: '',
    avattar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        // 在这个地方进行调用请求后端的接口，如果请求成功的话，是在then中添加Token
        // 请求是先通过mock.js数据拦截，然后在返回数据
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          // 把token存进sotre中
          commit('SET_TOKEN', data.token)
          // 保存到cookie中
          setToken(data.token)
          // console.log('woshi返回的内容')
          getToken()
          resolve()
        }).catch(res => {
          // 失败的原因是因为没有token
          console.log('我失败了，是因为没有token')
          reject(res)
        })
      })
    },
    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log('从这里开始拉取用户信息')
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject(new Error('error'))
          }
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user
