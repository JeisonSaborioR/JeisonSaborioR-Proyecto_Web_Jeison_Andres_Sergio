
angular.module('userController',[]) 

.controller('regCtrl', function($scope,$http){
    var app = this;
    this.regUser = function(regData){
        
        $http.post('/registro',this.regData).then(function(data){
            if(data.data.success){
               alert(data.data.message);
            }else{
                alert(data.data.message); 
               
            }    
        });
    };
});

