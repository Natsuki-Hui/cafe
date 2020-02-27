<?php 
require_once('helpers.php');

$conn = @mysqli_connect('localhost','wd1900113','pass123456') or exit('网络开小差了,请稍后再试');
mysqli_select_db($conn,'wd1900113');
mysqli_query($conn,'set names utf8');

$act = $_REQUEST['act'];

if($act=='add'){
	unset($_POST['act']);

	$coid = insert('ca_comment',$_POST);	
	echo $coid>0 ? json_encode(['error'=>0,'msg'=>'添加成功']) : json_encode(['error'=>1,'msg'=>'网络出错']);
}
else if($act=='list'){
	$did=$_GET['did'];
	if(isset($_GET['limit'])){
		$limit = $_GET['limit'];	
		$pn = $_GET['pn'];	
		$start = ($pn-1)*$limit;
		$clist = getAll("select * from ca_comment where did=$did order by coid limit $start,$limit");
	}else{
		$clist = getAll("select * from ca_comment where did=$did order by coid");
	}
	$count=getCount('ca_comment','did='.$did);
	echo json_encode(['error'=>0,'msg'=>'success','list'=>$clist,'count'=>$count['c']]);
}
else if($act=='del'){
	$res = delete('ca_comment','coid='.$_GET['coid']);
	echo $res>0 ? json_encode(['error'=>0,'msg'=>'删除成功']) : json_encode(['error'=>1,'msg'=>'网络出错']);
}


mysqli_close($conn);

 ?>