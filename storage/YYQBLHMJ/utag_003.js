//~~tv:20010.20140827
//~~tc: Tealium Custom Container

/*
  Tealium Custom Container Notes:
  - Add sending code between "Start Tag Sending Code" and "End Tag Sending Code".
  - Add JavaScript tag library code between "Start Tag Library Code" and "End Tag Library Code".
  - Add JavaScript code only, do not add HTML code in this file.
  - Remove any <script> and </script> tags from the code you place in this file.

  Loading external JavaScript files (Loader):
  - If you need to load an additional external JavaScript file, un-comment the singe-line JavaScript comments ("//") within the following Loader sections near the bottom of this file:
      - "Start Loader Function Call"
      - "End Loader Function Call"
      - "Start Loader Callback Function"
      - "End Loader Callback Function"
  - After un-commenting, insert the path to the external JavaScript file you want to load.
  - Finally, within the Loader callback function, insert the JavaScript code that should run after the external JavaScript file has loaded.
*/

/* Start Tag Library Code */
/* End Tag Library Code */

//tealium universal tag - utag.sender.custom_container ut4.0.201809062317, Copyright 2018 Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;

    // Start Tealium loader 4.32
    // Please do not modify
    if (utag === undefined) { utag = {}; } if (utag.ut === undefined) { utag.ut = {}; } if (utag.ut.loader === undefined) { u.loader = function (o) { var a, b, c, l; a = document; if (o.type === "iframe") { b = a.createElement("iframe"); b.setAttribute("height", "1"); b.setAttribute("width", "1"); b.setAttribute("style", "display:none"); b.setAttribute("src", o.src); } else if (o.type === "img") { utag.DB("Attach img: " + o.src); b = new Image(); b.src = o.src; return; } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.charset = "utf-8"; b.src = o.src; } if (o.id) { b.id = o.id; } if (typeof o.cb === "function") { if (b.addEventListener) { b.addEventListener("load", function () { o.cb(); }, false); } else { b.onreadystatechange = function () { if (this.readyState === "complete" || this.readyState === "loaded") { this.onreadystatechange = null; o.cb(); } }; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l === "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } }; } else { u.loader = utag.ut.loader; }
    // End Tealium loader

    u.ev = {'view' : 1};

    u.initialized = false;

      u.map={};
  u.extend=[];


    u.send = function(a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {
        //##UTENABLEDEBUG##utag.DB("send:##UTID##");

        var c, d, e, f, i;

        u.data = {
          /* Initialize default tag parameter values here */
          /* Examples: */
          /* "account_id" : "1234567" */
          /* "base_url" : "//insert.your.javascript.library.url.here.js" */
          /* A value mapped to "account_id" or "base_url" in TiQ will replace these default values. */
        };


        /* Start Tag-Scoped Extensions Code */
        /* Please Do Not Edit This Section */
        
        /* End Tag-Scoped Extensions Code */


        /* Start Mapping Code */
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              u.data[e[f]] = b[d];
            }
          }
        }
        /* End Mapping Code */


        /* Start Tag Sending Code */

          // Copyright 2006-2018 ClickTale Ltd., US Patent Pending

window.ClickTaleGlobal=window.ClickTaleGlobal||{},ClickTaleGlobal.init=window.ClickTaleGlobal.init||{},function(){function t(){this.started=!1,this.stopCallbacks=[],this.readyCallbacks=[],this.startCallbacks=[],this.xhrCreatedCallback=function(){},this.shouldStartMonitorCallback=function(){}}function n(t){return!!t&&t.constructor.prototype===Object.prototype}t.onReady=function(o,i){var a=t.get(),e=a.shouldStartMonitorCallback();if("undefined"===typeof e||!1!==e){var c=a.readyCallbacks,r=c.length;a.diagnose("onready");for(var l=0;l<r;l++)c[l]();if(!a.started){var d,s=a.config,u=n(o),f=function(t){a.started=!0,a.addApplication(t),a.startCallbacks.forEach(function(t){t()})};u&&(o.onStartCallback=f,(d=n(i))?s=i:d=!!s),new ClickTaleMonitor.App(192,u?o:f,d?s:o,d?void 0:i).onStop(function(n){a&&(a.stopCallbacks.forEach(function(t){t()}),t.instance=void 0)})}}else t.instance=void 0};var o=t.prototype;if(o.addApplication=function(t){this.monitor=t},o.configure=function(t){this.config=function t(o,i){for(var a in i=i||{},o){var e=o[a];e instanceof Array?i[a]=e.slice():n(e)?i[a]=t(e,i[a]):i[a]=e}return i}(t,this.config)},o.onStart=function(t){this.monitor&&this.monitor.isMonitoring()?t():this.startCallbacks.push(t)},o.onStop=function(t){this.stopCallbacks.push(t)},o.onReady=function(t){this.readyCallbacks.push(t)},o.onXhrCreated=function(t){this.xhrCreatedCallback=t},o.shouldStartMonitor=function(t){this.shouldStartMonitorCallback=t},o.diagnose=function(t){var n=ClickTaleGlobal.diagnostics,o=n&&n.invoke;if("function"==typeof o)o(n.monitor,t);else{var i=n&&n.monitor,a=i&&i[t];"function"==typeof a&&a()}},t.get=function(){return t.instance||(t.instance=new t)},Object.defineProperty)try{Object.defineProperty(t,"config",{get:function(){return t.instance?t.instance.config:null},enumerable:!0,configurable:!0})}catch(t){}function i(n,o){var i=t.instance;if(i&&i.monitor)return i.monitor[n].apply(i.monitor,o)}var a={stop:function(){i("dispose")},restart:function(t,n){i("restart",[t,n])},shutdown:function(){i("shutdown")},addEvent:function(t){i("addEvent",[t])},addPageTag:function(t,n,o){i("addPageTag",[t,3,o||n])},ctData:function(t){i("ctData",[t])},addDynamicAction:function(t,n){i("addPageTag",[t,4,n])},isMonitoring:function(){return!!i("isMonitoring")},getPid:function(){return 192},getState:function(){return t.get().started?i("getState"):"pending"},endVisit:function(){i("endVisit")},Settings:t},e=window.ClickTaleMonitor||{};for(var c in a)e[c]=a[c];window.ClickTaleMonitor=e}(),ClickTaleGlobal.init.pmc=function(t){var n=ClickTaleGlobal.init.monitorScriptName;var o,i,a,e,c=window.ClickTaleScriptSource+n.toLowerCase();ClickTaleMonitor.Settings.get().configure(t),n&&(o=c,e=ClickTaleMonitor.Settings.get(),onloaded=function(){i.onreadystatechange=i.onload=null,e.diagnose("onloaded")},(a=document.body||document.head)&&((i=function(t){if(document.documentElement.namespaceURI)try{return document.createElementNS("http://www.w3.org/1999/xhtml",t)}catch(t){}return document.createElement(t)}("script")).onreadystatechange=function(){"loaded"===i.readyState&&onloaded()},i.onload=onloaded,i.src=o,i.async=!0,i.type="text/javascript",i.crossOrigin="anonymous",e.diagnose("onloading"),a.appendChild(i)))};

window.ClickTaleGlobal = window.ClickTaleGlobal || {};
window.ClickTaleSettings = window.ClickTaleSettings || {};

ClickTaleGlobal.init = ClickTaleGlobal.init || {};
ClickTaleGlobal.scripts = ClickTaleGlobal.scripts || {};

	
(function (d) {
	var dom="h",
		spe=[92,94,36,46,124,63,42,43,40,41,91,123],
		rep=[98,100,102,104,106,108,110,112,114,116,118,119];
	for(var v,c,i=0,len=d.length;i<len,c=d.charCodeAt(i);i++){		
		if(c>=97&c<=122){v=c+7;v=v>122?v-26:v;v=v%2==0?v-32:v;}
		else if(c>=48&c<=57){v=69+(c-48)*2}
		else if(c==45){v=65}
		else if(spe.indexOf(c)>=0){v=rep[spe.indexOf(c)]}
		else{v=c}
		dom+=String.fromCharCode(v);
	}

	ClickTaleGlobal.init.isAllowed = (function() {
						var doms = ["HTHgVuHDZhJVT","HyRhPuaLshJVT","isVNZhPuaLshJVT","iBPskLyZhPuaLshJVT","JoHuuLsayHPuPuNhPuaLshJVT","JsVBkiBPskLyZhPuaLshJVT","JVTTBuPaPLZhPuaLshJVT","JVuuLJahPuaLshJVT","kVDusVHkJLuaLyhPuaLshJVT","LTiLkkLkhJVTTBuPaPLZhPuaLshJVT","LTLHAwVPuaZhPuaLsaLJouVsVNFwyVcPkLyhJVT","LuNHNLhPuaLshJVT","NHTLhPuaLshJVT","NHTLwsHFhPuaLshJVT","PuaLshJVT","PuaLsPuZPkLhPuaLshJVT","PVaLcLuaZhPuaLshJVT","PXhPuaLshJVhqw","PXhPuaLshJVhBR","PXhPuaLshJVT","PXhPuaLshJVThHB","PXhPuaLshJVThiy","PXhPuaLshJVThay","PXhPuaLshkL","PXhPuaLshLZ","PXhPuaLshmy","PXhPuaLshPu","PXhPuaLshPa","PXhPuaLshsH","PXhPuaLshus","PXhPuaLshws","PXhPuaLshyB","PawLLyuLaDVyRhPuaLshJVT","qViZhPuaLshJVT","THPHAkLchkLsHPyAHuHsFaPJZhJVT","TFZBwwVyahHsaLyHhJVT","uLDZyVVThPuaLshJVT","VuZPaLIhyLZLHyJoPuaLshJVT","wsHuhZLLRhPuaLshJVT","wsHFLyZhiyPNoaJVcLhuLa","wyVJLZZVyTHaJohPuaLshJVT","yLHsZLuZLHwwhPuaLshJVT","yLNPZayHaPVuJLuaLyhPuaLshJVT","yPNJoHssLuNLhPuaLshJVT","ZoVwPVaTHyRLawsHJLhJVT","ZuHwZoVahPuaLshJVT","ZVmaDHyLhPuaLshJVT","ZVmaDHyLhZLLRhPuaLshJVT","ZVsBaPVuZkPyLJaVyFhPuaLshJVT","ZaHNPuNhLewsVyLPuaLshJVT","ZBwwVyaaPJRLaZhPuaLshJVT","ZFZaLTkLZPNuhHsaLyHhJVT","aLJowyVcPkLyhPuaLshJVT","aoBukLyiVsaaLJouVsVNFhuLa","DLiPuHyhPuaLshJVT","HsaLyHhJVhqw","HsaLyHhJVT","HsaLyHhJVThJu","HTLyPJHZNyLHaLZaTHRLyZhJVT","iBFHsaLyHhJVT","PuZPNoahaLJo","PuaLshJH","PuaLshJu","PuaLshJuhJJNZsihJVT","PuaLshJVhPk","PuaLshJVhPs","PuaLshJVhqw","PuaLshJVhRy","PuaLshJVhBR","PuaLshJVhgH","PuaLshJVT","PuaLshJVThHB","PuaLshJVThiy","PuaLshJVThay","PuaLshJVThaD","PuaLshkL","PuaLshLZ","PuaLshLB","PuaLshmy","PuaLshPL","PuaLshPu","PuaLshPa","PuaLshsH","PuaLshTL","PuaLshTF","PuaLshus","PuaLshwo","PuaLshws","PuaLshyB","PuaLshZL","PuaLshZN","PuaLshBH","PuaLshcu","PuaLsmyLLwyLZZhJVT","ZaBkFhPuaLshJVT","aoHPsHukhPuaLshJVT","DDDAZZshPuaLshJVT"];
			if(location.protocol == "file:") return false;
			for(var i=0, curr; i < doms.length, curr = doms[i]; i++) {
								if(new RegExp("h" + curr + "$", "i").test(dom))
									return true;
			}
			return false;
					})()
})(window.location.host.toLowerCase().replace(/^((www)?\.)/i, ""));

ClickTaleSettings.Proxy = {
	WR: "ing-district.clicktale.net/ctn_v2/",
	ImageFlag: "ing-district.clicktale.net/ctn_v2/"
}
ClickTaleSettings.Protocol = {
	Method: "ImpactRecorder"
}
	var autoMonitorConfig = {
	transport: {
		url: 'https://conductor.clicktale.net/monitor'
	}
};
	ClickTaleGlobal.diagnostics=function(){function n(n,t,o){if(n&&t)for(var r in T){var e=T[r];e.collect(t)&&e.errors.push({message:n,url:t,lineno:o})}return!!S&&S(n,t,o)}function t(n){return"function"==typeof n}function o(){return performance?performance.now():Date.now()}function r(n){++n.sampled>n.repeats?g(n.name):e(n)}function e(n){var t=n.reporter()||{},o=n.errors.splice(0),r=n.level,e=n.url,l={loaded:n.loaded,ready:n.ready,started:n.started,level:o.length?"error":r,errors:encodeURIComponent(JSON.stringify(o))};e&&r!==k&&(n.timeToLoad>0&&(l.timeToLoad=n.timeToLoad),a(n,i(i(e+"?t=log&p="+n.pid,l),t),o))}function i(n,t){for(var o in t)n+="&"+I[o]+"="+t[o];return n}function a(n,o,r){var e=L.sendBeacon,i=function(n){n.errors=r.concat(n.errors)};if(t(e))e.call(L,o)||i(n);else{var a=new Image;a.onerror=a.ontimeout=function(){i(n)},a.timeout=3e4,a.src=o}}function l(n){T[n]&&(T[n].ready=!0)}function c(n){var t=T[n];t&&(t.loaded=!0,t.timeToLoad=t.loadStart?o()-t.loadStart:0),T[n]=t}function d(n){T[n]&&(T[n].loading=!0,T[n].loadStart=o())}function u(n){T[n]&&(T[n].started=!0)}function f(n){T[n]&&(T[n].starting=!0)}function s(n,o,r){var e=window.ClickTaleMonitor;e&&(I.monitorState=40,I.isMonitoring=42,t(e.getPid)&&v(M,e.getPid(),n||"https://conductor.clicktale.net/monitor",/\/monitor-(latest|[\d\.]+).*\.js$/i,function(){var n=t(e.getState)&&e.getState();return!this.errors.length&&n.match(/^(chunk|end)$/i)&&(this.level=k),{monitorState:n,isMonitoring:t(e.isMonitoring)&&e.isMonitoring()}},o||5e3,r||1))}function m(){g(M)}function v(t,o,r,e,i,a,l){T[t]=T[t]||new p(t,o,r,e,i,a,l),y||(S=window.onerror,window.onerror=n,y=!0)}function g(n){var t=T[n];t&&(clearInterval(t.sampler),delete T[n]);for(var o in T)return;y=!1}function p(n,t,o,e,i,a,l){var c=this;c.url=o,c.pid=t,c.errors=[],c.name=n,c.level="alert",c.repeats=l,c.loadStart=c.sampled=c.timeToLoad=0,c.loading=c.loaded=c.starting=c.started=c.ready=!1,c.reporter=function(){return i.call(c)},c.collect=function(n){return!!n.match(e)},c.sampler=setInterval(function(){r(c)},a)}function h(n,t,o){var r=n&&n.name,e=T[r];if(e){var i=e[t];"function"==typeof i&&i.apply(this,o)}}function w(n,t,o){return{on:t,off:o,onready:function(){l(n)},onloaded:function(){c(n)},onloading:function(){d(n)},onstarted:function(){u(n)},onstarting:function(){f(n)}}}var y,S,T={},L=navigator,k="info",M="monitor",I={level:0,loaded:2,ready:4,started:6,errors:8,timeToLoad:12};return{monitor:w(M,s,m),invoke:h}}();

ClickTaleGlobal.scripts.filter = ClickTaleGlobal.scripts.filter || (function () {
	var recordingThreshold = Math.random() * 100;

	return {
		isRecordingApproved: function(percentage) {
			return recordingThreshold <= percentage;
		}
	}
})();
	
		
// Copyright 2006-2018 ClickTale Ltd., US Patent Pending
// PID: 78
// WR destination: www41
// WR version: latest
// Recording ratio: 1

(function (){
	var dependencyCallback;
        var scriptSyncTokens = ["wr"];
        var ct2Callback, isRecorderReady;
    var dependencies = scriptSyncTokens.slice(0);
    var clickTaleOnReadyList = window.ClickTaleOnReadyList || (window.ClickTaleOnReadyList = []);
    var indexOf = (function(){if(Array.prototype.indexOf){return function(array,value){return array.indexOf(value)}}return function(array,value){var length=array.length;for(var i=0;i<length;i++){if(array[i]===value){return i}}return -1}})();
    function isValidToken(token) {
        if (indexOf(scriptSyncTokens, token) > -1) {
            var index = indexOf(dependencies, token);

            if (index > -1) {
                dependencies.splice(index, 1);
                return true;
            }
        }

        return false;
    }

    clickTaleOnReadyList.push(function () {
        if (ct2Callback) {
            ct2Callback();
        }

        isRecorderReady = true;
    });

    ClickTaleGlobal.scripts.dependencies = {
        setDependencies: function (deps) {
            scriptSyncTokens = deps;
        },
        onDependencyResolved: function (callback) {
            dependencyCallback = callback;
        },
        notifyScriptLoaded: function (token) {
            if (isValidToken(token)) {
                if (dependencies.length === 0 && typeof dependencyCallback === "function") {
                    dependencyCallback();
                }
            }
        }
    };

    ClickTaleGlobal.scripts.integration = {
        onReady: function (callback) {
            if (isRecorderReady) {
                callback();
            }
            else {
                ct2Callback = callback;
            }
        }
    };
})();
var ctVEconfig ={"VE_BASE_URL":"https://ve-cec-na1.app.clicktale.com/"};

window.ClickTaleGlobal.VisualEditorDesignerExists = !!72;

window.ClickTaleIsXHTMLCompliant = true;
if (typeof (ClickTaleCreateDOMElement) != "function")
{
	ClickTaleCreateDOMElement = function(tagName)
	{
		if (document.createElementNS)
		{
			return document.createElementNS('http://www.w3.org/1999/xhtml', tagName);
		}
		return document.createElement(tagName);
	}
}

if (typeof (ClickTaleAppendInHead) != "function")
{
	ClickTaleAppendInHead = function(element)
	{
		var parent = document.getElementsByTagName('head').item(0) || document.documentElement;
		parent.appendChild(element);
	}
}

if (typeof (ClickTaleXHTMLCompliantScriptTagCreate) != "function")
{
	ClickTaleXHTMLCompliantScriptTagCreate = function(code)
	{
		var script = ClickTaleCreateDOMElement('script');
		script.setAttribute("type", "text/javascript");
		script.text = code;
		return script;
	}
}	



// Start of user-defined pre WR code (PreLoad)
//PTC Code Version 9.8

window.ClickTaleSettings = window.ClickTaleSettings || {};
window.ClickTaleSettings.PTC = window.ClickTaleSettings.PTC || {};
window.ClickTaleSettings.Compression = window.ClickTaleSettings.Compression || {};
if (document.readyState === 'complete') {
    window.ClickTaleIncludedOnWindowLoad = true;
}
window.ClickTaleIncludedOnDOMReady = true;
window.ClickTaleSettings.PTC.EnableChangeMonitor = false;
window.ClickTaleSettings.PTC.UploadPageHappened = false;
window.ClickTaleSettings.PTC.IsMobile = false;
window.ClickTaleUIDCookieName = 'WRUIDAWS';

window.ClickTaleSettings.CheckAgentSupport = function(f, v) {
    if (v.t == v.ED) {
        window.ClickTaleSettings.Compression.Async = false;
    }
    if (v.m) {
        window.ClickTaleSettings.PTC.IsMobile = true;
    }
    if (!(v.t == v.IE && v.v == 10)) {
        window.ClickTaleSettings.PTC.EnableChangeMonitor = true;
        window.ClickTaleSettings.PTC.ConfigChangeMonitor();
    }
    var fv = f(v);
    window.ClickTaleSettings.PTC.okToRunPCC = fv;
    return fv;
};

//INTEL-40
if (location.href.indexOf('https://www.intel.com/buy/us/en/') != -1) {
    var innerScrollElem = document.querySelector('.mrm-outer-container');
    if (innerScrollElem) {
        var sHeight = innerScrollElem.scrollHeight;
        var sWidth = innerScrollElem.scrollWidth;
        if (sHeight && sWidth) {
            window.ClickTaleSettings.ScrollDimensions = {
                Width: sWidth,
                Height: sHeight
            };
        }
    }
}

window.ClickTaleSettings.PTC.startsWith = function(strToTest, str) {
    return strToTest.lastIndexOf(str, 0) === 0;
};

window.ClickTaleSettings.Protocol = {
    Method: "ImpactRecorder"
};

window.ClickTaleSettings.Proxy = {
    WR: "ing-district.clicktale.net/ctn_v2/",
    ImageFlag: "ing-district.clicktale.net/ctn_v2/"
};

window.ClickTaleSettings.PTC.RulesObj = [{
    selector: "input[type=\"text\"], input[type=\"tel\"], input[type=\"email\"]",
    changeMon: {
        Attributes: ['value'],
        Text: false
    },
    rewriteApi: {
        Attributes: ['value'],
        Text: false
    }
}, {
    selector: ".ctHidden",
    changeMon: {
        Attributes: ['value'],
        Text: true
    },
    rewriteApi: {
        Attributes: ['value'],
        Text: true
    }
}];

window.ClickTaleSettings.PTC.RulesObjRemoveEls = [];

;
(function() {
    if (typeof window.ClickTalePIISelector === 'string' && window.ClickTalePIISelector != '') {
        try {
            var domNodes = document.querySelectorAll(window.ClickTalePIISelector);
            if (domNodes) {
                window.ClickTaleSettings.PTC.RulesObj.push({
                    selector: window.ClickTalePIISelector,
                    changeMon: {
                        Attributes: ['value'],
                        Text: true
                    },
                    rewriteApi: {
                        Attributes: ['value'],
                        Text: true
                    }
                });
            }
        } catch (err) {}
    }
})();

window.ClickTaleSettings.PTC.cloneNodeIE9 = function(innerHTML) {
    if (innerHTML instanceof Element) {
        innerHTML = innerHTML.innerHTML;
    }

    var reg = /<(area|base|br|col|command|embed|hr|input|keygen|link|menuitem|meta|param|source|track|wbr|img)[^>]*>/gi;
    var newNode = document.createElement('div');
    var docFrag = document.createDocumentFragment();
    docFrag.appendChild(newNode);
    if (document.documentMode) {
        innerHTML = innerHTML
            .replace(/\$/g, '$$$$')
            .replace(/(<svg[\s\S]+?<\/svg>)/gi, function(m, g1) {
                if (g1) {
                    return '<!--clicktalesvgreplace ' + g1.replace(/<!--[\s\S]+?-->/g, '') + ' -->';
                }
                return m;
            });
    }
    innerHTML = innerHTML
        .replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, '<script><\/script>')
        .replace(/(<div id="?ClickTaleDiv"?[^>]+>)\s*<script[^>]+><\/script>\s*(<\/div>)/i, '$1$2')
        .replace(reg, '$&<\/$1>')
        .replace(/(<\/?)([A-Za-z])/g, '$1ctdep-$2')
        .replace(/ctdep-style/gi, 'style');

    newNode.innerHTML = innerHTML;

    return newNode;
};



window.ClickTaleSettings.PTC.ConfigChangeMonitor = function() {

    if (window.ClickTaleSettings.PTC.EnableChangeMonitor) {

        var a = document.createElement("script"),
            s = document.getElementsByTagName("script")[0];
        a.async = true;
        a.crossOrigin = "anonymous";
        a.type = "text/javascript";
        a.src = "https://cdnssl.clicktale.net/www/ChangeMonitor-latest.js";
        s.parentNode.insertBefore(a, s);

        window.ClickTaleSettings.ChangeMonitor = {
            Enable: true,
            LiveExclude: true,
            AddressingMode: "id",
            OnReadyHandler: function(changeMonitor) {
                changeMonitor.observe();
                if (typeof window.ClickTaleCMSelector === 'string' && window.ClickTaleCMSelector != '') {
                    changeMonitor.exclude({
                        selector: window.ClickTaleCMSelector,
                        multiple: true
                    });
                }

                var CMRemrule = window.ClickTaleSettings.PTC.RulesObjRemoveEls;
                if (CMRemrule) {
                    for (var i = 0; i < CMRemrule.length; i++) {
                        var rule = CMRemrule[i];
                        var CMlocation = rule['location'];
                        if ((!CMlocation || (CMlocation && document.location[CMlocation['prop']].toLowerCase().search(CMlocation.search) != -1))) {
                            if (rule.changeMon) {
                                changeMonitor.exclude(rule.changeMon);
                            }
                            if (rule.changeMonLive) {
                                changeMonitor.exclude({
                                    selector: rule.changeMonLive,
                                    multiple: true
                                });
                            }
                        }
                    }
                }
            },
            OnBeforeReadyHandler: function(settings) {
                settings.Enable = window.ClickTaleGetUID ? !!ClickTaleGetUID() : false;
                return settings;
            },
            Filters: {
                MaxBufferSize: 1000000,
                MaxElementCount: 10000
            },
            PII: {
                Text: [],
                Attributes: []
            }
        }

        window.ClickTaleSettings.ChangeMonitor.AutoExclude = {
            Enable: true,
            Repeats: 10,
            Interval: 200
        };

        var RulesObj = window.ClickTaleSettings.PTC.RulesObj;
        if (RulesObj) {
            window.ClickTaleSettings.ChangeMonitor.PII.Text = window.ClickTaleSettings.ChangeMonitor.PII.Text || [];
            window.ClickTaleSettings.ChangeMonitor.PII.Attributes = window.ClickTaleSettings.ChangeMonitor.PII.Attributes || [];
            for (var i = 0; i < RulesObj.length; i++) {
                var CMrule = RulesObj[i]['changeMon'];
                var CMlocation = RulesObj[i]['location'];
                if (!CMrule || (CMlocation && document.location[CMlocation['prop']].toLowerCase().search(CMlocation.search) === -1)) {
                    continue;
                }
                var selector = RulesObj[i]['selector'];
                var attributesArr = CMrule.Attributes;
                if (attributesArr instanceof Array) {
                    window.ClickTaleSettings.ChangeMonitor.PII.Attributes.push({
                        selector: selector,
                        transform: (function(attributesArr) {
                            return function(el) {
                                var attrs = el.attributes;
                                var attrsToReturn = {}
                                for (var i = 0; i < attrs.length; i++) {
                                    var name = attrs[i].nodeName;
                                    attrsToReturn[name] = attrs[i].nodeValue;
                                }
                                for (var u = 0; u < attributesArr.length; u++) {
                                    var attr = attributesArr[u];
                                    var attrib = el.getAttribute(attr);
                                    if (typeof attrib === 'string') {
                                        attrsToReturn[attr] = attrib.replace(/\w/g, '-');
                                    }
                                }

                                return attrsToReturn;
                            }
                        })(attributesArr)
                    });
                }
                if (CMrule.Text) {
                    window.ClickTaleSettings.ChangeMonitor.PII.Text.push({
                        selector: [selector, function(elements) {
                            var els = Array.prototype.reduce.call(elements, function(curr, add) {
                                return curr.concat(Array.prototype.slice.call(add.childNodes));
                            }, []);
                            return Array.prototype.filter.call(els, function(child) {
                                return !!(child && child.nodeType === 3);
                            });
                        }],
                        transform: function(el) {
                            return el.textContent.replace(/\w/g, '-');
                        }
                    });
                }
            }
        }
    }
};

window.ClickTaleSettings.Compression = {
    Method: function() {
        return "deflate";
    }
};

window.ClickTaleSettings.Transport = {
    Legacy: false,
    MaxConcurrentRequests: 5
};

window.ClickTaleSettings.RewriteRules = {
    OnBeforeRewrite: function(rewriteApi) {
        if (window.ClickTaleSettings.PTC.RulesObj) {
            rewriteApi.add(function(buffer) {
                var bodyClone = ClickTaleSettings.PTC.cloneNodeIE9(buffer);

                if (window.ClickTaleSettings.PTC.AssetManager &&
                    window.ClickTaleSettings.PTC.AssetManager.isActive &&
                    typeof window.ClickTaleSettings.PTC.AssetManager.makeChanges == 'function') {
                    window.ClickTaleSettings.PTC.AssetManager.makeChanges(bodyClone);
                }

                var selectorReg = /((?:^|,|\s|>|\+|\~)+)([A-Za-z])/g;

                var RulesObj = window.ClickTaleSettings.PTC.RulesObj;
                for (var i = 0; i < RulesObj.length; i++) {
                    var rewriteApirule = RulesObj[i]['rewriteApi'];
                    var rewriteApilocation = RulesObj[i]['location'];
                    if (!rewriteApirule || (rewriteApilocation && document.location[rewriteApilocation['prop']].toLowerCase().search(rewriteApilocation.search) === -1)) {
                        continue;
                    }
                    var selector = RulesObj[i]['selector'].replace(selectorReg, '$1ctdep-$2');
                    var elements = bodyClone.querySelectorAll(selector);

                    Array.prototype.forEach.call(elements, function(el, ind) {
                        var attributesArr = rewriteApirule.Attributes;
                        if (attributesArr instanceof Array) {

                            for (var u = 0; u < attributesArr.length; u++) {
                                var attr = attributesArr[u];
                                var attrib = el.getAttribute(attr);
                                if (typeof attrib === 'string') {
                                    el.setAttribute(attr, attrib.replace(/\w/g, '-'));
                                }
                            }

                        }
                        if (rewriteApirule.Text) {
                            var children = el.childNodes;
                            Array.prototype.forEach.call(children, function(child) {
                                if (child && child.nodeType === 3) {
                                    child.textContent = child.textContent.replace(/\w/g, '-');
                                }
                            });
                        }
                    });
                }

                var RulesObjRemoveEls = window.ClickTaleSettings.PTC.RulesObjRemoveEls;
                if (RulesObjRemoveEls) {
                    for (var i = 0; i < RulesObjRemoveEls.length; i++) {
                        if (RulesObjRemoveEls[i].rewriteApi) {
                            var elementsToRemove = bodyClone.querySelectorAll(RulesObjRemoveEls[i].rewriteApi.replace(selectorReg, '$1ctdep-$2'));
                            Array.prototype.forEach.call(elementsToRemove, function(el, ind) {
                                if (el.parentNode) {
                                    el.parentNode.removeChild(el);
                                }
                            });
                        }
                        if (RulesObjRemoveEls[i].rewriteApiReplace) {
                            var elementsToReplace = bodyClone.querySelectorAll(RulesObjRemoveEls[i].rewriteApiReplace.replace(selectorReg, '$1ctdep-$2'));
                            Array.prototype.forEach.call(elementsToReplace, function(el, ind) {
                                if (el.parentNode) {
                                    var comment = document.createComment(el.outerHTML);
                                    el.parentNode.replaceChild(comment, el);
                                }
                            });
                        }
                    }
                }

                var reg = /><\/(?:area|base|br|col|command|embed|hr|input|keygen|link|menuitem|meta|param|source|track|wbr|img)>/gi;
                var clone = bodyClone.innerHTML.replace(/ctdep-/gi, '').replace(reg, ' \/>').replace(/<!--clicktalesvgreplace ([\s\S]+?)-->/g, '$1');
                return clone;
            });
        }
        rewriteApi.add({
            pattern: /(<head[^>]*>)/i,
            replace: '$1<script type="text\/javascript" class="cm-ignore" src="http:\/\/dummytest.clicktale-samples.com\/GlobalResources\/jquery.js"><\/script>'
        });
    }
};

window.ClickTaleSettings.PTC.doOnlyWhen = function(toDoHandler, toCheckHandler, interval, times, failHandler) {
    if ((!toDoHandler) || (!toCheckHandler)) return;
    if (typeof interval == "undefined") interval = 1000;
    if (typeof times == "undefined") times = 20;
    if (--times < 0) {
        if (typeof failHandler === 'function') {
            failHandler();
        }
        return;
    }
    if (toCheckHandler()) {
        toDoHandler();
        return;
    }
    setTimeout(function() {
        window.ClickTaleSettings.PTC.doOnlyWhen(toDoHandler, toCheckHandler, interval, times, failHandler);
    }, interval);
};

//Adobe Target Integration Start
function clickTaleATIntegration() {
    var events = [];
    for (var i = 0; i < ttMETA.length; i++) {
        if (ttMETA[i].campaign != '' && ttMETA[i].experience != '') {
            events.push('Campaign: ' + ttMETA[i].campaign + ' | Experience: ' + ttMETA[i].experience);
        }
    }
    ClicktaleIntegrationExperienceHandler(events, "Adobe");
};

function clickTaleCheckIfATExists() {
    if (window.ClicktaleIntegrationExperienceHandler && window.ttMETA && ttMETA.length > 0) {
        for (var i = 0; i < ttMETA.length; i++) {
            if (typeof ttMETA[i].campaign === 'string' && ttMETA[i].campaign != '' && typeof ttMETA[i].experience === 'string' && ttMETA[i].experience != '') {
                window.ClickTaleSettings.PTC.ATready = true;
                return true;
            }
        }
    }
    return false;
};

window.ClickTaleSettings.PTC.doOnlyWhen(clickTaleATIntegration, clickTaleCheckIfATExists, 100, 100);
//Adobe Target Integration End

function ClickTaleOnRecording() {

    //Adobe Analytics Integration Start
    function clickTaleAdobeIntegration(i) {
        if (i) {
            var i = parseInt(i);
            var uniqueID = ClickTaleGetUID();
            s_c_il[i].setCustomerIDs({
                "mcvid": {
                    "id": uniqueID
                }
            });
            ClickTaleEvent("Adobe Analytics: Unique ID Sent");
        }
    };

    function clickTaleCheckIfAdobeExists() {
        for (var i = 0; i < 10; i++) {
            if (window.s_c_il && window.s_c_il[i] && typeof s_c_il[i].setCustomerIDs === "function") {
                clickTaleAdobeIntegration("" + i + "");
                return true;
            }
        }
        return false;
    };

    window.ClickTaleSettings.PTC.doOnlyWhen(clickTaleAdobeIntegration, clickTaleCheckIfAdobeExists, 100, 100);
    //Adobe Analytics Integration End

    //Google Analytics Integration Start
    function clickTaleReadCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    function clickTaleGASendBeacon() {
        document.cookie = "CTGAIntegration=" + ClickTaleGetUID() + "|" + clickTaleGAgetTrackerName[0].get('clientId') + "; expires=Thu, 18 Dec 2099 12:00:00 UTC; path=/";
        for (var i = 0; i < clickTaleGAgetTrackerName.length; i++) {
            if (typeof clickTaleGAgetTrackerName[i].get('name') === 'string' && clickTaleGAgetTrackerName[i].get('name') != '') {
                ga(clickTaleGAgetTrackerName[i].get('name') + '.send', 'event', 'Clicktale', 'UID', '', {
                    'dimension99': ClickTaleGetUID().toString(),
                    'nonInteraction': 1
                });
            }
        }
    };

    function clickTaleGAIntegration() {
        clickTaleGAgetTrackerName = ga.getAll();
        if (typeof clickTaleGAgetTrackerName != 'undefined' && typeof clickTaleGAgetTrackerName != null && typeof clickTaleGAgetTrackerName === 'object' &&
            clickTaleGAgetTrackerName.length > 0 && clickTaleGAgetTrackerName[0].get('name') != "" && clickTaleGAgetTrackerName[0].get('clientId') != "" &&
            typeof clickTaleReadCookie === 'function') {
            var checkCTGAcookie = clickTaleReadCookie('CTGAIntegration')
            if (checkCTGAcookie != null) {
                var getCTID = checkCTGAcookie.split("|")[0]
                var getGAID = checkCTGAcookie.split("|")[1]
                if (getCTID != ClickTaleGetUID() || getGAID != clickTaleGAgetTrackerName[0].get('clientId')) {
                    clickTaleGASendBeacon();
                }
            } else {
                clickTaleGASendBeacon();
            }
        }
    };

    function clickTaleCheckIfGAExists() {
        if (window.ga && typeof ga === 'function' && typeof ga.getAll === 'function') {
            return true;
        }
        return false;
    };

    window.ClickTaleSettings.PTC.doOnlyWhen(clickTaleGAIntegration, clickTaleCheckIfGAExists, 100, 100);
    //Google Analytics Integration End
};

//Integrations
window.ClickTaleSettings.PTC.Integrations = [
    "Adobe Analytics 2.0 | Core",
    "Adobe Target | Core",
    "Adobe Target | CEC",
    "Google Analytics | Core"
];

// End of user-defined pre WR code


var isHttps = document.location.protocol == 'https:',
	scriptSource = window.ClickTaleScriptSource,
	pccSource = scriptSource;

if (!scriptSource) {
	window.ClickTaleScriptSource = isHttps ? 'https://cdnssl.clicktale.net/www/' : 'http://cdn.clicktale.net/www/';
}

ClickTaleGlobal.init.monitorScriptName = "Monitor-latest.js";
ClickTaleGlobal.init.isAllowed && typeof ClickTaleGlobal.init.pmc === "function" && ClickTaleGlobal.init.pmc(autoMonitorConfig);

if(!ClickTaleGlobal.init.pccRequested) {
	var pccSrc = pccSource ? pccSource + 'b1c0654e-7133-4308-a615-330ad61a2065.js?DeploymentConfigName=Release_20180827&Version=3' : (isHttps ? 'https://cdnssl.clicktale.net/www41/pcc/b1c0654e-7133-4308-a615-330ad61a2065.js?DeploymentConfigName=Release_20180827&Version=3' : 'http://cdn.clicktale.net/www41/pcc/b1c0654e-7133-4308-a615-330ad61a2065.js?DeploymentConfigName=Release_20180827&Version=3');
		var pccScriptElement = ClickTaleCreateDOMElement('script');
	pccScriptElement.type = "text/javascript";
	pccScriptElement.crossOrigin = "anonymous";
	pccScriptElement.src = pccSrc;
	ClickTaleGlobal.init.isAllowed && document.body.appendChild(pccScriptElement);
		ClickTaleGlobal.init.pccRequested = true;
}
	window.ClickTaleGlobal.PCCExists = true;
	
window.ClickTalePrevOnReady = typeof window.ClickTaleOnReady == 'function' ? window.ClickTaleOnReady : void 0;

window.ClickTaleOnReady = function() {
	var PID=78, 
		Ratio=1, 
		PartitionPrefix="www41",
		SubsId=233289;
	
	if (window.navigator && window.navigator.loadPurpose === "preview") {
       return;
	};
		
	
	// Start of user-defined header code (PreInitialize)
	if (typeof ClickTaleSetAllSensitive === "function") {
    ClickTaleSetAllSensitive();
};
var ctLocHref = document.location.href;
window.ClickTaleSettings.PTC.InitFuncs = window.ClickTaleSettings.PTC.InitFuncs || [];
window.ClickTaleSettings.PTC.InitFuncs.push(function() {
    var pcc = document.querySelector('script[src*="clicktale"][src*="pcc"]');
    if (pcc) {
        var versionmatch = pcc.src.match(/DeploymentConfigName=(.+)/i);
        if (versionmatch && typeof ClickTaleExec === 'function') {
            ClickTaleExec("console.info('" + versionmatch[0] + "');");
            ClickTaleEvent("Config: " + versionmatch[1].replace(/\&.+/, ''));
        }
    }
});

function doUpload() {
    if (typeof ClickTaleUploadPageNow === 'function' && ClickTaleIsRecording()) {
        var uploadInnerScrollElem = document.querySelector('.mrm-outer-container');
        if (uploadInnerScrollElem) {
            ClickTaleField('uploadSH', uploadInnerScrollElem.scrollHeight)
        }
        ClickTaleUploadPageNow();
    };
};

function isReadyToRecord() {
    if (typeof ClickTaleUploadPageNow === 'function' && ClickTaleIsRecording()) {
		
		//INTEL-83
		if(document.querySelector('#divShowSpinner') != null) return document.querySelector('#divShowSpinner.ng-hide') != null
				
        if (document.location.href.indexOf("/buy/us/en/") > -1) {
            return document.querySelectorAll('li.featured-product.loaded').length >= 4;
        } else if (document.location.pathname.toLowerCase().indexOf('/search.html') > -1) {
            return !!(document.querySelector('.result-listings'));
        } else if (document.location.pathname.toLowerCase().indexOf('/dashboard.html') > -1) {
            return !(document.querySelector('#spinner'));
        } else if (document.location.href.indexOf('app/browse/projects') > -1) {
            return !!(document.querySelector('.btn.btn-primary'));
        } else if(ctLocHref.indexOf("us/en/design/products-and-solutions/processors-and-chipsets") > -1 && ctLocHref.indexOf("technical-library.html") > -1){
            return !!document.querySelector('.loader.is-active-overlay.ng-hide');
        } else if(document.location.href == 'https://www.intel.com/content/www/us/en/homepage.html'){   // INTEL-82
            var images = document.querySelectorAll('section.full-bleed-image');
            var exisitingImages = Array.prototype.filter.call(images,function(image){return image.style.backgroundImage});
            return !!(exisitingImages.length == images.length);
        }
        else{
            return true;
        }
    }
    return false;
};

if (typeof ClickTaleDelayUploadPage === 'function') {
    ClickTaleDelayUploadPage();
 
    //AB Test Integration Timeout
    setTimeout(function(){
        window.ClickTaleSettings.PTC.doOnlyWhen(doUpload, isReadyToRecord, 400, 45, doUpload);
    },1000);

    var initFuncs = window.ClickTaleSettings.PTC.InitFuncs;
    for (var i = 0, initLen = initFuncs.length; i < initLen; i++) {
        if (typeof initFuncs[i] === 'function') {
            initFuncs[i]();
        }
    }
}

	// End of user-defined header code (PreInitialize)
    
	
	window.ClickTaleIncludedOnDOMReady=true;
	
	ClickTaleGlobal.init.isAllowed && ClickTale(PID, Ratio, PartitionPrefix, SubsId);
	
	if((typeof ClickTalePrevOnReady == 'function') && (ClickTaleOnReady.toString() != ClickTalePrevOnReady.toString()))
	{
    	ClickTalePrevOnReady();
	}
	
	
	// Start of user-defined footer code
	
	// End of user-defined footer code
	
}; 
(function() {
	var div = ClickTaleCreateDOMElement("div");
	div.id = "ClickTaleDiv";
	div.style.display = "none";
	document.body.appendChild(div);

	
	
	var wrScript = ClickTaleCreateDOMElement("script");
	wrScript.crossOrigin = "anonymous";	
	wrScript.src = window.ClickTaleScriptSource + 'WR-latest.js';
	wrScript.type = 'text/javascript';
		wrScript.async = true;
		ClickTaleGlobal.init.isAllowed && document.body.appendChild(wrScript);
})();





!function(){try{var e=window.chrome,t=window.navigator&&window.navigator.vendor;null!=e&&"Google Inc."===t&&window.addEventListener&&addEventListener("message",n,!1)}catch(e){}function n(e){var t,n;try{t=JSON.parse(e.data)}catch(e){return}!1!==new RegExp("(app[.]clicktale[.]com)($|:)").test(e.origin)&&(window.ct_ve_parent_window=e.source,"CT_testRules"==t.name&&(sessionStorage.setItem("CT_testRules",!0),console.log((new Date).toJSON(),"PostPTC: testRules ",sessionStorage.getItem("CT_testRules")),window.ct_ve_parent_window.postMessage({name:"testRulesRecieved",params:{}},"*")),"CTload_ve"===t.function&&"function"==typeof ClickTaleGetPID&&null!==ClickTaleGetPID()&&(!function(){console.log((new Date).toJSON(),"PostPTC: start loading test rules");var e=o("script");e.setAttribute("type","application/javascript"),e.setAttribute("id","ctTestRulesModule"),e.onload=function(){sessionStorage.setItem("CT_testRules_Loaded",!0),console.log((new Date).toJSON(),"PostPTC: test rules loaded")};var t=ClickTaleGetPID();e.src=ctVEconfig.VE_BASE_URL+"rulesEngineContent/TestPCC/"+t,document.getElementById("ctTestRulesModule")||document.body.appendChild(e)}(),(n=o("script")).setAttribute("type","text/javascript"),n.setAttribute("id","ctVisualEditorClientModule"),n.src=ctVEconfig.VE_BASE_URL+"client/dist/veClientModule.js",document.getElementById("ctVisualEditorClientModule")||document.body.appendChild(n)))}function o(e){return document.createElementNS?document.createElementNS("http://www.w3.org/1999/xhtml",e):document.createElement(e)}}();

//Signature:X1hMx/he6uwjsKRFZTDrVZ2xHdiGBxaZGg6lWzMdNE8gpnSscztwoxrOL783oq5+V9u2yXI4m3wqCJdzdFkgOi4Tb7Tc6p3Sfu2jK0YGebQ7K5yNt4fKOXMMhy1Kyr3p85cbjZVpskCCCkiYf4dugNCwdVrlpKPP0qqdh3sD4IM=

        /* End Tag Sending Code */


        /* Start Loader Callback Function */
        /* Un-comment the single-line JavaScript comments ("//") to use this Loader callback function. */

        //u.loader_cb = function () {
          //u.initialized = true;
          /* Start Loader Callback Tag Sending Code */

            // Insert your post-Loader tag sending code here.

          /* End Loader Callback Tag Sending Code */
        //};

        /* End Loader Callback Function */


        /* Start Loader Function Call */
        /* Un-comment the single-line JavaScript comments ("//") to use Loader. */

          //if (!u.initialized) {
            //u.loader({"type" : "iframe", "src" : u.data.base_url + c.join(u.data.qsp_delim), "cb" : u.loader_cb, "loc" : "body", "id" : 'utag_294' });
            //u.loader({"type" : "script", "src" : u.data.base_url, "cb" : u.loader_cb, "loc" : "script", "id" : 'utag_294' });
          //} else {
            //u.loader_cb();
          //}

          //u.loader({"type" : "img", "src" : u.data.base_url + c.join(u.data.qsp_delim) });

        /* End Loader Function Call */


        //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  })("294", "intel.profile-ssg.intel");
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag

