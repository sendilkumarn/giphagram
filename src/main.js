import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'

import App from './App.vue'
import LazyLoadDirective from './directives/LazyLoadDirective'
import './registerServiceWorker'

Vue.use(VueAxios, axios)
Vue.directive('lazyImageLoader', LazyLoadDirective)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
