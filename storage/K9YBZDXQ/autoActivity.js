var GLOBAL_CODE_VERSION_DEFAULT=1;var global_code_version=1;var GLOBA_COUPON_IS_SHOWTIP=0;(function(){(function(i){var n={browser:{userAgent:navigator.userAgent,isIE:(function(){return navigator.userAgent.indexOf("MSIE")!==-1})(),isChrome:(function(){return navigator.userAgent.indexOf("Chrome")!==-1})(),isFF:(function(){return navigator.userAgent.indexOf("Firefox")!==-1})(),isSafari:(function(){return navigator.userAgent.indexOf("Safari")!==-1})()},vcode:{getVcodeUrl:"http://vcode.dangdang.com/show_vcode.php",checkVcodeUrl:"http://login.dangdang.com/p/vcode_checker_new.php",showVcode:function(q){if(i("#"+q).length>0){i("#"+q).attr("src",n.vcode.getVcodeUrl+"?t="+new Date().getTime())}}},getScrtipPath:function(){var s,q,u,t,r;s=document.getElementsByTagName("script");_reg=new RegExp(n.configs["const"].script+".js");for(j=0,len=s.length;j<len;j++){q=s[j];u=q.src;if(_reg.test(u)){r=u.indexOf(n.configs["const"].script+".js");t=u.substr(0,r);break}}return t},configs:{getActivitiesTimeout:5000,timeout:3000,"const":{script:"autoActivity"},links:{mycoupon:"http://newaccount.dangdang.com/payhistory/mycoupon.aspx",mysafe:"http://safe.dangdang.com/mobile.php"}},lang:{submit:"\u63d0\u4ea4",loading:"\u6b63\u5728\u52a0\u8f7d\u002e\u002e\u002e",getCouponErr:"<p>\u793c\u5238\u9886\u53d6\u5931\u8d25\uff01</p>",vcodeErr:"\u9a8c\u8bc1\u7801\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165",vcodeEmptyErr:"\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801",vcodeText:"\u9a8c\u8bc1\u7801\uff1a",changeVcodeText:"\u6362\u5f20\u56fe",diaSuccessText:"\u0020\u0020\u0020\u0020\u53ef\u4ee5\u53bb",myCouponText:"\u6211\u7684\u793c\u5238",lookupText:"\u67e5\u770b\u3002",sureText:"\u786e\u8ba4",safeBindText:"\u60a8\u8fd8\u672a\u7ed1\u5b9a\u624b\u673a\u53f7\uff0c\u53bb\u5b8c\u6210\u0020",phoneBindText:"\u624b\u673a\u7ed1\u5b9a",phoneTipText:"\u007e\u007e\u007e",integralcomfireText:"\u60a8\u662f\u5426\u786e\u8ba4\u8981\u4f7f\u7528",integralExchangeText:"\u79ef\u5206\u5151\u6362",sheetText:"\u6b21",integralTimeText:"\u793c\u5238\u6709\u6548\u671f\u003a",integralTimeToText:"\u81f3",cancelText:"\u53d6\u6d88",accessErrorText:"\u6b64\u6d3b\u52a8\u8fc7\u4e8e\u706b\u7206\uff0c\u8bf7\u7a0d\u540e\u5c1d\u8bd5",purchaseTitle:"\u73b0\u91d1\u8d2d\u5238\u6d3b\u52a8",purchaseAmount:"\u5143\u73b0\u91d1\u8d2d\u4e70",purchaseLimitNum:"\u6bcf\u4eba\u9650\u8d2d",purchaseSure:"\u786e\u8ba4\u8d2d\u4e70",couponUrl:"\u67e5\u770b\u793c\u5238\u8303\u56f4",purchaseText1:"\u0031\u3001\u8bf7\u5728",purchaseText2:"\u5206\u949f\u5185\u5b8c\u6210\u652f\u4ed8\uff0c\u672a\u53ca\u65f6\u652f\u4ed8\u53ef\u80fd\u4f1a\u6ca1\u6709\u5269\u4f59\u793c\u5238",purchaseText3:"\u0032\u3001\u652f\u4ed8\u6210\u529f\u540e\u53ef\u5230",purchaseText4:"\u6211\u7684\u793c\u5238\u002d\u73b0\u91d1\u8d2d\u5238",purchaseText5:"\u8bb0\u5f55\u67e5\u8be2",purchaseText6:"\u0033\u3001\u793c\u5238\u8d2d\u4e70\u6210\u529f\u540e\uff0c\u4e0d\u652f\u6301\u9000\u6362",purchaseText7:"\u0034\u3001\u8bf7\u4e0d\u8981\u518d",purchaseText8:"\u5206\u949f\u5185\u91cd\u590d\u8d2d\u4e70",purchaseText9:"\u8bf7\u5728",purchaseText10:"\u5206\u949f\u5185\u5b8c\u6210\u652f\u4ed8\uff0c\u8bf7\u52ff\u91cd\u590d\u8d2d\u4e70\uff0c",purchaseText11:"\u5206\u949f\u5185\u91cd\u590d\u8d2d\u4e70\u4f1a\u5931\u8d25",purchaseText12:"\u652f\u4ed8\u6210\u529f",purchaseText13:"\u653e\u5f03\u652f\u4ed8",purchaseText14:"\u88c5\u5238\u8fc7\u7a0b\u4e2d\uff0c\u8bf7\u7a0d\u540e\u5230",purchaseText15:"\u6211\u7684\u793c\u5238",purchaseText16:"\u6ce8\uff1a\u73b0\u91d1\u8d2d\u5238\u8bb0\u5f55\u53ef\u5728",purchaseText17:"\u6211\u7684\u793c\u5238\u002d\u73b0\u91d1\u8d2d\u5238\u8bb0\u5f55",purchaseText18:"\u67e5\u770b",purchaseText19:"\uff08\u6ee1\u000d\u000a",purchaseText20:"\u5143\u53ef\u7528\uff09",getRotatePcErr:"<p>\u83b7\u53d6\u9a8c\u8bc1\u7801\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5</p>",goLoginText:"\u60a8\u8fd8\u672a\u767b\u5f55\uff0c\u8bf7\u5148\u767b\u5f55",goLoginBtn:"\u53bb\u767b\u5f55",zhYuan:"\u0026\u0023\u0031\u0036\u0035\u003b",more:"\u67e5\u770b\u66f4\u591a"},jquery:"http://static.ddimg.cn/js/coupon/jquery-1.8.0.min.js"};var e,a,c,h,p;var d=null;c="Activities_Compontents_Init";var b={};while(true){if(window[c]===void 0){break}c="Activities_Compontents_Init_"+Math.round(Math.random()*10000)}h=c;if(!i.fn.on){i.fn.on=i.fn.bind}if(!i.fn.off){i.fn.off=i.fn.unbind}document.head=document.head||document.getElementsByTagName("head")[0];var l={map:function(s){var q,r;q=[];for(r in this){if(r==="map"){continue}if(this[r].initLoadFlage==="Yes"){q.push(s(this[r]))}}return q},configs:{"const":{from_page:void 0,script:"newAutoActivity"},links:{checkActivities:"http://couponapi.dangdang.com/getNewActivities.do",pickActivity:"http://couponapi.dangdang.com/newAwardCoupon.do",purchase:"http://couponapi.dangdang.com/purchaseCoupon/purchase.do",getRotatePC:"http://couponapi.dangdang.com/rotate/getRotatePC.do",goShopping:"http://www.dangdang.com",myhome:"http://myhome.dangdang.com/",couponCss:"newAutoActivity.css"},scripts:{LoginWindow:{token:"showMsgBox",url:"http://static.ddimg.cn/js/login/LoginWindow.js"},PhoneAuth:{token:"PhoneAuth",url:"newPhoneAuth.js"},Rotate:{token:"isExitRotate_DD",url:"Rotate/jquery.coupon_rotate.js?20171123"}}},exeCouponAwardCallback:function(s,q,r){if(d&&d instanceof Function){d(s,q,r);d=null}}};var f={$:i("<div class='coupon_dialog_jf'><div class='header'><div class='coupon_title j_coupon_title'></div><div class='close'></div></div><div class='content'>Loading... </div></div>"),vcode:i("<div class='input-div'> <span class='input_yzm'>"+n.lang.vcodeText+"</span> <input type='text' class='input_kuang' maxlength='4' id='"+h+"_vcode_input' > <a class='button submit' href='javascript:void(0)'><span>"+n.lang.submit+"</span></a><p class='vcode_tip'><span id='"+h+"_vcode_tip'></span></p></div> <div class='input-div'> <img class='coupon_vcode' style='' id='"+h+"_vcode'> <a href='javascript:void(0)' class='change'>"+n.lang.changeVcodeText+"</a> </div>").find("img,a.change").on("click",function(){n.vcode.showVcode(f.vcode.find("img").attr("id"));return false}).end().find(".input_kuang").on("focus",function(){if(i("#"+h+"_vcode_tip").html()!=""){i(this).val("");n.vcode.showVcode(f.vcode.find("img").attr("id"));i("#"+h+"_vcode_tip").html("")}}).end(),rotateObj:i('<div id="J_rotateVcodePan"><div id="J_rotateVcodeCoupon"></div><a href="javascript:void(0)" class="button submit"><span>'+n.lang.submit+"</span></a></div>"),success:i("<p><span id='J_couponPublicSucc'></span>"+n.lang.diaSuccessText+" <a href='"+n.configs.links.mycoupon+"' target='_blank'>"+n.lang.myCouponText+"</a> "+n.lang.lookupText+"</p> <div style='margin-top:40px'> <div class='button' onclick='closeDialog();'><span>"+n.lang.sureText+"</span></div> </div>"),goLogin:i("<p><span id='J_couponGoLogin'></span>"+n.lang.goLoginText+"</p> <div style='margin-top:20px'> <div class='button j_coupon_go_login'><span>"+n.lang.goLoginBtn+"</span></div> </div>"),safeBind:i("<p>"+n.lang.safeBindText+" <a href='"+n.configs.links.mysafe+"' target='_blank'>"+n.lang.phoneBindText+"</a>"+n.lang.phoneTipText+"</p> <div style='margin-top:40px'> <div class='button' onclick='closeDialog();'><span>"+n.lang.sureText+"</span></div> </div>"),purchaseSure:i("<div class='comfire_text_wrap purchase'><div class='comfire_text'>"+n.lang.purchaseText9+"<span class='j_activityPayTerm'>2</span>"+n.lang.purchaseText10+"</div><div class='comfire_text'><span class='j_activityPayTerm'>2</span>"+n.lang.purchaseText11+"</div><div class='comfire_button'><div class='button comfire');'><span>"+n.lang.purchaseText12+"</span></div><div class='button cancel' onclick='closeDialog();'><span>"+n.lang.purchaseText13+"</span></div></div></div>"),purchaseLoding:i("<div class='comfire_text_wrap purchase'><div class='comfire_text'>"+n.lang.purchaseText14+"<a target='_blank' href='"+n.configs.links.mycoupon+"' class='comfire_a'>"+n.lang.purchaseText15+"</a>"+n.lang.purchaseText18+"</div><div class='comfire_button'><div class='button comfire' onclick='closeDialog();'><span>"+n.lang.sureText+"</span></div></div><div class='comfire_text coupon_tip'>"+n.lang.purchaseText16+"<a target='_blank' href='"+n.configs.links.mycoupon+"' class='comfire_a'>"+n.lang.purchaseText17+"</a>"+n.lang.purchaseText18+"</div></div>"),init:function(){f.$.appendTo("body").hide();f.$.find(".header>.close").off("click").on("click",function(){f.close();return false}).end()},close:function(){f.$.hide().find(".content").empty();f.$.removeClass("jifen")},show:function(){f.$.show()},set:function(q){f.$.find(".content").html(q);f.$.show()},appendContent:function(q){f.$.find(".content").html(q)},vcodeErrorTip:function(){}};var k={analyse:function(t){var r,q,s;try{s=t.attr("data-coupon-activity").split("|");r=b["activity_"+s[0]];if(!r){q=l.configs["const"].from_page||s[1];l.configs["const"].from_page=q;r=new m(s[0],t,l.configs["const"].from_page||s[1],s[2],s[3],s[4]);b["activity_"+s[0]]=r}else{r.add(t)}return r}catch(u){return void 0}},doIfScalperSuspect:function(u,s,r){var q;try{q=function(){var y,w,x,v;try{x=(i("#return_data").val()||"").split("|");if(x.length<2){PhoneAuth.init();return false}w=x.slice(0,2),y=w[0],v=w[1];i.ajax({url:l.configs.links.pickActivity,type:"get",timeout:n.configs.timeout,dataType:"jsonp",jsonp:"callback",data:{activitySerialNumber:r,mobileNumber:y,smsCode:v,fromPage:l.configs["const"].from_page},success:function(A){if(u){return k.purchaseAfterPick(A,r,true)}else{return k.afterPick(A,r,true)}},error:function(B,A){if(A=="timeout"){f.set(n.lang.accessErrorText)}else{f.set(n.lang.accessErrorText)}}})}catch(z){f.set(n.lang.accessErrorText)}};f.close();PhoneAuth.onSuccess=function(){f.show();q();return i("#return_data").val("")};PhoneAuth.goSafeBind=function(){f.set(f.safeBind)};PhoneAuth.goErrorTip=function(){f.set(n.lang.accessErrorText)};return q()}catch(t){return f.set(n.lang.getCouponErr)}},afterPick:function(u,t,q){if(u.status==="Success"){f.set(f.success);i("#J_couponPublicSucc").html(u.errorMessage);l.exeCouponAwardCallback(t,u.status,u.errorMessage)}else{switch(u.errorCode){case 407:if(GLOBA_COUPON_IS_SHOWTIP==1){GLOBA_COUPON_IS_SHOWTIP=0;var s;var v=i('[data-coupon-activity^="'+t+'|"]');s=k.analyse(v);k.printCouponHtml(s)}else{k.pickActivity(t,1,global_code_version,"error")}break;case 406:f.set(f.safeBind);break;case 403:if(q===true){f.set(n.lang.getCouponErr);l.exeCouponAwardCallback(t,u.status,u.errorMessage);return false}f.set(n.lang.loading);if(!window[l.configs.scripts.PhoneAuth.token]){var r=n.getScrtipPath()+l.configs.scripts.PhoneAuth.url;i.getScript(r,function(){k.doIfScalperSuspect(false,u,t)})}else{k.doIfScalperSuspect(false,u,t)}break;case 402:if(GLOBA_COUPON_IS_SHOWTIP==1){GLOBA_COUPON_IS_SHOWTIP=0;var s;var v=i('[data-coupon-activity^="'+t+'|"]');s=k.analyse(v);k.printCouponHtml(s)}else{if(global_code_version==0){i("#"+h+"_vcode_tip").html(n.lang.vcodeErr)}else{k.pickActivity(t,1,global_code_version,"error")}}break;case 400:showMsgBox("","","",function(){if(GLOBA_COUPON_IS_SHOWTIP==1){GLOBA_COUPON_IS_SHOWTIP=0}var w;var x=i('[data-coupon-activity^="'+t+'|"]');w=k.analyse(x);k.printCouponHtml(w)});break;default:f.set(u.errorMessage||n.lang.getCouponErr);l.exeCouponAwardCallback(t,u.status,u.errorMessage);break}}},submitAwardCoupon:function(u,r,s){var q="",t=0;if(s==1){q=r.data?r.data:"";t=r.key?r.key:0}else{q=r}i.ajax({url:l.configs.links.pickActivity,type:"get",timeout:n.configs.timeout,dataType:"jsonp",jsonp:"callback",data:{activitySerialNumber:u,verifyCode:q,verifyCodeKey:t,version:s,fromPage:l.configs["const"].from_page},success:function(v){k.afterPick(v,u)},error:function(w,v){if(v=="timeout"){f.set(n.lang.accessErrorText)}else{f.set(n.lang.accessErrorText)}}})},pickActivity:function(r,s,q,t){if(s=="0"){k.submitAwardCoupon(r,"","")}else{global_code_version=q?q:GLOBAL_CODE_VERSION_DEFAULT;if(global_code_version==0){k.oldVcodeInit(r)}else{if(global_code_version==1){k.rotateInit("pick",r,t)}}}},purchasePickActivity:function(r,s,q,t){if(s=="0"){k.submitAwardPurchaseCoupon(r,"")}else{global_code_version=q?q:GLOBAL_CODE_VERSION_DEFAULT;if(global_code_version==1){k.rotateInit("purchase",r,t)}}},oldVcodeInit:function(q){var r;r=f.vcode.clone(true);r.find("a.submit").on("click",function(){var s;s=i.trim(i("#"+h+"_vcode_input").val());if(s){k.submitAwardCoupon(q,s,0)}else{i("#"+h+"_vcode_tip").html(n.lang.vcodeEmptyErr)}return i("#"+h+"_vcode_input").val()});f.set(r);n.vcode.showVcode(h+"_vcode");f.show()},rotateInit:function(t,s,u){var r=i("#J_rotateVcodeCoupon");if(r.length==0){var q;q=f.rotateObj.clone(true);q.find("a.submit").on("click",function(){var v;v=jQuery("#J_rotateVcodeCoupon").getCouponRotateValue();if(!v){return}if(v){if(t==="purchase"){k.submitAwardPurchaseCoupon(s,v)}else{k.submitAwardCoupon(s,v,1)}}});f.set(q);f.show()}k.getRotateImgById(s,u)},getRotateImgById:function(q,r){i.ajax({url:l.configs.links.getRotatePC,type:"get",dataType:"jsonp",data:{activitySerialNumber:q,t:new Date().getTime()},success:function(u){if(u.status==="Success"){var s,t;s=u.data;t={width:76,imgSrc:s.image,rotateKey:s.code_key};jQuery("#J_rotateVcodeCoupon").couponRotateImage(t);if(r&&r=="error"){i("#J_rotateVcodeCoupon").find(".Rotate-prompt").hide().end().find(".Rotate-operate .error").show()}i("#J_rotateVcodeCoupon").find(".Rotate-refresh").unbind("click.bubble").bind("click.bubble",{aid:q},function(v){getRotateImgById(v.data.aid)});f.show()}else{if(u.errorCode==400){f.$.hide();showMsgBox("","","",function(){k.getRotateImgById(q,r)})}else{f.set(u.errorMessage||n.lang.getRotatePcErr)}}},error:function(t,s){f.set(n.lang.getRotatePcErr);if(s=="timeout"){return false}else{return false}}})},purchaseAfterPick:function(v,u,r){if(v.status==="Success"){var t;var w=i('[data-coupon-activity^="'+u+'|"]');t=k.analyse(w);k.printCouponHtml(t);f.show();var q="";if(v.hasOwnProperty("data")&&v.data.hasOwnProperty("data")){q=v.data.data}i("#J_purchaseUrl").attr("href",q)}else{switch(v.errorCode){case 407:k.purchasePickActivity(u,1,1,"error");break;case 406:f.set(f.safeBind);break;case 403:if(r===true){f.set(n.lang.getCouponErr);l.exeCouponAwardCallback(u,v.status,v.errorMessage);return false}f.set(n.lang.loading);if(!window[l.configs.scripts.PhoneAuth.token]){var s=n.getScrtipPath()+l.configs.scripts.PhoneAuth.url;i.getScript(s,function(){k.doIfScalperSuspect(true,v,u)})}else{k.doIfScalperSuspect(true,v,u)}break;case 402:k.purchasePickActivity(u,1,1,"error");break;case 400:showMsgBox("","","",function(){var x;var y=i('[data-coupon-activity^="'+u+'|"]');x=k.analyse(y);k.printCouponHtml(x)});break;default:f.set(v.errorMessage||n.lang.getCouponErr);l.exeCouponAwardCallback(u,v.status,v.errorMessage);break}}},purchaseIsSucess:function(s){var r=f.$.find(".j_coupon_footer .j_activityPayTerm1").text();var q=f.purchaseSure.clone(true);q.find(".comfire").on("click",function(){k.purchaseLoading()});f.set(q);i(".comfire_text_wrap .j_activityPayTerm").text(r);l.exeCouponAwardCallback(s,"","")},purchaseLoading:function(){f.set(f.purchaseLoding)},submitAwardPurchaseCoupon:function(t,r){var q="",s=0;q=r.data?r.data:"";s=r.key?r.key:0;i.ajax({url:l.configs.links.purchase,type:"get",timeout:n.configs.timeout,dataType:"jsonp",jsonp:"callback",data:{activitySerialNumber:t,verifyCode:q,verifyCodeKey:s},success:function(u){k.purchaseAfterPick(u,t)},error:function(v,u){if(u=="timeout"){f.set(n.lang.accessErrorText)}else{f.set(n.lang.accessErrorText)}}})},printCouponHtml:function(E){var r=E.id;var x=E.activityExchangeType;d=null;d=E.awardCallback;if(x==2){var F="";var s=E.activityExchangeAmount;var t=E.activityPayTerm;var G=E.activityEveryoneRecNum;var C=parseInt(t)/60;var u=E.coupons;var z='<div class="comfire_text_wrap purchase">'+'<div class="content_text">'+"<p>"+n.lang.integralcomfireText+' <span id="'+h+'_point_value" class="cash purchase_point_value">'+s+"</span> "+n.lang.purchaseAmount+"</p>";if(u&&u.length>0){var D="two_more";if(u.length===1){D="only_one"}z+='<div class="coupons_show height_auto clearfix '+D+'">';for(var w=0,A=u.length;w<A;w++){var q="";if(w>=4){q="hide"}z+='<div class="coupon_label '+q+'">'+'<p class="price"><span class="p">'+n.lang.zhYuan+'</span><span class="p_n">'+u[w].couponValue+"</span>"+n.lang.purchaseText19+u[w].couponMinUseValue+n.lang.purchaseText20+"</p>"+'<p class="c_name">'+u[w].couponDescription+"</p>"+'<p class="time_c">'+u[w].couponStartDate.substring(0,10).replace(/-/g,"/")+"-"+u[w].couponEndDate.substring(0,10).replace(/-/g,"/")+"</p>"+"</div>"}z+="</div>";if(u.length>4){z+='<a href="javascript:;" class="look_area">'+n.lang.more+'<span class="drop_down"></span></a>'}}z+='<p class="limit_buy">'+n.lang.purchaseLimitNum+G+n.lang.sheetText+"</p>"+"</div>"+'<div class="comfire_button"><a target="_blank" id="J_purchaseUrl" class="button comfire" onclick="purchaseIsSucess('+r+');"><span>'+n.lang.purchaseSure+'</span></a><div class="button cancel" onclick="closeDialog();"><span>'+n.lang.cancelText+"</span></div></div>"+'<div class="coupon_footer j_coupon_footer"><ul><li>'+n.lang.purchaseText1+'<span class="j_activityPayTerm j_activityPayTerm1">'+C+"</span>"+n.lang.purchaseText2+"</li><li>"+n.lang.purchaseText3+'<a target="_blank" href="'+n.configs.links.mycoupon+'" class="comfire_a">'+n.lang.purchaseText4+"</a>"+n.lang.purchaseText5+"</li><li>"+n.lang.purchaseText6+"</li><li>"+n.lang.purchaseText7+'<span class="j_activityPayTerm">'+C+"</span>"+n.lang.purchaseText8+"</li></ul></div>"+"</div>";i(".j_coupon_title").text(n.lang.purchaseTitle);i(".coupon_dialog_jf").addClass("purchase_wrap");f.appendContent(z);i(".coupon_dialog_jf").find(".look_area").on("click",function(){if(i(".coupon_label.hide")&&i(".coupon_label.hide").length>0){i(this).find(".drop_down").addClass("on");i(".coupon_label.hide").removeClass("hide").addClass("show")}else{i(this).find(".drop_down").removeClass("on");i(".coupon_label.show").removeClass("show").addClass("hide")}})}else{if(x==1){var v=E.activityValidateGraphCode;var B=E.activityValidateGraphVersion;var G=E.activityEveryoneRecNum;var y=E.activityPointValue;var u=E.coupons;var z='<div class="comfire_text_wrap">'+'<div class="content_text">'+"<p>"+n.lang.integralcomfireText+' <span class="cash" id="'+h+'_point_value"> '+y+" </span> "+n.lang.integralExchangeText+"</p>";if(u&&u.length>0){var D="two_more";if(u.length===1){D="only_one"}z+='<div class="coupons_show height_auto clearfix '+D+'">';for(var w=0,A=u.length;w<A;w++){var q="";if(w>=4){q="hide"}z+='<div class="coupon_label '+q+'">'+'<p class="price"><span class="p">'+n.lang.zhYuan+'</span><span class="p_n">'+u[w].couponValue+"</span>"+n.lang.purchaseText19+u[w].couponMinUseValue+n.lang.purchaseText20+"</p>"+'<p class="c_name">'+u[w].couponDescription+"</p>"+'<p class="time_c">'+u[w].couponStartDate.substring(0,10).replace(/-/g,"/")+"-"+u[w].couponEndDate.substring(0,10).replace(/-/g,"/")+"</p>"+"</div>"}z+="</div>";if(u.length>4){z+='<a href="javascript:;" class="look_area">'+n.lang.more+'<span class="drop_down"></span></a>'}}z+='<p class="limit_buy">'+n.lang.purchaseLimitNum+G+n.lang.sheetText+"</p>"+"</div>"+'<div class="comfire_button"><div class="button comfire" onclick="exchangeCoupon('+r+",'"+v+"','"+B+"');\"><span>"+n.lang.sureText+'</span></div><div class="button cancel" onclick="closeDialog();"><span>'+n.lang.cancelText+"</span></div></div>"+"</div>";f.set(z);i(".coupon_dialog_jf").addClass("jifen");i(".coupon_dialog_jf").find(".look_area").on("click",function(){if(i(".coupon_label.hide")&&i(".coupon_label.hide").length>0){i(this).find(".drop_down").addClass("on");i(".coupon_label.hide").removeClass("hide").addClass("show")}else{i(this).find(".drop_down").removeClass("on");i(".coupon_label.show").removeClass("show").addClass("hide")}})}else{var v=E.activityValidateGraphCode;var B=E.activityValidateGraphVersion;k.pickActivity(r,v,B)}}},init:function(){i(function(){var q=document.createElement("link");q.rel="stylesheet";q.href=n.getScrtipPath()+l.configs.links.couponCss;document.head.appendChild(q);f.init();window.closeDialog=f.close;window.CouponTool=n;window.exchangeCoupon=k.pickActivity;window.purchaseIsSucess=k.purchaseIsSucess;window.getRotateImgById=k.getRotateImgById;p=document.write;document.write=function(s){return i("head").append(s)};if(!window[l.configs.scripts.LoginWindow.token]){i.getScript(l.configs.scripts.LoginWindow.url,function(){document.write=p})}if(!window[l.configs.scripts.Rotate.token]){var r=n.getScrtipPath()+l.configs.scripts.Rotate.url;i.getScript(r)}i("[data-coupon-activity]").not(".had_read").each(function(s,v){var u,t;u=i(this);t=k.analyse(u);u.on("click",function(){i(".j_coupon_title").text("");if(!window[l.configs.scripts.LoginWindow.token]||t.status===0){f.set(t.error||n.lang.getCouponErr);f.show();return false}var z=t.id;var y=t.activityExchangeType;var w=t.activityValidateGraphCode;if(y==2){if(w==1){k.purchasePickActivity(z,1,1,"error")}else{k.submitAwardPurchaseCoupon(z,"")}}else{if(w==1){var x=t.activityPointValue;if(x!=undefined&&x!="null"&&x>0){GLOBA_COUPON_IS_SHOWTIP=1}k.submitAwardCoupon(z,"","")}else{k.printCouponHtml(t)}}}).data("CouponActivity",t)});ids=b.map(function(s){return s.id}).join(",");if(ids&&ids!=""){i.ajax({url:l.configs.links.checkActivities,type:"get",timeout:n.configs.getActivitiesTimeout,dataType:"jsonp",data:{activitySerialNumbers:ids,fromPage:l.configs["const"].from_page},success:function(w){var v,u,t,s;w.status==="Success";s=w.data;for(v in s){u=s[v];t=b["activity_"+v];if(t&&t.init instanceof Function){t.init(u)}}},error:function(t,s){if(s=="timeout"){return false}else{return false}}})}i("script[data-name="+c+"]").remove()})}};var m=(function(){function q(y,u,w,r,v,t,x,s){this.id=y!=null?y:0;this.domJ=u;this.fromPage=w;this.status=s!=null?s:1;this.initLoadFlage=t==="init-no-load"?"No":"Yes";this.activityValidateGraphCode=0;this.activityValidateGraphVersion=GLOBAL_CODE_VERSION_DEFAULT;global_code_version=GLOBAL_CODE_VERSION_DEFAULT;this.activityCallback=null;this.awardCallback=null;this.error="";this.activityExchangeType=0;this.activityDescription="";this.activityExchangeAmount=0;this.activityPayTerm=0;this.activityEveryoneRecNum=1;this.activityPointValue=0;this.coupons=[];this.desc=x!=null?x:"";this.couponStartDate="";this.couponEndDate="";if(r&&r!=""&&window[r] instanceof Function){this.activityCallback=window[r]}if(v&&v!=""&&window[v] instanceof Function){this.awardCallback=window[v]}}q.prototype.add=function(r){this.domJ=this.domJ.add(r)};q.prototype.pick=function(){};q.prototype.init=function(r){if(r.status==="Success"){this.status=1;if(r.hasOwnProperty("activityEveryoneRecNum")){this.activityEveryoneRecNum=r.activityEveryoneRecNum}if(r.hasOwnProperty("coupons")&&r.coupons.length>0){this.coupons=r.coupons}if(r.hasOwnProperty("activityDescription")){this.activityDescription="("+r.activityDescription+")"}if(r.hasOwnProperty("activityExchangeType")){this.activityExchangeType=r.activityExchangeType}if(r.hasOwnProperty("activityValidateGraphCode")){this.activityValidateGraphCode=r.activityValidateGraphCode}if(this.activityExchangeType==2){if(r.hasOwnProperty("activityExchangeAmount")){this.activityExchangeAmount=r.activityExchangeAmount}if(r.hasOwnProperty("activityPayTerm")){this.activityPayTerm=r.activityPayTerm}}else{if(r.hasOwnProperty("activityValidateGraphVersion")){this.activityValidateGraphVersion=r.activityValidateGraphVersion}if(r.hasOwnProperty("activityPointValue")&&r.activityPointValue!="null"&&r.activityPointValue!=0){this.activityPointValue=r.activityPointValue}}}else{this.status=0;this.error=r.errorMessage}if(this.activityCallback&&this.activityCallback instanceof Function){this.activityCallback(this.id,r.status,r.errorMessage);this.activityCallback=null}};return q})();b.map=l.map;window[c]=k.init;var a=function(){var q;q=document.createElement("script");q.setAttribute("data-name",h);if(n.browser.isFF){q.textContent="window."+h+"();delete window."+h+";"}else{q.text="window."+h+"();"}return document.head.appendChild(q)};if(!i){e=document.createElement("script");e.src=n.jquery;document.head.appendChild(e);if(n.browser.isIE){e.onreadystatechange=function(){var q;q=e.readyState;if(q==="loaded"||q==="complete"){a()}}}else{e.onload=a}}else{var o=n.jquery;var g=false;if(typeof jQuery==="undefined"){g=true}else{if(jQuery.fn.jquery.substr(0,1)<1||jQuery.fn.jquery.substr(2,1)<4){g=true}}if(g){e=document.createElement("script");e.src=n.jquery;document.head.appendChild(e);if(n.browser.isIE){e.onreadystatechange=function(){var q;q=e.readyState;if(q==="loaded"||q==="complete"){a()}}}else{e.onload=a}}else{k.init()}}})(window.jQuery||window.$)})();