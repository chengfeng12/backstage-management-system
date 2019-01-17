import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

// register globally 注册全局的组件
Vue.component('svg-icon', SvgIcon)

// 这个地方是显示svg下面的path的
// 三个参数directory：说明需要检索的目录
// useSubdirectories：是否检索子目录
// regExp: 匹配文件的正则表达式
// keys() 方法用于从数组创建一个包含数组键的可迭代对象。
// 如果对象是数组返回 true，否则返回 false。
// 装好依赖后要重新启动项目
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
// console.log(req)
// console.log(requireAll)
requireAll(req)
// console.log(requireAll(req))
