/**
 * Created by Administrator on 2017/2/21.
 */
var express = require('express');
var businessRoute = express.Router();
var trademarkController=require('../controllers/trademark.server.controller');
var copyrightController=require('../controllers/copyright.server.controller');
var patentController=require('../controllers/patent.server.controller');
/* GET users listing. */
businessRoute.get('/tr/:orderId/:flowType',trademarkController.getPage);
businessRoute.post('/getApplyInfoRegTrademarkByOrderId',trademarkController.getApplyInfoRegTrademarkByOrderId);

/*
* 高薪
* */
businessRoute.get('/ht/:orderId/:flowType',trademarkController.getPage);
businessRoute.post('/getCurrentNode',trademarkController.getCurrentNode);

businessRoute.post('/updataText',trademarkController.postUpdataText);//通用流程---上传资料---保存提交


businessRoute.post('/tr/trSave',trademarkController.trSave);//商标业务--确定提交
businessRoute.post('/tr/trNextSave',trademarkController.trNextSave);//318商标业务--下一步或保存
businessRoute.post('/tr/customConfim',trademarkController.customSure);//客户确认或者318产品确定
businessRoute.post('/tr/goBack',trademarkController.goBack);//商标业务办理---返回修改


businessRoute.get('/cr/:orderId/:flowType',copyrightController.getCrPage);
businessRoute.get('/pt/:orderId/:flowType',patentController.getPage);


businessRoute.get('/getCategoryFirstList',trademarkController.getCategoryFirstList);
businessRoute.get('/getCategorySubList/:id',trademarkController.getCategorySubList);
businessRoute.get('/getCategoryEndList/:pid',trademarkController.getCategoryEndList);



businessRoute.get('/getcategoryByPid/:pid',trademarkController.getcategoryByPid);
businessRoute.get('/getcategoryById/:Id',trademarkController.getcategoryById);

businessRoute.get('/searchItem/:keywords',trademarkController.searchItem);



businessRoute.post('/entrust/:orderId',trademarkController.entrust);
businessRoute.post('/cancelentrust/:orderId',trademarkController.cancelEntrust);
businessRoute.post('/saveOrUpdatePatent',patentController.saveOrUpdatePatent);


businessRoute.get('/downContractByPath/:orderId',patentController.downContractByPath);
businessRoute.post('/getOrderInfoByApplyCode',trademarkController.getOrderIdInfoData); //驳回申请号查询匹配
businessRoute.post('/saveOrUpdateRebut',trademarkController.saveData); //驳回申请匹配成功确定提交
businessRoute.post('/getOrderRebutDetailsByOrderId',trademarkController.getRejectDetail); //驳回申请详情
businessRoute.post('/getZgOrderRebutFilesByOrderId',trademarkController.getRejectFiles); //相关资料附件
businessRoute.post('/rebutBCFilesConfirm',trademarkController.getFilesConfirm); //客户信息确认
businessRoute.post('/getZgTrademarkThreeList',trademarkController.getZgTrademarkThreeList); //大项里面搜索小项
businessRoute.post('/selectTrademarkItemsByCategory',trademarkController.selectTrademarkItemsByCategory); //设置默认值




module.exports = businessRoute;