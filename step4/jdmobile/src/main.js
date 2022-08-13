// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './css/reset.css'
import './css/common.css'
// import './css/dialog.js'
import './css/font-awesome.min.css'
import Vue from 'vue'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import SIdentify from './components/identify'
Vue.use(SIdentify)
// import PullTo from 'vue-pull-to';
Vue.use(Mint);

import wx from 'weixin-js-sdk';
Vue.use(wx);

import 'swiper/dist/css/swiper.css';
import swiperSlides from 'vue-awesome-swiper';
Vue.use(swiperSlides);

import directive from './directive';
for(let key in directive){
  Vue.directive(key,directive[key])
}

import App from './App'
import router from './router'



import domain from './domain.js';
global.domain = domain;

// import "babel-polyfill"

import axios from 'axios'
import qs from 'qs' // 引入qs

Vue.prototype.$http = axios

Vue.config.productionTip = false

axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token') && localStorage.getItem('userId')) {
      config.headers['userid'] = localStorage.getItem('userId')
      config.headers['token'] = localStorage.getItem('token')
      // config.headers.user_id=sessionStorage.getItem('userId')
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if(config.method === 'post') { // post请求时，处理数据
      config.data = qs.stringify( {
        ...config.data //后台数据接收这块需要以表单形式提交数据，而axios中post默认的提交是json数据,所以这里选用qs模块来处理数据，也有其他处理方式，但个人觉得这个方式最简单好用
      })
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

import JSONbig from 'json-bigint'

Vue.prototype.getViewportSize = function(){
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  };
};
var  axiosPro=  function axiosPro(method, url, data ) {
  return new Promise(function (resolve, reject) {
    axios({
      method: method,
      url: url,
      data: data,
      // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
      transformResponse:[function(data){
        console.log("raw",data)
        console.log("json",JSON.parse(data))
        console.log("JSONbig",JSONbig.parse(data))
        return JSONbig.parse(data)
        // return data

      }]
    }).then(function (ret) {
      resolve(ret)
    }).catch(function (err) {
      reject(err)
      // errorHandler(err)
    })
  })
}


Vue.prototype.$axiosPro = axiosPro


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
