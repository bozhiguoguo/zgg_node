/**
 * Created by Administrator on 2017/2/23.
 * author weiotao.zhu
 * desc 果蜜中心路由
 * modify 2017-03-09
 */
var express = require('express');
var userCenterRouter = express.Router();
var  userCenterController=require('../controllers/userCenter.server.controller.js');
/* GET users listing. */
// userRouter.get('/reg',userController.index);
userCenterRouter.get('/home',userCenterController.center);//果蜜中心
userCenterRouter.post('/validateOrderIfSameUserByOrderId',userCenterController.validateOrderIfSameUserByOrderId);//多用户登录问题
userCenterRouter.post('/personMainInfo',userCenterController.getPersonalMainInfo);//果蜜中心---个人信息展示
userCenterRouter.post('/homeOrderPage',userCenterController.homeOrderPage);//果蜜中心---订单的分页
userCenterRouter.post('/getZgOrderNnpaid',userCenterController.getZgOrderList);//用户中心---代付款订单
userCenterRouter.post('/getZgOrderAppend',userCenterController.getZgOrderAppend);//用户中心---待支付补单
userCenterRouter.post('/getZgOrderBeConfirmList',userCenterController.getZgOrderBeConfirmList);//用户中心---待确认订单
userCenterRouter.post('/getZgOrderBusinessList',userCenterController.getZgOrderBusinessList);//用户中心---业务确认
userCenterRouter.post('/getZgOrderUnPassList',userCenterController.getZgOrderUnPassList);//用户中心---审核未通过
userCenterRouter.post('/deleteContract',userCenterController.deleteContract);//用户中心---删除合同
userCenterRouter.get('/delComfirmedOrder/:orderId',userCenterController.delComfirmedData);//用户中心订单补款---删除订单
userCenterRouter.get('/getBalance',userCenterController.getBalance);//用户中心订单补款---删除订单
userCenterRouter.post('/payDifference',userCenterController.payDifference);//用户中心订单补款---去支付
userCenterRouter.post('/Official',userCenterController.Official);//用户中心---代收件官文收件确认收件
userCenterRouter.post('/OfficialDoc',userCenterController.OfficialDoc);//用户中心---代收件官文收件
userCenterRouter.post('/getZgExpressMailList',userCenterController.getZgExpressMailList);//用户中心---代收件发票收件
userCenterRouter.post('/recipient',userCenterController.recipient);//用户中心---代收件发票收件确认收件
userCenterRouter.get('/userOrder',userCenterController.order);//我的订单列表
userCenterRouter.get('/userCoupon',userCenterController.coupon);//优惠券列表
userCenterRouter.post('/userCouponCha',userCenterController.couponCha);//优惠券查询
userCenterRouter.post('/activateCoupon',userCenterController.activateCoupon);//激活优惠券
userCenterRouter.post('/delCoupon',userCenterController.delCoupon);//删除优惠券
userCenterRouter.get('/userGuanwen',userCenterController.Guanwen);//官文邮寄--已下发未邮寄
userCenterRouter.post('/userGuanwen',userCenterController.Guanwenes);//官文邮寄--已下发未邮寄---刷新--查询
userCenterRouter.get('/userGuanwenNum',userCenterController.GuanwenNum);//官文邮寄--已下发未邮寄---头部的数字
userCenterRouter.post('/userGuanwenRefer',userCenterController.GuanwenRefer);//官文邮寄--已下发未邮寄---查询
userCenterRouter.post('/userDownNotMail',userCenterController.DownNotMail);//官文邮寄--已下发未邮寄---下载
userCenterRouter.post('/userGetMail',userCenterController.GetMail);//官文邮寄--已下发未邮寄---邮寄---获取数据
userCenterRouter.post('/userEditMail',userCenterController.EditMail);//官文邮寄--已下发未邮寄---邮寄---保存邮寄
userCenterRouter.post('/userIsExpress',userCenterController.IsExpress);//官文邮寄--已申请邮寄
userCenterRouter.post('/userSeekMail',userCenterController.SeekMail);//官文邮寄--已申请邮寄----查看详情
userCenterRouter.post('/userDownloadMail',userCenterController.DownloadMail);//官文邮寄--已申请邮寄----下载
userCenterRouter.post('/userCancelMail',userCenterController.CancelMail);//官文邮寄--已申请邮寄----取消邮寄
userCenterRouter.post('/userHistoryList',userCenterController.historyList);//官文邮寄--历史邮寄
userCenterRouter.get('/userBasicMsg',userCenterController.basicMsg);//基本信息
userCenterRouter.post('/getZgUserBillInfoList',userCenterController.getInvoice);//基本信息--发票信息
userCenterRouter.post('/getZgUserBillInfoListById',userCenterController.getInvoiceOne);//基本信息--发票信息--根据ID查询
userCenterRouter.post('/saveZgUserBillInfo',userCenterController.addInvoice);//基本信息--发票信息---新增
userCenterRouter.put('/updateZgUserBillInfo',userCenterController.editInvoice);//基本信息--发票信息---修改
userCenterRouter.post('/deleteZgUserBillInfoById',userCenterController.deleteInvoice);//基本信息--发票信息---删除
userCenterRouter.put('/updateZgUserBillInfoIsDefaultById',userCenterController.defaInvoice);//基本信息--发票信息---设为默认----错误
userCenterRouter.post('/findBillInfOfOrderDetailsByOrderId',userCenterController.getOrderInfo);// 業務辦理--查询合同发票
userCenterRouter.post('/saveZgVatInfo',userCenterController.addInvoiceContract);//我的訂單---新增合同發票信息
userCenterRouter.put('/updateZgVatInfo',userCenterController.aInvoiceContract);//我的訂單---修改合同發票信息
userCenterRouter.post('/userComMsgAdd',userCenterController.ComMsgAdd);//基本信息---企业信息--新增---保存
userCenterRouter.post('/userComMsg',userCenterController.ComMsg);//基本信息---企业信息--修改---保存
userCenterRouter.get('/userPersonal',userCenterController.personalMsg);//基本信息---个人信息
userCenterRouter.post('/editPersonal',userCenterController.editPersonalMsg);//基本信息---个人信息---修改保存信息
userCenterRouter.get('/userMainMsg',userCenterController.mainMsg);//主体信息
userCenterRouter.get('/userMainAdd',userCenterController.mainAdd);//主体信息---添加-----跳转页面
userCenterRouter.post('/judgeMsg',userCenterController.judgeMsges);//主体信息---添加----主体信息-----保存--先判断主体是否重复
userCenterRouter.post('/addMainMsg',userCenterController.addMainMsgSave);//主体信息---添加----主体信息-----保存
userCenterRouter.get('/userMainEdit/:id/:btype',userCenterController.mainEdit);//主体信息---编辑-----获取数据，跳转页面
userCenterRouter.post('/editMainMsg',userCenterController.editMainMsg);//主体信息---编辑-----保存
userCenterRouter.get('/userMyMsg',userCenterController.myMsg);//消息列表
userCenterRouter.post('/userMyMsg',userCenterController.myMsges);//消息列表
userCenterRouter.get('/userCounselor',userCenterController.counselor);//专属顾问
userCenterRouter.get('/userCounselor/:id',userCenterController.counselorImg);//专属顾问---图片和二维码
userCenterRouter.get('/userCounselorByPcode/:pcode',userCenterController.counselorByPcode);//专属顾问---通过产品编号返回对应顾问
userCenterRouter.get('/addressList',userCenterController.addressList);
userCenterRouter.post('/addAddressList',userCenterController.addAddressList);//新增地址
userCenterRouter.post('/delAddressList',userCenterController.delAddressList);//删除地址
userCenterRouter.post('/editAddressList',userCenterController.editAddressList);//编辑地址
userCenterRouter.post('/sectIdAddress',userCenterController.sectIdAddress);//根据ID查询地址
userCenterRouter.post('/setdefault',userCenterController.setDefault);//设置为默认
userCenterRouter.post('/setReadMsg',userCenterController.setReadMsg);//设置为默认
userCenterRouter.get('/userWallet',userCenterController.getUserWallet);//我的钱包列表
userCenterRouter.post('/userWallet',userCenterController.getUserWallet_2);//我的钱包列表
userCenterRouter.post('/rechargePay',userCenterController.getRechargePay);//我的钱包---提现
userCenterRouter.get('/userRecharge',userCenterController.userRecharge);//用户充值
userCenterRouter.post('/userContract',userCenterController.userContract);//用户充值---生成合同号
userCenterRouter.post('/userRechargeBtn',userCenterController.userRechargeBtn);//用户充值---提交
userCenterRouter.get('/userRechargeBack/:comcode',userCenterController.userRechargeBack);//用户充值---提交---充值成功的回调
userCenterRouter.get('/payCallBackToJson/:comcode',userCenterController.userWeixinBack);//用户充值---提交---充值成功--微信--的回调--判断
userCenterRouter.get('/payCallBack/:comcode',userCenterController.userRechargeBack);//用户充值---提交---充值成功--微信--的回调--判断--成功之后跳转
userCenterRouter.post('/payCallBackToJson',userCenterController.userPayBack);//用户充值---提交---充值成功---的回调
userCenterRouter.get('/userApprove',userCenterController.userApprove);//获取认证主体认证信息
userCenterRouter.get('/personApprove',userCenterController.personApprove);//个人主体认证信息
userCenterRouter.get('/companyApprove',userCenterController.companyApprove);//公司主体认证信息
userCenterRouter.post('/userGetCompanyMsg',userCenterController.getACompanyMsg);//公司主体认证信息----获取公司信息
userCenterRouter.post('/mainSave',userCenterController.mainSave);//主体认证信息---保存

module.exports = userCenterRouter;