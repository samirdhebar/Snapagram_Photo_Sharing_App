const sql = require("../utility/sql");
const Sequelize = require("sequelize");
const Tags = require("./tags");
const Comment = require("./comments");
const Like = require("./likes");
const User = require("./users.js");


const fs = require("fs");


const Photos = sql.define("photo", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
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
		type: Sequelize.STRING(150),
	},
	filename: {
		type: Sequelize.STRING,
		notNull: true,
	},


});


Photos.prototype.getThumbnailSrc = function() {
	// Check if I have a thumbnail available in assets/thumbnails!
	// Otherwise return this default icon
	const filePath = "/thumbnails/" + this.get("filename") + ".jpg";
	// console.log(filePath);
	if (fs.existsSync("assets" + filePath)) {
		return filePath;
	}
	else {
		return '/app-images/photomatic.jpg';
	}
};

Photos.prototype.getPreviewSrc = function() {
	// Check if I have a preview available in assets/previews!
	// Otherwise return null, to display a "no preview" message
	const filePath = "/previews/" +  this.get("filename") + ".jpg";
	if (fs.existsSync("assets" + filePath)) {
		return filePath;
	}
	return null;
};

//
// Tags.belongsToMany(Photos, { through: "photos_tags" });
// Photos.belongsToMany(Tags, { through: "photos_tags" });
Photos.hasMany(Comment);
Photos.hasMany(Like);

module.exports = Photos;
