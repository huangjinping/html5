<template>
  <div class="wapper">
    <div style="height: 30%" class="headerView">
      <img class="iconView" src="../../assets/img/wode1.png" alt="">
      <div>
        <p>姚占弟</p>
        <p>139****8231</p>
      </div>
    </div>
    <ul class="menu">
      <li @click="onItem(index)" class="menu_list" v-for="(item,index) in menuList">
        <div>
          <img v-bind:src="item.icon"/>
          <span>{{item.title}}</span>
        </div>
        <img src="../../assets/img/商家名称进入@2x.png" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
    name: "My",
    data: function () {
      return {
        message: "My",
        imgUrl: require("../../assets/img/bangzhuZhongxin(3).png"),
        menuList: [
          {icon: require("../../assets/img/bangzhuZhongxin(3).png"), title: "我的订单"},
          {icon: require("../../assets/img/bangzhuZhongxin(4).png"), title: "我的账单"},
          {icon: require("../../assets/img/bangzhuZhongxin(5).png"), title: "信用分"},
          {icon: require("../../assets/img/bangzhuZhongxin(4).png"), title: "银行卡"},
          {icon: require("../../assets/img/bangzhuZhongxin(5).png"), title: "帮助中心"},
          {icon: require("../../assets/img/bangzhuZhongxin(4).png"), title: "设置"},
        ]
      }
    },
    methods: {
      onItem(e){
        console.log(e);
        switch (e) {
          case 0:
            this.$router.push("/orderList");
            break
          case 5:
            console.log("===》》》》111");
            this.$router.push("/setting");
            break
        }
      }
    }
  }
</script>
<style>


  .wapper {
    height: 100%;
  }

  .headerView {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30%;
    color: black;
    font-weight: bold;
  }

  .headerView .iconView {
    width: 4rem;
    height: 4rem;
  }

  .menu .menu_list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 2rem;
    border-bottom: 1px solid #ccc;
    padding: 0.5rem;
  }

  .menu .menu_list:nth-child(2n+1) {
    border-top: 0.3rem solid #ccc;
  }

  .menu .menu_list div img {
    vertical-align: middle;

  }

  .menu .menu_list div span {
    vertical-align: middle;
  }


</style>

