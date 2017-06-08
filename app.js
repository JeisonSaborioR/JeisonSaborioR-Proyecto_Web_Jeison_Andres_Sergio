

//Variables express, path, app
var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var path = require('path')





var usuarioCtrl = require('./controllers/usuario')
var titicuponesCtrl = require('./controllers/titicupones')
var autentificacion = require('./middlewares/autentificacion')



app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


//var Usuario = require('./modelos/usuario')

//Cargar el archivo de estilos
app.use('/css', express.static(__dirname + '/css'))
app.use('/angular', express.static(__dirname + '/angular'))
app.use('/imagenes', express.static(__dirname + '/imagenes'))
app.use('/views', express.static(__dirname + '/views'))
app.use('/servicios', express.static(__dirname + '/servicios'))
app.use('/controllers', express.static(__dirname + '/controllers'))




//Peticiones post usuario

app.get('/titicupones', titicuponesCtrl.getTiticupones)
app.post('/registro', usuarioCtrl.signUp)
app.post('/login', usuarioCtrl.signIn)


app.get('/private', autentificacion, (req,res) => {
	res.status(200).send({message: 'Tienes acceso'})
})



//Cargar el indice al servidor 
app.get('', function (req, res) {
	res.sendFile('/views/index.html', {root: path.join(__dirname, '')})
})


module.exports = app