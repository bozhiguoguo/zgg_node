/**
 * Created by Administrator on 2017/4/25.
 * author weiotao.zhu
 * desc 专题
 * modify 2017-04-25
 */
var express = require('express');
var specialRouter = express.Router();
var  specialController=require('../controllers/special.server.controller.js');
specialRouter.get('/three',specialController.threeSpecial);//3周年专题活动
specialRouter.get('/threeTel',specialController.getThreeSpecialTel);//3周年专题活动---获取用户号码
specialRouter.get('/coupon',specialController.couponSpecial);//优惠券专题活动
specialRouter.post('/getTelCode',specialController.getTelCode);//优惠券专题活动---获取用户手机验证码
specialRouter.post('/quickReg',specialController.quickReg);//快速注册 校验短信code
specialRouter.post('/getCoupon',specialController.getCoupon);//快速注册 校验短信code
specialRouter.get('/getOpenActivity',specialController.getOpenActivity);//成都开业活动
specialRouter.post('/getRegCoupon',specialController.getRegCoupon);//成都开业活动---注册成功--获取优惠券
module.exports = specialRouter;