var FacebookStrategy = require('passport-facebook').Strategy
var Usuario = require('../modelos/usuario')
var session = require('express-session')
var usuarioCtrl = require('../controllers/usuario')

module.exports = function(app, passport) {
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(session({secret: 'keyboard cat', resave:false, saveUninitialized: true, cookie:{secure:false}}));



	passport.serializeUser(function(user, done) {
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
	  	//console.log(profile)
	 
	  	usuarioCtrl.signInFacebook(profile._json.email, profile._json.name,profile._json.id)
	   	//app.get('/', usuarioCtrl.signIn)
	    done(null, profile)
	  }
	));


	app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/',failureRedirect: '/login' }));
	                                   
	app.get('/auth/facebook',passport.authenticate('facebook', { scope: 'email' }));

	return passport
}