angular.module('authServicios', [])


.factory('Auth', function(AuthToken) {
    var authFactory = {};
    
    
    
    
    Auth.facebook(token);
    
    authFactory.facebook = function(token) {
      AuthToken.setToken(token);  
    };
    
    
    
    
    
    
})