<template>
  <div class="container">
    <div class="shuruname">
      <span class="leftTitle">被关注人电话</span>
      <input type="phone" v-model="targetPhone" placeholder="请输入被关注人电话">
    </div>
    <div class="shuruname">
      <span class="leftTitle">被关注人姓名</span>
      <input type="text" v-model="idName" placeholder="请输入名称">
    </div>

    <div class="shuruname">
      <span class="leftTitle">跳转链接</span>
      <input type="text" v-model="redirect_url" placeholder="可不填">
    </div>

    <div class="shuruname">
      <span class="leftTitle">标题</span>
      <input type="text" v-model="pageTitle" maxlength="20" placeholder="可不填">
    </div>
    <div class="tijiaoBtnX" @click="onSend">
      <button>生成追踪链接</button>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';

  export default {
    data() {
      return {
        hostUrl: domain.hostUrl,
        targetPhone: '',
        idName: '',
        redirect_url: '',
        pageTitle: ''
      }
    },
    methods: {
      onSend: function () {
        var self = this;

        const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (this.targetPhone == '') {
          let instance = Toast('请输入手机号');
          return;
        }

        console.log(this.targetPhone);
        if (!reg.test(this.targetPhone)) {
          let instance = Toast('请输入正确手机号');
          return;
        }
        console.log("onSend");
        if (this.idName == '') {
          let instance = Toast("请输入被关注人姓名");
          return;
        }
        var register = localStorage.getItem("register");
        var user = JSON.parse(register);

        var param = {
          sendPhone: user.phone,
          id: user.id,
          targetPhone: this.targetPhone,
          idName: this.idName,
          redirect_url: this.redirect_url,
          pageTitle: this.pageTitle,
        }
        this.$axiosPro("post", this.hostUrl + 'arthur/sendWebArthur', param).then((res) => {
          console.log(res);
          var response = res.data;
          if (0 == response.code) {
            localStorage.setItem("register", JSON.stringify(response.result));
            self.$router.push({
              name: 'view'
            })
          } else {
            let instance = Toast(response.message);
          }
        }).catch((response) => {
        })
      }
    },
    created: function () {
      console.log("==========rocket.vue");
    }
  }

</script>

<style>
  .container {
    width: 100%;
    background-color: white;
  }

  .shuruname {
    margin: 0 .1rem;
    box-sizing: border-box;
    line-height: 0.8rem;
    border-bottom: .01rem solid #eee;
    position: relative;
  }

  .shuruname span {
    display: inline-block;
    width: 27%;
    font-size: .3rem;
    text-align: left;
    font-weight: bold;
  }


  .shuruname input {
    width: 65%;
    height: 0.8rem;
    border: none;
    outline: none;
    box-sizing: border-box;
    font-size: .28rem;
    background: #fff;
  }

  .shuruname i {
    width: 6%;
    font-size: .45rem;
    position: absolute;
    right: 0rem;
    top: .4rem;
  }


  .shuruname i {
    width: 6%;
    font-size: .45rem;
    position: absolute;
    right: 0rem;
    top: .4rem;
  }

  .tijiaoBtnX {
    width: 100%;
    margin-top: .3rem;
    padding: 0 .3rem;
    box-sizing: border-box;
    margin-bottom: .5rem;
  }

  .tijiaoBtnX button {
    width: 100%;
    height: .8rem;
    border: none;
    background: #2976EA;
    border-radius: 7px;
    color: #fff;
    font-size: .3rem;
  }

  .yanzhnegmaBtn {
    /*float:right;*/
    display: inline;
    position: absolute;
    top: 0;
    right: 0.1rem;
    overflow: hidden;
    margin-top: .1rem;
    border: none;
    font-size: .28rem;
    color: #248ce3;
    cursor: pointer;
  }
</style>
