/**
 * Created by Administrator on 2017/2/21.
 * author weiotao.zhu
 * desc 购物车controllers
 * modify 2017-03-09
 */
var cartMoldel = require('../models/cart.server.model');
var config = require('config');
var co = require('co');
module.exports = {
    index: function (req, res, next) {
        var seo = config.seo.detail;
        co(function *() {
            var carts = yield cartMoldel.getCart(req);
            var cData = yield carts.json();
            if(cData.data==''||cData.data==undefined){
                cData.data = [{}]
            }
            res.render('cart/cart', {cData:JSON.stringify(cData.data),seo:seo});
        })
    },
    /**
     * 价格明细
     * @param req
     * @param res
     * @param next
     */
    pPriceMsg:function (req,res,next) {
        co(function *() {
            var pPrice = yield cartMoldel.getp_price(req);
            var pPriceMsg = yield pPrice.json();
            res.json(pPriceMsg);
        })
    },
    /**
     * 数量变化
     * @param req
     * @param res
     * @param next
     */
    numChange:function (req ,res ,next ) {
        co(function *() {
            var numChange = yield cartMoldel.numChange(req);
            var num_Change = yield numChange.json();
            res.json(num_Change);
        })
    },
    /**
     * 加入购物车
     * @param req
     * @param res
     * @param next
     */
    add:function (req,res,next) {
        co(function *() {
            var carts = yield cartMoldel.addCart(req);
            var cData = yield carts.json();
            res.json(cData);
        })
    },
    /**
     * 删除单个商品
     * @param req
     * @param res
     * @param next
     */
    del:function (req ,res ,next ) {
        co(function *() {
            var del_P = yield cartMoldel.delCart(req);
            var del_PNum = yield del_P.json();
            res.json(del_PNum);
        })
    },
    /**
     * 批量删除商品
     * @param req
     * @param res
     * @param next
     */
    delAll:function (req ,res ,next ) {
        co(function *() {
            var del_AllP = yield cartMoldel.delAllCart(req);
            var del_PNum = yield del_AllP.json();
            res.json(del_PNum);
        })
    },


}