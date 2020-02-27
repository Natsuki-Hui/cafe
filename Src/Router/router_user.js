user.config(
    function($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,$httpProvider){
    $stateProvider
        .state('index', {//首页
            url: '/index',
            templateUrl: basePath+'page/gym/lecycle_index.html',
            resolve: {
                  loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){//这两行就是loader的使用，此行写法固定
                      return $ocLazyLoad.load(basePath+'src/lecycle_index/le_index.js');//后面这个就是进入这个模板时候要加载进来的js
                  }]
              }
        })
        .state('userAgree',{//同意用户协议页面
            url:"/userAgree",
            templateUrl:basePath+'page/agreement.html'
        })
    $urlRouterProvider.otherwise("/index");/*BproDtails*/
});