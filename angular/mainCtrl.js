
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

.controller('actionData', function($http,$location,$timeout){
    var app = this;
	
	this.loadTitle = function(title,id){
		
		this.title = title;

	}


	this.deleteDato = function(){
		
		$http.delete('/deleteUser/'+this.title).then(function(data) {
			if(data.data.success){
				 alert(data.data.message);
			
				$location.path('/login');
                $timeout(function(){
                  
                    $location.path('/cupones');
                },500);
			}else{	
			 	alert(data.data.message);
			}
		});
		
	
	}

	this.deleteDatoPromo = function(){
		
		$http.delete('/deleteUser/'+this.title).then(function(data) {
			if(data.data.success){
				alert(data.data.message);
				$location.path('/login');
				$timeout(function(){
					
					$location.path('/promociones');
				},500);
			}else{	
			 	alert(data.data.message);
			}
		});
		
	
	}

	this.loadInfoModal = function(titulo, precio, fechaVencimiento, imagen,id){
	
		app.id = id
		app.title = titulo;
		app.price = precio;
		app.birthDay = fechaVencimiento;
		app.image = imagen;
	}




	this.registerCupon = function(regData){
		  
        $http.post('/registroCupon',this.regData).then(function(data){
			
            if(data.data.success){
               alert(data.data.message);
            }else{
                alert(data.data.message); 
               
            } 
			
        });
	}


	this.registerpromo = function(regData){
		  
        $http.post('/registroPromocion',this.regData).then(function(data){
			
            if(data.data.success){
               alert(data.data.message);
            }else{
                alert(data.data.message); 
               
            } 
			
        });
	}

	this.editDato = function(regData){
		
		
	
		
		if (this.regData == undefined){
			alert("No se realizo ningun cambio")
		}else{
			this.regData.id = this.id;
			
			$http.post('/editDato',this.regData).then(function(data){
				
				if(data.data.success){
					alert(data.data.message);
				}else{
					alert(data.data.message); 
				
            	} 
			
        	});
			
		}
		
	 
	}
    
})

.controller('mainYuplonCtrl', function($scope, $http) {
	$scope.posts = [];
	$scope.currentPage = 1;
	$scope.pageSize = 16;

	$http.get('/yuplones').then(function(data) {
		$scope.posts = data.data.datos
		$scope.postSize = $scope.posts.lenght
	})
})


.filter('pagination', function(){
	return function(data, start){
		
		return data.slice(start);
	}

})

.controller('mainYuplonTopCtrl', function($scope, $http) {

	$scope.posts = [];

	$http.get('/topYuplones').then(function(data) {
		$scope.posts = data.data.datos;

	});


})

.controller('mainTiticuponTopCtrl', function($scope, $http) {

	$scope.posts = [];

	$http.get('/topTiticupones').then(function(data) {
		$scope.posts = data.data.datos;

	});

	

});
