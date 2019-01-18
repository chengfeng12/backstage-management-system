import Cookies from 'js-cookie'
const Tokenkey = 'Admin-Token'
// 得到cookie中token
export function getToken () {
  // console.log('我是得到token===========')
  // console.log(Cookies.get(Tokenkey))
  return Cookies.get(Tokenkey)
}
// 更改cookie中token
export function setToken (token) {
  // console.log('我是更改token===========')
  return Cookies.set(Tokenkey, token)
}
// 删除cookie中token
export function removeToken () {
  return Cookies.remove(Tokenkey)
}
