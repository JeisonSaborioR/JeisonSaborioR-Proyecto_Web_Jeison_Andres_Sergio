
angular.module('mainController', ['ui.bootstrap'])

.controller('mainCtrl', function($scope, $http) {
	var app = this;
	$scope.posts = [];
	$scope.currentPage = 1;
	$scope.pageSize = 16;

	$http.get('/titicupones').then(function(data) {
		$scope.posts = data.data.datos;
	
		$scope.postSize = $scope.posts.lenght
	});

	
	this.deleteDato = function(nombre){
		console.log("SSISISSSIISISISSISSIS");
		$http.delete('/deleteUser',this.nombre).then(function(data) {
			if(data.data.success){
				console.log("Se borro")
			}else{	
				console.log("No se borro")
			}
		});	
	}



})


.controller('mainYuplonCtrl', function($scope, $http) {
	$scope.posts = [];
	$scope.currentPage = 1;
	$scope.pageSize = 16;

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
