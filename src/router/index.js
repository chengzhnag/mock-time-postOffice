import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '../views/index/index.vue'),
    meta: {
      title: '写给未来的自己'
    }
  },
  {
    path: '/public',
    name: 'public',
    component: () => import(/* webpackChunkName: "index" */ '../views/index/publicLetter.vue'),
    meta: {
      title: '公开信'
    }
  },
  {
    path: '/letters',
    name: 'letters',
    component: () => import(/* webpackChunkName: "index" */ '../views/index/lettersList.vue'),
    meta: {
      title: '信件列表'
    }
  },
  {
    path: '/extract',
    name: 'extract',
    component: () => import(/* webpackChunkName: "index" */ '../views/index/manuallyExtract.vue'),
    meta: {
      title: '手动提取'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "index" */ '../views/index/about.vue'),
    meta: {
      title: '关于时光邮局'
    }
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import(/* webpackChunkName: "index" */ '../views/index/FAQ.vue'),
    meta: {
      title: '联系邮递员大叔'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
