/**
 * Created by harrishuang on 2018/12/10.
 */

function ProgressBar(param) {
    this.progressView = param.progressView;
    this.init(param);

}

ProgressBar.prototype = {
    init: function (param) {
        var targetView = document.createElement("div");
        // document.body.insertBefore(targetView,document.body.firstChild);
        this.progressView = targetView;
        this.progressView.style.background = "#000000";
        this.progressView.style.width = "100%";
        this.progressView.style.height = "100%";
        this.progressView.style.position = "fixed";
        this.progressView.style.top = "0";
        this.progressView.style.left = "0";
        this.progressView.style.zIndex = "500";
        this.progressView.style.opacity = "0.6";
        this.progressView.style.filter = "Alpha(opacity=70)";
        this.progressView.style.textAlign = 'center'
//背景层加入页面
        document.body.appendChild(this.progressView);
        document.body.style.overflow = "hidden"; //取消滚动条


        var img = document.createElement("img");
        img.style.verticalAlign = 'middle'

        img.src = param.src;
        console.log(this.progressView);
        this.progressView.appendChild(img);
        var span = document.createElement("span");
        span.style.display = 'inline-block';
        span.style.height = "100%"
        span.style.verticalAlign = 'middle'
        this.progressView.appendChild(span);
        $(this.progressView).hide();


    },
    show: function () {
        $(this.progressView).show();
    },
    dismiss: function () {
        $(this.progressView).hide();
    }
}