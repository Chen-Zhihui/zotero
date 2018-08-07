$(function(){
		//	头部的显示和隐藏
	function toubu(){
		var ul_a=$(".header-ul");
		for(var i=0;i<ul_a.length-1;i++){
			ul_a[i].index=i;
			$(".header-ul").eq(i).mousemove(function(){
				$(".ul-ul").eq(this.index-1).css({display:"block"});
			});
			$(".header-ul").eq(i).mouseout(function(){
				$(".ul-ul").eq(this.index-1).css({"display":"none"});
			});
			
		};
	}
	toubu();
	function tou(){
		var ul=$(".header-ul-ul");
		for(var i=0;i<ul.length;i++){
			ul[i].index=i;
			$(".header-ul-ul").eq(i).click(function(){
				$(".header-ul-ul").removeClass("header-con-hover");
				$(".header-ul-ul").eq(this.index).addClass("header-con-hover");
			});
			$(".header-ul-ul").eq(i).mousemove(function(){
				$(".header-ul-ul").eq(this.index).addClass("header-con-hover");
			});
			$(".header-ul-ul").eq(i).mouseout(function(){
				$(".header-ul-ul").eq(this.index).removeClass("header-con-hover");
				// $(".header-ul-ul").eq(this.index).addClass("header-con-hover");
			});
		};

	}
	tou();
	//头部菜单的样式设置
	function yangshi(){
		var tt=true;
		$(".header-right .right-li").eq(0).click(function(){
			if(tt){
				$(".header-right .right-li").eq(0).css({"border-bottom":"none"});
				$(".header-right .right-li2").eq(0).css({display:"block"});
				tt=false;
			}else{
				$(".header-right .right-li").eq(0).css({"border-bottom":"2px solid #B8B8B8"});
				$(".header-right .right-li2").eq(0).css({display:"none"});
				tt=true;
			}
		});
		
		var toggle=true;
		$(".header-right .right-li2").eq(0).click(function(){
			if(toggle){
				var t2='我的错题<span class="right-span"></span>';
				var t1="菜单";
				$(".header-right .right-li").eq(0).html(t2);
                $(".header-right .right-li2").eq(0).css({display:"none"});
                $(".header-right .right-li").eq(0).css({"border-bottom":"2px solid #B8B8B8"});
                $(".header-right .right-li2").eq(0).html(t1);
                toggle=false;
			}else{
				var t2='菜单<span class="right-span"></span>';
				var t1="我的错题";
				$(".header-right .right-li").eq(0).html(t2);
                $(".header-right .right-li2").eq(0).css({display:"none"});
                $(".header-right .right-li").eq(0).css({"border-bottom":"2px solid #B8B8B8"});
                $(".header-right .right-li2").eq(0).html(t1);
                 toggle=true;
			}	
		})	
	}
	yangshi();

	//登录后的hover效果
	$('.header-right .btn-hover-1').eq(0).hover(function(){
		// console.log(1);
		$(".clo").eq(0).width($('.header-right .btn-hover-1').eq(0).width()+44);
		$(".clo").eq(0).show();
	},function(){
		// console.log(2);
		$(".clo").eq(0).hide();
	})
})
