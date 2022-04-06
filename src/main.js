import Vue from 'vue'
import App from './App.vue'

//Service Worker
import './registerServiceWorker'

// vue-router
import router from './router'

// Vuex
import store from './store'

// Axios
import axios from 'axios'
Vue.prototype.$axios = axios

// Bus
Vue.prototype.$bus = new Vue();

//vue-lazyload
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
    // LazyLoad配置项
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading: 'dist/loading.gif',
    attempt: 1
})

//Axios BaseURL
import base from '@/utils/api/base.js'
let api = base;
Vue.prototype.$api = api

//Production Tip
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')