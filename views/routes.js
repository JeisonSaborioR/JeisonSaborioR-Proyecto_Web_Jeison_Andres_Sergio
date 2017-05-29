
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
