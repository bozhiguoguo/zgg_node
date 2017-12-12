
var mainModule = require("../models/main.server.model");
module.exports = {
	index: function(req, res, next) {

		/*var _data = indexModule.getMenu();
		_data.then(function (data) {
			res.render('index',{'title':data})
		})*/

		var _menu = mainModule.getMenu();
		_menu.then(function (data) {
			res.render('main',{'title':data})
		})
	}
};