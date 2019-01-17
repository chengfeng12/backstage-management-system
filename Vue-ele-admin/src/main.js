import Vue from 'vue'
import App from './App'
import router from './router'

// 引入重置样式的文件
import 'normalize.css/normalize.css'

// 引入js-cookie文件
import Cookies from 'js-cookie'

// 引入Element文件
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入国际化语言包
import i18n from './lang'

// 引入全局的svg的组件
import './icons'

// 引入全局的样式
import '@/styles/index.scss'
import '@/styles/css/reset.css'

// 引入权限控制器
import './permission'
// 引入mock数据
import './mock'
// 引入全局的store
import store from './store'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
