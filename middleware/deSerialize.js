const User = require("../models/users");

function deserializeUserMW(req, res, next) {
 	if(req.session.userid) {
	 		User.findById(req.session.userid)
	 				.then(function(user) {
							if (user) {
								req.user = user;
							}
							else {
								req.session.userid = null;
							}
							next();
	 				})
	 				.catch(function(err) {
		 			console.error("Something went wrong deserializing user " + req.session.userid);
		 			console.error(err);
		 			next();
	 				});
	}
	else {
 		next();
	}
}
module.exports= deserializeUserMW;
