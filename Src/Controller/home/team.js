cafe.controller('team',function($scope,$http,$rootScope){
	$http({
		method: 'get',
		url: '../Api/chef.php?act=list'
	}).then(function(res){
		var data = res.data;
		$scope.clist = data.list;
	});
})

cafe.controller('chef_detail',function($scope,$http,$stateParams){
	$http({
		method: 'get',
		url: '../Api/chef.php?act=look&chid='+$stateParams.chid
	}).then(function(res){
		var data = res.data;
		$scope.info = data.info;
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
})