admin.controller('comment_list',function($scope,$http,$state,$location,$rootScope,$stateParams){

	$http({
		method: 'get',
		url: '../Api/comment.php?act=list&did='+$stateParams.did
	}).then(function(res){
		var data = res.data;
		$rootScope.comment_count = parseInt(data.count)

	});

	$scope.paginationConf = {
        currentPage: 1,
        totalItems: $rootScope.comment_count,
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
			url: '../Api/comment.php?act=list&pn='+pn+'&limit='+limit+'&did='+$stateParams.did
		}).then(function(res){
			var data = res.data;
			$scope.clist = data.list;
		});
    }

	$scope.getId = function(coid){
		$scope.coid = coid;		
	}

	$scope.delCate = function(){
		$http({
			method: 'get',
			url: '../Api/comment.php?act=del&coid='+$scope.coid
		}).then(function(res){
			var data = res.data;
			alert(data.msg);
			if(data.error==0){
				$scope.reloadList();
				// $location.path('home');
				// $location.path('clist');
				$http({
					method: 'get',
					url: '../Api/dynamic.php?act=comment_num_jian&did='+$stateParams.did
				}).then(function(res){
					
				});
			}
		});
	}

})