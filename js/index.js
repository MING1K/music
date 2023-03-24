
/*黑白键编号*/
var whiteKeys = [1,3,4,6,8,9,11,13,15,16,18,20,21,23,25,27,28,30,32,33,35,37,39,40,
    42,44,45,47,49,51,52,54,56,57,59,61,63,64,66,68,69,71,73,75,76,78,80,81,83,85,87,88];
var blackKeys = [2,5,7,10,12,14,17,19,22,24,26,29,31,34,36,38,41,43,46,48,50,53,55,
    58,60,62,65,67,70,72,74,77,79,82,84,86];
var keysNoteNumber = [6,7,1,2,3,4,5]
var nameKeys = ["A0","A0-","B0","C1","C1-","D1","D1-","E1","F1","F1-","G1","G1-","A1","A1-","B1",
"C2","C2-","D2","D2-","E2","F2","F2-","G2","G2-","A2","A2-","B2",
"C3","C3-","D3","D3-","E3","F3","F3-","G3","G3-","A3","A3-","B3",
"C4","C4-","D4","D4-","E4","F4","F4-","G4","G4-","A4","A4-","B4",
"C5","C5-","D5","D5-","E5","F5","F5-","G5","G5-","A5","A5-","B5",
"C6","C6-","D6","D6-","E6","F6","F6-","G6","G6-","A6","A6-","B6",
"C7","C7-","D7","D7-","E7","F7","F7-","G7","G7-","A7","A7-","B7","C8"];
var actualKeyCodeNum = ["1","2","3","4","5","6","7","8","9","0","-","="]
var actualKeyCodeFirst = ["q","w","e","r","t","y","u","i","o","p","[","]"]
var actualKeyCodeSecond = ["a","s","d","f","g","h","j","k","l",";","'"];//C4开始
var actualKeyCodeThird = ["z","x","c","v","b","n","m",".","/","!","@","#","$","%","^","&","*"];
var actualBlackKeyCode = ["1","2","3","4","5","6","7","8","9","0","-","=","q","w","e","r","t",
    "y","u","i","o","p","[","]","a","s","d","f","g","h","j","k","l",";","'","z","x","c","v","b",
    "n","m",".","/","!","@","#","$","%","^","&","*"];
var actualBlackKeyCode = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J",
    "K","L","Z","X","C","V","B","N","M","(",")","+","{","}",":","<",">","?","~"]
var keyCodeNum = [49,50,51,52,53,54,55,56,57,48  ];//数字键1-0键码
var keyCodeFirst = [81,87,69,82,84,89,85,73,79,80]//字母键：QWERT YUIOP
var keyCodeSecond = [65,83,68,70,71,72,74,75,76,]//字母键：ASDF GHJKL
var keyCodeThird = [90,88,67,86,66,78,77,]//字母键：ZXCVBNM
var sizeNumber = [52,49,42,35,28,21,14]
var canvasinnerheigt = 0;//canvas高
var keyBoardChooseNum=[1,21,42,61];

