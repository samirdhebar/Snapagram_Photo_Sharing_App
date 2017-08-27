const sql = require("../utility/sql");
const Sequelize = require("sequelize");

const Tags = sql.define("tag", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
			type: Sequelize.STRING(100),
			unique: true,
			notNull: true,
	}
});


module.exports = Tags;
