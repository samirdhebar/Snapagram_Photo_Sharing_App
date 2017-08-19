require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const connectSessionSequelize = require("connect-session-sequelize");
const User = require("./models/user.js");
const Photo = require("./models/photo.js");

const sql = require("./utility/sql.js");
// const snapagramRouter = require("./routes/snapagram.js");
const renderTemplate = require("./utility/renderTemplate.js");
const multer  = require('multer');
const upload = multer({ dest: 'assets/uploads/' });


const app = express();
const cookieSecret = process.env.COOKIE_SECRET || "dev";
const SessionStore = connectSessionSequelize(session.Store);

// Add middleware here //
const deserializeUser = require("./middleware/deserializeUser.js");
const requireLoggedIn = require("./middleware/requireLoggedIn.js");
const requiredLoggedOut = require("./middleware/requireLoggedOut.js");

// ********************* //
// *** Configuration *** //
// ********************* //
app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(cookieSecret));
app.use(session({
	secret: cookieSecret,
	store: new SessionStore({ db: sql }),
}));
app.use(deserializeUser);




// ************** //
// *** Routes *** //
// ************** //

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/signup", function(req,res) {
	res.render("signup");
});

app.post("/signup", function(req,res) {
	User.signup(req).then(function(user) {
		if (user) {
			// Changed from "/test" //
			res.redirect("/upload");
		}
		else {
			res.redirect("signup");
		}
	}).catch(function(error) {
		if (!req.body.username) {
			res.redirect("signup");
		}
		else if (!req.body.password) {
			res.redirect("signup");
		}
		else {
			console.log("You had a error: ", error);
		}
	});
});

app.get("/login", function(req,res) {
	res.render("login");
});

app.post("/login", function(req,res) {
	User.login(req,res).then(function(user) {
		if (user) {
			// Changed from "/test" //
			res.redirect("upload");
		} else {
			res.redirect("404");
		}
	});
});

app.get("/upload", requireLoggedIn, function(req, res) {
	res.render("upload");
});

app.post("/upload", requireLoggedIn, upload.single('file'), function(req,res,next) {
	console.log("Uploading function is working!");
	Photo.make(req).then(function() {
		res.redirect("/photos");
	});
});

app.get("/test", function(req,res) {
	User.findById(req.session.userid)
	.then(function(user) {
	res.render("test", {
		name: user.username
	});
	});
});


app.get("/photos", function(req,res) {
	Photo.findAll({ limit: 10, order: [['updatedAt', 'DESC']]}).then(function(photos) {
		console.log(photos);
		res.render("photos", {
			photos: photos,
		});
	});
});

// How do I verify if a comment is attached to the right photo?
app.post("/photos", function(req, res) {
	Comment.update().then(function(comments) {
		res.render("photos", {
			comments: comments,
		});
	});
});


app.get("/logout", function(req,res) {
	req.session.destroy()
	.then(function() {
		res.redirect("/");
	});
});

app.all("*", function(req, res) {
	res.render("404");
});

// *************** //
// *** Startup *** //
// *************** //
sql.sync().then(function() {
	console.log("Database is looking good");
	const port = process.env.PORT || 9000;

	app.listen(port, function() {
		console.log("Listening at http://localhost:" + port);
	});
});
