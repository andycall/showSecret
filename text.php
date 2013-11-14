<?php
if(isset($_POST['openid'])){
	$openid = $_POST['openid'];
}
else{
	$openid = 1123;
}
$a = array();

$a[0] = array(
	"name"  => 123213,
	"state" => 1,
	"openid" => $openid,
	"centent" => "asjdklasjdkasjdklasjdklasjdljaskldjsa",
	"articleId" => "123",
	"praisedPerson" => "123"
	);

$a[1] = array(
	"name"  => 123213,
	"state" => 1,
	"openid" => $openid,
	"content" => "asjdklasjdkasjdklasjdklasjdljaskldjsa",
	"articleId" => "123",
	"praisedPerson" => "123"
	);
echo json_encode($a);


