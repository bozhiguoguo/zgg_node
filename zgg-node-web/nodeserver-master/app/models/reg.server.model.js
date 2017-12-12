/**
 * Created by Administrator on 2017/2/21.
 */
var commomServer = require('../models/common.server.model');
var config = require('config');
module.exports = {
    getReg:function(pId) {
        var url = config.apiUrl.base+'productPrice/getProductPriceById/'+pId;
        return commomServer.callPort(url,"GET",{});
    }
}