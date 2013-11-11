/**
 * Created with JetBrains WebStorm.
 * User: andycall
 * Date: 8/11/13
 * Time: 9:20 PM
 * To change this template use File | Settings | File Templates.
 */
var worker = new Worker('js/ajax.js');
var isPraise = true;

function sendAjax(data,type,name){
	data.type = type;
	data.name = name;
	console.log(data);
	worker.postMessage(data);//发送json对象到work
	return isPraise;
}
