<template>
  <div class="wrap">
      <div>
        <div v-for="item in dataList" v-bind:key="item.id">
            <div>
              <div class="item_header">
                <p>{{item.businessName}}</p>
                <p>{{item.statusDesc}}</p>
              </div>
              <div class="item_center">
                <img :src='item.orderCommoditys[0].pic' :alt='item.applyAmount'>
              </div>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
  export default{
      name:"orderList",
    data(){
      return {
        navTitle: "我的订单",
        dataList:[],
      }
    },created:function(){
        console.log("====111===1111====");
        this.loadOrderList();
    },methods:{
      loadOrderList:function(){
        var user = this.baseFun.localGet("user");
        console.log("==========>user>>>>>>>>>>");
        console.log(user);
        var  that=this;
        var params = {
          token: user.token,
          id: user.id,
          status:"0",
          postionType:"1",
          pageIndex:"0",
          pageSize:"10",
        }
        this.baseAjax({
          url: "https://daiyutech.com/hd-merchant-web/mobile/order/orderListV2",
          type: 'post',
          showLoading: true,
          params: params,
          success: function (data) {
            var result = data.result;
            console.log(result);
            that.dataList=result;
          }
        });
      }
    }
  }
</script>
<style>
  ul li{
    padding: 0;
    margin: 0;
  }

  .item_header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .item_center img{
    width: 10rem;
    height: 6rem;
    object-fit: cover;
  }
</style>
