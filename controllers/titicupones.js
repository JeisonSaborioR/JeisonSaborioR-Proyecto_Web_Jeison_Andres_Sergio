
var mongoose = require('mongoose')
var Titicupones = require('../modelos/titicupones')

function getTiticupones(req, res) {
	Titicupones.find({}, (err, titicupones) => {
		
		if(err){
			return res.status(500).send({message:'Error al realizar la peteción'})
		}
		if (!titicupones) {
			return res.status(404).send({message:'No existen titicupones'})
		}
		
		res.send(200, {titicupones})
		
	})
}

module.exports = {
	getTiticupones
}