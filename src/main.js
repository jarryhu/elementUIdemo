import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import vueResource from './assets/js/vue-resource-1.3.4'
Vue.use(vueResource)
// 设置header token
Vue.http.interceptors.push((request, next) => {
  // 请求发送前的处理逻辑
  request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  next((response) => {
    // 请求发送后的处理逻辑
    // 根据请求的状态，response参数会返回给successCallback或errorCallback
    return response
  })
})
Vue.http.options.root = 'http://localhost:8000/'
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
