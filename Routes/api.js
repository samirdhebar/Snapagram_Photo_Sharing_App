const express = require("express");
const User = require("../models/users.js");
const Photo = require("../models/photos.js");
const renderTemplate = require("../utility/renderTemplate.js");
const router = express.Router();



router.post("/signup", function(req,res) {
	User.signup(req)
			.then(function(user) {
				res.json ({
					user : user
				});
			})
			.catch(function(err) {
				console.error("Encountered an error during the API signup");
				res.status(400);
				res.json({
					error: "Please ensure all fields are filled in properly" });
			});
});


router.post("/login", function(req, res) {
		User.login(req)
		.then(function(user) {
			res.json({ user: user });
		})
		.catch(function(err) {
			console.error("Encountered an error during the API login");
			res.status(400);
			res.json({
				error: "Invalid username or password"});
		});
	});

	router.post("/photo/:photoId", function(req, res) {
		Photo.findById(req.params.photoId)
			.then(function(photo) {
				if (photo) {
					photo.description = req.body.description;
					res.json({ photo: photo });



				}
				else {
					res.status(404);
					res.json({ error: "Unable to find photo with " + req.params.photoId });
				}
			})
			.catch(function(err) {
				res.status(500);
				res.json({ error: "Unable to delete file" });
			});



	});


router.delete("/photo/:photoId", function(req, res) {
	Photo.findById(req.params.photoId)
		.then(function(photo) {
			if (photo) {
				photo.destroy();
				res.json({ photo: photo });



			}
			else {
				res.status(404);
				res.json({ error: "Unable to find photo with " + req.params.photoId });
			}
		})
		.catch(function(err) {
			res.status(500);
			res.json({ error: "Unable to delete file" });
		});



});







module.exports = router;
