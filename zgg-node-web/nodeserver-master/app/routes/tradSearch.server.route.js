/**
 * Created by Administrator on 2017/2/21.
 */
var express = require('express');
var tradSearchRoute = express.Router();
var  tradSearchController=require('../controllers/tradSearch.server.controller');
tradSearchRoute.get('/index',tradSearchController.index);
tradSearchRoute.get('/search/:uId',tradSearchController.getSearch);
tradSearchRoute.get('/getZgTrademarkThreeList/:pId',tradSearchController.getZgTrademarkThreeList);
tradSearchRoute.get('/classification/:content',tradSearchController.classification);//��ҳ�Ĳ�ѯ��Ʒ��������
tradSearchRoute.post('/classificationPage',tradSearchController.getclassification);
module.exports = tradSearchRoute;