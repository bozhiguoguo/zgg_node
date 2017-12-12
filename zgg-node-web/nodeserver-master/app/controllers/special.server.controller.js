/**
 * Created by Administrator on 2017/4/25.
 * author weiotao.zhu
 * desc 专题
 * modify 2017-04-25
 */
var specialMoldel = require('../models/special.server.model.js');
var co = require('co');
var config = require('config');
module.exports = {
    /**
     * 3周年专题活动页
     * @param req
     * @param res
     * @param next
     */
    threeSpecial: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            // var userG = yield specialMoldel.getGwDetailByUid(req);
            // var gData = yield userG.json();
            res.render('special/threeSpecial', {
                layout:false,
                seo: seo
            });
        });
    },
    /**
     * 3周年专题活动页---获取手机号码
     * @param req
     * @param res
     * @param next
     */
    getThreeSpecialTel: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            var userG = yield specialMoldel.getThreeSpecialTel(req);
            var gData = yield userG.json();
            res.json(gData);
        });
    },
    couponSpecial:function(req,res,next){
        var seo = config.seo.index;
        res.render('special/couponSpecial', {
            layout:false,
            seo: seo
        });
    },
    /**
     * 获取手机code
     * @param req
     * @param res
     * @param next
     */
    getTelCode: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            var userG = yield specialMoldel.getTelCode(req);
            var gData = yield userG.json();
            res.json(gData);
        });
    },
    /**
     * 领取优惠券
     * @param req
     * @param res
     * @param next
     */
    getCoupon:function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            var userG = yield specialMoldel.getCoupon(req);
            var gData = yield userG.json();
            res.json(gData);
        });
    },
    /**
     * 快速校验短信code
     * @param req
     * @param res
     * @param next
     */
    quickReg:function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            var userG = yield specialMoldel.quickReg(req);
            var gData = yield userG.json();
            res.json(gData);
        });
    },

    /**
     * 成都开业活动页
     * @param req
     * @param res
     * @param next
     */
    getOpenActivity: function (req, res, next) {
        var seo = config.seo.index;
        co(function *() {
            // var userG = yield specialMoldel.getGwDetailByUid(req);
            // var gData = yield userG.json();
            res.render('special/openActivity', {
                seo: seo
            });
        });
    },
    /**
     * 成都开业活动---注册成功--获取优惠券
     * @param req
     * @param res
     * @param next
     */
    getRegCoupon: function (req, res, next) {
        co(function *() {
            var userG = yield specialMoldel.getRegCoupons(req);
            var gData = yield userG.json();
            res.json(gData);
        });
    },


}