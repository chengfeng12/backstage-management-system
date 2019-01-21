import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 */

// 这里的代码说白了就是干了一件事，通过用户的权限和之前在router.js里面asyncRouterMap的每一个页面所需要的权限做匹配，最后返回一个该用户能够访问路由有哪些。
function hasPermission (roles, route) {
  // 有meta或者meta中有roles的话执行
  if (route.meta && route.meta.roles) {
    // 查看的是当前登录的roles是否在mate.roles中，否则返回false
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 这个是没有mate和没有roles的路由返回，不需要权限
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes
 * @param roles
 */
function filterAsyncRouter (routes, roles) {
  const res = []
  console.log(routes)
  routes.forEach(route => {
    // 把每个路由对象的信息都取出来
    const tmp = { ...route }
    // 如果该路由中的roles包含当前登录用户的roles则返回ture，不包含返回false
    if (hasPermission(roles, tmp)) {
      // 有权限的部分
      // 查看是否有子路由，有的话进行子路由的权限判断，调用自己递归判断
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      // 把判断后成功的结果路由给添加进新的路由
      res.push(tmp)
    }
  })
  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    // 这个是动态的路由表
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      // 添加到state中
      state.addRouters = routers
      // 把所有有权限的路由进行拼接
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      // 传递过来的是roles
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        // 判断是否是管路员
        if (roles.includes('admin')) {
          accessedRouters = asyncRouterMap
        } else {
          // 过滤之后的路由表
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        // 然后调用全局的方法,把权限的路由,进行存储
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
