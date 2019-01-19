// 定义i18n语言包
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
// 引入elementUI中的三个语言包
import elementEnLocal from 'element-ui/lib/locale/lang/en'
import elementZhLocal from 'element-ui/lib/locale/lang/zh-CN'
import elementEsLocal from 'element-ui/lib/locale/lang/es'
import enLocale from './en'
import zhLocale from './zh'
import esLoacle from './es'

Vue.use(VueI18n)

// 在这里分别使用
const messages = {
  en: {
    ...enLocale,
    ...elementEnLocal
  },
  zh: {
    ...zhLocale,
    ...elementZhLocal
  },
  es: {
    ...esLoacle,
    ...elementEsLocal
  }
}

// console.log(Cookies.get('language') || 'zh')

const i18n = new VueI18n({
  // 现获取本地的语言，如果没有的话会取第二个值
  locale: Cookies.get('language') || 'zh',
  messages
})

export default i18n
