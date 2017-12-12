/**
 * Created by Administrator on 2017-03-18.
 */
var  multer=require('multer');
var fs = require('fs');
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        var baseUrl = 'public/uploads/'+Date.now();
        if (!fs.existsSync(baseUrl)) {
            fs.mkdirSync(baseUrl);
            cb(null, baseUrl)
        }
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, fileFormat[0]+ "." + fileFormat[fileFormat.length - 1]);
    }
});
//添加配置文件到muler对象。
var upload = multer({
    storage: storage
});

//如需其他设置，请参考multer的limits,使用方法如下。
//var upload = multer({
//    storage: storage,
//    limits:{}
// });

//导出对象
module.exports = upload;