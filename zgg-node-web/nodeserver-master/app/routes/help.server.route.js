/**
 * Created by Administrator on 2017/2/21.
 */
var express = require('express');
var helpRoute = express.Router();
var  helpController=require('../controllers/help.server.controller');
/* GET users listing. */
helpRoute.get('/index',helpController.index);
helpRoute.get('/trademark_318',helpController.trademark_318);//318产品的操作手册
module.exports = helpRoute;