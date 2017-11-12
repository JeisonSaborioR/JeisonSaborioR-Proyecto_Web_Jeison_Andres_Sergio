
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



/*
var datosModel = schema({
	titulo: String,
    imagen: String,
    precio: String,
    descuento: String,
    fechaVencimiento: String,
    visitas: String,
    tipoPag:String,
    url:String
})


*/
function registerCupon(req,res) {	
	const dato = new Datos({
		titulo: req.body.description,
		imagen: "",
		precio: req.body.price,
		descuento: "0",
		fechaVencimiento: req.body.expDate,
		visitas: "0",
		tipoPag: "Titicupon"
	});
	console.log(dato)


	dato.save(function(error){
		if (error) {
			res.json({success:false,message:'Fail to save!!'})
		}else{
			res.json({success:true, message:'Successful save!!'})
		}
	});
	
};

function registerPromocion(req,res) {	
	const dato = new Datos({

		titulo: req.body.description,
		imagen: "",
		precio: req.body.price,
		descuento: "0",
		fechaVencimiento: req.body.expDate,
		visitas: "0",
		tipoPag: "Yuplon"
	});
	console.log(dato);


	dato.save(function(error){
		if (error) {
			res.json({success:false,message:'Fail to save!!'})
		}else{
			res.json({success:true, message:'Successful save!!'})
		}
	});
	
};






function deleteDato(req, res){
	
	Datos.findOneAndRemove({titulo:  req.params.title}, (err,dato) => {
		if(err) throw err;

		res.json({success:false,message:'Successful delete!!'})

	})
	
}


function updateDato(req, res){
	if(isNaN(req.body.price/1)){
		res.json({success:false,message:'Fail edit: The price entry contains letters'})
	} else{
		Datos.findOne({_id:  req.body.id}, (err,dato) => {
			if(err) throw err;
	
			if(dato){
			
				if(req.body.title != undefined){
					dato.titulo = req.body.title
				}
					
				if(req.body.price != undefined){
					dato.precio = req.body.price
				}
					
				if(req.body.expDate != undefined){
					dato.fechaVencimiento = req.body.expDate
				}
	
				dato.save(function(error){
					if (error) {
						res.json({success:false,message:'Fail to save '})
					}else{
							
						res.json({success:false,message:'Successful update!!'})
	
					}
				})
			}else{
				res.json({success:false,message:'Fail edit'})
			}
		})
	}
}

module.exports = {
	getTiticupones,
	getYuplones,
	getTopTiticupones,
	getTopYuplones,
	deleteDato,
	registerCupon,
	registerPromocion,
	updateDato


}