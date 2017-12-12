/**
 * Created by Administrator on 2017/2/21.
 */
var tradSearchMoldel = require('../models/tradSearch.server.model.js');
var config = require('config');
var co = require('co');
module.exports = {
    index: function (req, res, next) {
        var seo = config.seo.detail;
        res.render('tradSearch/index',{seo:seo})
    },

    getSearch: function (req, res, next) {
        var seo = config.seo.detail;
        co(function *() {
            var trInfo = yield tradSearchMoldel.getSearch(req);
            var trInfo = yield trInfo.json();

            var trTwoChilderList = yield tradSearchMoldel.getZgTrademarkTwoListByPid(req);
            var trTwoChilderJson = yield trTwoChilderList.json();

            res.render('tradSearch/search', {seo:seo,trInfo:JSON.stringify(trInfo.data),trTwoChilderData:JSON.stringify(trTwoChilderJson.data)});
        })
    },

    /**
     * ��ȡ������������
     * @param req
     * @param res
     * @param next
     */
    getZgTrademarkThreeList: function (req, res, next) {
        var seo = config.seo.detail;
        co(function *() {
            var trInfo1 = yield tradSearchMoldel.getZgTrademarkThreeListByPid(req);
            var trInfoData = yield trInfo1.json();
            res.json(trInfoData);
        })
    },

    classification: function (req, res, next) {
        var seo = config.seo.detail;
        co(function *() {
            req.body={
                "content":req.params.content,
                "pageParam":{
                    "pageNo":1,
                    "pageSize":10
                }
            };
            var trInfo = yield tradSearchMoldel.searchTRName(req);
            var trName = yield trInfo.json();
            res.render('tradSearch/classification', {seo:seo,trName:JSON.stringify(trName.data)});
        })
    },

    getclassification: function (req, res, next) {
        co(function *() {
           /* req.body={
                "content":req.body.content,
                "pageParam":{
                    "pageNo":1,
                    "pageSize":10
                }
            };*/
            var trInfo = yield tradSearchMoldel.searchTRName(req);
            var trName = yield trInfo.json();
            //res.render('tradSearch/classification', {seo:seo,trData:JSON.stringify(trData.data)});
            res.json(trName);
        })
    },

}