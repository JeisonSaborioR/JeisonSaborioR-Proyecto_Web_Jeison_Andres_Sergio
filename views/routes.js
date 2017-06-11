
var app = angular.module('appRoutes',['ngRoute'])


app.config(function($routeProvider, $locationProvider){

	
	$routeProvider
	
	.when('/', {
		templateUrl:'views/pages/home.html'

		//controller: 'regCtrl',
		//controllerAs:'register'
	})
	.when('/vistaUsuario', {
		templateUrl:'views/userView.html',
		authenticated: true
	})
    .when('/facebook/:token', {
		templateUrl:'views/pages/contactenos.html',
        controller: 'facebookCtrl',
        controllerAs: 'facebook',
		authenticated:false
	})
    .when('/google/:token', {
        templateUrl:'views/pages/contactenos.html',
		authenticated:false
    })
    .when('/cupones', {
		templateUrl:'views/pages/cupones.html',
		authenticated:false
		//controller: 'mainCtrl'
	})
    .when('/promociones', {
		templateUrl:'views/pages/promociones.html',
		authenticated:false
		//controller: 'mainYuplonCtrl'
	})
	 .when('/logout', {
		templateUrl:'views/pages/logout.html',
		authenticated:true
		//controller: 'mainYuplonCtrl'
	})
	 .when('/login', {
		templateUrl:'views/pages/login.html',
		authenticated:true
		//controller: 'mainYuplonCtrl'
	})
	
	
	.otherwise({redirectTo:'/'});
    
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
});


app.run(['$rootScope','Auth',function($rootScope, Auth, $location){
	$rootScope.$on('$routeChangeStart', function(event, next, current){
		if(next.$$route.authenticated == true){
			if(!Auth.isLoggedIn()){
				//event.preventDefault();
				//$location.path('/');
				     
			}
		}else if(next.$$route.authenticated == false){
			if(Auth.isLoggedIn()){
				//event.preventDefault();
				//$location.path('/vistaUsuario');	
			}
		}
	});
}]);
