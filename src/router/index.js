import VueRouter from 'vue-router'
import TFACode from "../components/TFACode";
import TokenDetail from "../components/TokenDetail";
import Vue from 'vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: TokenDetail,
    },
    {
      path: '/login',
      component: TFACode,
    }
  ]
})
