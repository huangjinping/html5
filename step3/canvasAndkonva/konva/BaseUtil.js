/**
 * Created by harrishuang on 2018/11/27.
 */

function HDScence(options) {
    this.stage = options.stage;
    this.init = options.init || HDScence.voidFn;
    this.pre = options.pre || HDScence.voidFn;
    this.post = options.post || HDScence.voidFn;
    this.layers = options.layers || [new Konva.Layer()];
    this.name = options.name || '';
    this.init();
}

HDScence.prototype = {
    constructor: HDScence,
    voidFn: function () {

    },
    CurrentScence: null,
    play: function () {
        var _this = this;
        var doPre = function doPre() {
            _this.layers.forEach(function (val) {
                _this.stage.add(val);
            });
            HDScence.CurrentScence = _this;
            _this.pre();
        };
        if (HDScence.CurrentScence) {
            HDScence.CurrentScence.post(doPre);
        } else {
            doPre();
        }
    }
}

function ProgressBar(option) {
    this.group = new Konva.Group({
        x: option.x,
        y: option.y
    });
    this.maxWidth = option.width;

    this.drawLayer = null;

    this.init(option);
}

ProgressBar.prototype = {
    constructor: ProgressBar,
    init: function (option) {
        var innerRect = new Konva.Rect({
            x: 0,
            y: 0,
            width: 0,
            height: option.height,
            fill: option.fillColor,
            name: 'innerRect',
            cornerRadius: 1 / 2 * option.height
        });
        this.group.add(innerRect);

        var outerRect = new Konva.Rect({
            x: 0,
            y: 0,
            width: option.width,
            height: option.height,
            strokeWidth: option.strokeWidth,
            stroke: option.strokeColor,
            name: 'outerRect',
            cornerRadius: 1 / 2 * option.height
        });
        this.group.add(outerRect);

        var drawText = new Konva.Text({
            text: '努力加载中：0%',
            x: this.maxWidth / 2 - 14 * 3,
            y: -outerRect.height(),
            fontSize: 14,
            fontStyle: 'bold',
            fontFamily: '微软雅黑',
            align: 'center',
            name: 'txt'
        });
        this.group.add(drawText);
    },

    addToLayerOrGroup: function (layer) {
        layer.add(this.group);
        this.drawLayer = layer;
    },

    changeValue: function (val) {
        if (val > 1) {
            val /= 100;
        }
        var rect = this.group.findOne(".innerRect");
        // rect.width(this.maxWidth * val);
        rect.to({
            duration: .2,
            width: this.maxWidth * val
        });

        var txt = this.group.findOne('.txt');
        txt.text('努力加载中：' + Number(val).toFixed(2) * 100 + '%');

        this.drawLayer.batchDraw();
    },
    pre: function () {
        var tween = new Konva.Tween({
            node: this.group,
            // scaleX: 1.2,
            // scaleY: 1.2,
            duration: .5,
            opacity: .8,
            onFinish: function () {
            }
        });
        tween.play();
    }
};







