/**
 * Created by Administrator on 2017/2/21.
 */
var express = require('express');
var webimRoute = express.Router();
var  webimController=require('../controllers/webim.server.controller');
webimRoute.get('/webimPage/:imType',webimController.getwebimPage);
webimRoute.get('/webimAdv/:imtokenid/:nickname',webimController.getwebimAdv);
module.exports = webimRoute;
