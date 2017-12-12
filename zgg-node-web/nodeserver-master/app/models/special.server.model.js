/**
 * Created by Administrator on 2017/4/25.
 * author weiotao.zhu
 * desc 专题
 * modify 2017-04-25
 */
var commomServer = require('../models/common.server.model');
var config = require('config');
module.exports = {
    /**
     * 3周年专题---获取手机号码
     * @param uId
     * @returns {*}
     */
    getThreeSpecialTel: function (req) {
        var url = config.apiUrl.pc + 'zgUserOtherAccount/getTelByAcode/ZGAC';
        return commomServer.callPort(url, "GET", req);
    },
    getTelCode:function (req) {
        var url = config.apiUrl.base + 'captcha/sendIdentificationMsg/'+req.body.tel;
        console.log(url);
        return commomServer.callPort(url, "GET", req);
    },
    getCoupon:function (req) {
        var url = config.apiUrl.pc + 'zgUserOtherAccount/saveZgUserOtherAccountByAcode/ZGAC/'+req.body.tel;
        return commomServer.callPort(url, "GET", req);
    },
    /**
     * 快速校验短信code
     * @param req
     * @param res
     * @param next
     */
    quickReg:function (req) {
        var url = config.apiUrl.base + 'user/quickRegByActivityChannel';
        return commomServer.callPort(url, "POST", req);
    } ,
    /**
     * 成都开业活动---注册成功--获取优惠券
     * @param req
     * @param res
     * @param next
     */
    getRegCoupons:function (req) {
        var url = config.apiUrl.pc + 'zgUserOtherAccount/saveZgUserOtherAccountByAcode/CDCD/'+req.body.tel;
        return commomServer.callPort(url, "GET", req);
    }
}
