/**
 * Created by Administrator on 2017/2/21.
 */
var fetch = require('node-fetch');
var uploadMoldel = require('../models/upload.server.model');
var FormData = require('form-data');
var form = new FormData();
var commonMoldel = require('../models/common.server.model');
var co = require('co');
var fs = require('fs');
var config = require('config');
module.exports = {
    /**
     * 业务办理上传图片
     * @param req
     * @param res
     * @param next
     */
    upload: function (req, res, next) {
        co(function *() {
           /* var _str = req.files[0].originalname.substring(req.body.filename.lastIndexOf(".")+1,req.body.filename.length).toUpperCase();//5月25号，将上传到本地的文件后缀名全部改为大写
            var _stres = req.files[0].originalname.substring(0,req.body.filename.lastIndexOf(".")+1);//5月25号，将上传到本地的文件后缀名全部改为大写
            req.files[0].originalname = _stres + _str;//5月25号，将上传到本地的文件后缀名全部改为大写*/
            var _Data = {
                userId:req.session.user!=null?JSON.parse(req.session.user).id:-1,
                orderId:req.body.orderId,
                stepType:req.body.stepType,
                stepId:req.body.stepId,
                fname:req.files[0].originalname,
                fType:req.body.fType
            }
            //var formData = new FormData(_Data);
            if(typeof  req.body.uploadType != 'undefined'){
                _Data.files = req.files;
            }else{
                _Data.file = req.files;
            }
            var _result = yield uploadMoldel.uploadFile(req, res, next,_Data);
            var result = yield _result.json();
            //成功 删除uploads目录
            if(result){
                res.json(result);
            }
        })
    },
    /**
     * 业务办理上传图片---图片限制
     * @param req
     * @param res
     * @param next
     */
    checkOn: function (req, res, next) {
        co(function *() {
            var num = 1;//1格式不正确，0格式正确
            var _str = req.body.filename.substring(req.body.filename.lastIndexOf(".")+1,req.body.filename.length).toLowerCase();
            if(config.viwConfig.fileExts.indexOf(_str)>=0 && config.viwConfig.fileExts.indexOf(_str)<=3){
                if(parseInt(req.body.size) <= parseInt(config.viwConfig.fileMaxSize.img)*1024*1024){
                    num = 0;
                }
            }else if(config.viwConfig.fileExts.indexOf(_str)>3){
                if(parseInt(req.body.size) <= parseInt(config.viwConfig.fileMaxSize.otherFile)*1024*1024){
                    num = 0;
                }
            }
            res.json(num);
        });
    },
    /**
     * 果蜜中心---主体信息---上传图片
     * @param req
     * @param res
     * @param next
     */
    userUpload: function (req, res, next) {
        co(function *() {
            var _Data = {
                userId:req.session.user!=null?JSON.parse(req.session.user).id:-1,
                fname:req.files[0].originalname,
                fType:req.body.fType
            }
            //var formData = new FormData(_Data);
            if(typeof  req.body.uploadType != 'undefined'){
                _Data.files = req.files;
            }else{
                _Data.file = req.files;
            }
            var _result = yield uploadMoldel.uploadFile(req, res, next,_Data);
            var result = yield _result.json();
            //成功 删除uploads目录
            if(result){
                res.json(result)
            }
        })
    },
    /**
     * 上传文件保存文件名
     * @param req
     * @param res
     * @param next
     */
    uploadfiletoNane: function (req, res, next) {
        co(function *() {
            var _Data = {
                userId:req.session.user!=null?JSON.parse(req.session.user).id:-1,
                orderId:req.body.orderId,
                stepType:req.body.stepType,
                stepId:req.body.stepId,
                fname:req.files[0].originalname,
                fType:req.body.fType
            }
            //var formData = new FormData(_Data);
            if(typeof  req.body.uploadType != 'undefined'){
                _Data.files = req.files;
            }else{
                _Data.file = req.files;
            }
            var _result = yield uploadMoldel.uploadfiletoNane(req, res, next,_Data);
            var result = yield _result.json();
            //成功 删除uploads目录
            if(result){
                res.json(result)
            }
        })
    },
}