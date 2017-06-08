var Usuario = require('../modelos/usuario')

module.exports = function(route){
    route.post('/users', function(req, res){
        var usuario = new Usuario();
        	
       	usuario.correo =  req.body.email,
		usuario.nombre =  req.body.name,
		usuario.apellido = req.body.lastName,
		usuario.password = req.body.password
        usuario.save(function(err) {
           
        });
    });
    return route;
}