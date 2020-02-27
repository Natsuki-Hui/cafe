/*厨师相关的控制器操作*/

admin.controller('team_add',function($scope,$http,$state,Upload){
	// 图片上传	
	$scope.uploadImg=function(){
		Upload.upload(
			{ 
				url: '../Api/upload.php', 
				fields: {'type': 'cafe'},
				file: $scope.team.imgurl
			})
			// .progress(function (evt) { 
			// 	var progressPercentage = parseInt(100.0 * evt.loaded / evt.total); 
			// 	console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name); 
			// })
			.success(function (data, status, headers, config) { 
				$scope.team.imgurl=data;
			})
			// .error(function (data, status, headers, config) { 
			// 	console.log('error status: ' + status); 
			// })
	}
	// 添加数据
	$scope.addTeam = function(){
		$scope.team['act']='add';
		$http({
			method: 'post',
			url:'../Api/team.php',
			data: $scope.team,	// 传数据
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
			// 请求成功的回调
			// console.log(res.data);	// json对象
			var data=res.data;
			if(data.error==0){
				$state.go('team_list');
			}
		});
	}
});

//列表获取数据
admin.controller('team_list',function($scope,$http,$state,$rootScope){

	// 查询总数

	//分页控件配置
	//   currentPage:当前页
	//   totalItems :总记录数
	//   itemsPerPage:每页记录数
	//   perPageOptions :分页选项
	//   onChange:当页码变更后自动触发的方法
	$scope.paginationConf = {
		currentPage: 1,
		totalItems: $rootScope.chef_count,
		itemsPerPage: 10,
		perPageOptions: [20, 100, 40, 50],
		onChange: function(){
			$scope.reloadList();                     //加载分页插件属性的时候会自动加载这个方法
		}
	};

	$scope.reloadList=function(){
		var pn=$scope.paginationConf.currentPage;
		var limit=$scope.paginationConf.itemsPerPage;

		$http({
			method: 'get',
			url:'../Api/team.php?act=list&pn='+pn+'&limit='+limit
		}).then(function(res){
			// 请求成功的回调
			// console.log(res.data);	// json对象
			var data=res.data;
			$scope.tlist=data.list;
			
		});
	}
	
	
	//后台的分类页的分类列表的搜索
	$scope.search = function(){
	    var name=$('#b_search').val();
	    // console.log(name);
	    $http({
	        method: 'get',
	        url: '../Api/team.php?act=search&name='+name
	    }).then(function(res){
	        // console.log(res)
	        var data = res.data;
	        $scope.tlist = data.list;
	    });
	}

	// 点击删除列表事件
	$scope.getId=function(chid){
		$scope.chid=chid;
		console.log(chid);
	}
	$scope.delchef=function(){
		$http({
			method: 'get',
			url:'../Api/team.php?act=del&chid='+$scope.chid
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
	
	$scope.$on('repeatFinishCallback',function(){
//     console.log($('input[name="is_rec"]'))
      $('input[name="is_rec"]').bootstrapSwitch({    //初始化按钮
         onText:"Yes",
         offText:"No",
         onColor:"success",
         offColor:"info",
         size:"small",
         onSwitchChange:function(event,state){
            // console.log(event.target) // 这个就是你点中的input标签
            // if(state==true){
            //   console.log("开启");
            // }else{
            //   console.log("关闭");
            // }
            var e = event.target;
            var chid = $(e).attr('chid');
            var rec = state?1:0;
//             console.log(fid);
            // 更改状态（推荐）
            $http({
              method: 'get',
              url:'../Api/team.php?act=set_rec&chid='+chid+'&rec='+rec,
            }).then(function(res){
                // 不需要操作
            });
          }
      });

      // 循环出数据了
      // $('input[isRec=1]').prop('checked',true);
      $('input[isRec=1]').bootstrapSwitch('state', 1);  // 使用插件的方式
      
  });
})

admin.controller('team_edit',function($scope,$http,$location,$stateParams,Upload){
	// console.log($stateParams.chid);
	// 获取数据
	$http({
		method: 'get',
		url: '../Api/team.php?act=look&chid='+$stateParams.chid
	}).then(function(res){
		// 定义了一个变量info
		$scope.team = res.data.info;
	});

	$scope.uploadImg = function(){
		// 上传图片
		Upload.upload(
        { 
            url: '../Api/upload.php', 
            fields: {'type': 'team'},   // 这个作为uploads目录下面子目录
            file: $scope.team.imgurl 
        })
        .success(function (data, status, headers, config) { 	// 成功
            // 后台的回调
            $scope.team.imgurl = data;
        })
	}

	$scope.editTeam = function(){

		$scope.iSimgurl = $scope.iSname = $scope.iSjob = $scope.iSscore = $scope.iSdescs = false;
		if($scope.team==undefined || checkRequired($scope.team.imgurl)){
			$scope.iSimgurl = true;
		}
		if($scope.team==undefined || checkRequired($scope.team.name)){
			$scope.iSname = true;
		}
		if($scope.team==undefined || checkRequired($scope.team.job)){
			$scope.iSjob = true;
		}
		if($scope.team==undefined || checkRequired($scope.team.score)){
			$scope.iSscore = true;
		}
		if($scope.team==undefined || checkRequired($scope.team.descs)){
			$scope.iSdescs = true;
		}
		if($scope.iSimgurl || $scope.iSname || $scope.iSjob || $scope.iSscore || $scope.iSdescs){
			return;	//阻止程序
		}

		// 这种结构，类似jquery的ajax结构
		$scope.team['act'] = 'edit';	// 追加操作类型
		$scope.team['chid'] = $stateParams.chid;	// 修改记得再加上id
		$http({
			method: 'post',
			url:'../Api/team.php',
			data: $scope.team,	// 传json对象的数据
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
                return str.join("&");  //最后真正传递的数据格式：name=xxx&descs=yyy
			}
		}).then(function(res){   // 这个相当于ajax的success方法
			// 请求成功的回调
			//console.log(res.data);	// json对象
			var data = res.data;
			alert(data.msg);
			if(data.error==0){
				// 成功的，切换“跳转”到分类列表页
				// $state.go('team_list');
				$location.path('tlist');
			}
		});
	}
});