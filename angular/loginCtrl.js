angular.module('loginController',['userServicios'])

.controller('loginCtrl', function(Auth,$timeout,$location,$rootScope,$window){
    
    var app = this;
    $rootScope.$on('$routeChangeStart',function(){
     
        if(Auth.isLoggedIn()){
            app.isLoggedIn = true;
            Auth.getUser().then(function(data){
               
                app.nombre = data.data.nombre;
                app.correo = data.data.correo;
                app.tipo = data.data.tipo;
            });
        
        }else {
            app.isLoggedIn = false;
            app.nombre = "";
            app.correo = "";
            app.tipo = "";
        }

        if ($location.hash() == '_=_') $location.hash(null);
    });


    this.facebook = function(){
        $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/facebook';
    }
    

    this.google = function(){
        $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/google';
    }
    

    this.doLogin = function(loginData){
        
       app.loading = true;
       app.errorMsg = false;

       Auth.login(app.loginData).then(function(data,$window){
           if(data.data.success){
               app.loading=false;
                alert(data.data.message);
                $location.path('/login');
                $timeout(function(){
                  
                    $location.path('/');
                },100);
                
                
           }else {
               app.loading = false;
               alert(data.data.message); 
           }
       })
    };

    this.logout = function($windows){
        Auth.logout();
     
        $location.path('/logout');
        $timeout(function(){
          
           $location.path('/');  
        },100);
                
    }
})

.controller('facebookCtrl', function($routeParams,Auth,$location){
    Auth.facebook($routeParams.token);
    $location.path('/')
})


.controller('googleCtrl', function($routeParams,Auth,$location){
   
    Auth.google($routeParams.token);
    $location.path('/')
})
