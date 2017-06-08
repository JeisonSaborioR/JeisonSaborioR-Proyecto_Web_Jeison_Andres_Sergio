angular.module('loginController',['userServicios'])

.controller('loginCtrl', function(Auth,$timeout,$location){
    
    var app = this;
    this.doLogin = function(loginData){
        
       app.loading = true;
       app.errorMsg = false;

       Auth.login(app.loginData).then(function(data){
           console.log(data)
           if(data.data.success){
               app.loading=false;
                $location.path('/vistaUsuario')
    
           }else {
               app.loading = false;
               alert(data.data.message); 
           }
       })
    }
});