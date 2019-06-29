import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Axios from 'axios'

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
new Vue({
  Axios,
  render: h => h(App)
}).$mount('#app')
