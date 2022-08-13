// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Base from './assets/js/baseFun.js'         //---------自定义的公共函数和公共请求方法
import stores from './store/store'                //---------自定义的全局变量
import './assets/css/base.css'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
// import PullTo from 'vue-pull-to';
Vue.use(Mint);

Vue.config.productionTip = false

//注册全局函数和全局常量
Vue.prototype.baseFun = Base.baseFun;  //-----注册到vue的全局，方便各个组件和页面js调用公共函数
Vue.prototype.baseAjax = Base.baseAjax;//-----将封装的ajax请求函数注册到vue的全局
global.AppDebug = Base.AppDebug;
// Vue.prototype.homeHost = Base.homeHost;
global.homeHost = Base.homeHost;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
