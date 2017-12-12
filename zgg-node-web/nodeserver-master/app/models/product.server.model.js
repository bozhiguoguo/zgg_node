var commomServer = require('../models/common.server.model');
var config = require('config');
module.exports = {
    /**
     * 通过产品ID 获取产品详情基本信息
     * @param pId
     * @returns {*}
     */
    getProductById: function (req) {
        var url = config.apiUrl.base + 'productPrice/getProductPriceById/' + req.params.pId;
        return commomServer.callPort(url, "GET", req);
    },
    /**
     * 通过产品ID 获取产品描述内容
     * @param pId
     * @returns {*}
     */
    getProductDescById: function (pId,req) {
        var url = config.apiUrl.base + 'pDescItem/getPDescItemListByPid/' + pId;
        return commomServer.callPort(url, "GET", req);
    },
    /**
     * 通过产品ID 获取产品描述内容
     * @param pId
     * @returns {*}
     */
    findCmsProductRecommendPageByParam: function (pId,req) {
        var data = {
            "distrbchannel": "zgg_dc",
            "terminalsource": "pc_ts",
            "platform": "zgg_pt",
            "productId": pId,
            "pageParam": {"pageNo": "1", "pageSize": "2"}
        }
        req.body = data
        var url = config.apiUrl.base + 'cmsProductRecommend/findCmsProductRecommendPageByParam';
        return commomServer.callPort(url, "POST", req);
    },
    /**
     * 获取当前用户顾问信息
     * @param pId
     * @param req
     * @returns {*}
     */
    getGwDetailByUid: function (req) {
        req.body = data
        var userId = req.session.user!=null?req.session.user:-1;
        var url = config.apiUrl.crm + 'zgSeaPrivate/getGwDetailByUid/'+userId;
        return commomServer.callPort(url, "GET", req);
    },
    /**
     * 获取详情页热门商品
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    getHotRecommend: function(typeCode, req) {
        var _url = config.apiUrl.base+'productPrice/selectProductPageByParam';
        var _method = 'POST';
        req.body = {
            distrbchannel:'zgg_dc',
            terminalsource:'pc_ts',
            platform:'zgg_pt',
            tagsCode:typeCode,
            pageParam:{"pageNo":"1","pageSize":"4"}
        };
        return commomServer.callPort(_url, _method, req)
    },
    /**
     * 获取用户的顾问信息
     **/
    getGwList: function (req) {
        req.body = data
        var url = config.apiUrl.pc + '/im/getImTokenInfo/';
        return commomServer.callPort(url, "GET", req);
    },
    /**
     * 买卖商标咨询顾问
     * @param req
     */
    informGw: function (req) {
        var _url = config.apiUrl.pc+'trademarkTrade/informGw';
        var _method = 'POST';
        return commomServer.callPort(_url, _method, req);
    },
    /**
     * 查看用户是否有资格购买法律产品体验包
     * @param req
     */
    getBuyLawProductAuth: function (req) {
        var _url = config.apiUrl.pc+'zgProductShoppinglist/getBuyLawProductAuth';
        var _method = 'GET';
        return commomServer.callPort(_url, _method, req);
    }
}