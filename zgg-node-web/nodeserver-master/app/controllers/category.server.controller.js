var categoryModule = require("../models/category.server.model");
var co = require('co');
var config = require('config');
module.exports = {
	getPage: function(req, res, next) {
		// if(req.split('_',1))
		co(function *() {
            if(req.params.code =='trademark'){
                var _getTrChannelReg = yield categoryModule.getHotSale(req,{typecode2:'tr_reg',pageParam:{}});
                var _getTrChannelReject =yield categoryModule.getHotSale(req,{typecode2:'tr_refr',pageParam:{}});
                var _getTrChannelDissent = yield categoryModule.getHotSale(req,{typecode2:'tr_dis',pageParam:{}});
                var _getTrChannelOther = yield categoryModule.getHotSale(req,{tagsCode:'pc-trChannel-other',pageParam:{"pageNo":"1","pageSize":"1000"}});
                var data = {
                    TrChannelReg :  yield _getTrChannelReg.json(),
                    TrChannelReject : yield _getTrChannelReject.json(),
                    TrChannelDissent : yield _getTrChannelDissent.json(),
                    TrChannelOther :yield _getTrChannelOther.json()
                }
            }else if(req.params.code =='copyright'){
                var _getHotCrChannel = yield categoryModule.getHotSale(req,{typeCode1:'cr',pageParam:{}});
                var data = {
                    HotCrChiannel: yield  _getHotCrChannel.json()
                }
            }else if(req.params.code =='patent'){
                var _getHotPtChannelfmzl = yield categoryModule.getHotSale(req,{typecode2:'pt_inv',pageParam:{}});
                var _getHotPtChannelsyxxzl = yield categoryModule.getHotSale(req,{typecode2:'pt_um',pageParam:{}});
                var _getHotPtChannelwgzl  = yield categoryModule.getHotSale(req,{typecode2:'pt_ow',pageParam:{}});
                var _getPtChannelOther  = yield categoryModule.getHotSale(req,{tagsCode:'pc-ptChannel-other',pageParam:{"pageNo":"1","pageSize":"1000"}});
                var data = {
                    HotPtChannelfmzl :  yield _getHotPtChannelfmzl.json(),
                    HotPtChannelsyxxzl : yield _getHotPtChannelsyxxzl.json(),
                    HotPtChannelwgzl :yield _getHotPtChannelwgzl.json(),
                    PtChannelOther :yield _getPtChannelOther.json()
                }
            }
            var seo = config.seo.category;
            res.render('category/'+req.params.code,{oData:data,seo:seo});
		})
	}
};