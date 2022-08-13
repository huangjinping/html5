<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'App',
    created:function(){
      // console.log(new Date().getTime())
      // console.log(localStorage.getItem('time'))
      // console.log(1000*60*60*24*7)
      var newData = 1000*60*60*24
      var data = new Date().getTime() - localStorage.getItem('time')
      if(data>newData){
        // console.log(1)
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('result');
        localStorage.removeItem('time')
      }
    },
    methods:{
      // aaaaaaa(){
      //     this.$router.push({
      //             path: '/activePage',
      //             name:'activePage',
      //         })
      // }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    /* margin-top: 60px; */
    /* position: absolute;
    top: 0;
    bottom: 0; */
    /* width: 100%; */
    /* background: #F0F0F0; */
    /* display: -webkit-flex; */
    /* -webkit-flex-direction: column;  */
  }
  /* #xuanfuImg{
   z-index: 99999999999;
   background: red;
   position: fixed;
   right: 0rem;
   bottom: 0.5rem;
    width: 4rem;
   height: 4rem;
   pointer-events: auto;
   padding-top: 1rem;
   padding-left: 1rem;
 }  */

</style>
