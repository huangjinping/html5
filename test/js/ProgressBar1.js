/**
 * Created by harrishuang on 2018/12/10.
 */

function ProgressBar(param) {
    this.progressView = param.progressView;
    this.init(param);
}

ProgressBar.prototype = {
    init: function (param) {
        var img = document.createElement("img");
        img.src = param.src;
        console.log(this.progressView);
        this.progressView.appendChild(img);
        this.progressView.appendChild(document.createElement("span"));
        $(this.progressView).hide();

    },
    show: function () {
        $(this.progressView).show();
    },
    dismiss: function () {
        $(this.progressView).hide();
    }
}