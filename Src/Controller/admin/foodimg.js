admin.controller('foodimg_list',function($scope,$http,$rootScope,$stateParams,$location,Upload){
	// $rootScope.foodid=$stateParams.fid

	$http({
		method: 'get',
		url: '../Api/foodimg.php?act=list&fid='+$stateParams.fid
	}).then(function(res){
		var data = res.data;
		$scope.flist = data.list;
	});






	$scope.uploadImg=function(){
 		Upload.upload(
        { 
            url: '../Api/upload.php', 
            fields: {'type': 'foodimg'}, 
            file: $scope.foodimg.imgurl 
        })
        .success(function (data, status, headers, config) { 
        	$scope.foodimg.imgurl=data;
        })
 	}

 	$scope.addImg = function(){

 		$scope.iSimgurl = false;
		if($scope.foodimg==undefined || checkRequired($scope.foodimg.imgurl)){
			$scope.iSimgurl = true;
			return
		}

		$scope.foodimg['act']='add'
		$scope.foodimg['fid']=$stateParams.fid
		$http({
			method: 'post',
			url:'../Api/foodimg.php',
			data: $scope.foodimg,	// 传数据
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // 数据提交头部声明
			// 这个方法，可以提前处理传递的数据
			transformRequest: function(obj){
				var str = [];
                for(var s in obj)
                {
                    str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                }
                return str.join("&");
			}
		}).then(function(res){
			var data=res.data
			alert(data.msg)
			if(data.error==0){
				// $location.path('foodimg_list')
				$http({
					method: 'get',
					url: '../Api/foodimg.php?act=list&fid='+$stateParams.fid
				}).then(function(res){
					var data = res.data;
					$scope.flist = data.list;
				});
			}
		});
	}





	// 列表删除按钮的点击事件函数
	$scope.getId = function(fiid){
		$scope.fiid = fiid;		// 列表要删除的分类ID
	}

	// 这是弹窗的确定按钮，添加点击事件函数
	$scope.delCate = function(){
		$http({
			method: 'get',
			url: '../Api/foodimg.php?act=del&fiid='+$scope.fiid
		}).then(function(res){
			var data = res.data;
			alert(data.msg);
			if(data.error==0){
				// 更新列表
				// $scope.reloadList();
				// $location.path('home');
				// $location.path('clist');
				$http({
					method: 'get',
					url: '../Api/foodimg.php?act=list&fid='+$stateParams.fid
				}).then(function(res){
					var data = res.data;
					$scope.flist = data.list;
				});
			}
		});
	}

})