<template>
  <div>
    <h1>{{count}}</h1>
    <p>addView</p>
    <button @click="addAction">addAction</button>
    <button @click="subAction">subAction</button>

  </div>
</template>
<script type="text/javascript">
  import {mapState, mapGetters, mapMutations,mapActions} from 'vuex'
  export default{
    name: "MyAction",
    computed: {
      ...mapState([
          'count'
      ])
    },
    methods: {
      addAction(){
        console.log("addAction");
        this.$store.dispatch('increment');
      }, subAction(){
        console.log("subAction");
        this.$store.dispatch('incrementAsync');
      },
      ...mapActions([
          'increment'
      ])
    }
  }
</script>
<style>

</style>
