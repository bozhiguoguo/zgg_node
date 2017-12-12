var commomServer = require('../models/common.server.model');
var config = require('config');
module.exports = {
    /**
     * 用户登录
     * @param body
     * @returns {*}
     */
    login:function(req) {
        var url = config.apiUrl.base+'user/login';
        var _Body = req;
        
        return commomServer.callPort(url,"POST",_Body);
    },
    regLogin: function (req) {
        var _url = config.apiUrl.base+ 'user/regLoginPc',
            _method = "POST",
            _Body = req;
        return commomServer.callPort(_url, _method ,_Body);
    },
    getCode: function (req) {
        var _url = config.apiUrl.base+ 'captcha/sendMsg/'+req.body.passport,
            _method = "GET",
            _Body = req;
        return commomServer.callPort(_url, _method, _Body)
    },
    /**
     * 验证手机验证码是否正确
     * @param req
     * @returns {*}
     */
    getCodeTrue: function (req) {
        var _url = config.apiUrl.base+ 'captcha/checkTelCode/'+req.body.passport+'/'+req.body.code,
            _method = "GET",
            _Body = req;
        return commomServer.callPort(_url, _method, _Body)
    },
    /**
     * 果蜜中心----实名认证----获取手机验证码
     * @param req
     * @returns {*}
     */
    getuserCodes: function (req) {
        var _url = config.apiUrl.base+ 'captcha/sendIdentificationMsg/'+req.body.passport,
            _method = "GET",
            _Body = req;
        return commomServer.callPort(_url, _method, _Body)
    },
    /**
     * 果蜜中心----实名认证----获取手机验证码---验证是否正确
     * @param req
     * @returns {*}
     */
    userCodeTrue: function (req) {
        var _url = config.apiUrl.base+ 'captcha/zgUserIdentification/'+req.body.passport+'/'+req.body.code,
            _method = "GET",
            _Body = req;
        return commomServer.callPort(_url, _method, _Body)
    },
    /**
     * 验证邮箱验证码是否正确
     * @param req
     * @returns {*}
     */
    getCodeTrueEmal: function (req) {
        var _url = config.apiUrl.base+ 'emailMsg/validateCodeForMail',
            _method = "POST",
            _Body = req;
        return commomServer.callPort(_url, _method, _Body)
    },
    /**
     * 原密码修改
     * @param req
     * @returns {*}
     */
    getPassWordTrue: function (req) {
        var _url = config.apiUrl.pc+ 'zgUserInfo/chenPwd/'+req.body.code,
            _method = "GET",
            _Body = req;
        return commomServer.callPort(_url, _method, _Body)
    },
    /**
     * 获取图片验证码
     *
     */
    getPicVerCode: function (req) {
        var _url = config.apiUrl.base+ ''
    },
    /**
     * 获取找回密码 手机验证码
     *
     *
     */
    forgetPwdCode: function (req) {
        var _url = config.apiUrl.base + 'captcha/getBackPwd/sendMsg/'+req.body.passport,
            _method = "GET",
            _Body = req;
        return commomServer.callPort(_url, _method, _Body);
    },
    /**
     * 获取找回密码 邮箱验证码
     *
     *
     */
    forgetEmailPwdCode: function (req) {
        var _url = config.apiUrl.base + 'emailMsg/getChekPwdCodeForMail',
            _method = "POST",
            _Body = req;
        return commomServer.callPort(_url, _method, _Body);
    },
    /**
     * 修改密码---获取邮箱验证码
     * @param req
     * @returns {*}
     */
    userPwdEmailCode: function (req) {
        var _url = config.apiUrl.base + 'emailMsg/getChekPwdCodeForMail',
            _method = "POST",
            _Body = req;
        return commomServer.callPort(_url, _method, _Body);
    },
    /**
     * 找回密码
     *
     */
    forgetPwd: function (req) {
        var _url = config.apiUrl.base + '/user/resetPswd',
            _method = "POST",
            _Body = req;
        return commomServer.callPort(_url, _method, _Body)
    },

    /**
     * 获取购物者数量
     * @param req
     * @returns {*}
     */
    getCartNun: function (req) {
        var _url = config.apiUrl.pc+ 'zgProductShoppinglist/getZgProductShoppinglistCount',
            _method = "GET",
            _Body = req;
        return commomServer.callPort(_url, _method, _Body);
    },
    /**
     *代理登录
     */
    ssoLogin:function (req) {
        var decodedstr = new Buffer(req.params.base64ToStr, 'base64').toString();
        var splitArray = decodedstr.split("||");
        var _url = config.apiUrl.base + 'user/getUserInfoBytel',
        // var _url = 'http://192.168.88.169:8080/base-web-rest/' + 'user/getUserInfoBytel',
            _method = "POST";
            req.body = {token:splitArray[0],passport:splitArray[1]};
        return commomServer.callPort(_url, _method, req)
    }
}