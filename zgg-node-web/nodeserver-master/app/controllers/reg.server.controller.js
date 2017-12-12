/**
 * Created by Administrator on 2017/2/21.
 */
var regMoldel = require('../models/reg.server.model');
module.exports = {
    detail:function (req, res, next) {
        var carts = yield regMoldel.getReg(req);

        res.render('reg/reg',{carts});
    }
}