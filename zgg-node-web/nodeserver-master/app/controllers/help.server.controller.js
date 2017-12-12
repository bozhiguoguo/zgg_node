/**
 * Created by Administrator on 2017/2/21.
 */
var config = require('config');
var co = require('co');
module.exports = {
    index: function (req, res, next) {
        var seo = config.seo.detail;
        res.render('help/index',{seo:seo});
    },
    /*
    *   318产品的操作手册
    * */
    trademark_318: function (req, res, next) {
        var seo = config.seo.detail;
        res.render('help/trademark_318',{seo:seo});
    }
}