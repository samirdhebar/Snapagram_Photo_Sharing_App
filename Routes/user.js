const express = require("express");
const User = require("../models/users.js");
const renderUserTemp = require("../utility/renderauth.js");
const requireLoggedOut = require("../middleware/requireLoggedOut");

const router = express.Router();
// router.use(requireLoggedOut);


// SIGN UP

router.get("/signup", function(req, res, error) {
	renderUserTemp(res, "signup", "Signup", {
	});
});

router.post("/signup", function(req, res) {
	if (req.body.username === "" || req.body.password === "" || req.body.confirmpassword === "") {
		return renderUserTemp(res, "signup", "Signup", {
			error: "Please fill in all required fields",
		});
	}
	if (req.body.password !== req.body.confirmpassword) {
		return renderUserTemp(res, "signup", "Signup", {
			error: "Your password fields do no match",
		});
	}
	else {
			User.signup(req)
			.then(function() {
				res.redirect("/photo/gallery");
			})
			.catch(function(err) {
				res.status(400);
				renderUserTemp(res, "signup", "Signup", {
					error: "Please ensure all fields are filled in properly",
				});
			});
		};
	});

// END SIGN UP

// LOGIN

router.get("/login", function(req, res) {
	renderUserTemp(res, "login", "Login", {
	});
});

router.post("/login", function(req, res) {
	User.login(req)
		.then(function() {
			req.session.user;
			res.redirect("/photo/gallery");
		})
		.catch(function(err) {
			res.status(400);
			renderUserTemp(res, "login", "Login", {
				error: err.message,
			});
		});
});
// END LOGIN

//	LOGOUT

router.get("/logout", function(req, res) {
	req.session.destroy(function(err) {
		if (err) throw err;
		res.redirect("/user/login");
	});
	console.log(req.session);
});
//	END LOGOUT

module.exports = router;
