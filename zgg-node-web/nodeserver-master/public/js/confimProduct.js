/**
 * Created by Administrator on 2017/2/17.
 */
$(function() {
    //优惠券
    function discount_coupon() {
        $('.confimCoupon span').on("click", function() {
            $(this).find('img').attr('src', '/img/coupon_drown.png');
            $('.confimCou_use').slideToggle(function() {
                navFixed();
            });
        });
    }
    //更多地址
    function more_aress() {
        var cont = false;
        /*$('.confimMore_Add').on('click',function(){
            $('.confim_moreAddress').slideToggle(function () {
                if(cont == false ){
                    $(".confimMore_Add").find('img').attr('src','/img/confimMore_up.png');
                    $('.box_color_c').addClass("confim_checkClick");
                    $('.box_color_c').find(".dis_p").css({display:"block"});
                    cont = true;
                }else if(cont == true){
                    $(".confimMore_Add").find('img').attr('src','/img/confimMore.png');
                    $('.box_color_c').removeClass("confim_checkClick");
                    $('.box_color_c').find(".dis_p").css({display:"none"});
                    cont = false;
                }
                navFixed();
            });
        });*/
        $(".box_choice").on("click", function() {
            if (cont == false) {
                return false;
            }
            $(".box_choice").removeClass("confim_checkClick");
            $('.box_choice').find(".dis_p").css({
                display: "none"
            });
            $(this).addClass("confim_checkClick").siblings().removeClass("confim_checkClick");
            $(this).find(".dis_p").css({
                display: "block"
            });
        });
    }
    //编辑部分
    /* function changeContent() {
         var execute_obj = $(".confim_edit");
         execute_obj.on("click",function () {
             var obj = $(this).parent().nextAll(".confimEdit").find(".edit_change");
             var obj_input = $(this).parent().nextAll(".confimEdit").find(".edit_change_show");
             if($(this).attr('data') == "true"){
                 $(this).addClass("dis_none");
                 obj.css({display:"none"});
                 obj_input.css({display:"block"});
                 $(this).attr('data',"false");
             }else if($(this).attr('data') == "false"){
                 $(this).removeClass("dis_none");
                 obj.css({display:"block"});
                 obj_input.css({display:"none"});
                 $(this).attr('data',"true");
             }
         });
     }*/

    //添加地址弹框
    function add_ress() {
        var class_name = '#add_reass .add_reass';
        var layer_type = {
                type: 1,
                title: "新增收件人地址", //false不显示标题栏,
                // closeBtn: false,是否显示头部删除按钮
                area: '480px;',
                shade: 0.6,
                id: 'LAY_layuipro', //设定一个id，防止重复弹出,
                btn: ['取消', '保存并设为默认地址'],
                moveType: 1, //拖拽模式，0或者1,
                content: '<table class="confim_box" style="margin:20px 0 0 60px"><tr><td class="confim_boxNum">姓名：</td></tr><tr><td><input type="text"/></td></tr><tr><td class="confim_boxNum">手机号码：</td></tr><tr><td><input type="text"/></td></tr><tr><td class="confim_boxNum">地址：</td></tr><tr><td class="confim_boxIp"><input type="text"/></td></tr></table>   ',
                success: function(layero) {
                    var btn = layero.find('.layui-layer-btn');
                    btn.css('text-align', 'center');
                    btn.find('.layui-layer-btn0').attr({
                        href: '#',
                        target: ''
                    });
                }
            }
            //layuiopen(class_name,layer_type);
    }
    //开票信息
    $('.confimNo').change(function() {
        if ($(this).is(":radio")) {
            $('.confimYvoice').hide();
        }
    });
    $('.confimyes').change(function() {
        if ($(this).is(":radio")) {
            $('.confimYvoice').show();
        }
    });
    // 发票抬头部分
    function bill_open() {
        var layer_type = {
                type: 1,
                title: "发票信息", //false不显示标题栏,
                // closeBtn: false,是否显示头部删除按钮
                area: '480px;',
                shade: 0.6,
                id: 'LAY_layuipro', //设定一个id，防止重复弹出,
                btn: ['取消', '保存'],
                moveType: 1, //拖拽模式，0或者1,
                content: '<div class="confim_invoceInfo">' +
                    '<div class="confim_divTtpe">发票类型：</div>' +
                    '<ul class="confim_invoceLi"><li>增值税普通发票</li><li class="confim_chenckRed">增值税专用发票</li></ul>' +
                    '<div class="clear"></div>' +
                    '<div class="confim_divCon">' +
                    '<table class="confim_box"><tr><td class="confim_boxNum"><span>*</span>单位名称：</td></tr><tr><td><input type="text"/></td></tr></table>' +
                    '<table class="confim_box" style="display: block"><tr><td class="confim_boxNum"><span>*</span>单位名称：</td></tr><tr><td><input type="text"/></td></tr><tr><td class="confim_boxNum"><span>*</span>纳税人识别码：</td></tr><tr><td><input type="text"/></td></tr><tr><td class="confim_boxNum"><span>*</span>注册地址：</td></tr><tr><td><input type="text"/></td></tr><tr><td class="confim_boxNum"><span>*</span>注册电话：</td></tr><tr><td><input type="text"/></td></tr><tr><td class="confim_boxNum"><span>*</span>开户银行：</td></tr><tr><td><input type="text"/></td></tr><tr><td class="confim_boxNum"><span>*</span>银行账户：</td></tr><tr><td><input type="text"/></td></tr></table>' +
                    '</div>' +
                    '</div>',
                success: function(layero) {
                    var btn = layero.find('.layui-layer-btn');
                    btn.css('text-align', 'center');
                    btn.find('.layui-layer-btn0').attr({
                        href: '#',
                        target: ''
                    });
                    confim_tab();
                }
            }
            // layer.open(layer_type)
    }
    //发票抬头弹窗的切换
    function confim_tab() {
        $('.confim_invoceLi li').click(function() {
            $(this).addClass("confim_chenckRed").siblings().removeClass("confim_chenckRed");
            var index = $('.confim_invoceLi li').index($(this));
            $('.confim_divCon>table').hide();
            $('.confim_divCon>table').eq(index).show();

        });
    }
    bill_open();
    add_ress();
    //changeContent();
    more_aress();
    discount_coupon();
});
window.onload = function() {
    $("#header_t").load("header.html", function() {
        $("#footer_t").load("footer.html", function() {
            navFixed();
            navHover();
            navShow();
        });
    });
}