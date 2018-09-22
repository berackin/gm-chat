import Vue from 'vue'
import App from './App'
import router from './router'
import VueFirestore from 'vue-firestore'
import VueJwtDecode from 'vue-jwt-decode'

Vue.config.productionTip = false

Vue.use(VueFirestore)
Vue.use(VueJwtDecode)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
