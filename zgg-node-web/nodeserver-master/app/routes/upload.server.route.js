/**
 * Created by Administrator on 2017/2/21.
 */
var express = require('express');
var uploadRoute = express.Router();
var  uploadController=require('../controllers/upload.server.controller');
var muilter = require('../util/multerUtil');
var muilterName = require('../util/multerUtilName');
var upload = muilter.any();
var uploadtoName = muilterName.any();
/* GET users listing. */
uploadRoute.post('/profile',upload,uploadController.upload);//业务办理----上传图片
uploadRoute.post('/check',upload,uploadController.checkOn);//业务办理----上传图片---判断
uploadRoute.post('/userProfile',upload,uploadController.userUpload);//果蜜中心----主体信息---上传图片
uploadRoute.post('/profileToName',uploadtoName,uploadController.uploadfiletoNane);//专利确认合同---上传附件

module.exports = uploadRoute;