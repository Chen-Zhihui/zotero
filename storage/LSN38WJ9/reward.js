(function(){
	var qrcode_hm = document.createElement("script");
	qrcode_hm.src = "//static.mbalib.com/common/jquery.qrcode.min.js";
	var qrcode_s = document.getElementsByTagName("script")[0]; 
	qrcode_s.parentNode.insertBefore(qrcode_hm, qrcode_s);

	function loadDiv()
	{
		var div;
		div = '<div class="newsreward-step newsreward-step1">'+
             '<div class="head"><span class="title reward_subject">打赏</span><a href="javascript:void(0)" class="rewardClose"></a></div>'+
             '<h3 class="title">打赏鼓励一下，小编会努力更新内容</h3>'+
             '<ul class="newsreward-list">'+
                '<li><a href="javascript:void(0)" data-m=2>2元</a></li>'+
                '<li><a href="javascript:void(0)" data-m=5>5元</a></li>'+
                '<li><a href="javascript:void(0)" data-m=10>10元</a></li>'+
                '<li><a href="javascript:void(0)" data-m=20>20元</a></li>'+
                '<li><a href="javascript:void(0)" data-m=50>50元</a></li>'+
                '<li><a href="javascript:void(0)" data-m=100>100元</a></li>'+
             '</ul>'+
             '<div class="zdy-lay">'+
                 '<a href="javascript:void(0)" title="自定义金额" class="zdy-step1" style="">自定义金额</a>'+
                 '<div class="zdy-step2" style="display:none;">'+
                     '<input type="text" placeholder="填入您想鼓励的金额" id="c_reward_money" autocomplete="off" /><button class="" id="c_reward_button">确定</button>'+
                 '</div>'+
                 '<span class="zdy-step3" style="display:none">自定义金额：<span id="c_show_moeny"></span></span>'+
             '</div>'+
             '<h3 class="title" style="margin:0 0 15px;">选择支付方式</h3>'+
                 '<div style="margin-top:0; text-align:center; width:220px; margin:0 auto; ">'+
		 '<form id="rewardForm" style="display:inline-block; float:left;"  action="http://www.mbalib.com/reward" method="post" target="_blank">'+
		 '<input type="hidden" name="channel" id="re_channel">'+
		 '<input type="hidden" name="title" id="re_title">'+
		 '<input type="hidden" name="user" id="re_user">'+
		 '<input type="hidden" name="type" id="re_type">'+
		 '<input type="hidden" name="aid" id="re_aid">'+
		 '<input type="hidden" name="amount" id="re_money">'+
		 '<input type="hidden" name="subject" id="re_subject">'+
                    '<a href="javascript:void(0)" ><img data-type="alipay" class="pay" src="http://static.mbalib.com/common/images/pay-alipay.png"/></a>'+
		    '</form>'+
                    '<a href="javascript:void(0)" style="display: inline-block;text-align: center; float:right;" ><img data-type="weixin" class="pay" src="http://static.mbalib.com/common/images/pay-weixin.png" /></a>'+
                 '</div>'+
        '</div> '+ 
       '<div class="newsreward-step newsreward-step2" style="display:none;">'+
             '<div class="head"><span class="title reward_subject">打赏</span><a href="javascript:void(0)" class="rewardClose"></a></div>'+
             '<div>'+
                   '<h3 style="text-align:center; margin-top:35px;"><a href="javascript:void(0)" class="back"></a>打赏</h3>'+
                   '<span class="payvalue">￥1.00</span>'+
                   '<p class="wx-pay-load" style="display:none;">已打开支付宝页面，请查看</p>'+
                   '<div class="wx-pay" style="display:none;">'+
                       //'<img src="images/wx-100.png" width="100" height="100" />'+
                       '<div class="pw-box-hd" id="qrcode"></div>'+
                       '<p><img src="http://static.mbalib.com/common/images/pay-weixin.png" /></p>'+
                   '</div>'+
                   //'<p class="wx-pay-load" style="background-color:#F05757;">已支付成功，谢谢</p>'+
             '</div>'+
       ' </div>';
		$("body").append(div);
	}

	$(function(){

		var re_money,
		    re_channel,
		    re_aid,
	            re_user,
		    re_title,
		    re_subject,
		    re_type,
		    init=null;
		$("#c_reward").click(function(){
			if(init == null)
			{
				loadDiv();
				re_channel = $(this).attr("data-channel");
				re_user = $(this).attr("data-user");
				re_aid = $(this).attr("data-aid");
				re_title = $(this).attr("data-title");
				re_subject = $(this).attr("data-subject");
				//$(".reward_subject").html(re_subject);
				if(typeof clickReward === 'function')//调用外部点击赞赏后的操作
				{
					clickReward();
				}
				init = true;
			}
			$('.newsreward-step1').show();
		});

		$(document).on("click",".rewardClose",function(){
			$(".newsreward-step").hide();
			$(".wx-pay-load,.wx-pay").hide();
			$(".newsreward-list a").removeClass("sel");
			$(".zdy-step2,.zdy-step3").hide();
			$(".zdy-step1").show();
			$("#c_reward_money").val('');
			re_money = '';
			$("#c_reward_button").removeClass("zdy-blue");
		});

		$(document).on("click",".zdy-step1",function(){
			$(".newsreward-list a").removeClass("sel");
			$(".zdy-step2").show();
			$(".zdy-step1").hide();
			re_money = '';
		});

		$(document).on("keyup input","#c_reward_money",function(){
			this.value = this.value.replace(/[^\d]/g, '');
			var money = $("#c_reward_money").val();
			//$("#c_reward_money").val(re_money);
			if(money > 0)
			{
				$("#c_reward_button").addClass("zdy-blue");
			}else
			{
				$("#c_reward_button").removeClass("zdy-blue");
			}
		});

		$(document).on("click","#c_reward_button",function(){
			if(!$(this).hasClass("zdy-blue")) return false;
			$(".zdy-step1,.zdy-step2").hide();
			re_money =  $("#c_reward_money").val();
			$("#c_show_moeny").html(re_money+"元");
			$(".zdy-step3").show();
		});


		$(document).on("click",".zdy-step3",function(){
			$(this).hide();
			$("#c_reward_money").val(re_money);
			$(".zdy-step2").show();
		});

		$(document).on("click",".back",function(){
			$(".newsreward-step2,.wx-pay,.wx-pay-load").hide();
			$(".newsreward-step1").show();
		});


		$(document).on("click",".newsreward-list a",function(){
			$(".newsreward-list a").removeClass("sel");
			$(this).addClass("sel");
			re_money = $(this).attr("data-m");
			$(".zdy-step3,.zdy-step2").hide();
			$(".zdy-step1").show();
			$("#c_reward_money").val('');
		});

		$(document).on("click",".pay",function(){
			if(!re_money) return false;
			re_type = $(this).attr("data-type");
			$(".newsreward-step").hide();
			$(".newsreward-step2").show();
			if(re_type == 'alipay')
			{
				$(".wx-pay-load").show();
			}else if(re_type == 'weixin')
			{
				$(".wx-pay").show();
			}
			getPayUrl();
		});

		function getPayUrl()
		{
			var payUrl='http://www.mbalib.com/reward';
			$(".payvalue").html("￥"+re_money);
			if(re_type != 'weixin')
			{
				$("#re_channel").val(re_channel);
				$("#re_title").val(re_title);
				$("#re_user").val(re_user);
				$("#re_type").val(re_type);
				$("#re_aid").val(re_aid);
				$("#re_money").val(re_money);
				$("#re_subject").val(re_subject);
				$("#rewardForm").submit();
			}else
			{
				payUrl = payUrl + "?subject="+re_subject+"&type="+re_type+"&channel="+re_channel+"&amount="+re_money+"&aid="+re_aid+"&title="+re_title+"&user="+re_user;
				/*$.post(payUrl,{subject:re_subject,type:re_type,channel:re_channel,amount:re_money,aid:re_aid,title:re_title,user:re_user},function(result){
					if(result.state == 'success')
					{
						renderWeixinImg(result.url);
					}
				},'json');*/
				crossDomainAjax(payUrl,function (data) {
					// success logic
					if(data.state == 'success')
					{
						renderWeixinImg(data.url);
					}
				});
			}
		}

		//loadDiv();
		//getPayUrl();

		function renderWeixinImg(url)
		{
			$("#qrcode").html('');
			var render = 'canvas';
			if (window.ActiveXObject)
			{
				var version = navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/)[1];
				if(parseInt(version) <= 8) render = "table";
			}
			$('#qrcode').qrcode({render:render,width: 100,height: 100,text: url});
		}

		function crossDomainAjax (url,successCallback) {

			url = encodeURI(url);	
			// IE8 & 9 only Cross domain JSON GET request
			if ('XDomainRequest' in window && window.XDomainRequest !== null) {
				var xdr = new XDomainRequest(); // Use Microsoft XDR
				xdr.open('get', url);
				xdr.onload = function () {
					var dom  = new ActiveXObject('Microsoft.XMLDOM'),
					    JSON = $.parseJSON(xdr.responseText);

					dom.async = false;

					if (JSON == null || typeof (JSON) == 'undefined') {
						JSON = $.parseJSON(data.firstChild.textContent);
					}

					successCallback(JSON); // internal function
				};

				xdr.onerror = function() {
					_result = false;  
				};

				xdr.send();
			} 

			// IE7 and lower can't do cross domain
			else if (navigator.userAgent.indexOf('MSIE') != -1 &&
					parseInt(navigator.userAgent.match(/MSIE ([\d.]+)/)[1], 10) < 8) {
						return false;
					}    

			// Do normal jQuery AJAX for everything else          
			else {
				$.ajax({
					url: url,
					cache: false,
					dataType: 'json',
					type: 'GET',
					async: false, // must be set to false
					success: function (data, success) {
						successCallback(data);
					}
				});
			}
		}

	});
})()
