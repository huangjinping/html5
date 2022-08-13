import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import  Home  from  '@/components/home/Home'
import My from   '@/components/my/My'
import Plan from  '@/components/plan/Plan'
import shoppingCart from  '@/components/shoppingCart/shoppingCart'
import find  from '@/components/find/find'
import main from  '@/components/main/main'
import  product from '@/components/find/product'
import  setting  from  '@/components/my/setting'
import  login  from '@/components/my/login'
import equitymap from  '@/components/shoppingCart/equitymap'
import orderList from  '@/components/my/orderList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      children: [
        {
          path: "/",
          component: main,
        },
        {
          path: "/home/my",
          component: My,
        },
        {
          path: "/home/main",
          component: main,
        },
        {
          path: "/home/shoppingCart",
          component: shoppingCart,
        },
        {
          path: "/home/find",
          component: find
        }
      ]
    }, {
      path: "/product/:id",
      name: "product",
      component: product,
      meta: {
        title: '锦穗'
      }
    }, {
      path: "/setting",
      name: "setting",
      component: setting
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path:"/equitymap",
      name:"equitymap",
      component:equitymap

    },
    {
      path:"/orderList",
      name:"orderList",
      component:orderList
    }

    ]
})
