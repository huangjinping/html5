<template>
  <div class="app" style="height:100%;">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  .app{
  }
  body {
    height: 100%;
  }
</style>
