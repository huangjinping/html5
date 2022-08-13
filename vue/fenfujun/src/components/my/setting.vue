<template>
  <div>
    <ul class="menu">
      <li class="menu_item">
        <span>用户名</span> <span>杨连鹏</span>
      </li>
      <li class="menu_item">
        <span>手机号</span> <span>13611290917</span>
      </li>
      <li class="menu_item">
        <span>登录密码</span> <span>已设置></span>
      </li>
      <li class="menu_item">
        <span>官方微信</span> <span>分付君</span>
      </li>
    </ul>
    <img src="../../assets/img/timg.png" class="app_qr"/>
    <button @click="onLogout()" class="submitBtn">退出登录</button>
  </div>
</template>
<script>
  export default{
    name: "setting",
    data(){
      return {}
    },
    methods: {
      onLogout(){
        this.$router.push("/login");
      }
    }
  }
</script>
<style>

  .menu .menu_item {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 0.3rem;
    font-size: 1.5rem;
  }

  .app_qr {
    width: 50%;
    margin: 2rem auto;
    display: block;
  }

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
</style>
