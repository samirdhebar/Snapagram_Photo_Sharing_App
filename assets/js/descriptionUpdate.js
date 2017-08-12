/* globals $*/

$(document).ready(function() {

	let $description = $(".edit-button");

	$descriptionButtons.on("click", function(ev) {
		console.log("clicked");
		let $btn = $(ev.target);
		let photoId = $btn.data("photoid");


		$.ajax("/api/photo/" + photoId, {
			method: "POST",
			success: function() {
				$("[data-photoid=" + photoId + "]").remove();
				window.location="/photo/gallery";

			},
			error: function() {
				alert("Unable to update description");
			},
		});
	});
});
