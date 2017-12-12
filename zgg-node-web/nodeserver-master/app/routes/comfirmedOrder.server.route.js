/**
 * Created by Administrator on 2017/2/21.
 * desc 用户待确认订单
 * modify 2017-0620
 */
var express = require('express');
var comfirmedOrderRouter = express.Router();
var comfirmedOrderController  =require('../controllers/comfirmedOrder.server.controller.js');
/* GET users listing. */
// userRouter.get('/reg',userController.index);
comfirmedOrderRouter.get('/',comfirmedOrderController.index);
comfirmedOrderRouter.get('/delComfirmedOrder/:orderId',comfirmedOrderController.delComfirmedData);
comfirmedOrderRouter.get('/getBalance',comfirmedOrderController.getBalance);
comfirmedOrderRouter.get('/OrderMoneyInfo/:orderId',comfirmedOrderController.OrderMoneyInfo);
comfirmedOrderRouter.post('/payDifference',comfirmedOrderController.payDifference);
module.exports = comfirmedOrderRouter;