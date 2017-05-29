
var app = angular.module('appRoutes',['ngRoute'])


app.config(function($routeProvider, $locationProvider){

	
	$routeProvider
	
	.when('/', {
		templateUrl:'views/pages/home.html',
        controller: 'mainCtrl'
       
	})
	.when('/contactenos', {
		templateUrl:'views/pages/contactenos.html'
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



//Obtiene promociones de basedatos

app.controller('mainCtrl', function($scope, $http) {

	$scope.posts = [];

	$http.get('/titicupones').then(function(data) {
		//console.log(data)
		$scope.posts = data.data.titicupones;

	});
});

this.facebook = function(){
    console.log('test');
}

app.controller('facebookCtrl', function($routeParams, Auth, $location) {
    
    Auth.facebook(token);
	$location.path('/');
});
