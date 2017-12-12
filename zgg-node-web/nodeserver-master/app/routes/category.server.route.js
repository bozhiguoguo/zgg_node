/**
 * Created by Administrator on 2017/2/21.
 */
var express = require('express');
var categoryRoute = express.Router();
var  categoryController=require('../controllers/category.server.controller');
/* GET users listing. */
categoryRoute.get('/:code',categoryController.getPage);
module.exports = categoryRoute;