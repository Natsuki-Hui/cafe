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
	
	$fname = $_POST['fname'];
	$check = getOne("select fid from ca_food where fname='$fname'");
	if($check){
		echo json_encode(['error'=>1,'msg'=>'菜品已存在']);
		exit();
	}

	//$fid 是主键的值
	$fid = insert('ca_food',$_POST);	
	echo $fid>0 ? json_encode(['error'=>0,'msg'=>'添加成功']) : json_encode(['error'=>1,'msg'=>'网络出错']);
}
else if($act=='listAdmin'){
	
	$pn=$_GET['pn'];
	$limit=$_GET['limit'];
	$start=($pn-1)*$limit;

	$flist = getAll("select f.is_rec, f.fid, f.imgurl, f.fname, f.price1, f.price2, f.score, f.fdesc, c.cname from ca_food as f left join ca_cate as c on f.cid=c.cid where 1 limit $start,$limit");
	
	echo json_encode(['error'=>0,'msg'=>'success','list'=>$flist]);
}
else if($act=='list'){
	
	$pn=$_GET['pn'];
	$limit=$_GET['limit'];
	$start=($pn-1)*$limit;

	$w = 1;
	if(!empty($_GET['cid'])){
		$w = 'cid='.$_GET['cid'];  // 重新赋值
	}

	$flist = getAll("select * from ca_food where $w limit $start,$limit");
	echo json_encode(['error'=>0,'msg'=>'success','list'=>$flist]);
}
else if($act=='listLike'){

	$flist = getAll("select * from ca_food where is_rec=1 limit 15");
	echo json_encode(['error'=>0,'msg'=>'success','list'=>$flist]);
}
else if($act=='listLike2'){

	$flist = getAll("select * from ca_food where is_rec=1 limit 3");
	echo json_encode(['error'=>0,'msg'=>'success','list'=>$flist]);
}
else if($act=='del'){
	$res = delete('ca_food','fid='.$_GET['fid']);
	echo $res>0 ? json_encode(['error'=>0,'msg'=>'删除成功']) : json_encode(['error'=>1,'msg'=>'网络出错']);
}
else if($act=='look'){
	$fid = $_GET['fid'];
	$info = getOne("select * from ca_food where fid=$fid");
	echo json_encode(['error'=>0,'msg'=>'success','info'=>$info]);
}
else if($act=='edit'){
	unset($_POST['act']);

	$fname = $_POST['fname'];
	$fid = $_POST['fid'];
	
	$check = getOne("select fid from ca_food where fname='$fname' and fid != $fid");
	if($check){
		echo json_encode(['error'=>1,'msg'=>'菜品已存在']);
		exit();
	}

	$res = update('ca_food',$_POST,"fid=$fid");	
	echo $res>0 ? json_encode(['error'=>0,'msg'=>'修改成功']) : json_encode(['error'=>1,'msg'=>'没有改动信息']);
}
else if($act=='switch'){
	unset($_POST['act']);

	$is_rec = $_POST['is_rec'];
	$fid = $_POST['fid'];
	
	$res = update('ca_food',$_POST,"fid=$fid");	
	echo $res>0 ? json_encode(['error'=>0,'msg'=>'修改成功']) : json_encode(['error'=>1,'msg'=>'没有改动信息']);
}
else if($act=='img'){

	$fid=$_GET['fid'];
	$flist = getAll("select * from ca_foodimg where fid=$fid limit 4");
	echo json_encode(['error'=>0,'msg'=>'success','list'=>$flist]);
}
else if($act=='search'){
	$fname=$_GET['fname'];
	$res=mysqli_query($conn,"select * from ca_food where fname like '%$fname%' order by fid");
	$result = array();
    while($row = mysqli_fetch_assoc($res))
    {
        $result[] = $row;
    }
	echo json_encode(['error'=>0,'msg'=>'success','list'=>$result]);
}


mysqli_close($conn);

 ?>