/**
 * Created by Administrator on 2017/2/21.
 */
$(function() {
    $(".coupon_type").mouseover(function() {
        $(this).find('span>img').attr('src', '../img/icon-coupon-dropdown-copy.png');
        $(".coupon_product").show();
    }).mouseout(function() {
        $(this).find('span>img').attr('src', '../img/icon-coupon-dropdown.png');
        $(".coupon_product").hide();
    })



    function coupon_act() {
        var class_name = '#activation .layui-act';
        var layer_type = {
            type: 1,
            title: "激活优惠券", //false不显示标题栏,
            // closeBtn: false,是否显示头部删除按钮
            area: '480px;',
            shade: 0.6,
            id: 'LAY_layuipro', //设定一个id，防止重复弹出,
            btn: ['取消', '确定'],
            moveType: 1, //拖拽模式，0或者1,
            content: '<div class="coupon_plese">请输入激活码：<span><input type="text"></span></div>   ',
            success: function(layero) {
                var btn = layero.find('.layui-layer-btn');
                btn.css('text-align', 'center');
                btn.find('.layui-layer-btn0').attr({
                    href: '#',
                    target: ''
                });
            }
        }
        layuiopen(class_name, layer_type);
    }

    coupon_act();


    $(".coupon_more").mouseover(function() {
        $(".coupon_delete").show();
    }).mouseout(function() {
        $(".coupon_delete").hide();
    })
})