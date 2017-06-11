angular.module('userServicios', [])

.factory('Auth', function($http, AuthToken){

  var authFactory = {}
  authFactory.login = function(regData) {
    return $http.post('/login',regData).then(function(data){
        console.log(data.data.token)
        AuthToken.setToken(data.data.token);
        return data;
    })
  }
  authFactory.isLoggedIn = function(){
    if(AuthToken.getToken()){
      console.log("Estoy log")
      return true;
    }else{
      console.log("NO Estoy log")
      return false;
    }
  };


  authFactory.getUser = function(){
    
    if(AuthToken.getToken()){
      
      return $http.post('/userLogIn');
    }else {
     
      return false;
    }
  };

  authFactory.logout = function(){
    AuthToken.setToken();
  };
  return authFactory;
})


.factory('AuthToken', function($window){
  var authTokenFactory = {};
  authTokenFactory.setToken = function(token){
    if(token){
      $window.localStorage.setItem('token',token);
    }else {
      $window.localStorage.removeItem('token');
    }
   
  };
  authTokenFactory.getToken = function(){
    return $window.localStorage.getItem('token');
  };

  return authTokenFactory;
})



.factory('AuthInterceptors', function(AuthToken){
  var authInterceptorsFactory = {};

  authInterceptorsFactory.request = function(config){
    var token = AuthToken.getToken();
    if (token) config.headers['x-access-token'] = token;
    return config;
  }

  return authInterceptorsFactory;
});