<template>
  <div class="recommendedContainer">
    <div class="commodityList">
      <div @click="onClickItem(item)" class="commodity_item" v-for="item  in  commodityList"
           v-bind:key="item.commodityId">
        <div class="commodity_left">
          <img :src='item.commodityUrl' :alt='item.commodityUrl'>
        </div>
        <div class="commodity_right">
          <p class="commodityName">{{item.commodityName}}</p>
          <div class="bussinessName">
            <p>{{item.bussinessName}}</p>
            <p>{{item.bussinessArea}}</p>
          </div>
          <p class="commodityDesc">{{item.commodityDesc}}</p>
          <div class="commodityPrice">
            <p>￥{{item.commodityPrice}}</p>
            <p>已售{{item.buyCount}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: "recommendedList",
    data(){
      return {
        commodityList: [],
      }
    }, created(){
      this.loadCommodityListForH5();
    },
    methods: {
      onClickItem: function (item) {
        this.$router.push("/product/"+item.commodityId);
      },
      loadCommodityListForH5: function () {
        var that = this;
        this.baseAjax({
          url: 'https://daiyutech.com/hd-merchant-web/mobile/discovery/commodityListForH5',
          type: "post",
          params: {
            addrCounty: "北京",
            commodityType: '00',
            pageIndex: 0,
            pageSize: 20,
          },
          showLoading: true,
          success: function (data) {
            if (data.code == 0) {
              var result = data.result;
              console.log(result);
              that.commodityList = result.commodityList;
            } else {
            }
          }
        });
      }
    }
  }

</script>
<style>

  .commodity_item {
    display: flex;
    flex-direction: row;
    padding: 5px;

  }

  .commodity_item .commodity_left {
    flex: 1;
    overflow: hidden;
  }

  input:focus {
    outline: 0 !important
  }

  .commodity_item .commodity_left img {
    flex: 1;
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  .commodity_item .commodity_right {
    flex: 2;
    padding: 0 5px;
  }

  .commodity_item .commodity_right {
    flex: 2;
    padding: 0 5px;
  }

  .commodity_right .commodityName {
    font-size: 1.2rem;
  }

  .commodity_right .bussinessName {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0.5rem 0;
  }

  .commodity_right .commodityPrice {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0.5rem 0;
  }

  .commodity_right .commodityPrice p:nth-of-type(1) {
    color: orangered;
  }

</style>
