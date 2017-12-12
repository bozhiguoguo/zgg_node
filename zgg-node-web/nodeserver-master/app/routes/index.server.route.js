var express = require('express');
var indexRoute = express.Router();
var indexRouteController=require('../controllers/index.server.controller');
indexRoute.get('/',indexRouteController.index);
indexRoute.get('/getMenu',indexRouteController.getMenuFn);
/*indexRoute.post('/uploadFile',)*/
module.exports = indexRoute;