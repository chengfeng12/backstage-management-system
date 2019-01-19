// 存的是全局变量
const getters = {
  token: state => state.user.token,
  language: state => state.app.language
}
export default getters
