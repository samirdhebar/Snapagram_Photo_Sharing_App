const Sequelize = require("sequelize");
const sql = require("../utility/sql");


const Comment = sql.define("comment", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	text: {
		type: Sequelize.STRING,
		notNull: true,
	},
});

module.exports = Comment;
