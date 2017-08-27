function renderTemplate(res, title, page, args, links, error) {
	return res.render("template", {
		page: page,
		title: title
		args: args,
	});
}

module.exports = renderTemplate;
