
var times = 0;
var height = 10;
var canvasnums = 1;//canvas切换顺序
var canvas0TransLength = 0;
var canvas1TransLength = 0;
var trans = 0;
var transNum = 0;//判断transBegin()是否在执行0未执行1执行
function transBegin(){
    trans = self.setInterval("beginTrans()",80);//开始滚动
    transNum = 1;
}
var restop = 0;
function onStop(){
    //3s后执行stop();
    restop = setTimeout(stop,3000);
}
function stop(){
    //暂停trans;
    self.clearInterval(trans);
    transNum = 0;
}
//创建动画
function createCanvas(num){
    //num为1-88整数
    canvasBegin(num);
}
//返回固定整数
function numFirst(num){
    var number = Math.floor((num * 65) % 300);
    return number;
}
function numSecond(num){
    var number = Math.floor((num * 75) % 300);
    return number;
}
function numThird(num){
    var number = Math.floor((num * 70) % 300);
    return number;
}
function changePosition(){
    var canvas0 = document.getElementById('myCanvas0');
    var canvas1 = document.getElementById('myCanvas1');
    if(times == Math.round(canvasinnerheight/height) || times == Math.round(2*(canvasinnerheight/height))){
        if(canvasnums == 1){
            var w = canvas0.width;
            var h = canvas0.height;
            canvas0.width = w;
            canvas0.height = h;
            canvas0TransLength = canvasinnerheight;
            canvas0.style.transform = "translateY("+canvas0TransLength+"px)";
            canvasnums = 0;
            
        }
        else if(canvasnums == 0){
            times = 0;
            canvasnums = 1;
            var w = canvas1.width;
            var h = canvas1.height;
            canvas1.width = w;
            canvas1.height = h;
            canvas1TransLength = 0;
            canvas1.style.transform = "translateY("+canvas1TransLength+"px)";
        }
    }
    canvas0TransLength = canvas0TransLength - height;
    canvas1TransLength = canvas1TransLength - height;
    canvas0.style.transform = "translateY("+canvas0TransLength+"px)";
    canvas1.style.transform = "translateY("+canvas1TransLength+"px)";
    clearTimeout(restop);
    onStop();
}
function canvasBegin(num){
    countTime();
    var canvasGet = document.getElementById('myCanvas'+canvasnums);
    var ctx = canvasGet.getContext('2d');
    var whiteWidth = 41;
    var blackWidth = 27;
    var width = 0;
    if(whiteKeys.indexOf(num)!=-1){
        listNum = whiteKeys.indexOf(num);
        width = 40*listNum;
        var actulWidth = whiteWidth;
    }
    else if(blackKeys.indexOf(num)!=-1){
        listNum = blackKeys.indexOf(num);
        width = (num - listNum - 2) * 40 + 27;
        var actulWidth = blackWidth;
    }
    ctx.fillStyle = `rgb(${numFirst(num)},${numSecond(num)},${numThird(num)})`;
    ctx.fillRect(width, 0, actulWidth, height);
}
function beginTrans(){
    var canvas0 = document.getElementById('myCanvas0');
    var canvas1 = document.getElementById('myCanvas1');
    var canvasGet = document.getElementById('myCanvas'+canvasnums);
    var ctx = canvasGet.getContext('2d');
    ctx.translate(0,height);
    times++;
    if(times == Math.round(canvasinnerheight/height) || times == Math.round(2*(canvasinnerheight/height))){
        if(canvasnums == 1){
            var w = canvas0.width;
            var h = canvas0.height;
            canvas0.width = w;
            canvas0.height = h;
            canvas0TransLength = canvasinnerheight;
            canvas0.style.transform = "translateY("+canvas0TransLength+"px)";
            canvasnums = 0;
            
        }
        else if(canvasnums == 0){
            times = 0;
            canvasnums = 1;
            var w = canvas1.width;
            var h = canvas1.height;
            canvas1.width = w;
            canvas1.height = h;
            canvas1TransLength = 0;
            canvas1.style.transform = "translateY("+canvas1TransLength+"px)";
        }
    }
    canvas0TransLength = canvas0TransLength - height;
    canvas1TransLength = canvas1TransLength - height;
    canvas0.style.transform = "translateY("+canvas0TransLength+"px)";
    canvas1.style.transform = "translateY("+canvas1TransLength+"px)";
}
function countTime(){
    if(transNum==1){
        clearTimeout(restop);
        onStop();
    }
    else if(transNum==0){
        transBegin();
    }
}