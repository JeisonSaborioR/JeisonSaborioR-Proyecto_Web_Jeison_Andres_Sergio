

//Variables express, path, app
var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var path = require('path')

var passport = require('passport')
var social = require('./passport/passport')(app, passport)



var nodemailer = require('nodemailer')
var xoauth2 = require('xoauth2')
var usuarioCtrl = require('./controllers/usuario')
var titicuponesCtrl = require('./controllers/datos')
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
app.use('/passport', express.static(__dirname + '/passport'))



//Peticiones post usuario

app.get('/titicupones', titicuponesCtrl.getTiticupones)
app.get('/yuplones', titicuponesCtrl.getYuplones)
app.get('/topTiticupones', titicuponesCtrl.getTopTiticupones)
app.get('/topYuplones', titicuponesCtrl.getTopYuplones)
app.post('/registro', usuarioCtrl.signUp)
app.post('/login', usuarioCtrl.signIn)
app.post('/userLogIn', usuarioCtrl.tokenAuth)


/////Registro de datos
app.post('/registroPromocion', titicuponesCtrl.registerPromocion)
app.post('/registroCupon', titicuponesCtrl.registerCupon)
app.post('/editDato', titicuponesCtrl.updateDato)

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		xoauth2: xoauth2.createXOAuth2Generator({
			clientId: '68770455084-5ldgklb9qgdm16vsf891gl7toqgvm641.apps.googleusercontent.com',
			clientSecrete: 'Ot2f5FKA0-BS_SAJD9VvnC7Y'
		})
	}
})
var mailOptions = {
	from : 'andrez96096@gmail.com',
	to : 'jeurses93@gmail.com',
	subject: 'Uff ese correo',
	text : 'papu <3'
}

app.post('/sendEmail',function(req,res){
	
	transporter.sendMail(mailOptions,function(err,res){
		if(err){
			console.log(err)
		}
		else{
			console.log('Nice')
		}
	})
})

app.delete('/deleteUser/:title', titicuponesCtrl.deleteDato)

app.post('/private', autentificacion, (req,res) => {
	res.status(200).send({message: 'Tienes acceso'})
	//res.send(req.decoded);
})



//Cargar el indice al servidor 
/*
app.get('*', function (req, res) {
	res.sendFile('/views/index.html', {root: path.join(__dirname, '')})
})
*/
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname + '/views/index.html'));
});

module.exports = app