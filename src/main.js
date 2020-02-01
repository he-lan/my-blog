// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Vuex from 'vuex'
// Vuex.use(Vuex);

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateFormat', function(dateStr, pattern = "YYYY-MM-DD  HH:mm:ss") {
    return moment(dateStr).format(pattern)
})

// 引入bootstrap
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
import store from "./store"

// 安装layui
// Vue.use(layui)

// 安装axios
import axios from 'axios'
// axios.defaults.baseURL = '/api'
Vue.prototype.$axios = axios;
// Vue.use(axios);

// import "../static/layui/css/layui.css"
// import "../static/layui/layui.js"


// 引入animation
import animate from 'animate.css'
Vue.use(animate)




// 跳转后返回顶部
// router.afterEach((to, from, next) => {
//     window.scrollTo(0, 0);
// })

router.beforeEach((to, from, next) => {
    // chrome
    document.body.scrollTop = 0
        // firefox
    document.documentElement.scrollTop = 0
        // safari
    window.pageYOffset = 0
    next()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,

    components: { App },
    template: '<App/>'
})