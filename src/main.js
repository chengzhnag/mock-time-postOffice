import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import '@/styles/index.scss' // global css
import storage from "./utils/localstorage";
import dayjs from 'dayjs';
import {
	Input,
	Button,
	Message,
	Loading,
	MessageBox
} from 'element-ui';

Vue.use(Input);
Vue.use(Button);
// Vue.use(Message);
Vue.component(Message.name, Message)
Vue.use(Loading.directive);

Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$storage = storage;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
	document.title = `时光邮局 - ${to.meta.title}`;
	next();
});

Vue.filter('formatDate', function(date) {
	let result = '';
	if (date) {
		try {
			result = dayjs(date).format('YYYY-MM-DD HH:mm')
		} catch (error) {
			console.log(error);
		}
	}
	return result;
})

Vue.filter('hiddenEmail', function(email) {
	let result = '';
	if (email) {
		result = email.replace(/(\d{3})(\d+)(\d{0})/, function(x, y, z, p) {
			var i = "";
			while (i.length < z.length) {
				i += "*"
			}
			return y + i + p
		})
	}
	return result;
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
