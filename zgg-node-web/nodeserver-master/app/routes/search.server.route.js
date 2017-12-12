/**
 * Created by Administrator on 2017/2/21.
 */
var express = require('express');
var searchRoute = express.Router();
var  searchController=require('../controllers/search.server.controller');
/* GET users listing. */
searchRoute.get('/searchTRPage',searchController.getSearchTRPage);
searchRoute.post('/searchTRPage',searchController.searchTRPage);
searchRoute.post('/searchToJson',searchController.searchTRPageToJson);
searchRoute.get('/searchTRDetail/:regno/:tmtype',searchController.searchTRDetail);
module.exports = searchRoute;