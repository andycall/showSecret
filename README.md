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




showSccret
