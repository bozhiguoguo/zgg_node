/**
 * Created by Administrator on 2017/2/21.
 */
var express = require('express');
var aboutRoute = express.Router();
var  aboutController=require('../controllers/about.server.controller');
/* GET users listing. */
aboutRoute.get('/:pageName',aboutController.index);
module.exports = aboutRoute;