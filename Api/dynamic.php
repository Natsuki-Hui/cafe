<?php 
// 加载功能函数文件
require_once('helpers.php');

/*后台菜品数据操作（添加、列表、修改、删除）*/
$conn = @mysqli_connect('localhost','wd1900113','pass123456') or exit('网络开小差了,请稍后再试');
mysqli_select_db($conn,'wd1900113');
mysqli_query($conn,'set names utf8');

$act = $_REQUEST['act'];	// $_REQUEST 可以接收$_POST或者$_GET的数据

if($act=='add'){
	unset($_POST['act']);
	$t=time();
	$_POST['addtime']=$t;

	$did = insert('ca_dynamic',$_POST);	
	echo $did>0 ? json_encode(['error'=>0,'msg'=>'添加成功']) : json_encode(['error'=>1,'msg'=>'网络出错']);
}
else if($act=='list'){
	if(isset($_GET['limit'])){
		$pn=$_GET['pn'];
		$limit=$_GET['limit'];
		$start=($pn-1)*$limit;
		$dlist = getAll("select * from ca_dynamic where 1 limit $start,$limit");
	}else{
		$dlist = getAll("select * from ca_dynamic where 1");
	}

	echo json_encode(['error'=>0,'msg'=>'success','list'=>$dlist]);
}
else if($act=='look'){
	$did = $_GET['did'];
	$info = getOne("select * from ca_dynamic where did=$did");
	echo json_encode(['error'=>0,'msg'=>'success','info'=>$info]);
}
else if($act=='del'){
	$res = delete('ca_dynamic','did='.$_GET['did']);
	echo $res>0 ? json_encode(['error'=>0,'msg'=>'删除成功']) : json_encode(['error'=>1,'msg'=>'网络出错']);
}
else if($act=='edit'){
	unset($_POST['act']);
	$did = $_POST['did'];

	$res = update('ca_dynamic',$_POST,"did=$did");	
	echo $res>0 ? json_encode(['error'=>0,'msg'=>'修改成功']) : json_encode(['error'=>1,'msg'=>'没有改动信息']);
}
else if($act=='search'){
	$title=$_GET['title'];
	$res=mysqli_query($conn,"select * from ca_dynamic where title like '%$title%' order by did");
	$result = array();
    while($row = mysqli_fetch_assoc($res))
    {
        $result[] = $row;
    }
	echo json_encode(['error'=>0,'msg'=>'success','list'=>$result]);
}
else if($act=='comment_num'){
	$did=$_GET['did'];
	$info = getOne("select comment_num from ca_dynamic where did=$did");
	$num=$info['comment_num'];
	$num=$num+1;
	// echo json_encode(['error'=>0,'msg'=>'success','info'=>$num]);
	mysqli_query($conn,"UPDATE `ca_dynamic` SET `comment_num`=$num WHERE did=$did");
}
else if($act=='comment_num_jian'){
	$did=$_GET['did'];
	$info = getOne("select comment_num from ca_dynamic where did=$did");
	$num=$info['comment_num'];
	$num=$num-1;
	// echo json_encode(['error'=>0,'msg'=>'success','info'=>$num]);
	mysqli_query($conn,"UPDATE `ca_dynamic` SET `comment_num`=$num WHERE did=$did");
}

mysqli_close($conn);

 ?>