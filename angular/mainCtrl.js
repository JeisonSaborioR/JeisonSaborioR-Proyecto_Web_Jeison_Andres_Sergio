angular.module('mainApplication', [])

.controller('mainCtrl', function($scope, $http) {
	
	$http.get('/titicupones').then(function(data) {
		console.log(data)
		$scope.test = data.data
	});
});
