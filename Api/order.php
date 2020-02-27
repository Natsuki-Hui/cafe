<?php 
// 加载功能函数文件
require_once('helpers.php');

/*后台菜品数据操作（添加、列表、修改、删除）*/
$conn = @mysqli_connect('localhost','wd1900113','pass123456') or exit('网络开小差了,请稍后再试');
mysqli_select_db($conn,'wd1900113');
mysqli_query($conn,'set names utf8');

$act = $_REQUEST['act'];	// $_REQUEST 可以接收$_POST或者$_GET的数据

// 后台添加菜品
if($act=='add'){
	unset($_POST['act']);
	
	$phone = $_POST['phone'];// 手机号
	$date = $_POST['date'];// 日期
	$check = getOne("select oid from ca_orders where phone='$phone' and date='$date'");
	if($check){
		echo json_encode(['error'=>1,'msg'=>'您当天已预订，请更改其他时间']);
		exit();
	}

	//$oid 是主键的值
	$oid = insert('ca_orders',$_POST);	
	echo $oid>0 ? json_encode(['error'=>0,'msg'=>'添加成功']) : json_encode(['error'=>1,'msg'=>'网络出错']);
}
else if($act=='list'){
	$limit = $_GET['limit'];	
	$pn = $_GET['pn'];	
	$start = ($pn-1)*$limit;
	$clist = getAll("select * from ca_orders where 1 limit $start,$limit");
	echo json_encode(['error'=>0,'msg'=>'success','list'=>$clist]);
}
else if($act=='del'){
	$oid = $_GET['oid'];	
	$res=delete("ca_orders","oid=$oid");
	echo $res>0 ? json_encode(['error'=>0,'msg'=>'删除成功']) : json_encode(['error'=>1,'msg'=>'网络出错']);
}
else if($act=='look'){
	$oid=$_GET['oid'];
	$info=getOne("select * from ca_orders where oid=$oid");
	echo json_encode(['error'=>0,'msg'=>'success','info'=>$info]);
}
else if($act=='edit'){
	unset($_POST['act']);
	
	$phone = $_POST['phone'];// 手机号
	$date = $_POST['date'];// 日期
	$oid = $_POST['oid'];
	$check = getOne("select oid from ca_orders where phone='$phone' and date='$date' and oid != $oid");
	if($check){
		echo json_encode(['error'=>1,'msg'=>'您当天已预订，请更改其他时间']);
		exit();
	}

	//$oid 是主键的值
	$res = update('ca_orders',$_POST,"oid=$oid");		
	echo $res>0 ? json_encode(['error'=>0,'msg'=>'修改成功']) : json_encode(['error'=>1,'msg'=>'没有改动信息']);
}
else if($act=='search'){
	$xxx=$_GET['xxx'];
	$res=mysqli_query($conn,"select * from ca_orders where name like '%$xxx%' || phone like '%$xxx%' order by oid");
	$result = array();
    while($row = mysqli_fetch_assoc($res))
    {
        $result[] = $row;
    }
	echo json_encode(['error'=>0,'msg'=>'success','list'=>$result]);
}



mysqli_close($conn);

 ?>