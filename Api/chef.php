<?php 
require_once('./helpers.php');
// 分类数据操作
$conn = @mysqli_connect('localhost','wd1900113','pass123456') or exit('网络开小差了,请稍后再试');
mysqli_select_db($conn,'wd1900113');
mysqli_query($conn,'set names utf8');

$act=$_REQUEST['act'];

if($act=='add'){
	unset($_POST['act']);
	$name=$_POST['name'];
	$check=getOne("select chid from ca_chef where name='$name'");
	if($check){
		echo json_encode(['error'=>1,'msg'=>'厨师已存在']);
		exit();
	}

	$cid=insert('ca_chef',$_POST);
	echo $cid>0?json_encode(['error'=>0,'msg'=>'添加成功']):json_encode(['error'=>0,'msg'=>'网络出错']);
}
else if ($act=='list') {
	if(isset($_GET['limit'])){
		$limit = $_GET['limit'];
		$pn = $_GET['pn'];
		$start = ($pn-1)*$limit;
		$clist=getAll("select * from ca_chef where 1 limit $start,$limit");
	}else{
		$clist=getAll("select * from ca_chef where 1");
	}
	
	echo json_encode(['error'=>0,'msg'=>'添加成功','list'=>$clist]);
}
else if($act=='del'){
	$res = delete('ca_chef','chid='.$_GET['chid']);
	echo $res>0 ? json_encode(['error'=>0,'msg'=>'删除成功']) : json_encode(['error'=>1,'msg'=>'网络出错']);
}
else if($act=='look'){
	$chid=$_GET['chid'];
	$info=getOne("select * from ca_chef where chid=$chid");
	echo json_encode(['error'=>0,'msg'=>'success','info'=>$info]);
}
else if($act=='edit'){
	unset($_POST['act']);

	$name=$_POST['name'];
	$chid = $_POST['chid'];
	$check = getOne("select chid from ca_chef where name='$name' and chid != $chid");
	if($check){
		echo json_encode(['error'=>1,'msg'=>'厨师已存在']);
		exit();
	}

	$res = update('ca_chef',$_POST,"chid=$chid");	
	echo $res>0 ? json_encode(['error'=>0,'msg'=>'修改成功']) : json_encode(['error'=>1,'msg'=>'没有改动信息']);
}
else if($act=='switch'){
	unset($_POST['act']);

	$is_rec = $_POST['is_rec'];
	$chid = $_POST['chid'];
	
	$res = update('ca_chef',$_POST,"chid=$chid");	
	echo $res>0 ? json_encode(['error'=>0,'msg'=>'修改成功']) : json_encode(['error'=>1,'msg'=>'没有改动信息']);
}
else if($act=='listLike'){

	$clist = getAll("select * from ca_chef where is_rec=1 limit 4");
	echo json_encode(['error'=>0,'msg'=>'success','list'=>$clist]);
}
else if($act=='search'){
	$name=$_GET['name'];
	$res=mysqli_query($conn,"select * from ca_chef where name like '%$name%' order by chid");
	$result = array();
    while($row = mysqli_fetch_assoc($res))
    {
        $result[] = $row;
    }
	echo json_encode(['error'=>0,'msg'=>'success','list'=>$result]);
}

mysqli_close($conn);
?>