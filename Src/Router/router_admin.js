admin.config(function($stateProvider,$urlRouterProvider){

	$urlRouterProvider.otherwise('/home');	// 默认路由文件

	// 配置、加载后台所有的路由文件
	$stateProvider
	.state('home',{
		url: '',
		templateUrl: '../Src/View/admin/home.html',		// 后台首页
		controller: 'home'
	})
	.state('cate_add',{
		url: '',
		templateUrl: '../Src/View/admin/cate_add.html',		// 后台分类添加
		controller: 'cate_add'
	})
	.state('cate_list',{
		url: '/clist',
		templateUrl: '../Src/View/admin/cate_list.html',		// 后台分类列表
		controller: 'cate_list'
	})
	.state('cate_edit',{
		url: '/cedit/:cid',
		templateUrl: '../Src/View/admin/cate_edit.html',		// 后台分类修改
		controller: 'cate_edit'
	})
	.state('food_add',{
		url: '',
		templateUrl: '../Src/View/admin/food_add.html',		// 后台菜品添加
		controller: 'food_add'
	})
	.state('food_list',{
		url: '/flist',
		templateUrl: '../Src/View/admin/food_list.html',		// 后台菜品列表
		controller: 'food_list'
	})
	.state('food_edit',{
		url: '/fedit/:fid',
		templateUrl: '../Src/View/admin/food_edit.html',		// 后台菜品修改
		controller: 'food_edit'
	})
	.state('chef_add',{
		url: '/chef_add',
		templateUrl: '../Src/View/admin/chef_add.html',		// 后台厨师添加
		controller: 'chef_add'
	})
	.state('chef_list',{
		url: '/chef_list',
		templateUrl: '../Src/View/admin/chef_list.html',		// 后台厨师列表
		controller: 'chef_list'
	})
	.state('chef_edit',{
		url: '/chef_edit/:chid',
		templateUrl: '../Src/View/admin/chef_edit.html',		// 后台厨师修改
		controller: 'chef_edit'
	})
	.state('dynamic_add',{
		url: '',
		templateUrl: '../Src/View/admin/dynamic_add.html',		// 后台动态添加
		controller: 'dynamic_add'
	})
	.state('dynamic_list',{
		url: '/dlist',
		templateUrl: '../Src/View/admin/dynamic_list.html',		// 后台动态列表
		controller: 'dynamic_list'
	})
	.state('dynamic_edit',{
		url: '/dynamic_edit/:did',
		templateUrl: '../Src/View/admin/dynamic_edit.html',		// 后台动态添加
		controller: 'dynamic_edit'
	})
	.state('orders_list',{
		url: '',
		templateUrl: '../Src/View/admin/orders_list.html',		// 后台订单列表
		controller: 'orders_list'
	})
	.state('orders_edit',{
		url: '/orders_edit/:oid',
		templateUrl: '../Src/View/admin/orders_edit.html',		// 后台订单修改
		controller: 'orders_edit'
	})
	.state('comment_list',{
		url: '/colist/:did',
		templateUrl: '../Src/View/admin/comment_list.html',		// 后台评论列表
		controller: 'comment_list'
	})

	.state('foodimg_list',{
		url: '/foodimg_list/:fid',
		templateUrl: '../Src/View/admin/foodimg_list.html',		// 后台相册列表
		controller: 'foodimg_list'
	})
	
});