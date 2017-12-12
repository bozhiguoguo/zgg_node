/**
 * Created by Administrator on 2017/2/21.
 * author zhengqiang.liu
 * desc 用户订单路由
 * modify 2017-03-04
 */
var express = require('express');
var userOrderRouter = express.Router();
var  userOrderController=require('../controllers/userOrder.server.controller.js');
/* GET users listing. */
// userRouter.get('/reg',userController.index);
userOrderRouter.get('/',userOrderController.index);
userOrderRouter.post('/',userOrderController.index);
userOrderRouter.post('/validateSameContractIfSameUser',userOrderController.validateSameContractIfSameUser);//合同用户验证接口方式
userOrderRouter.post('/getZgOrderRefundList',userOrderController.getZgOrderRefundList);//获取订单列表
userOrderRouter.post('/entrust',userOrderController.entrust);//是否委托
userOrderRouter.post('/confirmContract',userOrderController.confirmContract);//合同页面---确认合同
userOrderRouter.post('/deleteContract',userOrderController.deleteContract);
userOrderRouter.get('/getContracStatus/:Concode',userOrderController.getContracStatus);
userOrderRouter.get('/cancelContract/:Concode',userOrderController.cancelContract);//解锁合同
userOrderRouter.get('/downContractFile/:ptype/:Concode',userOrderController.contractFile);
userOrderRouter.get('/showOrderContract/:ptype/:Concode',userOrderController.showConfirmContract);//订单----展示合同页面
userOrderRouter.get('/downContractByPathConcode/:path/:Concode',userOrderController.downContractByPathConcode);
userOrderRouter.get('/getModifyInfo/:orderCode',userOrderController.getModifyInfo);
module.exports = userOrderRouter;