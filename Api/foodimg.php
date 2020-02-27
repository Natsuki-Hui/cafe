<?php 
require_once('./helpers.php');
// 分类数据操作
$conn = @mysqli_connect('localhost','wd1900113','pass123456') or exit('网络开小差了,请稍后再试');
mysqli_select_db($conn,'wd1900113');
mysqli_query($conn,'set names utf8');

$act=$_REQUEST['act'];

if($act=='add'){
	unset($_POST['act']);

	$fiid=insert('ca_foodimg',$_POST);
	echo $fiid>0?json_encode(['error'=>0,'msg'=>'添加成功']):json_encode(['error'=>1,'msg'=>'网络出错']);
}
else if ($act=='list') {
	$fid=$_GET['fid'];
	if(isset($_GET['limit'])){
		$limit = $_GET['limit'];
		$pn = $_GET['pn'];
		$start = ($pn-1)*$limit;
		$flist=getAll("select * from ca_foodimg where fid=$fid limit $start,$limit");
	}else{
		$flist=getAll("select * from ca_foodimg where fid=$fid");
	}
	
	echo json_encode(['error'=>0,'msg'=>'添加成功','list'=>$flist]);
}
else if($act=='del'){
	$res = delete('ca_foodimg','fiid='.$_GET['fiid']);
	echo $res>0 ? json_encode(['error'=>0,'msg'=>'删除成功']) : json_encode(['error'=>1,'msg'=>'网络出错']);
}

mysqli_close($conn);
?>