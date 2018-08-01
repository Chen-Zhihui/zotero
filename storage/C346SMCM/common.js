$(function(){
    //var user = sessionStorage.getItem('user');
    var headStr="",footStr="";
    //console.log(user);
    var user = getCookie("username");
    if(user==null||user=='')
            user=null;
	// console.log(user);
	headStr+='<div style="display:none;">'+
	'<script>'+
	'var _hmt = _hmt || [];'+
	'(function() {'+
	 ' var hm = document.createElement("script");'+
	 ' hm.src = "https://hm.baidu.com/hm.js?f5ec669e0cd2266339a6390e4e641b23";'+
	 ' var s = document.getElementsByTagName("script")[0]; '+
	  's.parentNode.insertBefore(hm, s);'+
	'})();'+
	'</script>'+

	'<script>'+
	'var _hmt = _hmt || [];'+
	'(function() {'+
	  'var hm = document.createElement("script");'+
	  'hm.src = "https://hm.baidu.com/hm.js?0c200216c0fcc19c1ce4685a13ebb19e";'+
	  'var s = document.getElementsByTagName("script")[0]; '+
	  's.parentNode.insertBefore(hm, s);'+
	'})();'+
	'</script>'+

	'<script src="https://s4.cnzz.com/z_stat.php?id=1260857246&web_id=1260857246" language="JavaScript"></script>'+
	'</div>'+
		'<div class="common-header">'
				+'<div class="common-head">'
					//+'<span style="position:absolute;left:8px;top:6px"><img src="../img/notice_icon.png" alt="" /></span><div style="position:absolute;left:4px;height:32px;line-height:32px;width:800px;margin-left:30px; overflow:hidden;" id="box"><span id="td" style="display:inline-block;width:3000px;">&nbsp;&nbsp;2017年1月25日至2月4日本公司全体放假，datatang停止订单处理，2月5日起恢复正常，数据堂全体员工恭祝新春愉快！</span><span id="td1"></span></div>'
					+'<ul>'
						+'<li class="red">400-650-6137</li>';
						if(user!=null){
							headStr+='<li><a href="javascript:void(0);">您好！'+changeMobileNum(user)+'</a><a href="javascript:void(0);" id="loginOut">退出</a></li>';
						}else{
							headStr+='<li><a href="javascript:void(0);" id="login-init">登录</a><a href="javascript:void(0);" id="login-out">注册</a></li>';
						}
						headStr+='<li class="la"><a href="'+field.ip+'/about/about-us.html" target="_blank">关于我们</a></li>'
					+'</ul>'
					+'<div class="lan">'
						+'<a href="http://en.datatang.com"><span id="english">EN</span></a>'
						+'<ol>'
							+'<li><a href="javascript:(void);">中文</a></li>'
							+'<li><a href="javascript:(void);">韩语</a></li>'
						+'</ol>'
					+'</div>'
				+'</div>'
			+'</div>'
			+'<div class="logo-box">'
				+'<div class="logo">'
					+'<div class="logo-left">'
						+'<a href="'+field.ip+'/index.html" class="changeA _logoA"><img src="'+field.ip+'/img/index/logo_new.png"></a>'
						+'<ul id="nav">'
							+'<li><a href="'+field.ip+'/index.html" class="changeA" id="1">首页</li>'
							+'<li><a href="'+field.ip+'/product/product.html" id="2">数据产品</a></li>'
							+'<li><a href="'+field.ip+'/data/shopping-mall.html" id="3">数据商城</a></li>'
							+'<li><a href="'+field.ip+'/bd/data-cooperation.html" id="5">数据合作</a></li>'
						+'</ul>'
					+'</div>'
					+'<div class="logo-right">'
						+'<input type="text" placeholder="热搜：语音 人脸 语料库" id="searchTxt">'
						+'<span class="search" id="search"></span>'
					+'</div>'
				+'</div>'
			+'</div>';

	//页脚		
	footStr+='<div class="foot">'
				+'<div class="footer">'
					+'<ul>'
						+'<li class="foot-left">'
							+'<ol id="about">'
								+'<li class="liTit">关于我们</li>'
								+'<li><a href="'+field.ip+'/about/about-us.html?a=1" target="_blank">公司简介</a></li>'
								+'<li><a href="'+field.ip+'/about/about-us.html?a=2" target="_blank">新闻动态</a></li>'
								+'<li><a href="'+field.ip+'/about/about-us.html?a=3" target="_blank">投资者关系</a></li>'
								+'<li><a href="'+field.ip+'/about/about-us.html?a=4" target="_blank">联系我们</a></li>'
							+'</ol>'
							+'<ol>'	
								+'<li class="liTit">商务合作</li>'
								+'<li><a href="'+field.ip+'/bd/data-cooperation.html" target="_blank">资源合作</a></li>'
								//+'<li><a href="javascript:void(0);" id="cooperation">品牌合作</a></li>'
							+'</ol>'
							+'<ol>'
								+'<li class="liTit">服务支持</li>'
								+'<li><a href="'+field.ip+'/about/protocol.html" target="_blank">服务协议</a></li>'
								+'<li><a href="'+field.ip+'/about/secret.html" target="_blank">隐私声明</a></li>'
							+'</ol>'
						+'</li>'
						+'<li class="foot-center">'
							+'<dl>'
								+'<dd>'
									+'<h1>400-650-6137</h1>'
									+'<h3>周一至周五9:00-18:00</h3>'
									+'<span id="qq1">在线咨询</span>'
								+'</dd>'
							+'</dl>'
						+'</li>'
						+'<li class="foot-right">'
							+'<dl>'
								+'<dt><img src="/img/index/code.png"></dt>'
								+'<dd>数据堂微信</dd>'
							+'</dl>'
						+'</li>'
					+'</ul>'
				+'</div>'
				+'<p>Copyright 2016 datatang.com 数据堂（北京）科技股份有限公司 京ICP备11010828号 京公网安备 11010802026079号</p>'
			+'</div>';

	$("#header").html(headStr);
	$("#foot").html(footStr);


	//定制弹框
	var madeBox="",madeResult="";
	madeBox+='<div class="_flow dzsj">'
			+'<a href="javascript:void(0);" class="closeOff" id="closeOff1">×</a>'
			+'<h3>个性化数据定制</h3>'
			+'<div class="floor">'
				+'<span>需求描述</span>'
				+'<div class="area">'
					+'<textarea id="name" placeholder="请填写您的需求描述"></textarea>'
					+'<p>xxxxxx</p>'
				+'</div>'
			+'</div>'
			+'<div class="floor" style="height:42px;margin:14px auto 42px auto;">'
				+'<span>手机号码</span>'
				+'<div class="pho">'
					+'<input type="text" placeholder="您的手机号" id="telNum">'
					+'<p id="pho">xxxxxx</p>'
				+'</div>'
			+'</div>'
			+'<div class="clear"></div>'
			+'<button id="next" class="bttn">提交</button>'
		+'</div>';
	madeResult+='<div class="result _flow">'
				+'<a href="javascript:void(0);" class="closeOff" id="closeOff2">×</a>'
				+'<h3>提交成功</h3>'
				+'<div><img src="../img/pic.png" /></div>'
				+'<p>数据堂客服会尽快与您联系请保持手机畅通</p>'
				+'<button class="bttn sure">确认</button>'
			+'</div>';

	$("#made").html(madeBox);
	$("#madeResult").html(madeResult);


	/*$("#about").on("click","a",function(){
		$(this).text();
	});*/

/*******文字滚动********/
/*var speed=20;/*速度数值越大速度越慢*/ 
/*document.getElementById('td1').innerHTML=document.getElementById('td').innerHTML;
function Marquee(){ 
	//var a=document.getElementById('box');
	//$("#box").scrollLeft(400);
	/*document.getElementById('box').a*/
	//console.log(document.getElementById('box').scrollLeft);
	//console.log(document.getElementById('box'));
	/*if(document.getElementById('td1').offsetWidth-document.getElementById('box').scrollLeft<=0){ 
		document.getElementById('box').scrollLeft-=document.getElementById('td').offsetWidth; 
	}else{ 
		document.getElementById('box').scrollLeft++; 
	} 
} 
var MyMar=setInterval(Marquee,speed); 
box.onmouseover=function() {clearInterval(MyMar);} 
box.onmouseout=function() {MyMar=setInterval(Marquee,speed);} */

//定制JS
	var arr=[];
		/*$("#check li").click(function(){
			if($(this).hasClass("_change")){
				$(this).attr("class","");
				removeCheck(arr,$(this).text());
				//console.log(arr);
			}else{
				$(this).attr("class","_change");
				addCheck(arr,$(this).text());
				//console.log(arr);
			}
			//console.log($(this).parent().children().hasClass("_change"));
			if($(this).parent().children().hasClass("_change")){
				$("#next").attr("class","_btn");
				$("#next").removeAttr("disabled")
			}else{
				$("#next").attr({"disabled":"disabled","class":"bttn"});
			}
		});*/
		
		/*$("#name").on("focus",function(){
			$("#next").css({"disabled":"false","background":"#1d7cdf"});
		});
		$(".pho input").on("focus",function(){
			$("#next").css({"disabled":"false","background":"#1d7cdf"});
		});*/
		$("#name").on("blur",function(){
			var areaCon=$("#name").val();
			var len=areaCon.length;
			
			if(areaCon==""){
				$(".area p").show().text("内容不能为空");
				$('#next').attr('disabled',"true");
			}else if(len>100){
				$(".area p").show().text("内容不能超过100");
				$('#next').attr('disabled',"true");
			}else{
				$(".area p").hide();
				$('#next').removeAttr("disabled"); 
			}
		})
		$(".pho input").on("blur",function(){
			var numTxt=$(".pho input").val();
			if(numTxt==""){
				$(".pho p").show().text("手机号不能为空");
			}else{
				$(".pho p").hide();
			}
		})
			
		$("#next").click(function(){
			// $(".bg").show();
			// $(".perMess").show();
			var numTxt=$("#telNum").val();
			var phone=/^1[34578]\d{9}$/;
			var areaCon=$("#name").val();
			var type = "";
			var id = "";
			var href = window.location.href;
			if(href.indexOf("/product/solution/")>=0)
			{
				id = href.substring(href.lastIndexOf("/")+1);
				type = "s";
			}else if(href.indexOf("/detail/")>=0){
				id = href.substring(href.lastIndexOf("/")+1);
				type = "p";
			}
			
			//"http://www.datatang.com/product/solution/40288184596c945b01598cdafb83002b"
			//http://10.10.9.63/detail/95
				if(numTxt==""){
					$("#pho").show().text("手机号不能为空");
				}else{
					if(!phone.test(numTxt)){
						$("#pho").show().text("请输入正确的手机号");
					}else{
						//验证是手机号以后调用接口
						$("#next").css({"disabled":true,"background":"#ccc"});
						$.ajax({
							url:request_url.madeServe,
							type:"post",
							dataType:'json',
							data:{
								'check':arr.join(","),
								'name':$("#name").val()==null?'':$("#name").val(),
								'phone':$(".pho #telNum").val(),
								'company':$("#company").val()==null?'':$("#company").val(),
								'type':type,
								'id':id
							},
							success:function(e){
								$(".pho p").hide();
								$(".dzsj").hide();
								$(".result").show();
								$(".login-bg").show();
								$("#next").css({"disabled":false,"background":"#1d7cdf"});
							}
						})
					}
				} 
			
		})
		$(".sure").click(function(){
			$(".login-bg").hide();
			$(this).parent().hide();
			$("#name").val("");
			$(".pho input").val("");
			$(".pho p").hide();
			$(".area p").hide();
			$("#name1").val("");
		 	$(".pho1 input").val("");
		 	$(".pho1 p").hide();
		 	$(".area1 p").hide();
		})
		//添加删除被选项的方法
		
		function removeCheck(arr,checkName){
			arr.splice(jQuery.inArray(checkName,arr),1); 
		}
		function addCheck(arr,checkName){
			arr.push(checkName);
		}

		$("#closeOff1").click(function(){
			$(".login-bg").hide();
			 $(this).parent().hide();
			 $("#name").val("");
			 $(".pho input").val("");
			 $(".pho p").hide();
			 $(".area p").hide();
		})
		$("#closeOff2").click(function(){
			$(".login-bg").hide();
			$(this).parent().hide();
			$("#name").val("");
			$(".pho input").val("");
			$(".pho p").hide();
			$(".area p").hide();
			$("#name1").val("");
		 	$(".pho1 input").val("");
		 	$(".pho1 p").hide();
		 	$(".area1 p").hide();
		})


	//导航
	var attr = $("#header").attr("attr");
	$("#"+attr).attr('class','changeA');
	$("#"+attr).parent().siblings().find('a').attr("class","");

$("#english").click(function(){
	window.location.href="http://more.datatang.com/en"
})



 var loginStr='',registStr='',alertBox='';
 	//登陆
 	loginStr+='<div class="login-into login">'
				+'<h3><span class="close">×</span>欢迎登录数据堂</h3>'
				+'<h6>注：原数据堂用户请<a href="http://more.datatang.com" id="old"> 返回旧版 </a>登录</h6>'	
				+'<ul>'
					+'<li class="phone"><input type="text" name="" id="login-tel" class="telphone" placeholder="您的手机号"><em>xxx<span class="now-out">立即注册</span></em></li>'
					+'<li class="pwd"><input type="password" name="" id="login-pwd" placeholder="您的密码" class="password"><em>xxx</em></li>'
					+'<li style="margin:0;"><button class="login-btn" id="login">立即登录</button></li>'
				+'</ul>'
				+'<p>还没有账号，<span class="now-out">立即注册</span></p>'
			+'</div>';

	//注册		
	registStr+='<div class="login-out login">'
					+'<h3><span class="close">×</span>欢迎注册</h3>'	
					+'<ul>'
						+'<li class="tel"><input type="text" name="" id="tel" class="telphone" placeholder="您的手机号"><em>XXXX<span class="now-in">立即登录</span></em></li>'
						+'<li><input type="password" name="" id="pwd" placeholder="您的密码" class="password"><em>xxxx</em></li>'
						+'<li class="code"><input type="text" name="" id="msg" placeholder="短信验证码"><button id="yz">获取验证码</button></li>'
						+'<li class="pic-code"><input type="text" name="" id="captcha" placeholder="图形验证码"><span id="picCaptcha"><img src="'+field.ip+'/api/user/pcrimg"></span></li>'
						+'<li><button class="login-btn" id="registBtn">立即注册</button></li>'
					+'</ul>'
					+'<p><b>注册即同意<a href="'+field.ip+'/about/protocol.html" target="_blank" class="xieyi">《数据堂服务协议》</a></b><b>已有账号，<span class="now-in">立即登录</span></b></p>'
				+'</div>';

	//shibai弹框
	alertBox+='<div class="lose">'
					+'<h2>登录失败 请重新登录</h2>'
					+'<button id="sure">确定</button>'
				+'</div>'/*
				+'<div class="lose">'
					+'<h2>注册失败 请重新注册</h2>'
					+'<button id="zcsure">确定</button>'
				+'</div>'*/

$("#login-box").html(loginStr);
$("#regist-box").html(registStr);
$("#alert").html(alertBox);


//品牌合作弹框
var brand='';
brand='<div class="lose brand">'
			+'<h5><span class="close">×</span>品牌合作请联系</h5>'
			+'<ul><li>联系人：杨女士</li><li>电话：010-82538190-8056</li><li>邮箱：yangjiaoyang@datatang.com</li></ul>'
			+'<button id="zcsure">确定</button>'
		+'</div>'
//$("#brand").html(brand);

//$("#cooperation").click(function(){
//	$(".brand").show();
//	$(".login-bg").show();
//})
$("#zcsure").click(function(){
	$(this).parent().hide();
	$(".login-bg").hide();
})
//右侧导航
//QQ

var sideaStr='';
	sideaStr='<div class="side-right">'
				+'<ul>'
					+'<ul>'
						+'<li><a href="javascript:void(0);" class="oli" id="BizQQWPA"></a><span>在线咨询</span></li>'
						+'<li><a href="javascript:void(0);" class="tli"></a><span class="pho">400-650-6137</span></li>'
						+'<li><a href="javascript:void(0);" class="goMade sli"></a><span>定制数据</span></li>'
						+'<li id="top"><a href="#" class="fli"></a><span>返回顶部</span></li>'
					+'</ul>'
				+'</ul>'
			+'</div>'

	$("#side-box").html(sideaStr);
	BizQQWPA.addCustom({aty: '0', a: '0', nameAccount: 4006506137, selector: 'BizQQWPA'});
//右侧导航
$(".side-right li").mouseover(function(){
	//$(this).find("span").stop().animate({"left":"-116px"},500)
	$(this).find("span").show();
}).mouseout(function(){
	$(this).find("span").hide();
	//$(this).find("span").stop().animate({"left":"100px"},500)
})
$(".oli").mouseover(function(){
	$(this).addClass("ooli");
}).mouseout(function(){
	$(this).removeClass("ooli");	
});
$(".tli").mouseover(function(){
	$(this).addClass("ttli");
}).mouseout(function(){
	$(this).removeClass("ttli");
});
$(".sli").mouseover(function(){
	$(this).addClass("ssli");
}).mouseout(function(){
	$(this).removeClass("ssli");
});
$(".fli").mouseover(function(){
	$(this).addClass("ffli");
}).mouseout(function(){
	$(this).removeClass("ffli");
});



$(".goMade").click(function(){
	$(".dzsj").show();
	$(".login-bg").show();
})
//注册登录显示和隐藏效果
	// $("#nav li a").mouseover(function(){
	// 		$(this).addClass('changeA').parent().siblings().find('a').removeClass('changeA');
	// 	}).mouseout(function(){
	// });
		
		$("#login-init").click(function(){
			$(".login-bg").show();
			$(".login-into").show();
			//alert(tel);
		});
		$("#login-out").click(function(){
			$(".login-bg").show();
			$(".login-out").show();
		});
		$(".close").click(function(){
			$(this).parent().parent().hide();
			/*$(this).parent().parent().find(".telphone").val("")
			$(this).parent().parent().find(".password").val("")*/
			$(this).parent().parent().find("input").val("");
			$(this).parent().parent().find(".telphone").next().hide()
			$(this).parent().parent().find(".password").next().hide()
			$(".login-bg").hide();
		});

		$(".now-out").click(function(){
			$(".login-into").hide();
			$(".login-out").show();
		})
		$(".now-in").click(function(){
			$(".login-into").show();
			$(".login-out").hide();
		})
		$("#sure").click(function(){
			var title = $(this).prev().text();
			if(title=='请先登录'){
				$(".login-bg").show();
				$(".login-into").show();
				$(this).parent().hide();
			}else if(title=='请选择规格'){
				$(".login-bg").hide();
				$(".login-out").hide();
				$(this).parent().hide();
			}else if(title=='登录密码错误'){
				$(".login-out").hide();
				$(".login-bg").show();
				$(".login-into").show();
				$(this).parent().hide();
			}else if(title=='订单金额有误'){
				$(this).parent().hide();
			}
			else{
				$(".login-bg").show();
				$(".login-out").show();
				$(this).parent().hide();
				$("#picCaptcha").find("img").attr("src",field.ip+"/api/user/pcrimg");
			}
			
		})
//登录验证
$(".telphone").blur(function(){
	var telTxt=$(this).val();
	var phone=/^1[34578]\d{9}$/;
	//判断
	if(telTxt==""){
		$(this).next().show().text('手机号不能为空');
	}else if(!phone.test(telTxt)){
		$(this).next().show().text('手机号格式不正确');
	}else{
		$(this).next().hide();
	}
});
$(".password").blur(function(){
	var pwdTxt=$(this).val();
	var phone=/^1[34578]\d{9}$/;
	//判断
	if(pwdTxt==""){
		$(this).next().show().text('密码不能为空');
	}else if(pwdTxt.length<6 || pwdTxt.length>18){
		$(this).next().show().text('密码必须是6-18位');
	}else{
		$(this).next().hide();
	}
});



//注册接口
$("#tel").blur(function(){
	var tel = $(this).val();
	var phone=/^1[34578]\d{9}$/;
	if(phone.test(tel)){
		$.ajax({
			url:request_url.regist,
			data:{"mobile":tel},
			type:"get",
			dataType:"json",
			success:function(e){
				//手机号已存在
				if(e.repCode=='1006'){
					$("#tel").next().show().html("手机号已存在<span class='now-in'>立即登录</span>");
					$(".now-in").click(function(){
						$("#login-tel").val(tel);
						$(".login-into").show();
						$(".login-out").hide();
					})
				}
				else{
					$("#tel").next().hide();
				}
			}
		})			
	}
})
//验证手机号是否存在
$("#login-tel").blur(function(){
	var tel = $(this).val();
	var phone=/^1[34578]\d{9}$/;
	if(phone.test(tel)){
		$.ajax({
			url:request_url.regist,
			data:{"mobile":tel},
			type:"get",
			dataType:"json",
			success:function(e){
				//手机号已存在
				if(e.repCode=='0000'){
					$("#login-tel").next().show().html("手机号不存在<span class='now-out'>立即注册</span>");
					$("#login").attr("disabled",true);
					$(".now-out").click(function(){
						$("#tel").val(tel);
						$(".login-into").hide();
						$(".login-out").show();
					})
				}
				else{
					$("#login-tel").next().hide();
					$("#login").attr("disabled",false);
				}
			}
		})			
	}
})
$("#yz").click(function(){
	var phone=/^1[34578]\d{9}$/;
	var valTxt=$("#tel").val();	
	if(phone.test(valTxt)){
		var repNote;
		$.ajax({
			url:request_url.auth_code,
			type:"get",
			dataType:"json",
			data:{"mobile":valTxt},
			success:function(e){
				if(e.repCode=='0000'){
					//短信获取成功，开始倒计时1分钟
					var timer=60;
					$("#yz").text("60后重新发送")
					$("#yz").css("background","#ccc");
					var time=setInterval(function(){
						
						//timer--;
						if(timer==0){
							$("#yz").attr("disabled", false);
							$("#yz").css("background","#0078d0");
							$("#yz").text("获取验证码");
							clearInterval(time);
						}else{
							$("#yz").attr("disabled", true);
							$("#yz").css("background","#ccc");
							timer--;
							$("#yz").text(""+timer+"后重新发送")
						}

					},1000)
				}else{
					repNote = e.repNote;
					//展示错误信息
					alert("验证码获取失败")
				}
			}
		})
	}
})

$("#registBtn").click(function(){
	//alert(111);
	var tel = $("#tel").val(),
		pwd=$("#pwd").val(),
		msg=$("#msg").val(),
		captcha=$("#captcha").val();
	var phone=/^1[34578]\d{9}$/;

	//判断
	if(tel==""){
		$("#tel").next().show().text('手机号不能为空');
	}else if(!phone.test(tel)){
		$("#tel").next().show().text('手机号格式不正确');
	}else{
		//成功
		$("#tel").next().show().text("");
		if(pwd==""){
			$("#pwd").next().show().text('密码不能为空');
		}else if(pwd.length<6 || pwd.length>18){
			$("#pwd").next().show().text('密码必须是6-18位');
		}else{
			//成功
			$("#pwd").next().show().text('');

			$.ajax({
				url:request_url.registBtn,
				data:{
					'phone':tel,
					'pwd':pwd,
					'msg':msg,
					'captcha':captcha
				},
				dataType:"json",
				type:"post",
				success:function(data){
					if(data.repCode=='0000'){
						//提示注册成功
						//alert(data);
						//alert(1111);
						$(".login-out").hide();
						$(".login-into").hide();
						sessionStorage.setItem("user",data.username);
						setCookie("username",data.username,null);
						$("#alert").find('.lose').show().find("h2").text("注册成功！");
						$("#alert").find("button").attr("class","registSure");
						$(".registSure").click(function(){
							$(".login-out").hide();
							location.reload();
						})
						
					}else{
						//alert(date.repNote);
						$(".login-out").hide();
						$("#alert").find('.lose').show().find("h2").text(data.repNote);
					}
				}
			})
		}
	}
})

//登录接口
$("#login").click(function(){
	var tel=$("#login-tel").val(),
		pwd=$("#login-pwd").val();
	var phone=/^1[34578]\d{9}$/;
	//判断
	if(tel==""){
		$("#login-tel").next().show().text('手机号不能为空');
	}else if(!phone.test(tel)){
		$("#login-tel").next().show().text('手机号格式不正确');
	}else{
		//成功
		$("#login-tel").next().show().text("");
		if(pwd==""){
			$("#login-pwd").next().show().text('密码不能为空');
		}else if(pwd.length<6 || pwd.length>18){
			$("#login-pwd").next().show().text('密码必须是6-18位');
		}else{
			//成功
			$("#login-pwd").next().show().text('');
			$.ajax({
				url:request_url.login,
				data:{
					"username":tel,
					"pwd":pwd
				},
				type:"post",
				dataType:"json",
				success:function(e){
					//alert(e.repNote);
					if(e.repCode=='0000'){
						//登录成功的弹框显示
						//sessionstorage.setItem("key")
						//alert('登录成功');
						
						sessionStorage.setItem("user",e.username);
						setCookie("username",e.username,null);
						$("#alert").find('.lose').show().find("h2").text("登录成功！");
						$(".login-into").hide();
						$("#alert").find("button").attr("class","loginSure");
						/*location.reload();*/
						// $(this).text(e.username);
						$(".loginSure").click(function(){
							$(".login-into").hide();
							$(".login-bg").hide();
							$(".login-out").hide();
							$(this).parent().hide();
							location.reload();
						})
						
					}else{
						$(".login-into").hide();
						$("#alert").find('.lose').show().find("h2").text(e.repNote);
					}
					
				}
			})
		}
	}
	
})


//退出登录
$("#loginOut").click(function(){
	sessionStorage.clear();
	setCookie("username","",null);
	$.ajax({
		url:request_url.loginOut,
		type:"post",
		dataType:"json",
		success:function(data){
			location.reload();
			
		}
	})
});

	
	
//搜索按钮事件

	$("#search").click(function(){
		var txt=$("#searchTxt").val();
		if(txt!=""){
			window.location.href=field.ip+"/data/shop-page.html?k="+txt;
		}
	});



$('#searchTxt').keydown(function(e){
	code=e.keyCode;
	code==13 && $("#search").click();
});


//图像验证		
$("#picCaptcha").click(function(){

	$(this).find('img').attr("src",request_url.picCaptcha+"?"+new Date().getTime());

})

//隐藏手机中间4位数字
function changeMobileNum(phone) {
    return phone.substr(0, 3) + '****' + phone.substr(7);
};



/*QQ**/
BizQQWPA.addCustom({aty: '0', a: '0', nameAccount: 4006506137, selector: 'qq'});
BizQQWPA.addCustom({aty: '0', a: '0', nameAccount: 4006506137, selector: 'qq1'});




/*弹框*/
$(".alert").click(function(e){
	e.preventDefault(); 
	$(".login-bg").show();
	$("#alert").find('.lose').show().css({"position":"fixed","top":"42%","marginTop":"-76px"});
	$("#alert").find('.lose').show().find("h2").css({"lineHeight":"30px","marginBottom":"16px","marginTop":"16px"});
	$("#alert").find('.lose').show().find("h2").html("了解数据详情请拨打<br>400-650-6137");
	$("#alert").find('.lose').show().find("button").click(function(){
		$(".login-out").hide();
		$(".login-bg").hide();
	})
})
})


// set cookie
	function setCookie(c_name, value, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name
				+ "="
				+ escape(value)+";path=/"; 
/*				+ ((expiredays == null) ? "" : ";expires="
						+ exdate.toGMTString())*/
	};
	//get cookie
	function getCookie(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1)
					c_end = document.cookie.length;
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	};
	//check cookie
	function checkCookie() {
		username = getCookie('username');
		if (username != null && username != "") {
			alert('Welcome again ' + username + '!');
		} else {
			username = prompt('Please enter your name:', "");
			if (username != null && username != "") {
				setCookie('username', username, 365);
			}
		}
	}

	//删除cookie
	function delCookie(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = getCookie(name);
		if (cval != null)
			document.cookie = name + "=" + cval + ";expires="
					+ exp.toGMTString();
	}
