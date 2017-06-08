angular.module('userServicios', [])

.factory('Auth', function($http){

  var authFactory = {}
  authFactory.login = function(regData) {
    return $http.post('/login',regData); 
  }
  return authFactory;
})
