 /*菜品相关的控制器操作*/

// 后台添加菜品
admin.controller('food_add',function($scope,$http,$state,$location,Upload){

	// $scope.clist={111:'1',222:'2',333:'3'}
	$scope.clist={}
	
	$http({
		method: 'get',
		url: '../Api/cate.php?act=list'
	}).then(function(res){
		var data = res.data;
		var c = data.list;
		for(var k in c){
			var a=c[k]['cname']
			var b=c[k]['cid']
			$scope.clist[a]=b
		}
	});

	$scope.uploadImg = function(){
		// 上传图片
		Upload.upload(
        { 
            url: '../Api/upload.php', 
            fields: {'type': 'food'},   // 这个作为uploads目录下面子目录
            file: $scope.food.imgurl 
        })
        .success(function (data, status, headers, config) { 	// 成功
            // 后台的回调
            // 图片地址
            $scope.food.imgurl = data;
        })
	}

	$scope.addFood = function(){

		// console.log($scope.food)
		// console.log($scope.cate)

		$scope.iScid = $scope.iSimgurl = $scope.iSfname = $scope.iSprice1 = $scope.iSprice2 = $scope.iSscore = $scope.iSfdesc = false;
		if($scope.food==undefined || checkRequired($scope.food.cid)){
			$scope.iScid = true;
			return;
		}
		if($scope.food==undefined || checkRequired($scope.food.imgurl)){
			$scope.iSimgurl = true;
			return;
		}
		if($scope.food==undefined || checkRequired($scope.food.fname)){
			$scope.iSfname = true;
			return;
		}
		if($scope.food==undefined || checkRequired($scope.food.price1)){
			$scope.iSprice1 = true;
			return;
		}
		if($scope.food==undefined || checkRequired($scope.food.price2)){
			$scope.iSprice2 = true;
			return;
		}
		if($scope.food==undefined || checkRequired($scope.food.score)){
			$scope.iSscore = true;
			return;
		}
		if($scope.food==undefined || checkRequired($scope.food.fdesc)){
			$scope.iSfdesc = true;
			return;
		}

		// console.log($scope.food);
		// 这种结构，类似jquery的ajax结构
		$scope.food['act'] = 'add';	// 追加操作类型
		$http({
			method: 'post',
			url:'../Api/food.php',
			data: $scope.food,	// 传json对象的数据
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
				// $state.go('food_list');
				$location.path('flist');
			}
		});
	}

});

admin.controller('food_list',function($scope,$http,$rootScope){

	// $http({
	// 	method:'get',
	// 	url:'../Api/food.php?act=list'
	// }).then(function(res){
	// 	var data=res.data
	// 	$scope.flist=data.list
	// })

	$scope.paginationConf = {
        currentPage: 1,
        totalItems: $rootScope.food_count,
        itemsPerPage: 3,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            $scope.reloadList(); 
        }
    };

    $scope.reloadList = function(cid){
    	var pn = $scope.paginationConf.currentPage;
    	var limit = $scope.paginationConf.itemsPerPage;

    	cid=cid!=undefined?cid:''

		$http({
			method: 'get',
			url: '../Api/food.php?act=list&pn='+pn+'&limit='+limit+'&cid='+cid
		}).then(function(res){
			var data = res.data;
			$scope.flist = data.list;

			setTimeout(function(){
	            // 开关
				 switchInit()
			},100)
		});
    }

    function switchInit(){
    	$('[name="status"]').bootstrapSwitch({    //初始化按钮
				       onText:"Yes",
				       offText:"No",
				       onColor:"success",
				       offColor:"info",
				       size:"small",
				       onSwitchChange:function(event,state){
				          if(state==true){
				               console.log("开启");
				               console.log($(this).attr('fid'))
				               $http({
									method: 'post',
									url: '../Api/food.php',
									data:'act=switch&is_rec=1&fid='+$(this).attr('fid'),
									headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
								}).then(function(res){
									var data = res.data;
									// alert(data.msg);
									if(data.error==0){
										// $scope.reloadList();
									}
								});

				             }else{
				              console.log("关闭");
				              $http({
									method: 'post',
									url: '../Api/food.php',
									data:'act=switch&is_rec=0&fid='+$(this).attr('fid'),
									headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
								}).then(function(res){
									var data = res.data;
									// alert(data.msg);
									if(data.error==0){
										// $scope.reloadList();
									}
								});
				             }
				         }
				    });
    }

    // 列表删除按钮的点击事件函数
	$scope.getId = function(fid){
		$scope.fid = fid;		// 列表要删除的分类ID
	}

	// 这是弹窗的确定按钮，添加点击事件函数
	$scope.delCate = function(){
		$http({
			method: 'get',
			url: '../Api/food.php?act=del&fid='+$scope.fid
		}).then(function(res){
			var data = res.data;
			alert(data.msg);
			if(data.error==0){
				$scope.reloadList();
			}
		});
	}

	//搜索
	$scope.search=function(){
		var val=$('.food_search input').val()
		$http({
			method: 'get',
			url: '../Api/food.php?act=search&fname='+val
		}).then(function(res){
			var data = res.data;
			$scope.flist = data.list;
			if(data.error==0){
				$('#food_search')[0].reset()
				setTimeout(function(){
		            // 开关
					 switchInit()
				},100)
			}
		});
	}

	//分类筛选
	$http({
		method: 'get',
		url: '../Api/cate.php?act=list'
	}).then(function(res){
		var data = res.data;
		$scope.clist = data.list;
	});

	$(document).on('change','#foodcls',function(){
		var cid=$(this).val()
		// alert(cid)
		$scope.reloadList(cid);
	})
})

