

//Variables express, path, app
var express = require('express')
var app = express()

var path = require('path')


var usuarioCtrl = require('./controllers/usuario')
var titicuponesCtrl = require('./controllers/titicupones')
var autentificacion = require('./middlewares/autentificacion')


//Cargar el archivo de estilos
app.use('/css', express.static(__dirname + '/css'))
app.use('/angular', express.static(__dirname + '/angular'))
app.use('/imagenes', express.static(__dirname + '/imagenes'))



//Peticiones post usuario

app.get('/titicupones', titicuponesCtrl.getTiticupones)
app.post('/signUp/usuario', usuarioCtrl.signUp)
app.post('/agregar/usuario', usuarioCtrl.signIn)


app.get('/private', autentificacion, (req,res) => {
	res.status(200).send({message: 'Tienes acceso'})
})

//Cargar el indice al servidor 
app.get('', function (req, res) {
	res.sendFile('index.html', {root: path.join(__dirname, '')})
})





module.exports = app