$(function () {
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
        url: "https://daiyutech.com/hd-merchant-web/mobile/order/getContratUrlList",
        dataType: "json",
        success: function (data) {
            console.log(data)
            if (data.code == 0) {
                $("#loading").empty(); //ajax返回成功，清除loading图标
                $("#loadingBox").hide()               
                var html = ' <ul class="AgreeUl"></li>';            
                for (var i = 0; i < data.result.ios.length; i++) {
                    if(data.result.ios[i].readStatus == 1){
                        checkboxs = 'checked'
                    }else{
                        checkboxs = '';
                    }
                    html = html + '<li class="AgreeLi"><input type="checkbox" name="Ag" '+checkboxs+' data-ids="'+data.result.ios[i].id+'" disabled>';
                    html = html + '<a class="and lisA"   href="' + data.result.ios[i].htmlUrl + '?id='+data.result.ios[i].id+'&applyId='+applyId+'" >' + data.result.ios[i].name + '</a>';
                    html = html + ' </li>';
                }
               // ' + data.result.ios[i].htmlUrl + '
                html = html + "<ul>";
                $("#table").html(html);
                $("#AgreeBtn").removeAttr("disabled");
               
            }
        },
        error:function(msg){
            console.log(msg)
        }
    });
    $("#AgreeBtn").click("on", function (){
        var allCheckNum = $("input[type='checkbox']").length;
        var checkedNum = $("input[type='checkbox']:checked").length;
        console.log(allCheckNum)
        console.log(checkedNum)
        if (allCheckNum != checkedNum) {
            alert("请全部选中！");
        } else{
            $("#loadingBox").show()
            $("#loading").html("<img src='img/icon_loading.png' />"); //在后台返回success之前显示loading图标
            $("#loading").show()
            $.ajax({ //展示列表数据
                type: "post",
                async: false,
                timeout: 60000,
                data: {
                    "applyId": applyId
                },
                url: "https://daiyutech.com/hd-merchant-web/mobile/order/signContrat",
                dataType: "json",
                beforeSend: function (XMLHttpRequest) {
                   // console.log(XMLHttpRequest)
                    $("#loadingBox").show()
                    $("#loading").html("<img src='img/icon_loading.png' />"); //在后台返回success之前显示loading图标
                    $("#loading").show()
                    
                },
                success: function (data) {
                    $("#loading").empty(); //ajax返回成功，清除loading图标
                    $("#loadingBox").hide()
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
                    $("#loading").empty(); //ajax返回成功，清除loading图标
                    $("#loadingBox").hide()
                }
            });
        }
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




})