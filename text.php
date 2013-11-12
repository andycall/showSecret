<?php
if(isset($_POST['openid'])){
	$openid = $_POST['openid'];
}
else{
	$openid = 1123;
}
$a = array(
	"name"  => 123213,
	"state" => 1,
	"openid" => $openid
);

echo json_encode($a);


