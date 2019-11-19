import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '../views/index/index.vue')
  },
  {
    path: '/public',
    name: 'public',
    component: () => import(/* webpackChunkName: "index" */ '../views/index/publicLetter.vue')
  },
  {
    path: '/letters',
    name: 'letters',
    component: () => import(/* webpackChunkName: "index" */ '../views/index/lettersList.vue')
  },
  {
    path: '/extract',
    name: 'extract',
    component: () => import(/* webpackChunkName: "index" */ '../views/index/manuallyExtract.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "index" */ '../views/index/about.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import(/* webpackChunkName: "index" */ '../views/index/FAQ.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
