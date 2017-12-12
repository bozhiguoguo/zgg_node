var categoryModule = require("../models/category.server.model");
var userCenterMoldel = require("../models/userCenter.server.model");
var co = require('co');
var config = require('config');

module.exports = {
	getPage: function(req, res, next) {
        var seo = config.seo.detail;
		co(function *() {
            var _orderDetail = yield categoryModule.getOrderDetail(req, req.params.orderId) //获取订单详情
            var orderDetail = yield _orderDetail.json();
            var userO = yield userCenterMoldel.getuserCenterOrders(req);//未处理定单
            var oData = yield userO.json();
            var ChannelId = '';
            if(orderDetail.data){
                ChannelId = orderDetail.data.pcode;
                var _allNodes = yield categoryModule.getAllNodes(req, ChannelId)// 根据产品ID获取所有的节点
                var allNodes = yield _allNodes.json();
                var _addChannel = yield categoryModule.getOrderFee(req, orderDetail.data.orderCode)//根据订单号获取附加商品
                var addChannel = yield _addChannel.json();
                var _atPresentNodes = yield categoryModule.getAtPresentNodes(req, req.params.orderId)//根据orderId获取当前节点
                var atPresentNodes = yield _atPresentNodes.json();
            }
            if(req.params.flowType == 'product_conmmon_flow'){
                var _commonStencil = yield categoryModule.getCommonStencil(req, req.params.orderId)//根据orderId获取通用模版
                var _commonStencilWord = yield _commonStencil.json();
                var data = {
                    user:JSON.parse(req.session.user),
                    params: req.params,
                    orderData: orderDetail.data,
                    allNodes: allNodes!=null?allNodes.data:null,
                    atPresentNodes: atPresentNodes.data,
                    oData: oData.data,
                    word:_commonStencilWord.data
                };
                res.render('noFlow/noFlow', {data:JSON.stringify(data),seo:seo});

            }else if(req.params.flowType == 'tr_bohui'){
                //var _rejectDetail = yield categoryModule.getRejectDetail(req, req.params.orderId)//获取驳回业务详情
                //var rejectDetail = yield _rejectDetail.json();
                var _orderBody = yield  categoryModule.getOrderBody(req, req.params.orderId)//获取订单主体
                var orderBody = yield _orderBody.json();
                var data = {
                    user:JSON.parse(req.session.user),
                    params: req.params,
                    orderData: orderDetail.data || '无此数据',
                    allNodes: (allNodes!=null && typeof allNodes.data != 'undefined')?allNodes.data:null,
                    atPresentNodes: atPresentNodes.data,
                    oData: oData.data,
                    orderBody: orderBody.data,
                    //rejectDetail: rejectDetail.data,
                };
                res.render('trademark/dismissReview', {data:JSON.stringify(data),seo:seo});
            }else{
                var _businessDetail = yield categoryModule.getbusinessDetail(req, req.params.orderId)//获取业务详情
                var businessDetail = yield _businessDetail.json();
                var _orderBody = yield  categoryModule.getOrderBody(req, req.params.orderId)//获取订单主体
                var orderBody = yield _orderBody.json();
                var _fileDownloads = yield categoryModule.downloadFile(req, req.params.orderId,orderDetail.data.pcode)//获取订单下载文件
                var fileDownloads = yield _fileDownloads.json();
                var data = {
                    user:JSON.parse(req.session.user),
                    params: req.params,
                    orderData: orderDetail.data,
                    orderBody: orderBody.data,
                    fileDownloads: fileDownloads.data,
                    allNodes: allNodes!=null?allNodes.data:null,
                    atPresentNodes: atPresentNodes.data,
                    addChannel : addChannel.data,
                    businessDetail: businessDetail.data,
                    oData: oData.data
                }
                if(orderDetail.data.pcode == 'tr_reg_11'){
                    var _fileText = yield categoryModule.getApplyInfoRegTrademarkByOrderId(req, req.params.orderId)//获取订单318上传信息
                    var fileText = yield _fileText.json();
                    data.fileText = fileText.data;
                }
                res.render('trademark/trademarkReg', {data:JSON.stringify(data),seo:seo});
            }


		})
	},
    /**
     * 通用流程---商标申请书修改
     * @param req
     * @param res
     * @param next
     */
    getApplyInfoRegTrademarkByOrderId: function (req, res, next) {
        co(function *() {
            var _fileText = yield categoryModule.downloadText(req, res, next)//获取订单318上传信息
            var fileText = yield _fileText.json();
            res.json(fileText)
        })
    },
    /**
     * 通用流程---上传资料---保存提交
     * @param req
     * @param res
     * @param next
     */
    getCurrentNode: function (req, res, next) {
        co(function *() {
            var _atPresentNodes = yield categoryModule.getCurrentNode(req, req, next)//根据orderId获取当前节点
            var atPresentNodes = yield _atPresentNodes.json();
            res.json(atPresentNodes)
        })
    },
    /**
     * 通用流程---上传资料---保存提交
     * @param req
     * @param res
     * @param next
     */
    postUpdataText: function (req, res, next) {
        co(function *() {
            var _btnText = yield categoryModule.postUpdataTexts(req);
            var btnTexts = yield _btnText.json();
            res.json(btnTexts)
        })
    },
    getCategoryFirstList: function (req, res, next) {
        co(function *() {
            var _FirstList = yield categoryModule.getFirstList(req);
            var FirstList = yield _FirstList.json();
            res.json(FirstList)
        })
    },

    getCategorySubList: function (req, res, next) {
        co(function *() {
            var _subList = yield categoryModule.getCategorySubList(req,req.params.id);
            var subList = yield _subList.json();
            res.json(subList)
        })
    },
    getCategoryEndList: function (req, res, next) {
        co(function *() {
            var _endList = yield categoryModule.getCategoryEndList(req,req.params.pid);
            var endList = yield _endList.json();
            res.json(endList)
        })
    },
    searchItem: function (req, res, next) {
        co(function *() {
            var _searchList = yield categoryModule.searchItem(req,decodeURI(req.params.keywords));
            var searchList = yield _searchList.json();
            res.json(searchList)
        })
    },
    entrust: function (req, res, next) {
        co(function *() {
            var _result = yield categoryModule.entrust(req,req.params.orderId);
            var result = yield _result.json();
            res.json(result)
        })
    },
    cancelEntrust: function (req, res, next) {
        co(function *() {
            var _result = yield categoryModule.cancelEntrust(req,req.params.orderId);
            var result = yield _result.json();
            res.json(result)
        })
    },
    /**
     * 商标业务--确定提交
     * @param req
     * @param res
     * @param next
     */
    trSave: function (req, res, next) {
        co(function *() {
            var _result = yield categoryModule.trSave(req,req.params);
            var result = yield _result.json();
            res.json(result)
        })
    },
    /**
     * 318商标业务--下一步或保存
     * @param req
     * @param res
     * @param next
     */
    trNextSave: function (req, res, next) {
        co(function *() {
            var _result = yield categoryModule.nextSave(req);
            var result = yield _result.json();
            res.json(result)
        })
    },
    getcategoryByPid: function (req, res, next) {
        co(function *() {
            var _result = yield categoryModule.getcategoryByPid(req,req.params.pid);
            var result = yield _result.json();
            res.json(result)
        })
    },

    getcategoryById: function (req, res, next) {
        co(function *() {
            var _result = yield categoryModule.getcategoryById(req,req.params.Id);
            var result = yield _result.json();
            res.json(result)
        })
    },
    /**
     * 客户确认或者318产品确定
     * @param req
     * @param res
     * @param next
     */
    customSure: function (req, res, next) {
        co(function *() {
            var _result = yield categoryModule.customSure(req,req.params);
            var result = yield _result.json();
            res.json(result)
        })
    },
    /**
     * 商标业务办理---返回修改
     * @param req
     * @param res
     * @param next
     */
    goBack: function (req, res, next) {
        co(function *() {
            var _result = yield categoryModule.goBack(req,req.body.orderId);
            var result = yield _result.json();
            res.json(result)
        })
    },
    /*根据申请号查询匹配*/
    getOrderIdInfoData: function (req, res,next) {
        co(function *() {
            var _result = yield categoryModule.getOrderInfo(req);
            var result = yield _result.json();
            res.json(result)
        })
    },
    /*根据申请号匹配成功提交*/
    saveData: function (req, res,next) {
        co(function *() {
            var _result = yield categoryModule.saveData(req);
            var result = yield _result.json();
            res.json(result)
        })
    },
    /*驳回复审详情*/
    getRejectDetail: function (req, res,next) {
        co(function *() {
            var _result = yield categoryModule.getRejectDetail(req);
            var result = yield _result.json();
            res.json(result)
        })
    },
    /*驳回复审详情*/
    getRejectFiles: function (req, res,next) {
        co(function *() {
            var _result = yield categoryModule.getRejectFiles(req);
            var result = yield _result.json();
            res.json(result)
        })
    },
    /*客户确认*/
    getFilesConfirm: function (req, res,next) {
        co(function *() {
            var _result = yield categoryModule.getFilesConfirm(req);
            var result = yield _result.json();
            res.json(result)
        })
    },
    /*大项里面搜索小项*/
    getZgTrademarkThreeList: function (req, res,next) {
        co(function *() {
            var _result = yield categoryModule.getZgTrademarkThreeList(req);
            var result = yield _result.json();
            res.json(result)
        })
    },
    /*设置默认值*/
    selectTrademarkItemsByCategory: function (req, res,next) {
        co(function *() {
            var _result = yield categoryModule.selectTrademarkItemsByCategory(req);
            var result = yield _result.json();
            res.json(result)
        })
    },
    //getRejectFiles
};