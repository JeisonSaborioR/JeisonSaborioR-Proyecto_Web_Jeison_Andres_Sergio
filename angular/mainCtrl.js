
angular.module('mainController', ['ui.bootstrap'])

.controller('mainCtrl', function($scope, $http) {

	$scope.posts = [];
	$scope.currentPage = 1;
	$scope.pageSize = 20;

	$http.get('/titicupones').then(function(data) {
		$scope.posts = data.data.datos;
	
		$scope.postSize = $scope.posts.lenght
	});



})




.controller('actionData', function($scope,$http){
    var app = this;
	
	this.loadTitle = function(titulo){
		app.title = titulo;
		console.log(app.title);
		/*
		$http.delete('/deleteUser',this.regData).then(function(data) {
			if(data.data.success){
				console.log("Se borro")
			}else{	
				console.log("No se borro")
			}
		});
		*/
	
	}

	this.deleteDato = function(){
		console.log("Voy a borrar a esa mierda");
		console.log(app.title);
		/*
		$http.delete('/deleteUser',this.regData).then(function(data) {
			if(data.data.success){
				console.log("Se borro")
			}else{	
				console.log("No se borro")
			}
		});
		*/
	
	}

	this.loadInfoModal = function(titulo, precio, fechaVencimiento, imagen){
		console.log("Entre al load")
		app.title = titulo;
		app.price = precio;
		app.birthDay = fechaVencimiento;
		app.image = imagen;
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
