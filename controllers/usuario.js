
//Instanciar un modelo desde cualquier punto
var Usuario = require('../modelos/usuario')
var mongoose = require('mongoose')
var servicios = require('../servicios/servicios')
var bcrypt = require('bcrypt-nodejs')

function signUp(req,res) {	
	const usuario = new Usuario({

		correo: req.body.email,
		nombre: req.body.name,
		apellidos: req.body.lastName,
		password: req.body.password
	});

	usuario.save(function(error){
		if (error) {
			res.json({success:false, message:'Username or email already exists!'})
		}else{
			res.json({success:true, message:'User created!!!'})
		}
	});
};


function signIn (req,res){	
	
	Usuario.findOne({correo: req.body.correo}, (err,usuario) => {
		
		if(err) throw err

		if (!usuario) {
			res.json({success:false,message:'Could not authenticate user'})
		}
		
		else{

			var validPassword = usuario.comparePassword(req.body.password)
			if(validPassword){
				res.json({success:true,message:'User authenticated!!!'})
			}else{
				
				res.json({success:false,message:'Could not authenticate user!'})
			}
			
		}
				
	});
}



function signUpFacebook(correo, nombre, id) {
	const usuario = new Usuario({

		correo: correo,
		nombre: nombre,
		password: id
	})

	usuario.save(function(error){
		if (error) {
			console.log("Error al crear el usuario")
			return
		}
	
		console.log('Usuario creado correctamente')
		servicios.crearToken(usuario)
	})

}


function signInFacebook(correo, nombre, id){
	Usuario.find({correo: correo}, (err,usuario) => {
		if(err) {
			console.log("Error al loguear")
			return
		}

		if (usuario.length == 0)  {
			signUpFacebook(correo, nombre, id)
		}else{

			console.log('Te has logueado correctamente')
		
	
			servicios.crearToken(usuario)
		}
		
		
	})

}

module.exports = {
	signUp,
	signInFacebook,
	signUpFacebook,
	signIn,
}