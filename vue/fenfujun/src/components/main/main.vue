<template>
  <div>
    <div class="headerView">
      <span class="cityName">北京</span>
      <div class="searchBar">
        <input type="text" placeholder="请输入课程、商家">
      </div>
      <div><img src="../../assets/img/saoMa.png" alt="扫描二维码">
        <img src="../../assets/img/newXiao.png" alt="新闻资料">
      </div>
    </div>

    <div>
      <div class="banner">
        <Swiper  loop auto :list="demo01_list" v-model="banner_index" @on-index-change="onIndexChange"></Swiper>
      </div>
    </div>

    <div>
      <ul class="menu_container">
        <li class="menu_item">
          <img src="../../assets/img/qiyebei.png" alt="企业背调">
          <span>企业背调</span>
        </li>
        <li class="menu_item">
          <img src="../../assets/img/pingtaijiesao.png" alt="平台介绍">
          <span>平台介绍</span>
        </li>
        <li class="menu_item">
          <img src="../../assets/img/shangwuhezuo.png" alt="商务合作">
          <span>商务合作</span>
        </li>
        <li class="menu_item">
          <img src="../../assets/img/mydingdan.png" alt="我的订单">
          <span>我的订单</span>
        </li>
        <li class="menu_item">
          <img src="../../assets/img/myzhangdan.png" alt="我的账单">
          <span>我的账单</span>
        </li>
      </ul>
    </div>


    <div class="commodityList">
      <div @click="onClickItem(item)" class="commodity_item" v-for="item  in  commodityList" v-bind:key="item.commodityId">
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
<script type="text/javascript">
  import {Swiper} from 'vux'
  const baseList = [{
    url: 'http://m.baidu.com',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
    title: '送你一朵fua'
  }, {
    url: 'http://m.baidu.com',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
    title: '送你一辆车'
  }, {
    url: 'http://m.baidu.com',
    img: 'https://static.vux.li/demo/5.jpg',
    title: '送你一次旅行',
    fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
  }]
  export default{
    name: "main",
    mounted(){
      this.loadLatest();
      this.loadCommodityListForH5();
    },
    data(){
      return {
        banner_index: 0,
        demo01_list: baseList,
        commodityList: [],
      }
    },
    components: {
      Swiper
    },
    methods: {
      onClickItem: function (e) {
        this.$router.push("/product/"+e.commodityId);
      },
      onIndexChange: function (e) {
      },
      loadCommodityListForH5: function () {
        var that = this;
        this.baseAjax({
          url: homeHost+'mobile//discovery/commodityListForH5',
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
      },
      loadLatest(){
        var that = this;
        this.baseAjax({
          url: 'https://daiyutech.com/hd-merchant-web/mobile/home',
//          url: 'https://ic.daiyutech.com/hd-merchant-web/mobile/home',
          type: "post",
          showLoading: true,
          success: function (data) {
            console.log(data);
            if (data.code == 0) {
              var result = data.result;
              var banner = result.banner;
              var banner3 = [];
              banner.forEach(function (e1, e2, e3) {
                var item = {
                  url: e1.pageUrl,
                  img: e1.pic
                }
                banner3.push(item);
              });
              that.demo01_list = banner3;
            } else {
            }
          }
        })
      }
    }
  }
</script>
<style lang="less">

  .headerView {
    display: flex;
    flex-direction: row;
    height: 3rem;
    align-items: center;
    overflow: hidden;

  }

  .headerView .cityName {
    width: 3rem;
    display: inline-block;
    text-align: center;
  }

  .headerView .searchBar {
    flex: 1;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .headerView .searchBar input {
    background-color: #cccccc;
    width: 100%;
    padding-left: 0.5rem;
    height: 2rem;
    border: 1px;
    border-radius: 1rem;
    box-shadow: none

  }

  ul.menu_container {
    display: flex;
    flex-direction: row;
    list-style: none;
    margin-top: 1rem;
  }

  .menu_container li.menu_item {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  li.menu_item img {
    width: 70%;
  }

  li.menu_item span {
    font-size: 0.2rem;
    margin: 0.5rem 0;
  }

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
