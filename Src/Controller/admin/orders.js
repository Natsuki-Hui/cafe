admin.controller('orders_list',function($scope,$http,$state,$location,$rootScope){

	// $http({
	// 	method: 'get',
	// 	url: '../Api/order.php?act=list'
	// }).then(function(res){
	// 	var data = res.data;
	// 	$scope.clist = data.list;
	// });

	$scope.paginationConf = {
        currentPage: 1,
        totalItems: $rootScope.orders_count,
        itemsPerPage: 3,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            $scope.reloadList(); 
        }
    };

    $scope.reloadList = function(){
    	var pn = $scope.paginationConf.currentPage;
    	var limit = $scope.paginationConf.itemsPerPage;
		$http({
			method: 'get',
			url: '../Api/order.php?act=list&pn='+pn+'&limit='+limit
		}).then(function(res){
			var data = res.data;
			$scope.clist = data.list;
		});
    }

    $scope.getId=function(oid){
    	$scope.oid=oid
    }

    $scope.delCate=function(){
    	$http({
			method: 'get',
			url: '../Api/order.php?act=del&oid='+$scope.oid
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
		var val=$('.orders_search input').val()
		$http({
			method: 'get',
			url: '../Api/order.php?act=search&xxx='+val
		}).then(function(res){
			var data = res.data;
			$scope.clist = data.list;
			if(data.error==0){
				$('#orders_search')[0].reset()
			}
		});
	}


});

admin.controller('orders_edit',function($scope,$http,$location,$stateParams,Upload){
	$http({
		method: 'get',
		url: '../Api/order.php?act=look&oid='+$stateParams.oid
	}).then(function(res){
		var data = res.data;
		$scope.orders = data.info;
	});

	//$scope 作用域对象
	$scope.editOrders = function(){
		
		$scope.iSname = $scope.iSphone = $scope.iSdate = $scope.iStime = $scope.iSpeople = false;
		if($scope.orders==undefined || checkRequired($scope.orders.name)){
			$scope.iSname = true;
		}
		if($scope.orders==undefined || checkRequired($scope.orders.phone)){
			$scope.iSphone = true;
		}
		if($scope.orders==undefined || checkRequired($scope.orders.date)){
			$scope.iSdate = true;
		}
		if($scope.orders==undefined || checkRequired($scope.orders.time)){
			$scope.iStime = true;
		}
		if($scope.orders==undefined || checkRequired($scope.orders.people)){
			$scope.iSpeople = true;
		}

		if($scope.iSname || $scope.iSphone || $scope.iSdate || $scope.iStime || $scope.iSpeople){
			return;	
		}
		

		// 这种结构，类似jquery的ajax结构
		$scope.orders['act'] = 'edit';	
		$scope.orders['oid'] = $stateParams.oid;	
		$http({
			method: 'post',
			url:'../Api/order.php',
			data: $scope.orders,	// 传json对象的数据
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
				// $state.go('orders_list');
				$location.path('clist');
			}
		});
	}
})