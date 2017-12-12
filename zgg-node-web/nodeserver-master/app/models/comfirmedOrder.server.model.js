/**
 * Created by Administrator on 2017/2/21.
 * author zhengqiang.liu
 * desc 用户订单model
 * modify 2017-03-04
 */
var commomServer = require('../models/common.server.model');
var config = require('config');
module.exports = {
    /**
     * 获取订单列表
     * @param req
     * @returns {*}
     */
    getConfirmedList: function (req, params , res , next) {

        var url = config.apiUrl.pc + 'zgOrderAppend/getZgOrderAppendByUid/' + params;
        return commomServer.callPort(url, "GET", req);
    },
    /**
     * 删除待确认订单
     * @param id  数据的id
     * @returns {*}
     **/
    delComfirmedData: function (req, params, res, next) {
        var url = config.apiUrl.pc + 'zgOrderAppend/deleteZgOrderAppendById/'+params;
        return commomServer.callPort(url, "GET", req);
    },
	getBalance: function (req, params, res, next) {
		var url = config.apiUrl.pc + 'balance/getBalanceByUid';
		return commomServer.callPort(url, "GET", req);
	},
	/**
	 * 获取待确认订单信息
	 * @param id  数据的id
	 * @returns {*}
	 **/
	OrderMoneyInfo: function (req, params, res, next) {
		var url = config.apiUrl.pc + 'zgOrderAppend/getZgOrderAppendById/'+params;
		return commomServer.callPort(url, "GET", req);
	},
    /**
	 * 确认支付
	 * @param {comcode:"合同号" orderid:"订单id"}
	 * @returns {*}
	 **/
    payDifference: function (req, res, next) {
		var url = config.apiUrl.pc + 'zgOrderAppend/appendPayOrders';
		return commomServer.callPort(url, "POST", req);
	},
}