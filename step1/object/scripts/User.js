/**
 * Created by harrishuang on 2017/11/2.
 */

function User() {
    this.name = "分付君";
}
User.prototype.getUserName = function () {
    return "getUserName";
}
User.prototype = {
    addAll: function () {
        console.log("dddddd---" + this.page + "====>>>" + this.name);
    },
    bindDom: function () {
        $("#name").html(this.name);
    },
    setImage: function () {
        for (var i = 0; i < 10; i++) {
            $("#list").append("<li>" + this.page + this.name + "</li>");
        }
    },
    page: "1",
}