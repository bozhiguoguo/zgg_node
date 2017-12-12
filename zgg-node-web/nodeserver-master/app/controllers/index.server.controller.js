var indexModule = require("../models/index.server.model");
var config = require('config');
var co = require('co');
module.exports = {
	index: function(req, res, next) {
		var seo = config.seo.index;
		co(function *() {
			var _menu = yield indexModule.getMenu(req);
			var menu = yield _menu.json();
			var _getTotalRecommend = yield indexModule.getTotalRecommend(req);
			var getTotalRecommend = yield _getTotalRecommend.json();
			var _getTrHotSale = yield indexModule.getTrHotSale(req);
			var getTrHotSale = yield _getTrHotSale.json();
			var _getPtHotSale = yield indexModule.getPtHotSale(req);
			var getPtHotSale = yield _getPtHotSale.json();
			var _menuPicTr = yield indexModule.getMenuPic(req,{tagsCode:'pc-index-menu-tr'})
			var menuPicTr = yield _menuPicTr.json()
			var _menuPicCr = yield indexModule.getMenuPic(req,{tagsCode:'pc-index-menu-cr'})
			var menuPicCr = yield _menuPicCr.json()
			var _menuPicPt = yield indexModule.getMenuPic(req,{tagsCode:'pc-index-menu-pt'})
			var menuPicPt = yield _menuPicPt.json()
			var _menuPicOt = yield indexModule.getMenuPic(req,{tagsCode:'pc-index-menu-ht'})
			var menuPicOt = yield _menuPicOt.json()
			if(localStorage){
				menu.data.forEach(function (item) {
					switch(item.typecode){
						case 'tr':
							item.picObj = menuPicTr.data
							break;
						case 'cr':
							item.picObj = menuPicCr.data
							break;
						case 'pt':
							item.picObj = menuPicPt.data
							break;
						case 'ht':
							item.picObj = menuPicOt.data
							break;
					}

				})
				localStorage.setItem('menu',JSON.stringify(menu.data))
			}
			res.render('home/home',
				{
					seo:seo,
					hotProduct:getTotalRecommend.data,
					trHotSale:getTrHotSale.data,
					ptHotSale:getPtHotSale.data
				}
			);
		})
	},
    getMenuFn: function (req, res, next) {
        co(function *() {
            var _menu = yield indexModule.getMenu(req);
            var menu = yield _menu.json();
			var _menuPicTr = yield indexModule.getMenuPic(req,{tagsCode:'pc-index-menu-tr'})
			var menuPicTr = yield _menuPicTr.json()
			var _menuPicCr = yield indexModule.getMenuPic(req,{tagsCode:'pc-index-menu-cr'})
			var menuPicCr = yield _menuPicCr.json()
			var _menuPicPt = yield indexModule.getMenuPic(req,{tagsCode:'pc-index-menu-pt'})
			var menuPicPt = yield _menuPicPt.json()
			var _menuPicOt = yield indexModule.getMenuPic(req,{tagsCode:'pc-index-menu-ht'})
			var menuPicOt = yield _menuPicOt.json()
			menu.data.forEach(function (item) {
				switch(item.typecode){
					case 'tr':
						item.picObj = menuPicTr.data
						break;
					case 'cr':
						item.picObj = menuPicCr.data
						break;
					case 'pt':
						item.picObj = menuPicPt.data
						break;
					case 'ht':
						item.picObj = menuPicOt.data
						break;
				}

			})
			localStorage.setItem('menu',JSON.stringify(menu.data))

			req.res.json(menu.data);
        })
    }
};