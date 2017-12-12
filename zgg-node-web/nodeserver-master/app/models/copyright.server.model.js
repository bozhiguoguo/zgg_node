/**
 * Created by Administrator on 2017/3/13.
 */
var commonModule = require("../models/common.server.model");
var fetch = require('node-fetch');
var config = require('config');
module.exports = {
    /**
     *根据订单id查询版权详情
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    getCr: function(req, res, next) {
        var _url = config.apiUrl.pc+'zgcopyright/findCopyrightDetailsByOrderId/'+req.params.orderId;
        return commonModule.callPort(_url, "GET", req)
    },
    /**
     *根据订单id查询版权详情
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    getCres: function(req, res, next) {
        var _url = config.apiUrl.pc+'/orderDetails/findOrderDetailsByOrderId/'+req.params.orderId;
        return commonModule.callPort(_url, "GET", req)
    },
    /**
     *增加客户信息---保存---暂存
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    copyrightMsg: function(req, res, next) {
        var _url = config.apiUrl.pc+'zgcopyright/saveOrUpdateCopyright';
        return commonModule.callPort(_url, "POST", req)
    },
    /**
     *客户确认
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    copyrightKhAffirm: function(req, res, next) {
        var _url = config.apiUrl.pc+'zgcopyright/confirmedOrder';
        return commonModule.callPort(_url, "POST", req)
    },
}