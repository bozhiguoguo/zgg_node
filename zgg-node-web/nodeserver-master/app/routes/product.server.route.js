/**
 * Created by zhengqiang.liu on 17/2/15.
 */
var express = require('express');
var productRoute = express.Router();
var  productController=require('../controllers/product.server.controller');
/* GET users listing. */
productRoute.get('/productDetail/:pId',productController.detail);
productRoute.post('/informGw',productController.informGw);
productRoute.get('/getBuyLawProductAuth',productController.getBuyLawProductAuth);  //查看用户是否有资格购买法律产品体验包
module.exports = productRoute;