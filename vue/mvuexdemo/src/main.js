// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'


import '@/router/plugins';

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(Vuex);


var moduelA = {
  state: {
    count: 12,
    todos: [
      {id: 1, text: '...', done: true},
      {id: 2, text: '...', done: false},
      {id: 3, text: '...', done: true}
    ]
  }, getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  },
  mutations: {
    increment (state, n) {
      state.count++;
      console.log("====increment====");
      console.log(n);
    },
    increment2(state, playload){
      state.count += playload.amount
      console.log(playload.amount);

    }
  },
  actions: {
    increment(context){
      console.log("=============================>>>>>>");
      console.log(context);
      context.commit('increment');
      console.log("=============================>>>>>>");
    },
    incrementAsync ({commit}) {
      setTimeout(() => {
        commit('increment', {
          increment: Math.random()
        })
      }, 1000)
    }
  }
}


const store = new Vuex.Store({
  ...moduelA
})
new Vue({
  el: '#app',
  router,
  store: store,
  components: {App},
  template: '<App/>'
})
