/**
 * Created by Administrator on 2017/2/17.
 */

function cart_del(id) {
    layui.use('layer', function() { //独立版的layer无需执行这一句
        var $ = layui.jquery,
            layer = layui.layer; //独立版的layer无需执行这一句
        var active = {
            notice: function() {
                layer.open({
                    type: 1,
                    title: "删除订单", //false不显示标题栏,
                    area: '350px;',
                    shade: 0.6,
                    id: 'LAY_layuipro', //设定一个id，防止重复弹出,
                    btn: ['取消', '确认'],
                    moveType: 1, //拖拽模式，0或者1,
                    content: '<div style="padding:30px 25px;font-size: 16px;color: #2a2a2a;">确认删除订单？</div>   ',
                    success: function(layero) {
                        var btn = layero.find('.layui-layer-btn');
                        btn.css('text-align', 'center');
                        btn.find('.layui-layer-btn1').on('click', function() {
                            $.ajax({
                                url: '/cart/del',
                                type: 'post',
                                data: {
                                    id: id
                                },
                                success: function(_data) {
                                    // $(this).parent('li').parent('ul').slideUp();
                                }
                            })
                        });
                    }
                });
            }
        };
        $('#LAY_demo .layui-btn').on('click', function() {
            var othis = $(this),
                method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        });
    });
}

function cartCheck() {
    var isTrue = false;
    $(".cartCheckAll").on("click", function() {
        var thisObj = ".cartCheck";
        var isAllTrue = isTrue_f();
        Check_data(thisObj, isAllTrue);
        if (isAllTrue == true) {
            $(".cartCheckAll").css({
                backgroundImage: 'url(../img/icon-shoppingcart-tickbox-selected.png)'
            });
            $('.cartAccountsFixed').css({
                backgroundColor: "#f3e4d7"
            });
        }
        if (isAllTrue == false) {
            $(".cartCheckAll").css({
                backgroundImage: 'url(../img/icon-shoppingcart-tickbox.png)'
            });
            $('.cartAccountsFixed').css({
                backgroundColor: "#eff0f4"
            });
        }
    });
    $(".cartCheck").on("click", function() {
        var thisObj = this;
        var isOneTrue = ($(this).attr('data') == 'false' ? true : false);
        var account_true = isTrue_f();
        Check_data(thisObj, isOneTrue);
    });

    function isTrue_f() {
        var isAllTrue = false;
        for (var i = 0; i < $(".cartCheck").length; i++) {
            if ($($(".cartCheck")[i]).attr('data') == 'false') {
                isAllTrue = true;
            } else {
                isAllTrue = false;
            }
        }
        if (isAllTrue) {

        } else if (!isAllTrue) {

        }
        return isAllTrue;
    }

    function Check_data(thisObj, is_True) {
        if (is_True) {
            $(thisObj).css({
                backgroundImage: 'url(../img/icon-shoppingcart-tickbox-selected.png)'
            });
            $(thisObj).parent('.cartTd1').parent('ul').css({
                backgroundColor: "#fcf3ec",
                borderColor: "#e3cab7"
            });
            $(thisObj).attr({
                'data': 'true'
            });
        } else if (!is_True) {
            $(thisObj).css({
                backgroundImage: 'url(../img/icon-shoppingcart-tickbox.png)'
            });
            $(thisObj).parent('.cartTd1').parent('ul').css({
                backgroundColor: "#fff",
                borderColor: "#dcdcdc"
            });
            $(thisObj).attr({
                'data': 'false'
            });
        }
    }
}
/**
 * 购物车的吸底函数
 */
function navFixed() {
    var navFixed = new homeEven();
    navFixed.moveFixed_b();
    navFixed.moveFixed();
}
window.onload = function() {
    $("#header_t").load("header.html", function() {
        $("#footer_t").load("footer.html", function() {
            cartMsgHover();
            cartCheck();
            cart_del();
            navFixed();
            navHover();
            navShow();
            cartMsgHover();
        });
    });
}