<template>
  <div>
    <p> 我是页面{{$store.state.count}}</p>
    <!--<button @click="add()">+</button>-->
    <!--<button @click="sub()">-</button>-->
    <button @click="myIncrement">添加商品</button>
    <p>{{$store.getters.doneTodos.length}}</p>
    <p>==================doneTodos===========>>>></p>
    <p>{{doneTodosCount}}</p>
    <p>{{doneTodos.length}}</p>
    <button @click="myIncrement2">Mutation</button>
    <p></p>
    <button @click="increment">Mutation</button>

  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default{
    name: "My",
    data(){
      return {
        myTitle: "my____Title"
      }
    },
    computed: {
      doneTodosCount () {
        return this.$store.getters.doneTodos.length;
      },
      ...mapGetters([
        'doneTodos',
        // ...
      ])
    },
    methods: {

      ...mapMutations([
        'increment'
      ]),
      add: function () {
        console.log("====methods==>>>>>");
        this.$store.state.count++;
      },
      sub: function () {
        console.log("====sub======>>>>>");
        this.$store.state.count--;
      },
      myIncrement: function () {
//        this.$store.commit("increment");
        this.$store.commit("increment", 10);
      },
      myIncrement2: function () {
        console.log("myIncrement2");
        var that = this;
        setTimeout(function (e) {
          that.$store.commit("increment2", {
            amount: 12
          });
        }, 2000);
        console.log("myIncrement21111");
      }
    }
  }
</script>
<style>
</style>
