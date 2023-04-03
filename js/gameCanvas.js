
var times = -1;
var height = 30;
var canvasnums = 0;//canvas切换顺序
var canvas0TransLength = 0;
var canvas1TransLength = 0;
var trans = 0;
var transNum = 0;//判断transBegin()是否在执行 0未执行1执行
var moveHeight = 0;//原点变化
var rowSpeed = 80;//默认滚动速度为每80ms滚动一次
var rowTime = 0;//滚动一页时间（单位：秒）
var r=5;//圆角矩形半径为5
var widthPercent = 0;
var widthMarginPercent = 0;

function transBegin(){
    trans = self.setInterval("beginTrans()",rowSpeed);//开始滚动
    transNum = 1;
}
var restop = 0;
function onStop(){
    //n秒后执行stop();
    restop = setTimeout(stop,5000);
}
function stop(){
    //暂停trans;
    self.clearInterval(trans);
    transNum = 0;
}
/*判断是否停止滚动*/
function countTime(){
    if(transNum==1){
        clearTimeout(restop);
        onStop();
    }
    else if(transNum==0){
        transBegin();
    }
}
/*滚动*/
function beginTrans(){
    var canvas0 = document.getElementById('game-canvas-0');
    var canvas1 = document.getElementById('game-canvas-1');
    var canvasGet = document.getElementById('game-canvas-'+canvasnums);
    var ctx = canvasGet.getContext('2d');
    if(times==-1){
        moveHeight = canvasinnerheight;
        ctx.translate(0,moveHeight);
    }
    times++;
    ctx.translate(0,(-1)*height);
    if(times == Math.round(canvasinnerheight/height) || times == Math.round(2*(canvasinnerheight/height))){
        if(canvasnums == 1){
            times = 0;
            canvasnums = 0;
            canvas0.width = canvasinnerwidth;
            canvas0.height = canvasinnerheight;
            canvas0TransLength = 0;
            canvas0.style.transform = "translateY("+canvas0TransLength+"px)";
        }
        else if(canvasnums == 0){
            canvasnums = 1;
            canvas1.width = canvasinnerwidth;
            canvas1.height = canvasinnerheight;
            canvas1TransLength = (-1)*canvasinnerheight;
            canvas1.style.transform = "translateY("+canvas1TransLength+"px)";
            
        }
        var canvas0 = document.getElementById('game-canvas-0');
        var canvas1 = document.getElementById('game-canvas-1');
        var canvasGet = document.getElementById('game-canvas-'+canvasnums);
        var ctx = canvasGet.getContext('2d');
        moveHeight = canvasinnerheight;
        ctx.translate(0,moveHeight);
        ctx.translate(0,(-1)*height);
    }
    canvas0TransLength = canvas0TransLength + height;
    canvas1TransLength = canvas1TransLength + height;
    canvas0.style.transform = "translateY("+canvas0TransLength+"px)";
    canvas1.style.transform = "translateY("+canvas1TransLength+"px)";
}
/*根据游戏按钮数量改变琴键编码*/
function gameKeysNum(num){
    var number = buttonNumber;//按钮数量
    var playNum = num%number;
    return playNum;
}
/*改变琴键数量*/
function changebuttonNum(){
    widthPercent = 96/buttonNumber;
    widthMarginPercent = (4/buttonNumber)*0.5;
    var keys = document.querySelectorAll(".piano-key");
    keys.forEach(e => {
        e.style.width = widthPercent + "%";
        e.style.margin = '0% ' + widthMarginPercent +'% 1% ' + widthMarginPercent + '%';
    });
}
function startPaint(keyNum){
    
}
function stopPaint(keyNum){

}
/*开始*/
function canvasBegin(num){
    countTime();
    var num = gameKeysNum(num);
    var canvasGet = document.getElementById('game-canvas-'+canvasnums);
    var ctx = canvasGet.getContext('2d');
    var width = canvasinnerwidth*((widthPercent + widthMarginPercent * 2)*num + widthMarginPercent)*0.01;
    var paintWidth = canvasPaintWidth;
    var paintHeight = height;
    var x = width+paintWidth/2;
    var y = paintHeight/2;
    var blockColor = "rgba(0, 157, 248, 0.719)";
    //创建一个径向渐变
    var jb=ctx.createRadialGradient(x,y,y,x,y,paintWidth/2);//(x,y,r,x1,y1,r1)
    //var jb=ctx.createLinearGradient(0,0,200,0);//创建一个线条渐变
    jb.addColorStop(0,blockColor);
    jb.addColorStop("0.8",blockColor);
    jb.addColorStop(1,"white");
    //渐变填充
    ctx.fillStyle=jb;
    ctx.fillRect(width, 0, paintWidth, paintHeight);
    //矩形
    //ctx.fillStyle = `rgba(0, 157, 248, 0.719)`;
    //ctx.fillRect(width, 0, paintWidth, paintHeight);
    //圆角矩形
    //ctx.strokeStyle = 'red';边框颜色
    //ctx.roundRect(width, 0, paintWidth, paintHeight, r).stroke();带边框
    //ctx.roundRect(width, 0, paintWidth, paintHeight, r);//r为半径
    //ctx.fill();
}
/*圆角矩形*/
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y, x+w, y+h, r);
    this.arcTo(x+w, y+h, x, y+h, r);
    this.arcTo(x, y+h, x, y, r);
    this.arcTo(x, y, x+w, y, r);
    this.closePath();
    return this;
}