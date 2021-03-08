import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


import axios from 'axios'
import VueAxios from 'vue-axios'
import axioInterceptor from '@/common/axioInterceptor'
axioInterceptor(axios)
Vue.use(VueAxios, axios)

import 'normalize.css'
import '@/assets/css/main.scss'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')