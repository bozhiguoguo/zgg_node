/**
 * Created by Administrator on 2017/2/21.
 * author zhengqiang.liu
 * desc 产品详情页控制层
 * modify 2017-03-04
 */
var productMoldel = require('../models/product.server.model');
var config = require('config');
var request = require('request');
var userCenterMoldel = require('../models/userCenter.server.model');
var co = require('co');
module.exports = {
    detail:function (req, res, next) {
        var seo = config.seo.detail;
        co(function *() {
            var pDatares = yield productMoldel.getProductById(req);
            var pData = yield pDatares.json();
            if(!pData.success){
                res.redirect('/404');
            }
            if(pData.data.pcode.indexOf('saas_') >= 0){
                res.redirect('/404');
            }
            //获取产品描述
            var pDescres = yield productMoldel.getProductDescById(pData.data.productId,req);
            var pDesc = yield pDescres.json();


            //获取不同商品热销商品
            if(pData.data.typecode1.indexOf(['tr','pt','cr'])==-1){
                pData.data.typecode1 = 'other';
            }
            var pHotRecommendList = yield productMoldel.getHotRecommend('pc-detail-'+pData.data.typecode1+'-hot',req);
            var pHotRecommend = yield  pHotRecommendList.json();

            //获取关联商品
            var pRecommendList = yield productMoldel.findCmsProductRecommendPageByParam(pData.data.productId,req);
            var pRecommend = yield  pRecommendList.json();


            if(typeof pRecommend.data == "undefined"){
                pRecommend = {data:[]};
            }

            //获取当前登录账户的顾问信息
            var  adviser ="";
            if(req.session.user){
                req.params = {
                    pcode: pData.data.pcode
                };
                var gwLsit = yield userCenterMoldel.getGwDetailByUid(req);
                var gwData = yield gwLsit.json();
                var ptype =  req.params.pcode.substr(0,2);
                var gw_data = '';
                var kf_data = '';
                for(var i in gwData.data){
                    if(gwData.data[i].type == "kf"){
                        kf_data = gwData.data[i];
                    }else{
                        gw_data = gwData.data[i];
                        /*现不分部门，故注释；时间：2017-11-15*/
                        /*if(ptype == "tr" || ptype == "cr") {
                            if(gwData.data[i].dept == "trdept"){
                                gw_data = gwData.data[i];
                            }
                        }else if (ptype == "pt") {
                            if(gwData.data[i].dept== "padept") {
                                gw_data = gwData.data[i];
                            }
                        }else{
                            if(gwData.data[i].dept == "tppdept"){
                                gw_data = gwData.data[i];
                            }
                        }*/
                    }
                }
                if(gw_data==''|| gw_data==undefined){
                    adviser == kf_data;
                }else{
                    adviser = gw_data;
                }
            }
            var renderData = {seo:seo,pData:JSON.stringify(pData.data),pDesc:pDesc.data,pRecommend:pRecommend.data.list,pHotRecommend:pHotRecommend.data.list,pcode:pData.data.pcode,adviser:JSON.stringify(adviser)}

            var templateStr = "product/productDetail";
            //国保 果实  国益
            if(config.specialPcode.indexOf(pData.data.pcode)>=0){
                templateStr = "product/productDetail_special";
            }
            //买卖商标详情页
            if(config.businessTrPcode.indexOf(pData.data.pcode)>=0){
                templateStr = "product/productDetail_businessTr";
            }
            res.render(templateStr,renderData);
        })
    },
    informGw:function(req,res,next){
        co(function *() {
            var pDatares = yield productMoldel.informGw(req);
            var pData = yield pDatares.json();
            res.json(pData);
        })
    },
    //查看用户是否有资格购买法律产品体验包
    getBuyLawProductAuth:function(req,res,next){
        co(function *() {
            var pDatares = yield productMoldel.getBuyLawProductAuth(req);
            var pData = yield pDatares.json();
            res.json(pData);
        })
    }
}