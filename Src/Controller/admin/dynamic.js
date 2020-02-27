admin.controller('dynamic_add',function($scope,$http,$state,$location,Upload,$rootScope){

	$scope.uploadImg = function(){
		Upload.upload(
        { 
            url: '../Api/upload.php', 
            fields: {'type': 'dynamic'},   
            file: $scope.dynamic.imgurl 
        })
       
        .success(function (data, status, headers, config) { 	
            
            $scope.dynamic.imgurl = data;
        })
	}

	$scope.addCate=function(){

		$scope.iSimgurl = $scope.iSauthor = $scope.iSaddtime = $scope.iStitle = $scope.iScontent = false;
		if($scope.dynamic==undefined || checkRequired($scope.dynamic.imgurl)){
			$scope.iSimgurl = true;
		}
		if($scope.dynamic==undefined || checkRequired($scope.dynamic.author)){
			$scope.iSauthor = true;
		}
		// if($scope.dynamic==undefined || checkRequired($scope.dynamic.addtime)){
		// 	$scope.iSaddtime = true;
		// }
		if($scope.dynamic==undefined || checkRequired($scope.dynamic.title)){
			$scope.iStitle = true;
		}
		if($scope.dynamic==undefined || checkRequired($scope.dynamic.content)){
			$scope.iScontent = true;
		}
		if($scope.iSimgurl || $scope.iSauthor || $scope.iSaddtime || $scope.iStitle || $scope.iScontent){
			return;	//阻止程序
		}

		// moment.locale('zh-cn')
		// $scope.dynamic.addtime = moment( $scope.dynamic.addtime ).format('L')
		$scope.dynamic['act'] = 'add';	
		$http({
			method: 'post',
			url:'../Api/dynamic.php',
			data: $scope.dynamic,
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
				$location.path('dlist');
			}
		});
	}
})
admin.controller('dynamic_list',function($scope,$http,$state,$location,$rootScope){

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
		$http({
			method: 'get',
			url: '../Api/dynamic.php?act=list&pn='+pn+'&limit='+limit
		}).then(function(res){
			var data = res.data;
			$scope.dlist = data.list;
		});
	}

	$scope.getId = function(did){
		$scope.did = did;		
	}

	$scope.delCate = function(){
		$http({
			method: 'get',
			url: '../Api/dynamic.php?act=del&did='+$scope.did
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
		var val=$('.dynamic_search input').val()
		$http({
			method: 'get',
			url: '../Api/dynamic.php?act=search&title='+val
		}).then(function(res){
			var data = res.data;
			$scope.dlist = data.list;
			if(data.error==0){
				$('#dynamic_search')[0].reset()
			}
		});
	}

})

admin.controller('dynamic_edit',function($scope,$http,$location,$stateParams,Upload){
	$http({
		method: 'get',
		url: '../Api/dynamic.php?act=look&did='+$stateParams.did
	}).then(function(res){
		var data = res.data;
		$scope.dynamic = data.info;
	});

	$scope.uploadImg = function(){
		Upload.upload(
        { 
            url: '../Api/upload.php', 
            fields: {'type': 'dynamic'},   
            file: $scope.dynamic.imgurl 
        })
       
        .success(function (data, status, headers, config) { 	
            
            $scope.dynamic.imgurl = data;
        })
	}

	$scope.editCate=function(){

		$scope.iSimgurl = $scope.iSauthor = $scope.iSaddtime = $scope.iStitle = $scope.iScontent = false;
		if($scope.dynamic==undefined || checkRequired($scope.dynamic.imgurl)){
			$scope.iSimgurl = true;
		}
		if($scope.dynamic==undefined || checkRequired($scope.dynamic.author)){
			$scope.iSauthor = true;
		}
		if($scope.dynamic==undefined || checkRequired($scope.dynamic.addtime)){
			$scope.iSaddtime = true;
		}
		if($scope.dynamic==undefined || checkRequired($scope.dynamic.title)){
			$scope.iStitle = true;
		}
		if($scope.dynamic==undefined || checkRequired($scope.dynamic.content)){
			$scope.iScontent = true;
		}
		if($scope.iSimgurl || $scope.iSauthor || $scope.iSaddtime || $scope.iStitle || $scope.iScontent){
			return;	//阻止程序
		}

		// moment.locale('zh-cn')
		// $scope.dynamic.addtime = moment( $scope.dynamic.addtime ).format('L')
		$scope.dynamic['act'] = 'edit';	
		$scope.dynamic['did'] = $stateParams.did;
		$http({
			method: 'post',
			url:'../Api/dynamic.php',
			data: $scope.dynamic,
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
				$location.path('dlist');
			}
		});
	}
})