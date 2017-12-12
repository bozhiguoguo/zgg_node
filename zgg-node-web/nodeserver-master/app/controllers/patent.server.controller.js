/**
 * Created by Administrator on 2017/2/21.
 * author zhengqiang.liu
 * desc 专利控制层
 * modify 2017-03-14
 */
var patentModule = require("../models/patent.server.model");
var businessModule = require("../models/business.server.model");
var userCenterMoldel = require("../models/userCenter.server.model");
var categoryModule = require("../models/category.server.model");
var co = require('co');
var config = require('config');
var fetch = require('node-fetch');
var fs = require('fs');
var path=require('path');
module.exports = {
    getPage: function (req, res, next) {
        var seo = config.seo.detail;
        co(function *() {
            var patentBody = yield patentModule.getPatent(req);
            var patentData = yield  patentBody.json();

            var getPatentDataes = yield patentModule.getPatentDetail(req);//获取订单详情
            var patentDatase = yield getPatentDataes.json();
            var userO = yield userCenterMoldel.getuserCenterOrders(req);//未处理定单
            var oData = yield userO.json();
            var ChannelId = '';
            if(patentData.data){
                ChannelId = patentData.data.pcode;
                var _allNodes = yield businessModule.getAllNodes(req, patentData.data.orderDetail.pcode);//获取全部节点
                var allNodes = yield _allNodes.json();
                var _nowNodes = yield businessModule.getAtPresentNodes(req, patentData.data.orderDetail.orderId);//获取当前节点
                var nowNodes = yield _nowNodes.json();
            }

            if(req.params.flowType == 'product_conmmon_flow'){
                var _commonStencil = yield categoryModule.getCommonStencil(req, patentData.data.orderDetail.orderId)//根据orderId获取通用模版
                var _commonStencilWord = yield _commonStencil.json();
                var data = {
                    user:JSON.parse(req.session.user),
                    params: req.params,
                    orderData: patentDatase.data,
                    allNodes: allNodes.data,
                    atPresentNodes: nowNodes.data,
                    oData: oData.data,
                    word:_commonStencilWord.data
                };
                res.render('noFlow/noFlow', {data:JSON.stringify(data),seo:seo});
            }else{

                var _orderBody = yield  businessModule.getOrderBody(req, patentData.data.orderDetail.orderId);//获取主体
                var orderBody = yield _orderBody.json();

                var _server = yield businessModule.getServer(req, patentDatase.data.orderCode, patentDatase.data.pcode.substr(0, 2));//跟踪服务
                var server = yield _server.json();
                var _orderMsg = yield businessModule.getOrderMsg(req, patentDatase.data.orderCode);//订单信息明细
                var orderMsg = yield _orderMsg.json();

                var patentFilesDataes = yield patentModule.findPatentFiles(req,patentData.data.orderDetail.orderId); //获取资料附件
                var patentFiles = yield patentFilesDataes.json();

                var userO = yield userCenterMoldel.getuserCenterOrders(req);//未处理定单
                var oData = yield userO.json();


                var orderFeeChargeds =  yield businessModule.getOrderFeeChargeds(req,patentData.data.orderDetail.orderCode)
                var orderFeeChargedsList = yield orderFeeChargeds.json();

                //委托或者有流程判断
                if (nowNodes.data.stepnum == 1) {
                    //外观专利模板
                    if(patentDatase.data.pcode.indexOf('pt_ow')>=0){
                        var url = 'patent/patentMsg';
                    }else{
                        var url ='patent/patentMsg_not_ow'
                    }
                } else if (nowNodes.data.stepnum > 1) {
                    var url = 'patent/patentAffirm';
                }
                res.render(url, {
                    patentDatase:JSON.stringify(patentDatase),
                    patentData: JSON.stringify(patentData),
                    orderBody: JSON.stringify(orderBody),
                    allNodes: JSON.stringify(allNodes),
                    nowNodes: JSON.stringify(nowNodes),
                    server:JSON.stringify(server),
                    orderMsg:JSON.stringify(orderMsg),
                    patentFiles:JSON.stringify(patentFiles),
                    oData:JSON.stringify(oData),
                    orderFeeChargedsList:JSON.stringify(orderFeeChargedsList),
                    seo: seo
                });
            }
        });
    },
    /**
     * 保存活修改外观专利
     * @param req
     * @param res
     * @param next
     */
    saveOrUpdatePatent: function (req, res, next) {
        co(function *() {
            var saveBody = yield patentModule.saveOrUpdatePatent(req);
            var savePatentBody = yield  saveBody.json();
            res.json(savePatentBody);
        })
    },
    /**
     * 下载客户登记表
     * @param req
     * @param res
     * @param next
     */
    downContractByPath:function (req,res,next) {
        var url = config.apiUrl.pc + 'zgPatentBaseinfo/downLoadCIRTable/'+req.params.orderId;
        var _headers = {'Content-Type': 'application/json'}
        if(req.session.user){
            var user = JSON.parse(req.session.user);
            _headers.token = user.token;
        }
        fetch(url,{method:'GET',headers:_headers,body:{}}).then(
            function(rest) {
                 return rest.buffer()
            }).then(function (buffer) {
                fs.writeFile(path.resolve('public/uploads/客户登记表.doc'),buffer,function(err){
                    if(err)return console.error(err);
                     res.download('public/uploads/客户登记表.doc');
                });
        });
    }
};