showSecret开发文档
==========
AJAX篇

点赞也得返回个数据格式。。。
$a = array(
     "state" => 0
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



showSccret
