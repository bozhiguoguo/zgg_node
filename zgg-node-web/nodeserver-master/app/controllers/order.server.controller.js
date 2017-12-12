/**
 * Created by Administrator on 2017/2/21.
 * author zhengqiang.liu
 * desc 订单控制层
 * modify 2017-02-24
 */
var orderMoldel = require('../models/order.server.model');
var userCenterMoldel = require('../models/userCenter.server.model');
var cartMoldel = require('../models/cart.server.model');
var productMoldel = require('../models/product.server.model');
var co = require('co');
var config = require('config');
module.exports = {
    /**
     * 立即购买
     * @param req
     * @param res
     * @param next
     */
    buyNow: function (req, res, next) {
        co(function *() {
            var carts = yield orderMoldel.buyNow(req);
            var cData = yield carts.json();
            if (cData.success) {
                res.cookie('_buyNowProduct', cData.data); //将产品数据加入到缓存
            }
            res.json(cData);
        })
    },
    /**
     * 展示立即购买界面
     * @param req
     * @param res
     * @param next
     */
    showBuyNow: function (req, res, next) {
        var seo = config.seo.detail;
        co(function *() {
            var reqData = yield userCenterMoldel.getAddress(req);
            var jsonData = yield reqData.json() || {success: true};

            var MData = yield userCenterMoldel.getMoney(req);
            var moneyData = yield MData.json() || {success: true};
            req.body = {
                zgUserOtherAccount: {},
                pageParam: {
                    "pageNo": 1,
                    "pageSize": 20
                }
            };
            if (jsonData.success && req.cookies._buyNowProduct) {
                //根据购买商品的pcode查询优惠券
                var pcodes = ""
                for(var i=0;i<req.cookies._buyNowProduct.length;i++){
                    var item = req.cookies._buyNowProduct[i];
                    pcodes +=item.pcode+",";
                }
                if(pcodes!=""){
                    pcodes.substring(pcodes.length-1,1);
                    var reqCoupon = yield userCenterMoldel.getZgUserOtherAccountByPcode(req,pcodes);
                    var jsonCoupon = yield reqCoupon.json() || {success: true}
                    if(jsonCoupon.data.length == 0){
                        jsonCoupon.data=[];
                    }
                }/*else{
                    res.redirect('/cart/index');
                    return
                }*/
                 
                res.render('order/order', {
                    pData: JSON.stringify(req.cookies._buyNowProduct),
                    addressList: JSON.stringify(jsonData.data),
                    couponList: JSON.stringify(jsonCoupon.data),
                    moneyData: JSON.stringify(moneyData.data),
                    seo:seo
                });
            } else {
                res.redirect('/404');
            }
        })
    },
    /**
     * 生成合同号
     * @param req
     * @param res
     * @param next
     */
    createContract: function (req, res, next) {
        co(function *() {
            var reqData = yield orderMoldel.createContract(req);
            var jsonData = yield reqData.json() || {success: true};
            res.json(jsonData);
        })
    },
    /*
     * 订单支付
     * @param req
     * @param res
     * @param next
     */
    orderPay: function (req, res, next) {
        co(function *() {
            var reqData = yield orderMoldel.orderPay(req);
            var jsonData = yield reqData.json() || {success: true};
            res.json(jsonData)
        })
    },
    /**支付回显
     * @param req
     * @param res
     * @param next
     */
    payCallBack: function (req, res, next) {
        var seo = config.seo.detail;
        co(function *() {
            var reqData = yield orderMoldel.endPay(req);
            var jsonData = yield reqData.json(); //|| {success: true};
            if(!jsonData.success){
                res.render('order/payCallBack', {orderCallBackList:jsonData.message,seo:seo});
            }
            if(!!jsonData){
	            jsonData.data.orderList.map(function (item) {
		            item.pcode = item.pcode.substring(0,2);
	            })
	            //获取不同商品热销商品
	            var tempType = 'other',
                    tempArr = ['pt','tr','cr'];
	            if(tempArr.indexOf(jsonData.data.orderList[0].pcode)!=-1){
		            tempType = jsonData.data.orderList[0].pcode;
	            }
	            var pHotRecommendList = yield productMoldel.getHotRecommend('pc-payok-'+tempType+'-hot',req);
	            var pHotRecommend = yield  pHotRecommendList.json();
	            res.render('order/payCallBack', {orderCallBackList: jsonData.data,pHotRecommend:pHotRecommend.data.list,seo:seo});
            }

        })
    },
    /**
     * 微信支付结果返回
     */
    payCallBackToJson: function (req, res, next) {
        co(function *() {
            var reqData = yield orderMoldel.getPayStatus(req);
            var jsonData = yield reqData.json() || {success: true};
            res.json(jsonData);
        })
    },
    /**
     *其他支付回调
     * @param req
     * @param res
     * @param next
     */
    otherPayCallBack: function (req, res, next) {
        var seo = config.seo.detail;
        req.params = {
            contractNo: req.body.comcode
        };
        co(function *() {
            var reqData = yield orderMoldel.endPay(req);
            var jsonData = yield reqData.json() || {success: true};
            jsonData.data.orderList.map(function (item) {
                item.typecode = item.typecode.substring(0,2);
            })
            //获取不同商品热销商品
            var tempType = 'other';
            if(jsonData.data.orderList[0].typecode.indexOf(['pt','tr','cr'])!=-1){
                tempType = jsonData.data.orderList[0].typecode;
            }
            var pHotRecommendList = yield productMoldel.getHotRecommend('pc-payok-'+tempType+'-hot',req);
            var pHotRecommend = yield  pHotRecommendList.json();
            res.render('order/payCallBack', {orderCallBackList: jsonData.data,pHotRecommend:pHotRecommend.data.list,seo:seo});
        })
    },
    /**
     * 结算
     * @param req
     * @param res
     * @param next
     */
    account: function (req, res, next) {
        var seo = config.seo.detail;
        co(function *() {
            req.body.zgUserOtherAccount = {};
            req.body.pageParam = {"pageNo": 1, "pageSize": 20};
            var reqData = yield userCenterMoldel.getAddress(req);
            var jsonData = yield reqData.json() || {success: true};

            var account_p = yield cartMoldel.accountCart(req);
            var account_PNum = yield account_p.json();

            var MData = yield userCenterMoldel.getMoney(req);
            var moneyData = yield MData.json() || {success: true};
            if (jsonData.success && account_PNum && account_PNum.data) {
                //根据购买商品的pcode查询优惠券
                var pcodes = ""
                for(var i=0;i<account_PNum.data.length;i++){
                    var item = account_PNum.data[i];
                    pcodes +=item.pcode+",";
                }
                if(pcodes!=""){
                    pcodes.substring(pcodes.length-1,1);
                    var reqCoupon = yield userCenterMoldel.getZgUserOtherAccountByPcode(req,pcodes);
                    var jsonCoupon = yield reqCoupon.json() || {success: true}
                    if(jsonCoupon.data.length == 0){
                        jsonCoupon.data=[];
                    }
                }else{
                    res.redirect('/cart/index');
                    return
                }
                res.cookie('ids', req.body.ids);
                res.render('order/order', {
                    pData: JSON.stringify(account_PNum.data),
                    addressList: JSON.stringify(jsonData.data),
                    couponList: pcodes!=""?JSON.stringify(jsonCoupon.data):[],
                    moneyData: JSON.stringify(moneyData.data),
                    seo:seo
                });
            } else {
                res.redirect('/404');
            }
        })
    },
    /**
     * 结算----刷新页面
     * @param req
     * @param res
     * @param next
     */
    getAccount: function (req, res, next) {
        var seo = config.seo.detail;
        co(function *() {
            req.body.zgUserOtherAccount = {};
            req.body.pageParam = {"pageNo": 1, "pageSize": 20};
            var reqData = yield userCenterMoldel.getAddress(req);
            var jsonData = yield reqData.json() || {success: true};
            var account_p = yield cartMoldel.accountCartAgg(req);
            var account_PNum = yield account_p.json();
            var MData = yield userCenterMoldel.getMoney(req);
            var moneyData = yield MData.json() || {success: true};
            if (jsonData.success && account_PNum) {
                //根据购买商品的pcode查询优惠券
                var pcodes = ""
                for(var i=0;i<account_PNum.data.length;i++){
                    var item = account_PNum.data[i];
                    pcodes +=item.pcode+",";
                }
                if(pcodes!=""){
                    pcodes.substring(pcodes.length-1,1);
                    var reqCoupon = yield userCenterMoldel.getZgUserOtherAccountByPcode(req,pcodes);
                    var jsonCoupon = yield reqCoupon.json() || {success: true};
                    if(jsonCoupon.data.length == 0){
                        jsonCoupon.data=[];
                    }
                }/*else{
                    res.redirect('/cart/index');
                    return
                }*/
                res.render('order/order', {
                    pData: JSON.stringify(account_PNum.data),
                    addressList: JSON.stringify(jsonData.data),
                    couponList: JSON.stringify(typeof jsonCoupon.data != 'undefined'?jsonCoupon.data:[]),
                    moneyData: JSON.stringify(moneyData.data),
                    seo:seo
                });
            } else {
                res.redirect('/404');
            }
        })
    },
    /**
     * 线下转账
     * @param req
     * @param res
     * @param next
     */
    offlinePay: function (req, res, next) {
        co(function *() {
            var reqData = yield orderMoldel.offlinePay(req);
            var jsonData = yield reqData.json() || {success: true};
            res.json(jsonData);
        })
    },
    /**
     * 根据下单时pcode获取优惠券
     * @param req
     * @param res
     * @param next
     */
    getCouponToPcode:function (req,res,next) {
        co(function *() {
            var reqData = yield userCenterMoldel.getZgUserOtherAccountByPcode(req,req.params.pcodes);
            var jsonData = yield reqData.json() ;
            res.json(jsonData);
        })
    },
    /**
     *余额支付
     * @param req
     * @param res
     * @param next
     */
    balancePay:function (req,res,next) {
        co(function *() {
            var reqData = yield orderMoldel.balancePay(req);
            var jsonData = yield reqData.json() ;
            res.json(jsonData);
        })
    },
    /***
     * 显示重新支付支付
     * @param req
     * @param res
     * @param next
     */
    showRepayment:function (req,res,next) {
        var seo = config.seo.detail;
        co(function *() {
            var reqAddData = yield userCenterMoldel.getAddress(req);
            var addJsonData = yield reqAddData.json() || {success: true};

            var reqData = yield orderMoldel.getPayInfoByContractCode(req);
            var jsonData = yield reqData.json() ;

            var _orderInvoicData = yield userCenterMoldel.getOrderData(req); //根据orderId 获取当前合同立即支付下的发票信息
            var orderInvoicData = yield _orderInvoicData.json();

            var MData = yield userCenterMoldel.getMoney(req);
            var moneyData = yield MData.json() || {success: true};
            if (jsonData.success) {
                //根据购买商品的pcode查询优惠券
                var pcodes = ""
                for(var i=0;i<jsonData.data.zgOrders.length;i++){
                    var item = jsonData.data.zgOrders[i];
                    pcodes +=item.pcode+",";
                }
                if(pcodes!=""){
                    pcodes = pcodes.substring(pcodes.length-1,1);
                    var reqCoupon = yield userCenterMoldel.getZgUserOtherAccountByPcode(req,pcodes);
                    var jsonCoupon = yield reqCoupon.json() || {success: true,data:"",message:"成功",code:0}
                    if(jsonCoupon.data.length == 0){
                        jsonCoupon.data=[];
                    }
                }
            }else{
                var jsonCoupon = {data:[],success:true,code:0,message:"成功！"}
                var jsonData = {data:{},success:true,code:0,message:"成功！"}
            }
            res.render('order/rePayment', {
                pData:JSON.stringify(jsonData.data) ,
                addressList: JSON.stringify(addJsonData.data),
                couponList: JSON.stringify(jsonCoupon.data),
                moneyData: JSON.stringify(moneyData.data),
                invoicData:JSON.stringify(orderInvoicData.data),
                seo:seo
            });

        })
    },
    /**
     * 重新支付修改订单信息
     * @param req
     * @param res
     * @param next
     */
    updateOrderPayInfo:function (req,res,next) {
        co(function *() {
            var reqData = yield orderMoldel.updateOrderPayInfo(req);
            var jsonData = yield reqData.json() ;
            res.json(jsonData);
        })
    },
    /**
     * 重新支付获取订单信息
     * @param req
     * @param res
     * @param next
     */
    getPayInfoByContractCode:function (req,res,next) {
        co(function *() {
            req.params = {
                contractCode: req.body.contractCode
            };
            var reqData = yield orderMoldel.getPayInfoByContractCode(req);
            var jsonData = yield reqData.json() ;
            res.json(jsonData);
        })
    }
}