var express = require('express');
var userRouter = express.Router();
var  userController=require('../controllers/user.server.controller');
/* GET users listing. */
userRouter.get('/login',userController.showLogin);
userRouter.post('/login',userController.login);
userRouter.get('/findPwd',userController.findPwd);
userRouter.get('/register',userController.showRegister);
userRouter.post('/register',userController.register);
userRouter.post('/regLogin',userController.regLogin);
userRouter.post('/getCode',userController.getCode);//注册----手机注册时获取验证码
userRouter.post('/getCodeTrue',userController.getCodeTrue);//注册----对比手机验证码是否正确
userRouter.post('/getuserCode',userController.getuserCode);//果蜜中心----主体认证-----获取手机验证码
userRouter.post('/userCodeTrue',userController.userCodeTrue);//果蜜中心----主体认证-----对比手机验证码是否正确
userRouter.post('/getPwdEmailCode',userController.pwdEmailCode);//果蜜中心----主体认证-----获取邮箱验证码
userRouter.post('/getCodeTrueEmal',userController.getCodeTrueEmal);//果蜜中心----主体认证-----对比邮箱验证码是否正确
userRouter.post('/getPassWordTrue',userController.getPassWordTrue);//果蜜中心----主体认证-----对比原密码是否正确
userRouter.post('/forgetPwdCode',userController.forgetPwdCode);//登入----忘记密码或修改密码-----获取手机验证码
userRouter.post('/forgetEmailPwdCode',userController.getEmailPwdCode);//登入----忘记密码-----获取邮箱验证码
userRouter.post('/forgetPwd',userController.forgetPwd);//登入----忘记密码----提交新密码
userRouter.get('/getCartNun',userController.getCartNun);//获取头部购物车数量
userRouter.get('/sso/:base64ToStr',userController.proxyLogin);//用户代理登录
/*userRouter.get('/uesrAgreement',userController.userAgree);*/
// userRouter.get('/quitUser',userController.getQuitUser);

module.exports = userRouter;