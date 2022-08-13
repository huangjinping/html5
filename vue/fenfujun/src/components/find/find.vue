<template>
  <div>
    <div>adasd</div>

    <div>
      <img src="" alt="">
    </div>


    <div>
      <button v-on:click="addClick()">加一个</button>
      <button v-on:click="subClick()">减一个</button>
      <p>当前的个数{{count}}</p>
      <recommended-list></recommended-list>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapGetters} from 'vuex'
  import recommendedList from  '../common/RecommendedList.vue'

  export default{
    name: "find",
    components:{
      recommendedList
    },
    data(){
      return {
        count: 1,

      }
    },
    methods: {
      addClick: function () {
        console.log("加一个");
        this.count++;
      },
      subClick: function () {
        console.log("减一个");
        this.count--;
      }
    }
  }
</script>
<style>



</style>
