/*分类相关的控制器操作*/

// 后台添加分类
admin.controller('cate_add',function($scope,$http,$state,$location,Upload,$rootScope){
	// 这个变量的定义，可以省略
	// $scope.cate = {
	// 	cname: '',
	// 	cdesc: '',
	// 	imgurl: ''
	// };

	$scope.uploadImg = function(){
		// 上传图片
		Upload.upload(
        { 
            url: '../Api/upload.php', 
            fields: {'type': 'cate'},   // 这个作为uploads目录下面子目录
            file: $scope.cate.imgurl 
        })
        // .progress(function (evt) { 	// 进度
        //     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total); 
        //     console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name); 
        // })
        .success(function (data, status, headers, config) { 	// 成功
            // 后台的回调
            // console.log(data)	// 图片地址
            $scope.cate.imgurl = data;
        })
        // .error(function (data, status, headers, config) { 	// 错误
        //     console.log('error status: ' + status); 
        // })

	}

	//$scope 作用域对象
	$scope.addCate = function(){
		
		console.log($scope.cate)	// 刚好数据是json对象格式

		$scope.iSimgurl = $scope.iScname = $scope.iScdesc = false;
		if($scope.cate==undefined || checkRequired($scope.cate.imgurl)){
			$scope.iSimgurl = true;
		}
		if($scope.cate==undefined || checkRequired($scope.cate.cname)){
			$scope.iScname = true;
		}
		if($scope.cate==undefined || checkRequired($scope.cate.cdesc)){
			$scope.iScdesc = true;
		}
		if($scope.iSimgurl || $scope.iScname || $scope.iScdesc){
			return;	//阻止程序
		}
		// $http.get('../Api/cate.php',function(){	
		// });

		// 这种结构，类似jquery的ajax结构
		$scope.cate['act'] = 'add';	// 追加操作类型
		$http({
			method: 'post',
			url:'../Api/cate.php',
			data: $scope.cate,	// 传json对象的数据
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // 数据提交头部声明
			// 这个方法，可以提前处理传递的数据（把json对象转成字符串形式）
			transformRequest: function(obj){
				var str = [];
                for(var s in obj)
                {
                	// 数组追加值
                	// encodeURIComponent()  js函数，对内容进行编码，主要针对中文和符号
                    str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }
                return str.join("&");  //最后真正传递的数据格式：cname=xxx&cdesc=yyy
			}
		}).then(function(res){   // 这个相当于ajax的success方法
			// 请求成功的回调
			//console.log(res.data);	// json对象
			var data = res.data;
			alert(data.msg);
			if(data.error==0){
				// 成功的，切换“跳转”到分类列表页
				// $state.go('cate_list');
				$location.path('clist');
			}
		});
	}

});

// 后台分类列表
admin.controller('cate_list',function($scope,$http,$state,$location,$rootScope){


	// 查询总数（在首页控制器home.js）

	//分页控件配置
	//currentPage:当前页   
	//totalItems :总记录数  
	//itemsPerPage:每页记录数  
	//perPageOptions :分页选项  
	//onChange:当页码变更后自动触发的方法
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: $rootScope.cate_count,
        itemsPerPage: 3,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            $scope.reloadList();  //加载分页插件属性的时候会自动加载这个方法
        }
    };

    $scope.reloadList = function(){

    	var pn = $scope.paginationConf.currentPage;
    	var limit = $scope.paginationConf.itemsPerPage;
    	// 获取数据
		$http({
			method: 'get',
			url: '../Api/cate.php?act=list&pn='+pn+'&limit='+limit
		}).then(function(res){
			// console.log(res);
			var data = res.data;
			// console.log(data);
			$scope.clist = data.list;
		});
    }

	// 列表删除按钮的点击事件函数
	$scope.getId = function(cid){
		$scope.cid = cid;		// 列表要删除的分类ID
	}

	// 这是弹窗的确定按钮，添加点击事件函数
	$scope.delCate = function(){
		$http({
			method: 'get',
			url: '../Api/cate.php?act=del&cid='+$scope.cid
		}).then(function(res){
			var data = res.data;
			alert(data.msg);
			if(data.error==0){
				// 更新列表
				$scope.reloadList();
				// $location.path('home');
				// $location.path('clist');
			}
		});
	}

	//搜索
	$scope.search=function(){
		var val=$('.cate_search input').val()
		$http({
			method: 'get',
			url: '../Api/cate.php?act=search&cname='+val
		}).then(function(res){
			var data = res.data;
			$scope.clist = data.list;
			if(data.error==0){
				$('#cate_search')[0].reset()
			}
		});
	}
	

});

admin.controller('cate_edit',function($scope,$http,$location,$stateParams,Upload){
	$http({
		method: 'get',
		url: '../Api/cate.php?act=look&cid='+$stateParams.cid
	}).then(function(res){
		var data = res.data;
		$scope.cate = data.info;
	});


	$scope.uploadImg = function(){
		// 上传图片
		Upload.upload(
        { 
            url: '../Api/upload.php', 
            fields: {'type': 'cate'},   // 这个作为uploads目录下面子目录
            file: $scope.cate.imgurl 
        })
        // .progress(function (evt) { 	// 进度
        //     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total); 
        //     console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name); 
        // })
        .success(function (data, status, headers, config) { 	// 成功
            // 后台的回调
            // console.log(data)	// 图片地址
            $scope.cate.imgurl = data;
        })
        // .error(function (data, status, headers, config) { 	// 错误
        //     console.log('error status: ' + status); 
        // })

	}

	//$scope 作用域对象
	$scope.editCate = function(){
		
		$scope.iSimgurl = $scope.iScname = $scope.iScdesc = false;
		if($scope.cate==undefined || checkRequired($scope.cate.imgurl)){
			$scope.iSimgurl = true;
		}
		if($scope.cate==undefined || checkRequired($scope.cate.cname)){
			$scope.iScname = true;
		}
		if($scope.cate==undefined || checkRequired($scope.cate.cdesc)){
			$scope.iScdesc = true;
		}
		if($scope.iSimgurl || $scope.iScname || $scope.iScdesc){
			return;	//阻止程序
		}
		// $http.get('../Api/cate.php',function(){	
		// });

		// 这种结构，类似jquery的ajax结构
		$scope.cate['act'] = 'edit';	
		$scope.cate['cid'] = $stateParams.cid;	
		$http({
			method: 'post',
			url:'../Api/cate.php',
			data: $scope.cate,	// 传json对象的数据
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // 数据提交头部声明
			// 这个方法，可以提前处理传递的数据（把json对象转成字符串形式）
			transformRequest: function(obj){
				var str = [];
                for(var s in obj)
                {
                	// 数组追加值
                	// encodeURIComponent()  js函数，对内容进行编码，主要针对中文和符号
                    str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }
                return str.join("&");  //最后真正传递的数据格式：cname=xxx&cdesc=yyy
			}
		}).then(function(res){   // 这个相当于ajax的success方法
			// 请求成功的回调
			//console.log(res.data);	// json对象
			var data = res.data;
			alert(data.msg);
			if(data.error==0){
				// 成功的，切换“跳转”到分类列表页
				// $state.go('cate_list');
				$location.path('clist');
			}
		});
	}
})