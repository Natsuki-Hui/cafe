<?php 
// 加载功能函数文件
require_once('helpers.php');

/*后台分类数据操作（添加、列表、修改、删除）*/
$conn = @mysqli_connect('localhost','wd1900113','pass123456') or exit('网络开小差了,请稍后再试');
mysqli_select_db($conn,'wd1900113');
mysqli_query($conn,'set names utf8');

$act = $_REQUEST['act'];	// $_REQUEST 可以接收$_POST或者$_GET的数据

// 后台添加分类
if($act=='add'){
	unset($_POST['act']);
	// $data['cname'] = $_POST['cname'];
	// $data['cdesc'] = $_POST['cdesc'];
	// $cid = insert('ca_cate',$data);
	
	$cname = $_POST['cname'];
	$check = getOne("select cid from ca_cate where cname='$cname'");
	if($check){
		echo json_encode(['error'=>1,'msg'=>'分类已存在']);
		exit();
	}

	//$cid 是主键的值
	$cid = insert('ca_cate',$_POST);	
	echo $cid>0 ? json_encode(['error'=>0,'msg'=>'添加成功']) : json_encode(['error'=>1,'msg'=>'网络出错']);
}
else if($act=='list'){
	// 获取分类列表数据
	if(isset($_GET['limit'])){
		$limit = $_GET['limit'];	// 每页显示多少条
		$pn = $_GET['pn'];	// 页码
		$start = ($pn-1)*$limit;
		$clist = getAll("select * from ca_cate where 1 limit $start,$limit");
	}else{
		$clist = getAll("select * from ca_cate where 1");
	}
	echo json_encode(['error'=>0,'msg'=>'success','list'=>$clist]);
}
else if($act=='del'){
	// 删除分类
	$res = delete('ca_cate','cid='.$_GET['cid']);
	echo $res>0 ? json_encode(['error'=>0,'msg'=>'删除成功']) : json_encode(['error'=>1,'msg'=>'网络出错']);
}
else if($act=='count'){
	// 查询总数(分类、菜品、厨师)
	$count1 = getCount('ca_cate');
	$count2 = getCount('ca_food');
	$count3 = getCount('ca_chef');
	$count4 = getCount('ca_dynamic');
	$count5 = getCount('ca_orders');
	
	$numArr = array($count1['c'],$count2['c'],$count3['c'],$count4['c'],$count5['c']);
	echo json_encode(['error'=>0,'msg'=>'success','numArr'=>$numArr]);
}
else if($act=='look'){
	$cid=$_GET['cid'];
	$info=getOne("select * from ca_cate where cid=$cid");
	echo json_encode(['error'=>0,'msg'=>'success','info'=>$info]);
}
else if($act=='edit'){
	unset($_POST['act']);
	
	$cname = $_POST['cname'];
	$cid = $_POST['cid'];
	$check = getOne("select cid from ca_cate where cname='$cname' and cid != $cid");
	if($check){
		echo json_encode(['error'=>1,'msg'=>'分类已存在']);
		exit();
	}

	$res = update('ca_cate',$_POST,"cid=$cid");	
	echo $res>0 ? json_encode(['error'=>0,'msg'=>'修改成功']) : json_encode(['error'=>1,'msg'=>'没有改动信息']);
}
else if($act=='search'){
	$cname=$_GET['cname'];
	// $info=getOne("select * from ca_cate where cname=$cname");
	// $sql = "… where cname like '%变量%'"  order by ....
	$res=mysqli_query($conn,"select * from ca_cate where cname like '%$cname%' order by cid");
	$result = array();
    while($row = mysqli_fetch_assoc($res))
    {
        $result[] = $row;
    }
	echo json_encode(['error'=>0,'msg'=>'success','list'=>$result]);
}

mysqli_close($conn);

 ?>