window.addEventListener('load',function(){
    createBackground();//背景
    creatBoard();
    /*json文件读取设置列表*/
    getSetting();
    /*playKey();单击时*/
    this.document.onkeydown = function(e){
        playKey(e.key);
    }
    this.document.onkeyup = function(e){
        afterPlayKey(e.key);
    }
    /*json文件读取乐曲列表*/
    getSongLists();
    changeSize();
    /*动态监听窗口大小，改变piano */
    this.window.addEventListener('resize',cancalDebounce);
})
function creatBoard(){
    /*生成白键*/
    var whiteKeyStr = "";
    whiteKeys.forEach(e => {
        whiteKeyStr += '<div class="piano-key white-key" index="'+e+'">'+
        '<div class="key-name" data-key="'+e+'"><span class="white-keys-name">'+nameKeys[e-1]+'</span></div>'+
        '<div class="sing-name"><span class="white-keys-play-node">22</span></div></div>'
    })
    document.getElementById("piano-keys-white").innerHTML = whiteKeyStr;
    /*生成黑键*/
    var blackKeyStr = "";
    blackKeys.forEach(e => {
        blackKeyStr += '<div class="piano-key black-key" index="'+e+'">'+
        '<div class="key-name" data-key="'+e+'"><span></span></div>'+
        '<div class="sing-name"><span class="black-keys-play-node"></span></div></div>'
    })
    document.getElementById("piano-keys-black").innerHTML = blackKeyStr;
    /*黑键位置left*/
    var blackKeyStyle = document.querySelectorAll(".black-key");
    for(var i = 0;i<blackKeys.length;i++){
        blackKeyStyle[i].style.left = ((blackKeys[i] - i - 2) * 40) + "px";
    }
    buildAudio();
}
function buildAudio(){
    /*添加音频 */
    var buttonWhite = document.querySelectorAll(".white-key");
    for (var i = 0; i < whiteKeys.length; i++) {
        //var audio = document.createElement("audio");
        //audio.className = "white-audio key-audio";
        //audio.src= "./audio/" + nameKeys[whiteKeys[i] - 1] + ".MP3";
        //audio.preload="auto";//预加载
        //audio.volume = 1;//音量
        //var pianoKeysWhite = document.querySelector(".piano-keys-white");
        //pianoKeysWhite.children[i].appendChild(audio);
        buttonWhite[i].onmousedown=function(){
            this.classList.add("white-key-active-1");
            //this.children[2].load();//通过.mp3播放
            //this.children[2].play();
            var index = this.getAttribute("index");
            playKeyKey(Number(index));
        }
        buttonWhite[i].onmouseup=function(){
            this.classList.remove("white-key-active-1");
        }
        buttonWhite[i].onmouseout=function(){
            this.classList.remove("white-key-active-1");
        }
    }
    var button = document.querySelectorAll(".black-key");
    for (var i = 0; i < blackKeys.length; i++) {
        button[i].onmousedown=function(){
            this.classList.add("black-key-active-1");
            var index = this.getAttribute("index");
            playKeyKey(Number(index));
        }
        button[i].onmouseup=function(){
            this.classList.remove("black-key-active-1");
        }
        button[i].onmouseout=function(){
            this.classList.remove("black-key-active-1");
        }
    }
}
function changeSize(){
    /*获得controlNum初始值*/
    createBackground();//背景
    var controlNum = 1;//初始值为1
    var board_size = document.getElementById("board-size");
    if(board_size){
        controlNum = board_size.getAttribute("state");
    }
    chooseSize(controlNum);//
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
const cancalDebounce = debounce(changeSize, 300);
function chooseSize(num){
    /*键盘调整为适合的大小*/
    if(num>6 || num<0){num=1;}//数字1-5，1为全键键盘
    var keysContain = document.getElementById("piano-keys");
    var maxWidth = document.body.clientWidth;
    var wantWidth = 40*sizeNumber[num-1];
    console.log(maxWidth,wantWidth)
    let size = maxWidth/(wantWidth+5);
    let translateXsize = (52 - sizeNumber[num-1]) * 40 * 0.5;
    var canvasHeight = document.querySelectorAll(".canvas-card");
    var aheight = Math.round(700*(1-size/3))-20;
    canvasinnerheight = aheight;
    canvasHeight.forEach(e => {
        e.height=aheight;
    });
    var canvasContainHeight = document.getElementById("canvas-contain");
    canvasContainHeight.style.height = aheight+"px";
    keysContain.style.transform = "scale("+size+") translateX(-"+translateXsize+"px)";
    canvasContainHeight.style.transform = "scaleX("+size+") translateX(-"+translateXsize+"px)";
}
//播放
function playKeyKey(num) {
    var key = num;
    MIDI.loadPlugin({
        soundfontUrl: "../soundfont/",
        instrument: "acoustic_grand_piano",
        onprogress: function (state, progress) {
            console.log(state, progress);
        },
        onsuccess: function () {
            var note = 21 + key - 1; //21为A0
            var delay = 0;
            var velocity = 127;
            MIDI.setVolume(0, 127);
            MIDI.noteOn(0, note, velocity, delay);
            createCanvas(key);//key为1-88
            MIDI.noteOff(0, note, delay + 0.75);            
        }
    });
}
/*键盘控制 */
function playKey(e){
    e = String(e);
    var buttonWhite = document.querySelectorAll(".white-key");
    var buttonBlack = document.querySelectorAll(".black-key");
    if(actualKeyCodeSecond.includes(e)){
        var num = actualKeyCodeSecond.indexOf(e) + whiteKeys.indexOf(keyBoardChooseNum[2]);
        if(buttonWhite[num].classList.contains("white-key-active")){
            return 0;
        }
        else{
            buttonWhite[num].classList.add("white-key-active");
            var key = Number(buttonWhite[num].getAttribute("index"));
            playKeyKey(key);
        }
    }
    else if(actualKeyCodeFirst.includes(e)){
        var num = actualKeyCodeFirst.indexOf(e) + whiteKeys.indexOf(keyBoardChooseNum[1]);
        if(buttonWhite[num].classList.contains("white-key-active")){
            return 0;
        }
        else{
            buttonWhite[num].classList.add("white-key-active");
            var key = Number(buttonWhite[num].getAttribute("index"));
            playKeyKey(key);
        }
    }
    else if(actualKeyCodeThird.includes(e)){
        var num = actualKeyCodeThird.indexOf(e) + whiteKeys.indexOf(keyBoardChooseNum[3]);
        if(buttonWhite[num].classList.contains("white-key-active")){
            return 0;
        }
        else{
            buttonWhite[num].classList.add("white-key-active");
            var key = Number(buttonWhite[num].getAttribute("index"));
            playKeyKey(key);
        }
    }
    else if(actualKeyCodeNum.includes(e)){
        var num = actualKeyCodeNum.indexOf(e) + whiteKeys.indexOf(keyBoardChooseNum[0]);
        if(buttonWhite[num].classList.contains("white-key-active")){
            return 0;
        }
        else{
            buttonWhite[num].classList.add("white-key-active");
            var key = Number(buttonWhite[num].getAttribute("index"));
            playKeyKey(key);
        }
    }
    else if(actualBlackKeyCode.includes(e)){
        var num = actualBlackKeyCode.indexOf(e);
        if(buttonBlack[num].classList.contains("black-key-active")){
            return 0;
        }
        else{
            buttonBlack[num].classList.add("black-key-active");
            var key = Number(buttonBlack[num].getAttribute("index"));
            playKeyKey(key);
        }
    }
}
//去除效果
function afterPlayKey(e){
    var buttonWhite = document.querySelectorAll(".white-key");
    var buttonBlack = document.querySelectorAll(".black-key");
    if(actualKeyCodeSecond.includes(e)){
        var num = actualKeyCodeSecond.indexOf(e) + whiteKeys.indexOf(keyBoardChooseNum[2]);
        buttonWhite[num].classList.remove("white-key-active");
    }
    else if(actualKeyCodeFirst.includes(e)){
        var num = actualKeyCodeFirst.indexOf(e) + whiteKeys.indexOf(keyBoardChooseNum[1]);
        buttonWhite[num].classList.remove("white-key-active");
    }
    else if(actualKeyCodeThird.includes(e)){
        var num = actualKeyCodeThird.indexOf(e) + whiteKeys.indexOf(keyBoardChooseNum[3]);
        buttonWhite[num].classList.remove("white-key-active");
    }
    else if(actualKeyCodeNum.includes(e)){
        var num = actualKeyCodeNum.indexOf(e) + whiteKeys.indexOf(keyBoardChooseNum[0]);
        buttonWhite[num].classList.remove("white-key-active");
    }
    else if(actualBlackKeyCode.includes(e)){
        var num = actualBlackKeyCode.indexOf(e);
        buttonBlack[num].classList.remove("black-key-active");
    }
}
//添加自动播放键盘效果
function changeKeysBack(num){
    if(whiteKeys.indexOf(num)!=-1){
        listNum = whiteKeys.indexOf(num);
        var buttonWhite = document.querySelectorAll(".white-key");
        buttonWhite[listNum].classList.add("white-key-active-1");
    }
    else if(blackKeys.indexOf(num)!=-1){
        listNum = blackKeys.indexOf(num);
        var buttonBlack = document.querySelectorAll(".black-key");
        buttonBlack[listNum].classList.add("black-key-active-1");
    }
}
//去除效果
function recoverKeysBack(num){
    if(whiteKeys.indexOf(num)!=-1){
        listNum = whiteKeys.indexOf(num);
        var buttonWhite = document.querySelectorAll(".white-key");
        buttonWhite[listNum].classList.remove("white-key-active-1");
    }
    else if(blackKeys.indexOf(num)!=-1){
        listNum = blackKeys.indexOf(num);
        var buttonBlack = document.querySelectorAll(".black-key");
        buttonBlack[listNum].classList.remove("black-key-active-1");
    }
}
/*json读取乐曲列表*/
function getSongLists(){
    var url = "midi.json";
    var request = new XMLHttpRequest();
    request.open("get",url);
    request.send(null);
    request.onload = function(){
        if(request.status == 200){//status 200 代表一个成功的请求
            var json = JSON.parse(request.responseText);
            //console.log(json);
            chooseMIDI(json)
        }
    }
}
/*选择乐曲*/
function chooseMIDI(json){
    var list = document.getElementById("chooseLists");
    var songname = document.getElementById("songname");
    if(list){
        list.remove();
        var ul = document.createElement("ul");
        ul.id="chooseLists";
        ul.className="chooseLists";
        songname.appendChild(ul);
    }
    json.songs.map(songs=> {
        var li = document.createElement("li");
        li.innerHTML = songs.songsname;
        li.setAttribute("path",songs.path);
        li.setAttribute("name",songs.songsname)
        li.className = "choose-list-list";
        li.onclick = function(){
            var songname = document.getElementById("songname");
            var clicksong = this.getAttribute("name");
            var clickpath = this.getAttribute("path");
            songname.children[0].innerHTML=clicksong;
            songname.children[0].setAttribute("path",clickpath);
            stopMIDI();
        }
        songname.children[1].append(li);
    })
}
/*json文件读取设置列表*/
function getSetting(){
    var url = "index.json";
    var request = new XMLHttpRequest();
    request.open("get",url);
    request.send(null);
    request.onload = function(){
        if(request.status == 200){//status 200 代表一个成功的请求
            var json = JSON.parse(request.responseText);
            createSetting(json)
        }
    }
}
/*创建设置*/
function createSetting(json){
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
    changeSizeControl();//控制键盘大小
    changeTips();//控制键盘弹奏提示
    changeNote();//控制音符注释的出现
    changeNumNote();//控制音符注释(数字)的出现
    hideHead();//控制标题隐藏
    hideSetting();//控制设置出现
}
/*隐藏设置*/
function hideSetting(){
    var containSetting = document.getElementById("setting-list");
    var btn = document.getElementById("start-setting");
    containSetting.setAttribute("index",0);
    containSetting.style.height="0px";
    btn.onclick=function(){
        var containSetting = document.getElementById("setting-list");
        var index = containSetting.getAttribute("index");
        var btn = document.getElementById("start-setting");
        if(index==0){
            containSetting.setAttribute("index",1);
            containSetting.style.height="auto";
            btn.innerHTML="<a>收回</a>";
        }
        else if(index==1){
            containSetting.setAttribute("index",0);
            containSetting.style.height="0px";
            btn.innerHTML="<a>设置</a>";
        }
    }
}
/*隐藏标题*/
function hideHead(){
    var btn = document.getElementById("hide-head");
    var state = btn.getAttribute("state");
    if(state==1){
        btn.setAttribute("state",0);
        changeHideHead();
    }
    btn.onclick=function(){
        changeHideHead();
    }
}
function changeHideHead(){
    var btn = document.getElementById("hide-head");
    var btn_a = document.getElementById("hide-head-a");
    var btn_a_num = document.getElementById("hide-head-num");
    var head = document.getElementById("head");
    var contain =document.getElementById("contain");
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
        head.style.display="block";
        contain.style.top="60px";
        btn.setAttribute("state",0);
        btn_a.classList.remove("buttonSetting-active");
        btn_a_num.setAttribute("state",0);
        btn_a_num.classList.remove("setting-btn-active");
    }
}
/*控制键盘大小*/
function changeSizeControl(){
    var left_btn = document.getElementById("board-size-left-btn");
    var right_btn = document.getElementById("board-size-right-btn");
    left_btn.onclick=function(){
        var board_size = document.getElementById("board-size");
        var setControlNum = board_size.getAttribute("state");
        var board_size_num = document.getElementById("board-size-num");
        if(setControlNum<=1){
            return;
        }
        else{
            setControlNum--;
            board_size_num.innerHTML=setControlNum;
            board_size.setAttribute("state",setControlNum);
            chooseSize(setControlNum);
        }
    }
    right_btn.onclick=function(){
        var board_size = document.getElementById("board-size");
        var setControlNum = board_size.getAttribute("state");
        var board_size_num = document.getElementById("board-size-num");
        if(setControlNum>=5){
            return;
        }
        else{
            setControlNum++;
            board_size_num.innerHTML=setControlNum;
            board_size.setAttribute("state",setControlNum);
            chooseSize(setControlNum);
        }
    }
}
/*控制键盘弹奏提示显示*/
function changeTips(){
    var keyboardTipa = document.getElementById("keyboard-tip-a");
    var btn = document.getElementById("keyboard-tip-num");
    var state = btn.getAttribute("state");
    if(state==1){
        createTips();
    }
    keyboardTipa.onclick=function(){
        var keyboardTipLi = document.getElementById("keyboard-tip");
        var btn = document.getElementById("keyboard-tip-num");
        var keyboardTipa = document.getElementById("keyboard-tip-a");
        var state = btn.getAttribute("state");
        if(state==1){
            keyboardTipLi.setAttribute("state",0);
            btn.setAttribute("state",0);
            keyboardTipa.classList.remove("buttonSetting-active");
            btn.classList.remove("setting-btn-active");
            var whiteNode = document.querySelectorAll(".white-keys-play-node");
            var blackNode = document.querySelectorAll(".black-keys-play-node");
            for(var j=0;j<whiteKeys.length;j++){
                whiteNode[j].innerHTML="";
            }
            for(var j=0;j<blackKeys.length;j++){
                blackNode[j].innerHTML="";
            }
        }
        else if(state==0){
            createTips();
        }
    }
}
/*创建提示*/
function createTips(){
    var keyboardTipLi = document.getElementById("keyboard-tip");
    var keyboardTipa = document.getElementById("keyboard-tip-a");
    var btn = document.getElementById("keyboard-tip-num");
    keyboardTipLi.setAttribute("state",1);
    btn.setAttribute("state",1);
    keyboardTipa.classList.add("buttonSetting-active");
    btn.classList.add("setting-btn-active");
    var whiteNode = document.querySelectorAll(".white-keys-play-node");
    var numCount = 0;
    var firstCount = 12;
    var secondCount = 24;
    var thirdCount = 35;
    var blackCount = 0
    for(var j=0;j<whiteKeys.length;j++){
        whiteNode[j].innerHTML="#";
    }
    actualKeyCodeNum.forEach(e => {
        whiteNode[numCount].innerHTML = e;
        numCount++;
    });
    actualKeyCodeFirst.forEach(e => {
        whiteNode[firstCount].innerHTML = e;
        firstCount++;
    });
    actualKeyCodeSecond.forEach(e => {
        whiteNode[secondCount].innerHTML = e;
        secondCount++;
    });
    actualKeyCodeThird.forEach(e => {
        whiteNode[thirdCount].innerHTML = e;
        thirdCount++;
    });
    var blackNode = document.querySelectorAll(".black-keys-play-node");
    actualBlackKeyCode.forEach(e => {
        blackNode[blackCount].innerHTML = e;
        blackCount++;
    });
}
/*控制音符注释的出现*/
function changeNote(){
    var btnbtn = document.getElementById("note-name-num");
    var btn = document.getElementById("note-name-a");
    var state = btnbtn.getAttribute("state");
    if(state==1){
        createNoteName();
    }
    btn.onclick=function(){
        var numberNote = document.getElementById("note-number-name");
        var numberNoteState = numberNote.getAttribute("state");
        if(numberNoteState==0){
            beginNoteNameChange();
        }
        else if(numberNoteState==1){
            endNumberNoteChange();
            beginNoteNameChange();
        }

    }
}
function beginNoteNameChange(){
    var btnbtn = document.getElementById("note-name-num");
    var btn = document.getElementById("note-name-a");
    var noteName=document.getElementById("note-name");//li
    var state = noteName.getAttribute("state");
    if(state==1){
        noteName.setAttribute("state",0);
        btnbtn.setAttribute("state",0);
        btn.classList.remove("buttonSetting-active");
        btnbtn.classList.remove("setting-btn-active");
        var whiteKeysName = document.querySelectorAll(".white-keys-name");
        var count = 0;
        whiteKeys.forEach(e => {
            var number = e - 1;
            whiteKeysName[count].innerHTML = "";
            count++;
        });
    }
    else if(state==0){
        createNoteName();
    }
}
function createNoteName(){
    var noteName=document.getElementById("note-name");//li
    var btnbtn = document.getElementById("note-name-num");
    var btn = document.getElementById("note-name-a");
    noteName.setAttribute("state",1);
    btnbtn.setAttribute("state",1);
    btn.classList.add("buttonSetting-active");
    btnbtn.classList.add("setting-btn-active");
    var whiteKeysName = document.querySelectorAll(".white-keys-name");
    var count = 0;
    whiteKeys.forEach(e => {
        var number = e - 1;
        whiteKeysName[count].innerHTML = nameKeys[number];
        count++;
    });
}
/*控制音符注释(数字)的出现*/
function changeNumNote(){
    var btn = document.getElementById("note-number-name");//li
    btn.onclick=function(){
        var btn = document.getElementById("note-number-name");//li
        var state = btn.getAttribute("state");
        if(state==0){
            beginNumberNoteChange();
        }
        else if(state==1){
            endNumberNoteChange()
        }
    }
}
function endNumberNoteChange(){
    var btn = document.getElementById("note-number-name");//li
    var btn_a = document.getElementById("note-number-name-a");
    var btn_a_num = document.getElementById("note-number-name-num");
    btn.setAttribute("state",0);
    btn_a_num.setAttribute("state",0);
    btn_a.classList.remove("buttonSetting-active");
    btn_a_num.classList.remove("setting-btn-active");
    var whiteKeysName = document.querySelectorAll(".white-keys-name");
    for(var j=0;j<whiteKeys.length;j++){
        whiteKeysName[j].innerHTML = "";
    }
}
function beginNumberNoteChange(){
    var btn = document.getElementById("note-number-name");//li
    var btn_a = document.getElementById("note-number-name-a");
    var btn_a_num = document.getElementById("note-number-name-num");
    var noteName = document.getElementById("note-name");//li
    var noteNameState = noteName.getAttribute("state");
    var whiteKeysName = document.querySelectorAll(".white-keys-name");
    if(noteNameState==1){
        beginNoteNameChange();
    }
    btn.setAttribute("state",1);
    btn_a_num.setAttribute("state",1);
    btn_a.classList.add("buttonSetting-active");
    btn_a_num.classList.add("setting-btn-active");
    for(var j=0;j<whiteKeys.length;j++){
        whiteKeysName[j].innerHTML = "&nbsp;" + keysNoteNumber[j%7] + "&nbsp;";
    }
}