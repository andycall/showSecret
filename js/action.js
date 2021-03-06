/**
 * Created with JetBrains WebStorm.
 * User: andycall
 * Date: 7/11/13
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */


function $$(id){
		return typeof id === 'string' ? document.getElementById(id) : id;
}



// 迭代器
var each = (function(arr){
	var index = 0;
	return {
		hasNext : function(){
			return index < arr.length;
		},
		next : function(){
			var element;
			if(!this.hasNext()){
				return null;
			}
			element = arr[index];
			index ++;
			return element;
		}
	}

})();

var whenReady = (function(){
    var func = [];
    var ready = false;

    function hander(e){
        if(ready) return ;

        if(e.type == 'readystatechange' && document.readyState !== 'complete'){
            return ;
        }

        for(var i=0; i< func.length; i++){
            func[i].call(document);
        }


        ready = true;
        func = null;
    }

    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded',hander,false);
        document.addEventListener('readystatechange',hander,false);
        window.addEventListener('load',hander,false);
    }

    else if(document.attachEvent){
        document.attachEvent('onreadystatechange',hander,false);
        window.attachEvent('onload',hander);
    }


    return function whenReady(f){
         if(ready) f.call(document);
         else func.push(f);
    }
})();


function getClass(classname){
    return Array.prototype.slice.call(document.getElementsByClassName(classname),0);
}
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}
	else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
};

