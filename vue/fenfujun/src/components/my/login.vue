<template>
  <div class="warpper">
    <div class="inputItem">
      <input v-model="phone" maxlength="11" type="text" placeholder="请输入手机号">
    </div>
    <div class="inputItem">
      <input v-model="password" type="password" placeholder="请输入密码">
    </div>
    <div class="actionView">
      <span>忘记密码</span>
    </div>
    <button @click="onSubmit" class="submitBtn">登录</button>
  </div>
</template>
<script>

  import  Md5  from "../../assets/js/md5";
  import { MessageBox } from 'mint-ui';

  export default{
    name: "login",
    data(){
      return {
        phone: "13611290917",
        password: "wo123456",
      }
    },
    methods: {
      onSubmit: function () {
        let phone = this.phone;
        let password = this.password;
        var params = {
          phone: phone,
          password: Md5.hex_md5(password)
        }
        console.log(params);
        var that = this;
        this.baseAjax({
          url: homeHost+"mobile/login",
          type: 'post',
          showLoading: true,
          params: params,
          success: function (data) {
            console.log(data);
            if(data.code==0){
              var result = data.result;
              console.log(result);
              that.baseFun.localSet( result,"user");
              that.$router.push("/home");
            }else {
              MessageBox(''+data.message, '')
            }
          }
        });
      }
    }
  }
</script>
<style>
  .submitBtn {
    background-color: orange;
    margin: 2rem auto;
    display: block;
    width: 80%;
    height: 3rem;
    font-size: 1.5rem;
    line-height: 3rem;
    border-radius: 2rem;
    color: whitesmoke;
    outline: none;
    box-shadow: none;
    border: none;
  }

  .inputItem input {
    color: #808080;
    font-size: 1rem;
    display: block;
    width: 80%;
    margin: 1rem auto;
    outline: none;
  }

  .actionView {
    display: flex;
    flex-direction: row-reverse;
    margin: 1rem;
  }

</style>
