$(function() {

	$(".proUp").mouseover(function() {

		$(this).find('img').attr('src', '/img/dropdown.png');

		$(".proOfficer").show();
	}).mouseout(function() {

		$(this).find('img').attr('src', '/img/updown.png');

		$(".proOfficer").hide();
	})

	$(".prodSin").mouseover(function() {

		$(this).find('img').attr('src', '/img/dropdown.png');

		$(".prodDet").show();
	}).mouseout(function() {

		$(this).find('img').attr('src', '/img/updown.png');

		$(".prodDet").hide();
	})


	$('.prodDetails_nav ul li').click(function() {
		_index = $('.prodDetails_nav ul li').index(this);
		$(this).addClass("prodDetails_navBg").siblings().removeClass();
		$(".prodDetails_Explain div").eq(_index).addClass("active_0").siblings().removeClass();
	});

	//�Ӽ�����
	var t = $("#num");
	$("#add").click(function() {
		t.val(parseInt(t.val()) + 1);
		$("#min").removeAttr("disabled"); //������1ʱ�����$("#min")���ɶ�״̬

	})
	$("#min").click(function() {
		if (parseInt(t.val()) > 1) { //�ж�����ֵ����1ʱ�ſ��Լ���
			t.val(parseInt(t.val()) - 1)
		} else {
			$("#min").attr("disabled", "disabled") //��$("#min")Ϊ1ʱ��$("#min")���ɶ�״̬
		}

	});


	$(".prodClick").mouseover(function() {
		$(this).find(".prodUL").stop().slideToggle();
	}).mouseout(function() {
		$(this).find(".prodUL").stop().slideToggle();
	});
})