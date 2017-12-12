var fetch = require('node-fetch');
var FormData = require('form-data');
var request = require('request');
var config =require('config');
module.exports = {
	/*
	*  调用接口
	*  req:{}
	* */
	callPort: function(url,method,req) {
		var _headers = {'Content-Type': 'application/json'}
		if(req.session.user){
			var user = JSON.parse(req.session.user);
			_headers.token = user.token;
		}
		if(typeof req.cookies.token != "undefined") {
			_headers.token = req.cookies.token;
		}
		var _body = JSON.stringify(req.body);
		return fetch(url,{method:method,headers:_headers,body:_body});
	},
	/*
	* 文件上传
	*
	* */
	uploadfile: function (url,method,req ,formdata) {
		var _headers = {};
		if(req.session.user){
			var user = JSON.parse(req.session.user);
			_headers.token = user.token;
		}
		var form = new FormData();
		form.append('userId',formdata.userId);
		if(formdata.orderId){
			form.append('orderId',formdata.orderId);
			form.append('stepType',formdata.stepType);
			form.append('stepId',formdata.stepId);
			form.append('fname',formdata.fname);
		}
		/*form.append('file',formdata.file);*/
		//var destination = typeof formdata.file != 'undefined'?formdata.file[0].destination.split('public')[1]:formdata.files[0].destination.split('public')[1];
		if(typeof  formdata.files != 'undefined'){
			form.append('files', request(config.site+'uploads/'+encodeURI(formdata.files[0].filename)));
		}else{
			form.append('fType',formdata.fType);
			form.append('file', request(config.site+'uploads/'+encodeURI(formdata.file[0].filename)));
		}
		console.log(form);
		console.log('-----------------------logs-----------------------');
		return fetch(url,{method:method,headers:_headers,body:form})
	},
	/**
	 * 上传文件保存文件名与服务器一致
	 * @param url
	 * @param method
	 * @param req
	 * @param formdata
     * @returns {Promise}
     */
	uploadfiletoNane: function (url,method,req ,formdata) {
		var _headers = {};
		if(req.session.user){
			var user = JSON.parse(req.session.user);
			_headers.token = user.token;
		}
		var form = new FormData();
		form.append('userId',formdata.userId);
		if(formdata.orderId){
			form.append('orderId',formdata.orderId);
			form.append('stepType',formdata.stepType);
			form.append('stepId',formdata.stepId);
			form.append('fname',formdata.fname);
		}
		/*form.append('file',formdata.file);*/
		var destination = formdata.file[0].destination.split('public')[1];
		if(typeof  formdata.files != 'undefined'){
			form.append('files', request(config.site+destination+"/"+encodeURI(formdata.files[0].filename)));
		}else{
			form.append('fType',formdata.fType);
			form.append('file', request(config.site+destination+"/"+encodeURI(formdata.file[0].filename)));
		}
		return fetch(url,{method:method,headers:_headers,body:form});
	}
}