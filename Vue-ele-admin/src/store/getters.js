// 存的是全局变量
const getters = {
  token: state => state.user.token,
  language: state => state.app.language,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters
}
export default getters
