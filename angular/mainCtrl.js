

angular.module('mainController', [])

.controller('mainCtrl', function($scope, $http) {

	$scope.posts = [];

	$http.get('/titicupones').then(function(data) {
		console.log(data)
		//console.log(data)
		$scope.posts = data.data.titicupones;

	});
});
