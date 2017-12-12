//var Login = {
//	init: function() {
//		this.initNode();
//		this.showNotice();
//		this.initAnimation();
//		this.addEvent();
//	},
//
//	initNode: function() {	// 初始化节点
//		this.$account = $('#j-account');
//		this.$pwd = $('#j-secret');
//		this.$errorMsg = $('#j-errorMsg');
//		this.$loginBtn = $('#j-loginBtn');
//		this.$footer = $('#footer');
//	},
//
//	initAnimation: function() {	// 添加动画
//		var $wrapper = $('#j-wrapper'),
//			wrapperClass = $wrapper.attr('class');
//		$wrapper.addClass('fadeInDown animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
//			$(this).removeClass().addClass(wrapperClass);
//		});
//	},
//
//	/**
//	* 如果浏览器非IE10,Chrome, FireFox, Safari, Opera的话，显示提示
//	*/
//	showNotice: function() {
//		var browser = this.getBrowser(),
//			temp = browser.split(' '),
//			appname = temp[0],
//			version = temp[1];
//		if (['msie', 'firefox', 'opera', 'safari', 'chrome'].contains(appname)) {
//			if (appname == 'msie' && version < 10) {
//				this.$footer.find('p').removeClass('hide');
//			}
//		} else {
//			this.$footer.find('p').removeClass('hide');
//		}
//	},
//
//	addEvent: function() {	// 绑定事件
//		var that = this;
//		this.$loginBtn.on('click', this.validate.bind(this));
//		$(document).on('keydown', function(e) {
//			var ev = e || window.event;
//			if (ev.keyCode === 13) {
//				that.validate();
//			}
//		});
//	},
//
//	validate: function() {	// 登录验证
//		var that = this,
//			account = $.trim(that.$account.val()),
//			pwd = that.$pwd.val(),
//			errorMsg = '';
//		if (account.length === 0) {
//			errorMsg = '帐号不能为空';
//		} else if (!pwd || pwd.length < 6) {
//			errorMsg = '密码长度至少6位';
//		} else {
//			that.$loginBtn.html('登录中...').attr('disabled', 'disabled');
//			that.requestLogin.call(that, account, pwd);
//			that.$loginBtn.html('登录').removeAttr('disabled');
//		}
//		that.$errorMsg.html(errorMsg).removeClass('hide');  // 显示错误信息
//		return false;
//	},
//	//这里做了个伪登录方式（实际上是把accid，token带到下个页面连SDK在做鉴权）
//	//一般应用服务器的应用会有自己的登录接口
//	requestLogin: function(account, pwd) {
//		setCookie('uid',account.toLocaleLowerCase());
//		//自己的appkey就不用加密了
//		setCookie('sdktoken',pwd);
////		setCookie('sdktoken',MD5(pwd));
//		window.location.href = '/webim/im/main.shtml';
//			
//	},
//
//	/**
//	* 获取浏览器的名称和版本号信息
//	*/
//	getBrowser: function() {
//		var browser = {
//			msie: false,
//			firefox: false,
//			opera: false,
//			safari: false,
//			chrome: false,
//			netscape: false,
//			appname: 'unknown',
//			version: 0
//		}, ua = window.navigator.userAgent.toLowerCase();
//		if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(ua)) {
//			browser[RegExp.$1] = true;
//			browser.appname = RegExp.$1;
//			browser.version = RegExp.$2;
//		} else if (/version\D+(\d[\d.]*).*safari/.test(ua)){ // safari
//			browser.safari = true;
//			browser.appname = 'safari';
//			browser.version = RegExp.$2;
//		}
//		return browser.appname + ' ' + browser.version;
//	}
//};
//Login.init();

/*
function contactGW(){
	$.ajax({
		url : '/im/getGWToken',
		type:'POST',
		async:false,
		dataType:"text",
        success: function (data) {
        	if(data == '1'){
        		var zg_imtokenid = getcookie('zg_imtokenid');
        		var zg_imtoken = getcookie('zg_imtoken');
        		//登录客户的IM账号，zg_user表中的imtokenid\imtoken
            	setCookie('uid',zg_imtokenid);
            	setCookie('sdktoken',zg_imtoken);
            	window.open("/webim/im/main.shtml");
        	}else if(data == '2'){
        	 	window.myAlert.alert('提示', '您未分配专属顾问，如有疑问，您可以联系客服咨询！');
        	}else if(data == '3'){
        		window.myAlert.alert('提示', 'imtoken生成错误！');
        	}else if(data == '4'){
        		window.location.href = '/login'
        	}
        },
        error: function (xhr, ajaxOptions, thrownError){
        	window.myAlert.alert('提示', '您的专属顾问聊天功能未开通，您可以联系客服咨询！');
        }
	});
}

function contactKF(){
	$.ajax({
		url : '/im/getKFToken',
		type:'POST',
		async:false,
		dataType:"text",
        success: function (data) {
        	if(data == '1'){
        		var zg_imtokenid = getcookie('zg_imtokenid');
        		var zg_imtoken = getcookie('zg_imtoken');
        		var sdktoken = getcookie('sdktoken');
        		//登录客户的IM账号，zg_user表中的imtokenid\imtoken
            	setCookie('uid',zg_imtokenid);
            	setCookie('sdktoken',zg_imtoken);
            	window.open("/webim/im/main.shtml");
        	}else if(data == '2'){
        		window.myAlert.alert('提示', '您的聊天账号创建失败，请拨打官网400电话咨询！');
        	}else if(data == '3'){
        		window.myAlert.alert('提示', '您的聊天账号创建失败，请拨打官网400电话咨询！');
        	}else if(data == '4'){
        		window.myAlert.alert('提示', '亲爱的果蜜，目前没有空闲客服，请您拨打官网400电话咨询！');
        	}
        },
        error: function (xhr, ajaxOptions, thrownError){
        	window.myAlert.alert('提示', '您的专属顾问聊天功能未开通，您可以联系客服咨询！');
        }
	});
}
*/


function getcookie(objname){//获取指定名称的cookie的值
	var arrstr = document.cookie.split("; ");
	for(var i = 0;i < arrstr.length;i ++){
		var temp = arrstr[i].split("=");
		if(temp[0] == objname) return unescape(temp[1]);
	}
}