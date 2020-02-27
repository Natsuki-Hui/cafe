/*厨师相关的控制器操作*/


//列表获取数据
admin.controller('orders_list',function($scope,$http,$rootScope){

	// 查询总数

	//分页控件配置
	//   currentPage:当前页
	//   totalItems :总记录数
	//   itemsPerPage:每页记录数
	//   perPageOptions :分页选项
	//   onChange:当页码变更后自动触发的方法
	$scope.paginationConf = {
		currentPage: 1,
		totalItems: $rootScope.order_count,
		itemsPerPage: 10,
		perPageOptions: [20, 30, 100, 50],
		onChange: function(){
			$scope.reloadList();                     //加载分页插件属性的时候会自动加载这个方法
		}
	};

	$scope.reloadList=function(){
		var pn=$scope.paginationConf.currentPage;
		var limit=$scope.paginationConf.itemsPerPage;

		$http({
			method: 'get',
			url:'../Api/order.php?act=list&pn='+pn+'&limit='+limit
		}).then(function(res){
			// 请求成功的回调
			// console.log(res.data);	// json对象
			var data=res.data;
			$scope.olist=data.list;
			
		});
	}
	
	//后台的分类页的分类列表的搜索
	// var cname = $scope.cname['cname'] = $stateParams.cname;
	// console.log(cname)
	$scope.search = function(){
	    var namephone=$('#b_search').val();
	    $http({
	        method: 'get',
	        url: '../Api/order.php?act=search&namephone='+namephone
	    }).then(function(res){
	        // console.log(res)
	        var data = res.data;
	        $scope.olist = data.list;
	    });
	}

	// 点击删除列表事件
	$scope.getId=function(oid){
		$scope.oid=oid;
		console.log(oid);
	}
	$scope.delorder=function(){
		$http({
			method: 'get',
			url:'../Api/order.php?act=del&oid='+$scope.oid
		}).then(function(res){
			// 请求成功的回调
			// console.log(res.data);	// json对象
			var data=res.data;
			alert(data.msg);
			if(data.error==0){
				$scope.reloadList();

			}
			
		});
	}
})
