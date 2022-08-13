<template>
  <div class="container">
    <div class="logoImgView">
      <img src="../../assets/images/logo.png">
    </div>

    <form class="centerView">
      <div class="shuruname">
        <span class="leftTitle">手机号</span>
        <input class="rightInput" type="phone" maxlength="11" v-model="phone" placeholder="请输入你的手机号">
      </div>
      <div class="shuruname">
        <span class="leftTitle">验证码</span>
        <input class="rightInput" type="text" maxlength="4" v-model="smsCode" style="width: 40%" placeholder="请输入验证码">
        <div class="yanzhnegmaBtn" @click="refreshCode">
          <s-identify :identifyCode="identifyCode"></s-identify>
        </div>
      </div>
      <div class="tijiaoBtnX" @click="onLogin">
        <button>登录</button>
      </div>
    </form>
  </div>
</template>
<script>

  import SIdentify from '../../components/identify.vue'
  import {Toast} from 'mint-ui';

  export default {
    data() {
      return {
        hostUrl: domain.hostUrl,
        identifyCodes: "1234567890",
        identifyCode: "",
        phone: "",
        smsCode: ""
      }
    }, mounted() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    }, components: {
      SIdentify
    },
    methods: {
      onLogin() {

        var self = this;
        // this.$router.push({
        //   name:'target',
        //   query:{signCode:"vnrKAGc"}
        // })

        const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        var phone = this.phone;
        var smsCode = this.smsCode;
        if (phone == 0) {
          let instance = Toast('请输入手机号');
          return;
        }
        if (!reg.test(this.phone)) {
          let instance = Toast('请输入正确手机号');
          return;
        }
        if (this.smsCode == '') {
          let instance = Toast("请输入验证码");
          return;
        }

        console.log(this.smsCode);
        console.log(this.identifyCode);

        if (this.smsCode != this.identifyCode) {
          let instance = Toast("请输入正确验证码");
          return;
        }
        var param = {
          phone: phone
        }
        this.$axiosPro("post", this.hostUrl + 'app/login', param).then((res) => {
          var response = res.data;
          if (0 == response.code) {
            localStorage.setItem("register", JSON.stringify(response.result));
            self.$router.push({
              name: 'view'
            })
          }
        }).catch((response) => {
        })
      },
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
        }
        console.log(this.identifyCode);
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


  .centerView {
    margin-top: 30%;
  }

  .logoImgView {
    text-align: center;
    margin: 1rem auto;
  }

  .logoImgView img {
    width: 2rem;
    height: 2rem;
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

  .code {
    width: 114px;
    height: 40px;
    border: 1px solid red;
  }

</style>
