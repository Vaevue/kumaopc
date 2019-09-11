import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import router from './router/index.js'
import Router from 'vue-router'
import axios from 'axios'
import store from './store/index.js'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
	error:'',
	loading:''
})
Vue.prototype.$ajax = axios
Vue.use(Router)
Vue.use(Element)
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
