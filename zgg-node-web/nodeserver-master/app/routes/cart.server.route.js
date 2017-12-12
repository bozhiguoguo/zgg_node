/**
 * Created by Administrator on 2017/2/21.
 * author weiotao.zhu
 * desc 购物车路由
 * modify 2017-03-09
 */
var express = require('express');
var cartRoute = express.Router();
var  cartController=require('../controllers/cart.server.controller');
/* GET users listing. */
cartRoute.get('/index',cartController.index);
cartRoute.post('/pPriceMsg',cartController.pPriceMsg);
cartRoute.post('/add',cartController.add);
cartRoute.post('/numChange',cartController.numChange);
cartRoute.post('/del',cartController.del);
cartRoute.post('/delAll',cartController.delAll);
module.exports = cartRoute;