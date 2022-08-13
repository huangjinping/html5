!function (window, document, undefined) {
    var url = window.location.href;
    if (url.indexOf("?") != -1) {
        url = url.split("?")[0];
        console.log(url);
    } else {
        console.log(url);
    }

    //提交服务器进行标记
    function onPageStart() {


    }
    
}(window.document);