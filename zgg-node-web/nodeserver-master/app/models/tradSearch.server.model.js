/**
 * Created by Administrator on 2017/2/21.
 */
var commomServer = require('../models/common.server.model');
var config = require('config');
module.exports = {
    /**
     * 获取登录用户顾问\客服IM
     * @param name
     * @returns {*}
     */
    getSearch:function(req) {
        var url = config.apiUrl.admin+'zgTrademarkItemInfo/getZgTrademarkItemInfoByCode/'+req.params.uId;
        // console.log(url);
        return commomServer.callPort(url,"GET",req);
    },

    /**
     * 获取二级分类
     * @param id
     * @returns {*}
     */
    getZgTrademarkTwoListByPid:function(req) {
        var url = config.apiUrl.admin+'zgTrademarkTwo/getZgTrademarkTwoListByPid/'+req.params.uId;
        return commomServer.callPort(url,"GET",req);
    },



    /**
     * 获取登录用户顾问\客服IM
     * @param pid 二级分类id
     * @returns {*}
     */
    getZgTrademarkThreeListByPid:function(req) {
        var url = config.apiUrl.admin+'zgTrademarkThree/getZgTrademarkThreeListByPid/'+req.params.pId;
        return commomServer.callPort(url,"GET",req);
    },

    /**
     * 获取查询商品所属列表
     * @param name
     * @returns {*}
     */
    searchTRName:function(req) {
        var url = config.apiUrl.pc+'zgTrademarkThree/getZgTrademarkThreeListByNameOrCode';
        return commomServer.callPort(url,"POST",req);
    },

}