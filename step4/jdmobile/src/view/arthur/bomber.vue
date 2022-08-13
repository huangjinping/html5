<template>
  <div class="container">

  </div>
</template>
<style>
  .container {
    background-color: #f0f0f0;
    height: 100%;
    padding: 0.2rem;
  }

</style>

<script>
  import {Toast} from 'mint-ui';
  import {bullets} from '../../utils/bullets.js';

  export default {
    data() {
      return {
        hostUrl: domain.hostUrl,
        targetPhone: '13611290917',

      }
    },
    methods: {

      getMessageList: function () {
        var param = {
          targetPhone: "",
        }
        // var self = this;
        // this.$axiosPro("post", 'https://www.xyd.cn/app/sendCode', param).then((res) => {
        //   console.log(res);
        // }).catch((response) => {
        // })

      }
    },
    created: function () {
      this.getMessageList();

      var self = this;
      var myMethods = {
        // func1: function () {
        //   var param = {
        //     phoneNumber: self.targetPhone,
        //     graphValidateCode:""
        //   }
        //  self.$axiosPro("post", 'https://www.xyd.cn/app/sendCode', param).then((res) => {
        //      console.log(res);
        //    }).catch((response) => {
        //
        //    })
        //  },
        func2: function () {
          var param = {
            androidid:"6b96577890d71d50",
            source:"1",
            device_id:"8d6d6a4ed6f80791766afde6b8d4a746ee",
            imei:"860128034146025",
            mobile:self.targetPhone,
            version:"2.0.3",
            statistics_os_version:"7.0",
            statistics_app_channel:"yyb",
            statistics_carrier:"Unknown"
          }
          self.$axiosPro("post", 'http://terasure.api.51gzjingxin.com/terasure/auth/getCode', param).then((res) => {
            console.log(res);
          }).catch((response) => {
            console.log(response);
          })
        },
        func3: function () {
          console.log("func3--");

        },
        func4: function () {
          console.log("func4--");

        },
        func5: function () {
          console.log("func5--");
        }
      }
      console.log(myMethods);
      for (let func in myMethods) {
        myMethods[func]();
      }

    }
  }
</script>
