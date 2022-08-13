<template>
  <div class="container">
    <div class="headerView">
    </div>
    <div class="orderList">
      <div class="orderItem" v-for="(item,index) in orderList" :key="index">
        <div><span class="idName">{{item.idName}}</span><span class="status">{{item.status}}</span><img src="" alt="">
        </div>
        <div><span class="createTime">{{item.createTime}}</span> <span @click="onCopy(index)" class="copy">复制链接</span>
        </div>
        <div class="urlView"><span class="url">{{item.url}}</span></div>
      </div>
    </div>
    <div class="addActionView">
      <button class="addAction" @click="onAction">添加</button>
    </div>
  </div>
</template>
<style>
  .container {
    background-color: #f0f0f0;
    height: 100%;
    padding: 0.2rem;
  }

  .orderItem {
    margin-top: 0.2rem;
    border-radius: 0.2rem;
    background-color: white;
    padding: 0.2rem;
    font-size: 0.2rem;
  }

  .orderItem .idName {
    font-size: 0.3rem;
    font-weight: bold;
    color: black;
  }

  .orderItem .status {
    float: right;
  }

  .orderItem .copy {
    background-color: #0B85CC;
    color: white;
    padding: 0.1rem;
    border-radius: 0.1rem;
    float: right;
    font-size: 0.2rem;
  }

  .orderItem .url {
    font-size: 0.2rem;
    color: black;
  }

  .orderItem .urlView {
    margin-top: 0.2rem;
  }


  .addActionView {
    margin-top: 0.4rem;
    text-align: center;
  }

  .addAction {
    width: 90%;
    height: 0.7rem;
    background-color: #0B85CC;
    border-radius: 0.2rem;
    line-height: 0.7rem;
    margin: 0 auto;
    color: white;
  }


</style>

<script>
  import {Toast} from 'mint-ui';

  export default {
    data() {
      return {
        hostUrl: domain.hostUrl,
        targetPhone: '',
        idName: '',
        redirect_url: '',
        pageTitle: '123',
        user: null,
        orderList: []
      }
    },
    methods: {
      onAction:function(){
        var self = this;
        // self.$router.push({
        //   name: 'target',
        //   query:{
        //     signCode:"123123123"
        //   }
        // })
        self.$router.push({
          name:'rocket'
        })

      },
      onCopy: function (index) {
        console.log("========>>>>>>>" + index);
      },
      getWebArthurList: function () {
        var param = {
          token: this.user.id,
          id: this.user.token,
          phone: this.user.phone
        }
        console.log(param);
        var self = this;
        this.$axiosPro("post", this.hostUrl + 'arthur/getWebArthurList', param).then((res) => {
          console.log(res);
          var data = res.data;
          self.orderList = data.result;
          console.log(self.orderList);
        }).catch((response) => {

        })
      },
      isLogin: function () {
        var register = localStorage.getItem("register");
        console.log(register);
        if (register == '' || register == null) {
          return false;
        } else {
          var user = JSON.parse(register);
          this.user = user;
          return true;
        }
      },
      onSend: function () {
        var self = this;

        const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (phone == 0) {
          let instance = Toast('请输入手机号');
          return;
        }
        if (!reg.test(this.phone)) {
          let instance = Toast('请输入正确手机号');
          return;
        }
        console.log("onSend");
        if (this.idName == '') {
          let instance = Toast("请输入被关注人姓名");
          return;
        }
        var param = {
          targetPhone: this.targetPhone,
          idName: this.idName,
          redirect_url: this.redirect_url,
          pageTitle: this.pageTitle,
        }
        var self = this;
        this.$axiosPro("post", this.hostUrl + 'arthur/sendWebArthur', param).then((res) => {
          // console.log(res);

        }).catch((response) => {
          // self.$router.push({
          //   name:'target',
          //   query:{signCode:"vnrKAGc"}
          // })

        })

      }
    },
    created: function () {
      var isLogin = this.isLogin();
      console.log(isLogin);

      if (isLogin) {
        this.getWebArthurList();
      } else {
        this.$router.replace({
          name: 'login'
        })
      }
    }
  }
</script>
