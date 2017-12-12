/**
 * Created by Administrator on 2017/2/21.
 */
var config = require('config');
var co = require('co');
module.exports = {
    index: function (req, res, next) {
        var seo = config.seo.detail;
        res.render('cooperation/index',{seo:seo});
    },
	getAdded: function (req, res, next) {
        var seo = config.seo.detail;
        res.render('cooperation/addedIRS',{seo:seo});
    }
}