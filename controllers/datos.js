
var mongoose = require('mongoose')
var Datos = require('../modelos/datos')

function getTiticupones(req, res) {
	
	Datos.find({tipoPag: "Titicupon"}, (err, datos) => {
		
		if(err){
			return res.status(500).send({message:'Error al realizar la peteción'})
		}
		if (!datos) {
			return res.status(404).send({message:'No existen titicupones'})
		}
		
		res.send(200, {datos})
		
	})
}
function getYuplones(req, res) {
	
	Datos.find({tipoPag:"Yuplon"}, (err, datos) => {
		
		if(err){
			return res.status(500).send({message:'Error al realizar la peteción'})
		}
		if (!datos) {
			return res.status(404).send({message:'No existen Yuplones'})
		}
		
		res.send(200, {datos})
		
	})
}

function getTopTiticupones(req, res) {
	
	Datos.find({visitas:"1",tipoPag: "Titicupon"}, (err, datos) => {
		
		if(err){
			return res.status(500).send({message:'Error al realizar la peteción'})
		}
		if (!datos) {
			return res.status(404).send({message:'No existen Yuplones'})
		}
		
		res.send(200, {datos})
		
	})
}

function getTopYuplones(req, res) {
	
	Datos.find({visitas:"1",tipoPag:"Yuplon"}, (err, datos) => {
		
		if(err){
			return res.status(500).send({message:'Error al realizar la peteción'})
		}
		if (!datos) {
			return res.status(404).send({message:'No existen Yuplones'})
		}
		
		res.send(200, {datos})
		
	})
}

function deleteDato(req, res){
	
	Datos.findOneAndRemove({titulo:  req.params.title}, (err,dato) => {
		if(err) throw err;

		res.json({success:false,message:'Dato se eliminó'})

	})
	
}
module.exports = {
	getTiticupones,
	getYuplones,
	getTopTiticupones,
	getTopYuplones,
	deleteDato

}