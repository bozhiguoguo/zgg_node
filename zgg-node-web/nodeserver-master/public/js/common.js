/**
 * Created by Administrator on 2017/2/17.
 */
$(function() {

    //IE兼容placdholder属性
    if(typeof $('input[placeholder],textarea[placeholder]').placeholder == 'function'){
        $('input[placeholder],textarea[placeholder]').placeholder();
    }
    $(".headerTop_search").click(function() {
        $(".hederTop_text").show();
        $(".headerTop_search").hide();
    })


    $(".tradReg_title").mouseenter(function() {
        $(this).find(".tradReg_requstion").stop().slideToggle();
    }).mouseleave(function() {
        $(this).find(".tradReg_requstion").stop().slideToggle();

    })
})

function TabChanges(ChangesEle, elseEle) {
    $('.' + elseEle).addClass('about_click').siblings().removeClass('about_click');
    $('.' + ChangesEle).show().siblings().hide();

}

// goTop.onclick = function(){
//     document.body.scrollTop = document.documentElement.scrollTop = 0;
// }
function sidebarTop() {
    var _timer = null,
        backtopvalue = "";
    document.getElementById("goTop").addEventListener("click", function() {

        _timer = setInterval(function() {
            backtopvalue = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            if (document.body.scrollTop) {
                document.body.scrollTop -= 200;
            } else if (document.documentElement.scrollTop) {
                document.documentElement.scrollTop -= 200
            }
            if (backtopvalue == 0) {
                clearInterval(_timer);
            }
        }, 30);
    }, false);
}
// goTop.onclick = function(){
//     document.body.scrollTop = document.documentElement.scrollTop = 0;
// }
/*
$(".main_tool_hover").mouseover(function(){
    $(".main_tool").show();
}).mouseout(function(){
    $(".main_tool").hide();
})*/

$("#oncs").find("li").on("mouseenter", function() {
    $(this).find('i').addClass("in");
});
$("#oncs").find("li").on("mouseleave", function() {
    $(this).find('i').removeClass("in");
});
/*$("#goTop").on("click", function () {
    $('body').animate({scrollTop: 0}, 500);
});*/

function homeEven() {
    /**
     * 划进划出显示
     * @param obj划动的对象
     * @param objMover显示效果的对象
     * @param _time执行的时间
     */
    that = this;
    this.navShow = function(obj, objMover, _time) {
            $(obj).mouseenter(function() {
                $(this).find(objMover).stop().show(_time);
            }).mouseleave(function() {
                $(this).find(objMover).stop().hide(_time);
            });
        }
        /**
         * 添加类名
         * @param obj执行的对象
         * @param class_name要添加的类名
         */
    this.navHover = function(obj, class_name) {
            obj.hover(function() {
                $(this).addClass(class_name).siblings().removeClass(class_name);
                var _index = $(this).index();
                $('.ctrlPlace>li').eq(_index).addClass('show').siblings().removeClass('show');
            });
        }
        /**
         * 图片放大效果
         * @param obj划过对象
         * @param class_name新增的类名
         * @param _arr划过之后变大的css样式
         * @param _arr2划过之后恢复原来效果的css样式
         * @param _time执行的时间
         */
        // this.busHover = function homeHover(obj,class_name,_arr,_arr2,_time) {
        // obj.mouseenter(function () {
        // $(this).stop().addClass(class_name).animate({
        //   width: _arr[0],
        //   height: _arr[1],
        //   marginTop:_arr[2],
        //   marginLeft:_arr[3],
        //},_time);
        // });
        // obj.mouseleave(function () {
        //  $(this).stop().animate({
        //   width: _arr2[0],
        //   height: _arr2[1],
        //   marginTop:_arr2[2],
        //   marginLeft:_arr2[3],
        //},500,function () {
        //$(this).removeClass(class_name)
        //});
        // });
        // }
        /**
         * 吸顶效果
         */
    this.moveFixed = function() {
            var fiexd_h = $('#navBox').offset().top;
            $(window).scroll(function() {
                if ($(window).scrollTop() >= fiexd_h) {
                    $('#navBox').addClass('navFixed');
                }
                if ($(window).scrollTop() < fiexd_h) {
                    $('#navBox').removeClass('navFixed');
                }
            });
        }
        /**
         * 吸底效果
         */
    this.moveFixed_b = function() {
        var fiexd_h = $('.footer').offset().top;
        $(window).scroll(function() {
            that.fixedInit()
        });
    }
    this.fixedInit = function() {
        fiexd_h = $('.footer').offset().top;
        if ($(window).scrollTop() + $(window).height() < fiexd_h) {
            $('#accounts').addClass('cartAccountsFixed');
        }
        // console.log($(window).scrollTop() +':'+fiexd_h +':'+$(window).height());
        if ($(window).scrollTop() + $(window).height() + 50 >= fiexd_h) {
            $('#accounts').removeClass('cartAccountsFixed');
        }
    }
}
/**
 * 导航条头部手机版本
 */
function navShowPhone() {
    var obj = '#phone_code',
        objMover = '.phone_code_show'
    var navShow = new homeEven();
    navShow.navShow(obj, objMover);
}
/**
 * 导航条的划出效果
 */

