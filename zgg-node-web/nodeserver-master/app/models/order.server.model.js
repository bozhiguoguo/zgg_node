/**
 * Created by Administrator on 2017/2/21.
 */
var commomServer = require('../models/common.server.model');
var config = require('config');
module.exports = {
    /**
     * 立即购买
     * @param data
     * @returns {*}
     */
    buyNow:function(data) {
        var url = config.apiUrl.pc+'zgProductShoppinglist/buyNow';
        return commomServer.callPort(url,"POST",data);
    },
    /**
     * 创建订单合同号
     * @param data
     * @returns {*}
     **/
    createContract:function (req) {
        var url = config.apiUrl.pc+'zgOrder/saveZgOrder';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 订单支付
     * @param data
     * @returns {*}
     **/
    orderPay:function (req) {
        var url = config.apiUrl.pc+'pay/getPay';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 订单支付回选
     * @param data
     * @returns {*}
     */
    endPay:function (req) {
       // config.apiUrl.pc = 'http://58.132.202.235:9000/pc-web-rest/'
        var url = config.apiUrl.pc+'user/pay/endPay/'+req.params.contractNo;
        return commomServer.callPort(url,"get",req);
    },
    /**
     * 订单支付状态
     * @param data
     * @returns {*}
     */
    getPayStatus:function (req) {
        var url = config.apiUrl.pc+'pay/getPayStatus/'+req.params.contractNo;
        return commomServer.callPort(url,"get",req);
    },
    /**
     * 线下支付
     * @param req
     * @returns {*}
     */
    offlinePay:function (req) {
        var url = config.apiUrl.pc+'offpay/offlinePay';
        return commomServer.callPort(url,"post",req);
    },
    /**
     * 线下支付
     * @param req
     * @returns {*}
     */
    // offlinePay:function (req) {
    //     var url = config.apiUrl.pc+'account/recharge ';
    //     return commomServer.callPort(url,"post",req);
    // },
    /**
     * 余额支付
     * @param req
     * @returns {*}
     */
    balancePay:function (req) {
        // var url = config.apiUrl.pc+'offpay/balancePay';//之前测试余额支付接口
        var url = config.apiUrl.pc+'account/payOrders';//最新的余额支付接口
        return commomServer.callPort(url,"post",req);
    },
    /**
     * 通过订单号获取重新支付数据
      * @param req
     */
    getPayInfoByContractCode:function (req) {
        var url = config.apiUrl.pc+'zgOrder/getPayInfoByContractCode/'+req.params.contractCode;
        return commomServer.callPort(url,"get",req);
    },
    /**
     *重新支付时修改
     **/
    updateOrderPayInfo:function (req) {
        var url = config.apiUrl.pc+'zgOrder/updateOrderPayInfo/';
        return commomServer.callPort(url,"PUT",req);
    }
}