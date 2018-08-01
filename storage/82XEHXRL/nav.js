$(function(){

   	$(function(){
   		var but=true;
   		var but_wsize=true;
		$(window).resize(function(){
	   		if($(window).width()>1011)
	   		{
			$('.collapse').removeAttr('style');
	
			    if(!but)  //监视导航是否折叠
				but_wsize=false;//监视窗口是否发生改变
	   		}
	   		if($(window).width()<=767)
	   		{
				$('.xg .col-sm-6').css('margin-left',0);
	   		}
	   	});
	   	$('.navbar-toggle').click(function(){
	   		if(!but && (but_wsize==true))
	   		{
				$('.collapse').css('marginRight','-32px');
	   		}else
	   		{
	   			$('.collapse').css('marginRight','-15px');
	   		}
	   		
			$('.collapse').slideToggle(400,function(){
				but==true?but=false:but=true;
			});
		});

   	});
	// 点击导航

    $(function(){
    	var but=true;    	
			$('.search_c').click(function(){
				if(but)
    			{
					$('.search').css({'borderWidth':'1px'});
					$('.search').animate({'paddingRight':'20px','paddingLeft':'20px'},100,'swing',
						function(){but=false;}
					); 
					if($(window).width()>1011)
					{
						 $('.search').animate({'width':'90%'},'normal','swing');
					}
					else
				 	{
						if($(window).width()<=1011 && $(window).width()>730)
						{
							$('.search').animate({'width':'88%'},150,'swing');
							
						}
						else if($(window).width()<=730 && $(window).width()>500)
						{
							$('.search').animate({'width':'85%'},100,'swing');
						}
						else if($(window).width()<=500 && $(window).width()>356)
						{
							$('.search').animate({'width':'80%'},100,'swing');
						}
						else
							{$('.search').animate({'width':'76%'},100,'swing');}
						$(this).find('a').css('text-align','right');

					}
					
								
				 }else
			    {
					$('.search').animate({'width':'0','paddingRight':'0px','paddingLeft':'0px'},'normal','swing',
						function(){
							but=true;$(this).css({'borderWidth':'0px'});
							if($(window).width()<=1011)
							{
								$('.search_c').find('a').css('text-align','left');
							}	
						}
					);
			    }	
		    });
    });//搜索框展开收缩
   

   	$(function(){
   		if($('.xg').length<1)return;
	     var top=$('.xg').offset().top-300;

	     $(window).scroll(function(){
		     var w_t=$(window).scrollTop()+$(window).height();
		     if(top<w_t && $(window).width()>767)
		     {
		     	$('.xg .col-sm-6').eq(0).animate({'margin-left':'50%','opacity':1},1000,'swing');
				$('.xg .col-sm-6').eq(1).animate({'margin-left':'-100%','opacity':1},1000,'swing');
		     }
		     else if(top<w_t)
		     {
		     	$('.xg .col-sm-6').animate({'opacity':1},1000,'swing').css('margin-left',0);
		     }
	     })
	});//相关阅读

   $(function(){
       if($('.news .sidebar').length<1)return;
   	   var h=$('.news .sidebar').height();
   		$('.news .colse').click(function(){
   			$('.news .sidebar').css('height',h).animate({'width':0},"slow",'linear',function(){
   				$(this).find('ul').css('display','none');
   				$(this).find('.open').delay("slow").animate({'width':22});
   			});
   			$('.news .right-content').animate({'width':'95%'},"slow",'linear');
   		});

   		$('.news .open').click(function(){
   			$(this).animate({'width':0});
			$('.news .sidebar').find('ul').css('display','block');
   			$('.news .sidebar').animate({'width':'25%','height':'auto'},"slow",'linear');
   			$('.news .right-content').removeAttr('style');
   		});	
   });// 展开收起栏目列表

	$(function(){
		var re=/^\s*$/;
		$('.search').blur(function(){
			var val=$(this).val();
			if(!re.test(val) && val.length>=2)
			{
				window.location.href ='search.html';
			}
		})

	});// 搜索文章跳转

});