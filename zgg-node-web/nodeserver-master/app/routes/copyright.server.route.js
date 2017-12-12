/**
 * Created by Administrator on 2017/3/15.
 */
var express = require('express');
var copyrightRoute = express.Router();
var copyrightController=require('../controllers/copyright.server.controller');
copyrightRoute.post('/copyrightMsg',copyrightController.copyrightMsg);//客户信息---保存---暂存
copyrightRoute.post('/copyrightKhAffirm',copyrightController.copyrightKhAffirm);//客户确认





module.exports = copyrightRoute;