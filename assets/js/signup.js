/* globals $ */
$document.ready(function() {

    let $signupForm = $('signup-form');
    let $username = $signupForm.find("[name = username]");
    let $password = $signupForm.find("[name = password]");

$signupForm.on("submit", function(ev) {
    ev.preventDefault();

    let username = $username;
    let password = $password;

    if(!username) {
        return alert("Username is required!");
    }

    if (!password) {
        return alert("Password is required!");
    }

    $.ajax("/api/signup", {
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
