var mongoose = require('mongoose')
var schema = mongoose.Schema



var titicuponesModel = schema({
	titulo: String,
    imagen: String,
    precio: String,
    descuento: String,
    fechaVencimiento: String,
    url:String
})



//Permite ser utilizada desde cualquier punto
module.exports = mongoose.model('Titicupones',titicuponesModel)