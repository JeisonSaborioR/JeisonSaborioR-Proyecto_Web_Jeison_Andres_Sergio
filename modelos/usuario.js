
var mongoose = require('mongoose')
var schema = mongoose.Schema
var bcrypt = require('bcrypt-nodejs')

//select: false
var usuarioModel = schema({
	nombre: String,
	apellidos: String,
	correo: {type: String, unique: true, lowercase: true},
	password: {type: String},
	tipo: {type:String, enum:['administrador','usuario']},
	fechaNacimiento: String
})


usuarioModel.pre('save', function(next){
	let usuario = this
	bcrypt.hash(usuario.password,null,null, function(err,hash){
		if(err) return next(err);

		usuario.password = hash;
		next();
	})
})
usuarioModel.methods.comparePassword = function(password) {
	
	return bcrypt.compareSync(password,this.password);
}

//Permite ser utilizada desde cualquier punto
module.exports = mongoose.model('Usuario',usuarioModel)