/**
 * Created by Administrator on 2017/2/23.
 * author weiotao.zhu
 * desc 果蜜中心model
 * modify 2017-03-09
 */
var commomServer = require('../models/common.server.model');
var config = require('config');
module.exports = {
    /**
     * 果蜜中心首页---个人信息
     * @param uId
     * @returns {*}
     */
   /* getuserCenter:function(req) {
        var url = config.apiUrl.pc+'zgOrderMain/getMainInfo';
        return commomServer.callPort(url,"GET",req);
    },*/

   getuserCenter:function(req) {
        req.body = {
            "pageParam":{
                "pageNo": req.body.pageNo,
                "pageSize":"10"
            },
            "payStatus":0
        };                                

        var url = config.apiUrl.pc+'zgOrderMain/getPersonalMainInfo';
        return commomServer.callPort(url,"GET",req);
    },

    /**
     * 多用户登录问题
     * @param orderId/uid
     * @returns {*}
     */
    validateOrderIfSameUserByOrderId:function(req) {
        var url = config.apiUrl.pc+'orderDetails/validateOrderIfSameUserByOrderId' ;
        return commomServer.callPort(url,"POST",req);
    },

    /**
     * 果蜜中心首页---待支付订单列表
     * @param uId
     * @returns {*}
     */
     getZgOrderList:function(req) {
        var url = config.apiUrl.pc+'zgOrderMain/getZgOrderNnpaidList';
        return commomServer.callPort(url,"POST",req);
     },

      /**
     * 果蜜中心首页---待支付补单
     * @param uId
     * @returns {*}
     */
     getZgOrderAppend:function(req) {
        var url = config.apiUrl.pc+'zgOrderAppend/getZgOrderAppendList';
        return commomServer.callPort(url,"POST",req);
     },



    /**
     * 果蜜中心首页---代收件发票收件
     * @param uId
     * @returns {*}
     */
    getZgExpressMailList:function(req) {
        var url = config.apiUrl.pc+'zgOrderMain/getZgExpressMailList';
        return commomServer.callPort(url,"POST",req);
    },



    /**
     * 果蜜中心首页---待确认订单
     * @param uId
     * @returns {*}
     */
    getZgOrderBeConfirmList:function(req) {
        var url = config.apiUrl.pc+'zgOrderMain/getZgOrderBeConfirmList';
        return commomServer.callPort(url,"POST",req);
    },


    /**
     * 果蜜中心首页---业务确认列表
     * @param uId
     * @returns {*}
     */
    getZgOrderBusinessList:function(req) {
        var url = config.apiUrl.pc+'zgOrderMain/getZgOrderBusinessList';
        return commomServer.callPort(url,"POST",req);
    },


    /**
     * 果蜜中心首页---审核未通过列表
     * @param uId
     * @returns {*}
     */
    getZgOrderUnPassList:function(req) {
        var url = config.apiUrl.pc+'zgOrderMain/getZgOrderUnPassList';
        return commomServer.callPort(url,"POST",req);
    },


    /**
     * 删除合同号
     * @param req
     * @returns {*}
     */
    deleteContracByConcode:function(req){
        var url = config.apiUrl.pc + 'zgOrderContract/deleteContracByConcode/'+req.body.contractCode;
        return commomServer.callPort(url, "get", req)
    },



    /**
     * 代收件官文收件确认收件
     * @param req
     * @returns {*}
     */
    Official:function(req){
        var url = config.apiUrl.pc + 'dispatch/updateExpress/'+req.body.id;
        return commomServer.callPort(url, "get", req)
    },

    /**
     * 代收件发票收件确认收件
     * @param req
     * @returns {*}
     */
    recipient:function(req){
        var url = config.apiUrl.pc + 'dispatch/updateBill/'+req.body.fId;
        return commomServer.callPort(url, "get", req)
    },


     /**
     * 删除订单补款
     * @param id  数据的id
     * @returns {*}
     **/
    delComfirmedData: function (req, params, res, next) {
        var url = config.apiUrl.pc + 'zgOrderAppend/deleteZgOrderAppendById/'+params;
        return commomServer.callPort(url, "GET", req);
    },
    getBalance: function (req, params, res, next) {
        var url = config.apiUrl.pc + 'balance/getBalanceByUid';
        return commomServer.callPort(url, "GET", req);
    },

    /**
     * 确认支付
     * @param {comcode:"合同号" orderid:"订单id"}
     * @returns {*}
     **/
    payDifference: function (req, res, next) {
        var url = config.apiUrl.pc + 'zgOrderAppend/appendPayOrders';
        return commomServer.callPort(url, "POST", req);
    },


    /**
     * 果蜜中心首页---未处理订单列表
     * @param uId
     * @returns {*}
     */
    getuserCenterOrders:function(req) {
        var url = config.apiUrl.pc+'zgOrderMain/getUntreatedZgOrderList';
        return commomServer.callPort(url,"POST",req);
    },
    getUserOrder:function(uId) {
        var url = config.apiUrl.pc+'productPrice/getProductPriceById/'+uId;
        return commomServer.callPort(url,"GET",{});
    },
    /**
     * 获取优惠券列表
     * @param uId
     * @returns {*}
     */
    getCoupon:function(req) {
        /*req.body= {
            "pageParam":{
                "pageNo": 1,
                "pageSize":"1000"
            }
        };*/
        req.body.pageParam.pageSize = 1000;
        var url = config.apiUrl.pc+'zgUserOtherAccount/getZgUserOtherAccountPageList';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 获取优惠券数量
     * @param uId
     * @returns {*}
     */
    getCouponNum:function(req) {
        var url = config.apiUrl.pc+'zgUserOtherAccount/getZgUserOtherAccountCount';
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 激活优惠券
     * @param uId
     * @returns {*}
     */
    getActivateCoupon:function(req) {
        var url = config.apiUrl.pc+'zgUserOtherAccount/saveZgUserOtherAccount/'+req.body.code;
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 删除优惠券
     * @param uId
     * @returns {*}
     */
    delCouponl:function(req) {
        var url = config.apiUrl.pc+'zgUserOtherAccount/updateZgUserOtherAccount';
        return commomServer.callPort(url,"PUT",req);
    },
    /**
     * 官文邮寄--tab的数字
     * @param uId
     * @returns {*}
     */
    getGuanwenNum:function(req) {
        var url = config.apiUrl.pc+'dispatch/getCount';
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 官文邮寄--已下发未邮寄
     * @param uId
     * @returns {*}
     */
    getGuanwen:function(req) {
        var url = config.apiUrl.pc+'dispatch/isMateDataList';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 官文邮寄--已下发未邮寄---下载
     * @param uId
     * @returns {*}
     */
    getDownNotMail:function(req) {
        var url = config.apiUrl.pc+'dispatch/downLoadFilesST';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 官文邮寄--已下发未邮寄---邮寄---获取数据
     * @param uId
     * @returns {*}
     */
    getGetMail:function(req) {
        var url = config.apiUrl.pc+'dispatch/getExpressData';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 官文邮寄--已下发未邮寄---邮寄---保存
     * @param uId
     * @returns {*}
     */
    getEditMail:function(req) {
        var url = config.apiUrl.pc+'dispatch/saveExpress';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 官文邮寄--已申请邮寄
     * @param uId
     * @returns {*}
     */
    getIsExpress:function(req) {
        var url = config.apiUrl.pc+'dispatch/getIsExpress';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 官文邮寄--已申请邮寄----查看详情
     * @param uId
     * @returns {*}
     */
    getSeekMail:function(req) {
        var url = config.apiUrl.pc+'dispatch/detailExpress/'+req.body.id;
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 官文邮寄--已申请邮寄----下载
     * @param uId
     * @returns {*}
     */
    getDownloadMail:function(req) {
        var url = config.apiUrl.pc+'dispatch/downLoadExpress/'+req.body.id;
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 官文邮寄--已申请邮寄----取消邮寄
     * @param uId
     * @returns {*}
     */
    getCancelMail:function(req) {
        var url = config.apiUrl.pc+'dispatch/cancelExpress/'+req.body.id;
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 官文邮寄--历史邮寄
     * @param uId
     * @returns {*}
     */
    getHistoryList:function(req) {
        var url = config.apiUrl.pc+'dispatch/historyList';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 获取基本信息
     * @param uId
     * @returns {*}
    */
    getBasicMsg:function(req) {
        var url = config.apiUrl.pc+'zgUserInfo/getZgCompanyList';
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 基本信息---企业信息--新增---保存
     * @param uId
     * @returns {*}
    */
    getComMsgAdd:function(req) {
        var url = config.apiUrl.pc+'zgUserInfo/saveZgUserInfo';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 基本信息---企业信息--修改---保存
     * @param uId
     * @returns {*}
    */
    getComMsg:function(req) {
        var url = config.apiUrl.pc+'zgUserInfo/updateZgCompany';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 获取基本信息--个人信息
     * @param uId
     * @returns {*}
    */
    getPersonalMsg:function(req) {
        var url = config.apiUrl.pc+'zgUserInfo/getZgUserList';
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 获取基本信息--个人信息---修改保存信息
     * @param uId
     * @returns {*}
    */
    getEditPersonalMsg:function(req) {
        var url = config.apiUrl.pc+'zgUserInfo/updateZgUser';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 获取主体信息---公司
     * @param uId
     * @returns {*}
     */
    getuserMainMsg1:function(req) {
        var url = config.apiUrl.pc+'zgUserBody/findZgCompanyBodyPageByParam';
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 获取主体信息---个人
     * @param uId
     * @returns {*}
     */
    getuserMainMsg2:function(req) {
        var url = config.apiUrl.pc+'zgUserBody/findZgBodyPageByParam';
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 主体信息---修改跳转页面，获取数据
     * @param uId
     * @returns {*}
     */
    getMainEdit:function(req) {
        var url = config.apiUrl.pc+'zgUserBody/getZgUserBodyById/'+req.params.id+'/'+req.params.btype;
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 获取主体信息---行业
     * @param uId
     * @returns {*}
     */
    getMainAdd:function(req) {
        var url = config.apiUrl.pc+'zgUserBody/selectIndustry';
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 主体信息---添加----保存---判断主体是否重复
     * @param uId
     * @returns {*}
     */
    getJudgeMsges:function(req) {
        var url = config.apiUrl.pc+'zgUserBody/checkBodyInfo';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 主体信息---添加----保存
     * @param uId
     * @returns {*}
     */
    getAddMainMsg:function(req) {
        var url = config.apiUrl.pc+'zgUserBody/saveZgUserBodyInfo';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 主体信息---编辑----保存
     * @param uId
     * @returns {*}
     */
    getEditMainMsg:function(req) {
        var url = config.apiUrl.pc+'zgUserBody/updateZgBody';
        return commomServer.callPort(url,"POST",req);
    },
    getmgMsg:function(uId) {
        var url = config.apiUrl.pc+'zgUserOtherAccount/getZgUserOtherAccountCount/'+uId;
        return commomServer.callPort(url,"GET",{});
    },
    getCounselor:function(uId) {
        var url = config.apiUrl.pc+'zgUserOtherAccount/getZgUserOtherAccountCount/'+uId;
        return commomServer.callPort(url,"GET",{});
    },
    /**
     * 获取地址列表
     * @param uId
     * @returns {*}
     */
    getAddress:function(req) {
        var url = config.apiUrl.pc+'zgRecipientInfo/getZgRecipientInfoList';
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 新增地址
     * @param uId
     * @returns {*}
     */
    addAddress:function(req) {
        var url = config.apiUrl.pc+'zgRecipientInfo/saveZgRecipientInfo';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 根据ID查询地址
     * @param uId
     * @returns {*}
     */
    sectIdAddressL:function(req) {
        var url = config.apiUrl.pc+'zgRecipientInfo/getZgRecipientInfoById/'+req.body.id;
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 删除地址,,编辑地址
     * @param uId
     * @returns {*}
     */
    editAddress:function(req) {
        var url = config.apiUrl.pc+'zgRecipientInfo/updateZgRecipientInfo';
        return commomServer.callPort(url,"PUT",req);
    },
    /**
     * 设置默认地址
     * @param uId
     * @returns {*}
     */
    setAddress:function(req) {
        var url = config.apiUrl.pc+'zgRecipientInfo/setDefault/'+req.body.id;
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 获取用户消息列表
     * @param uId
     * @returns {*}
     */
    getMyMsgList:function(req) {
        var url = config.apiUrl.pc+'zgMsgBodyInfo/findZgMsgBodyPageByParam';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 获取用户消息类型
     * @param uId
     * @returns {*}
     */
    getMyMsgKind:function(req) {
        var url = config.apiUrl.pc+'zgMsgBodyInfo/getZgMsgKind';
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 获取用户消息列表
     * @param uId
     * @returns {*}
     */
    setReadMsg:function(req) {
        var url = config.apiUrl.pc+'zgMsgBodyInfo/setRead';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 获取当前用户的顾问列表信息
     * @param uId
     * @returns {*}
     */
    getGwDetailByUid:function(req) {
        var userId = req.session.user!=null?JSON.parse(req.session.user).id:-1;
        var url = config.apiUrl.crm+'zgSeaPrivate/getGwDetailByUid/'+userId;
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 获取当前用户的顾问列表信息----头像和二维码
     * @param uId
     * @returns {*}
     */
    getGwImgUrl:function(req) {
        var url = config.apiUrl.base+'sysuser/loadImage/'+req.params.id ;
        return commomServer.callPort(url,"GET",req);
    },
    /**
     *获取用户优惠券列表
     */
    getZgUserOtherAccountByPcode:function(req,pcodes){
        var url = config.apiUrl.pc+'zgUserOtherAccount/getZgUserOtherAccountByPcode/'+pcodes;
        return commomServer.callPort(url,"GET",req);
    },

    /**
     * 获取当前用户的余额
     * @param uId
     * @returns {*}
     */
    getMoney:function(req) {
        var url = config.apiUrl.pc+'balance/getBalanceByUid' ;
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 获取当前用户---钱包列表
     * @param uId
     * @returns {*}
     */
    getMoneyList:function(req) {
        var url = config.apiUrl.pc+'/balance/findBalanceLogPageByParam';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 获取当前用户---钱包列表---提现
     * @param uId
     * @returns {*}
     */
    getRecharge:function(req) {
        var url = config.apiUrl.pc+'balance/updateBalance';
        return commomServer.callPort(url,"PUT",req);
    },
    /**
     * 我的钱包---充值---生成合同号
     * @param uId
     * @returns {*}
     */
    getUserContract:function(req) {
        var url = config.apiUrl.pc+'account/saveZgUserAccountRecharge';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 我的钱包---充值---回调前的判断是否是支付成功
     * @param uId
     * @returns {*}
     */
    judgePay:function(req) {
        var url =  config.apiUrl.pc+'account/getZgUserAccountRechargeByComcode/'+req.params.comcode;
        // var url =  'http://58.132.202.235:9000/pc-web-rest/'+'accountPay/getZgUserAccountRechargeByComcode/'+req.params.comcode;
        return commomServer.callPort(url,"GET",req);
    },

    /**
     *获取当前用户---钱包列表---充值---保存
     */
    rechargeBtn:function(req,pcodes){
        var url = config.apiUrl.pc+'account/recharge ';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 获取认证主体认证信息
     * @param uId
     * @returns {*}
     */
    getUserApprove:function(req,uid) {
        var url =  config.apiUrl.crm+'companyUser/getCrmCompanyUserByUid/'+uid;
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 公司主体认证信息----获取公司信息
     * @param uId
     * @returns {*}
     */
    getACompanyMsg1:function(req) {
        var url = 'http://saas-api.zhiguoguo.com/saas-web-rest/companyAPI/search';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 主体认证信息---保存
     * @param uId
     * @returns {*}
     */
    PutMainSave:function(req) {
        var url =  config.apiUrl.crm+'companyUser/updateCrmCompanyUser';
        return commomServer.callPort(url,"PUT",req);
    },
	/**
     *  获取待确认列表
     *  @param 合同号
	 */
	getConfirmedList: function (req,orderId) {
		var url =  config.apiUrl.crm+'zgOrderAppend/getZgOrderAppendByOrdercode/'+orderId;
		return commomServer.callPort(url,"GET",req);
	},
    /**
     *  基本信息---发票列表
     *  @param 合同号
     */
    getInvoice:function(req) {
        var url = config.apiUrl.pc+'zgUserBillInfo/getZgUserBillInfoList/' + req.body.mode;
        return commomServer.callPort(url,"GET",req);
    },
    /**
     *  基本信息---发票列表--根据ID查询
     *  @param 合同号
     */
    getInvoiceOne:function(req) {
        var url = config.apiUrl.pc+'zgUserBillInfo/getZgUserBillInfoListById/' + req.body.id;
        return commomServer.callPort(url,"GET",req);
    },
    /**
     *  基本信息---发票列表--新增
     *  @param 合同号
     */
    addInvoice:function(req) {
        var url = config.apiUrl.pc+'zgUserBillInfo/saveZgUserBillInfo';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     *  基本信息---发票列表--修改
     *  @param 合同号
     */
    editInvoice:function(req) {
        var url = config.apiUrl.pc+'zgUserBillInfo/updateZgUserBillInfo';
        return commomServer.callPort(url,"PUT",req);
    },
    /**
     *  基本信息---发票列表--删除
     *  @param 合同号
     */
    deleteInvoice:function(req) {
        var url = config.apiUrl.pc+'zgUserBillInfo/deleteZgUserBillInfoById/' + req.body.id;
        return commomServer.callPort(url,"DELETE",req);
    },
    /**
     *  基本信息---发票列表--设为默认
     *  @param 合同号
     */
    defaInvoice:function(req) {
        var url = config.apiUrl.pc+'zgUserBillInfo/updateZgUserBillInfoIsDefaultById';

        return commomServer.callPort(url,"PUT",req);
    },
    /**
     * 業務辦理--訂單信息
     * @param uId
     * @returns {*}
     */
    getOrderInfo:function(req) {
        var url = config.apiUrl.pc+'orderDetails/findBillInfOfOrderDetailsByOrderId/'+ req.body.orderId  ;
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 業務辦理--訂單信息
     * @param uId
     * @returns {*}
     */
    getOrderData:function(req) {
        var url = config.apiUrl.pc+'orderDetails/findBillInfOfOrderDetailsByOrderId/'+ req.params.orderId  ;
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 我的订单--新增合同发票
     * @param uId              addInvoiceContract
     * @returns {*}
     */
    addInvoiceContract:function(req) {
        var url = config.apiUrl.pc+'zgVatInfo/saveZgVatInfo' ;
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 我的订单--修改合同发票
     * @param uId              addInvoiceContract
     * @returns {*}
     */
    aInvoiceContract:function(req) {
        var url = config.apiUrl.pc+'zgVatInfo/updateZgVatInfo' ;
        return commomServer.callPort(url,"PUT",req);
    },
}