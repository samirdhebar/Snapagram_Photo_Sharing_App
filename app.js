require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectSessionSequelize = require('connect-session-sequelize');


const sql = require('./utility/sql.js');
const deserializeUserMW = require('./middleware/deSerialize.js');
const renderUserTemp = require("./utility/renderauth.js");

const app = express();
//References app.use(cookieParser...) and app.us(session...) below
const cookieSecret = process.env.COOKIE_SECRET || "dev";
const SessionStore = connectSessionSequelize(session.Store);

const photoRoutes = require("./Routes/photos.js");
const userRoutes = require("./Routes/user.js");
const apiRoutes = require("./Routes/api");



app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(cookieSecret));
app.use(session({
	secret: cookieSecret,
	store: new SessionStore({ db:sql }),
}));
app.use(deserializeUserMW);




app.get("/", function (req, res) {
	res.render("pages/home");
});


app.use("/api", apiRoutes);
app.use("/user", userRoutes);
app.use("/photo", photoRoutes);
app.get("*", function(req, res) {
	renderUserTemp(res,"404");
});


sql.sync().then(function() {
	console.log("Database synced");
	const port = process.env.PORT || 9000;

	app.listen(port, function() {
		console.log("Listening at http://localhost:" + port);
	});
});
