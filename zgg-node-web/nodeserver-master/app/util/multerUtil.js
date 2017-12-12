/**
 * Created by Administrator on 2017-03-18.
 */
var  multer=require('multer');
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        // cb(null, file.fieldname + '-' + Date.now() +fileFormat[0]+ "." + fileFormat[fileFormat.length - 1].toUpperCase());//5月25号，将上传到本地的文件后缀名全部改为大写
        cb(null, file.fieldname + '-' + Date.now() +fileFormat[0]+ "." + fileFormat[fileFormat.length - 1]);//5月25号，不改变后缀名的方法
    }
});
//添加配置文件到muler对象。
var upload = multer({
    storage: storage,
    limits: {
        fieldNameSize: 50,
        fieldSize: 1024 * 1024 * 2
    }
});

//如需其他设置，请参考multer的limits,使用方法如下。
//var upload = multer({
//    storage: storage,
//    limits:{}
// });

//导出对象
module.exports = upload;