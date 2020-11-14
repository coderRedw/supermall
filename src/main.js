import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from "components/common/toast/index"

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)

//使用VueLazyLoad
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

//解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')
