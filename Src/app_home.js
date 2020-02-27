var cafe = angular.module('cafe',['ui.router','pagination']);

// cafe.directive('wdatePicker',function(){
// return{
//     restrict:"A",
//     link:function(scope,element,attr){
//         element.bind('click',function(){
//             window.WdatePicker({
//                 onpicked: function(){element.change()},
//                 oncleared:function(){element.change()}
//             })
//         });
//     }
// }
// 
// 
cafe.filter('date',function(){
	return function(time){
		// console.log(time)
		var d = new Date(time*1000);
		var y = d.getFullYear();
		var m = d.getMonth()+1;
		var date = d.getDate();
		return y+'-'+m+'-'+date;
	}
});

moment.locale('zh-cn')
cafe.filter('ago',function(){
	return function(time){
		return moment( parseInt(time*1000) ).startOf('day').fromNow()
	}
});
        

        //食物推荐
	// $http({
	// 	method: 'get',
	// 	url: '../Api/food.php?act=listLike',
	// }).then(function(res){
	// 	var data = res.data;
	// 	$rootScope.fflist=data.list
	// });

	//自定义repeat完成指令
    cafe.directive('repeatFinish',function($timeout){
        return {
            restrict: 'A',
            link: function(scope,elem,attr){
                //当前循环至最后一个
                if (scope.$last === true) {
                    $timeout(function () {
                        //向父控制器传递事件消息
                        scope.$emit('repeatFinishCallback');
                    },100);
                }
            }
        }
    });


