cafe.controller('news',function($scope,$http,$rootScope){

	$scope.paginationConf = {
        currentPage: 1,
        totalItems: $rootScope.dynamic_count,
        itemsPerPage: 3,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function(){
            $scope.reloadList();  
        }
    };

    $scope.reloadList = function(){
    	var pn = $scope.paginationConf.currentPage;
    	var limit = $scope.paginationConf.itemsPerPage;
    	// 获取数据
		$http({
			method: 'get',
			url: '../Api/dynamic.php?act=list&pn='+pn+'&limit='+limit
		}).then(function(res){
			var data = res.data;
			$scope.dlist = data.list;
		});
    }
})

cafe.controller('dynamic_detail',function($scope,$http,$stateParams){

	$http({
		method: 'get',
		url: '../Api/dynamic.php?act=look&did='+$stateParams.did
	}).then(function(res){
		var data = res.data;
		$scope.info = data.info;
	});

	$http({
		method: 'get',
		url: '../Api/comment.php?act=list&did='+$stateParams.did
	}).then(function(res){
		var data = res.data;
		$scope.clist = data.list;
		$scope.count = parseInt(data.count)
	});

	$scope.addCom = function(){

		if($scope.com==undefined || checkRequired($scope.com.nickname)){
			alert('请输入您的昵称');
			return;
		}
		if($scope.com==undefined || !checkEmail($scope.com.email)){
			alert('请正确输入您的邮箱');
			return;
		}
		if($scope.com==undefined || checkRequired($scope.com.content)){
			alert('请输入您的评论内容');
			return;
		}

		$scope.com['act']='add';
		$scope.com['did']=$stateParams.did;
		
		$http({
			method: 'post',
			url:'../Api/comment.php',
			data: $scope.com,	
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
			transformRequest: function(obj){
				var str = [];
                for(var s in obj)
                {
					str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }
                return str.join("&");
			}
		}).then(function(res){

			var data = res.data;
			alert(data.msg);

			if(data.error==0){
				$('#comment_form')[0].reset()
				$scope.count=$scope.count+1
				var str=`
					<div class="single_comment d-flex" ng-repeat="x in clist">
									<div class="author_thumb">
										<img src="../Assets/home/images/comment_1.jpg" alt="">
									</div>
									<div class="author_text">
										<h5>`+$scope.com['nickname']+`</h5>
										<p>`+$scope.com['content']+`</p>
									</div>
								</div>
				`
				$('.post_comment').append(str)
				// $state.go('list');
				// location.reload()
				$http({
					method: 'get',
					url: '../Api/dynamic.php?act=comment_num&did='+$stateParams.did
				}).then(function(res){
					// console.log(res.data.info)
				});
			}
		});
	}
})