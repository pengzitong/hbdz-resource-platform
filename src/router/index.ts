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
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
        // component: (resolve) => require(['@/views/home/index.vue'], resolve),
        name: 'home',
        meta: { title: '主页' }
      }
    ]
  },
  {
    path: '/message-board',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import(/* webpackChunkName: "message-board" */ '@/views/message-board/index.vue'),
        name: 'messageBoard',
        meta: { title: '留言板' }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
