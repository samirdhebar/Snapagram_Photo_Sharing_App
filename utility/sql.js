const sequelize = require("sequelize");

let sql;

if (process.env.DATABASE_URL) {
	sql = new sequelize(process.env.DATABASE_URL);
}
else {
	sql = new sequelize({
		database: process.env.DB_NAME,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST || "localhost",
		port: process.env.DB_PORT || 5432,
		dialect: "postgres",
		logging: false,
	});
}
module.exports = sql;
