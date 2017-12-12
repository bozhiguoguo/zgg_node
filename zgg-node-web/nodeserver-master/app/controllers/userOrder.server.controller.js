/**
 * Created by Administrator on 2017/2/21.
 * author zhengqiang.liu
 * desc 用户订单业务处理
 * modify 2017-03-04
 */
var userOrderMoldel = require('../models/userOrder.server.model.js');
// var phantom = require('phantom');
// var pdf = require('pdfkit');
var fs = require('fs');
var co = require('co');
var config = require('config');
var fetch = require('node-fetch');
module.exports = {
    /**
     * 我的订单
     * @param req
     * @param res
     * @param next
     **/
    index: function (req, res, next) {
        var seo = config.seo.detail;
        co(function *() {
             var userOrderList = yield userOrderMoldel.getUserOrderList(req);
             var userOrderJson = yield userOrderList.json();
            if(req.body.keyWord || req.body.pageNo){
               res.json(userOrderJson);
            }else{
                res.render('userCenter/userOrder',{userOrder:JSON.stringify(userOrderJson),seo:seo});
            }
        });
    },
    /**
     * 一键委托
     * @param req
     * @param res
     * @param next
     */
    entrust:function (req, res, next) {
        co(function *() {
            var entrustOrderList = yield userOrderMoldel.entrust(req);
            var entrustOrderJson = yield entrustOrderList.json();
            res.json(entrustOrderJson);
        });
    },
    /**
     * 显示确认合同界面
     * @param req
     * @param res
     * @param next
     */
    showOrderContract:function (req, res, next) {
        co(function *() {
            var entrustOrderList = yield userOrderMoldel.contractFile(req);
            var entrustOrderJson = yield entrustOrderList.json();
            res.json(entrustOrderJson);
        });
    },
    /**
     * 确认合同
     * @param req
     * @param res
     * @param nex
     */
    confirmContract:function (req, res, nex) {
        co(function *() {
            var entrustOrderList = yield userOrderMoldel.confirmContract(req);
            var entrustOrderJson = yield entrustOrderList.json();
            res.json(entrustOrderJson);
        });
    },
    /**
     * 删除合同号
     * @param req
     * @param res
     * @param nex
     */
    deleteContract:function (req, res, nex) {
        co(function *() {
            var entrustOrderList = yield userOrderMoldel.deleteContracByConcode(req);
            var entrustOrderJson = yield entrustOrderList.json();
            res.json(entrustOrderJson);
        });
    },
    /**
     *获取合同状态
     * @param req
     * @param res
     * @param next
     */
    getContracStatus:function (req,res,next) {
        co(function *() {
            var entrustOrderList = yield userOrderMoldel.statusContracByConcode(req);
            var entrustOrderJson = yield entrustOrderList.json();
            res.json(entrustOrderJson);
        });
    },
    /**
     * 解锁合同
     * @param req
     * @param res
     * @param next
     */
    cancelContract:function (req,res,next) {
        co(function *() {
            var entrustOrderList = yield userOrderMoldel.cancelContracByConcode(req);
            var entrustOrderJson = yield entrustOrderList.json();
            res.json(entrustOrderJson);
        });
    },
    //合同回显
    showConfirmContract:function (req,res,next) {
        co(function *() {
            var entrustOrderList = yield userOrderMoldel.getContracByConcode(req);
            var entrustOrderJson = yield entrustOrderList.json();
            var templateUrl = 'userCenter/confirmContract';  //默认商标,版权
            switch(req.params.ptype){
                case "ht":
                    templateUrl = "userCenter/confirmContract_ht"; //开放平台
                    break;
                case "pt":
                    templateUrl = "userCenter/confirmContract_pt"; //专利　
                    break;
                case "la":
                    templateUrl = "userCenter/confirmContract_law"; //法律　
                    break;
                case "ht_ent_0001":
                    templateUrl = "userCenter/confirmContract_ht_01"; //高新培育
                    break;
                case "ht_ent_0002":
                    templateUrl = "userCenter/confirmContract_ht_02"; //高新企业认定（果益版）
                    break;
                case "ht_ent_0003":
                    templateUrl = "userCenter/confirmContract_ht_03"; //高新企业认定（保过版）
                    break;
                case "ht_ent_0004":
                    if(entrustOrderJson.data.addNewHtProductCode == "ht_ent_0004_01"){
                        templateUrl = "userCenter/confirmContract_ht_04_01"; //地方高新申报   中关村高新  深圳高新
                    }else if(entrustOrderJson.data.addNewHtProductCode == "ht_ent_0004_02"){
                        templateUrl = "userCenter/confirmContract_ht_04_02"; //地方高新申报  南京入库高新 深圳入库高新
                    }
                    break;
            }

            //返回成功
            if(entrustOrderJson.success){
                res.render(templateUrl,{layout:false, contractData:JSON.stringify(entrustOrderJson.data)});
            }else{
                //失败则返回错误信息，根据错误信息提示用户
                res.render(templateUrl,{layout:false, contractData:JSON.stringify(entrustOrderJson.message)});
            }
        });
    },
    /**
     * 合同下载
     * @param req
     * @param res
     * @param next
     */
    contractFile:function (req,res,next) {
        co(function *() {
            var entrustOrderList = yield userOrderMoldel.downContracByConcode(req);
            var entrustOrderJSON = yield entrustOrderList.json();
            res.send(entrustOrderJSON);
        });
    },
    /**
     * 下载合同
     * @param req
     * @param res
     * @param next
     */
    downContractByPathConcode:function (req,res,next) {
        var url = config.apiUrl.pc + '/base/getfile/getContractFile?path='+unescape(req.params.path)+'&concode='+req.params.Concode;
        var _headers = {'Content-Type': 'application/json'}
        if(req.session.user){
            var user = JSON.parse(req.session.user);
            _headers.token = user.token
        }
        fetch(url,{method:'get',headers:_headers,body:{}})
            .then(function(rest) {
                var stream  = rest.body.pipe(fs.createWriteStream('public/uploads/认购合同('+req.params.Concode+').pdf'));
                stream.on('finish', function () {
                    res.download('public/uploads/认购合同('+req.params.Concode+').pdf');
                });
        });
    },
    /**
     * 获取已退款数据列表
      * @param req
     * @param res
     * @param next
     */
    getZgOrderRefundList:function (req,res,next) {
        co(function *() {
            var getZgOrderRefundList = yield userOrderMoldel.getZgOrderRefundList(req);
            var getZgOrderRefundListJSON = yield getZgOrderRefundList.json();
            res.send(getZgOrderRefundListJSON);
        });
    },
    /**
     *合同用户验证接口方式
     * @param req
     * @param res
     * @param next
     */
    validateSameContractIfSameUser:function (req,res,next) {
        co(function *() {
            var getZgOrderRefundList = yield userOrderMoldel.validateSameContractIfSameUser(req);
            var data = yield getZgOrderRefundList.json()
            res.send(data);
        });
    },
	/**
     *  获取变更信息
	 */
	getModifyInfo:function (req, res, next) {
		co(function *() {
			var _Promise = yield userOrderMoldel.getModifyInfo(req,req.params.orderCode);
			var _json = yield _Promise.json();
			res.send(_json);
		});
	}

}