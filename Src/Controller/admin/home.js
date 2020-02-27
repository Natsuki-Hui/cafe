// 后台首页控制器  $rootScope 根作用域，可以在所有控制器调用变量
admin.controller('home',function($scope,$http,$rootScope){
	
	// 查询分类总数
	$http({
		method: 'get',
		url: '../Api/cate.php?act=count',
	}).then(function(res){
		var data = res.data;
		// 其他的控制器，都可以调用下面的变量
		$rootScope.cate_count = data.numArr[0];
		$rootScope.food_count = data.numArr[1];
		$rootScope.chef_count = data.numArr[2];
		$rootScope.dynamic_count = data.numArr[3];
		$rootScope.orders_count = data.numArr[4];
	});

});