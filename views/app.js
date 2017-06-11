
angular.module('userApp',['appRoutes','mainController','loginController','userServicios','userController'])


.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors');
});
