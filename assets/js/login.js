/* globals $ */
$(document).ready(function() {

	let $loginForm = $('login-form');
	let $username = $loginForm.find("[name = username]");
	let $password = $loginForm.find("[name = password]");

	$loginForm.on("submit", function(ev) {
		ev.preventDefault();

		let username = $username;
		let password = $password;

		if (!username) {
			return alert("Username is required!");
		}

		if (!password) {
			return alert("Password is required!");
		}

		$.ajax("/api/login", {
			method: "POST",
			data: {
				username: username,
				password: password,
			},
			success: function() {
				window.location = "/";
			},
			error: function() {
				alert("Signup failed. Have you filled in all the fields correctly?");
			},
		});
	});
});
