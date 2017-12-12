/**
 * Created by Administrator on 2017/2/21.
 */
var express = require('express');
var cooperationRoute = express.Router();
var  cooperationController=require('../controllers/cooperation.server.controller');
/* GET users listing. */
cooperationRoute.get('/index',cooperationController.index);
cooperationRoute.get('/addedIRS',cooperationController.getAdded);
module.exports = cooperationRoute;