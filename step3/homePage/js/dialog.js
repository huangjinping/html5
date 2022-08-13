var Obj=function(par){
    var def={
            content:'弹出框内容',
            btns:"按钮",
            method:null
        },
    settings=this.extend({},def,par);
    this.content=settings.content;
    this.btns=settings.btns;
    this.method=settings.method;
    this.render();
    this.binEven();
}
Obj.prototype={
    constructor:Obj,
    render:function(){
        var btnDom="";
        for(var i=0;i<this.btns.length;i++){
            btnDom+='<button>'+this.btns[i]+'</button>'
        }
        var mark=document.createElement('div');
        var div=document.createElement('div');
        div.className='dialog';
        mark.className='mark';
        div.innerHTML=this.content+'<section class="btn2">'+btnDom+'</section>';
        document.body.insertBefore(div,document.body.firstChild);
        document.body.insertBefore(mark,document.body.firstChild);
    },
    binEven:function(){
        var that = this;
        var button=document.getElementsByTagName('button')[0];
        var mark=document.querySelector('.mark');
        var dialog=document.querySelector('.dialog');
        button.onclick=function(){
            document.body.removeChild(mark);
            document.body.removeChild(dialog);
            that.method && that.method()
        }
    },
    extend:function(){
        for(var i=1;i<arguments.length;i++){
            for(var k in arguments[i]){
                arguments[0][k]=arguments[i][k]
            }
        }
        return arguments[0];
    }
}

