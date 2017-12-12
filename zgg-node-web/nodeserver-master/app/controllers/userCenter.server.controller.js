/**
 * Created by Administrator on 2017/2/23.
 * author weiotao.zhu
 * desc 果蜜中心controllers
 * modify 2017-03-09
 */
var userCenterMoldel = require('../models/userCenter.server.model.js');
var productMoldel = require('../models/product.server.model.js');
var config = require('config');
var co = require('co');
module.exports = {
    center: function (req,res, next) {
        var seo = config.seo.index;
        co(function *() {
            req.body={ pageParam:{ pageNo:"1", pageSize:"10"},payStatus:'0'};
            // 个人信息展示
            //var users = yield userCenterMoldel.getuserCenter(req);
            //var uData = yield users.json();

            //待支付订单列表
           // req.body={ pageParam:{ pageNo:"1", pageSize:"10"},payStatus:'0'};
            var userp = yield userCenterMoldel.getZgOrderList(req);
            var pData = yield userp.json();

            //待支付补单列表
            /*var userT = yield userCenterMoldel.getZgOrderAppend(req);
            var tData = yield userT.json();*/

            //待确认订单
            //var userC = yield userCenterMoldel.getZgOrderBeConfirmList(req);
            //var cData = yield userC.json();

            //业务确认列表
            /*var userB = yield userCenterMoldel.getZgOrderBusinessList(req);
            var bData = yield userB.json();*/

            //审核未通过列表
            /*var userN = yield userCenterMoldel.getZgOrderUnPassList(req);
            var nData = yield userN.json();*/

            //代收件发票收件
           /* var userE = yield userCenterMoldel.getZgExpressMailList(req);
            var eData = yield userE.json();*/

            // 官文管理
           /* var userG = yield userCenterMoldel.getIsExpress(req);
            var fData = yield userG.json();*/

            // 未处理订单
            //var userO = yield userCenterMoldel.getuserCenterOrders(req);
            // oData = yield userO.json();


            // 我的顾问
            //var userG = yield userCenterMoldel.getGwDetailByUid(req);
            //var gData = yield userG.json();

            //获取用户喜欢标签商品
            //var personalLike = yield productMoldel.getHotRecommend('pc-personal-youLike',req);
            //var personalLikeLists = yield  personalLike.json();
            //res.render('userCenter/userCenter',{seo:seo,uData:JSON.stringify(uData),pData:JSON.stringify(pData),tData:JSON.stringify(tData),cData:JSON.stringify(cData),bData:JSON.stringify(bData),nData:JSON.stringify(nData),eData:JSON.stringify(eData),fData:JSON.stringify(fData)});
            res.render('userCenter/userCenter',{seo:seo,pData:JSON.stringify(pData)});
        });
    },
    /**
     * 多用户登录问题
     * @param req
     * @param res
     * @param next
     */
    validateOrderIfSameUserByOrderId: function (req, res, next) {
        co(function *() {
            var userO = yield userCenterMoldel.validateOrderIfSameUserByOrderId(req);
            var oData = yield userO.json();
            res.json(oData);
        });
    },
    /**
     * 个人信息展示
     * @param req
     * @param res
     * @param next
     */
    getPersonalMainInfo: function (req, res, next) {
        co(function *() {
            var userO = yield userCenterMoldel.getuserCenter(req);
            var oData = yield userO.json();
            res.json(oData);
        });
    },

    /**
     * 我的订单---分页
     * @param req
     * @param res
     * @param next
     */
    homeOrderPage: function (req, res, next) {
        co(function *() {
            var userO = yield userCenterMoldel.getuserCenterOrders(req);
            var oData = yield userO.json();
            res.json(oData);
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
            var entrustOrderList = yield userCenterMoldel.deleteContracByConcode(req);
            var entrustOrderJson = yield entrustOrderList.json();
            res.json(entrustOrderJson);
        });
    },

    /**
     * 待支付
     * @param req
     * @param res
     * @param next
     */
    getZgOrderList: function (req, res, next) {
        co(function *() {
            var userp = yield userCenterMoldel.getZgOrderList(req);
            var pData = yield userp.json();
            res.json(pData);
        });
    },

    /**
     * 待支付补单列表
     * @param req
     * @param res
     * @param next
     */
    getZgOrderAppend: function (req, res, next) {
        co(function *() {
            var userT = yield userCenterMoldel.getZgOrderAppend(req);
            var tData = yield userT.json();
            res.json(tData);
        });
    },


    /**
     * 待确认订单
     * @param req
     * @param res
     * @param next
     */
    getZgOrderBeConfirmList: function (req, res, next) {
        co(function *() {
            var userC = yield userCenterMoldel.getZgOrderBeConfirmList(req);
            var cData = yield userC.json();
            res.json(cData);
        });
    },

    /**
     * 业务确认列表
     * @param req
     * @param res
     * @param next
     */
    getZgOrderBusinessList: function (req, res, next) {
        co(function *() {
            var userB = yield userCenterMoldel.getZgOrderBusinessList(req);
            var bData = yield userB.json();
            res.json(bData);
        });
    },

    /**
     * 审核未通过
     * @param req
     * @param res
     * @param next
     */
    getZgOrderUnPassList: function (req, res, next) {
        co(function *() {
            var userN = yield userCenterMoldel.getZgOrderUnPassList(req);
            var nData = yield userN.json();
            res.json(nData);
        });
    },


    /**
     * 代收件发票收件
     * @param req
     * @param res
     * @param next
     */
    getZgExpressMailList: function (req, res, next) {
        co(function *() {
            var userE = yield userCenterMoldel.getZgExpressMailList(req);
            var eData = yield userE.json();
            res.json(eData);
        });
    },

    /**
     * 代收件官文收件确认收件
     * @param req
     * @param res
     * @param next
     */
    Official: function (req, res, next) {
        co(function *() {
            var userR = yield userCenterMoldel.Official(req);
            var rData = yield userR.json();
            res.json(rData);
        });
    },

     /**
     * 代收件发票收件确认收件
     * @param req
     * @param res
     * @param next
     */
    recipient: function (req, res, next) {
        co(function *() {
            var userI = yield userCenterMoldel.recipient(req);
            var iData = yield userI.json();
            res.json(iData);
        });
    },

    // 官文管理
    OfficialDoc: function (req, res, next) {
        co(function *() {
            var userG = yield userCenterMoldel.getIsExpress(req);
            var fData = yield userG.json();
            res.json(fData);
        });
    },

    /**
     * 删除订单补款
     * @param req
     * @param res
     * @param next
     */
    delComfirmedData:function (req, res, next) {
        co(function *() {
            var _promise = yield userCenterMoldel.delComfirmedData(req, req.params.orderId);
            var _result = yield _promise.json();
            res.json(_result);
        });
    },
    /**
     * 支付订单补款订单
     *
     */
    getBalance:function (req, res, next) {
        co(function *() {
            var _promise = yield userCenterMoldel.getBalance(req);
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
            var _promise = yield userCenterMoldel.payDifference(req);
            var _result = yield _promise.json();
            res.json(_result);
        });
    },

    /**
     * 我的订单
     * @param req
     * @param res
     * @param next
     */
    order: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            // var user_o = yield userCenterMoldel.getuserCenter(req.params.pId);
            // var uData = yield user_o.json();
            res.render('userCenter/userOrder',{uData:uData,seo:seo});
        });
    },
    /**
     * 优惠券
     * @param req
     * @param res
     * @param next
     */
    coupon: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            req.body = {
                zgUserOtherAccount:{},
                pageParam:{
                    "pageNo":1,
                    "pageSize":20
                }
            };
            var couponLsit = yield userCenterMoldel.getCoupon(req);
            var udata = yield couponLsit.json();
            var couponLsitNum = yield userCenterMoldel.getCouponNum(req);
            var udataNum = yield couponLsitNum.json();
            res.render('userCenter/userCoupon',{seo:seo,udata:JSON.stringify(udata),udataNum:JSON.stringify(udataNum)});
        });
    },
    /**
     * 优惠券查询
     * @param req
     * @param res
     * @param next
     */
    couponCha: function (req, res, next) {
        co(function *() {
            var couponLsit = yield userCenterMoldel.getCoupon(req);
            var udata = yield couponLsit.json();
            res.json(udata);
        });
    },
    /**
     * 激活优惠券
     * @param req
     * @param res
     * @param next
     */
    activateCoupon: function (req, res, next) {
        co(function *() {
            var activateCouponLsit = yield userCenterMoldel.getActivateCoupon(req);
            var activateData = yield activateCouponLsit.json();
            res.json(activateData);
        });
    },
    /**
     * 删除优惠券
     * @param req
     * @param res
     * @param next
     */
    delCoupon: function (req, res, next) {
        co(function *() {
            var CouponLsit = yield userCenterMoldel.delCouponl(req);
            var cData = yield CouponLsit.json();
            res.json(cData);
        });
    },
    /**
     * 官文管理--已下发未邮寄
     * @param req
     * @param res
     * @param next
     */
    Guanwen: function (req, res, next) {
        var seo = config.seo.detail;
        co(function *() {
            req.body = {pageParam:{"pageNo":1, "pageSize":20}};
            var users = yield userCenterMoldel.getGuanwen(req);
            var udata = yield users.json();
            var usersNum = yield userCenterMoldel.getGuanwenNum(req);
            var udataNum = yield usersNum.json();
            res.render('userCenter/userGuanwen',{udata:JSON.stringify(udata),udataNum:JSON.stringify(udataNum),seo:seo});
        });
    },
    /**
     * 官文管理--已下发未邮寄---重新取获取数据
     * @param req
     * @param res
     * @param next
     */
    Guanwenes: function (req, res, next) {
        co(function *() {
            var users = yield userCenterMoldel.getGuanwen(req);
            var udata = yield users.json();
            // var usersNum = yield userCenterMoldel.getGuanwenNum(req);
            // var udataNum = yield usersNum.json();
            res.json(udata);
        });
    },
    /**
     * 官文管理--已下发未邮寄---获取数字
     * @param req
     * @param res
     * @param next
     */
    GuanwenNum: function (req, res, next) {
        co(function *() {
            var usersNum = yield userCenterMoldel.getGuanwenNum(req);
            var udataNum = yield usersNum.json();
            res.json(udataNum);
        });
    },
    /**
     * 官文管理--已下发未邮寄---查询
     * @param req
     * @param res
     * @param next
     */
    GuanwenRefer: function (req, res, next) {
        co(function *() {
            var users = yield userCenterMoldel.getGuanwen(req);
            var udata = yield users.json();
            res.json(udata);
        });
    },
    /**
     * 官文管理--已下发未邮寄---下载
     * @param req
     * @param res
     * @param next
     */
    DownNotMail: function (req, res, next) {
        co(function *() {
            var users = yield userCenterMoldel.getDownNotMail(req);
            var udata = yield users.json();
            res.json(udata);
        });
    },
    /**
     * 官文管理--已下发未邮寄---邮寄---获取数据
     * @param req
     * @param res
     * @param next
     */
    GetMail: function (req, res, next) {
        co(function *() {
            var users = yield userCenterMoldel.getGetMail(req);
            var udata = yield users.json();
            res.json(udata);
        });
    },
    /**
     * 官文管理--已下发未邮寄---邮寄----保存
     * @param req
     * @param res
     * @param next
     */
    EditMail: function (req, res, next) {
        co(function *() {
            var users = yield userCenterMoldel.getEditMail(req);
            var udata = yield users.json();
            res.json(udata);
        });
    },
    /**
     * 官文管理--已申请邮寄
     * @param req
     * @param res
     * @param next
     */
    IsExpress: function (req, res, next) {
        co(function *() {
            var users = yield userCenterMoldel.getIsExpress(req);
            var edata = yield users.json();
            res.json(edata);
        });
    },
    /**
     * 官文管理--已申请邮寄---查看详情
     * @param req
     * @param res
     * @param next
     */
    SeekMail: function (req, res, next) {
        co(function *() {
            var users = yield userCenterMoldel.getSeekMail(req);
            var edata = yield users.json();
            res.json(edata);
        });
    },
    /**
     * 官文管理--已申请邮寄---下载
     * @param req
     * @param res
     * @param next
     */
    DownloadMail: function (req, res, next) {
        co(function *() {
            var users = yield userCenterMoldel.getDownloadMail(req);
            var edata = yield users.json();
            res.json(edata);
        });
    },
    /**
     * 官文管理--已申请邮寄---取消
     * @param req
     * @param res
     * @param next
     */
    CancelMail: function (req, res, next) {
        co(function *() {
            var users = yield userCenterMoldel.getCancelMail(req);
            var edata = yield users.json();
            res.json(edata);
        });
    },
    /**
     * 官文管理--历史邮寄
     * @param req
     * @param res
     * @param next
     */
    historyList: function (req, res, next) {
        co(function *() {
            var users = yield userCenterMoldel.getHistoryList(req);
            var hdata = yield users.json();
            res.json(hdata);
        });
    },
    /**
     * 基本信息
     * @param req
     * @param res
     * @param next
     */
    basicMsg: function (req, res, next) {
        var seo = config.seo.detail;
        co(function *() {
            // var users = yield userCenterMoldel.getBasicMsg(req);
            var users = yield userCenterMoldel.getPersonalMsg(req);
            var udata = yield users.json();
            if(udata==undefined){
                udata = [{}];
            }
            res.render('userCenter/userBasicMsg',{uData:JSON.stringify(udata),seo:seo});
        });
    },
    /**
     * 基本信息---企业信息--新增---保存
     * @param req
     * @param res
     * @param next
     */
    ComMsgAdd: function (req, res, next) {
        co(function *() {
            var users = yield userCenterMoldel.getComMsgAdd(req);
            var udata = yield users.json();
            res.json(udata);
        });
    },
    /**
     * 基本信息---企业信息--修改---保存
     * @param req
     * @param res
     * @param next
     */
    ComMsg: function (req, res, next) {
        co(function *() {
            var users = yield userCenterMoldel.getComMsg(req);
            var udata = yield users.json();
            res.json(udata);
        });
    },
    /**
     * 基本信息--个人信息
     * @param req
     * @param res
     * @param next
     */
    personalMsg: function (req, res, next) {
        co(function *() {
            var users = yield userCenterMoldel.getPersonalMsg(req);
            var udata = yield users.json();
            res.json(udata);
        });
    },
    /**
     * 基本信息--个人信息---修改保存信息
     * @param req
     * @param res
     * @param next
     */
    editPersonalMsg: function (req, res, next) {
        co(function *() {
            var users = yield userCenterMoldel.getEditPersonalMsg(req);
            var udata = yield users.json();
            if(udata.success){
                var _str = JSON.parse(req.session.user);
                _str.nikename = req.body.nickname;
                req.session.user =  JSON.stringify(_str);
                res.cookie('_zg_user',req.session.user);
            }
            res.json(udata);
        });
    },
    /**
     * 主体信息
     * @param req
     * @param res
     * @param next
     */
    mainMsg: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            var users1 = yield userCenterMoldel.getuserMainMsg1(req);
            var uData1 = yield users1.json();
            var users2 = yield userCenterMoldel.getuserMainMsg2(req);
            var uData2 = yield users2.json();
            var users = yield userCenterMoldel.getMainAdd(req);
            var hData = yield users.json();
            res.render('userCenter/userMainMsg',{uData1:JSON.stringify(uData1.data.companyList),uData2:JSON.stringify(uData2.data.ZgBodylist),hData:JSON.stringify(hData.data),seo:seo});
        });
    },
    /**
     * 主体信息---添加----跳转页面
     * @param req
     * @param res
     * @param next
     */
    mainAdd: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            var users = yield userCenterMoldel.getMainAdd(req);
            var hData = yield users.json();
            res.render('userCenter/userMainAdd',{uData:"[]",hData:JSON.stringify(hData),bType:"3",user:JSON.stringify(req.session.user),seo:seo});
        });
    },
    /**
     * 主体信息---添加----保存---先判断主体是否重复
     * @param req
     * @param res
     * @param next
     */
    judgeMsges: function (req, res, next) {
        co(function *() {
            var users = yield userCenterMoldel.getJudgeMsges(req);
            var uData = yield users.json();
            res.json(uData);
        });
    },
    /**
     * 主体信息---添加----保存
     * @param req
     * @param res
     * @param next
     */
    addMainMsgSave: function (req, res, next) {
        co(function *() {
            var users = yield userCenterMoldel.getAddMainMsg(req);
            var uData = yield users.json();
            res.json(uData);
        });
    },
    /**
     * 主体信息---修改----跳转页面，获取数据
     * @param req
     * @param res
     * @param next
     */
    mainEdit: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            var bType = req.params.btype;
            var users = yield userCenterMoldel.getMainEdit(req);
            var uData = yield users.json();
            var useres = yield userCenterMoldel.getMainAdd(req);
            var uDatas = yield useres.json();
            if(uData.data.CompanyList){
                uData = uData.data.CompanyList;
            }else{
                uData = uData.data.userBodyList;
            }
            res.render('userCenter/userMainAdd',{uData:JSON.stringify(uData),hData:JSON.stringify(uDatas),bType:bType,user:JSON.stringify(req.session.user),seo:seo});
        });
    },
    /**
     * 主体信息---修改----保存
     * @param req
     * @param res
     * @param next
     */
    editMainMsg: function (req, res, next) {
        co(function *() {
            var users = yield userCenterMoldel.getEditMainMsg(req);
            var uData = yield users.json();
            res.json(uData);
        });
    },
    /**
     * 我的信息
     * @param req
     * @param res
     * @param next
     */
    mgMsg: function (req, res, next) {
        co(function *() {
            // var users = yield userCenterMoldel.getmgMsg(body);
            // var udata = yield users.json();
            res.render('userCenter/userCoupon',udata);
        });
    },
    /**
     * 专属顾问
     * @param req
     * @param res
     * @param next
     */
    counselor: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            var gwLsit = yield userCenterMoldel.getGwDetailByUid(req);
            var gwData = yield gwLsit.json();
            res.render('userCenter/userCounselor',{gwData:JSON.stringify(gwData),seo:seo});
        });
    },
    /**
     * 专属顾问----图片和二维码
     * @param req
     * @param res
     * @param next
     */
    counselorImg: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            var _gwImgUrl = yield userCenterMoldel.getGwImgUrl(req);
            var gwImgUrl = yield _gwImgUrl.json();
            res.json(gwImgUrl);
        });
    },
    /**
     * 专属顾问----通过产品编号获取对应顾问
     * @param req
     * @param res
     * @param next
     */
    counselorByPcode: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            var gwLsit = yield userCenterMoldel.getGwDetailByUid(req);
            var gwData = yield gwLsit.json();
            var ptype =  req.params.pcode.substr(0,2);
            var gw_data = '';
            var kf_data = '';
            for(var i in gwData.data){
                if(gwData.data[i].type == "kf"){
                    kf_data = gwData.data[i];
                }else{
                    gw_data = gwData.data[i];
                    /*2017-11-23 顾问注释*/
                    /*if(ptype == "tr" || ptype == "cr") {
                        if(gwData.data[i].dept == "trdept"){
                            gw_data = gwData.data[i];
                        }
                    }else if (ptype == "pt") {
                        if(gwData.data[i].dept == "padept") {
                            gw_data = gwData.data[i];
                        }
                    }else{
                        if(gwData.data[i].dept== "tppdept"){
                            gw_data = gwData.data[i];
                        }
                    }*/
                }
            }
            if(gw_data==''|| gw_data==undefined){
                res.json(kf_data);
            }else{
                res.json(gw_data);
            }

        });
    },
    /**
     * 地址管理
     * @param req
     * @param res
     * @param next
     */
    addressList: function (req, res, next) {
        co(function *() {
            var addressLsit = yield userCenterMoldel.getAddress(req);
            var addressData = yield addressLsit.json();
            res.json(addressData);
        });
    },
    /**
     * 新增地址
     * @param req
     * @param res
     * @param next
     */
    addAddressList: function (req, res, next) {
        co(function *() {
            var addressLsit = yield userCenterMoldel.addAddress(req);
            var addressData = yield addressLsit.json();
            res.json(addressData);
        });
    },
    /**
     * 删除地址
     * @param req
     * @param res
     * @param next
     */
    delAddressList: function (req, res, next) {
        co(function *() {
            var addressLsit = yield userCenterMoldel.editAddress(req);
            var addressData = yield addressLsit.json();
            res.json(addressData);
        });
    },
    /**
     * 根据ID查询地址
     * @param req
     * @param res
     * @param next
     */
    sectIdAddress: function (req, res, next) {
        co(function *() {
            var addressLsit = yield userCenterMoldel.sectIdAddressL(req);
            var addressData = yield addressLsit.json();
            res.json(addressData);
        });
    },
    /**
     * 编辑地址
     * @param req
     * @param res
     * @param next
     */
    editAddressList: function (req, res, next) {
        co(function *() {
            var addressLsit = yield userCenterMoldel.editAddress(req);
            var addressData = yield addressLsit.json();
            res.json(addressData);
        });
    },
    /**
     * 设置为默认
     * @param req
     * @param res
     * @param next
     */
    setDefault: function (req, res, next) {
        co(function *() {
            var addressLsit = yield userCenterMoldel.setAddress(req);
            var addressData = yield addressLsit.json();
            res.json(addressData);
        });
    },
    /**
     * 我的信息
     * @param req
     * @param res
     * @param next
     */
    myMsg: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            req.body = {
                pageParam:{"pageNo":1, "pageSize":1000}
            };
            var msgList = yield userCenterMoldel.getMyMsgList(req);
            var msgdata = yield msgList.json();
            var msgKind = yield userCenterMoldel.getMyMsgKind(req);
            var kinddata = yield msgKind.json();
            res.render('userCenter/userMyMsg',{seo:seo,msgdata:JSON.stringify(msgdata),kinddata:JSON.stringify(kinddata)});
        });
    },
    /**
     * 我的信息---查询
     * @param req
     * @param res
     * @param next
     */
    myMsges: function (req, res, next) {
        co(function *() {
            var msgList = yield userCenterMoldel.getMyMsgList(req);
            var msgdata = yield msgList.json();
            var msgKind = yield userCenterMoldel.getMyMsgKind(req);
            var kinddata = yield msgKind.json();
            res.json({msgdata:msgdata,kinddata:kinddata});
        });
    },
    /**
     * 设置消息为已读
     * @param req
     * @param res
     * @param next
     */
    setReadMsg: function (req, res, next) {
        co(function *() {
            var addressLsit = yield userCenterMoldel.setReadMsg(req);
            var addressData = yield addressLsit.json();
            res.json(addressData);
        });
    },
    /**
     * 获取我的钱包列表
     * @param req
     * @param res
     * @param next
     */
    getUserWallet: function (req, res, next) {
        co(function *() {
            req.body = {
                "pageParam" : {"pageNo" :1, "pageSize" :10},
            }
            var seo = config.seo.index;
            var money = yield userCenterMoldel.getMoney(req);
            var moneys = yield money.json();
            var moneyLsit = yield userCenterMoldel.getMoneyList(req);
            var moneyData = yield moneyLsit.json();
            res.render('userCenter/myWallet',{moneys:JSON.stringify(moneys),moneyData:JSON.stringify(moneyData),seo:seo});
        });
    },
    /**
     * 获取我的钱包列表
     * @param req
     * @param res
     * @param next
     */
    getUserWallet_2: function (req, res, next) {
        co(function *() {
            var money = yield userCenterMoldel.getMoney(req);
            var moneys = yield money.json();
            var moneyLsit = yield userCenterMoldel.getMoneyList(req);
            var moneyData = yield moneyLsit.json();
            res.json({moneys:moneys,moneyData:moneyData});
        });
    },
    /**
     * 获取我的钱包列表---提现
     * @param req
     * @param res
     * @param next
     */
    getRechargePay: function (req, res, next) {
        co(function *() {
            var recharge = yield userCenterMoldel.getRecharge(req);
            var rechargeData = yield recharge.json();
            res.json(rechargeData);
        });
    },
    /**
     * 用户充值
     * @param req
     * @param res
     * @param next
     */
    userRecharge: function (req, res, next) {
        co(function *() {
            // var addressLsit = yield userCenterMoldel.setReadMsg(req);
            // var addressData = yield addressLsit.json();
            var seo = config.seo.index;
            res.render('userCenter/userRecharge',{seo:seo});
        });
    },
    /**
     * 用户充值---生成合同号
     * @param req
     * @param res
     * @param next
     */
    userContract: function (req, res, next) {
        co(function *() {
            var reqData = yield userCenterMoldel.getUserContract(req);
            var jsonData = yield reqData.json();
            res.json(jsonData)
        });
    },
    /**
     * 用户充值---提交
     * @param req
     * @param res
     * @param next
     */
    userRechargeBtn: function (req, res, next) {
        co(function *() {
            var reqData = yield userCenterMoldel.rechargeBtn(req);
            var jsonData = yield reqData.json() || {success: true};
            res.json(jsonData)
        });
    },
    /**
     * 微信支付结果返回
     */
    userWeixinBack: function (req, res, next) {
        co(function *() {
            var reqData = yield userCenterMoldel.judgePay(req);
            var jsonData = yield reqData.json() || {success: true};
            res.json(jsonData);
        })
    },
    /**
     * 用户充值---提交---微信---充值成功的回调
     * @param req
     * @param res
     * @param next
     */
    userRechargeBack: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            var reqData = yield userCenterMoldel.judgePay(req);
            var jsonData = yield reqData.json() ;
            res.render('userCenter/rechargeCallBack',{moneyCallBackList:jsonData,seo:seo});
        });
    },
    /**
     * 支付宝----支付结果成功返回页面
     */
    userPayBack: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            req.params.comcode = req.body.comcode;
            var reqData = yield userCenterMoldel.judgePay(req);
            var jsonData = yield reqData.json() || {success: true};
            res.render('userCenter/rechargeCallBack',{moneyCallBackList:jsonData,seo:seo});
        })
    },
    /**
     * 获取认证主体认证信息
     * @param req
     * @param res
     * @param next
     */
    userApprove: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            var uid = JSON.parse(req.session.user).id;
            var reqData = yield userCenterMoldel.getUserApprove(req,uid);
            var jsonData = yield reqData.json() ;
            res.render('userCenter/userApprove',{userData:JSON.stringify(jsonData),seo:seo});
        });
    },
    /**
     * 个人认证主体认证信息
     * @param req
     * @param res
     * @param next
     */
    personApprove: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            var users = yield userCenterMoldel.getPersonalMsg(req);
            var udata = yield users.json();
            res.render('userCenter/userPersonApprove',{user:JSON.stringify(req.session.user),udata:JSON.stringify(udata),seo:seo});
        });
    },
    /**
     * 公司认证主体认证信息
     * @param req
     * @param res
     * @param next
     */
    companyApprove: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            var users = yield userCenterMoldel.getPersonalMsg(req);
            var udata = yield users.json();
            res.render('userCenter/userCompanyApprove',{user:JSON.stringify(req.session.user),udata:JSON.stringify(udata),seo:seo});
        });
    },
    /**
     * 公司主体认证信息----获取公司信息
     * @param req
     * @param res
     * @param next
     */
    getACompanyMsg: function (req, res, next) {
        co(function *() {
            var reqData = yield userCenterMoldel.getACompanyMsg1(req);
            var jsonData = yield reqData.json() ;
            res.json(jsonData);
        });
    },
    /**
     * 公司认证主体认证信息
     * @param req
     * @param res
     * @param next
     */
    mainSave: function (req, res, next) {
        co(function *() {
            var reqData = yield userCenterMoldel.PutMainSave(req);
            var jsonData = yield reqData.json() || {success: true};
            res.json(jsonData);
        });
    },
    /**
     * 基本信息---发票信息
     * @param req
     * @param res
     * @param next
     */
    getInvoice: function (req, res, next) {
        co(function *() {
            var invoiceList = yield userCenterMoldel.getInvoice(req);
            var invoiceData = yield invoiceList.json();
            res.json(invoiceData);
        });
    },
    /**
     * 基本信息---发票信息--根据Id查询
     * @param req
     * @param res
     * @param next
     */
    getInvoiceOne: function (req, res, next) {
        co(function *() {
            var invoiceList = yield userCenterMoldel.getInvoiceOne(req);
            var invoiceData = yield invoiceList.json();
            res.json(invoiceData);
        });
    },
    /**
     * 基本信息---发票信息---新增
     * @param req
     * @param res
     * @param next
     */
    addInvoice: function (req, res, next) {
        co(function *() {
            var invoiceList = yield userCenterMoldel.addInvoice(req);
            var invoiceData = yield invoiceList.json();
            res.json(invoiceData);
        });
    },
    /**
     * 基本信息---发票信息---修改
     * @param req
     * @param res
     * @param next
     */
    editInvoice: function (req, res, next) {
        co(function *() {
            var invoiceList = yield userCenterMoldel.editInvoice(req);
            var invoiceData = yield invoiceList.json();
            res.json(invoiceData);
        });
    },
    /**
     * 基本信息---发票信息---删除
     * @param req
     * @param res
     * @param next
     */
    deleteInvoice: function (req, res, next) {
        co(function *() {
            var invoiceList = yield userCenterMoldel.deleteInvoice(req);
            var invoiceData = yield invoiceList.json();
            res.json(invoiceData);
        });
    },
    /**
     * 基本信息---发票信息---设为默认
     * @param req
     * @param res
     * @param next
     */
    defaInvoice: function (req, res, next) {
        co(function *() {
            var invoiceList = yield userCenterMoldel.defaInvoice(req);
            var invoiceData = yield invoiceList.json();
            res.json(invoiceData);
        });
    },
    /**
     * 業務辦理--訂單信息
     * @param req
     * @param res
     * @param next
     */
    getOrderInfo: function (req, res, next) {
        co(function *() {
            var userO = yield userCenterMoldel.getOrderInfo(req);
            var oData = yield userO.json();
            res.json(oData);
        });
    },
    /**
     * 我的订单--新增和通发票信息
     * @param req
     * @param res
     * @param next
     */
    addInvoiceContract: function (req, res, next) {
        co(function *() {
            var userO = yield userCenterMoldel.addInvoiceContract(req);
            var oData = yield userO.json();
            res.json(oData);
        });
    },
    /**
     * 我的订单--修改合同发票信息
     * @param req
     * @param res
     * @param next
     */
    aInvoiceContract: function (req, res, next) {
        co(function *() {
            var userO = yield userCenterMoldel.aInvoiceContract(req);
            var oData = yield userO.json();
            res.json(oData);
        });
    },
}