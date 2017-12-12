/**
 * 主要业务逻辑相关
 */
debugger;
var userUID = readCookie("uid")
/**
 * 实例化
 * @see module/base/js
 */
var yunXin = new YX(userUID)

/**
 * 默认打开聊天窗口
 * @param account 对方tokenID
 * @param scene p2p个人点对点聊天
 */
var to_imtokenid = getcookie("to_imtokenid");//顾问id
yunXin.openChatBox(to_imtokenid,'p2p');//打开聊天窗口
$(".m-emoji-wrapper").hide(); //打开窗口时，隐藏图标窗口


//获取nickname
window.getNick = function(imtokenId){
	var  nickName = decodeURIComponent(getcookie("to_nickname"));//顾问名称
	return nickName
}


//获取指定名称的cookie的值
function getcookie(objname){
	var arrstr = document.cookie.split("; ");
	for(var i = 0;i < arrstr.length;i ++){
		var temp = arrstr[i].split("=");
		if(temp[0] == objname) return unescape(temp[1]);
	}
}