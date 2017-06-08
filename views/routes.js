
var app = angular.module('appRoutes',['ngRoute'])


app.config(function($routeProvider, $locationProvider){

	
	$routeProvider
	
	.when('/', {
		templateUrl:'views/pages/home.html'
		//controller: 'regCtrl',
		//controllerAs:'register'
		
       
	})
	.when('/contactenos', {
		templateUrl:'views/pages/contactenos.html'
	})

	
    .when('/Promociones', {
		templateUrl:'views/pages/prueba.html',
		
	})
	.when('/vistaUsuario', {
		templateUrl:'views/userView.html',
		
	})
    .when('/facebook/:token', {
		templateUrl:'views/pages/contactenos.html',
        controller: 'facebookCtrl',
        controllerAs: 'facebook'
        
	})
    .when('/google/:token', {
        templateUrl:'views/pages/contactenos.html'
    })
	.otherwise({redirectTo:'/'});
    
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
});


this.facebook = function(){
    console.log('test');
}

app.controller('facebookCtrl', function($routeParams, Auth, $location) {
    
    Auth.facebook(token);
	$location.path('/');
});
