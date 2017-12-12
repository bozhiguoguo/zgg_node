/**
 * Created by Administrator on 2017/2/21.
 */
var express = require('express');
var regRoute = express.Router();
var  regController=require('../controllers/reg.server.controller');
/* GET users listing. */
productRoute.get('/reg',regController.detail);
module.exports = regRoute;