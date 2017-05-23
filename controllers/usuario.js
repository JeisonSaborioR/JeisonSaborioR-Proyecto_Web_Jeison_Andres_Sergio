
//Instanciar un modelo desde cualquier punto
var Usuario = require('../modelos/usuario')
var mongoose = require('mongoose')
var servicios = require('../servicios/servicios')


function  guardarUsuario() {
	
	let usuario = new Usuario();
	usuario.nombre = req.params.nombre
	usuario.correo = req.params.correo
	usuario.password = req.params.password
	usuario.tipo = req.params.tipo
	usuario.fechaNacimiento = req.params.fechaNacimiento
	usuario.save((err, usuarioModel) => {
		if(err) res.status(200).send({message: "Error al salvar en la base de datos"})

		res.status(200).send({usuario: usuarioModel})
	});
}

function signUp(req, res) {
	const usuario = new Usuario({

		correo: req.body.correo,
		nombre: req.body.nombre,
		password: req.body.password
	})
	usuario.save((err) =>{
		if (err) res.status(500).send({message:'Error al crear el usuario'})

		return res.status(200).send({token:servicios.crearToken(usuario)})
	})
}


function signIn (req,res){

	Usuario.find({correo: req.body.email}, (err,usuario) => {
		if(err) return res.status(500).send({message:err})

		if (!usuario) return res.status(404).send({message:'No existe el usuario'})


		req.usuario = usuario

		res.status(200).send({
			message:'Te has logueado correctamente',
			token: servicios.crearToken(usuario)
		})
	})

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
		console.log(usuario)
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
	signInFacebook,
	signUpFacebook,
	signUp,
	signIn
}