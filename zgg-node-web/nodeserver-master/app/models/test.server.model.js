module.exports = {
	/*index: function(req, res, next) {
		res.render('index',{'title':'HTML'})
	}*/
	test: function (req, res, next) {
		return ({'aa': 'bb', 'title': 'test'})
	}
}