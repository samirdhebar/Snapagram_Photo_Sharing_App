const Sequelize = require("sequelize");
const sql = require("../utility/sql.js");
const User = require("./user.js");
const Like = require("./like.js");
const Jimp = require("jimp");
const Comment = require("./comment.js");
const fs = require("fs");
const session = require("express-session");

const Photo = sql.define("photo", {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
	},
	size: {
		type: Sequelize.INTEGER,
		notNull: true,
	},
	originalName: {
		type: Sequelize.STRING,
		notNull: true,
	},
	mimeType: {
		type: Sequelize.STRING,
		notNull: true,
	},
	description: {
		type: Sequelize.STRING,
		notNull: true
	},
	filename: {
		type: Sequelize.STRING,
		notNull: true,
	},
	userId: {
		type: Sequelize.INTEGER,
		notNull: true,
	}

});

Photo.make = function(req) {
 	return Photo.create({
 		id: req.file.filename,
 		size: req.file.size,
		description: req.body.description,
 		originalName: req.file.originalname,
 		mimeType: req.file.mimetype,
		userId: req.session.userid,
 	}).then(function() {
 		if (req.file.mimetype.includes("image/")) {
 			Jimp.read(req.file.path).then(function(img) {
 				img.quality(80);
 				img.resize(Jimp.AUTO, 400);
 			});
 		}
 	});
 };

Photo.searchByUser = function(req) {
	 return Photo.findAll({
		 where: {
			 userId: req.session.id,
		 },
	 }).then(function() {
		 console.log(this.userId);
	 });
};

Photo.prototype.getThumbnailSrc = function() {
	// Check if I have a thumbnail available in assets/thumbnails!
	// Otherwise return this default icon
	const filePath = "/uploads/" + this.get("id") + ".jpg";
	if (fs.existsSync("assets" + filePath)) {
		return filePath;
	}
	else {
		return "/icons/file.svg";
	}
};

Photo.prototype.getPreviewSrc = function() {
	// Check if I have a preview available in assets/previews!
	// Otherwise return null, to display a "no preview" message
	const filePath = "/uploads/" + this.get("id") + ".jpg";
	if (fs.existsSync("assets" + filePath)) {
		return filePath;
	}

	return null;
};

Photo.hasMany(Like);
Photo.hasMany(Comment);

module.exports = Photo;
