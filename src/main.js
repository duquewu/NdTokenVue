import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueQrcodeReader from "vue-qrcode-reader";

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueQrcodeReader);

Vue.config.devtools
new Vue({
  render: h => h(App),
}).$mount('#app')
