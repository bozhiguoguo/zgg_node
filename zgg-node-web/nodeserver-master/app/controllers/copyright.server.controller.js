/**
 * Created by Administrator on 2017/3/13.
 */
var mongoose = require("mongoose");
var copyrightModule = require("../models/copyright.server.model");
var businessModule = require("../models/business.server.model");
var userCenterMoldel = require('../models/userCenter.server.model.js');
var config=require('config');
var co = require('co');
module.exports = {
    getCrPage: function(req, res, next) {
        var seo = config.seo.detail;
        co(function *() {
            var url = '';
            var getCrData = yield copyrightModule.getCr(req);
            var crData = yield getCrData.json();
            if(req.params.flowType == 'product_conmmon_flow'){
                var data = {
                    user:JSON.parse(req.session.user),
                    params: req.params,
                    orderData: crData.data
                }
                res.render('noFlow/noFlow', {data:JSON.stringify(data),seo:seo});
            }else{
                var getCrDataes = yield copyrightModule.getCres(req);
                var crDatase = yield getCrDataes.json();

                var _orderBody = yield  businessModule.getOrderBody(req, crData.data.orderDetail.orderId);//获取主体
                var orderBody = yield _orderBody.json();
                var _allNodes = yield businessModule.getAllNodes(req, crData.data.orderDetail.pcode);//获取全部节点
                var allNodes = yield _allNodes.json();
                var _nowNodes = yield businessModule.getAtPresentNodes(req, crData.data.orderDetail.orderId);//获取当前节点
                var nowNodes = yield _nowNodes.json();
                var _server = yield businessModule.getServer(req, crData.data.orderDetail.orderCode,crData.data.orderDetail.pcode.substr(0,2));//跟踪服务
                var server = yield _server.json();
                var _orderMsg = yield businessModule.getOrderMsg(req, crData.data.orderDetail.orderCode);//订单信息明细
                var orderMsg = yield _orderMsg.json();
                var userO = yield userCenterMoldel.getuserCenterOrders(req);//未处理定单
                var oData = yield userO.json();
                var patentFilesDataes = yield businessModule.findPatentFiles(req,crData.data.orderDetail.orderId,crData.data.orderDetail.pcode);//获取资料
                var patentFiles = yield patentFilesDataes.json();
                if(nowNodes.data.stepnum==1){
                    url='copyright/copyrightMsg';
                }else if(nowNodes.data.stepnum>1){
                    url='copyright/copyrightAffirm';
                }
                res.render(url,{crData:JSON.stringify(crData),
                    user:JSON.stringify(req.session.user),
                    crDataes:JSON.stringify(crDatase),
                    orderBody:JSON.stringify(orderBody),
                    allNodes:JSON.stringify(allNodes),
                    nowNodes:JSON.stringify(nowNodes),
                    server:JSON.stringify(server),
                    orderMsg:JSON.stringify(orderMsg),
                    patentFiles:JSON.stringify(patentFiles),
                    oData:(JSON.stringify(oData)||[]),
                    seo:seo,
                });
            }


        });
    },
    /**
     *增加客户信息---保存---暂存
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    copyrightMsg: function(req, res, next) {
        co(function *() {
            var getCrData = yield copyrightModule.copyrightMsg(req);
            var crData = yield getCrData.json();
            res.json(crData);
        });
    },
    /**
     *客户确认
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    copyrightKhAffirm: function(req, res, next) {
        co(function *() {
            var getCrData = yield copyrightModule.copyrightKhAffirm(req);
            var crData = yield getCrData.json();
            res.json(crData);
        });
    },
};