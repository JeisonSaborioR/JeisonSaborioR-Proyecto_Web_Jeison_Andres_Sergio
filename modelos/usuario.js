
var mongoose = require('mongoose')
var schema = mongoose.Schema
var bcrypt = require('bcrypt-nodejs')

var usuarioModel = schema({
	nombre: String,
	apellidos: String,
	correo: {type: String, unique: true, lowercase: true},
	password: {type: String, select: false},
	tipo: {type:String, enum:['administrador','usuario']},
	fechaNacimiento: String
})

usuarioModel.pre('save', function(next){
	let user = this

	if (!user.isModified('password')) return next()


	bcrypt.genSalt(10, (err,salt) =>{
		if(err) return next(err)

		bcrypt.hash(user.password, salt,null,(err,hash) =>{
			if(err) return next(err)
			user.password = hash 
			next()	
		})
		
	})	
})

//Permite ser utilizada desde cualquier punto
module.exports = mongoose.model('Usuario',usuarioModel)