/*首页控制器*/
cafe.controller('home',function($scope,$http,$rootScope){

	$scope.order={date:''}

	//食物推荐
	$http({
		method: 'get',
		url: '../Api/food.php?act=listLike',
	}).then(function(res){
		var data = res.data;
		$scope.flist=data.list
	});
	//厨师推荐
	$http({
		method: 'get',
		url: '../Api/chef.php?act=listLike',
	}).then(function(res){
		var data = res.data;
		$scope.chlist=data.list
	});
	//接收repeat完成事件
	// 这个代码，是用于完善，能正常执行页面的JS交互效果，譬如：轮播图
	$scope.$on('repeatFinishCallback',function(){
	$.getScript('../Assets/home/js/main.js',function(){
		console.log('success')

		/*---------------------
	        Sidebar-menu js
	    -----------------------*/
	    $(".menu_icon").on('click', function (e) {
	      e.preventDefault();
	      $(".menu_icon").toggleClass("active");
	    });
	    $(".menu_icon").on('click', function (e) {
	      e.preventDefault();
	      $(".sidenav_menu").toggleClass("active");
	    });
	    $.sidebarMenu($('.sidebar-menu'))

	    $('#datepicker').datepicker('option','dateFormat','yy-mm-dd').on('change',function(){
			$scope.order.date=$(this).val()
		})

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



	})
	});

	// 实现 预订 按钮的点击事件
	$('.order').click(function(){
		var a = $("#orderForm").offset(); // 位置对象
		$("body,html").animate({
			// scrollTop 滚动条距离，也是一个样式属性
			scrollTop:a.top - 100		// a.top “立即预订标题”到顶部的距离
		});
	});

	$scope.addOrder = function(){

		// console.log($scope.order)
		if($scope.order==undefined || checkRequired($scope.order.name)){
			alert('请输入您的姓名');
			return;
		}
		if($scope.order==undefined || !checkPhone($scope.order.phone)){
			alert('请正确输入手机号');
			return;
		}
		if($scope.order==undefined || checkRequired($scope.order.date)){
			alert('请选择日期');
			return;
		}
		if($scope.order==undefined || checkRequired($scope.order.time)){
			alert('请输入时间');
			return;
		}
		if($scope.order==undefined || checkRequired($scope.order.people)){
			alert('请输入人数');
			return;
		}

		// 这种结构，类似jquery的ajax结构
		$scope.order['act'] = 'add';	// 追加操作类型
		$http({
			method: 'post',
			url:'../Api/order.php',
			data: $scope.order,	// 传json对象的数据
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
				// 成功的，重置表单
				$('#oForm')[0].reset();
			}
		});
	}

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

	$http({
		method: 'get',
		url: '../Api/cate.php?act=list',
	}).then(function(res){
		var data = res.data;
		$scope.clist=data.list
	});

	$http({
		method: 'get',
		url: '../Api/dynamic.php?act=list&pn='+1+'&limit='+3
	}).then(function(res){
		var data = res.data;
		$rootScope.ddlist = data.list;
	});

});