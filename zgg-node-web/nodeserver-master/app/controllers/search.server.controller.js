/**
 * Created by Administrator on 2017/2/21.
 */
var searchMoldel = require('../models/search.server.model');
var co = require('co');
var config = require('config');
module.exports = {
    /**
     * 商标查询工具列表展示--刷新
     * @param req
     * @param res
     * @param next
     */
    getSearchTRPage: function (req, res, next) {
        co(function *() {
            //req.body.searchForm = req.cookie.searchForm
            var trLists = yield searchMoldel.searchTRPage(req);
            var trData = yield trLists.json();
            if(trData.data==''||trData.data==undefined){
                trData.data = [{}];
            }
            res.render('searchTools/searchResultPage', {trData:JSON.stringify(trData.data),keyWords:req.body.regno});
        })
    },
    /**
     * 商标查询工具列表展示
     * @param req
     * @param res
     * @param next
     */
    searchTRPage: function (req, res, next) {
        var seo = config.seo.detail;
        co(function *() {
            var trLists = yield searchMoldel.searchTRPage(req);
            var trData = yield trLists.json();
            if(trData.data==''||trData.data==undefined){
                trData.data = [{}];
            }
            if(!trData.data.inforegnolist){
                trData.data.inforegnolist = [];
            }else{
                trData.data.inforegnolist = trData.data.inforegnolist;
            }
            if (trData.success) {
                res.cookie('searchForm', req.body.searchForm);
            }
            res.render('searchTools/searchResultPage', {trData:JSON.stringify(trData.data),keyWords:req.body.regno,seo:seo});
        })
    },

    /**
     * 商标查询工具列表展示[JSON]
     * @param req
     * @param res
     * @param next
     */
    searchTRPageToJson: function (req, res, next) {
    co(function *() {
        var trLists = yield searchMoldel.searchTRPage(req);
        var trData = yield trLists.json();
        // console.log(trData);
        if(!trData.success||trData.data==undefined){
            trData.data = [{}]
        }
        res.json(trData);
    })},
    /**
     * 商标信息展示
     * @param req
     * @param res
     * @param next
     */
    searchTRDetail: function (req, res, next) {
        var seo = config.seo.detail;
        co(function *() {
            var trInfo = yield searchMoldel.searchTRDetail(req);
            var trInfo = yield trInfo.json();
            res.render('searchTools/searchResultDetail', {seo:seo,trInfo:JSON.stringify(trInfo.data)});
        })
    },

}