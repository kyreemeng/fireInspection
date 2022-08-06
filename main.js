import Vue from 'vue'
import App from './App'
import api from './api/http'
import cuCustom from './colorui/components/cu-custom.vue'






Vue.component('cu-custom', cuCustom)
Vue.prototype.$api = api;
Vue.prototype.APPID = 'wxd10c93cffa14952b';



Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
