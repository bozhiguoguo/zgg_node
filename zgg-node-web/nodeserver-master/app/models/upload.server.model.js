var commonModule = require("../models/common.server.model");
var fetch = require('node-fetch');
var config = require('config');

module.exports = {
	/*
	 *  上传文件
	 *
	 * */
	uploadFile: function (req, res, next, formData) {
		var _url = config.apiUrl.pc+'fileUploadController/uploadFile';
		// var _url = 'http://192.168.89.84:8080/pc-web-rest/fileUploadController/uploadFile';
		if(typeof  formData.files != 'undefined'){
			_url = config.apiUrl.pc+'fileUploadController/uploadPatPic';
			// _url = 'http://192.168.89.84:8080/pc-web-rest/fileUploadController/uploadPatPic'
		}
		var _method = "POST";
		return commonModule.uploadfile(_url, _method, req,formData)
	},
	uploadfiletoNane: function (req, res, next, formData) {
		var _url = config.apiUrl.pc+'fileUploadController/uploadFile';
		if(typeof  formData.files != 'undefined'){
			_url = config.apiUrl.pc+'fileUploadController/uploadPatPic'
		}
		var _method = "POST";
		return commonModule.uploadfiletoNane(_url, _method, req,formData)
	}
}