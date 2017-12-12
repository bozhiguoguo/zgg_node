var commonModule = require("../models/common.server.model");
var fetch = require('node-fetch');
var config = require('config');

module.exports = {
	/**
	 *根据订单id查询专利业务详情
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 **/
	getPatent: function(req, res, next) {
		var _url = config.apiUrl.pc+'zgPatentBaseinfo/findPatentDetailsByOrderId/'+req.params.orderId;
		return commonModule.callPort(_url, "GET", req)
	},
	/**
	 * 根据订单ID获取当前业务流程节点
	 * @param req
	 * @param res
	 * @param next
	 **/
	getCurrentFlowNode:function (req, res, next){
		var _url = config.apiUrl.base+'wfFlowInstance/getCurrentNode/'+req.params.orderId;
		return commonModule.callPort(_url, "GET", req)
	},
	/**
	 *根据订单id查询专利详细信息
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */
	getPatentDetail: function(req, res, next) {
		var _url = config.apiUrl.pc+'orderDetails/findOrderDetailsByOrderId/'+req.params.orderId;
		return commonModule.callPort(_url, "GET", req)
	},
	/**
	 *保存活修改专利
	 */
	saveOrUpdatePatent:function (req,res,next) {
		var _url = config.apiUrl.pc+'zgPatentBaseinfo/saveOrUpdatePatent';
		return commonModule.callPort(_url, "POST", req)
	},
	/**
	 *根据订单id查询专利详细信息
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */
	findPatentFiles: function(req,orderId) {
		//config.apiUrl.pc = 'http://192.168.89.200:8080/'
		var _url = config.apiUrl.pc+'zgPatentBaseinfo/findPatentFiles/'+orderId;
		return commonModule.callPort(_url, "GET", req)
	},
}