import Vue from 'vue'
import Router from 'vue-router'

/* Layout  布局 */
import Layout from '@/views/layout/Layout'

Vue.use(Router)

// 路由映射
export const constantRouterMap = [
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
  },
  {
    path: '*',
    component: () => import('@/views/layout/Layout'),
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  }
]

// 动态路由表
export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true,
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor']
    }
  }
]
// 使用路由懒加载的方式
export default new Router({
  routes: constantRouterMap
})
