showSecret
==========
1。赞：
点赞json结构
var data = {
		user_openid : openid,
		sec_id: articleId
	};
最新思路：赞的同时在数据库comment表里写一条数据，
comment表里的字段加个type，0代表一般评论，1代表赞
所以对应的，所有取信息的sql要加上限制。
<1>表结构的修改，comment表加入新字段com_type
<2>查找方法的修改，加入限制条件
<3>在页面输出函数返回的数组里
加了一个可以标识当前用户是否赞过的变量
0代表一般评论，1代表赞。
<4>赞的时候应该在那个秘密里的字段数加一



2。ajax：
ajax发送地址在ajax.js里
ajax 返回值中0 是 失败，1是成功。

ajax已经测试完毕。


showSccret
