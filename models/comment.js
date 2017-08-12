const Sequelize = require("sequelize");
const sql = require("../utility/sql.js");
const User = require("./user.js");
const Like = require("./like.js");

const Comment = sql.define("comment", {
	id: {
		type: Sequelize.INTEGER,
		notNull: true,
		primaryKey: true,
		autoIncrement: true,
	},
	text: {
		type: Sequelize.STRING,
		notNull: true,
	},
});

Comment.update = function(req) {
	return Comment.create({
		text: req.body.text,
	})
	.then(function(comment){
		req.session.id = comment.id;
		return comment;
	}).catch(function(error){
		console.log(error);
	});
};

Comment.hasMany(Like);

module.exports = Comment;
