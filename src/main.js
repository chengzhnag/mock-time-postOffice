import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import '@/styles/index.scss' // global css
import { Input, Button, Message } from 'element-ui';

Vue.use(Input);
Vue.use(Button);
Vue.use(Message);

Vue.prototype.$message = Message

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
