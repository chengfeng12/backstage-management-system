import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 开始进度条
import 'nprogress/nprogress.css'// 引入进度条样式
import { getToken } from '@/utils/auth' // 获取token

NProgress.configure({ showSpinner: false })// 进度条的设置

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist  不是重定向的白名单

// 路由钩子
router.beforeEach((to, from, next) => {
  NProgress.start() // 设置的是进度条
  if (getToken()) { // 确定是否有token
    // 有token了就不用登录了，直接进行跳转首页
    if (to.path === '/login') {
      // console.log(store.getters.roles.length)
      next({ path: '/' })
      // 如果当前页面是仪表板，则不会在每个钩子后触发，因此请手动处理它
      NProgress.done()
    } else {
      // 在这里拉取用户的信息
      if (store.getters.roles.length === 0) {
        // 重新拉取用户信息
        store.dispatch('GetUserInfo').then(res => {
          const roles = res.data.roles
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            // console.log(store.getters.addRouters)
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
          console.log('拉取成功')
        }).catch(err => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
          console.log(store.getters.roles)
          console.log('拉取失败')
        })
        next()
      } else {
        console.log('我是有用户信息的')
        next()
      }
    }
  } else {
    // /* has no token*/  不需要token值的页面，可以直接访问
    // console.log(to)
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入 输出的是当前路由的地址
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页  没有token也没有在白名单中的，直接跳到登录页面
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar  进度条结束
})
