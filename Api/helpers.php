<?php

//检查是否有权限
function checkAction()
{
    $url_name = PATHINFO($_SERVER['PHP_SELF'],PATHINFO_FILENAME);
    $action_arr = explode(",", $_SESSION['admin_action']);
    if(!in_array($url_name,$action_arr))
    {
        show_msg("没有权限");
        exit;
    }
}



function isLogin()
{
    //判断是否登录
    if (empty($_SESSION['admin_name']) || empty($_SESSION['admin_id'])) {
        show_msg('请重新登录', 'login.php');
        exit();
    }
}



/**
 *跳转函数
 */
function show_msg($msg,$url=false)
{
    header("Content-Type:text/html;charset=utf-8");
    
    if($url)
    {
        $location_url = "location.href='$url';";
    }else{
        $location_url = "history.go(-1)";
    }
    $str = <<<DOF
<script>
alert('$msg');
$location_url;
</script>
DOF;
    echo $str;
}


/**
 *文件上传
 */

function upload_file($input_name,$path= "Assets/upload/")
{
    $file = $_FILES[$input_name];
    $error = $_FILES[$input_name]['error'];

    if($error > 0)
    {
        switch($error)
        {
            case 1:
                echo "超过php.ini 配置大小";
                break;
            case 2:
                echo "超过form表单的max_size隐藏域的大小";
                break;
            case 3:
                echo "网络中断";
                break;
            case 4:
                echo "没有上传文件";
                break;
            default:
                echo "其他情况";
        }
    }

    //组装文件名称
    $ext = PATHINFO($file['name'],PATHINFO_EXTENSION);
    $name = date("YmdHis").mt_rand(1,9999).".$ext";

    //将临时文件移动到指定目录
    //先判断是否是通过http post上传
    if(is_uploaded_file($file['tmp_name']))
    {
        if(move_uploaded_file($file['tmp_name'], $path . $name))
        {
            return $name;
        }else{
            return false;
        }
    }else{
        return false;
    }

}

//多图上传
function uploads_file($input_name, $path = "Assets/upload/")
{
    $file = $_FILES[$input_name];
    $error = $_FILES[$input_name]['error'];

    //循环判断错误
    foreach ($error as $key => $value) {
        if ($value > 0) {
            switch ($value) {
                case 1:
                    echo "超过php.ini 配置大小";
                    break;
                case 2:
                    echo "超过form表单的max_size隐藏域的大小";
                    break;
                case 3:
                    echo "网络中断";
                    break;
                case 4:
                    echo "没有上传文件";
                    break;
                default:
                    echo "其他情况";
            }
        }
    }

    //用来装结果的
    $pro_pics = "";

    //循环上传文件
    foreach($file['tmp_name'] as $key=>$item)
    {
        //组装文件名称
        $ext = PATHINFO($file['name'][$key], PATHINFO_EXTENSION);
        $name = date("YmdHis") . mt_rand(1, 9999) . ".$ext";

        //将临时文件移动到指定目录
        //先判断是否是通过http post上传
        if (is_uploaded_file($item)) {
            if (move_uploaded_file($item, $path . $name)) {
                $pro_pics .= "upload/".$name.",";  //upload/232312.jpg
            }
        }
    }

    return trim($pro_pics,",");
}



/**
 *统计表数据总数
 */
function getCount($table, $where = 1)
{
    global $conn;
    $sql = "SELECT COUNT(*) AS c FROM $table WHERE $where";
    $res = mysqli_query($conn, $sql);
    return mysqli_fetch_assoc($res);
}

/**
 *获取多条
 */
function getAll($sql)
{
    global $conn;
    $res = mysqli_query($conn,$sql);
    $result = array();
    while($row = mysqli_fetch_assoc($res))
    {
        $result[] = $row;
    }

    return $result;
}
/**
 *获取单条
 */
function getOne($sql)
{
    global $conn;
    $res = mysqli_query($conn,$sql);
    return mysqli_fetch_assoc($res);
}



//插入数据方法
function insert($table,$data)
{
    //INSERT INTO pre_person(`person_name`,`person_sex`)VALUES('23456789');
    //array_keys()    //将数组中的索引提取出来并重新放到一个新的数组里面
    global $conn;
    $k = "`".implode("`,`",array_keys($data))."`";
    $v = "'".implode("','",$data)."'";
    $sql = "INSERT INTO $table($k)VALUES($v)";
    mysqli_query($conn,$sql);
    return mysqli_insert_id($conn);
}

//更新
function update($table,$data,$where='1')
{
    global $conn;
    $str = '';
    foreach($data as $key=>$item)
    {
        $str .= "`$key` = '$item',";
    }
    
    $str = trim($str,",");
    $sql = "UPDATE $table SET $str WHERE $where";
    mysqli_query($conn,$sql);
    return mysqli_affected_rows($conn);  //返回影响行数 修改一行就返回1
}


//删除
function delete($table,$where = 1)
{
    global $conn;
    $sql = "DELETE FROM $table WHERE $where";
    mysqli_query($conn,$sql);
    return mysqli_affected_rows($conn);
}


//得到当前网址
function get_url()
{
    $str = $_SERVER['PHP_SELF'] . '?'; //http://localhost/index.php?
    if ($_GET) {
        foreach ($_GET as $k => $v) {  //$_GET['page']
            if ($k != 'page') {
                $str .= $k . '=' . $v . '&';
            }
        }
    }
    return $str;
}



//分页函数
/**
 *@pargam $current	当前页
 *@pargam $count	记录总数
 *@pargam $limit	每页显示多少条
 *@pargam $size		中间显示多少条
 *@pargam $class	样式
 */
function page($current, $count, $limit, $size, $class = 'sabrosus')
{
    $str = '';
    if ($count > $limit) {
        $pages = ceil($count / $limit);//算出总页数
        $url = get_url();//获取当前页面的URL地址（包含参数）

        $str .= '<div class="' . $class . '">';
		//开始
        if ($current == 1) {
            $str .= '<span class="disabled">首&nbsp;&nbsp;页</span>';
            $str .= '<span class="disabled">  &lt;上一页 </span>';
        } else {
            $str .= '<a href="' . $url . 'page=1">首&nbsp;&nbsp;页 </a>';
            $str .= '<a href="' . $url . 'page=' . ($current - 1) . '">  &lt;上一页 </a>';
        }
		//中间
		//判断得出star与end

        if ($current <= floor($size / 2)) { //情况1
            $star = 1;
            $end = $pages > $size ? $size : $pages; //看看他两谁小，取谁的
        } else if ($current >= $pages - floor($size / 2)) { // 情况2

            $star = $pages - $size + 1 <= 0 ? 1 : $pages - $size + 1; //避免出现负数

            $end = $pages;
        } else { //情况3

            $d = floor($size / 2);
            $star = $current - $d;
            $end = $current + $d;
        }

        for ($i = $star; $i <= $end; $i++) {
            if ($i == $current) {
                $str .= '<span class="current">' . $i . '</span>';
            } else {
                $str .= '<a href="' . $url . 'page=' . $i . '">' . $i . '</a>';
            }
        }
		//最后
        if ($pages == $current) {
            $str .= '<span class="disabled">  下一页&gt; </span>';
            $str .= '<span class="disabled">尾&nbsp;&nbsp;页  </span>';
        } else {
            $str .= '<a href="' . $url . 'page=' . ($current + 1) . '">下一页&gt; </a>';
            $str .= '<a href="' . $url . 'page=' . $pages . '">尾&nbsp;&nbsp;页 </a>';
        }
        $str .= '</div>';
    }

    return $str;
}



?>