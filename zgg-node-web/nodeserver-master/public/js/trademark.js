/**
 * Created by Administrator on 2017/2/20.
 */



/**
 * 变大的效果
 */
/*function productHover1(){
    var productClassify = $(".t-product1"),class_name = 'bushover';
    var _arr = ['328px','453px','-14px','-20px'],_arr2 = ["300px","395px","0px","0px"],_time = 350;
    var productHover = new homeEven();
    productHover.busHover(productClassify,class_name,_arr,_arr2,_time);
}
function productHover2(){
    var productClassify = $(".t-product2"),class_name = 'bushover';
    var _arr = ['328px','336px','-14px','-20px'],_arr2 = ["300px","296px","0px","0px"],_time = 350;
    var productHover = new homeEven();
    productHover.busHover(productClassify,class_name,_arr,_arr2,_time);
}
function productHover3(){
    var productClassify = $(".t-product3"),class_name = 'bushover';
    var _arr = ['328px','190px','-14px','-8px'],_arr2 = ["300px","173px","0px","0px"],_time = 350;
    var productHover = new homeEven();
    productHover.busHover(productClassify,class_name,_arr,_arr2,_time);
}*/
/**
 * 首页其他变大的效果
 */
/*function other_SeverMsg(){
    var productClassify = $(".other-SeverMsg.effect1"),class_name = 'other_SeverMsg_h';
    var _arr = ['353px','152px','-6px','-7px'],_arr2 = ["321px","138px","0px","0px"],_time = 350;
    var productHover = new homeEven();
    productHover.busHover(productClassify,class_name,_arr,_arr2,_time);
}
function other_SeverMsg(){
    var productClassify = $(".other-SeverMsg.effect2"),class_name = 'other_SeverMsg_h';
    var _arr = ["321px","152px","0px","0px"],_arr2 = ["300px","138px","0px","0px"],_time = 350;
    var productHover = new homeEven();
    productHover.busHover(productClassify,class_name,_arr,_arr2,_time);
}*/
//ie9兼容图片问题
(function browser1() {
    var browser = navigator.appName;
    var b_version = navigator.appVersion;
    var version = b_version.split(";");
    var trim_Version = version[1].replace(/[ ]/g, "");
    if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
        $('.an-box').addClass('ieCss');
    }
})();
window.onload = function() {
    navFixed();
    navHover();
    navShow();
    // quesNav();
}
$(document).ready(function() {
    /*  productHover1();
      productHover2();
      productHover3();*/
    /*other_SeverMsg();*/
})