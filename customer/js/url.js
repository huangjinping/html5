var baseUrl = 'https://bjst.ultracreditosmx.com'
var kfUrl = baseUrl + "Chat/index.html?crispKey="

var locationObj=GetRequest(window.location.href)
function GetRequest(str) {
    var json = {};
    if (str.indexOf('?') != -1) {
        var str1 = str.slice(str.indexOf('?') + 1);
        var arr = str1.split("&");
        for (var i = 0; i < arr.length; i++) {
            var arr1 = arr[i].split('=');
            json[arr1[0]] = arr1[1]
        }
    }
    return json
}
