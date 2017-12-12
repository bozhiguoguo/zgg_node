/**
 * Created by Administrator on 2017/3/8.
 */
/*$(".about_tab li").click(function(){
    $(this).addClass("about_click").siblings().removeClass("about_click");
    var index=$('.about_tab li').index($(this));
    $('.personCenter_all>div').hide();
    $('.personCenter_all>div').eq(index).show();

})*/

$(".question_ul li").click(function() {
    $(this).addClass("question_click").siblings().removeClass("question_click");
    /* var index=$('.question_ul li').index($(this));
     $('.question_rt>div').hide();
     $('.question_rt>div').eq(index).show();*/

})

$(".help_dl1").mouseover(function() {
    $(this).find('dt>img').attr('src', '/img/icon_contact_QQ_hover.png');
    $(this).find('dd').css('color', '#3680d9');
}).mouseout(function() {
    $(this).find('dt>img').attr('src', '/img/icon_contact_QQ_nor.png');
    $(this).find('dd').css('color', '#6da9f0');
})

$(".help_dl2").mouseover(function() {
    $(this).find('dt>img').attr('src', '/img/icon_contact_email_hover.png');
    $(this).find('dd').css('color', '#3680d9');
}).mouseout(function() {
    $(this).find('dt>img').attr('src', '/img/icon_contact_email_nor.png');
    $(this).find('dd').css('color', '#6da9f0');
})