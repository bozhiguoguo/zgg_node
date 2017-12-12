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
	*  获取首页热销产品
	*	distrbchannel:分销渠道 ，固定值zgg_dc
	*	terminalsource:终端来源，固定值pc_ts
	*	platform:所属平台，固定值zgg_pt
	*   tagsCode：标签code  pc-index-totalRecommend
	*   "pageParam":{"pageNo":"1","pageSize":"4"}
	* */
	getTotalRecommend: function(req, res, next) {
		var _url = config.apiUrl.base+'productPrice/selectProductPageByParam';
		var _method = 'POST';
		req.body = {
			distrbchannel:'zgg_dc',
			terminalsource:'pc_ts',
			platform:'zgg_pt',
			tagsCode:'pc-index-totalRecommend',
			pageParam:{"pageNo":"1","pageSize":"4"}
		};
		return commonModule.callPort(_url, _method, req)
	},

	/*
	 *  获取商标热销产品
	 *	distrbchannel:分销渠道 ，固定值zgg_dc
	 *	terminalsource:终端来源，固定值pc_ts
	 *	platform:所属平台，固定值zgg_pt
	 *  tagsCode：标签code  pc-trChannel-hotSale
	 *  "pageParam":{"pageNo":"1","pageSize":"4"}
	 * */

	getTrHotSale: function(req, res, next) {
		var _url = config.apiUrl.base+'productPrice/selectProductPageByParam';
		var _method = 'POST';
		req.body = {
			distrbchannel:'zgg_dc',
			terminalsource:'pc_ts',
			platform:'zgg_pt',
			tagsCode:'pc-index-trRecommend',
			pageParam:{"pageNo":"1","pageSize":"3"}
		};
		return commonModule.callPort(_url, _method, req)
	},

	/*
	 *  获取专利热销产品
	 *	distrbchannel:分销渠道 ，固定值zgg_dc
	 *	terminalsource:终端来源，固定值pc_ts
	 *	platform:所属平台，固定值zgg_pt
	 *  tagsCode：标签code  pc-ptChannel-hotSale
	 *  "pageParam":{"pageNo":"1","pageSize":"4"}
	 * */


	getPtHotSale: function(req, res, next) {
		var _url = config.apiUrl.base+'productPrice/selectProductPageByParam';
		var _method = 'POST';
		req.body = {
			distrbchannel:'zgg_dc',
			terminalsource:'pc_ts',
			platform:'zgg_pt',
			tagsCode:'pc-index-ptRecommend',
			pageParam:{"pageNo":"1","pageSize":"3"}
		};
		return commonModule.callPort(_url, _method, req)
	},
	getMenuPic: function (req, params, res, next) {
		var _url = config.apiUrl.base+'productPrice/selectProductPageByParam';
		var _method = 'POST';
		req.body = {
			distrbchannel:'zgg_dc',
			terminalsource:'pc_ts',
			platform:'zgg_pt',
			tagsCode:params.tagsCode,
			pageParam:{"pageNo":"1"}
		};
		return commonModule.callPort(_url, _method, req)
	}
}