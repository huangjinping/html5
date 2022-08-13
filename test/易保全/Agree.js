$(function () {
    //document.getElementById('loadingBox').style.display='none';
    document.getElementById('loading').style.display='none';
    var applyId = getParameter("applyId");
    var system = systemType();
    $.ajax({ //展示列表数据
        type: "post",
        async: false,
        timeout: 60000,
        data: {
            "applyId": applyId
        },
        url: "https://ic.daiyutech.com/hd-merchant-web/mobile/order/getContratUrlList",  // https://hdfex.com/hd-merchant-web/mobile/order/getContratUrlList
        dataType: "json",
        beforeSend: function (XMLHttpRequest) {
            //document.getElementById('loadingBox').style.display='';
            $("#loading").html("<img src='img/loading.png' />"); //在后台返回success之前显示loading图标
            //$("#loadingBox").show()
            $("#loading").show()
            document.getElementById('loading').style.display='';
        },
        success: function (data) {
            if (data.code == 0) {
                $("#loading").empty(); //ajax返回成功，清除loading图标
                var html = ' <ul class="AgreeUl"><input type="checkbox" class="AgreeSelect" name="Ag" > <span>全选</span></li>';
                if (system == 1 || system == 3) {
                    for (var i = 0; i < data.result.ios.length; i++) {
                        html = html + '<li class="AgreeLi"><input type="checkbox" name="Ag">';
                        html = html + '<a href="' + data.result.ios[i].urlValue + '">' + data.result.ios[i].name + '</a>';
                        html = html + ' </li>';
                    }
                }
                if (system == 2) {
                    for (var i = 0; i < data.result.ios.length; i++) {
                        html = html + '<li class="AgreeLi"><input type="checkbox" name="Ag">';
                        html = html + '<a class="and" href="' + data.result.ios[i].urlValue + '">' + data.result.ios[i].name + '</a>';
                        html = html + ' </li>';
                    }
                }
                //if (system == 2) {
                //    for (var i = 0; i < data.result.android.length; i++) {
                //        html = html + '<li class="AgreeLi"><input type="checkbox" name="Ag">';
                //        html = html + '<a href="' + data.result.android[i].urlValue + '">' + data.result.android[i].name + '</a>';
                //        html = html + ' </li>';
                //    }
                //}
                html = html + "<ul>";
                $("#table").html(html);
                $("#AgreeBtn").removeAttr("disabled");
            } else {
                window.alert = function(name){
                    var iframe = document.createElement("IFRAME");
                    iframe.style.display="none";
                    iframe.setAttribute("src", 'data:text/plain');
                    document.documentElement.appendChild(iframe);
                    window.frames[0].window.alert(name);
                    iframe.parentNode.removeChild(iframe);
                }
                alert(data.message);
            }

        },
        error: function (XMLHttpRequest) {
            window.alert = function(name){
                var iframe = document.createElement("IFRAME");
                iframe.style.display="none";
                iframe.setAttribute("src", 'data:text/plain');
                document.documentElement.appendChild(iframe);
                window.frames[0].window.alert(name);
                iframe.parentNode.removeChild(iframe);
            }
            alert("响应失败" + XMLHttpRequest.status);
        }
    });
    $("#AgreeBtn").click("on", function () {//签约
        if ($(":checkbox").attr("checked") != "checked") {
            window.alert = function(name){
                var iframe = document.createElement("IFRAME");
                iframe.style.display="none";
                iframe.setAttribute("src", 'data:text/plain');
                document.documentElement.appendChild(iframe);
                window.frames[0].window.alert(name);
                iframe.parentNode.removeChild(iframe);
            }
            alert("请您勾选全部协议!")
        } else {
            $.ajax({ //展示列表数据
                type: "post",
                async: false,
                timeout: 60000,
                data: {
                    "applyId": applyId
                },
                url: "https://ic.daiyutech.com/hd-merchant-web/mobile/order/signContrat",
                dataType: "json",
                beforeSend: function (XMLHttpRequest) {
                    $("#loading").html("<img src='img/loading.png' />"); //在后台返回success之前显示loading图标
                    $("#loading").show()
                },
                success: function (data) {
                    $("#loading").empty(); //ajax返回成功，清除loading图标
                    if (data.code == 0 || data.code == 200) {
                        window.location.href = "https://daiyutech.com/bestSignUrl/bestSignSucess.html"
                    } else {
                        window.alert = function(name){
                            var iframe = document.createElement("IFRAME");
                            iframe.style.display="none";
                            iframe.setAttribute("src", 'data:text/plain');
                            document.documentElement.appendChild(iframe);
                            window.frames[0].window.alert(name);
                            iframe.parentNode.removeChild(iframe);
                        }
                        alert(data.message);
                    }
                },
                error: function (XMLHttpRequest) {
                    window.alert = function(name){
                        var iframe = document.createElement("IFRAME");
                        iframe.style.display="none";
                        iframe.setAttribute("src", 'data:text/plain');
                        document.documentElement.appendChild(iframe);
                        window.frames[0].window.alert(name);
                        iframe.parentNode.removeChild(iframe);
                    }
                    alert('响应失败！');
                }
            });
        }
    });


    $(".AgreeSelect").click(function () {
        if (this.checked == true) {
            $("input[name='Ag']").each(function () {
                this.checked = true;
            });
        } else {
            $("input[name='Ag']").each(function () {
                this.checked = false;
            });
        }
    });

    var $subBox = $("input[name='Ag']");
    $subBox.click(function () {
        $(".AgreeSelect").attr("checked", $subBox.length == $("input[name='Ag']:checked").length ? true : false);
    })

    $(".and").click(function () {
        //if(systemType() == "1"){
    //alert($(this).attr('href'));//返回href的值
                hdMobile.openpdf($(this).attr('href'))
    // alert(1)
    //        }else{
    //alert($(this).attr('href'));//返回href的值
    //            hdMobile.openpdf($(this).attr('href'))
    //        }
        })
})

function getParameter(name) {
    var quary = window.location.search;
    var len = quary.length;
    var start = quary.indexOf(name);
    if (start == -1) {
        return "";
    }
    var end = quary.indexOf("&", start);
    if (end == -1) {
        var param = quary.substring(start);
        return param.split("=")[1];
    }
    var param = quary.substring(start, end);
    return param.split("=")[1];
}

function systemType() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
        return 1;
    } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        return 2;
    } else { //pc
        return 3;
    }
}


//function ismobile(test){
//    var u = navigator.userAgent, app = navigator.appVersion;
//    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
//        if(window.location.href.indexOf("?mobile")<0){
//            try{
//                if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
//                    return '0';
//                }else{
//                    return '1';
//                }
//            }catch(e){}
//        }
//    }else if( u.indexOf('iPad') > -1){
//        return '0';
//    }else{
//        return '1';
//    }
//};




