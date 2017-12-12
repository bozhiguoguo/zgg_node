/**
 * Created by Administrator on 2017/2/21.
 * author weiotao.zhu
 * desc 购物车model
 * modify 2017-03-09
 */
var commomServer = require('../models/common.server.model');
var config = require('config');
module.exports = {
    /**
     * 获取购物车列表
     * @param pId
     * @returns {*}
     */
    getCart:function(req) {
        var url = config.apiUrl.pc+'zgProductShoppinglist/getShopListPageViewByUid';
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 获取订单明细
     * @param pId
     * @returns {*}
     */
    getp_price:function (req) {
        var url = config.apiUrl.pc+'zgProductShoppinglist/getZgProductShoppinglistById/'+req.body.pId;
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 数量的变化
     * @param pId
     * @returns {*}
     */
    numChange:function (req) {
        var url = config.apiUrl.pc+'zgProductShoppinglist/updateZgProductShoppinglist';
        return commomServer.callPort(url,"PUT",req);
    },
    /**
     * 新增购物车
     * @param data
     * @returns {*}
     */
    addCart:function(req) {
        var url = config.apiUrl.pc+'zgProductShoppinglist/saveZgProductShoppinglist';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 删除单个商品
     * @param data
     * @returns {*}
     */
    delCart:function(req) {
        var url = config.apiUrl.pc+'zgProductShoppinglist/deleteZgProductShoppinglistById/'+req.body.id;
        return commomServer.callPort(url,"DELETE",req);
    },
    /**
     * 批量删除商品
     * @param data
     * @returns {*}
     */
    delAllCart:function(req) {
        var url = config.apiUrl.pc+'zgProductShoppinglist/deleteManyZgProductShoppinglistByIds/'+req.body.id;
        return commomServer.callPort(url,"DELETE",req);
    },
    /**
     * 结算
     * @param data
     * @returns {*}
     */
    accountCart:function(req) {
        var url = config.apiUrl.pc+'zgProductShoppinglist/getGoPayPageViewByUid/'+req.body.ids;
        return commomServer.callPort(url,"GET",req);
    },
    /**
     * 结算--刷新
     * @param data
     * @returns {*}
     */
    accountCartAgg:function(req) {
        var url = config.apiUrl.pc+'zgProductShoppinglist/getGoPayPageViewByUid/'+req.cookies.ids;
        return commomServer.callPort(url,"GET",req);
    }

}