// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import axios from "axios";

import Goods from './components/Goods/Goods.vue'
import Ratings from './components/Ratings/Ratings.vue'
import Seller from './components/Seller/Seller.vue'

Vue.prototype.$axios = axios

const routes = [
  { path: '/', redirect: '/goods' },
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings },
  { path: '/seller', component: Seller },
]

Vue.use(VueRouter)
const router = new VueRouter({
  routes,// short for `routes: routes`,
  linkActiveClass: 'active'
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