admin.controller('food_edit',function($scope,$http,$location,$stateParams,Upload){

	// $scope.clist={111:'1',222:'2',333:'3'}
	$scope.clist={}
	
	$http({
		method: 'get',
		url: '../Api/cate.php?act=list'
	}).then(function(res){
		var data = res.data;
		var c = data.list;
		for(var k in c){
			var a=c[k]['cname']
			var b=c[k]['cid']
			$scope.clist[a]=b
		}
	});

	$http({
		method: 'get',
		url: '../Api/food.php?act=look&fid='+$stateParams.fid
	}).then(function(res){
		var data = res.data;
		$scope.food = data.info;
		$scope.food.price1=parseInt($scope.food.price1)
		$scope.food.price2=parseInt($scope.food.price2)
	});

	$scope.uploadImg = function(){
		// 上传图片
		Upload.upload(
        { 
            url: '../Api/upload.php', 
            fields: {'type': 'food'},   // 这个作为uploads目录下面子目录
            file: $scope.food.imgurl 
        })
        .success(function (data, status, headers, config) { 	// 成功
            // 后台的回调
            // 图片地址
            $scope.food.imgurl = data;
        })
	}

	$scope.editFood = function(){

		// console.log($scope.food)
		// console.log($scope.cate)

		$scope.iScid = $scope.iSimgurl = $scope.iSfname = $scope.iSprice1 = $scope.iSprice2 = $scope.iSscore = $scope.iSfdesc = false;
		if($scope.food==undefined || checkRequired($scope.food.cid)){
			$scope.iScid = true;
			return;
		}
		if($scope.food==undefined || checkRequired($scope.food.imgurl)){
			$scope.iSimgurl = true;
			return;
		}
		if($scope.food==undefined || checkRequired($scope.food.fname)){
			$scope.iSfname = true;
			return;
		}
		if($scope.food==undefined || checkRequired($scope.food.price1)){
			$scope.iSprice1 = true;
			return;
		}
		if($scope.food==undefined || checkRequired($scope.food.price2)){
			$scope.iSprice2 = true;
			return;
		}
		if($scope.food==undefined || checkRequired($scope.food.score)){
			$scope.iSscore = true;
			return;
		}
		if($scope.food==undefined || checkRequired($scope.food.fdesc)){
			$scope.iSfdesc = true;
			return;
		}

		// console.log($scope.food);
		// 这种结构，类似jquery的ajax结构
		$scope.food['act'] = 'edit';	
		$scope.food['fid'] = $stateParams.fid;	
		$http({
			method: 'post',
			url:'../Api/food.php',
			data: $scope.food,	// 传json对象的数据
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
				// $state.go('food_list');
				$location.path('flist');
			}
		});
	}

});