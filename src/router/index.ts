import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () =>
          import(/* webpackChunkName: "home" */ '../views/home/index.vue'),
        // component: (resolve) => require(['@/views/home/index.vue'], resolve),
        name: 'home',
        meta: { title: '主页' }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: '/',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/About.vue'),
        name: 'about',
        meta: { title: '关于' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
