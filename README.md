showSecret�����ĵ�
==========
AJAXƪ

����Ҳ�÷��ظ����ݸ�ʽ������
$a = array(
     "state" => 0
);
echo json_encode($a);

�״ε�½��
�û������ǳƺ���Ҫ����һ��openid
�������ݸ�ʽ��
var data = {
				user_name : user_names
}
�������ݸ�ʽ��
$a = array(
	"openid"  => $openid
);
echo json_encode($a);


��� �ҷ�������ܣ�
�û�����ظ�ʱ�ᵯ��һ��������һ����ť
�������ݸ�ʽ��
var data = {
				user_openid : openid, //�û���openid
				sec_id: articleId,   //�������µ�id
				content: commentValue // ��������
};
�����Ҫ����һ����ǰ�����û�����������Ҳ����openid ��Ӧ���Ǹ��ǳ�
�������ݸ�ʽ
$a = array(
	"name"  => $name
);
echo json_encode($a);



showSccret
