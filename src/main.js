import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.$axios = axios


import ScrollDiv from 'vue-scroll-div';

Vue.use(ScrollDiv);

import base from '@/utils/api/base.js'

let api = base;
Vue.prototype.api = api

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')