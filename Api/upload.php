<?php 
require_once('helpers.php');
// echo '<pre>';
// print_r($_FILES);

if(isset($_FILES['file'])){
	$upload = '../Assets/uploads/'.$_POST['type'].'/';
	if(!file_exists($upload)){
		mkdir($upload,0777,true);	// 0777：可读可写可操作
	}
	$file = upload_file('file',$upload);
	if($file){
		exit($upload.$file);	// 输出图片名称
	}
}

 ?>