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
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/message-board',
    component: Layout,
    children: [
      {
        path: '/message-board', // 加斜线和不加斜线区别很大。加斜线的情况下，路由不拼上级路由，不加斜线会拼上级路由
        component: () =>
          import(/* webpackChunkName: "message-board" */ '@/views/message-board/index.vue'),
        name: 'messageBoard',
        meta: { title: '留言板' }
      }
    ]
  },
  {
    path: '/platform-introduction',
    component: Layout,
    children: [
      {
        path: '/platform-introduction',
        component: () =>
          import(
            /* webpackChunkName: "platform-introduction" */ '@/views/platform-introduction/index.vue'
          ),
        name: 'platformIntroduction',
        meta: { title: '平台概况' }
      }
    ]
  },
  {
    path: '/specimen-search',
    component: Layout,
    meta: { title: '标本查询' },
    redirect: '/specimen-search/specimen-list-kw',
    children: [
      {
        path: '/specimen-search/specimen-list-kw',
        component: () =>
          import(
            /* webpackChunkName: "specimen-list" */ '@/views/specimen-search/specimen-list.vue'
          ),
        name: 'kwSpecimenList',
        meta: { title: '矿物标本查询' }
      },
      {
        path: '/specimen-search/specimen-list-ys',
        component: () =>
          import(
            /* webpackChunkName: "specimen-list" */ '@/views/specimen-search/specimen-list.vue'
          ),
        name: 'ysSpecimenList',
        meta: { title: '岩石标本查询' }
      },
      {
        path: '/specimen-search/specimen-list-ks',
        component: () =>
          import(
            /* webpackChunkName: "specimen-list" */ '@/views/specimen-search/specimen-list.vue'
          ),
        name: 'ksSpecimenList',
        meta: { title: '矿石标本查询' }
      },
      {
        path: '/specimen-search/specimen-list-hs',
        component: () =>
          import(
            /* webpackChunkName: "specimen-list" */ '@/views/specimen-search/specimen-list.vue'
          ),
        name: 'hsSpecimenList',
        meta: { title: '化石标本查询' }
      },
      {
        path: '/specimen-search/specimen-images',
        component: () =>
          import(
            /* webpackChunkName: "specimen-images" */ '@/views/specimen-search/specimen-images.vue'
          ),
        name: 'specimenImages',
        meta: { title: '标本图片查询' }
      },
      {
        path: '/specimen-search/union-search',
        component: () =>
          import(/* webpackChunkName: "union-search" */ '@/views/specimen-search/union-search.vue'),
        name: 'unionSearch',
        meta: { title: '综合查询' }
      }
    ]
  },
  {
    path: '/specimen-search',
    component: Layout,
    children: [
      {
        path: '/specimen-search/union-search-list',
        component: () =>
          import(
            /* webpackChunkName: "union-search-list" */ '@/views/specimen-search/specimen-router-view.vue'
          ),
        name: 'unionSearchList',
        meta: { title: '标本数据列表' },
        children: [
          {
            path: '',
            component: () =>
              import(
                /* webpackChunkName: "union-search-list" */ '@/views/specimen-search/union-search-list.vue'
              ),
            name: 'unionSearchList'
          },
          {
            path: '/specimen-search/union-search-detail',
            component: () =>
              import(
                /* webpackChunkName: "union-search-detail" */ '@/views/specimen-search/union-search-detail.vue'
              ),
            name: 'specimenDetail',
            meta: { title: '标本详细信息' }
          }
        ]
      }
    ]
  },
  {
    path: '/photo-gallery',
    component: Layout,
    meta: { title: '精品图片库' },
    redirect: '/photo-gallery/mineral-products',
    children: [
      {
        path: '/photo-gallery/mineral-products',
        component: () =>
          import(
            /* webpackChunkName: "photo-gallery" */ '@/views/photo-gallery/mineral-products.vue'
          ),
        name: 'mineralProducts',
        meta: { title: '矿物精品' }
      },
      {
        path: '/photo-gallery/other-products-ys',
        component: () =>
          import(
            /* webpackChunkName: "other-products" */ '@/views/photo-gallery/other-products.vue'
          ),
        name: 'ysProducrts',
        meta: { title: '岩石精品' }
      },
      {
        path: '/photo-gallery/other-products-ks',
        component: () =>
          import(
            /* webpackChunkName: "other-products" */ '@/views/photo-gallery/other-products.vue'
          ),
        name: 'ksProducrts',
        meta: { title: '矿石精品' }
      },
      {
        path: '/photo-gallery/other-products-hs',
        component: () =>
          import(
            /* webpackChunkName: "other-products" */ '@/views/photo-gallery/other-products.vue'
          ),
        name: 'hsProducrts',
        meta: { title: '化石精品' }
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

router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
