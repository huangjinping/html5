<template>
  <div class="shoppingWrapper">
    <div class="headerView">
      <button @click="onEdit" class="btnEdit" v-show="isEdit">编辑</button>
      <button @click="onComplete" class="btnEdit" v-show="!isEdit">完成</button>
    </div>
    <ul class="carList">
      <li class="carItem" v-for="(item,index) in  dataList">
        <div class="carItemHeader">
          <span>{{item.bussinessName}}</span>
          <img src="../../assets/img/门店进入@2x.png" alt="">
        </div>
        <ul class="commodityList">
          <li class="commodityItem" v-for="(commodity,ids) in item.commodityList">
            <img :src="item.prifexUrl+commodity.commodityUrl" alt="">
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
  export default{
    name: "shoppingCart",
    data(){
      return {
        isEdit: false,
        dataList: []
      }
    },
    created(){
      this.loadShopingList();
    },
    methods: {
      onEdit: function () {
        this.isEdit = false;
      },
      onComplete: function () {
        this.isEdit = true;
      },
      loadShopingList: function () {
        var user = this.baseFun.localGet("user");
        var that = this;
        var params = {
          id: user.id,
          token: user.token
        };
        this.baseAjax({
          url: "https://daiyutech.com/hd-merchant-web/mobile/shoping/list",
          params: params,
          success: function (res) {
            console.log("======success==>>>>>");
            console.log(res);
            that.dataList = res.result;
          }
        });
      }
    }
  }
</script>
<style>
  body {
  }

  .shoppingWrapper {
    line-height: 0rem;
  }

  .btnEdit {
    font-size: 0.5rem;
    color: white;
    background-color: orangered;
    border-radius: 0.5rem;
    border: 0;
    padding: 0.3rem 0.5em;
    margin: 0.3rem;
    outline: none;
  }

  .carItemHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem;
    align-items: center;
  }

  .commodityItem img {
    height: 5rem;
    width: 5rem;
  }


</style>
