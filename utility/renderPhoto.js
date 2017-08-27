const Photos = require("../models/photos.js");
const renderTemplate = require("./renderTemplate.js");
const User = require("../models/users.js");
const Comment = require("../models/comments.js");

function renderPhoto(res, photoId, req) {
	let photo;
	let comments;
	let likes;

	Photos.findById(req.params.photoId)
	.then(function(foto) {
		if (foto) {
			photo = foto;
			return photo.getComments({ include: [User] });
		}
		else {
			res.redirect("/photo/gallery");
			throw new Error("Missing Photo");
		}
	})
		.then(function(com) {
			comments = com;
			return photo.getLikes();
		})
		.then(function(like) {
			for (let i = 0; i < like.length; i++) {
				likes = i + 1;
			}
			renderTemplate(res, "photo", "Photo", {
				photo: photo,
				comments: comments,
				likes: likes,
				id: req.user.get("id"),
				username: req.user.get("username"),
			});
		})
		.catch(function(err) {
			console.log(err);
			res.status(404);
		});
}

module.exports = renderPhoto;
