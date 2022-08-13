import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import identify from '@/components/identify'

import home from  '@/view/home/home.vue'
import  videoDetail from  '@/view/home/videoDetails.vue'
import  arthur from  '@/view/arthur/arthur.vue'
import  rocket from  '@/view/arthur/rocket.vue'
import  target from  '@/view/arthur/target.vue'
import  login from  '@/view/home/login.vue'
import  view from  '@/view/arthur/view.vue'
import  bomber from  '@/view/arthur/bomber.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/videoDetail',
      name: 'videoDetail',
      component: videoDetail
    },
    {
      path: '/arthur',
      name: 'arthur',
      component: arthur
    },
    {
      path: '/rocket',
      name: 'rocket',
      component: rocket
    },
    {
      path: '/target',
      name: 'target',
      component: target
    },{
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/view',
      name: 'view',
      component: view
    },
    {
      path: '/bomber',
      name: 'bomber',
      component: bomber
    }
  ]
})
