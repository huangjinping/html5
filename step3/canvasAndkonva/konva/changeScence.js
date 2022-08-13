/**
 * Created by harrishuang on 2018/11/27.
 */
var stage = new Konva.Stage({
    width: window.innerWidth,
    height: window.innerHeight,
    container: 'container'
});
var imgSource = [];
var loadImgs = ['1.png', 'a.jpg', 'b.jpg', 'bb.png', 'bg.jpg', 'lightr.png', 'bh.png', 'lbg.jpg', 'lightb.png', 'mw.png', 'nom.png', 'yesm.png', 'logo.gif', 'html5.png'];

(function () {
    builderScence().play();
})();

function builderScence() {
    var animationLayer = new Konva.Layer();
    stage.add(animationLayer);

    var progressBar = new ProgressBar({
        x: stage.width() / 8,
        y: stage.height() / 2,
        width: stage.width() * 3 / 4,
        height: stage.height() / 20,
        fillColor: '#cdcd000',
        strokeColor: "#cccccc",
    });

    var rect = new Konva.Rect({
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        fill: 'gray'
    });

    return new HDScence({
        name: '加载框',
        stage: stage,
        layers: [animationLayer],
        init: function () {
            animationLayer.add(rect);
            progressBar.addToLayerOrGroup(animationLayer);
            this.layers.forEach(function (layer) {
                layer.draw();
            });
        },
        pre: function () {
            progressBar.group.to({
                opacity: 1,
                duration: .1
            })
            progressBar.pre();
            var temp = 0;
            loadImgs.forEach(function (val, i) {
                var img = new Image();
                img.src = '../../imgs/' + val;
                img.onload = function () {
                    temp++;
                    imgSource[loadImgs[i]] = img;
                };
            });

            var intervalId = setInterval(function () {
                var currentPrograss = Number(temp / loadImgs.length).toFixed(2);
                if (currentPrograss >= 1) {
                    clearInterval(intervalId);
                    //加载完成后，执行 后续的场景切换和事件处理
                    LoadingComplete();
                }
                progressBar.changeValue(currentPrograss);
            }, 200);
        },
        post: function (next) {
            //离场动画
            var tween = new Konva.Tween({
                node: progressBar.group,
                scaleX: 0,
                scaleY: 0,
                y: 0,
                x: stage.width() / 2,
                duration: .4,
                opacity: 0,
                easing: Konva.Easings.EaseIn,
                onFinish: function () {
                    //移除加载场景
                    animationLayer.destroy();
                }
            });
            tween.play();
            next();
        }
    });
}


var scenesIndex = 0;
var scenesFn = [builderSceneFirst, buildScenceSecend, buildScenceThird, buildScenceFourth];

function LoadingComplete() {
    //开始第一个场景
    scenesFn[0]().play();
    // 添加事件
    addSceneChangeEvent();
}
function addSceneChangeEvent() {
    var stageStartY = 0;
    var stageEndY = 0;

    stage.on('contentTouchmove contentMousemove', function (e) {
        if (e.type == 'contentMousemove') { //PC端鼠标事件
            stageEndY = e.evt.screenY
        } else {
            //移动端touch事件
            stageEndY = e.evt.touches[0].screenY;
        }
    });

    stage.on('contentTouchstart contentMousedown', function (e) {
        if (e.type == 'contentMousedown') {
            stageStartY = e.evt.screenY
        } else {
            stageStartY = e.evt.touches[0].screenY;
        }
    });

    stage.on('contentTouchend contentMouseup', function (e) {

        if (stageEndY > stageStartY) { //下滑
            scenesIndex = scenesIndex - 1 >= 0 ? scenesIndex - 1 : 0;
        } else {  //上滑
            scenesIndex = scenesIndex + 1 >= scenesFn.length ? scenesIndex : scenesIndex + 1;
        }
        //根据上滑和下滑判断 是否切换到 哪个场景
        scenesFn[scenesIndex]().play();
        stageStartY = 0;
        stageEndY = 0;
    });
}


