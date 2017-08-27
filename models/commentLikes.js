const Sequelize = require("sequelize");
const sql = require("../utility/sql");



const commentLikes = sql.define("commentLike", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
});

module.exports = commentLikes;
