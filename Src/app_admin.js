var admin = angular.module('cafeAdmin',['ui.router','ngFileUpload','pagination']);
// admin.filter('date',function(){
// 			return function(time){
// 				// console.log(time)
// 				var d = new Date(time*1000);
// 				var y = d.getFullYear();
// 				var m = d.getMonth()+1;
// 				var date = d.getDate();
// 				var h = d.getHours();
// 				var min = d.getMinutes();
// 				m = m<10?'0'+m:m;
// 				date = date<10?'0'+date:date;
// 				h = h<10?'0'+h:h;
// 				min = min<10?'0'+min:min;
// 				return y+'-'+m+'-'+date+' '+h+':'+min;
// 			}
// 		});

admin.filter('date',function(){
	return function(time){
		// console.log(time)
		var d = new Date(time*1000);
		var y = d.getFullYear();
		var m = d.getMonth()+1;
		var date = d.getDate();
		return y+'-'+m+'-'+date;
	}
});