function builderSceneFirst() {

    var animationLayer = new Konva.Layer();
    var arc = new Konva.Ring({	//初始化一个圆环
        x: stage.width() / 2,
        y: stage.height() / 2,
        innerRadius: 10,	//内圆的半径
        outerRadius: 100,  //外圆的半径
        fill: "red",			//圆环的填充的样式
        opacity: .3						//透明度
    });
    stage.add(animationLayer);
    return new HDScence({
        name: '第一个',
        stage: stage,
        layers: [animationLayer],
        init: function () {
            animationLayer.add(arc);
            this.layers.forEach(function (layer) {
                layer.draw();
            });
        },
        pre: function () {
            arc.to({
                opacity: 1,
                innerRadius: 90,
                duration: 2,
            });
        },
        post: function (next) {
            //离场动画
            var tween = new Konva.Tween({
                node: arc,
                scaleX: 0,
                scaleY: 0,
                y: 0,
                x: stage.width() / 2,
                duration: .4,
                opacity: 0,
                easing: Konva.Easings.EaseIn,
                onFinish: function () {
                    //移除加载场景
                    animationLayer.destroy();
                }
            });
            tween.play();
            next();
        }
    });
}

function buildScenceSecend() {
    var animationLayer = new Konva.Layer();
    var circle = new Konva.Circle({
        x: stage.width() / 2,
        y: stage.height() / 2,
        radius: 100,
        fill: "green",
    });

    return new HDScence({
        name: "第二个",
        stage: stage,
        layers: [animationLayer],
        init: function () {
            animationLayer.add(circle);
            this.layers.forEach(function (layer) {
                layer.draw();
            });
        },
        pre: function () {
            circle.to({
                radius: 10
            });
        },
        post: function (next) {
            var tween = new Konva.Tween({
                node: circle,
                scaleX: 0,
                scaleY: 0,
                y: 0,
                x: stage.width() / 2,
                duration: .4,
                opacity: 0,
                easing: Konva.Easings.EaseIn,
                onFinish: function () {
                    //移除加载场景
                    animationLayer.destroy();
                }
            });
            tween.play();
            next();
        }
    });
}

function buildScenceThird() {
    var animationLayer = new Konva.Layer();
    var center = new CircleText({
        x: stage.width() / 2,
        y: stage.height() / 2,
        innerRadius: 40,
        outerRadius: 50,
        text: "分付君",
        innerStyle: 'blue',
        outerStyle: 'yellow'
    });

    var two_group = new Konva.Group({
        x: stage.width() / 2,
        y: stage.height() / 2
    });
    var twoRadius = 150;
    var two_view1 = new CircleText({
        x: Math.cos(60 * Math.PI / 180) * twoRadius,
        y: Math.sin(60 * Math.PI / 180) * twoRadius,
        innerRadius: 40,
        outerRadius: 50,
        text: "优选加",
        innerStyle: '#f40',
        outerStyle: 'gary'
    });
    two_view1.addToGroupOrLayer(two_group);

    var two_view2 = new CircleText({
        x: Math.cos(180 * Math.PI / 180) * twoRadius,
        y: Math.sin(180 * Math.PI / 180) * twoRadius,
        innerRadius: 40,
        outerRadius: 50,
        text: "优选加",
        innerStyle: '#f90',
        outerStyle: 'black'
    });
    two_view2.addToGroupOrLayer(two_group);

    var two_view3 = new CircleText({
        x: Math.cos(90 * Math.PI / 180) * twoRadius,
        y: Math.sin(90 * Math.PI / 180) * twoRadius,
        innerRadius: 40,
        outerRadius: 50,
        text: "优选加",
        innerStyle: '#ccc',
        outerStyle: 'gary'
    });
    two_view3.addToGroupOrLayer(two_group);

    return new HDScence({
        name: "第三个",
        stage: stage,
        layers: [animationLayer],
        init: function () {
            center.addToGroupOrLayer(this.layers[0]);
            this.layers[0].add(two_group);
            this.layers.forEach(function (layer) {
                layer.batchDraw();
            });
        },
        pre: function () {
            var _this = this;
            var animation = new Konva.Animation(function (e) {
                var angle = e.timeDiff * 60 / 1000;
                two_group.rotate(angle);
                two_group.getChildren().each(function (item, index) {
                    item.rotate(-angle);

                });
                _this.layers[0].draw();
                console.log("======>>>>>>>>>>>>>>>>>>>");
            });

            animation.start();
        },
        post: function (next) {
            var tween = new Konva.Tween({
                node: animationLayer,
                scaleX: 0,
                scaleY: 0,
                y: 0,
                x: stage.width() / 2,
                duration: .4,
                opacity: 0,
                easing: Konva.Easings.EaseIn,
                onFinish: function () {
                    //移除加载场景
                    animationLayer.destroy();
                }
            });
            tween.play();
            next();
        }
    });
}


function buildScenceFourth() {

    var animationLayer = new Konva.Layer();
    
    return new HDScence({
        name: "第四个",
        stage: stage,
        layers: [animationLayer],
        init: function () {

        },
        pre: function () {

        },
        post: function (next) {

        }
    });
}



