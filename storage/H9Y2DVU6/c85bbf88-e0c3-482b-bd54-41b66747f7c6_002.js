// Copyright 2006-2018 ClickTale Ltd., US Patent Pending


window.ClickTaleGlobal = window.ClickTaleGlobal || {};
window.ClickTaleSettings = window.ClickTaleSettings || {};

ClickTaleGlobal.init = ClickTaleGlobal.init || {};
ClickTaleGlobal.scripts = ClickTaleGlobal.scripts || {};


ClickTaleGlobal.scripts.filter = ClickTaleGlobal.scripts.filter || (function () {
	var recordingThreshold = Math.random() * 100;

	return {
		isRecordingApproved: function(percentage) {
			return recordingThreshold <= percentage;
		}
	}
})();
	
		
// Copyright 2006-2018 ClickTale Ltd., US Patent Pending
// PID: 1027



/*browsers exclusion start*/function doOnlyWhen(toDoHandler, toCheckHandler, interval, times, failHandler) {
    if ((!toDoHandler) || (!toCheckHandler)) return;
    if (typeof interval == "undefined") interval = 1000;
    if (typeof times == "undefined") times = 20;

    if (--times < 0 && typeof failHandler === 'function') {
        failHandler();
        return;
    }
    if (toCheckHandler()) {
        toDoHandler();
        return;
    }

    setTimeout(function () { doOnlyWhen(toDoHandler, toCheckHandler, interval, times); }, interval);
}
doOnlyWhen(function () { if (window.ClickTaleSettings.PTC.okToRunPCC) { (function(){
window.ClickTaleSettings = window.ClickTaleSettings || {};
window.ClickTaleSettings.PTC = window.ClickTaleSettings.PTC || {};
window.ClickTaleSettings.PTC.originalPCCLocation = "P32_PID1027";

var f=!0,g=null,h=!1;var i;function j(a,b,c,d,e){a&&b&&("undefined"==typeof c&&(c=1E3),"undefined"==typeof d&&(d=20),0>--d?"function"===typeof e&&e():b()?a():setTimeout(function(){j(a,b,c,d,e)},c))}function k(a){var b="someText".trim,c=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;i=b&&!b.call(new String("\ufeff\u00a0"))?function(a){return a==g?"":b.call(a)}:function(a){return a==g?"":(a+"").replace(c,"")};return i(a)};function m(a,b){if(a&&a.nodeType&&9===a.nodeType)return h;var c=Element.prototype;m=function(a,c){return!a||!document.documentElement.contains(a)?h:m.e.call(a,c)};m.e=c.matches||c.webkitMatchesSelector||c.mozMatchesSelector||c.msMatchesSelector;return m(a,b)}function n(a,b){n=Element.prototype.closest?function(a,b){return!(a&&a instanceof Element)?g:Element.prototype.closest.call(a,b)}:function(a,b){for(;a&&!m(a,b);)a=a.parentElement;return a};return n(a,b)};var o=h,p=Object.defineProperty&&Object.defineProperty({},"passive",{get:function(){o=f}});document.addEventListener("test",function(){},p);var q=o?{passive:f,capture:f}:f,r=o?{passive:f,capture:h}:h;function s(a){function b(){2==++s.f&&a()}t(b);if("function"==typeof ClickTaleIsRecording&&ClickTaleIsRecording()===f)b();else{var c=window.ClickTaleOnRecording||function(){};window.ClickTaleOnRecording=function(){b();return c.apply(this,arguments)}}}s.f=0;
function t(a){function b(){c||(c=f,a())}var c=h;"loading"!=document.readyState?b():document.addEventListener&&document.addEventListener("DOMContentLoaded",b,h)}
function u(a,b,c,d,e){"string"===typeof a?(a=document.querySelectorAll(a),Array.prototype.forEach.call(a,function(a){u(a,b,c,d,e)})):a instanceof Array||a instanceof NodeList?Array.prototype.forEach.call(a,function(a){u(a,b,c,d,e)}):a.addEventListener(b,function(a,b,c,d,e){return function(y){if("function"===typeof c)c.apply(this,arguments),e&&a.removeEventListener(b,arguments.callee,r);else{var l=n(y.target,c);l&&a.compareDocumentPosition(l)&Node.DOCUMENT_POSITION_CONTAINED_BY&&(d.apply(l,arguments),
e&&a.removeEventListener(b,arguments.callee,r))}}}(a,b,c,d,e),r)}
function v(a,b,c,d,e){"string"===typeof a?(a=document.querySelectorAll(a),Array.prototype.forEach.call(a,function(a){v(a,b,c,d,e)})):a instanceof Array||a instanceof NodeList?Array.prototype.forEach.call(a,function(a){v(a,b,c,d,e)}):a.addEventListener(b,function(a,b,c,d,e){return function(y){if("function"===typeof c)c.apply(this,arguments),e&&a.removeEventListener(b,arguments.callee,q);else{var l=n(y.target,c);l&&a.compareDocumentPosition(l)&Node.DOCUMENT_POSITION_CONTAINED_BY&&(d.apply(l,arguments),
e&&a.removeEventListener(b,arguments.callee,q))}}}(a,b,c,d,e),q)}function w(a,b){document.addEventListener("mouseup",function(c){a===c.target&&b();document.removeEventListener("mouseup",arguments.callee,r)},r)}function x(a,b){document.addEventListener("mouseup",function(c){a===c.target&&b();document.removeEventListener("mouseup",arguments.callee,q)},f)}
function z(a,b){function c(c){document.removeEventListener("touchend",arguments.callee,r);a===c.target&&b()}document.addEventListener("touchend",c,r);document.addEventListener("touchmove",function(a){document.removeEventListener("touchmove",arguments.callee,r);document.removeEventListener("touchend",c,r)},h)}
function A(a,b){function c(c){document.removeEventListener("touchend",arguments.callee,q);a===c.target&&b()}document.addEventListener("touchend",c,q);document.addEventListener("touchmove",function(a){document.removeEventListener("touchmove",arguments.callee,q);document.removeEventListener("touchend",c,q)},q)}function B(a,b){var c=C();c&&(B=c.m?z:w,B(a,b))}function D(a,b){var c=C();c&&(D=c.m?A:x,D(a,b))}
function E(a,b){for(var c=0;c<a.length;c++){var d=a[c];if(d)if("string"===typeof d){if(d=k(d))F(d),b&&(50<d.length&&(d=d.substr(d.length-50)),H(b,d))}else Array.isArray(d)&&E(d,b)}};function I(a){if(window.CSS&&"function"===typeof window.CSS.escape)I=function(a){return window.CSS.escape.call(window.CSS,a)};else{var b=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,c=function(a,c){return c?"\x00"===a?"\ufffd":a.slice(0,-1)+"\\"+a.charCodeAt(a.length-1).toString(16)+" ":"\\"+a};I=function(a){return(a+"").replace(b,c)}}return I(a)};function H(a,b){window.ClickTaleMonitor&&"function"===typeof ClickTaleMonitor.addPageTag&&(H=function(a,b){!isNaN(a)&&b&&ClickTaleMonitor.addPageTag(a,b)},H(a,b))}
function J(){var a=h;if(window.ClickTaleMonitor&&"function"===typeof window.ClickTaleMonitor.isMonitoring&&window.ClickTaleMonitor.isMonitoring())a=f;else if(window.ClickTaleMonitor){var b=window.ClickTaleMonitor&&ClickTaleMonitor.Settings&&"function"==typeof ClickTaleMonitor.Settings.get?ClickTaleMonitor.Settings.get():g;if(b)b.onStart(function(){J.state=f})}else return j(J,function(){return!!window.ClickTaleMonitor},1E3,10),h;J=function(){return J.state};J.state=a;return J.state}J.state=h;J();function K(){"function"===typeof ClickTaleStop&&ClickTaleStop()}function F(a,b){"function"===typeof ClickTaleEvent&&(b?F.b[a]!==f&&(F.b[a]=f,ClickTaleEvent(a)):ClickTaleEvent(a))}F.b={};function L(a){"function"===typeof window.ClickTaleRegisterElementAction&&ClickTaleRegisterElementAction("click",a)}function M(a,b){var c={},d;for(d in a)c[d]=a[d];c.target=b;c.srcElement=b;L(c)}window.ClickTaleDetectAgent&&window.ClickTaleDetectAgent()&&window.ClickTaleDetectAgent();
function N(a,b){"object"==typeof a&&"string"==typeof b&&(window.ClickTaleContext&&-1!=document.referrer.indexOf(location.hostname)&&window.parent.ct&&window.parent.ct.ElementAddressing&&"function"===typeof window.parent.ct.ElementAddressing.setCustomElementID?window.parent.ct.ElementAddressing.setCustomElementID(a,b):(!window.ClickTaleContext&&"function"===typeof ClickTaleSetCustomElementID&&-1!=ClickTaleSetCustomElementID.toString().indexOf("duplicate registration of custom id")?N=function(a,b){a.ClickTale=
a.ClickTale||{};a.ClickTale.CustomID=b}:window.ClickTaleSetCustomElementID=window.ClickTaleSetCustomElementID||function(a,b){a.ClickTale=a.ClickTale||{};a.ClickTale.CustomID=b},window.ClickTaleSetCustomElementID(a,b)))}
function O(){Array.prototype.forEach.call(document.querySelectorAll('[id]:not([id=""])'),function(a){if(!m(a,'input[type="hidden"]')){var b=a.getAttribute("id");b.match(/(?:\r|\n)/)&&"function"===typeof ClickTaleNote&&ClickTaleNote("ctlib.api.SetCustomElementIdDuplicates: ids with line break found!");var a=document.querySelectorAll('[id="'+I(b)+'"]'),c=P;1<a.length&&!c[b]&&(c[b]=f,Array.prototype.forEach.call(a,function(a,c){N(a,b.replace(/(\r|\n|\r\n|\s+)+/g,"_").replace(/\W/g,"_")+"_"+c)}))}})}
var P={};function Q(a,b){"function"===typeof ClickTaleLogical&&(F.b={},P={},b?ClickTaleLogical(a,b):ClickTaleLogical(a))}function C(){if("function"===typeof ClickTaleDetectAgent){var a=ClickTaleDetectAgent();if(a)return C=function(){return a},C()}return g}
function S(){var a;if(!a){a="mousedown";if("boolean"!=typeof T){var b=C();b&&(T=b.m)}T&&(a="touchstart")}T?v(document,"touchstart","label[for]",function(a){var b=a.target,e=this;D(b,function(a){return function(){var b,c;if((b=a.getAttribute("for"))&&(c=document.getElementById(b)))b=c,"function"===typeof ClickTaleRegisterTouchAction&&(c=b.getBoundingClientRect(),ClickTaleRegisterTouchAction(b,c.left+document.body.scrollLeft,c.top+document.body.scrollTop))}.bind(e)}(b,a))}):v(document,a,"img, a, button, textarea, input, select",
function(a){var b=a.target,e=this;D(b,function(a,b){return function(){if(m(this,"button,a,textarea")&&this!=a)M(b,this);else{var c=function(){};document.addEventListener("click",function(a){return c=function(b){b.target===a&&(U=f);document.removeEventListener("click",arguments.callee,h)}}(a),h);setTimeout(function(){U||L(b);document.removeEventListener("click",c,h);U=void 0},200)}}.bind(e)}(b,a))})}var T,U;
function V(a,b,c,d){V.d&&(V.d=h,d=d||400,"number"==typeof c&&(d=c,c=""),b=b||document.location.href,K(),window.ClickTaleIncludedOnDOMReady=f,window.ClickTaleIncludedOnWindowLoad=f,"function"===typeof ClickTaleUploadPage&&ClickTaleUploadPage(void 0,void 0),Q(b,c),a(),setTimeout(function(){V.d=f},d))}V.d=f;var aa=F,ba=B;var W=h,X=f,Y=location.href;function Z(){O();var a=W.toString();"function"===typeof ClickTaleField&&ClickTaleField("isMobile",a);Y=location.href;if(X)X=h;else for(var a=window.ClickTaleSettings&&window.ClickTaleSettings.PTC&&window.ClickTaleSettings.PTC.InitFuncs?window.ClickTaleSettings.PTC.InitFuncs:[],b=0,c=a.length;b<c;b++)if("function"===typeof a[b])a[b]()}
function ca(){if(!window.ClickTaleFirstPCCGo){window.ClickTaleFirstPCCGo=f;var a=C();a&&(W=a.m);Z();u(document,W?"touchstart":"mousedown","selectorHere",function(a){var c=a.target;ba(c,function(a,b,c){return function(){}.bind(c)}(c,a,this))})}}s(function(){S();ca()});window.clickTaleStartEventSignal=function(a){V(Z,location.href,Y);a&&"string"===typeof a&&aa(a)};window.clickTaleEndEventSignal=function(){K()};
window.ClicktaleIntegrationExperienceHandler=function(a,b,c){var d;return function(){var e=this,G=arguments,R=c&&!d;clearTimeout(d);d=setTimeout(function(){d=g;c||a.apply(e,G)},b);R&&a.apply(e,G)}}(function(){V(Z,document.location.href);arguments.length&&E(arguments)},400,h);})();} }, function () { return !!(window.ClickTaleSettings && window.ClickTaleSettings.PTC && typeof window.ClickTaleSettings.PTC.okToRunPCC != 'undefined'); }, 500, 20);


//Signature:AKq7bRzGZ+X/22ayG5Rm7wTSC2WYHeixb0gUW1RnVU+NBtv3+bdnKZKv04UrR+KgpVyxLOoildo+3qpaLqGeLq3UDBWEkNllteKi8i5cKYptIGaFUDPhEE0rFo6D1jF3hZJGVtvauKY6efwPhggkEoApCW27JmXTJjMndP3tyWA=