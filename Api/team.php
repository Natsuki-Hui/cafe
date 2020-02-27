<?php 
require_once('helpers.php');
// 连接数据库操作
$conn = @mysqli_connect('localhost','wd1900113','pass123456');
if($conn==false){
	echo json_encode(['error'=>1,'msg'=>'网站出小差了,请稍后再试！']);
	exit();
}
mysqli_select_db($conn,'wd1900113');
mysqli_query($conn,'set names utf8');

$act=$_REQUEST['act'];
// unset($_POST['act']);

if($act=='add'){
    unset($_POST['act']);
    $name = $_POST['name'];
    $check=getOne("SELECT chid FROM ca_chef WHERE name='$name'");
    if($check){
        echo json_encode(['error'=>1,'msg'=>'厨师已存在']);
        exit();
    }
    //$chid是主要的键
    $chid=insert('ca_chef',$_POST);
    echo $chid>0? json_encode(['error'=>0,'msg'=>'添加成功']) : json_encode(['error'=>1,'msg'=>'添加出错']);
}
else if($act=='list'){
	if(isset($_GET['limit'])){
		$limit = $_GET['limit'];	// 每页显示多少条
		$pn = $_GET['pn'];	// 页码
		$start = ($pn-1)*$limit;
		$tlist = getAll("select * from ca_chef where 1 limit $start,$limit");
	}else{
		$tlist = getAll("select * from ca_chef where 1");
	}
	echo json_encode(['error'=>0,'msg'=>'success','list'=>$tlist]);
}
else if($act=='del'){
	// 删除分类
	$res = delete('ca_chef','chid='.$_GET['chid']);
	echo $res>0 ? json_encode(['error'=>0,'msg'=>'删除成功']) : json_encode(['error'=>1,'msg'=>'网络出错']);
}
else if($act=='look'){
	$chid = $_GET['chid'];
	$info = getOne("select * from ca_chef where chid=$chid");
	echo json_encode(['error'=>0,'msg'=>'success','info'=>$info]);
}
else if($act=='edit'){
	unset($_POST['act']);
	
	$name = $_POST['name'];
	$chid = $_POST['chid'];
	$check = getOne("select chid from ca_chef where name='$name' and chid!=$chid");
	if($check){
		echo json_encode(['error'=>1,'msg'=>'分类已存在']);
		exit();
	}

	$res = update('ca_chef',$_POST,"chid=$chid");
	echo $res>0?json_encode(['error'=>0,'msg'=>'修改成功']) : json_encode(['error'=>1,'msg'=>'没有改动信息']);
}
//后台的分类页的分类列表的搜索
else if ($act=='search') {
    $name = $_GET['name'];
    $tlist = getAll("select * from ca_chef where name like '%$name%'");
    
    echo json_encode(['error'=>0,'msg'=>'success','list'=>$tlist]);
}
else if($act == 'rec') {

  $tlist = getAll("select * from ca_chef where is_rec=1");
  echo json_encode(['error'=>0,'msg'=>'success','list'=>$tlist]);

}
else if($act == 'set_rec'){
  $chid = $_GET['chid'];
  $rec = $_GET['rec'];
  // 更改
  $data = array('is_rec'=>$rec);
  $res = update('ca_chef',$data,"chid=$chid");
  echo $res>0 ? json_encode(['error'=>0,'msg'=>'设置成功']) : json_encode(['error'=>1,'msg'=>'网络出错!']);
}
else if($act=='showrec'){
	// 获取推荐菜品列表数据

	$tlist = getAll("select * from ca_chef where is_rec=1");
	echo json_encode(['error'=>0,'msg'=>'success','list'=>$tlist]);
}
mysqli_close($conn);  //关闭

?>