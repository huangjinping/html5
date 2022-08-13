<template>
  <div>

    <div>
      <div class="banner">
        <swiper loop auto :list="demo01_list" v-model="banner_index" @on-index-change="onIndexChange"></swiper>
      </div>
      <p>{{name}}</p>
    </div>

    <div class="footerView">
      <div class="footer_item">
        <img src="../../assets/img/lianxi.png" alt="">
        <span>联系商家</span>
      </div>
      <div class="footer_item">
        <img src="../../assets/img/gouwuA1.png" alt="">
        <span>购物车</span>
      </div>
      <div class="footer_item">
        <span>￥100</span>
      </div>

      <div class="footer_btn_right">
        <button>确认分期</button>
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
    name: "product",
    components: {
      Swiper
    },
    data(){
      return {
        banner_index: 0,
        demo01_list: baseList,
        name: "",
      }
    },
    beforeCreate: function () {
      console.group('beforeCreate 创建前状态===============》');
    },
    created: function () {
      console.group('created 创建完毕状态===============》');
      this.loadProductDetails();
    },
    beforeMount: function () {
      console.group('beforeMount 挂载前状态===============》');
    },
    mounted: function () {
      this.loadProductDetails();
      console.group('mounted 挂载结束状态===============》');
    },
    beforeUpdate: function () {
      console.group('beforeUpdate 更新前状态===============》');
    },
    updated: function () {
      console.group('updated 更新完成状态===============》');
    },
    beforeDestroy: function () {
      console.group('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function () {
      console.group('destroyed 销毁完成状态===============》');
    },
    methods: {
      onIndexChange: function () {

      },
      loadProductDetails: function () {

        var user = this.baseFun.localGet("user");
        var params = {
          custId: user.id,
          id: this.$route.params.id
        }
        var that = this;
        this.baseAjax({
          url: 'https://daiyutech.com/hd-merchant-web/mobile/detail/commodity',
          type: "post",
          params: params,
          showLoading: true,
          success: function (data) {
            console.log(data);
            if (0 == data.code) {
              var result = data.result;
              console.log(result);
              var picArr = [];
              result.piclist.forEach(function (e1, e2, e3) {

                var item = {
                  img: e1
                }
                picArr.push(item);
              });
              that.demo01_list = picArr;
            } else {
              console.log("错误了");
            }
          }
        })
      }
    }
  }
</script>

<style>
  .footerView {
    display: flex;
    flex-direction: row;
    position: fixed;
    width: 100%;
    bottom: 0;
    background-color: whitesmoke;
  }

  .footer_item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
  }

  .footer_item img {
    width: 1rem;
    height: 1rem;
    display: block;
  }

  .footer_btn_right {
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }

  .footer_btn_right button {
    background-color: #00BFF0;
    color: white;
    height: 2rem;
    margin-right: 1rem;
  }

</style>
