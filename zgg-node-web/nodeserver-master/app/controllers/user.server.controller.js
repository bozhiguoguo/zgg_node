var userMoldel = require('../models/user.server.model');
var co = require('co');
var config = require('config');
module.exports = {
    register: function (req, res, next) {
       /* co(function *() {
            var carts = yield userMoldel.getUser(req.body);
            var pData = yield carts.json();
            req.session.user = JSON.stringify(pData.data);
            console.log(req.session);
            res.json(pData);
        })*/
    },
    showRegister:function (req,res,next) {
        var seo = config.seo.index;
        res.render('user/reg',{seo:seo});
    },
    showLogin:function (req,res,next) {
        var seo = config.seo.index;
        res.render('user/login',{seo:seo});
    },
    findPwd:function (req,res,next) {
        var seo = config.seo.index;
        res.render('user/forgetPwd',{seo:seo});
    },
   /* userAgree:function (req,res,next) {
        var seo = config.seo.index;
        res.render('user/userAgreement',{seo:seo});
    },*/
    login:function (req,res,next) {
         co(function *() {
         var _result = yield userMoldel.login(req);
         var _data = yield _result.json();
         if(_data.success){
             req.session.user = JSON.stringify(_data.data);
             res.cookie('_zg_user',req.session.user);
         }
         // console.log(req.session);
            res.json(_data);
         })
    },

    /*
    * 注册
    *
    * */
    regLogin: function (req, res, next) {
        co(function *() {
            var _result = yield userMoldel.regLogin(req);
            var _data = yield _result.json();
            if(_data.success){
                req.session.user = JSON.stringify(_data.data);
                res.cookie('_zg_user',req.session.user);
            }
            res.json( _data )
        })
    },
    /*
    * 获取手机验证码
    *
    * */
    getCode: function (req, res, next ) {
        co(function *() {
            var _result = yield userMoldel.getCode(req);
            var _data = yield _result.json();
            res.json( _data )
        })
    } ,
    /*
    * 获取手机验证码---验证是否正确
    *
    * */
    getCodeTrue: function (req, res, next ) {
        co(function *() {
            var _result = yield userMoldel.getCodeTrue(req);
            var _data = yield _result.json();
            res.json( _data )
        })
    } ,
    /*
    * 果蜜中心----实名认证----获取手机验证码---验证是否正确
    *
    * */
    userCodeTrue: function (req, res, next ) {
        co(function *() {
            var _result = yield userMoldel.userCodeTrue(req);
            var _data = yield _result.json();
            res.json( _data )
        })
    } ,
    /*
    * 果蜜中心----实名认证----获取手机验证码
    *
    * */
    getuserCode: function (req, res, next ) {
        co(function *() {
            var _result = yield userMoldel.getuserCodes(req);
            var _data = yield _result.json();
            res.json( _data )
        })
    } ,
    /*
    * 获取邮箱验证码---验证是否正确
    *
    * */
    getCodeTrueEmal: function (req, res, next ) {
        co(function *() {
            var _result = yield userMoldel.getCodeTrueEmal(req);
            var _data = yield _result.json();
            res.json( _data )
        })
    } ,
    /*
    * 原密码修改
    *
    * */
    getPassWordTrue: function (req, res, next ) {
        co(function *() {
            var _result = yield userMoldel.getPassWordTrue(req);
            var _data = yield _result.json();
            res.json( _data )
        })
    } ,
    /*
    * 获取找回密码手机验证码
    * */
    forgetPwdCode: function (req, res, next) {
      co(function *() {
          var _result = yield  userMoldel.forgetPwdCode(req);
          var _code = yield _result.json();
          res.json( _code );
      })
    },
    /*
    * 获取忘记密码邮箱验证码
    * */
    getEmailPwdCode: function (req, res, next) {
      co(function *() {
          var _result = yield  userMoldel.forgetEmailPwdCode(req);
          var _code = yield _result.json();
          res.json( _code );
      })
    },
    /*
    * 获取找回密码--邮箱--验证码
    * */
    pwdEmailCode: function (req, res, next) {
      co(function *() {
          var _result = yield  userMoldel.userPwdEmailCode(req);
          var _code = yield _result.json();
          res.json( _code );
      })
    },

    /*
    * 找回密码
    *
    * */
    forgetPwd: function (req, res, next) {
        co(function *() {
            var _result = yield  userMoldel.forgetPwd(req);
            var _code = yield _result.json();
            res.json( _code );
        })
    },
    /*
    * 获取购物车数量
    *
    * */
    getCartNun: function (req, res, next ) {
        co(function *() {
            var _result = yield userMoldel.getCartNun(req);
            var _data = yield _result.json();
            res.json( _data )
        })
    } ,
    /*
    * 用户退出
    *
    * */
    getQuitUser: function (req, res, next ) {
        co(function *() {
           req.session.user=null;
            res.json( {success:"true"} )
        })
    },
    /**
     * 用户代理登录
     * @param req
     * @param res
     * @param next
     */
    proxyLogin: function (req, res, next ) {
        co(function *() {
            var _result = yield userMoldel.ssoLogin(req);
            var _data = yield _result.json();
            if(_data.success){
                req.session.user = JSON.stringify(_data.data);
                res.cookie('_zg_user',req.session.user);
                res.redirect('/userCenter/home');
            }else{
                res.redirect('/user/login');
            }
        })
    }
}
