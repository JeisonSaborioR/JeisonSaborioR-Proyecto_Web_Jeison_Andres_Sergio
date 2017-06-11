
//Instanciar un modelo desde cualquier punto
var Usuario = require('../modelos/usuario')
var mongoose = require('mongoose')
var servicios = require('../servicios/servicios')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jsonwebtoken');
var config = require('../config')


function signUp(req,res) {	
	const usuario = new Usuario({

		correo: req.body.email,
		nombre: req.body.name,
		apellidos: req.body.lastName,
		tipo: "usuario",
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
				var token = jwt.sign({correo: usuario.correo, nombre:usuario.nombre, tipo:usuario.tipo},config.TOKEN_SECRETO,{expiresIn:'24h'});
				res.json({success:true,message:'User authenticated!!!', token: token})
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

function tokenAuth(req, res, next){
	console.log("ENTRE AL RETURN TOKEN auth");
	var token = req.body.token || req.body.query || req.headers['x-access-token'];

	if(token) {
		jwt.verify(token,config.TOKEN_SECRETO, function(err, decoded){
			if(err) {
				res.json({success: false, message: 'Token invalid'});
			} else {
				req.decoded = decoded;
				res.send(req.decoded);
			}
		});
	}else{
		res.json({success:false, message:'No token provided'});
	}
}

function returnToken (req,res){
	console.log("ENTRE AL RETURN TOKEN DECODED");
	res.send(req.decoded);
}


module.exports = {
	signUp,
	signInFacebook,
	signUpFacebook,
	signIn,
	returnToken,
	tokenAuth,
}