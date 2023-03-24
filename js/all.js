

window.addEventListener('load',function(){
    getHeadLists();
});
/*json文件读取*/
function getHeadLists(){
    var url = "index.json";
    var request = new XMLHttpRequest();
    request.open("get",url);
    request.send(null);
    request.onload = function(){
        if(request.status == 200){//status 200 代表一个成功的请求
            var json = JSON.parse(request.responseText);
            createHeadLists(json.headlist)
        }
    }
}
/*json文件读取设置标题*/
function createHeadLists(headjson){
    var headList = document.getElementById("main-header-list");
    var number = headjson.length;
    for(var j=0;j<number;j++){
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.classList.add("font");
        a.innerHTML=headjson[j].name;
        a.classList.add(headjson[j].classname);
        a.id=headjson[j].id;
        a.setAttribute("state",headjson[j].state);
        a.setAttribute("href",headjson[j].herf);
        a.classList.remove("active");
        if(headjson[j].name==document.title){
            a.classList.add("active");
        }
        li.append(a);
        headList.append(li);
    }
}

