/**
 * Created by Administrator on 2017/2/21.
 */
$(function() {

    layui.use('element', function() {
        var $ = layui.jquery,
            element = layui.element(); //Tab的切换功能，切换事件监听等，需要依赖element模块

        //触发事件
        var active = {
            tabAdd: function() {
                //新增一个Tab项
                element.tabAdd('demo', {
                    title: '新选项' + (Math.random() * 1000 | 0) //用于演示
                        ,
                    content: '内容' + (Math.random() * 1000 | 0)
                })
            },
            tabDelete: function() {
                //删除指定Tab项
                element.tabDelete('demo', 2); //删除第3项（注意序号是从0开始计算）
            },
            tabChange: function() {
                //切换到指定Tab项
                element.tabChange('demo', 1); //切换到第2项（注意序号是从0开始计算）
            }
        };

        $('.site-demo-active').on('click', function() {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
    });

    $(".personal_dl dd a").click(function() {
        $(this).addClass('personal_check').siblings().removeClass('personal_check')
    })


    /*  $(".personCenter_more").mouseenter(function(){
     $(this).find(".personal_order").stop().slideToggle();
     }).mouseleave(function(){
     $(this).find(".personal_order").stop().slideToggle();
     });*/


    function batch_order() {
        var class_name = '#LAY_demo .layui-btn';
        var layer_type = {
            type: 1,
            title: "批量委托订单", //false不显示标题栏,
            // closeBtn: false,是否显示头部删除按钮
            area: '480px;',
            shade: 0.6,
            id: 'LAY_layuipro', //设定一个id，防止重复弹出,
            btn: ['知道了'],
            moveType: 1, //拖拽模式，0或者1,
            content: '<div style="padding:30px 25px;font-size: 16px;color: #2a2a2a;">请选择订单进行操作，可选择多个订单。 </div>   ',
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

    batch_order();
    contract_del();
    contract_sure();

    function contract_del() {
        var class_name = '#LAY_delete .delete';
        var layer_type = {
            type: 1,
            title: "删除合同", //false不显示标题栏,
            // closeBtn: false,是否显示头部删除按钮
            area: '480px;',
            shade: 0.6,
            id: 'LAY_layuipro', //设定一个id，防止重复弹出,
            btn: ['取消', '确定'],
            moveType: 1, //拖拽模式，0或者1,
            content: '<div style="padding:30px 25px;font-size: 16px;color: #2a2a2a;">尊敬的用户：该合同下的所有订单将被删除，是否继续？</div>   ',
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

    function contract_sure() {
        var class_name = '#LAY_sure .sure';
        var layer_type = {
            type: 1,
            title: "合同确认", //false不显示标题栏,
            // closeBtn: false,是否显示头部删除按钮
            area: '480px;',
            shade: 0.6,
            id: 'LAY_layuipro', //设定一个id，防止重复弹出,
            btn: ['取消', '确定'],
            moveType: 1, //拖拽模式，0或者1,
            content: '<div style="padding:30px 25px;font-size: 16px;color: #2a2a2a;">已经解除合同坐定，请您重新确认合同。</div>   ',
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

    function contract_unlock() {
        var class_name = '#LAY_unlock .unlock';
        var layer_type = {
            type: 1,
            title: "解锁合同", //false不显示标题栏,
            // closeBtn: false,是否显示头部删除按钮
            area: '480px;',
            shade: 0.6,
            id: 'LAY_layuipro', //设定一个id，防止重复弹出,
            btn: ['取消', '确定'],
            moveType: 1, //拖拽模式，0或者1,
            content: '<div style="padding:30px 25px;font-size: 16px;color: #2a2a2a;"><p>尊敬的用户：解除合同锁定后，您需要重新确认合同。</p><p>是否继续？</p></div>   ',
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

    contract_unlock();

    function tab_header() {
        var urlArr = [{
                url: '/userCenter/home',
                tabTitleOne: '果蜜首页',
                tabTitleTwo: '用户中心',
            }, {
                url: '/userOrder',
                tabTitleOne: '订单中心',
                tabTitleTwo: '我的订单',
            }, {
                url: '/userCenter/userCoupon',
                tabTitleOne: '订单中心',
                tabTitleTwo: '我的优惠券',
            }, {
                url: '/userCenter/userGuanwen',
                tabTitleOne: '订单中心',
                tabTitleTwo: '官文管理',
            }, {
                url: '/userCenter/userBasicMsg',
                tabTitleOne: '个人设置',
                tabTitleTwo: '基本信息',
            }, {
                url: '/userCenter/userMainMsg',
                tabTitleOne: '个人设置',
                tabTitleTwo: '主体信息',
            }, {
                url: '/userCenter/userMyMsg',
                tabTitleOne: '个人设置',
                tabTitleTwo: '我的信息',
            }, {
                url: '/userCenter/userCounselor',
                tabTitleOne: '个人设置',
                tabTitleTwo: '专属顾问',
            }, {
                url: '/userCenter/userWallet',
                tabTitleOne: '个人设置',
                tabTitleTwo: '我的钱包',
            }, {
                url: '/userCenter/userRecharge',
                tabTitleOne: '个人设置',
                tabTitleTwo: '我的钱包',
            }, {
                url: '/userCenter/userApprove',
                tabTitleOne: '个人设置',
                tabTitleTwo: '实名认证',
            }, {
                url: '/userCenter/personApprove',
                tabTitleOne: '个人设置',
                tabTitleTwo: '实名认证',
            }, {
                url: '/userCenter/companyApprove',
                tabTitleOne: '个人设置',
                tabTitleTwo: '实名认证',
            }

        ]
        var url = window.location.pathname;
        urlArr.map(function(item) {
            if (item.url == url) {
                $("#tabOne").text(item.tabTitleOne);
                $("#tabTwo").text(item.tabTitleTwo);
            }
        });
        $(".userAside").removeClass("personCenter_check");
        var _arr = $(".userAside");
        for (var i = 0; i < _arr.length; i++) {
            if ($(_arr[i]).attr("href") == url) {
                $(_arr[i]).addClass("personCenter_check");
            }
        }
    }
    tab_header();
})