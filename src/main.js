// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueCookie)
Vue.use(VueChatScroll)

import './assets/bulma/css/bulma.css'
import './assets/font-awesome/css/font-awesome.min.css'
import './assets/custom.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
