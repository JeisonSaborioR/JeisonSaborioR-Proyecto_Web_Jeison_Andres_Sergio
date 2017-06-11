
var servicios = require('../servicios/servicios')
var config = require('../config')

function isAuth(req, res, next) {
	
	var token = req.body.token || req.body.query || req.headers['x-access-token'];

	if(token) {
		jwt.verify(token,config.TOKEN_SECRETO, function(err, decoded){
			if(err) {
				res.json({success: false, message: 'Token invalid'});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	}else{
		res.json({success:false, message:'No token provided'});
	}
}


module.exports = isAuth