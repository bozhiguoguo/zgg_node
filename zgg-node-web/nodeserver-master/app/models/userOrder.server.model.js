/**
 * Created by Administrator on 2017/2/21.
 * author zhengqiang.liu
 * desc 用户订单model
 * modify 2017-03-04
 */
var commomServer = require('../models/common.server.model');
var config = require('config');
module.exports = {
    /**
     * 获取订单列表
     * @param req
     * @returns {*}
     */
    getUserOrderList: function (req) {
        req.body.pageParam = {
            "pageNo": req.body.pageNo||1,
            "pageSize": req.body.pageSize|| 10
        };
        var url = config.apiUrl.pc + 'zgOrderMain/getZgOrderList';
        return commomServer.callPort(url, "POST", req);
    },
    /**
     * 一键委托
     * @param req
     * @returns {*}
     **/
    entrust: function (req) {
        var url = config.apiUrl.pc + 'zgOrder/entrust';
        return commomServer.callPort(url, "POST", req);
    },
    /**
     * 根据合同号查询文件信息
     * @param req
     * @returns {*}
     */
    contractFile:function (req) {
        var url = config.apiUrl.pc + 'zgOrderContract/contractFile/'+req.params.contractCode;
        return commomServer.callPort(url, "GET", req);
    },
    /**
     * 确认合同
     * @param req
     * @returns {*}
     */
    confirmContract:function (req) {
        var url = config.apiUrl.pc + 'zgOrderContract/confirmContract/';
        return commomServer.callPort(url, "POST", req);
    },
    /**
     * 删除合同号
     * @param req
     * @returns {*}
     */
    deleteContracByConcode:function(req){
        var url = config.apiUrl.pc + 'zgOrderContract/deleteContracByConcode/'+req.body.contractCode;
        return commomServer.callPort(url, "get", req)
    },
    /**
     *获取合同状态
     *@param req
     * @returns {*}
     */
    statusContracByConcode:function (req) {
        var url = config.apiUrl.pc + 'zgOrderContract/statusContracByConcode/'+req.params.Concode;
        return commomServer.callPort(url, "GET", req)
    },
    /**
     * 解锁合同
     * @param req
     * @returns {*}
     */
    cancelContracByConcode:function (req) {
        var url = config.apiUrl.pc + 'zgOrderContract/cancelContracByConcode/'+req.params.Concode;
        return commomServer.callPort(url, "GET", req)
    },
    /**
     *  预览合同
      * @param req
     * @returns {*}
     */
    getContracByConcode:function (req) {
        var url = config.apiUrl.pc + 'zgOrderContract/contractFile/'+req.params.Concode;
        return commomServer.callPort(url, "GET", req)
    },
    /**
     * 下载合同先生成pdf
     */
    downContracByConcode:function (req) {
        var url = config.apiUrl.pc + 'zgOrderContract/contractDown/'+req.params.ptype+'/'+req.params.Concode;
        return commomServer.callPort(url, "GET", req)
    },
    /**
     * 通过路径下载pdf合同
     */
    downContracByPathConcode:function (req) {
        var url = config.apiUrl.pc + '/base/getfile/getContractFile?path='+unescape(req.params.path)+'&concode='+req.params.Concode;
        return commomServer.callPort(url, "GET", req)
    },
    /**
     * 获取已退款订单列表
     * @param req
     * @returns {*}
     */
    getZgOrderRefundList:function (req) {
        req.body.pageParam = {
            "pageNo": req.body.pageNo||1,
            "pageSize": req.body.pageSize|| 10
        };
        var url = config.apiUrl.pc + 'zgOrderMain/getZgOrderRefundList';
        return commomServer.callPort(url, "POST", req);
    },
    /**
     * 合同用户验证接口方式
     * @param req
     * @returns {*}
     */
    validateSameContractIfSameUser:function (req) {
        var url = config.apiUrl.pc + 'orderDetails/validateSameContractIfSameUser';
        return commomServer.callPort(url, "POST", req);
    },
	/**
	 * 查看变更信息
	 * @param req
	 * @returns {*}
	 */
	getModifyInfo:function (req,params,res,next) {
		var url = config.apiUrl.pc + 'zgOrderAppend/getZgOrderAppendByOrdercode/'+ params;
		return commomServer.callPort(url, "GET", req);
	},
}