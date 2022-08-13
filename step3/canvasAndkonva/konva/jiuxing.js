/**
 * Created by harrishuang on 2018/11/26.
 */

var stage = new Konva.Stage({
    width: window.innerWidth,
    height: window.innerHeight,
    container: "container"
});

var bg_layer = new Konva.Layer();
stage.add(bg_layer);

var centerView = new CircleText({
    x: stage.width() / 2,
    y: stage.height() / 2,
    innerRadius: 55,
    outerRadius: 60,
    text: '分付君',
});

centerView.addToGroupOrLayer(bg_layer);
bg_layer.draw();


var anim_layer = new Konva.Layer();
stage.add(anim_layer);

var group = new Konva.Group({
    x: stage.width() / 2,
    y: stage.height() / 2
});
anim_layer.add(group);

var css_view = new CircleText({
    x: Math.cos(-60 * Math.PI / 180) * 150,
    y: Math.sin(-60 * Math.PI / 180) * 150,
    innerRadius: 25,
    outerRadius: 30,
    text: '互动',
    innerStyle: "#f40",
    outerStyle: "gary",

});
css_view.addToGroupOrLayer(group);

var daiyu_view = new CircleText({
    x: Math.cos(180 * Math.PI / 180) * 150,
    y: Math.sin(180 * Math.PI / 180) * 150,
    innerRadius: 25,
    outerRadius: 30,
    text: '贷鱼',
    innerStyle: "yellow",
    outerStyle: "gary",

});
daiyu_view.addToGroupOrLayer(group);


var xianjindai_view = new CircleText({
    x: Math.cos(90 * Math.PI / 180) * 150,
    y: Math.sin(90 * Math.PI / 180) * 150,
    innerRadius: 25,
    outerRadius: 30,
    text: '贷鱼',
    innerStyle: "black",
    outerStyle: "gary",

});
xianjindai_view.addToGroupOrLayer(group);
anim_layer.draw();

var animation = new Konva.Animation(function (e) {
    var temp = 10;
    var angle = temp * e.timeDiff / 1000;
    group.rotate(angle);
    group.getChildren().each(function (item, index) {
        item.rotate(-angle);
    });
}, anim_layer);
animation.start();

group.on("click", function (e) {
    console.log(e.target);
});

//饼状图数据
var data = [{
    name: "中间",
    value: .25,
    color: '#e0e'
}, {
    name: "中间",
    value: .2,
    color: 'orange'
}, {
    name: "中间",
    value: .3,
    color: 'blue'
}, {
    name: "中间",
    value: .05,
    color: 'green'
}, {
    name: "中间",
    value: .1,
    color: 'purple'
}, {
    name: "中间",
    value: .1,
    color: 'red'
}];

var bing_group = new Konva.Group({
    x: 100,
    y: 100
});

var startAngle = -90;
for (var i = 0; i < data.length; i++) {
    var angle = data[i].value * 360;
    var item = new Konva.Wedge({
        radius: 70,
        angle: angle,
        fill: data[i].color,
        rotation: startAngle
    });
    bing_group.add(item);
    var text = new Konva.Text({
        x: Math.cos((startAngle + (angle) / 2) * Math.PI / 180) * 80,
        y: Math.sin((startAngle + (angle) / 2) * Math.PI / 180) * 80,
        text: data[i].name
    });

    if (270 > (startAngle + (angle) / 2) && (startAngle + (angle) / 2) > 90) {
        text.x(text.x() - text.getWidth());
    }

    bing_group.add(text);
    startAngle += angle;
}
anim_layer.add(bing_group);

var wedges = bing_group.find("Wedge");
var texts = bing_group.find("Text");
texts.each(function (item, index) {
    item.opacity(0);
});
wedges.each(function (item, index) {
    item.angle(0);
});
var index = 0; //动画的索引


function startAnimations() {
    wedges[index].to({
        angle: data[index].value * 360,
        duration: data[index].value * 2, //动画执行的时间
        onFinish: function () {
            index++;
            if (index >= data.length) {
                return;//立即结束当前函数。
            }
            //继续调用自己，执行下一个扇形的动画
            startAnimations();
        }
    });
    texts[index].to({
        opacity: 1,
        duration: data[index].value * 2, //动画执行的时间
    });
}

startAnimations();


// var content = {
//     x: "dialog",
//     y: "were",
// }
// var temp = {
//     title: "temp_title",
//     mothod: function () {
//         console.log("====111======+>+++++++++++");
//         console.log(this);
//     }
// }
//
// function extend() {
//     for (var i = 1; i < arguments.length; i++) {
//         for (k in arguments[i]) {
//             arguments[0][k] = arguments[i][k];
//         }
//     }
//     return arguments[0];
// }
//
// var result = extend({}, content, temp);
// console.log("======111==>>>>>>" + result.title)
// result.mothod();