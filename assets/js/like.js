/* globals $ */

$(document).ready(function() {

	let $likebuttons = $(".photo-like");

	$likebuttons.on("click", function(ev) {
		let $btn = $(ev.target);
		let photoId = $btn.data("photoId");

		$.ajax("/photo/photo/" + photoId + "/like", {
			method: "POST",
			success: function() {
				$btn.addClass("isLiked");
			},
			error: function() {
				alert("Unable to like Post");
				$btn.removeClass("isLiked");
			},
		});
	});
});
