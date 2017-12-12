/**
 * Created by Administrator on 2017/2/21.
 * author zhengqiang.liu
 * desc 全局控制方法
 * modify 2017-03-14
 */
var commonModule = require("../models/common.server.model");
module.exports = {
	index: function(req, res, next) {
		var _text = testModule.test();
		res.render('test.jade',_text)


	}
};