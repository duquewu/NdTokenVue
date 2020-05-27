import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui';
import {Button, Form, FormItem, Progress} from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
import router from './router'

Vue.config.productionTip = false
// Vue.use(ElementUI);
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Progress)

Vue.config.devtools
new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
