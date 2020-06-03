import Vue from 'vue'
import App from './App.vue'
import {Input, Button, Form, FormItem, Progress, Row, Col} from 'element-ui'
import router from './router'

Vue.config.productionTip = false
Vue.use(Input)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Progress)
Vue.use(Row)
Vue.use(Col)

Vue.config.devtools
new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
