/**
 * Created by Administrator on 2017/2/21.
 * desc  待确认订单处理
 * modify 2017-0620
 */
var comfirmedOrderMoldel = require('../models/comfirmedOrder.server.model.js');
// var phantom = require('phantom');
// var pdf = require('pdfkit');
var fs = require('fs');
var co = require('co');
var config = require('config');
var fetch = require('node-fetch');
module.exports = {
    /**
     * 待确认订单
     * @param req
     * @param res
     * @param next
     **/
    index: function (req, res, next) {
        /*var seo = config.seo.detail;
        co(function *() {
             var userOrderList = yield confirmedOrderMoldel.getUserOrderList(req);
             var userOrderJson = yield userOrderList.json();
            if(req.body.keyWord || req.body.pageNo){
               res.json(userOrderJson);
            }else{
                res.render('userCenter/userOrder',{userOrder:JSON.stringify(userOrderJson),seo:seo});
            }
        });*/
	    var seo = config.seo.index;
	    var uid = !!req.session.user?JSON.parse(req.session.user).id:'';
	    co(function *() {
		    var reqData = yield comfirmedOrderMoldel.getConfirmedList(req , uid);
		    var jsonData = yield reqData.json();
		    res.render('userCenter/confirmedOrder',{seo:seo,jsonData:JSON.stringify(jsonData.data)});
	    });


    },

    /**
     * 删除待确认订单
     * @param req
     * @param res
     * @param next
     */
    delComfirmedData:function (req, res, next) {
        co(function *() {
            var _promise = yield comfirmedOrderMoldel.delComfirmedData(req, req.params.orderId);
            var _result = yield _promise.json();
            res.json(_result);
        });
    },
	/**
     * 获取用户余额
     *
	 */
	getBalance:function (req, res, next) {
		co(function *() {
			var _promise = yield comfirmedOrderMoldel.getBalance(req);
			var _result = yield _promise.json();
			res.json(_result);
		});
	},
	/**
	 * 获取待确认订单信息
	 *
	 */
	OrderMoneyInfo:function (req, res, next) {
		co(function *() {
			var _promise = yield comfirmedOrderMoldel.OrderMoneyInfo(req, req.params.orderId);
			var _result = yield _promise.json();
			res.json(_result);
		});
	},
    /**
	 * 确认支付
	 *
	 */
    payDifference:function (req, res, next) {
		co(function *() {
			var _promise = yield comfirmedOrderMoldel.payDifference(req);
			var _result = yield _promise.json();
			res.json(_result);
		});
	},

}