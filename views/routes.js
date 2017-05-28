
var app = angular.module('appRoutes',['ngRoute'])


app.config(function($routeProvider){

	console.log("ME CAGO EN JOSE");
	$routeProvider
	
	.when('/', {
		templateUrl:'views/prueba.html'
	})
});
