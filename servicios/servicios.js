var jwt = require('jwt-simple')
var moment = require('moment')
var config = require('../config')

function crearToken(user) {
	const cargar = {
		sub: user.id,
		iat: moment().unix(), 
		exp: moment().add(14, 'days').unix(),
	}
	jwt.encode(cargar, config.TOKEN_SECRETO)
}


function decodificarToken(token) {
	var decoded = new Promise((resolve, reject) => {
		try{
			var payload = jwt.decode(token,config.TOKEN_SECRETO)
			if (payload.exp <= moment().uniX()){
				reject({
					status:401,
					message: 'Token a inspirado'
				})
			}
			resolve(payload.sub)

		}catch (err){
			reject({
				status: 500,
				message: 'Token invalido'
			})
		}
	})

	return decoded
}

module.exports = {
	crearToken,
	decodificarToken
}