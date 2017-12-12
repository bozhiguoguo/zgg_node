/**
 * Created by aisaisai on 17/2/15.
 */
var express = require('express');
var testRoute = express.Router();
var  testRouteController=require('../controllers/common.server.controller.js');
/* GET users listing. */
testRoute.get('/test',testRouteController.index);

module.exports = testRoute;