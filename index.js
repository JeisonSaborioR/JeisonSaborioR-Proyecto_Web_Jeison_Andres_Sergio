
var mongoose = require('mongoose')
var config = require('./config')
var app = require('./app')
var passport = require('passport')
var social = require('./passport/passport')(app, passport)


mongoose.connect(config.db, (err,res) => {

	if(err) throw err
	console.log('Conexión establecida')
	
	//Load servidor en puerto 8080
	app.listen(8080, function(){
		console.log("Running at Port 100")
	})

})