function addClass(element,value){
	if(!element.className){
		element.className = value;
	}
	if(element.className.indexOf(value) > 0) return;
	else{
		newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
};

function removeClass(element,value){
	if(!element.className) return false;
	if(element.className.indexOf(value) < 0) return false;
	else{
		oldClassName = element.className;
		oldPart1 = oldClassName.substring(0,oldClassName.indexOf(value));
		oldPart2 = oldClassName.substring(oldClassName.indexOf(value) + value.length, oldClassName.length);
		newClassName = oldPart1 + oldPart2;
		element.className =  newClassName;
	}
}

function curry(fn,scrope){
	var scrope = scrope || window;
	var args = [];
	for(var i= 2; i< arguments.length; i ++){
		args.push(arguments[i]);
	}

	return function(){
		var otherArgs = [];
		for(var i =0; i< arguments.length; i++){
			otherArgs.push(arguments[i]);
		}
		var argsTotal = args.concat(otherArgs);
		
		fn.apply(scrope,argsTotal);
	}
};


function writeCookie(name,value,days){
	//By default ,there is no expiration so the cookie is temporary
	var expires = "";

	//Specifying a number of days makes the cookie persistent
	if(days){
		var date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expries=' + date.toGMTString();
	}


	document.cookie = name + '=' + value + expires + '; path=/';
};

function readCookie(name){
	//find the specified cookie and return its value
	var searchName = name + '=';
	var cookie = document.cookie.split(';');
	for(var i =0; i< cookie.length; i++){
		var c = cookie[i];
		while(c.charAt(0) == " ") c = c.substring(1,c.length);
		if(c.indexOf(searchName) == 0) return c.substring(searchName.length,c.length);
	}
	return null;
};

function eraseCookie(name){
	writeCookie(name,"",-12);
};

function addListen(obj,type,handle){
	if(window.addEventListener){
		obj.addEventListener(type,handle,false);
	}
	else if(window.attachEvent){
		obj.attachEvent('on' + type,handle);
	}
	else{
		obj['on' + type] = handle;
	}
}




// 滚动条
function changeSlider(index,elem){
	var slider = document.getElementsByClassName('slider')[0];
	var sliderWidth = window.getComputedStyle(slider).width;
	// console.log(sliderWidth);
    slider.style.left = (parseInt(sliderWidth) * index)  + 'px';  
}

// 修改高度
function changeHeight(index,elem){
	var elemHeight = parseInt(window.getComputedStyle(elem).height);
	getClass('swipe-wrap')[0].style.height = elemHeight + 'px';
}

function addListenToContent(){
	var click_praise = getClass('click_praise');
	for(var i = 0,len = click_praise.length; i < len ; i += 1){
		click_praise[i].addEventListener('click',getPrased(click_praise[i]),false);
	}
}

function getOpenId(){
	return document.getElementById('userId').getAttribute('openid');
}

function findPraise(){
	var allContent = getClass('click_praise');
	// console.log(allContent);
	for(var i = 0,len = allContent.length; i < len ;i += 1){
		if(parseInt(allContent[i].getAttribute('ispraied')) == 0){
			allContent[i].innerHTML = "已赞";
		}
	}
}


function getPrased(elem){  //点赞
	return function(){
		console.log(elem);
		var articleId = elem.getAttribute('articleId');
		var openid = getOpenId();
		console.log(openid);
		
		var data = {
			user_openid : openid,
			sec_id: articleId	
		};
		sendAjax(data,"POST","admire")
			// console.log(elem);
		function admireState(){
			return function(e){
				if(e.data.SECRET === 'admire'){
					if(e.data.state == 1){
						elem.innerHTML = "已赞";
					}
				}
				else{
					alert('什么情况?? 评论失败。。 :(');
				}
			}
		}
			// writeCookie('PRASECHECK',articleId ,365);
		worker.addEventListener('message',admireState(),false)
		//发送数据到worker
		
		// ..................
	}
}




function buttonClick(){
	var messageButton = getClass("message-button")[0];
	var userButton = getClass('user-button')[0];
	var clickState = 0;
	// messageButton.addEventListener('click',changeBack(),false);
	// userButton.addEventListener('click',changeBack(),false);
	// messageButton.addEventListener('click',function(e){
	// 	toggle(messageButton,changeBack(),doubleClick());
	// });
	var toggle = function toggle(el){
		// 每次点击进行切换
		// console.log(el);
		var funs = [].slice.call(arguments,1);
		var state = [0,1];
		if(funs.length > 2) return false;
		if(clickState == 0){
			clickState = 1;
			// console.log(el);
			// console.log('213');
			funs[0].call(el);
		}
		else {
			clickState = 0;
			// console.log('123');
			funs[1].call(el);
			// console.trace();
		}
	// var backup = funs.concat();
	// 	console.log(arguments);
	// 	if(!funs.length)  return;
	// 	// funs[0].call(el);
	// 	// funs.shift();
	// var eachBox = new each(funs);
	}

	userButton.addEventListener('click',function(e){
		toggle(userButton,changeBack(),doubleClick());
	});
	// toggle(userButton,changeBack(),doubleClick());
}

function changeBack(){
	return function(){
		// console.log(this);
		this.style.background = "#1e931e";
		if(this.getAttribute('class') === "user-button"){
			$$('user_select').style.display = 'block';
		}
	}
}

function doubleClick(){
	return function(){
		// console.log(this);
		this.style.background = "#14ca14";
		// console.log(this.getAttribute('class'));
		if(this.getAttribute('class') === "user-button"){
			// console.log('qwe');
			$$('user_select').style.display = 'none';
		}
	}
}

function addWrapper(){
	var frageMent = document.createDocumentFragment();
	var div = document.createElement('div');
	div.innerHTML = "helloworld";
	frageMent.appendChild(div);
	document.getElementsByClassName('swipe-wrap')[0].appendChild(frageMent);

}


function clearAllsection(){
	// console.log('helloworld');
	var container = $$('sectionSlider');
	var sliders = container.children[0].children;
	var length = sliders.length;
	for(var i = 0 ; i < length; i += 1 ){
		if(sliders[i].getAttribute('id') !== 'manBox'){
			sliders[i].style.display = 'none';
		}
	}
}




function BackToMain(){
	var goBack = getClass('goBack');
	for(var i = 0, len = goBack.length; i < len ; i += 1){
		goBack[i].addEventListener('click',goToBack(),false);
	}	
	function goToBack(){
		return function(){
				abc.ReturnBack();
			setTimeout(function(){abc.kill()},250);
		}
	}
}

function secWhichShow(target){
	var secMain = getClass('sec-main')[0];
	var shows = secMain.children;
	for(var i = 0,len = shows.length ; i < len ; i += 1  ){
		if(i === target) continue;
		shows[i].style.display = "none";
	}
}



function addListenToButton(){
	var secMain = getClass('sec-main')[0];
	var divPos = secMain.children;
	var click_comment = getClass('click-comment');
	var message = getClass('message-button')[0];
	var mySecret = getClass('mySecret')[0];
	var myReply = getClass('myReply')[0];
	message.addEventListener('click',checkWhichShow(),false);
	mySecret.addEventListener('click',checkWhichShow(),false);
	myReply.addEventListener('click',checkWhichShow(),false);	
	for(var i = 0 , len = click_comment.length ; i < len; i += 1){
			click_comment[i].addEventListener('click',click_swap(),false);
	}
	var name_submit = $$('name_submit');
		name_submit.addEventListener('click',function(){
			var user_names = $$('user_name').innerHTML;
			var reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
			if(!reg.test(user_names)){
				alert('输入只能为数字，字母和汉字');
				$$('user_name').innerHTML = "";
				return false;
			}
			var data = {
				user_name : user_names
			};
			console.log('ajaxsended');
			sendAjax(data,"POST","firstLogin");
		},false);
		function addopenid(){
			return function(e){
				if(e.data.SECRET == 'firstLogin'){
					var openid = e.data.openid;
					var dataName = e.data.dataName;
					$$('userId').setAttribute('openid',openid);
					$$('userId').setAttribute('data-name',dataName);
					// writeCookie('openid',openid,365);
					abc.ReturnBack();
					setTimeout(function(){abc.kill()},250);
				}		
			}
		}
		worker.addEventListener('message',addopenid(),false);


	function click_swap(){
		return function(){
			// console.log($$('userId').getAttribute(''));
			if($$('userId').getAttribute('data-name') == '#'){
				for(var i = 0,len = divPos.length ; i < len ; i += 1 ){
					console.log(divPos);
					divPos[i].style.display = "none";
				}
				divPos[3].style.display = 'block';
				abc.setup();
				setTimeout(function(){abc.next(),200});
				window.scroll(0);
			}
			else{
				for(var i = 0,len = divPos.length ; i < len ; i += 1 ){
					console.log(divPos);
					divPos[i].style.display = "none";
				}
				console.log('123');
				divPos[4].style.display = 'block';	
				abc.setup();
				setTimeout(function(){abc.next(),200});
				window.scroll(0);
			}
		}
	}

	function checkWhichShow(){
		return function(){
			console.log('2eq',this);
			for(var i = 0,len = divPos.length ; i < len ; i += 1 ){
				divPos[i].style.display = "none";
				console.log(divPos[i]);
			}

			// var loginInfo = readCookie('openid');
			loginInfo = document.getElementById('userId').getAttribute('data-name');
			console.log(!loginInfo);
			if(loginInfo == '#'){
				console.log('123123123213');
				divPos[3].style.display = 'block';
			}
			else if(this.getAttribute('class') == 'message-button'){
				console.log(divPos);
				divPos[0].style.display = 'block';
			}
			else if(this.getAttribute('class') == 'mySecret'){
				console.log(divPos[1]);
				divPos[1].style.display = 'block';
			}
			else if(this.getAttribute('class') == 'myReply'){
				divPos[2].style.display = "block";
				this.style.display = 'block';
			}
			abc.setup();
			setTimeout(function(){abc.next(),200});
			window.scroll(0);
		}
	}

	
}

function CommitShow(){
	var comments = getClass('comment-reply');
	var commentBox = getClass('comment-box');
	function sendComimtinfo(){
		return function(){
			var parent = this.parentNode;
			var openid = $$('userId').getAttribute('openid');
			var articleId = parent.getAttribute('articleId');
			var commentValue = $$('comment_input_box').innerHTML.toString();
			console.log(commentValue);
			var data = {
				user_openid : openid,
				sec_id: articleId,
				content: commentValue
			};
			console.log(data);

			sendAjax(data,"POST","commitShow");
			
			function getMessage(){
				return function(e){
					if(e.data.SECRET == 'commitShow'){
						console.log('123');
						var p = document.createElement('p');
						var name = document.createElement('span');
						name.style.marginLeft = '40px';
						name.setAttribute('class','comment-user');
						name.innerHTML = e.data.name;

						var point = document.createElement('span');
						point.innerHTML = "：";
						var text = document.createTextNode(commentValue);
						p.appendChild(name);
						p.appendChild(point);
						p.appendChild(text);
						parent.appendChild(p);
					}
				}
			}


			parent.removeChild(this);
			parent.removeChild($$('comment_input_box'));
			
			worker.addEventListener('message',getMessage(),false);
		}
	}
	function showClickBox(){
		return function(){
			console.log('click');
			if(!$$('comment_input_box')){
				var fragment =  document.createDocumentFragment();
				var inputbox = document.createElement('div');
				inputbox.setAttribute('class','type-your-reply');
				inputbox.setAttribute('contenteditable','true');
				inputbox.setAttribute('id','comment_input_box');
				fragment.appendChild(inputbox);

				var submit = document.createElement('div');
				submit.innerHTML = "发表";
				submit.setAttribute('class','comment-button');
				submit.setAttribute('id','commit_submit');
				submit.addEventListener('click',sendComimtinfo(),false);
				fragment.appendChild(submit);

				this.parentNode.parentNode.appendChild(fragment);
			}
		}
	}
	for(var i = 0 , len = comments.length; i < len; i += 1 ){
		comments[i].addEventListener('click',showClickBox(),false);
	}
}


// // 首次登陆
// function firstLogin(){
// 	var nowId = readCookie('openid');
// 	if(nowId != "undefined"){
// 		$$('userId').setAttribute('openid',nowId);
// 	}
// 	else{
// 		var name_submit = $$('name_submit');
// 		name_submit.addEventListener('click',function(){
// 			var user_names = $$('user_name').innerHTML;
// 			var data = {
// 				user_name : user_names
// 			};
// 			console.log('ajaxsended');
// 			sendAjax(data,"POST","firstLogin");
// 		},false);
// 		function addopenid(){
// 			return function(e){
// 				if(e.data.SECRET == 'firstLogin'){
// 					var openid = e.data.openid;
// 					$$('userId').setAttribute('openid',openid);
// 					writeCookie('openid',openid,365);
// 					abc.ReturnBack();
// 					setTimeout(function(){abc.kill()},250);
// 				}		
// 			}
// 		}
// 		worker.addEventListener('message',addopenid(),false);
// 	}
// }  




function publishSecret(){
	var Secret_publish = $$('Secret_publish');
	var secretContent = $$('secret_content');
	var isNamed = $$('isNamed');

	function sendSecret(){
		return function(){
			if(secretContent.innerHTML == "") return false;
			var openid = $$('userId').getAttribute('openid');
			var data = {
				user_openid : openid,
				secret_conent : secretContent.innerHTML,
				isNamed : isNamed.checked
			};
			sendAjax(data,"POST",'publish');
			abc.ReturnBack();
			setTimeout(function(){abc.kill()},250);
		}
	}
	function afterSendss(){
		return function(e){
			console.log(e);
			if(e.data.SECRET == 'publish'){	
				if(e.data.state == '1'){
					var userName = e.data.name;
					var date = new Date();
					var divWrapper = document.createElement('div');
					divWrapper.classList.add('message-section');
					divWrapper.classList.add('message-default');
					divWrapper.classList.add('message-wrapper');
					// divWrapper.setAttribute('class','message-section message-default message-wrapper');
					divWrapper.innerHTML = "<div class='header-wrapper clearfix'><div class='header-name'><p class='name' >" + userName +"<span> : </span></p><p class='time'>" + date.getFullYear() + '-' + date.getMonth() +'-' + date.getDate() + "</p></div></div><div class='main-message'>这是测试，这是测试，这是测试，这是测试，这是测试，这是测试，这是测试，这是测试，这是测试，这是测试</div><div class='praise-comment clearfix'><div class='comment'><img src='image/comment_add.png'><span class='click-comment' articleId='123'>评论</span><!--  被评论者的articleId  123 --></div><div class='praise'><img src='image/hand_thumbsup.png'><span class='click_praise' articleId='123' ispraied='0'>赞</span> <!--  被评论者的articleId  123 --></div></div><div class='show-comment'><span class='comment-statement'><i class='comment-count'>4</i>人觉得很赞</span></div>";
					console.log(getClass('wrapper')[1]);
					console.log(divWrapper);
					console.log("divWrapper",divWrapper);
					getClass('wrapper')[1].children[0].insertBefore(divWrapper,getClass('wrapper')[1].children[0].children[0]);
					// changeHeight(1,getClass('wrapper')[1]);
				}
			}
			else{
				return false;
			}
		}
	}
	Secret_publish.addEventListener('click',sendSecret(),false);
	worker.addEventListener('message',afterSendss(),false);
}

function detail_publish(){
	var detail_comment_box  = $$('detail_comment-box');
	var contentMessager = getClass('content-messager');
	var data_name = $$('userId').getAttribute('data-name');
	var detail_commented_container = getClass('detail-commented-container')[0];
	for(var i =0 ; i < contentMessager.length; i += 1){
		contentMessager[i].addEventListener('click',sendDetail(),false);
	}
	var detail_commit_submit = $$('detail_commit_submit');
	detail_commit_submit.addEventListener('click',sendComment(),false);

	function sendDetail(){
		return function(e){
			console.log(e);
			if(e.target.getAttribute('class') == "praise-comment clearfix" || e.target.getAttribute('class') == "header-wrapper clearfix" || e.target.getAttribute('class') == "show-comment" || e.target.getAttribute('class') == "message-section message-default message-wrapper" ||e.target.getAttribute('class')== "comment-statement" || e.target.getAttribute('class') == 'time' ||e.target.getAttribute('class') == "main-message" || e.target.getAttribute('class') == "name"){
				var name = this.getElementsByClassName('name')[0].innerHTML;
				var time = this.getElementsByClassName('time')[0].innerHTML;
				var mainContent = this.getElementsByClassName('main-message')[0].innerHTML;
				var commentCoutn = this.getElementsByClassName('comment-count')[0].innerHTML;
				var articleId = this.getElementsByClassName('click_praise')[0].getAttribute('articleId');
				var ispraied  = this.getElementsByClassName('click_praise')[0].getAttribute('ispraied');
				var comments = this.children[0].getElementsByTagName('p');
				
				// var wrapper = document.createElement('div');
				// wrapper.setAttribute('class','content-messager');
				var wrapper = document.createElement('div');	
				wrapper.setAttribute('data-click','1');
				var detail_content = getClass('detail_content')[0];
				if(detail_content.children[0].getAttribute('data-click') == 1){
					detail_content.removeChild(detail_content.children[0]);
				}
				wrapper.innerHTML = "<div class='header-wrapper clearfix'><div class='header-name'><p class='name' >"+ name + "<span> : </span></p> <p class='time'> " + time + "</p></div></div><div class='main-message'>" + mainContent + "这是测试，这是测试，这是测试，这是测试，这是测试，这是测试，这是测试，这是测试，这是测试，这是测试</div><div class='praise-comment clearfix'><div class='praise'><img src='image/hand_thumbsup.png'><span class='click_praise' articleId='" + articleId + "' ispraied='"+ ispraied  +"'>赞</span> <!--  被评论者的articleId  123 --></div><!-- 孟睿玲 --></div><div class='show-comment'><span class='comment-statement'><i class='comment-count'>" + commentCoutn +"</i>人觉得很赞</span>";
				detail_content.insertBefore(wrapper,detail_content.firstChild);
				detail_commented_container.innerHTML = "";
				for(var i = 0,len = comments.length; i < len; i++){
					detail_commented_container.appendChild(comments[i]);
				}
				abc.setup();
				setTimeout(function(){abc.previous();},200);
				window.scroll(0);
			}
		// // var detail_comment_box = $$('detail_comment_box');
			// var data = {
			// 	user_openid : $$('userId').getAttribute('openid'),
			// 	articleId : this.parentNode.children[1].getAttribute('articleId'),
			// 	commitContent: dataetail_comment_box.innerHTML
			// };
			// sendAjax(data,"POST",'detail');
		}
	}

	function sendComment(){
		return function(e){
			var data = {
				user_openid : $$('userId').getAttribute('openid'),
				articleId : this.parentNode.parentNode.children[0].getElementsByClassName('click_praise')[0].getAttribute('articleId'),
				commitContent: detail_comment_box.innerHTML
			};
			console.log(data);
			sendAjax(data,"POST",'detail');
		}
	}

	function afterSend(){
		return function(e){
			if(e.data.SECRET == "detail"){
				if(e.data.state == 1){
					var frag = document.createDocumentFragment();
					var p = document.createElement('p');
					var name = document.createElement('span');
					name.innerHTML = data_name;
					var port = document.createElement('span');
					port.innerHTML = "：";
					var content = document.createElement('span');
					content.innerHTML = $$('detail_comment-box').innerHTML;
					p.appendChild(name);
					p.appendChild(port);
					p.appendChild(content);
					frag.appendChild(p);
					console.log(frag);
					detail_commented_container.appendChild(frag);
					while(frag.firstChild){
						frag.remove(frag.firstChild);
					}
					$$('detail_comment-box').innerHTML = "";
				}
			}
		}
	}
	// page_detail.addEventListener('click',function(){
	// 	abc.setup();
	// 	setTimeout(function(){
	// 		abc.previous();
	// 	})
	// })
	// // detail_commit_submit.addEventListener('click',,false);
	worker.addEventListener('message',afterSend(),false);
}


function refreshagain(){
	var refresh_again = getClass('refresh_again')[0];
	var wrapper = getClass('wrapper')[2];
	function again(){
		console.log('13');
		return function(){
			for(var i = 0, len = wrapper.childNodes.length;  i < len; i ++){
				wrapper.removeChild(wrapper.firstChild);	
			}
			var data = {
				state : "refresh"
			};
			sendAjax(data,"POST",'refresh');
		}
	}
	function getReturnBack(){
		return function(e){
			if(e.data.SECRET == 'refresh'){
				for(var i = 0,len = e.data.length; i < len; i += 1){
					var contentMessager = document.createElement('div');
					contentMessager.innerHTML = "<div class='content-messager'><div class='message-section message-default message-wrapper'><div class='header-wrapper clearfix'><div class='header-name'><p class='name' > " + e.data[i].name + "<span> : </span></p> <p class='time'> + " +  e.data[i].time + "</p></div></div><div class='main-message'>" + e.data[i].content + "</div><div class='praise-comment clearfix'><div class='comment'><img src='image/comment_add.png'><span class='click-comment' articleId='" + e.data[i].articleId + "'>评论</span><!--  被评论者的articleId  123 --></div><div class='praise'><img src='image/hand_thumbsup.png'><span class='click_praise' articleId='" + e.data[i].articleId + "'>赞</span> <!--  被评论者的articleId  123 --></div></div><div class='show-comment'><span class='comment-statement'><i class='comment-count'> " + e.data[i].praisedPerson + "</i>人觉得很赞</span></div></div></div>";
					wrapper.appendChild(contentMessager);
				}
				var div = document.createElement('div');
				div.innerHTML = "<p>再来一组</p>";
				div.setAttribute('class','refresh_again');
				wrapper.appendChild(div);
			}
		}
	}
	worker.addEventListener('message',getReturnBack(),false);
	refresh_again.addEventListener('click',again(),false);
}


// whenReady(addWrapper);
// whenReady(firstLogin);
whenReady(clearAllsection);
whenReady(findPraise);
whenReady(addListenToContent);
whenReady(buttonClick);
// whenReady(changeSec);
whenReady(BackToMain);
whenReady(addListenToButton);
whenReady(CommitShow);
whenReady(publishSecret);
whenReady(detail_publish);
whenReady(refreshagain);
// whenReady(killSlider);


