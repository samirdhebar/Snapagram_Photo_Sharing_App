function requireLoggedIn (req, res, next) {
		if (req.user) {
			next();
		}
		else {
			res.redirect("/photo/gallery");
		}
}

module.exports = requireLoggedIn;
