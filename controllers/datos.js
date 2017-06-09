
var mongoose = require('mongoose')
var Datos = require('../modelos/datos')

function getTiticupones(req, res) {
	
	Datos.find({}, (err, datos) => {
		
		if(err){
			return res.status(500).send({message:'Error al realizar la peteción'})
		}
		if (!datos) {
			return res.status(404).send({message:'No existen titicupones'})
		}
		
		res.send(200, {datos})
		
	})
}

module.exports = {
	getTiticupones
}