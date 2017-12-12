/**
 * Created by Administrator on 2017/2/21.
 */
var config = require('config');
var co = require('co');
module.exports = {
    /**
     * 商标查询工具列表展示
     * @param req
     * @param res
     * @param next
     */
    index: function (req, res, next) {
        var seo = config.seo.detail;
        res.render('about/index', {pageName:req.params.pageName,seo:seo});
    }
}