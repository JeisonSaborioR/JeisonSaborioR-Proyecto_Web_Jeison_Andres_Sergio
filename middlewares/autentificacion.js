
var servicios = require('../servicios/servicios')

function isAuth(req, res, next) {
	if (!req.headers.authorization) {
		return res.status(403).send({message:'No tienes authorizatión'})
	}
	const token = req.headers.authorization.split('')[1]


	servicios.decodificarToken(token)
		.then(response => {
			req.user = response
			next()
		})

		.catch(response => {
			res.status(response.status)
		})
}


module.exports = isAuth