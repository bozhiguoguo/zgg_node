var commonModule = require("../models/common.server.model");
var fetch = require('node-fetch');
module.exports = {
	getMenu: function(req, res, next) {
		var _url = 'http://192.168.89.222:18080/base-web-rest/productType/getTypeTreeAndProduct';
		var _method = 'POST';
		var _headers = {'Content-Type': 'application/json', 'token': '244fb64dca9c4e56814a281cf435bfa1'}
		var _body = JSON.stringify({terminalsource: 'pc_ts', platform: 'zgg_pt'})
		return commonModule.callPort(_url, _method, _headers, _body)
	}
}