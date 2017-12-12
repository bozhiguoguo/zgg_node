/**
 * Created by aisaisai on 17/2/15.
 */
var express = require('express');
var indexRoute = express.Router();
var  mainRouteController=require('../controllers/main.server.controller');
/* GET users listing. */
indexRoute.get('/',mainRouteController.index);

module.exports = indexRoute;