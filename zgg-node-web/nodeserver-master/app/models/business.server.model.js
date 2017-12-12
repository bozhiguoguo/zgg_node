/**
 * Created by Administrator on 2017/3/15.
 */
var commonModule = require("../models/common.server.model");
var fetch = require('node-fetch');
var config = require('config');
module.exports = {
    /*
     *  根据产品ID获取所有的节点
     *
     * */
    getAllNodes: function (req, params, res, next) {
        var _url = config.apiUrl.base + 'wfProductFlow/getDispNodeListByPcode/'+ params;
        var _method = "GET";
        return commonModule.callPort(_url, _method, req);
    },
    /*
     *  根据orderId获取当前节点
     *
     * */
    getAtPresentNodes: function (req, params, res, next) {
        var _url = config.apiUrl.base + 'wfFlowInstance/getCurrentNode/'+ params;
        var _method = "GET";
        return commonModule.callPort(_url, _method, req);
    },
    /*
     *  获取订单主体
     * */
    getOrderBody: function (req, params, res, next) {
        var _url = config.apiUrl.pc + 'zgOrder/getUserBodyByOrderId/'+ params;
        var _method = "GET";
        return commonModule.callPort(_url, _method, req);
    },
    /*
     *  获取跟踪服务
     * */
    getServer: function (req, params,str, res, next) {
        var _url = config.apiUrl.pc + 'dispatch/getDispatchDetail/'+ params+'/'+str;
        var _method = "GET";
        return commonModule.callPort(_url, _method, req);
    },
    /*
     *  订单信息明细
     * */
    getOrderMsg: function (req, params, res, next) {
        var _url = config.apiUrl.pc + 'zgOrder/getOrderFeeChargedsByOrdercode/'+ params;
        var _method = "GET";
        return commonModule.callPort(_url, _method, req);
    },
    /**
     *根据订单id查询专利详细信息
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    findPatentFiles: function(req,orderId,pcode) {
        //config.apiUrl.pc = 'http://192.168.89.200:8080/'
        var _url = config.apiUrl.pc+'zgcopyright/findCopyrightFiles/'+orderId+'/'+pcode;
        return commonModule.callPort(_url, "GET", req)
    },
    /**
     *根据订单code查询所选附加商品
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    getOrderFeeChargeds: function(req,orderCode) {
        var _url = config.apiUrl.pc+'zgOrder/getOrderFeeChargedsByOrdercode/'+orderCode;
        return commonModule.callPort(_url, "GET", req)
    }

}