
var FacebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Usuario = require('../modelos/usuario')
var session = require('express-session')
var usuarioCtrl = require('../controllers/usuario')

var jwt = require('jsonwebtoken')
var config = require('../config')

module.exports = function(app, passport) {
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(session({secret: 'keyboard cat', resave:false, saveUninitialized: true, cookie:{secure:false}}));



	passport.serializeUser(function(user, done) {
		token = jwt.sign({username:user.username, email:user.email}, config.TOKEN_SECRETO, {expiresIn:'24h'});
		console.log("LOG CON FACEBOOK")
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});

	passport.use(new FacebookStrategy({
	    clientID: '129641150928798',
	    clientSecret: 'ee3e38729ce079b875863b2ad4c7afa8',
	    callbackURL: "http://localhost:8080/auth/facebook/callback",
	    profileFields: ['id', 'displayName', 'photos', 'email']

	  },
	  function(accessToken, refreshToken, profile, done) {
	  	//console.log(profile._json.email)
	    console.log(profile)  
	  	//usuarioCtrl.signInFacebook(profile._json.email, profile._json.name,profile._json)

	   	//app.get('/', usuarioCtrl.signIn)
	    done(null, profile)
	  }
	));
	/*
    passport.use(new GoogleStrategy({
        clientID: '68770455084-5ldgklb9qgdm16vsf891gl7toqgvm641.apps.googleusercontent.com',
        clientSecret: 'Ot2f5FKA0-BS_SAJD9VvnC7Y',
        callbackURL: "http://localhost:8080/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        console.log(profile)    
        usuarioCtrl.signInFacebook(profile._json.email, profile._json.name,profile._json.id)
        done(null, profile)
      }
    ));
    */
    /*
    app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
      	res.redirect('/google/'+token);
				//$location.path('/vistaUsuario')
    });
    */
    
    
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login' }), function(req,res) {
     
		res.redirect('/facebook/' + token);
		 //$location.path('/vistaUsuario')
	});
	                                   
	app.get('/auth/facebook',passport.authenticate('facebook', { scope: 'email' }));

	return passport
}