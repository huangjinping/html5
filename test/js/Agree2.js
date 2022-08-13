var progressBar;
var applyId;
var system;
$(function () {

    initView();
    addEventListeners();
    //下载基础数据
    progressBar = new ProgressBar({
        src: './images/loding1.gif',
        progressView: document.getElementById("progressView")
    });

    loadData();


});

var datas = [];

function initView() {
    applyId = getParameter("applyId");
    system = systemType();
}

function addEventListeners() {
    onSubmit();


}


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
function loadData() {


    $.ajax({ //展示列表数据
        type: "post",
        async: false,
        timeout: 60000,
        data: {
            "applyId": applyId
        },
        url: "https://hdfex.com/hd-merchant-web/mobile/order/getContratUrlList",  // https://hdfex.com/hd-merchant-web/mobile/order/getContratUrlList
        dataType: "json",
        beforeSend: function (XMLHttpRequest) {
            progressBar.show();
        },
        success: function (data) {
            progressBar.dismiss();


            console.log(data);
            if (data.code == 0) {

                $(".list_container").empty();

                // data.result.ios[i].id
                datas = data.result.ios;
                for (var k = 0; k < datas.length; k++) {
                    $(".list_container").append("<li class='list_item'>" +
                        "<input type='checkbox' id=" + "protocol_" + k + "> " +
                        "<label for=" + "protocol_" + k + "></label> " +
                        "<span data-index=" + k + " >" + data.result.ios[k].name + "</span>" +
                        "</li>");
                }
                $(".list_container").children().each(function (index, item) {
                    console.log(item);
                });


                $(".list_item span").on("click", function (e) {
                    console.log(e);

                    var index = $(e.currentTarget).data("index")
                    console.log(datas[index].urlValue);
                    if (system == 1 || system == 3) {
                        window.location.href = datas[index].urlValue;
                    } else if (system == 2) {
                        hdMobile.openpdf(datas[index].urlValue)
                    }

                });
            } else {

                new Obj({
                    content: '<p class="pa-01">温馨提示</p><p class="pa-02">data.message</p>',
                    btns: ['我知道了'],
                    method: function () {
                    }
                })
            }

        },
        error: function (XMLHttpRequest) {
            progressBar.dismiss();

            window.alert = function (name) {
                var iframe = document.createElement("IFRAME");
                iframe.style.display = "none";
                iframe.setAttribute("src", 'data:text/plain');
                document.documentElement.appendChild(iframe);
                window.frames[0].window.alert(name);
                iframe.parentNode.removeChild(iframe);
            }
            alert("响应失败" + XMLHttpRequest.status);


        }
    });
}

function onSubmit() {


    var timer;
    var time = 3000;//每次点击三秒后才能再次点击
    var fun = function bClick() {
        var allCheckNum = $("input[type='checkbox']").length;
        var checkedNum = $("input[type='checkbox']:checked").length;
        if (allCheckNum != checkedNum) {
            new Obj({
                content: '<p class="pa-01">温馨提示</p><p class="pa-02">请全部选中</p>',
                btns: ['我知道了'],
                method: function () {
                }
            });
        } else {
            progressBar.show();
            $.ajax({ //展示列表数据
                type: "post",
                async: false,
                timeout: 60000,
                data: {
                    "applyId": applyId
                },
                url: "https://hdfex.com/hd-merchant-web/mobile/order/signContrat",
                dataType: "json",
                beforeSend: function (XMLHttpRequest) {
                    // https://hdfex.com/hd-merchant-web/mobile/order/signContrat

                },
                success: function (data) {
                    progressBar.dismiss();
                    if (data.code == 0 || data.code == 200) {
                        window.location.href = "https://hdfex.com/bestSignUrl/bestSignSucess.html"
                    } else {
                        window.alert = function (name) {
                            var iframe = document.createElement("IFRAME");
                            iframe.style.display = "none";
                            iframe.setAttribute("src", 'data:text/plain');
                            document.documentElement.appendChild(iframe);
                            window.frames[0].window.alert(name);
                            iframe.parentNode.removeChild(iframe);
                        }
                        alert(data.message);
                    }
                },
                error: function (XMLHttpRequest) {
                    progressBar.dismiss();
                    window.alert = function (name) {
                        var iframe = document.createElement("IFRAME");
                        iframe.style.display = "none";
                        iframe.setAttribute("src", 'data:text/plain');
                        document.documentElement.appendChild(iframe);
                        window.frames[0].window.alert(name);
                        iframe.parentNode.removeChild(iframe);
                    }
                    alert('响应失败！');
                }
            });
        }

        $("#btn_submit").unbind("click");
        timer = setTimeout(function () {
            $("#btn_submit").click(fun);
        }, time);
    };
    $("#btn_submit").click(fun);

}