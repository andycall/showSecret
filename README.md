showSecret�����ĵ�
==========
AJAXƪ

����Ҳ�÷��ظ����ݸ�ʽ������
$a = array(
     "state" => 1//�ɹ�
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



�����ҳ���ұߵ��Ǹ����̵İ�ť�󷢱�����
�������ݸ�ʽ:
var data = {
				user_openid : openid, // �û���openid
				secret_conent : secretContent.innerHTML, //�������µ�����
				isNamed : isNamed.checked // �Ƿ�����
			};

�������ݣ�
$a = array(
	"name" => "DTC",//�û�����
	"state"  => 1 //�ɹ�
);
echo json_encode($a);

��ϸҳ�淢�Ϳ�

��������:
var data = {
	user_openid : $$('userId').getAttribute('openid'), // �û���openid
	articleId : this.parentNode.children[1].getAttribute('articleId'), //�����µ�id
	commitContent: detail_comment_box.innerHTML  // ��������
};


����һ��state���� 1�ɹ��� 0 ʧ��


��������ˢ��ҳ��
�����ûʲô�÷��͵ġ����ͷ���һ���źŰɡ���
var data = {
	'state' :��'refresh'
};

...��Ҫ�㷵��һ�����json����..

�����Ƕ�λ����
$content = array();


$content[0] = array(
	'name' => "ANDYCALL", //����������
	'time' => "2013-11-11", // ����ʱ��
	'content' => "asdlkajsdklasjdklasjd", //��������
	"articleId" => "123", // ����id
	"praisedPerson" => "123" // ��������
);

....


����������



����Ҫ��right ��left��ťɾ��
showSccret
