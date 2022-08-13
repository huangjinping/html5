/**
 * Created by harrishuang on 2018/11/27.
 */
function FixedStar(option) {
    this.group = new Konva.Group({
        x: option.x,
        y: option.y

    });
    this.init(option);
}


FixedStar.prototype =
    {
        init: function () {
            var centerView = new CircleText({
                x: stage.width() / 2,
                y: stage.height() / 2,
                innerRadius: 55,
                outerRadius: 60,
                text: '分付君',
            });
            centerView.addToGroupOrLayer(this.group);
        },
        addToGroupOrLayer: function (group) {
            group.add(this.group);
        }
    };
var stage = new Konva.Stage({
    width: window.innerWidth,
    height: window.innerHeight,
    container: 'container',
});
var animationLayer = new Konva.Layer();
stage.add(animationLayer);
var fixedStar = new FixedStar({});
fixedStar.addToGroupOrLayer(animationLayer);
animationLayer.draw();

