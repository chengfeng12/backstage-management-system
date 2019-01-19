import Vue from 'vue'
import Vuex from 'vuex'
import user from './model/user'
import app from './model/app'
import permission from './model/permission'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    app,
    permission
  },
  getters
})
export default store
