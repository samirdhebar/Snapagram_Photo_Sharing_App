function requireLoggedOut(req, res, next){
	if(req.user && req.user.path !== "/logout") {

		//To be updated once the default state of logged in user is deciphered
		res.redirect("/user");
	}
	next();
}
