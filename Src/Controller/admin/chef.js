admin.controller('chef_add',function($scope,$http,$state,$location,Upload){

	$scope.uploadImg=function(){
 		Upload.upload(
        { 
            url: '../Api/upload.php', 
            fields: {'type': 'chef'}, 
            file: $scope.chef.imgurl 
        })
        .success(function (data, status, headers, config) { 
        	$scope.chef.imgurl=data;
        })
 	}

 	$scope.addChef = function(){

 		$scope.iSimgurl = $scope.iScname = $scope.iSjob = $scope.iSscore = $scope.iSdescs = false;
		if($scope.chef==undefined || checkRequired($scope.chef.imgurl)){
			$scope.iSimgurl = true;
			return
		}
		if($scope.chef==undefined || checkRequired($scope.chef.name)){
			$scope.iSname = true;
			return
		}
		if($scope.chef==undefined || checkRequired($scope.chef.job)){
			$scope.iSjob = true;
			return
		}
		if($scope.chef==undefined || checkRequired($scope.chef.score)){
			$scope.iSscore = true;
			return
		}
		if($scope.chef==undefined || checkRequired($scope.chef.descs)){
			$scope.iSdescs = true;
			return
		}

		$scope.chef['act']='add'
		$http({
			method: 'post',
			url:'../Api/chef.php',
			data: $scope.chef,	// 传数据
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
				$location.path('chef_list')
			}
		});
	}



})

admin.controller('chef_list',function($scope,$http,$rootScope){
	// $http({
	// 	method:'get',
	// 	url:'../Api/chef.php?act=list'
	// }).then(function(res){
	// 	var data=res.data
	// 	$scope.clist=data.list
	// })
	$scope.paginationConf = {
        currentPage: 1,
        totalItems: $rootScope.chef_count,
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
			url: '../Api/chef.php?act=list&pn='+pn+'&limit='+limit
		}).then(function(res){
			var data = res.data;
			$scope.clist = data.list;

			setTimeout(function(){
	            switchInit()
			},100)
		});
    }

    function switchInit(){
    	// 开关
				 $('[name="status"]').bootstrapSwitch({    //初始化按钮
				       onText:"Yes",
				       offText:"No",
				       onColor:"success",
				       offColor:"info",
				       size:"small",
				       onSwitchChange:function(event,state){
				          if(state==true){
				               console.log("开启");
				               console.log($(this).attr('chid'))
				               $http({
									method: 'post',
									url: '../Api/chef.php',
									data:'act=switch&is_rec=1&chid='+$(this).attr('chid'),
									headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
								}).then(function(res){
									var data = res.data;
									if(data.error==0){
									}
								});

				             }else{
				              console.log("关闭");
				              $http({
									method: 'post',
									url: '../Api/chef.php',
									data:'act=switch&is_rec=0&chid='+$(this).attr('chid'),
									headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
								}).then(function(res){
									var data = res.data;
									if(data.error==0){
									}
								});
				             }
				         }
				    });
    }

	$scope.getId = function(chid){
		$scope.chid = chid;		
	}

	$scope.delCate = function(){
		$http({
			method: 'get',
			url: '../Api/chef.php?act=del&chid='+$scope.chid
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
		var val=$('.chef_search input').val()
		$http({
			method: 'get',
			url: '../Api/chef.php?act=search&name='+val
		}).then(function(res){
			var data = res.data;
			$scope.clist = data.list;
			if(data.error==0){
				$('#chef_search')[0].reset()
				setTimeout(function(){
		            switchInit()
				},100)
			}
		});
	}
})

admin.controller('chef_edit',function($scope,$http,$location,$stateParams,Upload){
	$http({
		method: 'get',
		url: '../Api/chef.php?act=look&chid='+$stateParams.chid
	}).then(function(res){
		var data = res.data;
		$scope.chef = data.info;
	});

	$scope.uploadImg=function(){
 		Upload.upload(
        { 
            url: '../Api/upload.php', 
            fields: {'type': 'chef'}, 
            file: $scope.chef.imgurl 
        })
        .success(function (data, status, headers, config) { 
        	$scope.chef.imgurl=data;
        })
 	}

 	$scope.editChef = function(){

 		$scope.iSimgurl = $scope.iScname = $scope.iSjob = $scope.iSscore = $scope.iSdescs = false;
		if($scope.chef==undefined || checkRequired($scope.chef.imgurl)){
			$scope.iSimgurl = true;
			return
		}
		if($scope.chef==undefined || checkRequired($scope.chef.name)){
			$scope.iSname = true;
			return
		}
		if($scope.chef==undefined || checkRequired($scope.chef.job)){
			$scope.iSjob = true;
			return
		}
		if($scope.chef==undefined || checkRequired($scope.chef.score)){
			$scope.iSscore = true;
			return
		}
		if($scope.chef==undefined || checkRequired($scope.chef.descs)){
			$scope.iSdescs = true;
			return
		}

		$scope.chef['act']='edit'
		$scope.chef['chid'] = $stateParams.chid;	
		$http({
			method: 'post',
			url:'../Api/chef.php',
			data: $scope.chef,	// 传数据
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
				$location.path('chef_list')
			}
		});
	}



})
