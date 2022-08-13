/**
 * Created by harrishuang on 2017/11/3.
 */



function Product() {
    this.price = 123;
    this.account = 123;


    var  userPrice;

    Object.defineProperty(this, "account", {
        value: 123,
        writable: false
    });

    Object.defineProperty(this, "price", {
        get: function () {
            return userPrice * 0.9;
        },
        set: function (value) {
            /*大概普通产品的价格都在0--1万*/
            if (value > 10000) {
                alert('产品价格必须在0--1万之间');
                userPrice = 10000;

            } else {
                userPrice = value;

            }
        }
    });

    _that=this;

    function bindEvents(){
        var btn = document.getElementById('account')
        console.log(_that);
        console.log("=======>>>>>>>");
        console.log(this);
        console.log("=======>>>>>>>");

        /*绑定事件*/
        btn.onclick = function(){
            console.log(this);
        }
    }

    this.init = function(){
        console.log(this);
        console.log("======init=>>>>>>>");
        /*访问方式：不加this*/
        bindEvents()
    }
}

Product.prototype = {
    bindDom: function () {
        $("#price").html("" + this.price);
        $("#account").html("" + this.account);
    }
}
