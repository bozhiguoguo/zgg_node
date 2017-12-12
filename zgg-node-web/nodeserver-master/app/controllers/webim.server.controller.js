/**
 * Created by Administrator on 2017/2/21.
 */
var webimMoldel = require('../models/webim.server.model.js');
var co = require('co');
module.exports = {
    /*
       导航工具中打开IM聊天工具
     */
   getwebimPage:function (req,res,next) {
        co(function*() {
            var trLists;
            if (req.session.user){
                trLists = yield webimMoldel.webimPage(req);
            } else {
                trLists = yield webimMoldel.webimTempPage(req);
            }
            var trData = yield trLists.json();
            if(trData.data==''||trData.data==undefined){
                trData.data = [{}];
            }else{
                if(req.params.imType == "gw"){
                    if(trData.data.gwList.length > 0 ){
                        res.cookie("to_imtokenid",trData.data.gwList[0].imTokenId);
                        res.cookie("to_nickname",encodeURIComponent(trData.data.gwList[0].name));
                    }
                    res.cookie("uid",trData.data.zgUser.imtokenid);
                    res.cookie("sdktoken",trData.data.zgUser.imtoken);
                }
                if(req.params.imType == "kf")
                {
                    if (req.session.user){
                        res.cookie('uid',trData.data.zgUser.imtokenid);
                        res.cookie("sdktoken",trData.data.zgUser.imtoken);
                    } else {
                        res.cookie('uid',trData.data.imtokenid);
                        res.cookie("sdktoken",trData.data.imtoken);
                    }
                    res.cookie("to_imtokenid",trData.data.kfJson.imTokenId); //设置聊天顾问
                    res.cookie("to_nickname",encodeURIComponent(trData.data.kfJson.name));
                }
            }
            res.render('webim/main',{layout:false});
        });
    },
    //点击立即咨询打开IM聊天工具
    getwebimAdv:function (req,res,next) {
        co(function*() {
            var trLists;
            if (req.session.user){
                trLists = yield webimMoldel.webimPage(req);
                var trData = yield trLists.json();
                if(trData.data==''||trData.data==undefined){
                    trData.data = [{}];
                }else{
                    res.cookie("to_imtokenid",req.params.imtokenid);
                    res.cookie("to_nickname",encodeURIComponent(req.params.nickname));
                    res.cookie("uid",trData.data.zgUser.imtokenid);
                    res.cookie("sdktoken",trData.data.zgUser.imtoken);
                }
            } else {
                trLists = yield webimMoldel.webimTempPage(req);
                var trData = yield trLists.json();
                if(trData.data==''||trData.data==undefined){
                    trData.data = [{}];
                }else{
                    res.cookie('uid',trData.data.imtokenid);
                    res.cookie("sdktoken",trData.data.imtoken);
                    res.cookie("to_imtokenid",trData.data.kfJson.imTokenId); //设置聊天客服
                    res.cookie("to_nickname",encodeURIComponent(trData.data.kfJson.name));
                }
            }

            res.render('webim/main',{layout:false});
        });
    }
}