<template>
  <div class="container" style="height: 100%">

    <div v-transfer-dom >

      <loading :show="show1" :text="text1"  ></loading>
    </div>
    <view-box ref="viewbox" >
      <router-view></router-view>
      <tabbar>
        <tabbar-item selected link="/home/main">
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item link="/home/find">
          <span slot="label">学习培训</span>
        </tabbar-item>
        <tabbar-item link="/home/shoppingCart">
          <span slot="label">购物车</span>
        </tabbar-item>
        <tabbar-item  link="/home/my">
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<style>
  .container {
  }

</style>
<script>
  import {Tabbar, Icon, TabbarItem, XHeader, Loading, ViewBox} from 'vux'
  import {TransferDomDirective as TransferDom} from 'vux'
  import {mapGetters} from 'vuex'


  export default{
    name: "Home",
    data: function () {
      return {
        message: "hom111e",
        text1: 'Processing',
        show1:false
      }
    },
    components: {
      Tabbar,
      TabbarItem,
      XHeader,
      Loading,
      ViewBox,
      Icon
    }
  }
</script>
