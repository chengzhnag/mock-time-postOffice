import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import '@/styles/index.scss' // global css
import { Input, Button, Message, Loading } from 'element-ui';

Vue.use(Input);
Vue.use(Button);
// Vue.use(Message);
Vue.component(Message.name, Message)
Vue.use(Loading.directive);

Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
