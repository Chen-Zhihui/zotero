(function(){
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

function setCookie(c_name,value,minute,domain)
{
	var exdate=new Date();
	//exdate.setDate(exdate.getDate()+expiredays);
	exdate.setTime(exdate.getTime()+60*1000*minute);
	document.cookie=c_name+ "=" +escape(value)+";path=/;domain="+domain+
		((minute==null) ? "" : ";expires="+exdate.toGMTString());
}

//判断PC
function isPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone",
	    "SymbianOS", "Windows Phone",
	    "iPad", "iPod"];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

function isWeixin(){
	if(navigator.userAgent.toLowerCase().indexOf("micromessenger") > 0)
	{
		return true;
	}	
	return false;
}

function pushClick(pushname)
{
	_hmt.push(['_trackEvent','ad_click',pushname]);
}

function pushShow(pushname)
{
	_hmt.push(['_trackEvent','ad_show',pushname]);
}



var mydate = new Date();
var d=mydate.getDate();
var m=mydate.getMonth() + 1;
var y=mydate.getFullYear();
var h=mydate.getHours();
var mi=mydate.getMinutes();
var host=document.domain; 
var url = "https://www.mbalib.com/services/ad";

y = y.toString();
if(m < 10)
{
	m = '0' + m.toString();
}else
{
	m = m.toString();
}

if(d < 10)
{
	d = '0' + d.toString();
}else
{
	d = d.toString();
}




$(function(){
	(function(){
	var f = host.split('.');
	var from = f[0];
	var ads = new Object();
	function getAds()
	{
		$.get(url,function(result){
			if(result)
			{
				if(typeof(result) == 'string')
				{
					result = eval('(' + result + ')');//兼容低版本jquery 培训频道 
				}
				for(var i in result)
				{
					var val = result[i];
					var channels = val.ad_channel.split(",");
					if($.inArray(from, channels)<0) continue;
					if(!ads[val.ad_type])
					{
						ads[val.ad_type] = new Array();
					}
					var ad = new Object();
					ad.name = val.ad_name;
					ad.url = val.ad_url;
					ad.weixin_url = val.ad_weixin_url;
					ad.img = val.ad_image;
					ad.interval = val.ad_interval;
					ads[val.ad_type].push(ad);
				}
				showPopAd(ads.pop);
				showBottomAd(ads.bottom);
				showCornerAd(ads.corner);
				showHomeAd(ads.web);
				showWikiLeft1Ad(ads.wiki_left1);
				showWikiLeft2Ad(ads.wiki_left2);
				showWikiLeft3Ad(ads.wiki_left3);
				showTrainingRightAd(ads.training_right);
			}
		},'json');
	}
	getAds();
	

	function showBottomAd(ads)
	{
		if(isPC()) return false;
		if(!ads) return false;
		var img = '';
		var url = '';
		var url2 = '';
		var name = '';
		var state = false;
		var cookiename = "ad_bottom";
		var isadshow = getCookie(cookiename);

		var max = ads.length - 1;
		var rand = parseInt(Math.random()*(max+1),10);

		var ad = ads[rand];

		url = ad.url;
		url2 = ad.weixin_url;
		img = ad.img;
		name = ad.name;

		if(!url) return false;

		var pushname = cookiename+"_"+from+"_"+name;
		var showurl = url;
		if(isWeixin())
		{
			showurl = url2;
		}
		
		if(!isadshow)
		{
			adHTML();
			if(ad.interval)
			{
				setCookie(cookiename,1,ad.interval,host);
			}
			pushShow(pushname);
		}

		
		$(".close-ico").click(function(){
			$(".app-ad").hide();
			return false;
		});

		function adHTML(url)
		{
			var str = '<a href="'+showurl+'" target="_blank" class="app-ad"><img id="bottom_img" src="'+img+'" /><span class="close-ico">x</span></a>';	
			$("body").append(str);
			$("#bottom_img").bind("click",function(){
				pushClick(pushname);
			});
		}
	}

	function showCornerAd(ads)
	{
		if(!isPC()) return false;
		if(!ads) return false;
		var img = '';
		var url = '';
		var url2 = '';
		var name = '';
		var state = false;
		var cookiename = "ad_corner";
		var isadshow = getCookie(cookiename);

		var max = ads.length - 1;
		var rand = parseInt(Math.random()*(max+1),10);

		var ad = ads[rand];

		url = ad.url;
		url2 = ad.weixin_url;
		img = ad.img;
		name = ad.name;

		//if(!url) return false;

		var pushname = cookiename+"_"+from+"_"+name;
		var showurl = url;
		
		if(!isadshow)
		{
			adHTML();
			if(ad.interval)
			{
				setCookie(cookiename,1,ad.interval,host);
			}
			pushShow(pushname);
		}



		function adHTML()
		{
			var str = '<div class="ad-br">'+
				'<a href="javascript:void(0)" class="ad-br-close">关闭</a>'+
				'<img id="corner_img" src="'+img+'">'+
				'</div>';
			$("body").append(str);
			$("#corner_img").bind("click",function(){
				pushClick(pushname);
			});
		}

		$(".ad-br-close").click(function(){
			$(".ad-br").hide();
			return false;
		});

		$(".ad-br").click(function(){
			if(showurl)
			{
			window.open(showurl);
			}
		});
	}

	function showPopAd(ads)
	{
		if(!isPC()) return false;
		if(!ads) return false;
		var img = '';
		var url = '';
		var url2 = '';
		var name = '';
		var state = false;
		var cookiename = "ad_pop";
		var isadshow = getCookie(cookiename);

		var max = ads.length - 1;
		var rand = parseInt(Math.random()*(max+1),10);

		var ad = ads[rand];

		url = ad.url;
		url2 = ad.weixin_url;
		img = ad.img;
		name = ad.name;

		//if(!url) return false;

		var pushname = cookiename+"_"+from+"_"+name;
		var showurl = url;
		
		if(!isadshow)
		{
			adHTML();
			setCookie(cookiename,1,ad.interval,host);
			pushShow(pushname);
		}


		function adHTML()
		{
			var str = '<div class="wjdc-box">'+
				'<div style="position:relative; height:557px;text-align: center;">'+
				'<img id="pop_img" src="'+img+'">'+
				'<a href="javascript:void(0)" class="wjdx-close"></a>'+
				'</div>'+
				'</div>';
			str += '<div id="ad-bg" style="position:fixed;top: 0;left:0;  width: 100%;  height: 110%;  background-color: black;  z-index:1000;  -moz-opacity: 0.7;  opacity:.70;  filter: alpha(opacity=70);"></div>';
			$("body").append(str);

			$("#pop_img").bind("click",function(){
				pushClick(pushname);
			});
		}

		$(".wjdx-close").click(function(){
			$(".wjdc-box").hide();
			$("#ad-bg").hide();
			return false;
		});

		$(".wjdc-box").click(function(){
			if(showurl)
			{
				window.open(showurl);
			}
		});
	}

	function showHomeAd(ads)
	{
		if(!isPC()) return false;
		if(!ads) return false;
		var img = '';
		var url = '';
		var name = '';
		var state = false;
		var cookiename = "ad_web";
		var isadshow = getCookie(cookiename);

		var max = ads.length - 1;
		var rand = parseInt(Math.random()*(max+1),10);

		var ad = ads[rand];

		url = ad.url;
		img = ad.img;
		name = ad.name;

		//if(!url) return false;

		var pushname = cookiename+"_"+from+"_"+name;
		var showurl = url;
		
		if(!isadshow)
		{
			adHTML();
			setCookie(cookiename,1,ad.interval,host);
			pushShow(pushname);
		}


		function adHTML()
		{
			var str = '<a href="'+showurl+'" target="_blank" id="web_img"><img  src="'+img+'"></a>';
			$("#ad_640").html(str);
			$("#ad_640").show();

			$("#web_img").bind("click",function(){
				pushClick(pushname);
			});
		}
	}

	function showWikiLeft1Ad(ads)
	{
		if(!isPC()) return false;
		if(!ads) return false;
		var img = '';
		var url = '';
		var name = '';
		var state = false;
		var cookiename = "ad_wikiLeftMiddle";
		var isadshow = getCookie(cookiename);

		var max = ads.length - 1;
		var rand = parseInt(Math.random()*(max+1),10);

		var ad = ads[rand];

		url = ad.url;
		img = ad.img;
		name = ad.name;

		//if(!url) return false;

		var pushname = cookiename+"_"+from+"_"+name;
		var showurl = url;
		
		if(!isadshow)
		{
			adHTML();
			setCookie(cookiename,1,ad.interval,host);
			pushShow(pushname);
		}


		function adHTML()
		{
			var str = '<a href="'+showurl+'" target="_blank" id="ad_wikiLeft1"><img  src="'+img+'" style="max-width:200px"></a>';
			$("#wiki-03").html(str);
			$("#wiki-03").show();

			$("#ad_wikiLeft1").bind("click",function(){
				pushClick(pushname);
			});
		}
	}

	function showWikiLeft2Ad(ads)
	{
		if(!isPC()) return false;
		if(!ads) return false;
		var img = '';
		var url = '';
		var name = '';
		var state = false;
		var cookiename = "ad_wikiLeftBottom";
		var isadshow = getCookie(cookiename);

		var max = ads.length - 1;
		var rand = parseInt(Math.random()*(max+1),10);

		var ad = ads[rand];

		url = ad.url;
		img = ad.img;
		name = ad.name;

		//if(!url) return false;

		var pushname = cookiename+"_"+from+"_"+name;
		var showurl = url;
		
		if(!isadshow)
		{
			adHTML();
			setCookie(cookiename,1,ad.interval,host);
			pushShow(pushname);
		}


		function adHTML()
		{
			var str = '<a href="'+showurl+'" target="_blank" id="ad_wikiLeft2"><img  src="'+img+'" style="max-width:200px"></a>';
			$("#wiki-05").html(str);
			$("#wiki-05").show();

			$("#ad_wikiLeft2").bind("click",function(){
				pushClick(pushname);
			});
		}
	}

	function showWikiLeft3Ad(ads)
	{
		if(!isPC()) return false;
		if(!ads) return false;
		var img = '';
		var url = '';
		var name = '';
		var state = false;
		var cookiename = "ad_wikiLeftTop";
		var isadshow = getCookie(cookiename);

		var max = ads.length - 1;
		var rand = parseInt(Math.random()*(max+1),10);

		var ad = ads[rand];

		url = ad.url;
		img = ad.img;
		name = ad.name;

		//if(!url) return false;

		var pushname = cookiename+"_"+from+"_"+name;
		var showurl = url;
		
		if(!isadshow)
		{
			adHTML();
			setCookie(cookiename,1,ad.interval,host);
			pushShow(pushname);
		}


		function adHTML()
		{
			var str = '<a href="'+showurl+'" target="_blank" id="ad_wikiLeft3"><img  src="'+img+'" style="max-width:200px"></a>';
			$("#wiki-02").html(str);
			$("#wiki-02").show();

			$("#ad_wikiLeft3").bind("click",function(){
				pushClick(pushname);
			});
		}
	}

	function showTrainingRightAd(ads)
	{
		if(!isPC()) return false;
		if(!ads) return false;
		var img = '';
		var url = '';
		var name = '';
		var state = false;
		var cookiename = "ad_trainingRight";
		var isadshow = getCookie(cookiename);

		var max = ads.length - 1;
		var rand = parseInt(Math.random()*(max+1),10);

		var ad = ads[rand];

		url = ad.url;
		img = ad.img;
		name = ad.name;

		//if(!url) return false;

		var pushname = cookiename+"_"+from+"_"+name;
		var showurl = url;
		
		if(!isadshow)
		{
			adHTML();
			setCookie(cookiename,1,ad.interval,host);
			pushShow(pushname);
		}


		function adHTML()
		{
			var str = '<a href="'+showurl+'" target="_blank" id="ad_trainingRight"><img  src="'+img+'" style="max-width:236px"></a>';
			$("#ad-E02").html(str);
			$("#ad-E02").show();

			$("#ad_trainingRight").bind("click",function(){
				pushClick(pushname);
			});
		}
	}

	})();

});

})()
