$(function(){
	//var tel=$("#tel").val();
	
	//console.log($('div.pic').height());
	$(".more").click(function(){
		$("div.product").stop().animate({"height":"auto"},300);
		$('div.pic').css({'height':'auto','overflow':'hidden'});
		//$(".list>div.pic").stop().animate({"height":"auto"},300);
		/*$(".pic-lock").css({"overflow":"visible"}).stop().animate({"height":"auto"},300);*/
		//$(".pic-lock").css({"overflow":no});
		$(this).hide();
	})

	// $(".pic-lock a").click(function(){
	// 	$("#nav a").eq(1).addClass("changeA").siblings().removeClass('changeA');
	// })
	$(".dl dt").mouseover(function(){
		$(this).find(".outItem").css("transform","rotate(180deg)");
	}).mouseout(function(){
		$(this).find(".outItem").css("transform","rotate(0deg)");
	})
	
	//获得首页产品专题列表
	$.ajax({
		url:request_url.findAllList,
		type:"GET",
		dataType:"json",
		contentType:'application/x-www-form-urlencoded;charset=UTF-8',
		success:function(data){
			var path = field.ip;

			$.each(data.items,function(i,v){
				var html='';
				var i = i+1;
				//console.log(v);
				var herf = request_url.detail+v.s_id;
				html+='<a href="/product/solution/'+v.s_id+'" target="_blank"><dl>'+
				//'<dt><img src="img/list/'+ i +'.jpg"></dt>'+//该行为测试用
				'<dt><img src="'+v.imgurl+'"></dt>'+
				'<dd>'+
					'<h3>'+v.name+'</h3>'+
					'<p title="'+v.description+'">'+v.description+'</p>'+
				'</dd>'+
			'</dl></a>';
		  		$('div.pic').append(html);
			})
			var tt = '';
			tt+='<div class="clear"></div>'
			$('div.pic').append(tt);
			var _H=$('div.pic').height();
			if(_H>1730){
				$('div.pic').css({'height':1700,'overflow':'hidden'});
				$('.more').show();
			}/*else{
				$('.more').hide();
			}*/
		}
	});

})

	
	





































