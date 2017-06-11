angular.module('loginController',['userServicios'])

.controller('loginCtrl', function(Auth,$timeout,$location,$rootScope){
    
    var app = this;
    $rootScope.$on('$routeChangeStart',function(){
        if(Auth.isLoggedIn()){
            Auth.getUser().then(function(data){
                app.nombre = data.data.nombre;
                app.correo = data.data.correo;
                app.tipo = data.data.tipo;
            });
        
        }else {
            app.nombre = "";
            app.correo = "";
        }
    });
    

    this.doLogin = function(loginData){
        
       app.loading = true;
       app.errorMsg = false;

       Auth.login(app.loginData).then(function(data){
           if(data.data.success){
               app.loading=false;
                $location.path('/vistaUsuario')
    
           }else {
               app.loading = false;
               alert(data.data.message); 
           }
       })
    };

    this.logout = function(){
        Auth.logout();
        $location.path('/')
    }
});