/**
 * Created with JetBrains WebStorm.
 * User: andycall
 * Date: 8/22/13
 * Time: 9:02 PM
 * To change this template use File | Settings | File Templates.
 */

/*
this function send the get HTTP request ,
return  XML object or JSON object or string text
*/

// GET获取数据
function get(url,callback){
    var request = new XMLHttpRequest();
    request.open("GET",url);
    request.addEventListener('readystatechange',function(){
        if(request.readyState === 4 && request.status === 200){
            var type = request.getResponseHeader("Content-Type").toUpperCase();
            if(type.indexOf('XML') !== -1 && type.responseXML){
                callback(type.responseXML);
            }
            else if(type.indexOf('JSON')){
                callback(JSON.parse(type.responseText));
            }
            else{
                alert(type.responseText);
                callback(type.responseText);
            }
        }
    },false);
}

// 格式转码
function encodeFormData(data){
    if(!data) return "";
    var pairs = [];
    for(var name in data){
        if(!data.hasOwnProperty(name)) continue;
        if(typeof data[name] === 'function') continue;
        var value  = data[name].toString();
        name = encodeURIComponent(name.replace("%20",""));
        value = encodeURIComponent(value.replace("%20",""));
        pairs.push(name +"="+ value);
    }
    return pairs.join('&');
}
// POST请求数据
function postdata(url,data,callback){
        var request = new XMLHttpRequest();
        request.open('POST',url,true);
        request.addEventListener('readystatechange',function(){
            if(request.readyState === 4 && callback){
                  callback(request);
            }
        },false);
        request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        request.send(encodeFormData(data));     
}

// GET请求数据
function getdata(url,data,callback){
    var request = new XMLHttpRequest();
    request.open('GET',url + "?" + encodeFormData(data));
    request.addEventListener('readystatechange',function(){
        if(request.readyState === 4 && callback)
            callback(request);
    },false);
    request.send(null);
}

function sendJSON(url,data,callback){
    var request = new XMLHttpRequest();
    request.open('POST',url,true);
    request.addEventListener('readystatechange',function(){
        if(request.readyState === 4 && callback)
           callback(request);
    },false);
    request.setRequestHeader('Content-Type','application/json');
    request.send(encodeFormData(data));
}

// 定循环GET数据
function timeGetText(url,timeout,callback){
    var request = new XMLHttpRequest();
    var timedout = false;
    var timer = setTimeout(function(){
        timedout = ture;
        request.abort();
    },timeout);

    request.open('GET',url,true);

    request.addEventListener('readystatechange',function(){
        if(request.readyState !== 4) return;
        if(timedout) return;
        clearTimeout(timer);
        if(request.status === 200){
            callback(request.responseText);
        };
    },false);
    request.send(null);
}

function getReply(reply){ //ajax发送请求的回复
    if(!reply || reply === 0){
        self.postMessage('failed');
    }
    else if(reply === 1){
        self.postMessage('success');
    }
}

function dealData(){
    return function(e){
        var type = e.data.type;
        if(typeof type !== "string") return false;
        switch(type){
            case "GET":
                getdata(URL,data,getReply);  //get 发送请求
                break;
            case "POST":
                postdata(URL,data,getReply); // post发送请求
        }

    }
}
// worker 对象方法

self.addEventListener('message',dealData(),false);


