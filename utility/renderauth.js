function renderUserTemp(res, page, title, args, links, error) {
	return res.render("usertemp", {
		page: page,
		title: title,
		args: args,
		error: error,
	});
}

module.exports = renderUserTemp;
