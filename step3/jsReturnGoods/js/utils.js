/**
 * Created by harrishuang on 2019/3/4.
 */
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


function myTrim(x) {
    return x. replace(/\s+/g,"");
//        return x.replace(/^\s+|\s+$/gm,'');
}




function isEmpty(src) {
    if (typeof(src) == 'undefined' || src == null || src == "") {
        return true;
    } else {
        return false;
    }
}

function isLogin() {
    var data = localStorage.getItem('register')
    if (isEmpty(data)) {
        return false;
    }
    var LoginTokenAS = JSON.parse(localStorage.getItem('register'));
    if (LoginTokenAS == null) {
        return false;
    }
    return true;
}


(function () {
    $.MsgBox = {
        Alert: function (e) {
            var params = {
                title: "温馨提示",
                msg: "",
                positiveTitle: "确定",
                negativeTitle: "取消",
                type: "alert",
                callback: function () {
                },
                isCancel: false
            }
            if (e) {
                console.log(e);
                for (var item in e) {
                    console.log(item);
                    params[item] = e[item];

                }
                console.log(params);
            }
            GenerateHtml(params);
            btnOk(params.callback); //alert只是弹出消息，因此没必要用到回调函数callback
            btnNo();
        },
        Confirm: function (e) {
            var params = {
                title: "温馨提示",
                msg: "",
                positiveTitle: "确定",
                negativeTitle: "取消",
                type: "confirm",
                callback: function () {
                },
                negativeCallback: function () {
                },
                isCancel: false
            }
            if (e) {
                console.log(e);
                for (var item in e) {
                    console.log(item);
                    params[item] = e[item];
                }
            }
            GenerateHtml(params);
            btnOk(params.callback); //alert只是弹出消息，因此没必要用到回调函数callback
            btnNo(params.negativeCallback);
        }
    }
    //生成Html
    var GenerateHtml = function (param) {
        var _html = "";
        _html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">' + param.title + '</span>';
        _html += '<a id="mb_ico">x</a><div id="mb_msg">' + param.msg + '</div><div id="mb_btnbox">';
        if (param.type == "alert") {
            _html += '<input id="mb_btn_ok" type="button" value=' + param.positiveTitle + ' />';
        }
        if (param.type == "confirm") {
            _html += '<input id="mb_btn_ok" type="button" value=' + param.positiveTitle + ' />';
            _html += '<input id="mb_btn_no" type="button" value=' + param.negativeTitle + ' />';
        }
        _html += '</div></div>';
        $("#mb_box,#mb_con").remove();
        //必须先将_html添加到body，再设置Css样式
        $("body").append(_html);
        //生成Css
        GenerateCss();
        if (!param.isCancel) {
            $("#mb_ico").css("display", "none");
        }
    }

    //生成Css
    var GenerateCss = function () {
        $("#mb_box").css({
            width: '100%',
            height: '100%',
            zIndex: '99999',
            position: 'fixed',
            filter: 'Alpha(opacity=60)',
            backgroundColor: 'black',
            top: '0',
            left: '0',
            opacity: '0.6'
        });
        $("#mb_con").css({
            zIndex: '999999',
            width: '80%',
            position: 'fixed',
            backgroundColor: 'White',
            borderRadius: '15px'
        });
        $("#mb_tit").css({
            display: 'block',
            fontSize: '14px',
            color: '#444',
            padding: '10px 15px',
            backgroundColor: '#DDD',
            borderRadius: '15px 15px 0 0',
            borderBottom: '3px solid #009BFE',
            fontWeight: 'bold',
            textAlign: "center",
        });
        $("#mb_msg").css({
            padding: '20px',
            lineHeight: '20px',
            borderBottom: '1px dashed #DDD',
            fontSize: '13px'
        });
        $("#mb_ico").css({
            display: 'block',
            position: 'absolute',
            right: '10px',
            top: '9px',
            border: '1px solid Gray',
            width: '18px',
            height: '18px',
            textAlign: 'center',
            lineHeight: '16px',
            cursor: 'pointer',
            borderRadius: '12px',
            fontFamily: '微软雅黑'
        });
        $("#mb_btnbox").css({
            margin: '15px 0 10px 0',
            textAlign: 'center'
        });
        $("#mb_btn_ok,#mb_btn_no").css({
            width: '85px',
            height: '30px',
            color: 'white',
            border: 'none'
        });
        $("#mb_btn_ok").css({
            backgroundColor: '#FF7900'
        });
        $("#mb_btn_no").css({
            backgroundColor: '#FF7900',
            marginLeft: '20px'
        });
        //右上角关闭按钮hover样式
        $("#mb_ico").hover(function () {
            $(this).css({
                backgroundColor: 'Red',
                color: 'White'
            });
        }, function () {
            $(this).css({
                backgroundColor: '#DDD',
                color: 'black'
            });
        });
        var _widht = document.documentElement.clientWidth; //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高
        var boxWidth = $("#mb_con").width();
        var boxHeight = $("#mb_con").height();
        //让提示框居中
        $("#mb_con").css({
            top: (_height - boxHeight) / 2 + "px",
            left: (_widht - boxWidth) / 2 + "px"
        });
    }
    //确定按钮事件
    var btnOk = function (callback) {
        $("#mb_btn_ok").click(function () {
            $("#mb_box,#mb_con").remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
    //取消按钮事件
    var btnNo = function (callback) {
        $("#mb_btn_no,#mb_ico").click(function () {
            $("#mb_box,#mb_con").remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
})();