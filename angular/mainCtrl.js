

angular.module('mainController', ['ui.bootstrap'])

.controller('mainCtrl', function($scope, $http) {
	console.log("Entre al mainCtrl")
	$scope.posts = [];
	$scope.currentPage = 1;
	$scope.pageSize = 12;

	$http.get('/titicupones').then(function(data) {
		$scope.posts = data.data.datos;
	
		$scope.postSize = $scope.posts.lenght
	});


})


.controller('mainYuplonCtrl', function($scope, $http) {
	console.log("Entre a mainYuplonCtrl")
	$scope.posts = [];
	$scope.currentPage = 1;
	$scope.pageSize = 12;

	$http.get('/yuplones').then(function(data) {
		$scope.posts = data.data.datos;
		
			
		$scope.postSize = $scope.posts.lenght
		console.log($scope.postSize)

	});


})


.filter('pagination', function(){
	return function(data, start){
		
		return data.slice(start);
	}

})

.controller('mainYuplonTopCtrl', function($scope, $http) {

	$scope.posts = [];

	$http.get('/topYuplones').then(function(data) {
		console.log(data)
	
		$scope.posts = data.data.datos;

	});


})

.controller('mainTiticuponTopCtrl', function($scope, $http) {

	$scope.posts = [];

	$http.get('/topTiticupones').then(function(data) {
		console.log(data)
	
		$scope.posts = data.data.datos;

	});

	

});
