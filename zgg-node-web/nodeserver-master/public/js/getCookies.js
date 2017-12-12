/**
 * Created by Administrator on 2017/9/26.
 */
//获取cookies方法封装
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}


//地址栏去参数方法封装
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//初始化调用封装
function createdCookies() {
    //获取cookies信息追加到地址栏
    var user = JSON.parse(getCookie('_zg_user'));
    //如果登录了之后才会判断
    if (user) {
        if (window.location.href.indexOf('?sid=') == -1) {
            window.location.href += '?sid=' + user.id;
        }
    }
}

//合同验证
function Contract(contractData) {
    //根据返回提示信息判断，提示用户
    if (contractData === '无此合同') {
        layer.open({
            title: '提示',
            content: '对不起，您没有权限浏览该文件！',
            btnAlign: 'c',
            btn1: function() {
                window.close()
            }
        });
    } else if (contractData === '对不起，您没有权限浏览该文件！') {
        layer.open({
            title: '提示',
            content: '对不起，您没有权限浏览该文件！',
            btnAlign: 'c',
            btn1: function() {
                window.close()
            }
        });
    }
}

