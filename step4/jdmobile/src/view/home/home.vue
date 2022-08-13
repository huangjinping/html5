<template>


    <div class="container">
      <ul class="nav">
        <li @click="onSelectItem(index)" v-for="(item,index) in typeDataList" :key="index" :class="navIndex==index?'nav-item-selected':'nav-item'" >{{item.cateName}}</li>
      </ul>

        <div class="newList">
          <div v-for="(item,index) in videoList" :key="index"  class="video-item">
            <div  @click="onVideoClick(item)" class="video-center">
              <img  :src="item.cover" class="cover" alt="">
               <img src="../../assets/home/ic_player.png" class="player">
              <p class="video-title">{{item.title}}</p>
            </div>
            <div class="video-footer">
              <div class="left">
                <img :src="item.avatarurl" alt="">
                <p>{{item.nickname}}</p>
              </div>
              <div class="right">
                <button @click="onShare(item)">分享</button>
              </div>
            </div>
          </div>
        </div>
    </div>

</template>
<script>
  const  LoadMode={NOMAL:"0",UPLOAD:"1",PULLREFRESH:"2"}
  var  page=0;
  export default {
    data() {
      return {
        hostUrl: domain.hostUrl,
        typeDataList:[],
        navIndex:0,
        videoList:[]
      }
    },
    methods: {
      onShare(e){
        console.log(e.toString());

        window.location.href="http://weixin.qq.com/r/O0VTSwTEx1m4rUAo9xAp";
      },
      onVideoClick(e){
         console.log(e.toString());
        this.$router.push({
          path: '/videoDetail',
          name:'videoDetail',
          query: {
            id:e.id.toString() ,
          }})
      },
      onSelectItem(e){
        console.log(e);
        this.navIndex=e;
        this.getVideoList({
          loadMode: LoadMode.NOMAL
        });
      },
      typeList(){
        this.$axiosPro("post",this.hostUrl+'cate/type/typeList',{}).then( (res)=> {
          if(res.data.code == 0){
            this.typeDataList= res.data.result;
          }
        }).catch((response) => {
          console.log(response);
        })
      },
      getVideoList(mode) {
        console.log("113123123");
        var that = this;
        var typeList = this.typeDataList;
        var cateid ="";
        var navIndex = this.navIndex;
        if (typeList && typeList.length > navIndex){
          console.log(typeList[navIndex]);
          cateid = typeList[navIndex].id.toString();
        }

        if (mode.loadMode != LoadMode.UPLOAD) {
          page = 0;
        }
      var param=  {
          token: "",
            id: "",
          pageIndex: page,
          pageSize: '4',
          cateid: cateid,
          loadMode: mode.loadMode
        }
        console.log(param);

        this.$axiosPro("post",this.hostUrl+'cate/video/videoList',param).then( (res)=> {
            console.log("======================");
            console.log(res);
            if(res.data.code == 0){
              this.videoList=res.data.result;
              console.log(this.videoList);

            }
          }).catch((response) => {
            console.log(response);
          })

      }
    },
    created:function () {
      this.typeList();
      this.getVideoList({
        loadMode: LoadMode.PULLREFRESH
      });
    }
  }
</script>
<style>
  .index-container {
    width: 100%;
    height: 100%;
  }

  .nav {
    width: 100%;
    white-space: nowrap;
    overflow: scroll;
    position: fixed;
    top:0;
    left: 0;
    z-index: 999;
    font-size: 0.5rem;
    background-color: white;
  }

  view::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }

  .nav-item {
    display: inline-block;
    padding: 0.2rem 0.2rem;
    text-align: center;
    color:black;

  }

  .nav-item-selected {
    display: inline-block;
    padding: 0.2rem 0.2rem;
    text-align: center;
    color: red;
  }

  .newList::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }



  .newList::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }


  .video-item{
    margin-top: 20rpx;
    background-color: white;
  }
  .load-view{
    text-align: center;
  }

  .load-img{
    height: 70rpx;
  }

  .video-center{
    position: relative;
    padding: 0.1rem;
  }

  .video-center .cover{
    width: 100%;
    height: 4rem;
  }

  .video-title{
    font-size: 0.3rem;
    position: absolute;
    top:0.1rem;
    left:0.1rem;
    color: white;
    font-weight: bold;
  }
  .video-center  .player{
    width: 2rem;
    height: 2rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .video-footer{
    display: flex;
    flex-direction: row;
    padding: 0 0.1rem;
    justify-content: space-between;
  }

  .video-footer .left{
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    font-size: 0.3rem;
  }


  .video-footer .left img{
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    margin: 0rem 0.1rem;
    object-fit: cover;
  }

  .video-footer .right{
    margin-right: 0.1rem;
    background-color: #36ac2b;
    border-radius: 0.1rem
  }


  .video-footer .right  button{
    border:0;
    font-size: 0.3rem;
    color: white;
    width: 1rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    background-color: #36ac2b;

  }




</style>
