require("dotenv").config();
const express = require ("express");
const router = express.Router();
const renderTemplate = require("../util/renderTemplate.js");
const BodyParser = require("body-parser");
const multer = require("multer");

router.get("/", function(req, res) {
	renderTemplate(res, "home", "Home", {
	});
});


router.post("signup", function(req,res) {

});

module.exports = router;
