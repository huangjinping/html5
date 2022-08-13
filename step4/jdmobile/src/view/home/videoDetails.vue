<template>
  <div class="container">
    <div class="header">
      <div class="title">
        {{videoItem.title}}
      </div>
      <div class="headerbuttom">
        <div class="left">
          <img :src="videoItem.avatarurl" alt="" class="avatar">
          <p>{{videoItem.nickname}}</p>
        </div>
        <div class="right">
          <img src="../../assets/home/ic_shoucang.png" alt="" class="avatar">
        </div>
      </div>
    </div>
    <p style="text-align: center">
      <iframe class="video_iframe" style="z-index:1;" :src="url" allowfullscreen="true" frameborder="0" height="375"
              width="100%"></iframe>
    </p>
    <div class="fenxiang">
      <div class="sharedItem">
        <img src="../../assets/home/ic_weixinF.png" @click="onSharedWx()" alt="">
        <span>发送给朋友</span>
      </div>
      <div class="sharedItem">
        <img src="../../assets/home/ic_pengyouquan.png" @click="onSharedQuan()" alt="">
        <span>发送给朋友圈</span>
      </div>
    </div>
  </div>
</template>
<script>


  export default {
    data() {
      return {
        hostUrl: domain.hostUrl,
        id: "",
        url: '',
        screenWidth: 500,
        videoItem: {}
      }
    },
    methods: {
      onSharedWx: function () {
        // window.location.href="http://weixin.qq.com/r/O0VTSwTEx1m4rUAo9xAp";

      },
      onSharedQuan: function () {
        // window.location.href="http://weixin.qq.com/r/O0VTSwTEx1m4rUAo9xAp";

      },

      getUrlById: function (id) {
        this.screenWidth = this.getViewportSize.width;
        const url = 'https://v.qq.com/iframe/player.html?vid=' + id + '&amp;width=' + this.screenWidth + '&amp;height=375&amp;auto=0';
        this.url = url;
        console.log(url);
      },

      getVideoById: function (id) {
        this.$axiosPro("post", this.hostUrl + 'cate/video/getVideoById', {
          txvid: this.id
        }).then((res) => {
          console.log("======================");
          console.log(res);
          if (res.data.code == 0) {
            this.videoItem = res.data.result;
            this.getUrlById(res.data.result.txvid);
          }
        }).catch((response) => {
          console.log(response);
        })
      }


    }, created: function () {
      this.id = this.$route.query.id;
      console.log(this.id);
      // "w0841yabw4y"
      this.getVideoById(this.id);
    }

  }


</script>

<style>

  .container {
    font-size: 0.3rem;
  }

  .header .title {
    margin: 0.2rem;
    font-size: 0.5rem;
  }

  .headerbuttom {
    display: flex;
    flex-direction: row;
    padding: 0rem 0.2rem;
    margin-top: 0.1rem;
    justify-content: space-between;
    align-items: center
  }

  .headerbuttom .left {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }


  .avatar {
    object-fit: cover;
  }

  .headerbuttom .left img {
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    margin: 0 0.1rem;
  }

  .headerbuttom .right {

  }

  .headerbuttom .right img {
    width: 0.3rem;
    height: 0.3rem;
  }


  .fenxiang {
    display: flex;
    margin-top: 0.1rem;
  }

  .sharedItem {
    flex: 1;
    background-color: #f40;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 0.3rem;
    margin: 0.1rem;
    font-size: 0.3rem;
    border-radius: 0.3rem;
  }

  .sharedItem img {
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0.4rem;
  }

  .sharedItem button {
    color: white;
    font-size: 0.4rem;
    border: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

</style>
