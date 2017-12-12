/**
 * Created by Administrator on 2017/2/21.
 */
var commomServer = require('../models/common.server.model');
var config = require('config');
module.exports = {
    /**
     * 获取商标查询列表数据
     * @param name
     * @returns {*}
     */
    searchTRPage:function(req) {
        var url = config.apiUrl.pc+'trTools/informationquery';
        return commomServer.callPort(url,"POST",req);
    },
    /**
     * 获取商标详情信息
     * @param regnum
     * @returns {*}
     */
    searchTRDetail:function(req) {
        var url = config.apiUrl.pc+'trTools/showDetail/'+req.params.regno+'/'+req.params.tmtype;
        return commomServer.callPort(url,"GET",req);
    },

}