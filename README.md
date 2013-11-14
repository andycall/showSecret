showSecret开发文档
==========
AJAX篇

点赞也得返回个数据格式。。。
$a = array(
     "state" => 1//成功
);
echo json_encode($a);

首次登陆：
用户输入昵称后需要返回一个openid
发送数据格式：
var data = {
				user_name : user_names
}
返回数据格式：
$a = array(
	"openid"  => $openid
);
echo json_encode($a);


点击 我发表的秘密：
用户点击回复时会弹出一个输入框和一个按钮
发送数据格式：
var data = {
				user_openid : openid, //用户的openid
				sec_id: articleId,   //评论文章的id
				content: commentValue // 评论内容
};
这个需要返回一个当前评论用户的姓名。。也就是openid 对应的那个昵称
返回数据格式
$a = array(
	"name"  => $name
);
echo json_encode($a);



点击首页最右边的那个绿绿的按钮后发表秘密
发送数据格式:
var data = {
				user_openid : openid, // 用户的openid
				secret_conent : secretContent.innerHTML, //发送文章的内容
				isNamed : isNamed.checked // 是否匿名
			};

返回内容：
$a = array(
	"name" => "DTC",//用户姓名
	"state"  => 1 //成功
);
echo json_encode($a);

详细页面发送框：

发送内容:
var data = {
	user_openid : $$('userId').getAttribute('openid'), // 用户的openid
	articleId : this.parentNode.children[1].getAttribute('articleId'), //该文章的id
	commitContent: detail_comment_box.innerHTML  // 评论内容
};


返回一个state就行 1成功， 0 失败


试试手气刷新页面
这好像没什么好发送的。。就发送一个信号吧。。
var data = {
	'state' :　'refresh'
};

...需要你返回一个大的json数组..

首先是二位数组
$content = array();


$content[0] = array(
	'name' => "ANDYCALL", //发布人姓名
	'time' => "2013-11-11", // 发布时间
	'content' => "asdlkajsdklasjdklasjd", //发布内容
	"articleId" => "123", // 文章id
	"praisedPerson" => "123" // 点赞人数
);

....


就这样。。



做完要把right 和left按钮删掉
showSccret
