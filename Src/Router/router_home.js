cafe.config(function($stateProvider,$urlRouterProvider){

	// 默认路由文件
	$urlRouterProvider.otherwise('/home');

	// 配置、加载前台所有的路由文件
	$stateProvider
	.state('home',{
		url: '',
		templateUrl: '../Src/View/home/home.html',	// 首页
		controller: 'home'	// 当加载首页路由文件的时候，控制器就会执行
	})
	// .state('gallery',{
	// 	url: '',
	// 	templateUrl: '../Src/View/home/gallery.html',	// 菜品列表
	// 	// controller: 'gallery'
	// })
	.state('team',{
		url: '',
		templateUrl: '../Src/View/home/team.html',	// 厨师团队列表
		controller: 'team'
	})
	.state('food',{
		url: '/flist/:cid',
		templateUrl: '../Src/View/home/shop_grid.html',	// 菜品列表
		controller: 'food'
	})
	.state('food2',{
		url: '/fflist/:cid',
		templateUrl: '../Src/View/home/shop_list.html',	// 菜品列表
		controller: 'food2'
	})
	.state('news',{
		url: '',
		templateUrl: '../Src/View/home/blog.html',	// 最新动态列表
		controller: 'news'
	})
	.state('n_detail',{
		url: '/nd/:chid',
		templateUrl: '../Src/View/home/single_team.html',	// 厨师详情页
		controller: 'chef_detail'
	})
	.state('s_detail',{
		url: '/sd/:fid',
		templateUrl: '../Src/View/home/shop_details.html',	// 菜品详情页
		controller: 'food_detail'
	})
	.state('b_detail',{
		url: '/bd/:did',
		templateUrl: '../Src/View/home/single_blog.html',	// 动态详情页
		controller: 'dynamic_detail'
	})
});