$(function() {
  	$.ajax({
  		url:request_url.movePic,
 		dataType:"json",
 		type:"get",
 		success:function(data){
 			var str='';
 			var str2 = '';
 			$.each(data,function(index,val){
 				str+='<li class="swiper-slide"><a href="'+val.herf+'" target="_blank"><img alt="'+val.alt+'" src="'+field.imgIp+val.imgurl+'"/></a></li>';	
 				$(".imgList").html(str);
 				str2+='<li></li>';
 			})	
 			$(".indexList").html(str2);


 			var curIndex = 0; //当前index
		    //  alert(imgLen);
		    // 定时器自动变换2.5秒每次
		    $(".indexList").find("li").removeClass("indexOn").eq(curIndex).addClass("indexOn");
		  	var autoChange = setInterval(function(){ 
		    	if(curIndex < $(".imgList li").length-1){ 
		      		curIndex ++; 
		    	}else{ 
		      		curIndex = 0;
		    	}
		    //调用变换处理函数
		    	changeTo(curIndex); 
		  	},5000);
		 	//alert($(".imgList li").length);
		 	if($(".imgList li").length==1){
		 		clearInterval(autoChange);
		 		$(".indexList").find("li").hide();
		 	}else{
		 		$(".indexList").find("li").each(function(item){ 
			    	$(this).hover(function(){ 
			      		clearInterval(autoChange);
			      		changeTo(item);
			      		curIndex = item;
			    	},function(){ 
			      		autoChange = setInterval(function(){ 
			        		if(curIndex < $(".imgList li").length-1){ 
			         			curIndex ++; 
			        		}else{ 
			          			curIndex = 0;
			        		}
			        	//调用变换处理函数
			       			changeTo(curIndex); 
			      		},5000);
			    	});
			  	});
			  	$(".imgList").find("li").each(function(item){ 
			    	$(this).hover(function(){ 
			      		clearInterval(autoChange);
			    	},function(){ 
			      		autoChange = setInterval(function(){ 
				        	if(curIndex < $(".imgList li").length-1){ 
				          		curIndex ++; 
				        	}else{ 
				          		curIndex = 0;
				        	}
			        //调用变换处理函数
			        		changeTo(curIndex); 
			      		},5000);
			    	});
			  	});
		 	}
		  	
		  	
		 	function changeTo(num){ 
		    	$(".imgList").find("li").removeClass("imgOn").hide().eq(num).fadeIn().addClass("imgOn");
		    	$(".infoList").find("li").removeClass("infoOn").eq(num).addClass("infoOn");
		    	$(".indexList").find("li").removeClass("indexOn").eq(num).addClass("indexOn");
		  	}
 		}
  	})
});


























