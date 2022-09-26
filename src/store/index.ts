import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarStatus: 'opened'
  },
  mutations: {
    setSidebarStatus(state, status) {
      state.sidebarStatus = status
    }
  },
  actions: {},
  modules: {}
})