function navShow() {
    //判断是否在首页
    if (window.location.pathname != "/") return;
    $('.index_nav').mouseenter(function() {
        $(this).find('.topNav').stop().show();
        $(this).find('a').addClass('aHover').siblings().removeClass('aHover');
    }).mouseleave(function() {
        $(this).find('.topNav').stop().hide();
        $(this).find('a').removeClass('aHover');
    });
}
/**
 * 导航条的划出二级菜单之后二级菜单的划过效果
 */
function navHover() {
    var navHoverList = $(".topNav-left").find('li'),
        class_name = 'ahover';
    var navHover = new homeEven();
    navHover.navHover(navHoverList, class_name);
};
/**
 * 首页的问题部分的划过效果
 */
// function quesNav(){
//     var navHoverList = $(".quesNav").find('li'),class_name = 'quesNavShow';
//     var quesNav = new homeEven();
//     quesNav.navHover(navHoverList , class_name);
// };

$(".quesNav li").mouseenter(function() {
    $(this).addClass("quesNavShow").siblings().removeClass("quesNavShow");
    var index = $(".quesNav li").index($(this));
    $(".quesMsg>div").hide();
    $(".quesMsg>div").eq(index).show();
})

/**
 * 购物车的“订单详情”的效果
 */
function cartMsgHover() {
    var cartMsgList = $(".cartT_Msg"),
        objMover = '.cartT_MsgShow';
    var cartMsgHover = new homeEven();
    cartMsgHover.navShow(cartMsgList, objMover, 200);
};
/**
 * * 弹出框
 * @param class_name具体那个对象执行
 * @param layer_type执行的一些参事对象
 */
function layuiopen(class_name, layer_type) {
    layui.use('layer', function() { //独立版的layer无需执行这一句
        var $ = layui.jquery,
            layer = layui.layer; //独立版的layer无需执行这一句
        var active = {
            notice: function() {
                layer.open(layer_type);
            }
        };
        $(class_name).on('click', function() {
            var othis = $(this),
                method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        });
    });
}
/**
 * 吸顶和吸底函数
 */
function navFixed() {
    var navFixed = new homeEven();
    navFixed.moveFixed_b();
    navFixed.moveFixed();
}

function watchFiexd() {
    var navFixed = new homeEven();
    navFixed.fixedInit();
}
var passport = {
    messages: {
        en: function en(field, args) {
            return args + '请输入正确的账号';
        }
    },
    validate: function validate(value, args) {
        return (/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(value) || /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value));
    }
};
VeeValidate.Validator.extend('passport', passport);
var loginOpenVM = new Vue({
    el: '#login_open',
    delimiters: ["${", "}"],
    data: {
        userName: '',
        passWord: '',
    },
    methods: {
        validateBeforeSubmit: function(_data, _url) {
            this.$validator.validateAll().then(function() {
                $.ajax({
                    url: _url,
                    type: 'post',
                    data: _data,
                    success: function(_data) {
                        if (_data.success) {
                            layer.closeAll();
                            localStorage.isLogin = 'true';
                            window.location.reload();
                        } else {
                            layer.msg(_data.message);
                        }
                    }
                });
            })
        },
        enterEvent: function() {
            var _data = {
                passport: loginOpenVM.userName,
                passwd: loginOpenVM.passWord,
                code: 'abcd',
                type: 'json'
            }
            loginOpenVM.validateBeforeSubmit(_data, '/user/login');
        }
    },
});
// 登入注册
function user_reg() {
    var active = {
        notice: function() {
            layui.use('layer', function() {
                layer.open({
                    type: 1,
                    title: "登录", //false不显示标题栏,
                    // closeBtn: false,是否显示头部删除按钮
                    area: '450px;',
                    shade: 0.6,
                    id: 'LAY_layuipro', //设定一个id，防止重复弹出,
                    btn: ['确认', '取消'],
                    moveType: 1, //拖拽模式，0或者1,
                    content: $("#login_open"),
                    yes: function(index, layero) {
                        var _data = {
                            passport: loginOpenVM.userName,
                            passwd: loginOpenVM.passWord,
                            code: 'abcd',
                            type: 'json'
                        }
                        loginOpenVM.validateBeforeSubmit(_data, '/user/login');
                    },
                    success: function(layero) {
                        var btn = layero.find('.layui-layer-btn');
                        btn.css('text-align', 'center');
                        $('input[placeholder],textarea[placeholder]').placeholder();
                        //        data:{passport: "17710468624", passwd: "123123", code:"abcd",type:'json'},
                    }
                })
            })
        }
    };
    active.notice();
}
/**
 * 退出效果
 */
// (function quitUser() {
//     $("#quitUser").on('click',function () {
//         $.ajax({
//             type:"GET",
//             url:'/user/quitUser',
//             success:function (data) {
//                 if(data.success){
//                     window.location.reload();
//                 }
//             }
//         })
//     });
// })();

/**
 * 获取头部购物者的数量
 */
function cat_num() {
    $.ajax({
        type: "GET",
        url: "/user/getCartNun?" + new Date().getTime(),
        success: function(data) {
            $("#cart_nums").text(data.data);
        }
    });
}
window.onload = function() {
    //num_Add();
    /*busHover();
     productHover();*/
    navFixed();
    navHover();
    // quesNav();
    navShow();
    navShowPhone();
    if (navigator.cookieEnabled) {
        if (localStorage.isLogin == 'true') {
            cat_num();
        }
    } else {
        alert("对不起，您的浏览器的Cookie功能被禁用，请开启");
    }

    sidebarTop()
        // cart_del();
}