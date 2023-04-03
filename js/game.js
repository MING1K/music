var whiteKeys = [1,3,4,6,8,9,11,13,15,16,18,20,21,23,25,27,28,30,32,33,35,37,39,40,
    42,44,45,47,49,51,52,54,56,57,59,61,63,64,66,68,69,71,73,75,76,78,80,81,83,85,87,88];
var blackKeys = [2,5,7,10,12,14,17,19,22,24,26,29,31,34,36,38,41,43,46,48,50,53,55,
    58,60,62,65,67,70,72,74,77,79,82,84,86];
var buttonNumber = 4;//游戏按钮数量
var totalKeysNum = 88;//钢琴琴键数量
var canvasinnerheight = 0;//canvas高
var canvasinnerwidth = 0;//canvas宽
var canvasPaintWidth = 0;//按钮宽
var boardKeysChoiceGame = ["a","s","d","f","g","h","j","k","l",";"];
var recentClick = -1;
window.addEventListener('load',function(){
    createBackground();//背景
    getJsonData();//操作按钮
    getJsonSong();//游戏曲目列表
    getGameSetting();//游戏设置列表
    createGameKeys();//创建游戏按钮
    changebuttonNum()//游戏按钮数量
    changeCanvasSize();//获得canvas的宽度
    clickGameButton();
    this.document.onkeydown = function(e){
        clickGameBoardKeys(e.key);
    }
    this.document.onkeyup = function(e){
        afterclickGameBoardKeys(e.key);
    }
    /*动态监听窗口大小，改变canvasinnerheight */
    this.window.addEventListener('resize',cancalDebounce);
});
function changeCanvasSize(){
    createBackground();//背景
    var winWidth = document.documentElement.clientWidth || document.body.clientWidth;//输出当前窗口的宽
    var winHeight = document.documentElement.clientHeight || document.body.clientHeight;//输出当前窗口的高
    var head = document.getElementById("head");
    if(winWidth<=600){
        var heightPercent = 0.92;
    }
    else{
        var heightPercent = 0.85;
    }
    if(head.style.display=="none"){
        canvasinnerheight=winHeight * heightPercent;
    }
    else{
        canvasinnerheight=(winHeight-60) * heightPercent;
    }
    canvasinnerwidth=winWidth*0.94;
    canvasPaintWidth=winWidth*0.94*(0.96/buttonNumber);
    var canvas0 = document.getElementById('game-canvas-0');
    var canvas1 = document.getElementById('game-canvas-1');
    canvas0.width = canvasinnerwidth;
    canvas0.height = canvasinnerheight;
    canvas1.width = canvasinnerwidth;
    canvas1.height = canvasinnerheight;
    rowTime = canvasinnerheight/rowSpeed
}
/*防抖,只会在窗口停止变化的 300 毫秒后触发一次 */
const debounce = (fn, delay) => {
	let timer;
	return function() {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fn();
		}, delay);
	}
};
const cancalDebounce = debounce(changeCanvasSize, 300);
/*json文件读取*/
function getJsonData(){
    var url = "index.json";
    var request = new XMLHttpRequest();
    request.open("get",url);
    request.send(null);
    request.onload = function(){
        if(request.status == 200){//status 200 代表一个成功的请求
            var json = JSON.parse(request.responseText);
            var htmlName = document.title;
            if(htmlName=="Piano2"){
                createPiano2Song(json);
            }
            else if(htmlName=="Game"){
                createGameChoice(json);/*创建操作按钮*/
            }
        }
    }
}
function getJsonSong(){
    var url = "midi.json";
    var request = new XMLHttpRequest();
    request.open("get",url);
    request.send(null);
    request.onload = function(){
        if(request.status == 200){//status 200 代表一个成功的请求
            var json = JSON.parse(request.responseText);
            createGameSong(json);/*添加歌曲曲目*/
        }
    }
}
/*创建操作按钮*/
function createPiano2Song(json){
    var gamechoice = json.piano2choice;
    var number = gamechoice.length;
    var choiceList = document.getElementById("game-choice");
    for(var j=0;j<number;j++){
        var a = document.createElement("a");
        a.classList.add("game-choice-a");
        a.classList.add(gamechoice[j].classname);
        a.id=gamechoice[j].id;
        a.innerHTML=gamechoice[j].name;
        a.setAttribute("state",gamechoice[j].state);
        a.setAttribute("onclick",gamechoice[j].onclick);
        choiceList.append(a);
    }
}
function createGameChoice(json){
    var gamechoice = json.gamechoice;
    var number = gamechoice.length;
    var choiceList = document.getElementById("game-choice");
    for(var j=0;j<number;j++){
        var a = document.createElement("a");
        a.classList.add("game-choice-a");
        a.classList.add(gamechoice[j].classname);
        a.id=gamechoice[j].id;
        a.innerHTML=gamechoice[j].name;
        a.setAttribute("state",gamechoice[j].state);
        a.setAttribute("onclick",gamechoice[j].onclick);
        choiceList.append(a);
    }
}
/*添加歌曲曲目*/
function createGameSong(json){
    if(ongamechoicenumber==0){
        var songName = json.songs;
    }
    else if(ongamechoicenumber==1){
        var songName = json.gamesongs;
    }
    var songChoice = document.getElementById("song-choice");
    var songLists = document.getElementById("song-choice-lists");
    if(songLists){
        songLists.remove();
        var ul = document.createElement("ul");
        ul.id="song-choice-lists";
        ul.className="song-choice-lists";
        songChoice.appendChild(ul);
    }
    songName.map(songs=> {
        var li = document.createElement("li");
        li.innerHTML = songs.songsname;
        li.setAttribute("path",songs.path);
        li.setAttribute("name",songs.songsname)
        li.className = "song-choose-list-list";
        li.onclick = function(){
            var songChoice = document.getElementById("song-choice");
            var clicksong = this.getAttribute("name");
            var clickpath = this.getAttribute("path");
            songChoice.children[0].innerHTML=clicksong;
            songChoice.setAttribute("path",clickpath);
            //stopMIDI();
        }
        songChoice.children[1].append(li);
    })
}
/*json文件读取设置列表*/
function getGameSetting(){
    var url = "index.json";
    var request = new XMLHttpRequest();
    request.open("get",url);
    request.send(null);
    request.onload = function(){
        if(request.status == 200){//status 200 代表一个成功的请求
            var json = JSON.parse(request.responseText);
            createGameSetting(json)
        }
    }
}
/*创建游戏设置*/
function createGameSetting(json){
    var settinglist = document.getElementById("setting-lists");
    var settingNumber = json.setting.length;
    for(var j=0;j<settingNumber;j++){
        var li = document.createElement("li");
        li.classList="setting-li "+json.setting[j].classname;
        li.innerHTML=json.setting[j].settingname;
        li.id=json.setting[j].id;
        li.setAttribute("state",json.setting[j].statenum);
        li.setAttribute("settingchoice",json.setting[j].settingchoice);
        var a = document.createElement("a");
        a.id=json.setting[j].id+"-a";
        if(json.setting[j].settingchoice==0){
            a.classList="numSetting";
            a.innerHTML='<div class="left-btn" id="'+json.setting[j].id+'-left-btn"></div><span id="'
                +json.setting[j].id+'-num">'+json.setting[j].statenum
                +'</span><div class="right-btn" id="'+json.setting[j].id+'-right-btn"></div>'
        }
        else if(json.setting[j].settingchoice==1){
            a.classList="buttonSetting";
            a.innerHTML='<div id="'+json.setting[j].id+'-num" class="setting-btn" state="'+json.setting[j].statenum+'"><a></a></div>';
        }
        li.append(a);
        settinglist.append(li);
    }
    hideGameHead();/*控制标题隐藏*/
    openSetting();/*打开、关闭游戏设置*/
}
/*打开、关闭游戏设置*/
function openSetting(){
    var containSetting = document.getElementById("setting-list");
    var btn = document.getElementById("start-setting");
    containSetting.setAttribute("index",0);
    containSetting.style.display="none";
    btn.onclick=function(){
        var containSetting = document.getElementById("setting-list");
        var index = containSetting.getAttribute("index");
        var btn = document.getElementById("start-setting");
        if(index==0){
            containSetting.setAttribute("index",1);
            containSetting.style.display="";
            btn.innerHTML="<a>收回</a>";
        }
        else if(index==1){
            containSetting.setAttribute("index",0);
            containSetting.style.display="none";
            btn.innerHTML="<a>设置</a>";
        }
    }
}
/*控制标题隐藏*/
function hideGameHead(){
    var btn = document.getElementById("hide-head");
    var state = btn.getAttribute("state");
    if(state==1){
        btn.setAttribute("state",0);
        changeGameHideHead();
    }
    btn.onclick=function(){
        changeGameHideHead();
    }
}
function changeGameHideHead(){
    var btn = document.getElementById("hide-head");
    var btn_a = document.getElementById("hide-head-a");
    var btn_a_num = document.getElementById("hide-head-num");
    var head = document.getElementById("head");
    var contain = document.getElementById("contain");
    var state = btn.getAttribute("state");
    if(state==0){
        head.style.display="none";
        contain.style.top="0";
        btn.setAttribute("state",1);
        btn_a.classList.add("buttonSetting-active");
        btn_a_num.setAttribute("state",1);
        btn_a_num.classList.add("setting-btn-active");
    }
    else if(state==1){
        head.style.display="";
        var maxWidth = document.body.clientWidth;
        if(maxWidth<=600){
            contain.style.top="40px";
        }
        else{
            contain.style.top="60px";
        }
        btn.setAttribute("state",0);
        btn_a.classList.remove("buttonSetting-active");
        btn_a_num.setAttribute("state",0);
        btn_a_num.classList.remove("setting-btn-active");
    }
    changeCanvasSize();
}
/*创建游戏按钮*/
function createGameKeys(){
    var number = buttonNumber;//按钮数量
    //totalKeysNum=88钢琴琴键数量
    var keyStr = "";
    for(var j=0;j<number;j++){
        keyStr += '<div class="piano-key" index="'+j+'">'+
        '<div class="key-name" data-key="'+j+'"><span class="keys-name"></span></div>'+
        '<div class="sing-name"><span class="keys-play-node"></span></div></div>'
    }
    document.getElementById("game-keys").innerHTML = keyStr;
    var gameKeys = document.getElementById("game-keys");
    for(var j=0;j<gameKeys.children.length;j++){
        gameKeys.children[j].onmousedown=function(){
            this.classList.add("game-key-active");
        }
        gameKeys.children[j].onmouseup=function(){
            this.classList.remove("game-key-active");
        }
    }
}
/*创建动画*/
function createCanvas(num){
    if(num >= 0){
        canvasBegin(num);
    }
}
var speed = 0;
var mainArraylength = 0;
var mainArraytimes = 0;
var mainArray = [];
var mainGame = 0;
var gamePaint = 0;
/*获得数组*/
function getArrayData(){
    mainArray = [];
    mainGame = 0;
    var songname = document.querySelector(".song-choice");
    var filepath = songname.getAttribute("path");
    if(filepath.substring(0,8)=="gamesong"){
        var songNumber = filepath.substring(8,9);
        var file = gamesong[songNumber];
    }
    else{return;}
    var filesetting = file[0].split(",");
    var filearray = file[1].split(",");
    var velocity = Number(filesetting[0]);
    speed = 60/velocity;
    var delay = Number(filesetting[1]) * (canvasinnerheight/(1000/rowSpeed*height));
    var channel = Number(filesetting[2]);
    var now = Number(filesetting[3]) + delay;
    var end = filearray.length*speed + delay;
    var message = 144;
    var notelong = Number(filesetting[4]) * speed;
    //console.log(filearray);
    for(var j = 0;j<filearray.length;j++){
        if(filearray[j].length===1){
            var note = -1;
            var message = 128;
            var gamesongdata = returnData(note,channel,now,end,message,velocity,delay,notelong);
        }
        else{
            var message = 144;
            var note = nameKeys.indexOf(filearray[j].substring(0,2)) + 21 - 1;
            var gamesongdata = returnData(note,channel,now,end,message,velocity,delay,notelong);
        }
        now += speed;
        mainArray.push(gamesongdata);
    }
    //console.log(mainArray);
    mainArraylength = mainArray.length;
}
/*获得按键、点击数据*/
var recoveraction = 0;
function recoverRecentClickNum(){
    recoveraction = setTimeout(recoverRecentClick,500);
}
function recoverRecentClick(){
    recentClick = -1;
}
function recoverImmediate(){
    recentClick = -1;
    clearTimeout(recoveraction);
}
function clickGameButton(){
    var keys = document.getElementById("game-keys");
    for(var j=0;j<keys.children.length;j++){
        keys.children[j].onmousedown=function(){
            var index = this.getAttribute("index");
            recoverImmediate();
            recentClick = index;
            recoverRecentClickNum();
            //console.log("click  "+recentClick);
        }
        //keys.children[j].onmouseup=function(){}
    }
}
function clickGameBoardKeys(e){
    e = String(e);
    var keys = document.querySelectorAll(".piano-key");
    if(boardKeysChoiceGame.includes(e)){
        var num = boardKeysChoiceGame.indexOf(e);
        if(num<buttonNumber){
            if(keys[num].classList.contains("game-key-active")){
                return 0;
            }
            else{
                keys[num].classList.add("game-key-active");
                recoverImmediate();
                recentClick = num;
                recoverRecentClickNum();
                //console.log("click  "+recentClick);
            }
        }
    }
}
function afterclickGameBoardKeys(e){
    e = String(e);
    var keys = document.querySelectorAll(".piano-key");
    if(boardKeysChoiceGame.includes(e)){
        var num = boardKeysChoiceGame.indexOf(e);
        if(num<buttonNumber){
            keys[num].classList.remove("game-key-active");
            recoverRecentClickNum();
        }
    }
}
/*main*/
var scores = 0;
function gamegetnode(num,delay){
    //console.log(num);
    var actual = gameKeysNum(num);
    var judge0 = 0;
    var judge1 = 0;
    var getscore = 0;
    function actualgamejudge(){
        judge0 = setTimeout(getNewScores,delay*1000-500);
        judge1 = setTimeout(stopgetscore,delay*1000+500);
    }
    /*
    function onjudge(){
        if(Number(recentClick)){
            if(actual==recentClick){
                console.log("great"+actual);
                scores += 100;
            }
        }
        var scoretext = document.getElementById("tips-text");
        scoretext.innerHTML=scores;
    }
    */
    function stopgetscore(){
        self.clearInterval(getscore);
        clearTimeout(judge0);
        clearTimeout(judge1);
        var scoretext = document.getElementById("tips-text");
        scoretext.innerHTML=scores;
    }
    function getNewScores(){
        getscore = self.setInterval(function(){
            if(recentClick!=-1){
                if(actual==recentClick){
                    console.log("great"+actual);
                    scores += 100;
                    stopgetscore();
                }
            }
        }, speed * 1000);
    }
    function onactualgamejudge(){
        clearTimeout(judge0);
        clearTimeout(judge1);
        actualgamejudge();
    }
    onactualgamejudge();
}
