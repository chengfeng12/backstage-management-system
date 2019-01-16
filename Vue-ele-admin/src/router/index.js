import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout  布局 */
// import Layout from '@/views/layout/Layout'

// 路由映射
export const constRouterMap = [
  // 首页
  {
    path: '/',
    component: () => import('@/views/layout/Layout'),
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    // hidden 如果为true 的话则不会显示在侧边栏中，默认为false
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authreadirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  }
]

// 使用路由懒加载的方式
export default new Router({
  routes: constRouterMap
})
