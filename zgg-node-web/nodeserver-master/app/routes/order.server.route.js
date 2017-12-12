/**
 * Created by Administrator on 2017/2/21.
 * author zhengqiang.liu
 * desc 订单路由
 * modify 2017-02-24
 */
var express = require('express');
var orderRoute = express.Router();
var  orderController=require('../controllers/order.server.controller');
/* GET users listing. */
orderRoute.post('/buyNow',orderController.buyNow);
orderRoute.get('/buyNow',orderController.showBuyNow);
orderRoute.post('/contract',orderController.createContract);
orderRoute.post('/orderPay',orderController.orderPay);
orderRoute.get('/payCallBack/:contractNo',orderController.payCallBack);
orderRoute.post('/payCallBack',orderController.otherPayCallBack);
orderRoute.get('/payCallBackToJson/:contractNo',orderController.payCallBackToJson);
orderRoute.get('/account',orderController.getAccount);
orderRoute.post('/account',orderController.account);
orderRoute.post('/offlinePay',orderController.offlinePay);
orderRoute.get('/getCouponToPcode/:pcodes',orderController.getCouponToPcode);
orderRoute.post('/balancePay',orderController.balancePay);
orderRoute.get('/repayment/:contractCode/:orderId',orderController.showRepayment);
orderRoute.post('/updateOrderPayInfo',orderController.updateOrderPayInfo);
orderRoute.post('/getPayInfoByContractCode',orderController.getPayInfoByContractCode);  //获取订单重新支付数据

module.exports = orderRoute;