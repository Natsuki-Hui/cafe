/*菜品列表控制器*/
cafe.controller('food',function($scope,$http,$rootScope,$stateParams){

	// 这个代码，是用于完善，能正常执行页面的JS交互效果，譬如：轮播图
	$.getScript('../Assets/home/js/main.js',function(){
		// console.log('success')
	})

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
    	// 获取数据
    	if($stateParams.cid==0){
    		// var cid = $scope.cid!=undefined?$scope.cid:'';
    		var cateId=cid!=undefined?cid:''
    	}else{
    		var cateId=$stateParams.cid
    	}
    	
		$http({
			method: 'get',
			url: '../Api/food.php?act=list&pn='+pn+'&limit='+limit+'&cid='+cateId
		}).then(function(res){
			var data = res.data;
			$scope.flist = data.list;
		});

		setTimeout(function(){
			$('.rating').each(function(){
				var score=$(this).attr('score')
				var lis=''
				for(var i=1;i<=score;i++){
					lis+='<li><i class="fas fa-star" style="color:#9ec80e;"></i></li>'
				}
				for(var j=1;j<=5-score;j++){
					lis+='<li><i class="fas fa-star" style="color:#7D858B;"></i></li>'
				}
				$(this).html(lis)
			})
		},100)
    }

    // 查询分类数据
	$http({
		method: 'get',
		url: '../Api/cate.php?act=list'
	}).then(function(res){
		var data = res.data;
		$scope.clist = data.list;
		// console.log($scope.clist);
		// 这里再调用一次下拉插件
		setTimeout(function(){
			$('.selectoption').niceSelect('update');  // 更新插件
		},100)
		
	});

	// $scope.cateList = function(){
	// 	$scope.reloadList();
	// }

	$(document).on('change','#selCate',function(){
		var cid=$(this).val()
		// alert(cid)
		$scope.reloadList(cid);
	})

	if($stateParams.cid>0){
		 $('.menu-item').eq(2).children().addClass('active')
		 .end().siblings().children().removeClass('active')
	}

});

/*菜品列表控制器*/
cafe.controller('food2',function($scope,$http,$rootScope,$stateParams){

	// 这个代码，是用于完善，能正常执行页面的JS交互效果，譬如：轮播图
	$.getScript('../Assets/home/js/main.js',function(){
		// console.log('success')
	})

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
    	// 获取数据
    	if($stateParams.cid==0){
    		// var cid = $scope.cid!=undefined?$scope.cid:'';
    		var cateId=cid!=undefined?cid:''
    	}else{
    		var cateId=$stateParams.cid
    	}
    	
		$http({
			method: 'get',
			url: '../Api/food.php?act=list&pn='+pn+'&limit='+limit+'&cid='+cateId
		}).then(function(res){
			var data = res.data;
			$scope.flist = data.list;
		});

		setTimeout(function(){
			$('.rating').each(function(){
				var score=$(this).attr('score')
				var lis=''
				for(var i=1;i<=score;i++){
					lis+='<li><i class="fas fa-star" style="color:#9ec80e;"></i></li>'
				}
				for(var j=1;j<=5-score;j++){
					lis+='<li><i class="fas fa-star" style="color:#7D858B;"></i></li>'
				}
				$(this).html(lis)
			})
		},100)
		
    }

    // 查询分类数据
	$http({
		method: 'get',
		url: '../Api/cate.php?act=list'
	}).then(function(res){
		var data = res.data;
		$scope.clist = data.list;
		// console.log($scope.clist);
		// 这里再调用一次下拉插件
		setTimeout(function(){
			$('.selectoption').niceSelect('update');  // 更新插件
		},100)
		
	});

	// $scope.cateList = function(){
	// 	$scope.reloadList();
	// }

	$(document).on('change','#selCate2',function(){
		var cid=$(this).val()
		// alert(cid)
		$scope.reloadList(cid);
	})

	if($stateParams.cid>0){
		 $('.menu-item').eq(2).children().addClass('active')
		 .end().siblings().children().removeClass('active')
	}

});

/*菜品详情页控制器*/
cafe.controller('food_detail',function($scope,$http,$stateParams){

	// 这个代码，是用于完善，能正常执行页面的JS交互效果，譬如：轮播图
	$scope.$on('repeatFinishCallback',function(){
	$.getScript('../Assets/home/js/main.js',function(){
		// console.log('success')
	})
	})
	$http({
		method: 'get',
		url: '../Api/food.php?act=look&fid='+$stateParams.fid
	}).then(function(res){
		var data = res.data;
		$scope.info = data.info;
	});

	$http({
		method: 'get',
		url: '../Api/food.php?act=img&fid='+$stateParams.fid
	}).then(function(res){
		var data = res.data;
		$scope.flist = data.list;
	});

	setTimeout(function(){
		$('.rating').each(function(){
			var score=$(this).attr('score')
			var lis=''
			for(var i=1;i<=score;i++){
				lis+='<li><i class="fas fa-star" style="color:#9ec80e;"></i></li>'
			}
			for(var j=1;j<=5-score;j++){
				lis+='<li><i class="fas fa-star" style="color:#7D858B;"></i></li>'
			}
			$(this).html(lis)
		})
	},100)

	//食物推荐
	$http({
		method: 'get',
		url: '../Api/food.php?act=listLike2',
	}).then(function(res){
		var data = res.data;
		$scope.flist=data.list
	});

});