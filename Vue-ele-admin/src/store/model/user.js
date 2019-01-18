import { loginByUsername } from '@/api/login'
import { getToken, setToken } from '@/utils/auth'
const user = {
  state: {
    // user: '',
    // status: '',
    // code: '',
    token: getToken()
    // name: '',
    // avattar: '',
    // introduction: '',
    // roles: [],
    // setting: {
    //   articlePlatform: []
    // }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
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
          console.log('我失败了')
          reject(res)
        })
      })
    }
  }
}
export default user
