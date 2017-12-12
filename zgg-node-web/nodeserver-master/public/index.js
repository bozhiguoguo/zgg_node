/**
 * Created by Administrator on 2017/2/14.
 */
/**
 *
 *	主页banner 初始化
 *
 **/
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    autoplay : 2000,
    speed:1000,
    effect : 'fade',
    pagination : '.swiper-pagination',
    paginationClickable :true,
    fade: {
        crossFade: false,
    }
});
$(function(){
    $(".li").hover(function() {
        var index=$(this).index(),
            curImg = $(this).find('img').attr('src'),
            dataImg = $(this).attr('data-bigimg');
        $('.big_imgs').attr('src',dataImg);
        $('.homeTitle').eq(index).show().siblings().hide();
        $(".li").siblings().removeClass('homeMsgLBMsgL');
        $(this).addClass('homeMsgLBMsgL');
    });
})

/*商品图划过上移*/
    $(function(){
        $('.busClassify').hover(function(){
            $(this).stop().animate({
                'top' : '-10px'
            },'normal');
        },function(){
            $(this).stop().animate({
                'top' : '0px'
            },'normal');
        });

    })


/**
 * 首页的推荐服务的效果
 */
/*function busHover(){
    var busHoverList = $(".indexRecommend"),class_name = 'bushover';
    var _arr = ['302px','305px','-16px','-15px'],_arr2 = ["287px","285px","0px","0px"],_time = 500;
    var busHover = new homeEven();
    busHover.busHover(busHoverList,class_name,_arr,_arr2,_time);
}*/
/**
 * 首页其他变大的效果
 */
$(".busClassify").mouseenter(function(){
    $(this).find(".indexCon_img").stop().show();
}).mouseleave(function(){
    $(this).find(".indexCon_img").stop().hide();
})


$(".productClassify").mouseenter(function(){
    $(this).find(".indexCon_img").stop().show();
}).mouseleave(function(){
    $(this).find(".indexCon_img").stop().hide();
})




/*function productHover(){
    var productClassify = $(".indexProRecommend"),class_name = 'bushover';
    var _arr = ['315px','304px','-15px','-18px'],_arr2 = ["300px","294px","-30px","0px"],_time = 350;
    var productHover = new homeEven();
    productHover.busHover(productClassify,class_name,_arr,_arr2,_time);
}*/
/**
 * 首页的数字叠加效果
 */
/*function num_Add() {
    $('.counter').countUp({
        delay: 0,
        time: 2000
    });
}*/
/*function cart_del(id,url) {
    layui.use('layer', function() { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer,that=''; //独立版的layer无需执行这一句
        var active = {
            notice: function () {
                layer.open({
                    type: 1,
                    title: "删除订单",//false不显示标题栏,
                    area: '350px;',
                    shade: 0.6,
                    id: 'LAY_layuipro' ,//设定一个id，防止重复弹出,
                    btn: ['取消', '确认'],
                    moveType: 1 ,//拖拽模式，0或者1,
                    content: '<div style="padding:30px 25px;font-size: 16px;color: #2a2a2a;">确认删除订单？</div>   ',
                    success: function (layero) {
                        var btn = layero.find('.layui-layer-btn');
                        btn.css('text-align', 'center');
                        btn.find('.layui-layer-btn1').on('click',function () {
                            $.ajax({
                                url:url,
                                type:'post',
                                data:{id: id},
                                success: function(_data) {
                                    return 2;
                                    // console.log($(that).parent().parent());
                                    // $(that).parent().parent().slideUp();
                                }
                            });
                        });
                    }
                });
            }
        };
        $('#LAY_demo .layui-btn').on('click', function(){
            that = this;
            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        });
    });
}*/



/*public-placeholder fix*/
!function(window,document,$,undefined){
    var target,i= 0,len,temp;
    if('placeholder' in document.createElement('input'))return;
    target = $('[placeholder]');
    for(len=target.length;i<len;i++){
        temp=target[i].getAttribute('placeholder');
        target[i].value=temp;
        target[i].style.color='#aaaaaa';
        target[i].onfocus=function(){
            if(this.value !=this.getAttribute('placeholder'))return;
            this.value='';
            this.style.color='#000000';
        }

        target[i].onblur = function () {
            if ( this.value != '') return;
            this.value = this.getAttribute( 'placeholder' );
            this.style.color = '#aaaaaa';
        }
    }
}(window,document,jQuery);


$(".footer-list-wechat").mouseover(function(){
    $(".footer-sao").show();
}).mouseout(function(){
        $(".footer-sao").hide();

    })
