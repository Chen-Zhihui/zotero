define("pages/report.js",["biz_wap/utils/ajax.js","pages/version4video.js"],function(e){
"use strict";
function i(e){
var i=["/mp/pagereport?type=","undefined"==typeof e.type?1:e.type,"&comment_id=",e.comment_id||"","&voiceid=",e.voiceid||"","&action=",e.action,"&__biz=",parent.window.biz||"","&mid=",parent.window.mid||"","&idx=",parent.window.idx||"","&scene=",e.scene||"","&uin=",parent.window.uin||"","&key=",parent.window.key||"","&pass_ticket=",parent.window.pass_ticket||"","&t=",Math.random(),"#wechat_redirect"].join(""),t=new Image;
t.src=i;
}
function t(e){
s({
type:"POST",
url:"/mp/videoreport?#wechat_redirect",
timeout:5e3,
async:e.async===!0?!0:!1,
data:e.data
});
}
function o(e){
for(var i=JSON.parse(JSON.stringify(e.data)),t=[],o=0,n=i.seek_position.length;n>o;o++){
var a=i.seek_position[o];
if(a&&a.length>0){
var d=a.join("#");
t.push(d||"");
}else t.push("");
}
i.seek_position=t;
for(var r=[],o=0,n=i.seek_loaded.length;n>o;o++){
var a=i.seek_loaded[o];
if(a&&a.length>0){
var d=a.join(",");
r.push(d||"");
}else r.push("");
}
i.seek_loaded=r;
for(var p=[],c=30;i.musicid.length>0;){
var a={};
for(var o in i)i.hasOwnProperty(o)&&("[object Array]"==Object.prototype.toString.call(i[o])?(a[o]=i[o].splice(0,c),
a[o]=a[o].join("mtitle"==o?";#":";")):a[o]=i[o]);
p.push(a);
}
for(var o=0;o<p.length;o++)s({
type:"POST",
url:"/mp/musicreport?#wechat_redirect",
timeout:2e4,
async:!0,
data:p[o]
});
}
function n(e){
var i=window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"",t=encodeURIComponent(parent.window.location.href.replace(/(\?|&)(key|uin)=([\S\s]*?)(&|$)/g,"$1").replace(/&$/,"")),o=["http://btrace.qq.com/kvcollect?BossId=2973&Pwd=1557019983&step=1009&vid=","undefined"!=typeof e.vid?e.vid:"","&platform=",d(),"&val=","undefined"!=typeof e.val?e.val:"","&val1=","undefined"!=typeof e.val1?e.val1:"","&vurl=",encodeURIComponent(e.vurl),"&t=",Math.random(),"&url=",t,"&wx_openid=",i].join(""),n=new Image;
n.src=o.substr(0,1024);
}
function a(e){
if(3==e.step||6==e.step||1999==e.step){
var i=window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"",t=encodeURIComponent(parent.window.location.href.replace(/(\?|&)(key|uin)=([\S\s]*?)(&|$)/g,"$1").replace(/&$/,"")),o=["http://btrace.qq.com/kvcollect?BossId=2973&Pwd=1557019983&step=",e.step,"&vid=","undefined"!=typeof e.vid?e.vid:"","&platform=",d(),"&loadwait=","undefined"!=typeof e.loadwait?e.loadwait:"","&val=","undefined"!=typeof e.val?e.val:"","&t=",Math.random(),"&url=",t,"undefined"!=typeof e.vt&&""!==e.vt&&6==e.step?"&vt="+e.vt:"","&wx_openid=",i].join(""),n=new Image;
n.src=o.substr(0,1024);
}
}
function d(){
var e=_.device;
return e.ipad?60101:e.is_android_phone?60301:e.iphone?60401:e.is_android_tablet?60501:"";
}
function r(){
var e=_.device;
return e.ipad?"v4010":e.is_android_phone&&_.isUseProxy()?"v5060":e.is_android_phone?"v5060":e.iphone&&_.isUseProxy()?"v3060":e.iphone?"v3060":e.is_android_tablet?"v6010":"";
}
function p(e){
var i={
mid:window.mid||0,
__biz:window.biz||0,
idx:window.idx||0,
musicid:[],
hasended:[],
commentid:[],
scene_type:e.type||0,
mtitle:[],
detail_click:[],
app_btn_kv:0,
app_btn_click:0,
app_btn_type:0,
errorcode:[],
seek:[],
seek_position:[],
duration2:[],
play_duration2:[],
play_last_time:[],
local_time:[],
seek_loaded:[]
};
return i;
}
function c(){
var e={
videoerror:0,
like_kv_vid:"",
like_click_vid:"",
like_kv_alginfo:"",
like_click_alginfo:"",
tad:"",
page:0,
like_click_type:0,
iplat:2,
ptype:1,
rtype:"",
getvinfo_ret:-1,
getvinfo_time:0,
v_err_code:0,
loadwait:0,
hasended:0,
last_ms:0,
duration_ms:0,
app_btn_kv:0,
app_btn_click:0,
app_btn_type:0,
mid:"",
__biz:"",
idx:"",
detail_click:0,
vtitle:"",
vid:"",
commentid:"",
scene_type:0,
replay:0,
full_screen:0,
quick_play:0,
ad_play_time:-1,
video_play_time:-1,
click_play_button:0,
traceid:"",
webviewid:"",
orderid:0,
play_time:0,
client_time_when_play:Math.round(+new Date/1e3),
drag_times:"",
pause_num:0,
h5_profile:0,
to_article:0,
desc_more_click:0,
desc_more_show:0,
fromid:0,
openid:window.cgiData&&window.cgiData.txvideo_openid?window.cgiData.txvideo_openid:"",
file_size:0,
rate:0,
resolution:0,
format:"",
vt:"",
video_ext:"unknown",
content_url:parent.window.location.href,
auto_play:0,
ori_status:3
};
return e;
}
function l(e,i,t){
var o=0,n=[],a={};
if(i&&"[object String]"==Object.prototype.toString.call(i))o=1,"img"==t&&(i=encodeURIComponent(i)),
n.push("log0="+i),a.log0=i;else if(i&&"[object Array]"==Object.prototype.toString.call(i)){
o=i.length;
for(var d=0;o>d;d++){
var r="img"==t?encodeURIComponent(i[d]):i[d];
n.push("log"+d+"="+r),a["log"+d]=r;
}
}
if("img"==t){
var p=new Image,c="//mp.weixin.qq.com/mp/jsmonitor?idkey="+e;
o>0&&(c+="&lc="+o+"&"+n.join("&")),c+="&t="+Math.random(),p.src=c;
}else{
var l={};
o>0&&(l=a),l.idkey=e,l.lc=o,s({
type:"POST",
url:"//mp.weixin.qq.com/mp/jsmonitor?",
timeout:1e4,
data:l,
dataType:"json"
});
}
}
var s=e("biz_wap/utils/ajax.js"),_=e("pages/version4video.js");
return{
report:i,
videoreport:t,
getPlatformType:d,
getsdtfrom:r,
getinfoReport:n,
qqvideo_common_report:a,
musicreport:o,
getMusicReportData:p,
getVideoReportData:c,
logReport:l
};
});define("pages/player_adaptor.js",["pages/music_player.js","biz_common/utils/monitor.js","pages/loadscript.js","pages/music_report_conf.js"],function(t){
"use strict";
function i(t,i){
0!=t.type&&1!=t.type||!p.inQMClient?"function"==typeof i.callback&&i.callback(new a.init(t)):(p.initPlayerQueue.push(n("QMClient",t,i)),
e("QMClient"));
}
function n(t,i,n){
var e=p.config[t].func;
return function(t,i,n,e){
return function(){
"function"==typeof window[i]?"function"==typeof e.callback&&e.callback(new r(n,{
type:t
})):"function"==typeof e.callback&&e.callback(new a.init(n));
};
}(t,e,i,n);
}
function e(t){
var i=p.config[t];
if(1!=i.jsLoadState){
if(2==i.jsLoadState||3==i.jsLoadState)return void s();
i.jsLoadState=1;
var n=+new Date,e=l[t+"_js_num"];
e&&(e=e.split("_"),c.setSum(e[0],e[1],1),c.send()),u({
url:i.jsLink,
timeout:1e4,
type:"JS",
callback:function(){
+new Date-n;
2==i.jsLoadState,s();
var e=l[t+"_js_suc"];
e&&(e=e.split("_"),c.setSum(e[0],e[1],1),c.send());
},
onerror:function(e){
+new Date-n;
i.jsLoadState=3,s();
var o=l[t+"_js_err"],r=l[t+"_js_timeout"],a=l[t+"_js_network"];
if(o&&r&&a){
switch(o=o.split("_"),r=r.split("_"),a=a.split("_"),c.setSum(o[0],o[1],1),1*e){
case 400:
c.setSum(a[0],a[1],1);
break;

case 500:
c.setSum(r[0],r[1],1);
}
c.send();
}
}
});
}
}
function s(){
for(var t=0,i=p.initPlayerQueue.length;i>t;t++)"function"==typeof p.initPlayerQueue[t]&&p.initPlayerQueue[t]();
p.initPlayerQueue=[];
}
function o(){
for(var t in p.config)"function"==typeof p[t+"EvInit"]&&p[t+"EvInit"]();
}
function r(t,i){
if(this.opt=t,this.opt2=i,this._g={
_blockPlugin:{},
playType:"-1"
},"QMClient"==i.type&&p.inQMClient){
var n=p.config[i.type];
n.playerObj||(p.config[i.type].playerObj=new window[n.func]),this._g.playType=i.type,
this.player=n.playerObj,this._initPlugins(),this._bindQMEvent();
}
}
var a=t("pages/music_player.js"),c=t("biz_common/utils/monitor.js"),u=t("pages/loadscript.js"),l=t("pages/music_report_conf.js"),p={
debug:location.href.indexOf("_qqclient=1")>0?!0:!1,
config:{
QMClient:{
func:"Player",
playerObj:null,
jsLink:"https://imgcache.qq.com/music/h5/player/player.js?max_age=604800&v=1",
jsLoadState:-1
}
},
inQMClient:!1,
initPlayerQueue:[]
};
return p.QMClientEvInit=function(){
if(p.inQMClient=window.navigator.userAgent.indexOf("QQMusic/")>0||p.debug?!0:!1,
p.inQMClient&&window.msg_cdn_url&&window.msg_title){
var t=window.location.href,i=a.getQuery("scene",t);
i&&(t=t.replace("&scene="+i,"").replace("?scene="+i,"")),t=t.replace(/#rd$/,"").replace(/#wechat_redirect$/,""),
-1==t.indexOf("?")&&(t+="?"),t+="&scene=112#wechat_redirect";
var n=function(t){
window.WebViewJavascriptBridge?t():document.addEventListener("WebViewJavascriptBridgeReady",t);
},e=(window.msg_title||"").html(!1),s=(window.msg_desc||"").html(!1);
n(function(){
M.client.invoke("ui","setActionBtn",{
type:"icon",
content:"share"
},function(){
M.client.invoke("other","callShareWeb",{
imgUrl:window.msg_cdn_url,
link:t,
title:e,
desc:s
});
});
});
}
},o(),r.prototype={
_initPlugins:function(){
this.opt.plugins||(this.opt.plugins=[]);
for(var t=this.opt.plugins,i=0,n=t.length;n>i;++i){
var e=t[i];
e.setPlayer(this),!!e.init&&e.init();
}
},
_trigger:function(t,i){
var n=this.opt,e=this._g,s=n.plugins,o=e._blockPlugin[t]||e._blockPlugin.all,r=0;
if(o&&"function"==typeof o.recv&&(r|=o.recv(t,i),1&r))return!1;
for(var a=0,c=s.length;c>a&&(r|=s[a].recv(t,i),!(2&r));++a);
if(!(4&r)){
var u=this["__"+t+"Handler"];
u&&u.call(this,i);
}
8&r||this.__triggerOutside(t,i);
},
__triggerOutside:function(){
var t=arguments,i=t[0];
if(i){
i=i.substr(0,1).toUpperCase()+i.substr(1);
var n=this.opt["on"+i];
"function"==typeof n&&n.apply(this,t);
}
},
_setBlockPlugin:function(t,i){
this._g._blockPlugin[t]=i;
},
_bindQMEvent:function(){
var t=this;
this.player.on("play",function(i){
i&&i.song&&i.song.mid==t.opt.mid?(t._trigger("statusChange",1),t._trigger("QMClientPlay")):t._trigger("statusChange",3);
}),this.player.on("pause",function(i){
i&&i.song&&i.song.mid==t.opt.mid&&t._trigger("statusChange",2);
}),this.player.on("stop",function(i){
i&&i.song&&i.song.mid==t.opt.mid&&t._trigger("statusChange",3);
});
},
play:function(){
"QMClient"==this._g.playType&&this.player.play(this.opt.mid);
},
pause:function(){
this.player.pause();
},
stop:function(){
this.player.stop();
},
getDuration:function(){
return this.opt.duration?this.opt.duration:"QMClient"==this._g.playType?this.player.duration||0:0;
},
getCurTime:function(){
return"QMClient"==this._g.playType?this.player.currentTime||0:0;
},
surportSeekRange:function(){
return!1;
},
getSrc:function(){
return"";
},
destory:function(){},
seek:function(){},
setDuration:function(){},
setSrc:function(){}
},{
create:i,
inQMClient:p.inQMClient
};
});define("pages/music_player.js",["biz_wap/utils/mmversion.js","pages/report.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","pages/version4video.js","biz_common/utils/monitor.js","appmsg/log.js"],function(t){
"use strict";
function e(){
b.hasInit||(b.hasInit=!0,p(),d(),u());
}
function o(t){
e(),this._o={
plugins:[],
protocal:"",
wxIndex:0,
type:0,
src:"",
jsapi2Src:"",
mid:"",
autoPlay:!1,
duration:0,
needVioceMutex:!0,
title:"",
allowPause:!1,
singer:"",
epname:"",
coverImgUrl:"",
webUrl:"",
musicbar_url:"",
fileSize:0,
onStatusChange:function(){},
onTimeupdate:function(){},
onError:function(){},
onUpdateSeekRange:function(){}
},this._extend(t),this._status=-1,this._g={
mutexKey:"",
jsapiSrcId:"",
hasCheckPlay:!1,
playTimeoutId:null,
stateChangeCallback:{},
_blockPlugin:{},
hasInitH5Event:!1,
h5Event:{},
totalPlayTime:0
},this._initPlugins(),this._fixAndroidSizeLimit(),0!==b.surportType&&(this._initData(),
this._synPlayStatus());
}
function i(t){
S.invoke("musicPlay",{
app_id:"a",
title:"微信公众平台",
singer:"微信公众平台",
epname:"微信公众平台",
coverImgUrl:"http://res.wx.qq.com/mpres/htmledition/images/favicon.ico",
dataUrl:b.ev,
lowbandUrl:b.ev,
webUrl:"http://mp.weixin.qq.com/s?"
},function(e){
"function"==typeof t&&t(e);
});
}
function a(t){
n({
cur:t,
stopCur:!1
});
}
function n(t){
function e(){
if(b.mutexCount==s&&(s=0,b.mutexCount=0,"function"==typeof a)){
var t=0;
1==b.surportType?t=2e3:3==b.surportType&&(t=0),setTimeout(function(){
a();
},t);
}
}
if(0!=b.mutexCount)return void setTimeout(function(){
n(t);
},200);
var o=t.cur,i=t.stopCur===!0?!0:!1,a=t.callback,s=0;
for(var r in b.mutexPlayers)for(var u=0,p=b.mutexPlayers[r].length;p>u;u++)s++;
for(var r in b.mutexPlayers)for(var u=0,p=b.mutexPlayers[r].length;p>u;u++){
var l=b.mutexPlayers[r][u];
if(l&&l!==o){
var c=l.getSurportType(),d="";
2!=c||1!=l._status&&4!=l._status?1!=c&&3!=c||1!=l._status&&2!=l._status&&4!=l._status||(d="stop"):d=l._o.allowPause?"pause":"stop",
d&&"function"==typeof l[d]?l[d](i,function(){
b.mutexCount++,e();
}):(b.mutexCount++,e());
}else b.mutexCount++,e();
}
}
function s(){
return b.surportType;
}
function r(t){
return new o(t);
}
function u(){
b.surportType>0&&b.isAndroidLow&&window.addEventListener("canplay",function(t){
t.target&&"function"==typeof t.target.play&&t.target.play();
},!0);
}
function p(){
b.jsapiGlobalEvent={
error:_,
pause:y,
stop:h,
play:g,
preempted:h,
waiting:f
};
}
function l(t){
return"&"+b.wxtag+"="+t;
}
function c(t,e){
e=e||"info";
var o="[musicplay]"+t+"[location:"+location.href+"]";
A(o,e);
}
function d(){
S.on("onBackgroundAudioStateChange",function(t){
if(!!b.debug&&console.log("onBackgroundAudioStateChange log:"+JSON.stringify(t||{})),
t.src&&t.state){
var e=P(b.wxtag,t.src)||"";
e&&(e=l(e));
var o=b.mutexPlayers[t.src]||b.mutexPlayers2[t.src]||b.mutexPlayers[e];
if(o){
var i;
if(t.srcId)for(var a=0,n=o.length;n>a;a++)o[a]._g.jsapiSrcId==t.srcId&&(i=o[a]);else if(1==o.length)i=o[0];else for(var a=0,n=o.length;n>a;a++)if(-1!=o[a]._status&&0!=o[a]._status&&3!=o[a]._status){
i=o[a];
break;
}
if(i&&i._g.stateChangeCallback){
var s=t.state;
"ended"==s&&(s="stop"),"wait"==s&&(s="waiting");
var r=!1,u=JSON.stringify(t||{});
if("error"==s){
i.jsapiLog("onBackgroundAudioStateChange error;res:"+u);
for(var p in i._g.stateChangeCallback)i._g.stateChangeCallback.hasOwnProperty(p)&&"function"==typeof i._g.stateChangeCallback[p]&&(r=!0,
i._g.stateChangeCallback[p](-1,t.errMsg||""),i._g.stateChangeCallback[p]=null);
}else"function"==typeof i._g.stateChangeCallback[s]&&(b.debug&&console.log("excute stateChangeCallback :"+s),
i.jsapiLog("onBackgroundAudioStateChange "+s+";res:"+u),r=!0,i._g.stateChangeCallback[s](0),
i._g.stateChangeCallback[s]=null);
r||"function"!=typeof b.jsapiGlobalEvent[s]||(i.jsapiLog("onBackgroundAudioStateChange "+s+" unHandle;res:"+u),
b.jsapiGlobalEvent[s](t,i));
}
}
}
});
}
function _(t,e){
e.stop(!1),e._trigger("jsapi2PlayingErr");
}
function h(t,e){
e.stop(!1),e._trigger("jsapi2PlayingStop");
}
function y(t,e){
e.pause(!1,null,!0),e._trigger("jsapi2PlayingPause");
}
function g(t,e){
1!=e._status&&e.resume(!1,null,!0);
}
function f(t,e){
e.onload();
}
function m(){
for(var t in b.mutexPlayers)if(b.mutexPlayers.hasOwnProperty(t))for(var e=0,o=b.mutexPlayers[t].length;o>e;e++){
var i=b.mutexPlayers[t][e];
if(i&&1==i._status&&(1==i._surportType||3==i._surportType)){
i._trigger("unloadPlaying");
break;
}
}
}
function P(t){
var e=arguments[1]||window.location.search,o=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),i=e.substr(e.indexOf("?")+1).match(o);
return null!=i?i[2]:"";
}
function T(t,e,o){
function i(t,e){
for(;b.synPlayStatusArr.length>0;){
var o=b.synPlayStatusArr.shift();
o&&"function"==typeof o[t]&&o[t](e);
}
}
b.synPlayStatusArr.push({
_t:t,
onSuccess:e,
onError:o
}),b.synPlayStatusId&&clearTimeout(b.synPlayStatusId),b.synPlayStatusId=setTimeout(function(){
t._jsapi_getMusicPlayerState({
onSuccess:function(t){
i("onSuccess",t);
},
onError:function(t){
i("onError",t);
}
});
},0);
}
var v=t("biz_wap/utils/mmversion.js"),S=(t("pages/report.js"),t("biz_common/dom/event.js"),
t("biz_wap/jsapi/core.js")),k=t("pages/version4video.js"),A=(t("biz_common/utils/monitor.js"),
t("appmsg/log.js")),b={
hasInit:!1,
synPlayStatusId:null,
synPlayStatusArr:[],
inWechat:!k.device.inWechat||k.device.inWindowWechat||k.device.inMacWechat?!1:!0,
mutexCount:0,
ev:0!=window._empty_v.indexOf(window.location.protocol)?"http:"+window._empty_v:window._empty_v,
debug:location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1?!0:!1,
_playtype:1*P("_playtype")||0,
isAndroidLow:/android\s2\.3/i.test(navigator.userAgent),
isAndroid:v.isAndroid,
surportType:"addEventListener"in window?2:0,
mutexPlayers:{},
mutexPlayers2:{},
wxtag:"__wxtag__"
};
return o.prototype._initPlugins=function(){
for(var t=this._o.plugins,e=0,o=t.length;o>e;++e){
var i=t[e];
i.setPlayer(this),!!i.init&&i.init();
}
},o.prototype._trigger=function(t,e){
var o=this._o,i=this._g,a=o.plugins,n=i._blockPlugin[t]||i._blockPlugin.all,s=0;
if(n&&"function"==typeof n.recv&&(s|=n.recv(t,e),1&s))return!1;
for(var r=0,u=a.length;u>r&&(s|=a[r].recv(t,e),!(2&s));++r);
if(!(4&s)){
var p=this["__"+t+"Handler"];
p&&p.call(this,e);
}
8&s||this.__triggerOutside(t,e);
},o.prototype.__triggerOutside=function(){
var t=arguments,e=t[0];
if(e){
e=e.substr(0,1).toUpperCase()+e.substr(1);
var o=this._o["on"+e];
"function"==typeof o&&o.apply(this,t);
}
},o.prototype._setBlockPlugin=function(t,e){
this._g._blockPlugin[t]=e;
},o.prototype._synPlayStatus=function(){
function t(t){
if(n&&clearTimeout(n),a.hasCheckPlay===!0)return void console.log("ios8 synPlayStatusSuccess hasCheckPlay");
if(a.hasCheckPlay=!0,o._surportType=3,b.surportType=3,!!b.debug&&console.log("_synPlayStatus mutexKey:"+a.mutexKey),
t.src&&(i.src==t.src||t.src.indexOf(a.mutexKey)>=0)){
if(t.srcId){
if(t.srcId!=a.jsapiSrcId)return;
}else if(b.mutexPlayers[a.mutexKey].length>1&&b.mutexPlayers[a.mutexKey][0]!==o)return;
o._initJsapiData({
curTime:t.currentTime,
bufferedPercent:t.bufferedPercent,
starTime:+new Date-1e3*t.currentTime
}),o._trigger("jsapi2Begin2Play",t);
var e=o.jsApiData,s="waiting"==t.playState||"seeked"==t.playState||"seeking"==t.playState||"play"==t.playState;
!t.paused||s?(o._onPlay(),o._analogUpdateTime()):(o._onTimeupdate(null,e.curTime),
o._onPause()),o._getMusicPlayerState();
}
}
function e(){
console.log("ios8 synPlayStatusError"),n&&clearTimeout(n),a.hasCheckPlay!==!0&&(a.hasCheckPlay=!0,
o._o.autoPlay&&o.play());
}
var o=this,i=this._o,a=this._g;
if(!b.inWechat||1*b._playtype>0)return a.hasCheckPlay=!0,void(o._o.autoPlay&&o.play());
var n;
T(o,t,e);
var s=+new Date;
console.log("starTime",s,i.syncTimeout),n=setTimeout(function(){
console.log("ios8 timeout error",+new Date-s),e();
},i.syncTimeout||1e4);
},o.prototype._fixAndroidSizeLimit=function(){
if(!(1*b._playtype>0)&&b.isAndroid){
var t=this._o;
!t.fileSize||t.fileSize>300||v.gtVersion("6.3.28",!0)||(this._trigger("androidForceH5"),
this._g._playtype=2);
}
},o.prototype._createAutoAndPlay=function(){
function t(){
e._trigger("h5Begin2Play"),e._h5Audio=document.createElement("audio"),e._initH5Data(!0),
e._H5bindEvent(!0),e._h5Audio.setAttribute("style","height:0;width:0;display:none"),
e._h5Audio.setAttribute("autoplay",""),e._status=0,e._onLoading(),b.isAndroidLow?(e._h5Audio.src=e._o.src,
document.body.appendChild(e._h5Audio),e._h5Audio.load()):(document.body.appendChild(e._h5Audio),
setTimeout(function(){
e._h5Audio.src=e._o.src,e._h5Audio.play();
},0)),e._surportType=2;
}
var e=this;
b.inWechat?this._stopJsapiPlay(!0,function(){
t();
}):t();
},o.prototype._destoryH5Audio=function(){
this._h5Audio&&(-1!=this._status&&"function"==typeof this._h5Audio.pause&&this._h5Audio.pause(),
document.body.removeChild(this._h5Audio),this._h5Audio=null,this._status=-1);
},o.prototype._onLoading=function(t){
this._status=4;
try{
a(this);
}catch(t){}
"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime();
},o.prototype._onPlay=function(t){
this._status=1;
try{
a(this);
}catch(t){}
"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._startCountTime();
},o.prototype._onPause=function(t){
this._status=2,"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime();
},o.prototype._onEnd=function(t){
this._status=3,"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime();
},o.prototype._onLoadedmetadata=function(t){
"function"==typeof this._o.onLoadedmetadata&&this._o.onLoadedmetadata.call(this,t||{});
},o.prototype._onUpdateSeekRange=function(t){
this.surportSeekRange()&&(t=Math.max(t,0),t=Math.min(t,100),"function"==typeof this._o.onUpdateSeekRange&&this._o.onUpdateSeekRange.call(this,t));
},o.prototype._onTimeupdate=function(t,e){
"function"==typeof this._o.onTimeupdate&&this._o.onTimeupdate.call(this,t||{},e),
e>0&&this._startCountTime();
},o.prototype._onError=function(t,e){
this._status=-1,"function"==typeof this._o.onError&&this._o.onError.call(this,t||{},e);
},o.prototype._initH5Event=function(){
var t=this,e=this._o,o=this._g;
if(!t._g.hasInitH5Event){
t._g.hasInitH5Event=!0;
var i=o.h5Event;
i.canplaythrough=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 canplaythrough"),t._h5Data.firstCanplaythrough=!0,
t._onPlay(e),t._onUpdateSeekRange(t._h5Data.downloadDuration||0));
},i.play=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 "+e.type),t._h5Data.firstCanplaythrough===!0&&(t._onPlay(e),
t._onUpdateSeekRange(t._h5Data.downloadDuration||0)));
},i.ended=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 ended"),t._onUpdateSeekRange(t._h5Data.downloadDuration),
t._onEnd(e));
},i.pause=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 pause"),t._o.allowPause!==!0||0==t._h5Audio.currentTime?t._onEnd(e):t._onPause(e));
},i.waiting=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 "+e.type),(1==t._status||2==t._status||4==t._status)&&t._onLoading(e));
};
var a,n=100;
i.seeking=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 "+e.type),(1==t._status||2==t._status||4==t._status)&&t._onLoading(e),
a=setTimeout(function(){
!!b.debug&&console.log("seek loading Timeout excute"),a=null,t._trigger("seekNeed2Load");
},n));
},i.seeked=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 seeked"),(1==t._status||2==t._status||4==t._status)&&(t._onPlay(e),
t._h5Audio.play()),a&&(clearTimeout(a),a=null,t._trigger("seekNotNeed2Load")));
},i.error=function(e){
var o=1*e.target.error.code||5;
(1>o||o>5)&&(o=5),t._trigger("h5Error",{
code:o
}),t._onError(e,{
type:1,
code:o
}),t._destoryH5Audio();
},i.timeupdate=function(o){
t._h5Audio&&((1==t._status||4==t._status)&&t._onUpdateSeekRange(t._getH5DownloadDuration()),
1==t._status&&t._onTimeupdate(o,t._h5Audio.currentTime),"undefined"!=typeof e.duration&&1*e.duration>0&&t._h5Audio.currentTime>=e.duration&&t._h5Stop());
},i.loadedmetadata=function(e){
t._h5Audio&&t._onLoadedmetadata(e);
};
}
},o.prototype._H5bindEvent=function(t){
var e=(this._o,this._g),o={
canplaythrough:"canplaythrough",
play:"play",
playing:"play",
ended:"ended",
pause:"pause",
seeking:"seeking",
waiting:"waiting",
seeked:"seeked",
error:"error"
};
try{
for(var i in o)o.hasOwnProperty(i)&&this._h5Audio.removeEventListener(i,e.h5Event[o[i]]);
this._h5Audio.removeEventListener("timeupdate",e.h5Event.timeupdate),this._h5Audio.removeEventListener("loadedmetadata",e.h5Event.loadedmetadata);
}catch(a){}
if(t){
for(var i in o)o.hasOwnProperty(i)&&this._h5Audio.addEventListener(i,e.h5Event[o[i]],!1);
"function"==typeof this._o.onTimeupdate&&this._h5Audio.addEventListener("timeupdate",e.h5Event.timeupdate,!1),
"function"==typeof this._o.onLoadedmetadata&&this._h5Audio.addEventListener("loadedmetadata",e.h5Event.loadedmetadata,!1);
}
},o.prototype._initData=function(){
var t=this._o;
this._createMutexKey(),b.mutexPlayers[this._g.mutexKey]?b.mutexPlayers[this._g.mutexKey].push(this):b.mutexPlayers[this._g.mutexKey]=[this],
t.jsapi2Src&&t.jsapi2Src!=t.src&&(b.mutexPlayers2[t.jsapi2Src]?b.mutexPlayers2[t.jsapi2Src].push(this):b.mutexPlayers2[t.jsapi2Src]=[this]),
this._initH5Event();
},o.prototype._createMutexKey=function(){
var t=this._o.mid||"";
this._o.src?(this._g.mutexKey=this._o.src,this._g.jsapiSrcId=b.wxtag+"_"+this._o.wxIndex):(this._g.mutexKey=l(t),
this._g.jsapiSrcId=this._g.mutexKey+"_"+this._o.wxIndex);
},o.prototype._extend=function(t){
for(var e in t)this._o[e]=t[e];
},o.prototype._initH5Data=function(t){
this._h5Data={
firstCanplaythrough:t===!0?!1:!0,
downloadDuration:0,
lastPlaytime:null
};
},o.prototype._initJsapiData=function(t){
t=t||{},this.jsApiData&&(this.jsApiData.updateTimeoutId&&clearTimeout(this.jsApiData.updateTimeoutId),
this.jsApiData.getStatusId&&clearTimeout(this.jsApiData.getStatusId)),this.jsApiData={
getStatusId:null,
getStatusTime:t.getStatusTime||2500,
updateTimeoutId:null,
seeking:!1,
starTime:t.starTime||+new Date,
curTime:t.curTime||0,
bufferedPercent:t.bufferedPercent||0,
duration:this._o.duration||void 0,
lastPlaytime:null
};
},o.prototype._getMusicPlayerState=function(){
var t=this,e=t._o,o=t.jsApiData;
o&&o.getStatusId&&clearTimeout(o.getStatusId),t._jsapi_getMusicPlayerState({
onSuccess:function(i){
i.src==e.src&&(o.curTime=i.currentTime,o.starTime=+new Date-1e3*i.currentTime,o.bufferedPercent=i.bufferedPercent,
(1==t._status||2==t._status)&&(o.getStatusId=setTimeout(function(){
t._getMusicPlayerState();
},o.getStatusTime)),t._onUpdateSeekRange(o.bufferedPercent),1==i.paused&&1==t._status?(b.debug&&console.log("_getMusicPlayerState force syn"),
t._pauseJsapiPlay(!1)):0==i.paused&&2==t._status&&(b.debug&&console.log("_getMusicPlayerState force syn"),
t._resumeJsapiPlay(!1))),t._o.onMusicPlayerInfo&&t._o.onMusicPlayerInfo(i);
},
onError:function(){
o.getStatusId=setTimeout(function(){
t._getMusicPlayerState();
},o.getStatusTime);
}
});
},o.prototype._analogUpdateTime=function(){
var t=this,e=t.jsApiData;
if(e){
if(e.updateTimeoutId&&clearTimeout(e.updateTimeoutId),1==t._status){
if(e.curTime=1*((+new Date-e.starTime)/1e3).toFixed(2),e.curTime>=e.duration)return t._stopJsapiPlay(!1),
!0;
t._onTimeupdate(null,e.curTime);
}
return e.updateTimeoutId=setTimeout(function(){
t._analogUpdateTime();
},1e3),!1;
}
},o.prototype._jsapi_getMusicPlayerState=function(t){
var e=this._o;
S.invoke("getBackgroundAudioState",{},function(o){
if(!!b.debug&&console.log("getBackgroundAudioState log:"+JSON.stringify(o||{})),
/:ok$/.test(o.err_msg)){
if(o.paused=1*o.paused,o.currentTime=o.currentTime?(1*o.currentTime).toFixed(2):0,
o.buffered){
var i=Math.floor(o.buffered/e.duration*100);
i=Math.max(i,0),i=Math.min(i,100),o.bufferedPercent=i;
}else o.bufferedPercent=0;
"function"==typeof t.onSuccess&&t.onSuccess(o);
}else"function"==typeof t.onError&&(console.log("get err invoke err",o),t.onError(o));
});
},o.prototype._jsapi_musicPlay=function(t){
if(this._h5Audio&&this._destoryH5Audio(),2==b._playtype)return void("function"==typeof t.onError&&t.onError({}));
var e=this,o=this._o;
this.jsapiLog("jsapi_musicPlay"),S.invoke("musicPlay",{
app_id:"a",
title:o.title,
singer:o.singer,
epname:o.epname,
coverImgUrl:o.coverImgUrl,
dataUrl:o.src,
lowbandUrl:o.src,
webUrl:o.webUrl
},function(i){
!!b.debug&&console.log("playlog:"+JSON.stringify(i||{})),i.err_msg.indexOf("ok")>=0?(e._trigger("jsapi1Begin2Play"),
e._surportType=1,b.surportType=1,e._initJsapiData(),e._onPlay(),"undefined"!=typeof o.duration&&1*o.duration>0&&e._analogUpdateTime(),
e._onUpdateSeekRange(0),"function"==typeof t.onSuccess&&t.onSuccess(i)):"function"==typeof t.onError&&t.onError(i);
});
},o.prototype._jsapi_setBackgroundAudioState=function(t){
if(this._h5Audio&&this._destoryH5Audio(),console.log("_playtype",b._playtype),1*b._playtype>0){
if("function"==typeof t.onError){
var e={};
e.err_code=1,t.onError(e);
}
}else{
var o=this,i=this._o,a=o._g;
console.log("invoke set setBackgroundAudioState with param",i),this.jsapiLog("jsapi_setBackgroundAudioState"),
S.invoke("setBackgroundAudioState",{
protocol:i.protocal||"",
src:i.jsapi2Src||i.src,
lowbandUrl:i.jsapi2Src||i.src,
title:i.title,
epname:i.epname,
singer:i.singer,
srcId:a.jsapiSrcId,
coverImgUrl:i.coverImgUrl,
webUrl:i.webUrl,
musicbar_url:i.musicbar_url||""
},function(e){
!!b.debug&&console.log("setBackgroundAudioState log:"+JSON.stringify(e||{})),e.err_msg.indexOf("ok")>=0?("function"==typeof t.onSuccess&&t.onSuccess("waiting"),
a.stateChangeCallback.play=function(e,o){
0==e&&"function"==typeof t.onSuccess?t.onSuccess("play"):0!=e&&"function"==typeof t.onError&&t.onError({
err_code:2,
err_msg:o||""
});
}):"function"==typeof t.onError&&(e=e||{},e.err_code=1,t.onError(e));
});
}
},o.prototype._jsapi_operateBackgroundAudio=function(t){
var e=this,o=(this._o,e._g),i=1*t.position||0;
this.jsapiLog("jsapi_operateBackgroundAudio;param:"+JSON.stringify(t||{})),S.invoke("operateBackgroundAudio",{
operationType:t.type,
currentTime:i
},function(e){
if(!!b.debug&&console.log("operateBackgroundAudio "+t.type+",position:"+i+", log:"+JSON.stringify(e||{})),
e.err_msg.indexOf("ok")>=0){
var a=t.type;
"seek"==a?(o.stateChangeCallback.seeking=function(e,o){
0==e&&"function"==typeof t.onSuccess?t.onSuccess("seeking",i):0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:o||""
});
},o.stateChangeCallback.seeked=function(e,o){
0==e&&"function"==typeof t.onSuccess?t.onSuccess("seeked",i):0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:o||""
});
}):o.stateChangeCallback[a]=function(e,o){
0==e&&"function"==typeof t.onSuccess?t.onSuccess():0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:o||""
});
};
}else"function"==typeof t.onError&&t.onError(e);
});
},o.prototype._jsapiPlay=function(){
{
var t=this;
this._o;
}
console.log("supporttype",b.surportType),1==b.surportType?this._jsapi_musicPlay({
onError:function(){
t._h5Play();
}
}):this._jsapi_setBackgroundAudioState({
onSuccess:function(e){
"waiting"===e?(t._trigger("jsapi2Begin2Play",e),t._initJsapiData(),t._surportType=3,
b.surportType=3,t._onLoading()):"play"===e&&(t._initJsapiData(),t._onPlay(),t._analogUpdateTime(),
t._getMusicPlayerState(),t._trigger("jsapi2PlaySuccess"));
},
onError:function(e){
e&&1==e.err_code?t._jsapi_musicPlay({
onError:function(){
t._h5Play();
}
}):(t._h5Play(),t._trigger("jsapi2Begin2PlayErr"));
}
});
},o.prototype._getJsapiDownloadSec=function(){
this._getMusicPlayerState();
var t=Math.floor(this._o.duration*this.jsApiData.bufferedPercent/100);
return!!b.debug&&console.log("downloadSec:"+t),t;
},o.prototype._jsapiSeek=function(t){
function e(){
a.seeking=!1,o._onPlay(),console.log("seek toPlay position is",b.seekingPosition),
a.starTime=+new Date-1e3*b.seekingPosition,o._analogUpdateTime(),o._getMusicPlayerState();
}
var o=this,i=this._g,a=(this._o,this.jsApiData),n=parseInt(t,10);
this._o.duration&&n>=this._o.duration&&(n=this._o.duration-1),a.getStatusId&&clearTimeout(a.getStatusId),
a.updateTimeoutId&&clearTimeout(a.updateTimeoutId),a.seekWaitId&&clearTimeout(a.seekWaitId),
a.seeking=!0;
var s,r,u=100;
b.seekingPosition=n,console.log("begin to seek to",n),this._jsapi_operateBackgroundAudio({
type:"seek",
position:n,
onError:function(){
o._trigger("seekErr"),!!b.debug&&console.log("seek callback fail"),a.seeking=!1,
o._analogUpdateTime(),o._getMusicPlayerState();
},
onSuccess:function(t,n){
console.log("jsapi seek res is ",t),"seeking"==t?(!!b.debug&&console.log("seeking callback success"),
a.seeking=!0,o._onLoading(),i.stateChangeCallback.play=function(){
!!b.debug&&console.log("seeked to play"),s&&clearTimeout(s),e(n);
},r=setTimeout(function(){
!!b.debug&&console.log("seek loading Timeout excute"),r=null,o._trigger("seekNeed2Load");
},u)):"seeked"==t&&(!!b.debug&&console.log("seeked callback success"),(2==o._status||4==o._status)&&v.cpVersion("6.6.0",-1)&&(s=setTimeout(function(){
!!b.debug&&console.log("setTimeout to play"),i.stateChangeCallback.play=null,o._resumeJsapiPlay(!0);
},1e3)),r&&(clearTimeout(r),r=null,o._trigger("seekNotNeed2Load")));
}
}),o._getMusicPlayerState();
},o.prototype._resumeJsapiPlay=function(t,e){
function o(t){
var e=i.jsApiData;
e.starTime=+new Date-1e3*e.curTime,i._onPlay(),i._analogUpdateTime(),i._getMusicPlayerState(),
"function"==typeof t&&t();
}
var i=this;
1==this._surportType?this._jsapiPlay():3==this._surportType&&(t?this._jsapi_operateBackgroundAudio({
type:"play",
onError:function(){
i._stopJsapiPlay(!1,function(){
i.play();
});
},
onSuccess:function(){
o(e);
}
}):o(e));
},o.prototype._pauseJsapiPlay=function(t,e,o){
function i(t){
var e=a.jsApiData;
a._analogUpdateTime(),a._getMusicPlayerState(),e&&e.updateTimeoutId&&clearTimeout(e.updateTimeoutId),
e.updateTimeoutId=null,t===!0&&e&&e.getStatusId&&clearTimeout(e.getStatusId),1==a._status&&a._onPause();
}
var a=this;
return 2==a._status?(i(e),void("function"==typeof o&&o())):void(1==this._surportType?this._stopJsapiPlay(t,o):3==this._surportType&&(t?this._jsapi_operateBackgroundAudio({
type:"pause",
onSuccess:function(){
i(e),"function"==typeof o&&o();
},
onError:function(){
a._stopJsapiPlay(!0,o);
}
}):(i(e),"function"==typeof o&&o())));
},o.prototype._stopJsapiPlay=function(t,e){
function o(t){
a._onTimeupdate(null,0),a._onUpdateSeekRange(0),a._onEnd(),a._initJsapiData(),"function"==typeof t&&t();
}
{
var a=this;
a.jsApiData;
}
t?1==a._surportType?i(function(){
o(e);
}):a._jsapi_operateBackgroundAudio({
type:"stop",
onSuccess:function(){
o(e);
},
onError:function(){
o(e);
}
}):o(e);
},o.prototype._getH5DownloadSec=function(){
var t=Math.floor(this._o.duration*this._getH5DownloadDuration()/100);
return!!b.debug&&console.log("h5 downloadSec:"+t),t;
},o.prototype._getH5DownloadDuration=function(){
if(!this._h5Audio)return 0;
if(this._h5Data.downloadDuration>=100)return 100;
var t=this._h5Audio.buffered,e=t.end(t.length-1);
return this._h5Data.downloadDuration=parseInt(e/this._o.duration*100,10),this._h5Data.downloadDuration;
},o.prototype._h5Play=function(){
0!==b.surportType&&(this.jsapiLog("h5Play"),this._h5Audio?(this._h5Audio.ended||this._h5Audio.paused)&&(this._trigger("h5Begin2Play"),
this._initH5Data(),this._onLoading(),this._H5bindEvent(!0),this._h5Audio.currentTime=0):this._createAutoAndPlay());
},o.prototype._h5Resume=function(){
this._h5Audio&&this._h5Audio.play();
},o.prototype._h5Stop=function(){
this._h5Audio&&(this._onUpdateSeekRange(0),this._onEnd(),this._H5bindEvent(!1),this._h5Audio.pause(),
this._h5Audio.currentTime=0,this._initH5Data());
},o.prototype._h5Seek=function(t){
if(this._h5Audio){
var e=(this._h5Data,parseInt(t,10));
e=Math.min(e,this._o.duration),!!b.debug&&console.log("h5 seek position:"+e),this._h5Audio.currentTime=e;
}
},o.prototype._startCountTime=function(){
1!=this._surportType&&3!=this._surportType||!this.jsApiData?this._h5Audio&&this._h5Data&&null===this._h5Data.lastPlaytime&&(this._h5Data.lastPlaytime=this._h5Audio.currentTime):null===this.jsApiData.lastPlaytime&&(this.jsApiData.lastPlaytime=this.jsApiData.curTime);
},o.prototype._endCountTime=function(){
if(1!=this._surportType&&3!=this._surportType||!this.jsApiData){
if(this._h5Audio&&this._h5Data){
var t=this._h5Audio,e=this._h5Data;
t.currentTime>0&&t.currentTime>e.lastPlaytime&&null!==e.lastPlaytime&&(this._g.totalPlayTime+=t.currentTime-e.lastPlaytime),
e.lastPlaytime=null;
}
}else{
var o=this.jsApiData;
o.curTime>0&&o.curTime>o.lastPlaytime&&null!==o.lastPlaytime&&(this._g.totalPlayTime+=o.curTime-o.lastPlaytime),
o.lastPlaytime=null;
}
},o.prototype._delMutexPlayers=function(){
var t=this._o,e=this._g.mutexKey,o=b.mutexPlayers[e];
if(o){
for(var i=0,a=o.length;a>i;i++)if(o[i]===this){
o.splice(i,1);
break;
}
if(0==o.length)try{
delete b.mutexPlayers[e];
}catch(n){}
}
if(t.jsapi2Src&&b.mutexPlayers2[t.jsapi2Src]){
for(var s=b.mutexPlayers2[t.jsapi2Src],i=0,a=s.length;a>i;i++)if(s[i]===this){
s.splice(i,1);
break;
}
if(0==s.length)try{
delete b.mutexPlayers2[t.jsapi2Src];
}catch(n){}
}
},o.prototype.resetPlayTotalTime=function(){
this._g.totalPlayTime=0;
},o.prototype.getPlayTotalTime=function(){
return this._endCountTime(),this._g.totalPlayTime;
},o.prototype.surportSeekRange=function(){
return 1==b._playtype?!1:2==this._surportType||3==this._surportType?!0:!1;
},o.prototype.setSrc=function(t){
-1==t.indexOf("?")&&(t+="?"),t+=l(this._o.mid),this._o.src=t,this._delMutexPlayers(),
this._g.mutexKey=this._o.src,b.mutexPlayers[this._g.mutexKey]?b.mutexPlayers[this._g.mutexKey].push(this):b.mutexPlayers[this._g.mutexKey]=[this];
},o.prototype.getSrc=function(){
return this._o.src||"";
},o.prototype.setDuration=function(t){
this._o.duration=t||0;
},o.prototype.getSurportType=function(){
return this._surportType||0;
},o.prototype.getPlayStatus=function(){
return this._status;
},o.prototype.getCurTime=function(){
return 1!=this._surportType&&3!=this._surportType||!this.jsApiData?this._h5Audio?this._h5Audio.currentTime:0:this.jsApiData.curTime||0;
},o.prototype.getDuration=function(){
return this._o.duration||void 0;
},o.prototype.pause=function(t,e,o){
return o===!0||this._o.allowPause?void(1==this._surportType||3==this._surportType?this._pauseJsapiPlay(t===!1?!1:!0,!1,function(){
"function"==typeof e&&e();
},function(){
"function"==typeof e&&e();
}):2==this._surportType&&this._h5Audio&&"function"==typeof this._h5Audio.pause&&(this._h5Audio.pause(),
"function"==typeof e&&e())):void this.stop(t,e);
},o.prototype.stop=function(t,e){
return 1==this._surportType||3==this._surportType?void this._stopJsapiPlay(t===!1?!1:!0,e):(2==this._surportType&&this._h5Audio&&this._h5Stop(),
void("function"==typeof e&&e()));
},o.prototype.destory=function(){
this.stop(),this._h5Audio&&(document.body.removeChild(this._h5Audio),this._h5Audio=null),
this._delMutexPlayers();
},o.prototype.resume=function(t,e,o){
(o===!0||2==this._status&&this._o.allowPause)&&(2==this._surportType&&this._h5Audio?this._h5Resume():b.inWechat&&this._resumeJsapiPlay(t===!1?!1:!0));
},o.prototype.onload=function(){
this._onLoading();
},o.prototype.jsapiLog=function(t,e){
try{
var o=this._o,i={
type:o.type,
src:o.src,
mid:o.mid,
protocal:o.protocal,
webUrl:o.webUrl,
musicbar_url:o.musicbar_url
},a="["+JSON.stringify(i)+"]"+t;
c(a,e);
}catch(n){}
},o.prototype.play=function(){
var t=this,e=this._g;
if(t._o.src)return console.log("before play status is",t._status,e.hasCheckPlay),
2==t._status&&t._o.allowPause?void t.resume():(e.playTimeoutId&&clearTimeout(e.playTimeoutId),
e.hasCheckPlay?void(b.inWechat?(console.log("jsapi play"),this._jsapiPlay()):0!=b.surportType&&this._h5Play()):void(e.playTimeoutId=setTimeout(function(){
t.play();
},1e3)));
},o.prototype.seek=function(t){
{
var e=this;
this._g;
}
return 1!=e._status&&2!=e._status?void console.log("player status is",e._status):(console.log("support type is",this._surportType,t),
3==this._surportType?(this._endCountTime(),void this._jsapiSeek(t)):2==this._surportType&&this._h5Audio?(this._endCountTime(),
void this._h5Seek(t)):void 0);
},o.prototype.getBackgroundAudioState=function(t){
t||(t={}),S.invoke("getBackgroundAudioState",{},function(e){
/:ok$/.test(e.err_msg)?(e.paused=1*e.paused,t.success&&t.success(e)):t.error&&t.error(e);
});
},o.prototype.setOption=function(t){
this._extend(t),t.duration&&this.jsApiData&&(this.jsApiData.duration=t.duration);
},{
init:r,
triggerUnloadPlaying:m,
isAndroid:b.isAndroid,
getSurportType:s,
getQuery:P
};
});define("a/video.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/a_report.js","biz_common/utils/url/parse.js","new_video/player.js","biz_wap/utils/ajax.js","biz_wap/utils/device.js"],function(e){
"use strict";
function t(e,t){
d("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t);
}
function o(){
u({
url:" /mp/ad_video_report?action=video_play_report",
data:window.__video_report_data,
type:"POST"
});
}
function i(e,t,o){
var i;
return function(){
var n=this,r=arguments,d=function(){
i=null,o||e.apply(n,r);
},a=o&&!i;
clearTimeout(i),i=setTimeout(d,t),a&&e.apply(n,r);
};
}
function n(e){
var n=document.getElementById("js_video_container"),d=null,p=e.rl||"",u="";
if(p){
p=p.split("?"),p=p.length>1?p[1]:"";
var m=new RegExp("(^|&)viewid=([^&]*)(&|$)","i"),f=p.match(m);
f&&(u=unescape(f[2]));
}
window.__video_report_data={
aid:e.aid,
traceid:e.traceid,
user_uin:window.user_uin,
appmsg_id:mid,
item_idx:idx,
viewid:u,
__biz:biz,
report_type:0,
play_type:0,
play_duration:0,
video_duration:0,
auto_play:1
};
var v=null,y=!0,g=!1;
if(_.isAndroid&&_.gtVersion("6.6.6",!0)&&(g=!0),console.log(n),n){
console.log("player is begin"),d=new s({
container:n,
cover:e.video_info.thumbUrl,
width:n.offsetWidth,
height:n.offsetWidth*parseInt(e.video_info.displayHeight)/parseInt(e.video_info.displayWidth),
muted:y,
ad_muted_btn:y,
always_hide_loading:!0,
src:e.video_info.videoUrl,
pt:e.pt,
autoHide:!0,
blockTouchVideo:!0,
onError:function(o){
console.log("播放出错",o),t(129,e.report_param),n.innerHTML='<span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url('+e.video_info.thumbUrl+"); height:"+l.clientWidth/1.77+'px;"></span>',
window.__video_report_data.play_type=3;
},
onEnd:function(){
t(130,e.report_param),window.__video_report_data.play_type=1,window.__video_report_data.play_duration=window.__video_report_data.video_duration,
window.__video_report_data.report_type=2,d.replay(),o();
},
onTimeupdate:function(e,t){
2==window.__video_report_data.report_type&&(window.__video_report_data.report_type=3,
o()),window.__video_report_data.play_type=2,window.__video_report_data.play_duration=1e3*t.currentTime,
window.__video_report_data.video_duration=1e3*d.__getDuration(),w||(window.__video_report_data.report_type=3,
o(),w=1);
}
}),d._showPlayer(),d.setSrc(e.video_info.videoUrl,"auto");
var h=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,b=document.documentElement.clientHeight||window.innerHeight,j=i(function(){
if(3==window.__video_report_data.play_type)return void r.off(window,"scroll",j);
if(0!=window.__video_report_data.auto_play||0!=window.__video_report_data.play_type)if(h=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,
b=document.documentElement.clientHeight||window.innerHeight,d.isPlay()&&(l.offsetTop>h+b-l.offsetHeight/2||l.offsetTop+l.offsetHeight/2<h))d.pause();else if(!d.isPlay()&&c.canSupportAutoPlay&&("wifi"==window.networkType||"4g"==window.networkType)&&!(l.offsetTop>h+b+l.offsetHeight/2||l.offsetTop+l.offsetHeight<h-l.offsetHeight/2)){
if(_.isAndroid&&!g)return;
a.invoke("getBackgroundAudioState",{},function(o){
if(/:ok$/.test(o.err_msg)&&1*o.paused==0&&o.src);else{
if(window.no_vedio_ad&&1==window.no_vedio_ad&&"56"==window.ascene)return;
0==window.__video_report_data.play_type&&1==window.__video_report_data.auto_play?(t(131,e.report_param),
_.isIOS&&d.triggerMuted(y),d.__beginPlayHandler(),d._trigger("beginPlay")):d.play();
}
});
}
},500);
r.on(window,"scroll",j),j(),v=function(){
window.setTimeout(function(){
d.triggerMuted(y);
},1e3);
};
}
r.on(document.getElementById("js_video_container"),"tap",function(o){
if(o.target.className.indexOf("js_muted_btn")>-1)"true"==d.video.getAttribute("muted")?(d.triggerMuted(!1),
y=!1):(d.triggerMuted(!0),y=!0),t(132,e.report_param);else if(!d.isPlay())return d.__beginPlayHandler(),
d.triggerMuted(!0),t(133,e.report_param),void(window.__video_report_data.play_type=2);
}),r.on(window,"resize",function(){
setTimeout(function(){
var t=(l.clientWidth,n.offsetWidth),o=n.offsetWidth*parseInt(e.video_info.displayHeight)/parseInt(e.video_info.displayWidth);
d.setHeight(o),d.setWidth(t),l.style.width=t,l.style.height=o;
},0);
});
}
var r=e("biz_common/dom/event.js"),d=e("biz_common/utils/report.js"),a=e("biz_wap/jsapi/core.js"),_=e("biz_wap/utils/mmversion.js"),p=e("a/a_report.js"),s=(e("biz_common/utils/url/parse.js"),
e("new_video/player.js")),l=(p.AdClickReport,e("biz_common/utils/url/parse.js"),
document.getElementById("js_bottom_ad_area")),u=e("biz_wap/utils/ajax.js"),w=!1,c=e("biz_wap/utils/device.js");
return n;
});define("a/ios.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_wap/utils/openUrl.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function t(e){
"undefined"!=typeof WeixinJSBridge&&WeixinJSBridge.log&&WeixinJSBridge.log(e);
}
function i(e,t){
n("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function o(e){
var o=e.btn;
if(!o)return!1;
var n=e.adData,c=!1,d={};
e.report_param=e.report_param||"";
var s="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(n.appinfo_url)+"&ticket="+(e.ticket||window.ticket)+"#wechat_redirect";
r.on(o,"click",function(){
if(t("click @js_app_action"),c)return t("is_app_installed"),i(n.is_appmsg?17:13,e),
void p(n.app_id+"://");
var o=function(){
t("download"),i(n.is_appmsg?15:11,e),t("go : "+s),p(s);
};
return t("download"),n.rl&&n.traceid?d[n.traceid]||(d[n.traceid]=!0,a({
url:"/mp/advertisement_report?report_type=2&type="+n.type+"&url="+encodeURIComponent(n.appinfo_url)+"&ascene="+encodeURIComponent(window.ascene||-1)+"&tid="+n.traceid+"&rl="+encodeURIComponent(n.rl)+"&pt="+n.pt+e.report_param,
type:"GET",
timeout:1e3,
complete:function(){
t("ready to download"),d[n.traceid]=!1,o();
},
async:!0
})):o(),!1;
});
}
{
var r=e("biz_common/dom/event.js"),n=e("biz_common/utils/report.js"),a=e("biz_wap/utils/ajax.js"),p=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview;
e("biz_wap/jsapi/core.js");
}
return o;
});define("a/android.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/openUrl.js"],function(n,e,a,t){
"use strict";
function o(n){
"undefined"!=typeof s&&s.log&&s.log(n);
}
function i(n,e){
l("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+n+e.report_param);
}
function d(n){
function e(){
s.invoke("getInstallState",{
packageName:c.pkgname
},function(n){
var e=n.err_msg;
e.indexOf("get_install_state:yes")>-1&&(window.clearInterval(x),k=!0,d.innerHTML=T.installed);
});
}
function a(){
j&&s.invoke("queryDownloadTask",{
download_id:j
},function(e){
if(e&&e.state){
if("download_succ"==e.state){
o("download_succ"),i(c.is_appmsg?18:14,n),window.clearInterval(y),I=!1,b=!0,d.innerHTML=T.downloaded;
var a=document.createEvent("MouseEvents");
a.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),d.dispatchEvent(a);
}
if("downloading"==e.state)return;
("download_fail"==e.state||"default"==e.state)&&(o("fail, download_state : "+e.state),
window.clearInterval(y),I=!1,t("下载失败"),d.innerHTML=T.download);
}
});
}
var d=n.btn;
if(!d)return!1;
var l={},c=n.adData,p="",u="",_=c.androiddownurl;
if(_&&_.match){
var m=/&channelid\=([^&]*)/,w=_.match(m);
w&&w[1]&&(p="&channelid="+w[1],c.androiddownurl=_.replace(m,""));
}
n.via&&(u=["&via=ANDROIDWX.YYB.WX.ADVERTISE",n.via].join("."));
var f=!1,v="com.tencent.android.qqdownloader",g=1060125,k=!1,I=!1,b=!1,j=0,y=null,x=null,T={
download:"下载",
downloading:"下载中",
downloaded:"安装",
installed:"已安装"
};
d.innerHTML=T.download,s.ready(function(){
s.invoke("getInstallState",{
packageName:v
},function(n){
var e=n.err_msg;
o("getInstallState @yingyongbao : "+e);
var a=e.lastIndexOf("_")+1,t=e.substring(a);
1*t>=g&&e.indexOf("get_install_state:yes")>-1&&(f=!0);
}),s.invoke("getInstallState",{
packageName:c.pkgname
},function(n){
var e=n.err_msg;
o("getInstallState @"+c.pkgname+" : "+e);
var a=e.lastIndexOf("_")+1,t=e.substring(a);
1*t>=c.versioncode&&e.indexOf("get_install_state:yes")>-1&&(k=!0,d.innerHTML=T.installed);
}),d.addEventListener("click",function(){
if(o("click @js_app_action"),!I){
if(k)return!1;
if(b)return s.invoke("installDownloadTask",{
download_id:j,
file_md5:c.md5sum
},function(n){
var a=n.err_msg;
o("installDownloadTask : "+a),a.indexOf("install_download_task:ok")>-1?x=setInterval(e,1e3):t("安装失败！");
}),!1;
var _=function(){
return f?(i(c.is_appmsg?16:12,n),void(location.href="tmast://download?oplist=1,2&pname="+c.pkgname+p+u)):void s.invoke("addDownloadTask",{
task_name:c.appname,
task_url:c.androiddownurl,
extInfo:n.task_ext_info,
file_md5:c.md5sum
},function(e){
var l=e.err_msg;
o("addDownloadTask : "+l),l.indexOf("add_download_task:ok")>-1?(i(c.is_appmsg?15:11,n),
I=!0,j=e.download_id,o("download_id : "+j),d.innerHTML=T.downloading,y=setInterval(a,1e3)):t("调用下载器失败！");
});
};
return c.rl&&c.traceid?l[c.traceid]||(l[c.traceid]=!0,r({
url:"/mp/advertisement_report?report_type=2&type="+c.type+"&url="+encodeURIComponent(c.androiddownurl)+"&tid="+c.traceid+"&rl="+encodeURIComponent(c.rl)+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pt="+c.pt+"&r="+Math.random(),
type:"GET",
timeout:1e3,
complete:function(){
l[c.traceid]=!1,_();
},
async:!0
})):_(),!1;
}
});
});
}
{
var l=(n("biz_common/dom/event.js"),n("biz_common/utils/report.js")),r=n("biz_wap/utils/ajax.js"),s=n("biz_wap/jsapi/core.js");
n("biz_wap/utils/openUrl.js").openUrlWithExtraWebview;
}
return d;
});define("a/profile.js",["biz_common/dom/event.js","biz_common/utils/report.js","a/a_report.js","biz_wap/utils/ajax.js","biz_common/utils/url/parse.js","biz_wap/utils/position.js","biz_wap/utils/openUrl.js","biz_wap/jsapi/core.js","biz_common/utils/monitor.js"],function(e){
"use strict";
function t(e,t){
d("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function n(e,t){
if(t&&t.crt_exp_info)try{
var n=JSON.parse(t.crt_exp_info.html());
n.is_new_profile?b.invoke("profile",{
username:n.username
}):(console.log("exp to profile h5"),f(e));
}catch(i){
console.error("decode crt_exp_info error",t),f(e);
}else f(e);
return!1;
}
function i(e){
var i=e.adData,l=e.pos_type||0,f={},j=e.a_info;
e.report_param=e.report_param||"",function(){
function m(e){
{
var t=y.dataset;
"https:"==top.location.protocol?1500:1200;
}
if(t.rl&&t.url&&t.type&&t.tid){
var n=t.tid,o=t.type,a=t.url,s=t.rl;
if(!f[n]){
f[n]=!0;
var r,p,c,d,m=!!e&&e.target;
m&&(r=u.getX(m,"js_ad_link")+e.offsetX,p=u.getY(m,"js_ad_link")+e.offsetY,c=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
d=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
_({
type:o,
report_type:2,
click_pos:0,
url:encodeURIComponent(a),
tid:n,
rl:encodeURIComponent(s),
__biz:biz,
pos_type:l,
pt:i.pt,
pos_x:r,
pos_y:p,
ad_w:c||0,
ad_h:d||0
},function(){
f[n]=!1,v();
});
}
}else v();
}
var y=e.btnAddContact,w=e.btnViewProfile;
if(y&&y.dataset){
var k=function(o,a){
var s=o.err_msg,r=i.is_appmsg?6:1;
-1!=s.indexOf("ok")?(w.style.display="inline-block",y.style.display="none",r=i.is_appmsg?9:4):"add_contact:added"==s?r=i.is_appmsg?7:2:"add_contact:cancel"==s?r=i.is_appmsg?8:3:(--a,
a>=0?b.invoke("addContact",{
scene:scene,
webtype:"1",
username:i.usename
},function(e){
k(e,a);
}):(s="addContact:fail|msg:"+s+"|uin:"+uin+"|biz:"+biz,d("http://mp.weixin.qq.com/mp/jsreport?key=13&content="+s+"&r="+Math.random()),
n(i.url,j))),t(r,e);
},v=function(){
t(i.is_appmsg?10:5,e),g.setSum(110696,7,1),o?g.setSum(110696,10,1):(o=!0,a=+new Date),
s?+new Date-s<2e3&&(g.setSum(110696,11,1),setTimeout(function(){
s=0;
},2e3)):s=+new Date,r?+new Date-r<3e3&&(g.setSum(110696,12,1),setTimeout(function(){
r=0;
},3e3)):r=+new Date,p?+new Date-p<4e3&&(g.setSum(110696,13,1),setTimeout(function(){
p=0;
},4e3)):p=+new Date,b.invoke("addContact",{
scene:scene,
webtype:"1",
username:i.usename
},function(e){
var t=+new Date-a;
g.setAvg(110696,9,t).send(),o=!1,k(e,1);
});
};
c.on(y,"click",m);
}
}(),function(){
var t=e.btnViewProfile;
console.log("opt",e),t&&c.on(t,"click",function(){
console.log(e);
var t=e.btnAddContact.dataset,o={
source:4,
tid:t.tid,
idx:idx,
mid:mid,
appuin:biz,
pt:i.pt,
aid:e.aid,
ad_engine:e.ad_engine,
pos_type:l
},a=m.join(i.url,o);
return n(a,e.a_info),!1;
});
}(),function(){
var o=e.btnProfile;
if(o){
var a=function(o,s,r){
var p=o.err_msg,c=i.is_appmsg?6:1;
-1!=p.indexOf("ok")?(e.adData.biz_info.is_subscribed=1,console.log(r),r.innerHTML=r.innerHTML.replace("关注","查看"),
c=i.is_appmsg?9:4):"add_contact:added"==p?c=i.is_appmsg?7:2:"add_contact:cancel"==p?c=i.is_appmsg?8:3:(--s,
s>=0?b.invoke("addContact",{
scene:scene,
webtype:"1",
username:i.usename
},function(e){
a(e,s,r);
}):(p="addContact:fail|msg:"+p+"|uin:"+uin+"|biz:"+biz,d("http://mp.weixin.qq.com/mp/jsreport?key=13&content="+p+"&r="+Math.random()),
n(i.url,e.a_info))),t(c,e);
},s=function(n){
t(i.is_appmsg?10:5,e),b.invoke("addContact",{
scene:scene,
webtype:"1",
username:i.usename
},function(e){
a(e,1,n);
});
};
c.on(o,"click",function(t){
if(console.log("has_click",f,e.adData),e.adData.biz_info.is_subscribed){
var o=e.adData;
o.tid=o.traceid;
var a={
source:4,
tid:o.tid,
idx:idx,
mid:mid,
appuin:biz,
pt:i.pt,
aid:e.aid,
ad_engine:e.ad_engine,
pos_type:l
},r=m.join(i.url,a);
n(r,e.a_info);
}else{
{
var o=e.adData;
"https:"==top.location.protocol?1500:1200;
}
if(o.tid=o.traceid,o.rl&&o.url&&o.type&&o.tid){
var p=o.tid,c=o.type,r=o.url,d=o.rl;
if(!f[p]){
console.log("has_click[tid]",f[p]),f[p]=!0;
var b,g,j,y,w=!!t&&t.target;
w&&(b=u.getX(w,"js_ad_link")+t.offsetX,g=u.getY(w,"js_ad_link")+t.offsetY,j=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
y=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
_({
type:c,
report_type:2,
click_pos:0,
url:encodeURIComponent(r),
tid:p,
rl:encodeURIComponent(d),
__biz:biz,
pos_type:l,
pt:i.pt,
pos_x:b,
pos_y:g,
ad_w:j||0,
ad_h:y||0
},function(){
f[p]=!1,s(w);
});
}
}else{
var w=!!t&&t.target;
s(w);
}
}
return!1;
});
}
}();
}
var o,a,s,r,p,c=e("biz_common/dom/event.js"),d=e("biz_common/utils/report.js"),l=e("a/a_report.js"),_=l.AdClickReport,m=(e("biz_wap/utils/ajax.js"),
e("biz_common/utils/url/parse.js")),u=e("biz_wap/utils/position.js"),f=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,b=e("biz_wap/jsapi/core.js"),g=("https:"==top.location.protocol?5:0,
window.__report,e("biz_common/utils/monitor.js"));
return i;
});define("a/app_card.js",["biz_common/dom/event.js","biz_common/dom/class.js","a/a_report.js","biz_wap/utils/position.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/appdialog_confirm.js","biz_wap/utils/openUrl.js","biz_common/utils/url/parse.js"],function(a,t,n,e){
"use strict";
function o(a){
"undefined"!=typeof u&&u.log&&u.log(a);
}
function d(a,t){
u.invoke("downloadAppInternal",{
appUrl:a
},function(n){
n.err_msg&&-1!=n.err_msg.indexOf("ok")||w("http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(a)+"&ticket="+t+"#wechat_redirect");
});
}
function s(a){
this.g={
app_status:"download",
btn:null,
download_id:0,
clock:null,
install_clock:null,
data:{},
channelid:"",
via:"",
report_param:"",
appdetail_params:"",
btn_percent:0,
btn_width:0,
btn_height:0
};
var t=this,n=this.g;
if(n.btn=a.btn,!n.btn)return!1;
n.data=a.adData,n.url_scheme=a.url_scheme,n.appdetail_params=a.appdetail_params||"",
n.percentStatus=a.percentStatus;
var s={};
n.channelid=n.data.channel_id||"",n.report_param=a.report_param;
var r=20;
if(("103"==n.data.pt||"104"==n.data.pt)&&t.setAppRating(a),"104"==n.data.pt||"113"==n.data.pt||"114"==n.data.pt||"122"==n.data.pt||n.data.use_new_protocol>0&&12==n.data.product_type){
var l=n.data.androiddownurl;
if(l&&l.match){
var c=/&channelid\=([^&]*)/,w=l.match(c);
w&&w[1]&&(n.channelid=w[1],n.data.androiddownurl=l.replace(c,""));
}
n.channelid&&(n.channelid="&channelid="+n.channelid),a.via&&(n.via=["&via=ANDROIDWX.YYB.WX.ADVERTISE",a.via].join("."));
}
u.ready(function(){
console.log("appcard info",n),("113"==n.data.pt||"114"==n.data.pt||"104"==n.data.pt||"122"==n.data.pt||n.data.use_new_protocol>0&&12==n.data.product_type)&&(u.invoke("getInstallState",{
packageName:b
},function(a){
var t=a.err_msg;
o("getInstallState @yingyongbao : "+t);
var n=t.lastIndexOf("_")+1,e=t.substring(n);
1*e>=k&&t.indexOf("get_install_state:yes")>-1&&(h=!0);
}),u.invoke("getInstallState",{
packageName:n.data.pkgname
},function(a){
var e=a.err_msg;
o("getInstallState @"+n.data.pkgname+" : "+e);
var d=e.lastIndexOf("_")+1,s=e.substring(d);
e.indexOf("get_install_state:yes")>-1&&t.setBtn(1*s>=n.data.versioncode&&n.url_scheme?"gotodetail":"installed");
})),console.log("bind btn",n.btn.id),i.on(n.btn,"click",function(i){
if(console.log("app click",n),console.log(i.target),"installed"==n.app_status)return t.setBtn("installed"),
!1;
if("gotodetail"==n.app_status)return t.report(74),t.gotoDetail(),!1;
if("downloading"==n.app_status)return t.report(71),t.pauseDownload(),!1;
if("paused"==n.app_status)return t.report(72),t.resumeDownload(),!1;
if("downloaded"==n.app_status)return t.report(73),u.invoke("installDownloadTask",{
download_id:n.download_id,
file_md5:n.data.md5sum
},function(a){
var d=a.err_msg;
o("installDownloadTask : "+d),d.indexOf("install_download_task:ok")>-1?n.install_clock=setInterval(t.installStateChange.bind(t),500):e("安装失败！");
}),!1;
var l=function(){
if("103"==n.data.pt||"111"==n.data.pt||"112"==n.data.pt||"121"==n.data.pt||n.data.use_new_protocol>0&&19==n.data.product_type){
t.report(23);
var s=n.data.ticket||window.ticket;
n.url_scheme&&m.gtVersion("6.5.6",!0)?u.invoke("launchApplication",{
schemeUrl:n.url_scheme
},function(a){
-1==a.err_msg.indexOf("ok")&&d(n.data.appinfo_url,s);
}):d(n.data.appinfo_url,s);
}else{
if(h)return t.report(16),void(location.href="tmast://download?oplist=1,2&pname="+n.data.pkgname+n.channelid+n.via);
t.report(15);
var i=[n.data.adid,n.data.traceid,(n.data.pkgname||"").replace(/\./g,"_"),n.data.source,r,a.engine].join("."),l=function(a,t,n){
console.log("addDownloadTask : "+a.data.appname+","+a.data.androiddownurl+","+t+","+a.data.md5sum),
u.invoke("addDownloadTaskStraight",{
task_name:a.data.appname,
task_url:a.data.androiddownurl,
extInfo:t,
file_md5:a.data.md5sum
},function(e){
var o=e.err_msg;
o.indexOf("ok")>-1?n&&n(e):u.invoke("addDownloadTask",{
task_name:a.data.appname,
task_url:a.data.androiddownurl,
extInfo:t,
file_md5:a.data.md5sum
},n);
}),a.url_scheme&&m.isAndroid&&m.gtVersion("6.5.6",!0)&&u.invoke("writeCommData",{
packageName:a.data.pkgname,
data:a.url_scheme
},function(a){
console.log(a);
});
};
console.log("addDownloadTask : "+n.data.appname+","+n.data.androiddownurl+","+i+","+n.data.md5sum),
l(n,i,function(a){
var d=a.err_msg;
o("addDownloadTask : "+d),d.indexOf("ok")>-1?(n.download_id=a.download_id,y[n.download_id]=t,
o("download_id : "+n.download_id),t.setBtn("downloading"),n.clock=setInterval(t.queryDownloadState.bind(t),500),
n.install_clock=setInterval(t.installStateChange.bind(t),500),t.changeDownloadState()):e("调用下载器失败！");
});
}
},c=function(){
return m.isIOS?void l():void g({
app_name:n.data.appname,
app_img_url:n.data.icon_url,
onOk:function(){
l(),t.report(h?106:100);
},
onCancel:function(){
t.report(h?107:101);
}
});
};
if("download"==n.app_status&&n.data.rl&&n.data.traceid){
if(!s[n.data.traceid]){
s[n.data.traceid]=!0;
var w,f,b,k,v=!!i&&i.target;
v&&(w=_.getX(v,"js_ad_link")+i.offsetX,f=_.getY(v,"js_ad_link")+i.offsetY,b=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
k=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
p({
type:n.data.type,
report_type:2,
click_pos:0,
url:encodeURIComponent(n.data.androiddownurl),
tid:n.data.traceid,
rl:encodeURIComponent(n.data.rl),
__biz:biz,
pos_type:a.pos_type||0,
pt:n.data.pt,
pos_x:w,
pos_y:f,
ad_w:b||0,
ad_h:k||0
},function(){
s[n.data.traceid]=!1,c();
});
}
}else c();
return!1;
});
});
}
var i=a("biz_common/dom/event.js"),r=a("biz_common/dom/class.js"),l=a("a/a_report.js"),p=l.AdClickReport,_=a("biz_wap/utils/position.js"),c=a("biz_common/utils/report.js"),u=a("biz_wap/jsapi/core.js"),m=a("biz_wap/utils/mmversion.js"),g=a("a/appdialog_confirm.js"),w=a("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,f={
download:"下载",
downloading:"下载中",
paused:"继续",
downloaded:"安装",
gotodetail:"进入",
installed:"已安装"
},h=!1,b="com.tencent.android.qqdownloader",k=1060125,v=!1,y={};
return s.prototype.report=function(a){
var t=this.g;
c("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+a+t.report_param);
},s.prototype.setBtn=function(a,t){
var n=this.g,e=n.data.pt;
if(n.app_status=a,n.percentStatus)return n.percentStatus(a,t),!1;
if("downloading"===a){
t=t||0;
var o="";
if(n.btn_width=n.btn.offsetWidth,n.btn_height=n.btn.offsetHeight,104===e?o='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">暂停('+t+"%)</span>":113===e||114===e?n.btn.innerHTML.indexOf("继续")>-1?(o=n.btn.innerHTML,
o=o.replace("继续","暂停")):o='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">暂停</span>':122===e?(n.btn.innerHTML.indexOf("继续")>-1?(o=n.btn.innerHTML,
o=o.replace(/继续/g,"暂停")):o='<span class="btn_progress_inner js_btn_process" style="width:'+t+'%;"><span id="percent_btn_2" class="btn_progress_bd js_btn_process" style="width:'+n.btn_width+'px;">暂停</span></span>暂停',
n.btn_percent=t):1===n.data.use_new_protocol?(n.btn_width=n.btn.offsetWidth,n.btn_height=n.btn.offsetHeight,
n.btn.innerHTML.indexOf("继续")>-1?(o=n.btn.innerHTML,o=o.replace(/继续/g,"暂停")):o='<span class="btn_progress_inner js_btn_process" style="width:'+t+'%;"><span id="percent_btn_2" class="btn_progress_bd js_btn_process" style="width:'+n.btn_width+"px; line-height: "+n.btn_height+'px">暂停下载</span></span>暂停下载',
n.btn_percent=t):o='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">'+t+"%</span>",
!o)return;
n.btn.innerHTML=o,122===e||1===n.data.use_new_protocol?r.addClass(n.btn,"btn_progress"):r.addClass(n.btn,"with_processor");
}else if("paused"===a){
var o="";
104===e||113===e||114===e||122===e||n.data.use_new_protocol>0?(o=n.btn.innerHTML,
o=o.replace(/暂停/g,"继续"),n.btn.innerHTML=o):(r.removeClass(n.btn,"with_processor"),
r.removeClass(n.btn,"btn_progress"),n.btn.innerHTML=f[a]);
}else r.removeClass(n.btn,"with_processor"),r.removeClass(n.btn,"btn_progress"),
n.btn.innerHTML=f[a],n.data.use_new_protocol>0&&"gotodetail"===a&&(n.btn.innerHTML="进入应用");
},s.prototype.setAppRating=function(a){
var t=this.g,n=a.js_app_rating,e=1*t.data.app_rating;
e>5&&(e=5),0>e&&(e=0);
var o=["","one","two","three","four","five"],d="",s=Math.floor(e);
if(d="star_"+o[s],e>s&&(e=s+.5,d+="_half"),n&&e>0){
var i=n.getElementsByClassName("js_stars"),l=n.getElementsByClassName("js_scores");
i&&l&&i[0]&&l[0]&&(i=i[0],l=l[0],i.style.display="inline-block",r.addClass(i,d));
}
},s.prototype.changeDownloadState=function(){
if(!v){
{
this.g;
}
v=!0,u.on("wxdownload:progress_change",function(a){
y[a.download_id]&&y[a.download_id].setBtn("downloading",a.progress);
});
}
},s.prototype.queryDownloadState=function(){
var a=this.g,t=this;
a.download_id&&u.invoke("queryDownloadTask",{
download_id:a.download_id
},function(n){
if(o("queryDownloadTask : "+n.state+"; dowloadid = "+a.download_id),n&&n.state){
if("download_succ"==n.state&&(t.setBtn("downloaded"),window.clearInterval(a.clock)),
"downloading"==n.state)return;
"download_fail"==n.state&&(window.clearInterval(a.clock),window.clearInterval(a.install_clock),
e("下载失败"),t.setBtn("download"));
}
});
},s.prototype.installStateChange=function(){
var a=this.g,t=this;
u.invoke("getInstallState",{
packageName:a.data.pkgname,
download_id:a.download_id
},function(n){
var e=n.err_msg;
e.indexOf("get_install_state:yes")>-1&&(o("getInstallState @app, version : "+e),
window.clearInterval(a.install_clock),t.setBtn(a.url_scheme?"gotodetail":"installed"));
});
},s.prototype.pauseDownload=function(){
var a=this.g,t=this;
u.invoke("pauseDownloadTask",{
packageName:a.data.pkgname,
download_id:a.download_id
},function(a){
a.err_msg.indexOf("pause_download_task:ok")>-1&&t.setBtn("paused");
});
},s.prototype.resumeDownload=function(){
var a=this.g,t=this;
u.invoke("resumeDownloadTask",{
packageName:a.data.pkgname,
download_id:a.download_id
},function(a){
a.err_msg.indexOf("ok")>-1&&t.setBtn("downloading");
});
},s.prototype.gotoDetail=function(){
var t=this.g;
if(104==t.data.pt||113==t.data.pt||114==t.data.pt||122==t.data.pt||t.data.use_new_protocol>0&&12==t.data.product_type&&t.url_scheme)m.gtVersion("6.5.6",!0)?u.invoke("launchApplication",{
schemeUrl:t.url_scheme
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=t.url_scheme);
}):location.href=t.url_scheme;else{
var n=t.data.url,e=a("biz_common/utils/url/parse.js");
(!n||0!=n.indexOf("http://mp.weixin.qq.com/tp/")&&0!=n.indexOf("https://mp.weixin.qq.com/tp/"))&&(n="http://mp.weixin.qq.com/mp/ad_app_info?t=ad/app_detail&app_id="+t.data.app_id+(t.appdetail_params||"")+"&channel_id="+t.channelid+"&md5sum="+t.data.md5sum+"#wechat_redirect"),
t.url_scheme&&(n=e.join(n,{
is_installed:"1"
})),w(n);
}
},s;
});define("a/sponsor.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/a_report.js","biz_common/utils/url/parse.js","new_video/player.js","a/wxopen_card.js","biz_wap/utils/openUrl.js","biz_wap/utils/ajax.js","biz_wap/utils/device.js"],function(e){
"use strict";
function t(e,t){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function o(e,t,o,i){
r("http://mp.weixin.qq.com/mp/ad_complaint?&action=report&type="+e+"&pos_type="+t+"&trace_id="+o+"&aid="+i+"&__biz="+window.biz+"&r="+Math.random());
}
function i(){
f({
url:" /mp/ad_video_report?action=video_play_report",
data:window.__video_report_data,
type:"POST",
success:function(){}
});
}
function n(e,o,i){
o.canvas_info?_.invoke("openADCanvas",{
canvasId:o.canvas_info.canvas_id,
preLoad:0,
noStore:0,
extraData:JSON.stringify({
pos_type:o.pos_type
}),
adInfoXml:o.canvas_info.ad_info_xml
},function(o){
0!=o.ret?(u(e),t(135,i)):t(134,i);
}):u(e);
}
function a(e){
var a=e.adData,r=e.pos_type,_=a.traceid,s=e.a_info.type,f=a.adid,g=a.url,h=e.a_info.rl;
110==a.pt&&(g=g.replace("#","&AdType=80#"));
var b={};
e.report_param=e.report_param||"";
var j=e.adDetailBtn,z=e.adMoreBtn,x=(e.adMessage,e.adAbout),T=e.adComplain,k=e.adImg,H=e.adVideo,I=0,W=document.getElementById("js_sponsor_opt_list"),E={
type:s,
report_type:2,
url:encodeURIComponent(g),
tid:_,
rl:encodeURIComponent(h),
__biz:biz,
pos_type:r,
pt:a.pt,
click_pos:""
},U=null,h=a.rl||"",A="";
if(h){
h=h.split("?"),h=h.length>1?h[1]:"";
var M=new RegExp("(^|&)viewid=([^&]*)(&|$)","i"),P=h.match(M);
P&&(A=unescape(P[2]));
}
window.__video_report_data={
aid:a.adid,
traceid:a.traceid,
user_uin:window.user_uin,
publisher_appid:a.publisher_appid||0,
appmsg_id:mid,
item_idx:idx,
viewid:A,
__biz:biz,
report_type:0,
play_type:0,
play_duration:0,
video_duration:0,
auto_play:1
};
var q=null,O=!0,S=!1;
if(p.isAndroid&&p.gtVersion("6.6.6",!0)&&(S=!0),console.log("data.videoUrl",a),H&&a.videoUrl){
U=new l({
container:H,
cover:a.thumbUrl,
width:H.offsetWidth,
height:H.offsetWidth*parseInt(a.displayHeight)/parseInt(a.displayWidth),
muted:!0,
ad_muted_btn:!0,
always_hide_loading:!0,
src:a.videoUrl,
autoHide:!0,
blockTouchVideo:!0,
onError:function(o){
console.log("播放出错",o),t(123,e),H.parentNode.innerHTML='<span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url('+a.thumbUrl+"); height:"+m.clientWidth/1.77+'px;"></span>',
window.__video_report_data.play_type=3;
},
onEnd:function(){
t(122,e),window.__video_report_data.play_type=1,window.__video_report_data.play_duration=window.__video_report_data.video_duration,
window.__video_report_data.report_type=2,U.replay(),i();
},
onTimeupdate:function(e,t){
2==window.__video_report_data.report_type&&(window.__video_report_data.report_type=3,
i()),window.__video_report_data.play_type=2,window.__video_report_data.play_duration=1e3*t.currentTime,
window.__video_report_data.video_duration=1e3*U.__getDuration(),y||(window.__video_report_data.report_type=3,
i(),y=1);
}
}),I=29,U._showPlayer(),U.setSrc(a.videoUrl,"auto");
var C=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,B=document.documentElement.clientHeight||window.innerHeight;
if(p.isAndroid)if(m.offsetTop>C&&m.offsetTop<C+B)window.__video_report_data.auto_play=0;else{
var D=function(){
U.__beginPlayHandler(),d.off(window,"touchstart",D),S=!0;
};
d.on(window,"touchstart",D);
}
var N=function(){
if(3==window.__video_report_data.play_type)return void d.off(window,"scroll",N);
if(0!=window.__video_report_data.auto_play||0!=window.__video_report_data.play_type)if(C=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,
B=document.documentElement.clientHeight||window.innerHeight,U.isPlay()&&(m.offsetTop>C+B||m.offsetTop+m.offsetHeight<C))U.pause();else if(!U.isPlay()&&v.canSupportAutoPlay&&!(m.offsetTop>C+B||m.offsetTop+m.offsetHeight<C)){
if(p.isAndroid&&!S)return;
0==window.__video_report_data.play_type&&1==window.__video_report_data.auto_play?(t(121,e),
p.isIOS&&U.triggerMuted(!0),U.__beginPlayHandler()):U.play();
}
};
d.on(window,"scroll",N),N(),q=function(){
window.setTimeout(function(){
U.triggerMuted(!0);
},1e3);
};
}
d.on(window,"touchend",function(e){
console.log(e.target),e.target==x||e.target==j||e.target==T||e.target.className.indexOf("js_opt_item")>=0||(x.style.display="none",
T.style.display="none",W.style.display="none");
}),d.on(document.getElementById("js_ad_inner"),"click",function(o){
if(o.target.className.indexOf("js_muted_btn")>-1)"true"==U.video.getAttribute("muted")?(U.triggerMuted(!1),
O=!1):(U.triggerMuted(!0),O=!0),t(124,e);else{
if(U&&(!U.isPlay()||0==window.__video_report_data.play_type))return U.__beginPlayHandler(),
O||U.triggerMuted(!1),t(121,e),void(window.__video_report_data.play_type=2);
"js_main_img"==o.target.id||o.target.className.indexOf("video_mask")>-1?b[_+"_1"]||(b[_+"_1"]=!0,
E.click_pos=1,w(E,function(){
t(87+I,e),b[_+"_1"]=!1,!!q&&q(),6!=e.a_info.dest_type?n(g,e.a_info,e):c.openWxopen(e.a_info);
})):b[_+"_2"]||(b[_+"_2"]=!0,E.click_pos=2,w(E,function(){
t(88+I,e),b[_+"_2"]=!1,!!q&&q(),6!=e.a_info.dest_type?n(g,e.a_info,e):c.openWxopen(e.a_info);
}));
}
return!1;
}),d.on(z,"click",function(){
return b[_+"_3"]||(b[_+"_3"]=!0,E.click_pos=3,w(E,function(){
t(89+I,e),b[_+"_3"]=!1,!!q&&q(),6!=e.a_info.dest_type?n(g,e.a_info,e):c.openWxopen(e.a_info);
})),!1;
}),d.on(j,"click",function(){
return t(90+I,e),o(0,r,e.a_info.traceid,e.a_info.aid),"none"==window.getComputedStyle(x).display?(x.style.display="initial",
W.style.display="initial",parseInt(window.can_see_complaint)&&(T.style.display="initial")):(x.style.display="none",
T.style.display="none",W.style.display="none"),!1;
}),d.on(x,"click",function(){
t(91+I,e);
var o="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/trade_about.html?aid="+f+"&tid="+_+"#wechat_redirect";
return!!q&&q(),u(o),!1;
}),d.on(T,"click",function(){
var t="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/feedback.html?aid="+e.a_info.aid+"&traceid="+e.a_info.traceid+"&source="+r+"&biz="+window.biz;
return!!q&&q(),o(1,r,e.a_info.traceid,e.a_info.aid),u(t),!1;
}),d.on(window,"resize",function(){
setTimeout(function(){
var t=m.clientWidth;
if(k&&2!=e.a_info.use_new_protocol)k.style.height=t/1.77+"px",console.log("do not change height");else{
var o=H.offsetWidth,i=H.offsetWidth*parseInt(a.displayHeight)/parseInt(a.displayWidth);
U.setHeight(i),U.setWidth(o),m.style.width=o,m.style.height=i;
}
},0);
});
}
var d=e("biz_common/dom/event.js"),r=e("biz_common/utils/report.js"),_=e("biz_wap/jsapi/core.js"),p=e("biz_wap/utils/mmversion.js"),s=e("a/a_report.js"),l=(e("biz_common/utils/url/parse.js"),
e("new_video/player.js")),c=e("a/wxopen_card.js"),u=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,w=s.AdClickReport,m=(e("biz_common/utils/url/parse.js"),
document.getElementById("js_sponsor_ad_area")),f=e("biz_wap/utils/ajax.js"),y=!1,v=e("biz_wap/utils/device.js");
return a;
});define("a/tpl/cpc_tpl.html.js",[],function(){
return'<!--cpc 文中广告-->\n<div id="js_cpc_area" class="js_ad_link mpad_cpc" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n    <!--有文字 "广告"-->\n    <# if(tag_pos == \'left\'){ #>\n    <!--"广告" 居左-->\n    <div class="mpad_cpc_adTag_left mpad_more_cps_left_container">广告<div href="javascript:;" class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(can_see_complaint)){ #>style="display:none"<#}#>>\n                <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                        </li>\n                    </ul>\n        </div>\n        <!--投诉入口 end-->\n    </div>\n    <# } else if(tag_pos == \'right\'){ #>\n    <!--"广告" 居右-->\n    <div class="mpad_cpc_adTag_right mpad_more_cps_right_container">广告<div href="javascript:;" class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(can_see_complaint)){ #>style="display:none"<#}#>>\n            <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                <li class="mpad_more_list_ele">\n                    <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <# } #>\n    <div class="mpad_cpc_inner">\n        <div class="mpad_cpc_bd" style="background-image:url(<#=banner#>)"></div>\n        <div class="mpad_cpc_ft <# if(!price){ #> single<# } #>">\n            <div class="mpad_cpc_ft_hd">\n                <# if(avatar){ #><!--头像-->\n                <span class="<# if(isDownload){ #> mpad_cpc_avatar<# }else{ #> mpad_cpc_avatar_round<# } #>" style="background: url(<#=avatar#>) no-repeat center; background-size: contain;"></span>\n                <# } #>\n                \n                \n                <div class="mpad_cpc_ft_msg">\n                    <!--有title和金额-->\n                    <# if(!!title){ #>\n                        <span class="mpad_cpc_ft_msg_title"><#=title#></span>\n                        <# if(!!price){ #>\n                        <span class="mpad_cpc_ft_msg_price">¥<#=price#></span>\n                        <# } #>\n                    <# } #>\n                    <# if(!(tag_pos == \'left\' || tag_pos == \'right\')){ #><!--广告标在里面-->\n                    <div class="mpad_cpc_adTag_inner mpad_more_innertips_container <# if(!title && !price){ #> single<# } #> js_ad_opt_list_btn_<#=pos_type#>">广告<div href="javascript:;" class="mpad_more" <# if(!parseInt(can_see_complaint)){ #>style="display:none"<#}#>>\n                            <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                                <li class="mpad_more_list_ele">\n                                    <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                    <# } #>\n                </div>\n            </div>\n            <a href="javascript:void(0);" class="mpad_cpc_btn js_ad_btn_<#=pos_type#>" id="js_ad_btn_<#=pos_type#>">\n                <# if(!!is_wx_app){ #><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAAGz7rX1AAAAAXNSR0IArs4c6QAAA65JREFUSA2lVk9oVGcQ/+a9tytoSm6t5pBK9i0trdCTXlrx4EEF/1w0p+Klh9LiQcF9uy9Gu2rcfXlJUfAfth4UvPTPQVop9FCagzdBoaAI+xJjDgpCBaMbzO6+N8687Dy/Td6GRD/Iznwzv5n55vtm5kWp5VahEkyr+Gc51FJdoVJDlhpLVW0J6BqGA8AfiLgXTPPTWCc+FlNwRqc+wTB8KBZjQ/kOb7rnhO9AtOOdpnjHkyO6448/s7LZz33XPsFmUPCCMRXhUcNQmwwri61G474yYJwuZCE7tuA/CRK7KlZqJxlZPfrxA1F0pR2n0lF0MnC8yaZCNEVON3PALw78nmpU/hWz9SCYNwwojpZsX4zaqU5bItDp/MyMzXvDytxiWr7yZG39ef2ZosczTfW15frBl60W3lYA4YdWT2+hsL7OQH2Vv+2bo32PyKwwVDd4M+baSdSo1dzNsjX9/QHTxSvOiR52Pz3sb4mSovqlXIYeOq6mRP6uTOrNsTOnGhyjKx8Rx6DgqT9k96UaFL1gVxThX3QpqACHIYKdqHCrAtVMEhZPTCNUfzKlC5FqqxSqwXV63IMiYP3bpb26CEHhU+YTgzJiwgtIKOVzClEVEwOnEoT1ahA61cnvBSSUwIe4EyjpiHvJ4JqhhNi757u5SwIUSh1yYbNtW3RDcXHKMTyydgW0mA4OQiiyBQOAPhEklF484TXG4rvl63KqtY0I6m+FMEJ7ake1R8Ml7EI9VYInlMcGkVIdDdPZz8j+vWhqaazE47A/k2uEje/oyrcTfoBtANQk/d6iE/44Wsq9ED+rDuJ4tbMYqcPiYDlKc+3QaCl/cVVBnEptgppxGzumgpkDA3bQiW/rgahBDlLNX6MHin1TVj+tOEipGtghYk0cmmBs8dzcHdnrlAbGNzQwrsYyUPNSiDomlYdMJqsrIGMtmWusL3pTX6goPCtYyvhmR4vz+A8bzR8QcB+l+L9lmbsqhYH/xKAbLV981jM3O3uXiiAfRW9rXko0DiJTiT4nC354CgK8akUfPOrmWJe/np3Lk0lv3DxK3aRmOUkPfl8wFk2FX+gEgyygEnxJ7bTPL9r/CmAl1HM33iPcR92wFl8Nf1DiZZhH6BOWGgCbrXW6E2w222nr0nSeMoProsIo+plLUPZCi97kVxHihOwp5QnPtVO/RwlGY+ISbg/L85q8KwuGOueX8ke6AlIUHX1CJ+7l/0Aihfz1jEcF0Smqkn+yZvbyiNNPY2P16w2TL37yLBAjYAAAAABJRU5ErkJggg==" alt=""><# } #><#=btn_text#>\n            </a>\n        </div>\n    </div>\n</div>';
});define("a/tpl/crt_tpl_manager.js",["a/tpl/crt_size_map.js","biz_common/tmpl.js"],function(t){
"use strict";
function r(t,r,a,n){
this.crtSize=t,this.data=r,this.crtData=e(t),this.warpper=a,this.extra=n,this.updateData=function(t){
this.data=t,this.extra&&this.extra.customUpdataFunc?this.extra.customUpdataFunc(this.warpper,this.data):i(this.crtSize,this.data,this.warpper);
},this.getData=function(){
return this.data;
},this.getCrtData=function(){
return this.crtData;
},i(this.crtSize,this.data,this.warpper);
}
function a(t){
var r=!1;
return s[t]&&s[t].tpl&&(r=s[t].tpl),r;
}
function e(t){
var r={};
return s[t]&&s[t].renderData&&(r=s[t].renderData),r;
}
function i(t,r,i){
var s=a(t),o=n(r,e(t)),h="";
if(!s)return console.info("crt size:",t," tpl is not found"),"";
try{
h=c.tmpl(s,o);
}catch(p){
console.error("render ad data error",t,r,o,s),console.log(p);
}
console.log("render crt size",t,"with data",o),i.innerHTML=h;
}
function n(t,r){
for(var a in r)t[a]=r[a];
return t;
}
var s=t("a/tpl/crt_size_map.js"),c=t("biz_common/tmpl.js");
return console.info("CRT_CONF",s),{
renderAdData:i,
createCrtObject:r
};
});define("a/cpc_a_tpl.html.js",[],function(){
return'<!--有title “广告”，去掉 class appmsg_card_context。没有title “广告”，加class appmsg_card_context-->\n<div id="js_cpc_area"  class="js_ad_link  <# if(exp_obj.icon_pos != \'left\' && exp_obj.icon_pos != \'right\'){ #> appmsg_card_context <# } #> appmsg_card_active mpda_cpc_context pages_reset" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n    <!--有文字 "广告"-->\n    <# if(exp_obj.icon_pos == \'left\'){ #>\n    <div class="appmsg_card_hd mpda_cpc_hd">\n      <!--"广告" 居左-->\n      <div class="mpda_cpc_title mpda_cpc_title_left mpad_more_cps_left_container js_ad_opt_list_btn_<#=pos_type#>">广告\n        <!--投诉入口 begin-->\n        <div href="javascript:;" class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(window.can_see_complaint)){ #>style="visibility:hidden"<#}#>>\n                <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                        </li>\n                    </ul>\n        </div>\n        <!--投诉入口 end-->\n        </div>\n    </div>\n    <# } else if(exp_obj.icon_pos == \'right\'){ #>\n    <div class="appmsg_card_hd mpda_cpc_hd">\n      <!--"广告" 居右-->\n      <div class="mpda_cpc_title mpda_cpc_title_right mpad_more_cps_right_container js_ad_opt_list_btn_<#=pos_type#>">广告\n        <!--投诉入口 begin-->\n        <div href="javascript:;" class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(window.can_see_complaint)){ #>style="visibility:hidden"<#}#>>\n                <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                        </li>\n                    </ul>\n        </div>\n        \n        <!--投诉入口 end-->\n      </div>\n    </div>\n    <# } #>\n    <div class="mpda_cpc_inner">\n      <div class="appmsg_card_bd mpda_cpc_bd" style="background-image:url(<#=image_url#>)"></div>\n\n      <div class="appmsg_card_ft mpda_cpc_ft <# if(!exp_obj.price){ #> single<# } #>" style="z-index: 2;">\n          <# if(exp_obj.icon_pos == \'left\' || exp_obj.icon_pos == \'right\'){ #>\n\n          <# } else { #>\n          <span class="dropdown_opr_tips mpad_more_innertips_container js_ad_opt_list_btn_<#=pos_type#>">\n              广告\n                <!--投诉入口 begin-->\n                <div href="javascript:;" class="mpad_more" <# if(!parseInt(window.can_see_complaint)){ #>style="visibility:hidden"<#}#>>\n                    <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                        </li>\n                    </ul>\n                </div>\n                <!--投诉入口 end-->\n              <!--<span class="dropdown_opr_popover"></span>-->\n          </span>\n          <# } #>\n          <!--title 金额-->\n\n          <# if(!!exp_obj.sale_text){ #>\n          <span class="appmsg_card_msg">\n              <span class="appmsg_card_msg_title">\n                  <#=exp_obj.sale_text#>\n              </span>\n              <# if(!!exp_obj.price){ #>\n              <span class="appmsg_card_msg_supp price">\n                  ¥<#=exp_obj.price#>\n              </span>\n              <# } #>\n          </span>\n          <# } #>\n\n          <# if(dest_type == 9){ #>\n            <a href="javascript:void(0);" class="appmsg_card_btn wx_min_plain_btn ba_btn btn_progress">\n                <!-- 新广告协议逻辑跳转canvas不带id -->\n                <#=exp_obj.btn_text#>\n            </a>  \n          <# }else if(dest_type == 6){#>\n            <a href="javascript:void(0);" class="appmsg_card_btn">\n              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAAGz7rX1AAAAAXNSR0IArs4c6QAAA65JREFUSA2lVk9oVGcQ/+a9tytoSm6t5pBK9i0trdCTXlrx4EEF/1w0p+Klh9LiQcF9uy9Gu2rcfXlJUfAfth4UvPTPQVop9FCagzdBoaAI+xJjDgpCBaMbzO6+N8687Dy/Td6GRD/Iznwzv5n55vtm5kWp5VahEkyr+Gc51FJdoVJDlhpLVW0J6BqGA8AfiLgXTPPTWCc+FlNwRqc+wTB8KBZjQ/kOb7rnhO9AtOOdpnjHkyO6448/s7LZz33XPsFmUPCCMRXhUcNQmwwri61G474yYJwuZCE7tuA/CRK7KlZqJxlZPfrxA1F0pR2n0lF0MnC8yaZCNEVON3PALw78nmpU/hWz9SCYNwwojpZsX4zaqU5bItDp/MyMzXvDytxiWr7yZG39ef2ZosczTfW15frBl60W3lYA4YdWT2+hsL7OQH2Vv+2bo32PyKwwVDd4M+baSdSo1dzNsjX9/QHTxSvOiR52Pz3sb4mSovqlXIYeOq6mRP6uTOrNsTOnGhyjKx8Rx6DgqT9k96UaFL1gVxThX3QpqACHIYKdqHCrAtVMEhZPTCNUfzKlC5FqqxSqwXV63IMiYP3bpb26CEHhU+YTgzJiwgtIKOVzClEVEwOnEoT1ahA61cnvBSSUwIe4EyjpiHvJ4JqhhNi757u5SwIUSh1yYbNtW3RDcXHKMTyydgW0mA4OQiiyBQOAPhEklF484TXG4rvl63KqtY0I6m+FMEJ7ake1R8Ml7EI9VYInlMcGkVIdDdPZz8j+vWhqaazE47A/k2uEje/oyrcTfoBtANQk/d6iE/44Wsq9ED+rDuJ4tbMYqcPiYDlKc+3QaCl/cVVBnEptgppxGzumgpkDA3bQiW/rgahBDlLNX6MHin1TVj+tOEipGtghYk0cmmBs8dzcHdnrlAbGNzQwrsYyUPNSiDomlYdMJqsrIGMtmWusL3pTX6goPCtYyvhmR4vz+A8bzR8QcB+l+L9lmbsqhYH/xKAbLV981jM3O3uXiiAfRW9rXko0DiJTiT4nC354CgK8akUfPOrmWJe/np3Lk0lv3DxK3aRmOUkPfl8wFk2FX+gEgyygEnxJ7bTPL9r/CmAl1HM33iPcR92wFl8Nf1DiZZhH6BOWGgCbrXW6E2w222nr0nSeMoProsIo+plLUPZCi97kVxHihOwp5QnPtVO/RwlGY+ISbg/L85q8KwuGOueX8ke6AlIUHX1CJ+7l/0Aihfz1jEcF0Smqkn+yZvbyiNNPY2P16w2TL37yLBAjYAAAAABJRU5ErkJggg==" alt="">\n              <#=exp_obj.btn_text#>\n            </a>\n          <# }else{ #>\n            <a href="javascript:void(0);" class="appmsg_card_btn wx_min_plain_btn ba_btn btn_progress" id="js_ad_btn_<#=pos_type#>">\n                  <!-- 新广告协议逻辑 -->\n                  <#=exp_obj.btn_text#>\n              </a> \n          <# } #>\n        </div>\n    </div>\n</div>\n';
});define("a/sponsor_a_tpl.html.js",[],function(){
return'<!--sponsor广告-->\n<div class="ct_mpda_area mpda_sponsor <#if(window.new_appmsg){#>appmsg_card_context<# } #>" id="js_ad_area">\n    <div class="ct_mpda_placeholder">\n        <p class="ct_mpda_tips">Ads can also be a natural part of life</p>\n    </div>\n    <div class="ct_mpda_inner js_ad_link" id="js_ad_inner" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>" data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <div class="ct_mpda_hd">\n            <# if(pt==108 || pt==109 || pt==110){ #>\n            <span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url(<#=image_url#>)"></span>\n            <# }else if(pt==116 || pt==117){ #>\n            <div id="js_video_container"></div>\n            <# }else{ #>\n            <span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url(<#=image_url#>)"></span>\n            <# } #>\n        </div>\n        <div class="ct_mpda_bd" id="js_ad_message">\n            <span class="ct_mpda_logo img_bg_cover" style="background-image:url(<#=biz_info.head_img#>)"></span>\n            <div class="ct_mpda_desc_box">\n                <p class="ct_mpda_title"><#=biz_info.nick_name#></p>\n                <div class="ct_mpda_details mpad_more_innerdetail_container" id="js_ad_detail">提供的广告                    <!--<a class="ct_mpda_btn_about" id="js_btn_about">关于广告</a>\n                    <a class="ct_mpda_btn_about" id="js_btn_complain">Report</a>-->\n                    <ul id="js_sponsor_opt_list" class="mpad_more_list" style="display: none">\n                        <li class="mpad_more_list_ele" id="js_btn_about">\n                            <a class="mpad_more_list_ele_container js_opt_item">关于广告</a>\n                        </li>\n                        <li class="mpad_more_list_ele" id="js_btn_complain" style="display: none">\n                            <a class="mpad_more_list_ele_container js_opt_item">Report</a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n            <# if(dest_type==6){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">\n                <i class="icon26_weapp_blue"></i>\n                <# if(product_type==46) {#>\n                    进入小游戏                <# }else{ #>\n                    查看详情                <# } #>\n            </a>\n            <# }else if(dest_type==9){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">查看详情</a>\n            <# }else if(product_type==46){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">进入小游戏</a>\n            <# }else if(pt== 108||pt==116){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">查看详情</a>\n            <# }else if(pt==109){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">下载应用</a>\n            <# }else if(pt==110||pt==117){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">了解公众号</a>\n            <# } #>\n            \n        </div>\n    </div>\n</div>\n';
});define("a/a_tpl.html.js",[],function(){
return'<div class="rich_media_extra" id="gdt_area">\n    <# if(pos_type==0){ #>\n        <#if(window.new_appmsg){#>\n        <div class="weui-loadmore weui-loadmore_line mod_title_context_primary mpad_more_container">\n            <span class="weui-loadmore__tips js_ad_opt_list_btn_<#=pos_type#>">Ad                <!--投诉入口 begin-->\n                <div class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(window.can_see_complaint)){ #>style="display:none"<#}#>>\n                    <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                            <li class="mpad_more_list_ele">\n                                <a class="mpad_more_list_ele_container  js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                            </li>\n                    </ul>\n                </div>\n                <!--投诉入口 end-->\n            </span>\n        </div>\n        <#}else{#>\n        <div class="rich_tips with_line title_tips mpad_more_center_container">\n            <span class="tips js_ad_opt_list_btn_<#=pos_type#>">Ad</span>\n            <!--投诉入口 begin-->\n            <div class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(window.can_see_complaint)){ #>style="visibility:hidden"<#}#>">\n                <ul class="mpad_more_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                        </li>\n                </ul>\n            </div>\n            <!--投诉入口 end-->\n        </div>\n        <# } #>\n    <# } #>\n    <div class="js_ad_link extra_link <# if(pt==107){ #>preview_img_primary<# } #>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <# if(!use_new_protocol){ #>\n            <# if(pt==1){ #>\n                <#=hint_txt#>\n                <img class="icon_arrow_gray" src="<%@GetResFullName($images_path$icon/common/icon_arrow_gray.png)%>">\n                <img class="icon_loading_white icon_after" style="display:none;" id="loading_<#=traceid#>" src="<%@GetResFullName($images_path$icon/common/icon_loading_white.gif)%>">\n            <# }else if(pt==2||pt==107||pt==119){ #>\n                <!--第三方logo-->\n                <# if (logo.indexOf("http://mmsns.qpic.cn/") == 0){ #>\n                    <div class="brand_logo"><img data-src="<#=logo#>" alt="logo图片" class="js_alazy_img"></div>\n                <# } #>\n                <img class="appmsg_banner js_alazy_img" data-src="<#=image_url#>">\n                <# if(watermark_type!=0){ #>\n                    <i class="promotion_tag" id="js_promotion_tag">\n                    <# if(pt==119){ #>\n                    <span class="icon26_weapp_white"></span>\n                    <# } #>\n\n                    <# if(watermark_type==1){ #>\n                        商品推广\n                    <# }else if (watermark_type==2){ #>\n                        活动推广\n                    <# }else if (watermark_type==3){ #>\n                        <#=longAppBtnText#>\n                    <# }else if (watermark_type==7){ #>\n                        小游戏推广\n                    <# }else if (watermark_type==8){ #>\n                        进入小游戏\n                    <# } #>\n                    </i>\n                <# } #>\n            <# }else if(pt==7||pt==120){ #>\n            <!-- 图文 -->\n            <div class="preview_group preview_card">\n                <div class="preview_group_inner card_inner">\n                    <div class="preview_group_info">\n                        <strong class="preview_group_title2"><#=hint_txt#></strong>\n                        <div class="preview_group_desc"><#=ad_desc#></div>\n                        <img data-src="<#=image_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                    </div>\n                    <i class="promotion_tag">\n                        <# if(pt==120){ #>\n                        <span class="icon26_weapp_white"></span>\n                        <# } #>\n\n                        <# if (watermark_type==7){ #>\n                            小游戏推广\n                        <# }else if (watermark_type==8){ #>\n                            进入小游戏\n                        <# }else{ #>\n                            活动推广\n                        <# } #>\n                    </i>\n                </div>\n            </div>\n            <# }else if(pt==115){ #>\n            <div class="preview_group mod_follow_with_img">\n                <div class="wx_flex_layout">\n                    <div class="wx_flex_bd">\n                        <img class="fwi_thumb js_alazy_img" data-src="<#=image_url#>" alt="">\n                    </div>\n                    <div class="wx_flex_ft">\n                        <span class="radius_avatar"><img data-src="<#=biz_info.head_img#>" alt="" class="js_alazy_img"></span>\n                        <strong class="fwi_nickname"><#=biz_info.nick_name#></strong>\n                        <a id="js_view_profile_<#=pos_type#>" <# if(biz_info.is_subscribed == 0){ #>style="display:none"<# } #> class="wx_min_plain_btn primary js_ad_btn">查看</a>\n                        <a id="js_add_contact_<#=pos_type#>" data-url="<#=url#>" data-type="<#=type#>" data-tid="<#=traceid#>" data-rl="<#=rl#>" <# if(biz_info.is_subscribed ==1){ #>style="display:none"<# } #> class="wx_min_plain_btn primary js_ad_btn" style="z-index: 2;">关注</a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==100){ #>\n            <div class="preview_group follow <# if(!!biz_info.show_comm_attention_num){ #>with_tips<# } #>">\n                <div class="preview_group_inner">\n                    <div class="preview_group_info append_btn">\n                        <strong class="preview_group_title"><#=biz_info.nick_name#></strong>\n                        <div class="preview_group_desc"><#=hint_txt#></div>\n                        <# if(!!biz_info.show_comm_attention_num){ #>\n                        <div class="preview_group_desc weak_tips">有<#=biz_info.comm_attention_num#>个好友关注</div>\n                        <# } #>\n                        <# if(!!biz_info.head_img){ #>\n                        <img data-src="<#=biz_info.head_img#>" alt="" class="preview_group_avatar br_radius js_alazy_img" >\n                        <# }else{ #>\n                        <img class="preview_group_avatar br_radius" src="http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0" alt="<#=biz_info.nick_name#>" >\n                        <# } #>\n                    </div>\n                    <div class="preview_group_opr">\n                        <a id="js_view_profile_<#=pos_type#>" <# if(biz_info.is_subscribed == 0){ #>style="display:none"<# } #> class="btn btn_inline btn_primary btn_line js_ad_btn">查看</a>\n                        <a id="js_add_contact_<#=pos_type#>" data-url="<#=url#>" data-type="<#=type#>" data-tid="<#=traceid#>" data-rl="<#=rl#>" <# if(biz_info.is_subscribed ==1){ #>style="display:none"<# } #> class="btn btn_inline btn_line  btn_primary js_ad_btn">关注</a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==102){ #>\n            <div class="preview_group">\n                <div class="preview_group_inner">\n                    <div class="preview_group_info append_btn">\n                        <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                        <div class="preview_group_desc"><#=hint_txt#></div>\n                        <img data-src="<#=app_info.icon_url#>" alt="" class="preview_group_avatar br_radius js_alazy_img">\n                    </div>\n                    <div class="preview_group_opr">\n                        <a id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn btn_download"><#=shortAppBtnText#></a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==101){ #>\n            <div class="preview_group preview_card">\n                <div class="preview_group_inner card_inner">\n                    <div class="preview_group_info append_btn">\n                        <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                        <div class="preview_group_desc"><#=hint_txt#></div>\n                        <img data-src="<#=app_info.icon_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                    </div>\n                    <div class="preview_group_opr">\n                        <a id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn"><#=shortAppBtnText#></a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==103||pt==104){ #>\n            <div class="preview_group obvious_app">\n                <div class="preview_group_inner">\n                    <div class="pic_app">\n                        <img data-src="<#=image_url#>" alt="" class="js_alazy_img">\n                    </div>\n                    <div class="info_app">\n                        <p class="name_app"><#=app_info.app_name#></p>\n                        <# if(pt==103){ #>\n                        <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._category#></span><em>|</em><span class="compacity"><#=app_info._app_size#></span></p>\n                        <# } else if(pt==104){ #>\n                        <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._app_size#></span><em>|</em><span class="compacity"><#=app_info._down_count#></span></p>\n                        <# } #>\n                        <!--星级评分-->\n                        <p class="grade_app" id="js_app_rating_<#=pos_type#>">\n                            <!--\n                                半星：star_half\n                                一星：star_one\n                                一星半：star_one_half\n                                二星：star_two\n                                三星：star_three\n                                四星：star_four\n                                五星：star_five\n                            -->\n                            <span class="js_stars stars" style="display:none;"></span>\n                            <!--暂无评分\n                            <span class="scores">3.5</span>\n                            -->\n                            <span class="js_scores scores"></span>\n                        </p>\n                        <div class="dm_app">\n                            <a id="js_appdetail_action_<#=pos_type#>" class="ad_btn btn_download js_ad_btn"><#=shortAppBtnText#></a>\n                            <p class="extra_info">来自<# if(pt==103){ #>App Store<# }else{ #>腾讯应用宝<# } #></p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==105){ #>\n            <div class="mpda_card cardticket">\n                <div class="cardticket_hd cell">\n                    <div class="cell_hd">\n                        <span class="radius_avatar">\n                            <img class="avatar js_alazy_img" data-src="<#=card_info.card_logo_url#>" >\n                        </span>\n                    </div>\n                    <div class="cell_bd cell_primary"><#=card_info.card_title#></div>\n                    <div class="cell_ft">\n                        <a class="btn btn_plain_primary btn_inline js_ad_btn" id="js_card_action_<#=pos_type#>">领券</a>\n                    </div>\n                </div>\n                <div class="cardticket_ft">\n                    <div class="cardticket_theme"></div>\n                    <p class="cardticket_source tips_global"><#=card_info.card_brand_name#></p>\n                </div>\n            </div>\n            <# }else if(pt==106){ #>\n            <!-- 小店广告 -->\n            <div class="preview_group preview_card preview_shop_card">\n                <div class="preview_group_inner shop_card_inner">\n                    <div class="preview_group_info">\n                        <strong class="preview_shop_card_title"><#=mp_shop_info.name#></strong>\n                        <div class="preview_shop_card_desc">\n                            <span class="preview_card_desc_meta btn_plain_primary preview_shop_card_btn_buy js_ad_btn" id="js_shop_action_<#=pos_type#>">购买</span>\n                            <span class="preview_card_desc_meta preview_shop_card_oldprice">&yen;<#=mp_shop_info.ori_price/100#></span>\n                            <span class="preview_card_desc_meta preview_shop_card_price">&yen;<#=mp_shop_info.cur_price/100#></span>\n                        </div>\n                        <img data-src="<#=mp_shop_info.img#>" alt="" class="preview_card_avatar js_alazy_img">\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==111||pt==113||pt==112||pt==114){ #>\n            <!-- 背景高斯模糊带描述文字、带背景图的app下载 -->\n            <div class="preview_group download_app_with_desc js_download_app_card">\n                <div class="preview_group_inner" style="background-image:url(<#=image_url#>)">\n                    <div class="preview_group_hd">\n                        <div class="preview_group_hd_inner">\n                            <img data-src="<#=app_info.icon_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                            <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                            <a id="js_appdetail_action_<#=pos_type#>" class="preview_group_btn js_ad_btn"><#=shortAppBtnText#></a>\n                            <!-- <a id="js_app_action_<#=pos_type#>" class="preview_group_btn">继续</a>\n                            <a id="js_app_action_<#=pos_type#>" class="preview_group_btn">打开</a> -->\n                            <!-- <a id="js_app_action_<#=pos_type#>" class="preview_group_btn with_processor"><i class="btn_processor" style="width:35%;"></i><span class="btn_processor_value">35%</span></a> -->\n                        </div>\n                    </div>\n                    <# if(pt==111||pt==113){ #>\n                    <div class="preview_group_bd">\n                        <div class="preview_group_desc"><#=hint_txt.split(\'|\')[0]#></div>\n                        <div class="preview_group_desc"><#=hint_txt.split(\'|\')[1] || ""#></div>\n                    </div>\n                    <div class="preview_group_ft"><div class="preview_group_download_info"><span class="download_size" ><#=app_info.app_size#></span>&nbsp;来自<# if(pt==111){ #>App Store<# }else{ #>腾讯应用宝<# } #></div></div>\n                    <# } #>\n                </div>\n            </div>\n            <# }else if(pt==122||pt==121){ #>\n            <!-- app下载类广告 -->\n            <!--117 新卡片 begin -->\n            <div class="preview_group mod_method117">\n                <div class="wx_flex_layout">\n                    <div class="wx_flex_bd">\n                        <img class="fwi_thumb js_alazy_img" data-src="<#=image_url#>" alt="">\n                    </div>\n                    <div class="wx_flex_ft">\n                        <span class="radius_avatar"><img data-src="<#=app_info.icon_url#>" alt="" class="js_alazy_img"></span>\n                        <strong class="fwi_nickname"><#=app_info.app_name#></strong>\n                        <a id="js_appdetail_action_<#=pos_type#>" class="wx_min_plain_btn primary js_ad_btn"><#=shortAppBtnText#></a>\n                        <!-- <a href="#" class="wx_min_plain_btn primary btn_progress">\n                            <span class="btn_progress_inner" style="width:37%;">\n                                <span class="btn_progress_bd" style="width:57px;">暂停</span>\n                            </span>\n                            暂停\n                        </a> -->\n                    </div>\n                </div>\n            </div>\n            <!--117 end-->\n            <!--互选广告 begin-->\n            <# }else if(pt==125 || pt==140 || pt==142){ #>\n            <div class="da_area">\n              <div class="da_inner">\n                <!--广告头部-->\n                <div class="da_hd">\n                  <div class="da_video_area">\n                    <!-- <span class="da_video_bg_cover" id="js_main_img" style="background-image:url(<#=video_info.thumbUrl#>)"></span> -->\n                    <!--放视频-->\n                    <div id="js_video_container"></div>\n                  </div>\n                </div>\n                <!--广告信息-->\n                <div class="da_bd">\n                  <div class="da_brand_info">\n                    <span class="da_brand_info_hd" style="background-image:url(<#=biz_info.head_img#>)"></span>\n                    <div class="da_brand_info_content">\n                      <p class="da_brand_info_title"><#=biz_info.nick_name#></p>\n                    </div>\n                  </div>\n                  <a class="da_btn_more">\n                    <# if(dest_type==6){ #><span class="icon26_weapp_blue"></span><# } #>\n                    \n                    <# if (dest_type==9){ #>\n                        查看详情\n                    <# }else if (watermark_type==7){ #>\n                        小游戏推广\n                    <# }else if (watermark_type==8){ #>\n                        进入小游戏\n                    <# }else if (product_type==46){ #>\n                        进入小游戏\n                    <# }else{ #>\n                        查看详情\n                    <# } #>\n                </a>\n                </div>\n              </div>\n            </div>\n            <# } #>\n            <!--互选广告 end-->\n        <# }else{ #>\n            <!--新协议-->\n            <# if(material_type == 9){ #>\n            <!--视频-->\n            <div class="da_area">\n              <div class="da_inner">\n                <!--广告头部-->\n                <div class="da_hd">\n                  <div class="da_video_area">\n                    <!-- <span class="da_video_bg_cover" id="js_main_img" style="background-image:url(<#=video_info.thumbUrl#>)"></span> -->\n                    <!--放视频-->\n                    <div id="js_video_container"></div>\n                  </div>\n                </div>\n                <!--广告信息-->\n                <div class="da_bd">\n                  <div class="da_brand_info">\n                    <span class="da_brand_info_hd" style="background-image:url(<#=biz_info.head_img#>)"></span>\n                    <div class="da_brand_info_content">\n                      <p class="da_brand_info_title"><#=biz_info.nick_name#></p>\n                    </div>\n                  </div>\n                  <# if (product_type==12 || product_type==19){ #>\n                  <!--<a id="js_ad_btn_<#=pos_type#>" class="da_btn_more wx_min_plain_btn ba_btn btn_progress">立即下载</a>-->\n                  <a id="js_ad_btn_<#=pos_type#>" class="appmsg_card_btn wx_min_plain_btn ba_btn btn_progress"><#=longAppBtnText#></a>\n                  <# }else{ #>\n                  <a class="da_btn_more">查看详情</a>\n                  <# } #>\n                </div>\n              </div>\n            </div>\n            <# }else if(material_type == 2){ #>\n            <!--图片-->\n                <# if (logo.indexOf("http://mmsns.qpic.cn/") == 0){ #>\n                    <div class="brand_logo"><img data-src="<#=logo#>" alt="logo图片" class="js_alazy_img"></div>\n                <# } #>\n                    <img class="appmsg_banner js_alazy_img" data-src="<#=image_url#>">\n                    <i class="promotion_tag" id="js_promotion_tag">\n                    <# if(dest_type==6){ #>\n                    <span class="icon26_weapp_white"></span>\n                    <# } #>\n\n                    <# if (product_type==12 || product_type==19){ #>\n                        <#=longAppBtnText#>\n                    <# } #>\n                    </i>\n            <# } #>\n        <# } #>\n    </div>\n</div>\n';
});define("a/mpshop.js",["biz_common/dom/event.js","biz_common/utils/report.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","biz_wap/utils/openUrl.js"],function(t){
"use strict";
function e(t,e){
s("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+t+e.report_param);
}
function i(t){
var i=t.adData,s=t.pos_type||0,a=i.tid,l=i.type,m=(i.adid,i.outer_id),c=i.url,j=i.rl,u={};
t.report_param=t.report_param||"";
var d=t.btn;
if(d){
o.on(d,"click",function(i){
if(!u[a]){
u[a]=!0;
var o,d,b,z,f=!!i&&i.target;
f&&(o=p.getX(f,"js_ad_link")+i.offsetX,d=p.getY(f,"js_ad_link")+i.offsetY,b=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
z=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
n({
type:l,
report_type:2,
click_pos:0,
url:encodeURIComponent(c),
tid:a,
rl:encodeURIComponent(j),
__biz:biz,
pos_type:s,
pt:106,
pos_x:o,
pos_y:d,
ad_w:b||0,
ad_h:z||0
},function(){
u[a]=!1,e(61,t),_(r.join(c,{
outer_id:m
}));
});
}
return!1;
});
}
}
var o=t("biz_common/dom/event.js"),s=t("biz_common/utils/report.js"),a=t("a/a_report.js"),n=a.AdClickReport,p=(t("biz_wap/utils/ajax.js"),
t("biz_wap/utils/position.js")),r=(t("biz_wap/jsapi/core.js"),t("biz_common/utils/url/parse.js")),_=t("biz_wap/utils/openUrl.js").openUrlWithExtraWebview;
return i;
});define("a/wxopen_card.js",["biz_wap/jsapi/core.js","biz_common/utils/report.js","biz_wap/utils/mmversion.js","biz_common/utils/monitor.js","biz_wap/utils/openUrl.js"],function(e){
"use strict";
function i(e,i){
c("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+i);
}
function t(e){
var t=e.url||"";
t=t.replace(/&amp;/g,"&");
var n=t.indexOf("?"),c=0;
(119==e.pt||120==e.pt)&&(c=2),e.report_param="&tid="+e.traceid+"&ticket="+e.ticket+"&aid="+e.aid,
t.indexOf("?")>=0?t=t.slice(0,n)+".html"+t.slice(n):t+=".html";
var _="",l="";
if(document.getElementsByTagName("mpcpc")[0]&&document.getElementsByTagName("mpcpc")[0].dataset&&(_=document.getElementsByTagName("mpcpc")[0].dataset.category_id_list),
"undefined"==typeof w){
var w;
w=window.cgiData&&window.cgiData.__biz?window.cgiData.__biz:window.parent.biz;
}
l=e.traceid+":"+_+":"+w+":"+e.aid+":"+e.pos_type,console.log("sceneNote",l);
var g={
scene:1067,
sceneNote:l,
userName:e.weapp_info.original_id+"@app",
relativeURL:t,
appVersion:1
},f=!1,v=navigator.userAgent.match(/MicroMessenger\/(\d+)\.(\d+)\.(\d+)/);
if(v){
var b=Number(v[1]),j=Number(v[2]),z=Number(v[3]);
b>6?f=!0:6===b&&j>5?f=!0:6===b&&5===j&&z>=3&&(f=!0);
}
return console.log("canJumpOnTap : ",f,e.weapp_info.original_id,navigator.userAgent),
f?(u.setSum(110696,0,1),o?u.setSum(110696,3,1):(o=!0,a=+new Date),r?+new Date-r<2e3&&(u.setSum(110696,4,1),
setTimeout(function(){
r=0;
},2e3)):r=+new Date,p?+new Date-p<3e3&&(u.setSum(110696,5,1),setTimeout(function(){
p=0;
},3e3)):p=+new Date,s?+new Date-s<4e3&&(u.setSum(110696,6,1),setTimeout(function(){
s=0;
},4e3)):s=+new Date,void m.invoke("openWeApp",g,function(t){
var n=+new Date-a;
"openWeApp:ok"===t.err_msg&&i(125+c,e.report_param),"system:function_not_exist"===t.err_msg&&(d("https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect"),
i(126+c,e.report_param)),u.setAvg(110696,2,n).send(),o=!1;
})):(d("https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect"),
void i(126+c,e.report_param));
}
function n(e){
m.invoke("preloadMiniProgramContacts",{
userNames:[e.weapp_info.original_id+"@app"]
},function(e){
console.log(e);
}),m.invoke("preloadMiniProgramEnv",{
userNames:[e.weapp_info.original_id+"@app"]
},function(e){
console.log(e);
});
}
var o,a,r,p,s,m=e("biz_wap/jsapi/core.js"),c=e("biz_common/utils/report.js"),u=(e("biz_wap/utils/mmversion.js"),
e("biz_common/utils/monitor.js")),d=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview;
return{
openWxopen:t,
startConnect:n
};
});define("a/card.js",["biz_common/dom/event.js","biz_common/utils/report.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","biz_wap/jsapi/core.js","biz_wap/jsapi/cardticket.js"],function(e,t,a,i){
"use strict";
function o(e,t){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function s(e){
var t=e.adData,a=e.pos_type||0,i=t.tid,r=t.type,p=t.url,d=t.rl,l={};
e.report_param=e.report_param||"";
var m=e.btn;
if(m){
n.on(m,"click",function(n){
if(!l[i]){
l[i]=!0;
var m,j,u,f,b=!!n&&n.target;
b&&(m=_.getX(b,"js_ad_link")+n.offsetX,j=_.getY(b,"js_ad_link")+n.offsetY,u=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
f=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
c({
type:r,
report_type:2,
click_pos:0,
url:encodeURIComponent(p),
tid:i,
rl:encodeURIComponent(d),
__biz:biz,
pos_type:a,
pt:105,
pos_x:m,
pos_y:j,
ad_w:u||0,
ad_h:f||0
},function(){
l[i]=!1,o(37,e),s.openCardDetail(t.card_id,t.card_ext,e);
});
}
return!1;
});
}
}
var n=e("biz_common/dom/event.js"),r=e("biz_common/utils/report.js"),p=e("a/a_report.js"),c=p.AdClickReport,_=(e("biz_wap/utils/ajax.js"),
e("biz_wap/utils/position.js")),d=(e("biz_wap/jsapi/core.js"),e("biz_wap/jsapi/cardticket.js"));
return s.openCardDetail=function(e,t,a){
d.openCardDetail({
card_id:e,
card_ext:t,
success:function(){
!!a&&o(38,a);
},
error:function(){
!!a&&o(39,a),i("调起卡券错误");
},
access_denied:function(){
!!a&&o(40,a),i("异常错误[access_denied]");
}
});
},s;
});define("biz_wap/utils/position.js",[],function(){
"use strict";
function e(t,f){
var s=t.offsetLeft;
if(t.offsetParent&&t.offsetParent.className){
var a=t.offsetParent.className;
-1==a.indexOf(f)&&(s+=e(t.offsetParent,f));
}
return s;
}
function t(e,f){
var s=e.offsetTop;
if(e.offsetParent&&e.offsetParent.className){
var a=e.offsetParent.className;
-1==a.indexOf(f)&&(s+=t(e.offsetParent,f));
}
return s;
}
return{
getX:e,
getY:t
};
});