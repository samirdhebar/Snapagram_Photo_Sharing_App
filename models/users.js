const sql = require("../utility/sql");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const fs = require("fs-extra");

const Photos = require("./photos");
const Comment = require("./comments");
const path = require("path");
const Jimp = require("jimp");
const BodyParser = require("body-parser");

function hashUserPassword(user) {
	if (user.password) {
		return bcrypt.genSalt()
			.then(function(salt) {
				console.log(salt);
				return bcrypt.hash(user.password, salt);
			}).then(function(hashedPW) {
				user.password = hashedPW;
			});
	}
}


const User = sql.define("user", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	username: {
		type: Sequelize.STRING(100),
		notNull: true,
		unique: true,
	},
	password: {
		type: Sequelize.STRING(1000),
		notNull: true,
	},
}, {
	hooks: {
		beforeCreate: hashUserPassword,
		beforeUpdate: hashUserPassword,
	},
});

User.hasMany(Photos);
User.hasMany(Comment);
Comment.belongsTo(User);
Photos.belongsTo(User);

User.signup = function(req) {
	return User.create({
			username: req.body.username,
			password: req.body.password,
		})
		.then(function(user) {
			req.session.userid = user.id;
			return user;
		});
};


User.login = function(req) {
	return User.findOne({
			where: {
				username: req.body.username,
			},
		})
		.then(function(user) {
			if (user) {
				return user.comparePassword(req.body.password).then(function(valid) {
					if (valid) {
						req.session.userid = user.get("id");
						return user;
					}
					else {
						throw new Error("Incorrect password");
					}
				});
			} else {
				throw new Error("Username not found. Have you signed up for an account?");
			}
		});
};


User.prototype.comparePassword = function(pw) {
	return bcrypt.compare(pw, this.get("password"));
};


User.prototype.upload = function(file, req, res) {
	let photo;



		return this.createPhoto({
			id: file.id,
			size: file.size,
			originalName: file.originalname,
			mimeType: file.mimetype,
			description: req.body.description,
			filename: file.filename,
		})

		.then(function(p) {
			photo = p;
			const ext = path.extname(file.originalname);
			const dest = "assets/files/" + file.filename + ext;
			return fs.copy(file.path, dest);
		})
		.then(function() {
			// If I'm an image, we should generate thumbnail
			// and preview images as well.
			if (file.mimetype.includes("image/")) {
				return Jimp.read(file.path).then(function(img) {
					img.quality(80).resize(Jimp.AUTO, 400);
					return img.write("assets/previews/" + file.filename + ".jpg");
				})
				.then(function(img) {
					img.cover(400, 300);
					return img.write("assets/thumbnails/" + file.filename + ".jpg");
				});
			}
		})
		.then(function() {
			return photo;
		});

};

module.exports = User;
