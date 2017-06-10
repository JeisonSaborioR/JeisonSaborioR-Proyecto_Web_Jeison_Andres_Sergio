var mongoose = require('mongoose')
var schema = mongoose.Schema



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



//Permite ser utilizada desde cualquier punto
module.exports = mongoose.model('Datos',datosModel)