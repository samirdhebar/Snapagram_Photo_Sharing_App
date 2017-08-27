const Sequelize = require("sequelize");
const sql = require("../utility/sql");

const Like = sql.define("like", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	// userid: {
	// 	type: Sequelize.STRING,
	// },
});


module.exports = Like;
