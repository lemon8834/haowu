import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'lib-flexible'
import 'normalize.css'
import fly from 'flyio'

Vue.config.productionTip = false
Vue.prototype.$fly = fly

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
      //只将请求结果的data字段返回
      return response.data
  },
  (err) => {
      //发生网络错误后会走到这里
      //return Promise.resolve("ssss")
  }
)

fly.config.headers['content-type'] = 'application/x-www-form-urlencoded'
// fly.config.baseURL = '/api/' //本地
// fly.config.baseURL = 'http://www.yangcongv.com/' // 线上


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
