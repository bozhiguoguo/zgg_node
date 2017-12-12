/**
 * Created by Administrator on 2017/2/21.
 */
var commomServer = require('../models/common.server.model');
var config = require('config');
module.exports = {
    /**
     * 获取登录用户顾问\客服IM
     * @param name
     * @returns {*}
     */
    webimPage: function (req) {
        var url = config.apiUrl.pc + 'im/getImTokenInfo';
        return commomServer.callPort(url, "GET", req);
    },
    /**
     * 获取游客客服IM
     * @param name
     * @returns {*}
     */
    webimTempPage: function (req) {
        var url = config.apiUrl.pc + 'im/getTempUserImTokenInfo';
        return commomServer.callPort(url, "GET", req);
    },
}