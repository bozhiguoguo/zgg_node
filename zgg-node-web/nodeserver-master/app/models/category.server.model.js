var commonModule = require("../models/common.server.model");
var fetch = require('node-fetch');
var config = require('config');

module.exports = {
	getMenu: function(req, res, next) {
		var _url = config.apiUrl.base+'productType/getTypeTreeAndProduct';
		var _method = 'POST';
		req.body = {terminalsource: 'pc_ts', platform: 'zgg_pt'};
		return commonModule.callPort(_url, _method, req)
	},
	/*
	*   根据code获取数据
	*	distrbchannel:分销渠道 ，固定值zgg_dc
	*	terminalsource:终端来源，固定值pc_ts
	*	platform:所属平台，固定值zgg_ptØ
	*   tagsCode：标签code  pc-trChannel-hotSale-trreg
	*   "pageParam":{"pageNo":"1","pageSize":"3"}
	* */
	getHotSale: function(req, params, res, next) {
		var _url = config.apiUrl.base+'productPrice/selectProductPageByParam';
		var _method = 'POST';
		req.body = {
			distrbchannel:'zgg_dc',
			terminalsource:'pc_ts',
			platform:'zgg_pt',
			tagsCode:params.tagsCode,
			typecode1:params.typeCode1,
			typecode2:params.typecode2,
			pageParam:{"pageNo":"1","pageSize":params.pageParam.pageSize}
		};
		return commonModule.callPort(_url, _method, req)
	},


	/**
	 * 通用流程---上传资料---保存提交
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */
	postUpdataTexts: function (req, res, next) {
		var _url = config.apiUrl.pc + 'zgPublicProductBusiness/saveZgPublicProductBusiness';
		return commonModule.callPort(_url, 'POST' ,req)
	},
	/*
	* 获取小项首级数据
	*
	* */
	getFirstList: function (req, res, next) {
		var _url = config.apiUrl.admin + 'zgTrademarkOne/getZgTrademarkOneList';
		var _method = 'GET';
		return commonModule.callPort(_url, _method ,req)
	},

	/*
	* 获取小项次级数据
	*
	* */
	getCategorySubList: function (req, params, res, next) {
		var _url = config.apiUrl.admin + 'zgTrademarkTwo/getZgTrademarkTwoListByPid/'+params;
		var _method = 'GET';
		return commonModule.callPort(_url, _method, req)
	},

	/*
	* 获取小项底层数据
	*
	* */
	getCategoryEndList: function (req, params, res, next) {
		var _url = config.apiUrl.admin + 'zgTrademarkThree/getZgTrademarkThreeListByPid/'+params;
		var _method = 'GET';
		return commonModule.callPort(_url, _method, req)
	},
	/*
	* 	根据关键字获取小项
	*
	* */
	searchItem: function (req, params, res, next) {
		var _url = config.apiUrl.admin + 'zgTrademarkItem/getZgTrademarkItemList';
		var _method = 'POST';
		req.body = {
			desc: params
		}
		return commonModule.callPort(_url, _method, req)
	},

	/*
	* 	业务委托办理
	*
	* */
	entrust: function (req, params, res, next) {
		var _url = config.apiUrl.pc + 'zgOrder/entrust';
		var _method = "POST";
		var _Params = {
			orderId: params
		}
		req.body = {
			orderIdVoList: []
		}
		req.body.orderIdVoList.push(_Params);
		return commonModule.callPort(_url, _method, req)

	},
	/*
	* 	取消业务委托
	*
	* */
	cancelEntrust: function (req, params, res, next) {
		var _url = config.apiUrl.pc + 'zgOrder/cancelEntrust/'+params;
		var _method = "PUT";

		req.body = {

		}

		return commonModule.callPort(_url, _method, req)

	},
	/*
	* 	获取订单详情
	*
	* */
	getOrderDetail: function (req, params, res, next) {
		var _url = config.apiUrl.pc + 'orderDetails/findOrderDetailsByOrderId/'+ params;
		var _method = "GET";
		return commonModule.callPort(_url, _method, req)
	},
	/*
	*  获取业务详情
	*
	* */
	getbusinessDetail: function (req, params, res, next) {
		var _url = config.apiUrl.pc + 'zgOrderTrademark/zgOrderTrademarkDetail/'+ params;
		var _method = "GET";
		return commonModule.callPort(_url, _method, req)
	},
	/*
	*  获取订单主体
	* */
	getOrderBody: function (req, params, res, next) {
		var _url = config.apiUrl.pc + 'zgOrder/getUserBodyByOrderId/'+ params;
		var _method = "GET";
		return commonModule.callPort(_url, _method, req)
	},
	/*
	*  获取订单下载文件
	* */
	downloadFile: function (req, params,pcode) {
		var _url = config.apiUrl.pc + 'zgOrderTrademark/getZgOrderTrademarkRelatedFiles/'+ params;
		if(pcode == 'tr_reg_11'){
			_url = config.apiUrl.pc+ 'zgOrderTrademark/getZgOrderTrademarkFilesByOrderId/'+ params;
		}
		var _method = "GET";
		return commonModule.callPort(_url, _method, req)
	},
	/*
	 *  获取订单318上传信息
	 * */
	getApplyInfoRegTrademarkByOrderId: function (req, params, res, next) {
		// config.apiUrl.pc = "http://192.168.89.200:9000/pc-web-rest/";
		var _url = config.apiUrl.pc + 'zgOrderTrademark/getApplyInfoRegTrademarkByOrderId/'+req.params.orderId;
		return commonModule.callPort(_url, "GET", req)
	},
	/*
	*  获取订单318上传信息
	* */
	downloadText: function (req, params, res, next) {
		// config.apiUrl.pc = "http://192.168.89.200:9000/pc-web-rest/";
		var _url = config.apiUrl.pc + 'zgOrderTrademark/getApplyInfoRegTrademarkByOrderId/'+req.body.orderId;
		return commonModule.callPort(_url, "GET", req)
	},

	/*
	*  根据产品ID获取所有的节点
	*
	* */
	getAllNodes: function (req, params, res, next) {
		var _url = config.apiUrl.base + 'wfProductFlow/getDispNodeListByPcode/'+ params;
		var _method = "GET";
		return commonModule.callPort(_url, _method, req)
	},
	/*
	 *  根据orderId获取当前节点
	 *
	 * */
	getAtPresentNodes: function (req, params, res, next) {
		var _url = config.apiUrl.base + 'wfFlowInstance/getCurrentNode/'+ params;
		var _method = "GET";
		return commonModule.callPort(_url, _method, req)
	},

	/*
	 *  根据orderId获取当前节点
	 *
	 * */
	getCurrentNode: function (req, res, next) {
		var _url = config.apiUrl.base + 'wfFlowInstance/getCurrentNode/' + req.body.orderId
		var _method = "GET";
		return commonModule.callPort(_url, _method, req)
	},

	/*
	* 	根据订单号获取附加商品
	*
	* */
	getOrderFee: function (req, params, res, next) {
		var _url = config.apiUrl.pc + 'zgOrder/getOrderFeeChargedsByOrdercode/' + params;
		var _method = "GET";
		return commonModule.callPort(_url, _method, req);
	},
	/*
	* 	通用流程----根据订单号获取---下载模版
	*
	* */
	getCommonStencil: function (req, params, res, next) {
		var _url = config.apiUrl.pc + 'zgPublicProductBusiness/getZgPublicProductBusinessByOrderId/' + params;
		var _method = "GET";
		return commonModule.callPort(_url, _method, req);
	},
	/*
	* 	保存提交商标业务
	*
	* */

	trSave: function (req, params, res, next) {
		// config.apiUrl.pc = "http://192.168.89.136:8080/";
		var _url = config.apiUrl.pc + 'zgOrderTrademark/saveZgOrderTrademark';
		// var _url ='http://192.168.89.136:8080/zgOrderTrademark/saveZgOrderTrademark';
		var _method = "POST";
		return commonModule.callPort(_url, _method, req);
	},
	/*
	* 	318商标业务--下一步或保存
	*
	* */

	nextSave: function (req, res, next) {
		// config.apiUrl.pc = "http://192.168.89.200:9000/pc-web-rest/";
		var _url = config.apiUrl.pc + 'zgOrderTrademark/saveRegTrademark';
		return commonModule.callPort(_url, "POST", req);
	},

	/*
	* 根据PID查询二级数据
	*
	* */
	getcategoryByPid: function (req, params, res, next) {
		var _url = config.apiUrl.admin + 'zgTrademarkTwo/getZgTrademarkTwoVoById/'+params;
		var _method = "GET";
		return commonModule.callPort(_url, _method, req);
	},

	/*
	* 根据ID查询一级数据
	*
	* */

	getcategoryById: function (req, params, res, next) {
		var _url = config.apiUrl.admin + 'zgTrademarkOne/getZgTrademarkOneByCode/'+params;
		var _method = "GET";
		return commonModule.callPort(_url, _method, req);
	},

	/*
	* 	客户确认
	* */

	customSure: function (req, params, res, next) {
		// config.apiUrl.pc = "http://192.168.89.200:9000/pc-web-rest/";
		var _url = config.apiUrl.pc + 'zgOrderTrademark/orderConfirm';
		return commonModule.callPort(_url, "POST", req);
	},
	/*
	*  客户确认节点返回修改
	*
	* */
	goBack: function (req, params, res, next) {
		var _url = config.apiUrl.pc + 'zgOrderTrademark/modifyZgOrderTrademarkFlow/'+params;
		// var _url ='http:192.168.89.136:8080/zgOrderTrademark/saveZgOrderTrademark';
		var _method = "PUT";
		return commonModule.callPort(_url, _method, req);
	},
	/*根据申请号查询匹配*/
	getOrderInfo: function (req,params,res,next) {
		var _url = config.apiUrl.pc + 'zgOrderRebut/getOrderInfoByApplyCode/' + req.body.num;
		return commonModule.callPort(_url, "GET", req);
	},
	/*根据申请号查询匹配成功提交*/
    saveData: function (req,params,res,next) {
        var _url = config.apiUrl.pc + 'zgOrderRebut/saveOrUpdateRebut';
        return commonModule.callPort(_url, "POST", req);
    },
	/*驳回复审业务详情*/
    getRejectDetail: function (req,params,res,next) {
        var _url = config.apiUrl.pc + 'zgOrderRebut/getOrderRebutDetailsByOrderId/'+ req.body.orderId;
        return commonModule.callPort(_url, "GET", req);
    },
	/*驳回复审相关资料下载*/
    getRejectFiles: function (req,params,res,next) {
		var _url = config.apiUrl.pc + 'zgOrderRebut/getZgOrderRebutFilesByOrderId/'+ req.body.orderId;
		return commonModule.callPort(_url, "GET", req);
	},
	/*驳回复审相关资料下载*/
    getFilesConfirm: function (req,params,res,next) {
		var _url = config.apiUrl.pc + 'zgOrderRebut/rebutBCFilesConfirm';
		return commonModule.callPort(_url, "POST", req);
	},
	/*大项里面搜索小项*/
	getZgTrademarkThreeList: function (req,params,res,next) {
		var _url = config.apiUrl.admin + 'zgTrademarkThree/getZgTrademarkThreeList/';
		return commonModule.callPort(_url, "POST", req);
	},
	/*设置默认值*/
	selectTrademarkItemsByCategory: function (req,params,res,next) {
		///zgTrademarkItemsTemplate/selectTrademarkItemsByCategory/
		var _url = config.apiUrl.admin + 'zgTrademarkItemsTemplate/selectTrademarkItemsByCategory/' + req.body.category;
		return commonModule.callPort(_url, "GET", req);
	},
}