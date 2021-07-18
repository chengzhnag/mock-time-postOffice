import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
	path: '/',
	name: 'index',
	component: () =>
		import ( /* webpackChunkName: "index" */ '../views/index/index.vue'),
	meta: {
		title: '写给未来的自己'
	}
}, {
	path: '/public',
	name: 'public',
	component: () =>
		import ( /* webpackChunkName: "public" */ '../views/index/publicLetter.vue'),
	meta: {
		title: '公开信'
	}
}, {
	path: '/letters',
	name: 'letters',
	component: () =>
		import ( /* webpackChunkName: "letters" */ '../views/index/lettersList.vue'),
	meta: {
		title: '信件列表'
	}
}, {
	path: '/extract',
	name: 'extract',
	component: () =>
		import ( /* webpackChunkName: "extract" */ '../views/index/manuallyExtract.vue'),
	meta: {
		title: '手动提取'
	}
}, {
	path: '/about',
	name: 'about',
	component: () =>
		import ( /* webpackChunkName: "about" */ '../views/index/about.vue'),
	meta: {
		title: '关于时光邮局'
	}
}, {
	path: '/faq',
	name: 'faq',
	component: () =>
		import ( /* webpackChunkName: "faq" */ '../views/index/FAQ.vue'),
	meta: {
		title: '联系邮递员大叔'
	}
}, {
	path: '/tips',
	name: 'tips',
	component: () =>
		import ( /* webpackChunkName: "tips" */ '../views/index/tips.vue'),
	meta: {
		title: '循环提示'
	}
},]

const router = new VueRouter({
	routes
})

export default router