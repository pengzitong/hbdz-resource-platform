import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarStatus: 'opened',
    cacheQuery: {},
    importantTopicNavLists: JSON.parse(sessionStorage.getItem('importantTopicNavLists') || '{}')
  },
  mutations: {
    setSidebarStatus(state, status) {
      state.sidebarStatus = status
    },
    setCacheQuery(state, value) {
      state.cacheQuery = value
    },
    setImportantTopicNavLists(state, value) {
      state.importantTopicNavLists = value
      sessionStorage.setItem('importantTopicNavLists', JSON.stringify(value)) // 处理非首页状态下刷新丢失重要专题下的菜单
    }
  },
  actions: {},
  modules: {}
})
