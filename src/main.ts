import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/scss/index.scss'
import { Component } from 'vue-property-decorator'
Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate'])
import ForeignLanguageName from '@/components/ForeignLanguageName/index.vue'
Vue.component('ForeignLanguageName', ForeignLanguageName)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$imageUrlHost =
  process.env.VUE_APP_API_ENV == 'development' ? process.env.VUE_APP_API_URL : ''

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
