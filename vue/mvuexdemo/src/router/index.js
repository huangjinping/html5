import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import My  from  '@/components/My'
import  MyAction  from  '@/components/MyAction'

import { Plugin1, Plugin2 } from './plugins';

Vue.use(Router)
Vue.use(Plugin1, '参数1', '参数2');
Vue.use(Plugin2, '参数A', '参数B');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: "/myAction",
      name: "MyAction",
      component: MyAction
    }
  ]
})
