//跳转页码
function SubPage() {
    var putpage = document.getElementById('putpage').value;
    if (putpage != document.getElementById('temppage').innerText) {
        if (Math.round(putpage) == putpage) {
            if (putpage <= Math.round(document.getElementById('sumPage').innerText)) {
                document.getElementById('FromPage').submit();
            }
        }
    }
}

//跳转页码检查
function PageSubmit() {
    var putpage = document.getElementById('putpage').value;
    if (putpage != document.getElementById('temppage').innerText) {
        if (Math.round(putpage) == putpage) {
            if (putpage <= Math.round(document.getElementById('sumPage').innerText)) {
                return true;
            }
        }
    }

    return false;
}

//自动缩放iframe
function setIframeHeight(iframe) {
    if (iframe) {
        var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
        if (iframeWin.document.body) {
            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;


            //判断是否为IE11
            var userAgent = navigator.userAgent,
                rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
                rFirefox = /(firefox)\/([\w.]+)/,
                rOpera = /(opera).+version\/([\w.]+)/,
                rChrome = /(chrome)\/([\w.]+)/,
                rSafari = /version\/([\w.]+).*(safari)/;
            var browser;
            var version;
            var ua = userAgent.toLowerCase();
            function uaMatch(ua) {
                var match = rMsie.exec(ua);
                if (match != null) {
                    return { browser: "IE", version: match[2] || "0" };
                }
                var match = rFirefox.exec(ua);
                if (match != null) {
                    return { browser: match[1] || "", version: match[2] || "0" };
                }
                var match = rOpera.exec(ua);
                if (match != null) {
                    return { browser: match[1] || "", version: match[2] || "0" };
                }
                var match = rChrome.exec(ua);
                if (match != null) {
                    return { browser: match[1] || "", version: match[2] || "0" };
                }
                var match = rSafari.exec(ua);
                if (match != null) {
                    return { browser: match[2] || "", version: match[1] || "0" };
                }
                if (match != null) {
                    return { browser: "", version: "0" };
                }
            }
            var browserMatch = uaMatch(userAgent.toLowerCase());
            if (browserMatch.browser) {
                browser = browserMatch.browser;
                version = browserMatch.version;
            }

            //如果是ie11，则减10
            if (version == 11) {
                iframe.height = iframe.height - 10;
            }
        }
    }
}

function OnYiwen(id) {
    //取消背诵
    document.getElementById("btnBeisong" + id).src = "/img/beipic.png";
    document.getElementById("btnBeisong" + id).alt = "背诵";

    var value = "cont";
    if (document.getElementById("btnYiwen" + id).alt == "译文" && document.getElementById("btnZhushi" + id).alt == "注释" && document.getElementById("btnShangxi" + id).alt == "赏析") {
        document.getElementById("btnYiwen" + id).src = "/img/yipic2.png";
        document.getElementById("btnYiwen" + id).alt = "译文2";
        value = "yi";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文" && document.getElementById("btnZhushi" + id).alt == "注释2" && document.getElementById("btnShangxi" + id).alt == "赏析") {
        document.getElementById("btnYiwen" + id).src = "/img/yipic2.png";
        document.getElementById("btnYiwen" + id).alt = "译文2";
        value = "yizhu";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文" && document.getElementById("btnZhushi" + id).alt == "注释" && document.getElementById("btnShangxi" + id).alt == "赏析2") {
        document.getElementById("btnYiwen" + id).src = "/img/yipic2.png";
        document.getElementById("btnYiwen" + id).alt = "译文2";
        value = "yishang";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文" && document.getElementById("btnZhushi" + id).alt == "注释2" && document.getElementById("btnShangxi" + id).alt == "赏析2") {
        document.getElementById("btnYiwen" + id).src = "/img/yipic2.png";
        document.getElementById("btnYiwen" + id).alt = "译文2";
        value = "yizhushang";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文2" && document.getElementById("btnZhushi" + id).alt == "注释" && document.getElementById("btnShangxi" + id).alt == "赏析") {
        document.getElementById("btnYiwen" + id).src = "/img/yipic.png";
        document.getElementById("btnYiwen" + id).alt = "译文";
        value = "cont";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文2" && document.getElementById("btnZhushi" + id).alt == "注释2" && document.getElementById("btnShangxi" + id).alt == "赏析") {
        document.getElementById("btnYiwen" + id).src = "/img/yipic.png";
        document.getElementById("btnYiwen" + id).alt = "译文";
        value = "zhu";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文2" && document.getElementById("btnZhushi" + id).alt == "注释" && document.getElementById("btnShangxi" + id).alt == "赏析2") {
        document.getElementById("btnYiwen" + id).src = "/img/yipic.png";
        document.getElementById("btnYiwen" + id).alt = "译文";
        value = "shang";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文2" && document.getElementById("btnZhushi" + id).alt == "注释2" && document.getElementById("btnShangxi" + id).alt == "赏析2") {
        document.getElementById("btnYiwen" + id).src = "/img/yipic.png";
        document.getElementById("btnYiwen" + id).alt = "译文";
        value = "zhushang";
    }
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("contson" + id).innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", "/shiwen2017/ajaxshiwencont.aspx?id=" + id+"&value="+value, false);
    xmlhttp.send();
}

function OnZhushi(id) {
    //取消背诵
    document.getElementById("btnBeisong" + id).src = "/img/beipic.png";
    document.getElementById("btnBeisong" + id).alt = "背诵";

    var value = "cont";
    if (document.getElementById("btnYiwen" + id).alt == "译文" && document.getElementById("btnZhushi" + id).alt == "注释" && document.getElementById("btnShangxi" + id).alt == "赏析") {
        document.getElementById("btnZhushi" + id).src = "/img/zhupic2.png";
        document.getElementById("btnZhushi" + id).alt = "注释2";
        value = "zhu";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文2" && document.getElementById("btnZhushi" + id).alt == "注释" && document.getElementById("btnShangxi" + id).alt == "赏析") {
        document.getElementById("btnZhushi" + id).src = "/img/zhupic2.png";
        document.getElementById("btnZhushi" + id).alt = "注释2";
        value = "yizhu";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文" && document.getElementById("btnZhushi" + id).alt == "注释" && document.getElementById("btnShangxi" + id).alt == "赏析2") {
        document.getElementById("btnZhushi" + id).src = "/img/zhupic2.png";
        document.getElementById("btnZhushi" + id).alt = "注释2";
        value = "zhushang";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文2" && document.getElementById("btnZhushi" + id).alt == "注释" && document.getElementById("btnShangxi" + id).alt == "赏析2") {
        document.getElementById("btnZhushi" + id).src = "/img/zhupic2.png";
        document.getElementById("btnZhushi" + id).alt = "注释2";
        value = "yizhushang";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文" && document.getElementById("btnZhushi" + id).alt == "注释2" && document.getElementById("btnShangxi" + id).alt == "赏析") {
        document.getElementById("btnZhushi" + id).src = "/img/zhupic.png";
        document.getElementById("btnZhushi" + id).alt = "注释";
        value = "cont";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文2" && document.getElementById("btnZhushi" + id).alt == "注释2" && document.getElementById("btnShangxi" + id).alt == "赏析") {
        document.getElementById("btnZhushi" + id).src = "/img/zhupic.png";
        document.getElementById("btnZhushi" + id).alt = "注释";
        value = "yi";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文" && document.getElementById("btnZhushi" + id).alt == "注释2" && document.getElementById("btnShangxi" + id).alt == "赏析2") {
        document.getElementById("btnZhushi" + id).src = "/img/zhupic.png";
        document.getElementById("btnZhushi" + id).alt = "注释";
        value = "shang";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文2" && document.getElementById("btnZhushi" + id).alt == "注释2" && document.getElementById("btnShangxi" + id).alt == "赏析2") {
        document.getElementById("btnZhushi" + id).src = "/img/zhupic.png";
        document.getElementById("btnZhushi" + id).alt = "注释";
        value = "yishang";
    }
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("contson" + id).innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", "/shiwen2017/ajaxshiwencont.aspx?id=" + id + "&value=" + value, false);
    xmlhttp.send();
}

function OnShangxi(id) {
    //取消背诵
    document.getElementById("btnBeisong" + id).src = "/img/beipic.png";
    document.getElementById("btnBeisong" + id).alt = "背诵";

    var value = "cont";
    if (document.getElementById("btnYiwen" + id).alt == "译文" && document.getElementById("btnZhushi" + id).alt == "注释" && document.getElementById("btnShangxi" + id).alt == "赏析") {
        document.getElementById("btnShangxi" + id).src = "/img/shangpic2.png";
        document.getElementById("btnShangxi" + id).alt = "赏析2";
        value = "shang";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文2" && document.getElementById("btnZhushi" + id).alt == "注释" && document.getElementById("btnShangxi" + id).alt == "赏析") {
        document.getElementById("btnShangxi" + id).src = "/img/shangpic2.png";
        document.getElementById("btnShangxi" + id).alt = "赏析2";
        value = "yishang";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文" && document.getElementById("btnZhushi" + id).alt == "注释2" && document.getElementById("btnShangxi" + id).alt == "赏析") {
        document.getElementById("btnShangxi" + id).src = "/img/shangpic2.png";
        document.getElementById("btnShangxi" + id).alt = "赏析2";
        value = "zhushang";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文2" && document.getElementById("btnZhushi" + id).alt == "注释2" && document.getElementById("btnShangxi" + id).alt == "赏析") {
        document.getElementById("btnShangxi" + id).src = "/img/shangpic2.png";
        document.getElementById("btnShangxi" + id).alt = "赏析2";
        value = "yizhushang";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文" && document.getElementById("btnZhushi" + id).alt == "注释" && document.getElementById("btnShangxi" + id).alt == "赏析2") {
        document.getElementById("btnShangxi" + id).src = "/img/shangpic.png";
        document.getElementById("btnShangxi" + id).alt = "赏析";
        value = "cont";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文2" && document.getElementById("btnZhushi" + id).alt == "注释" && document.getElementById("btnShangxi" + id).alt == "赏析2") {
        document.getElementById("btnShangxi" + id).src = "/img/shangpic.png";
        document.getElementById("btnShangxi" + id).alt = "赏析";
        value = "yi";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文" && document.getElementById("btnZhushi" + id).alt == "注释2" && document.getElementById("btnShangxi" + id).alt == "赏析2") {
        document.getElementById("btnShangxi" + id).src = "/img/shangpic.png";
        document.getElementById("btnShangxi" + id).alt = "赏析";
        value = "zhu";
    }
    else if (document.getElementById("btnYiwen" + id).alt == "译文2" && document.getElementById("btnZhushi" + id).alt == "注释2" && document.getElementById("btnShangxi" + id).alt == "赏析2") {
        document.getElementById("btnShangxi" + id).src = "/img/shangpic.png";
        document.getElementById("btnShangxi" + id).alt = "赏析";
        value = "yizhu";
    }
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("contson" + id).innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", "/shiwen2017/ajaxshiwencont.aspx?id=" + id + "&value=" + value, false);
    xmlhttp.send();
}
  
function OnBeisong(id) {
    var value = "cont";
    if (document.getElementById("btnBeisong" + id).alt == "背诵") {
        document.getElementById("btnYiwen" + id).src = "/img/yipic.png";
        document.getElementById("btnYiwen" + id).alt = "译文";
        document.getElementById("btnZhushi" + id).src = "/img/zhupic.png";
        document.getElementById("btnZhushi" + id).alt = "注释";
        document.getElementById("btnShangxi" + id).src = "/img/shangpic.png";
        document.getElementById("btnShangxi" + id).alt = "赏析";

        document.getElementById("btnBeisong" + id).src = "/img/beipic2.png";
        document.getElementById("btnBeisong" + id).alt = "背诵2";
        value = "bei";
    }
    else{
        document.getElementById("btnBeisong" + id).src = "/img/beipic.png";
        document.getElementById("btnBeisong" + id).alt = "背诵";
        value = "cont";
    }
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("contson" + id).innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", "/shiwen2017/ajaxshiwencont.aspx?id=" + id + "&value=" + value, false);
    xmlhttp.send();
}

//取得cookie值
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}


//点赞
function goodNew(id, from,likes) {
    if (getCookie('gsw2017user') == null) {
        window.parent.window.location.href = "https://so.gushiwen.org/user/login.aspx?from=" + from;
    }
    else {
        if (getCookie('goodshiwenid' + id) != null) {
            document.getElementById("agood" + id).innerHTML = "<img src=\"/img/good.png\" / alt=\"\" width=\"14\" height=\"14\"/><span>&nbsp;已赞</span>";
            return;
        }

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("agood" + id).innerHTML = "<img src=\"/img/good.png\" / alt=\"\" width=\"14\" height=\"14\"/><span>&nbsp;" + xmlhttp.responseText + "</span>";
            }
        }
        xmlhttp.open("GET", "/shiwen2017/goodding.aspx?id=" + id + "&from=" + from + "&likes=" + likes, false);
        xmlhttp.send();
    }
}



//点赞
function goodMingjuNew(id, from, likes) {
    if (getCookie('gsw2017user') == null) {
        window.parent.window.location.href = "https://so.gushiwen.org/user/login.aspx?from=" + from;
    }
    else {
        if (getCookie('goodMingjuId' + id) != null) {
            document.getElementById("agoodMingju" + id).innerHTML = "<img src=\"/img/good.png\" / alt=\"\" width=\"14\" height=\"14\"/><span>&nbsp;已赞</span>";
            return;
        }

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("agoodMingju" + id).innerHTML = "<img src=\"/img/good.png\" / alt=\"\" width=\"14\" height=\"14\"/><span>&nbsp;" + xmlhttp.responseText + "</span>";
            }
        }
        xmlhttp.open("GET", "/mingju/goodding.aspx?id=" + id + "&from=" + from + "&likes=" + likes, false);
        xmlhttp.send();
    }
}



//点赞
function goodAuthorNew(id, from, likes) {
    if (getCookie('gsw2017user') == null) {
        window.parent.window.location.href = "https://so.gushiwen.org/user/login.aspx?from=" + from;
    }
    else {
        if (getCookie('goodAuthorId' + id) != null) {
            document.getElementById("agoodAuthor" + id).innerHTML = "<img src=\"/img/good.png\" / alt=\"\" width=\"14\" height=\"14\"/><span>&nbsp;已赞</span>";
            return;
        }

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("agoodAuthor" + id).innerHTML = "<img src=\"/img/good.png\" / alt=\"\" width=\"14\" height=\"14\"/><span>&nbsp;" + xmlhttp.responseText + "</span>";
            }
        }
        xmlhttp.open("GET", "/authors/goodding.aspx?id=" + id + "&from=" + from + "&likes=" + likes, false);
        xmlhttp.send();
    }
}


//点赞
function goodGuwenNew(id, from, likes) {
    if (getCookie('gsw2017user') == null) {
        window.parent.window.location.href = "https://so.gushiwen.org/user/login.aspx?from=" + from;
    }
    else {
        if (getCookie('goodGuwenId' + id) != null) {
            document.getElementById("agoodGuwen" + id).innerHTML = "<img src=\"/img/good.png\" / alt=\"\" width=\"14\" height=\"14\"/><span>&nbsp;已赞</span>";
            return;
        }

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("agoodGuwen" + id).innerHTML = "<img src=\"/img/good.png\" / alt=\"\" width=\"14\" height=\"14\"/><span>&nbsp;" + xmlhttp.responseText + "</span>";
            }
        }
        xmlhttp.open("GET", "/guwen/goodding.aspx?id=" + id + "&from=" + from + "&likes=" + likes, false);
        xmlhttp.send();
    }
}

function clickType() {
    if (document.getElementById("type1").style.height == "auto") {
        document.getElementById("imgType1").src = "/img/jianTop.png";
        document.getElementById("type1").style.height = "26px";

    }
    else {
        document.getElementById("imgType1").src = "/img/jianBtn.png";
        document.getElementById("type1").style.height = "auto";
    }
}

function clickType2() {
    if (document.getElementById("type2").style.height == "auto") {
        document.getElementById("imgType2").src = "/img/jianTop.png";
        document.getElementById("type2").style.height = "26px";
    }
    else {
        document.getElementById("imgType2").src = "/img/jianBtn.png";
        document.getElementById("type2").style.height = "auto";
    }
}

function clickType3() {
    if (document.getElementById("type3").style.height == "auto") {
        document.getElementById("imgType3").src = "/img/jianTop.png";
        document.getElementById("type3").style.height = "26px";
    }
    else {
        document.getElementById("imgType3").src = "/img/jianBtn.png";
        document.getElementById("type3").style.height = "auto";
    }
}


//古籍章杰翻译展示
function ShowYizhu(id) {
    if (document.getElementById('leftbtn' + id).innerHTML == "译注") {
        document.getElementById('left' + id).style.width = "400px";
        document.getElementById('right' + id).style.display = "block";
        document.getElementById('leftbtn' + id).innerHTML = "全屏";

        if (document.getElementById('rightbtn' + id)) {
            document.getElementById('rightbtn' + id).innerHTML = "全屏";
        }
        else {
            var xmlhttp;
            if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }
            else {// code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    document.getElementById("right" + id).innerHTML = xmlhttp.responseText;
                }
            }
            xmlhttp.open("GET", "/guwen/ajaxbfanyi.aspx?id=" + id, false);
            xmlhttp.send();
        }
    }
    else {
        document.getElementById('left' + id).style.width = "1000px";
        document.getElementById('right' + id).style.display = "none";
        document.getElementById('leftbtn' + id).innerHTML = "译注";

        if (document.getElementById('rightbtn' + id)) {
            document.getElementById('rightbtn' + id).innerHTML = "全屏";
        }
    }
}
function ShowYizhuRight(id) {
    if (document.getElementById('rightbtn' + id).innerHTML == "全屏") {
        document.getElementById('right' + id).style.width = "1000px";
        document.getElementById('left' + id).style.display = "none";
        document.getElementById('rightbtn' + id).innerHTML = "分屏";
    }
    else {
        document.getElementById('right' + id).style.width = "580px";
        document.getElementById('left' + id).style.display = "block";
        document.getElementById('rightbtn' + id).innerHTML = "全屏";
    }
}

//资料展示
function ziliaoShow(id) {
    document.getElementById('fanyi' + id).style.display = 'none';
    document.getElementById('fanyiquan' + id).style.display = 'block';

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("fanyiquan" + id).innerHTML = xmlhttp.responseText;

            //如果正在播放
            if (document.getElementById('ziliaoPlay' + id).style.display == "block") {
                document.getElementById('speakerimgZiliaoquan' + id).src = "/img/speakerok.png";
            }
        }
    }
    xmlhttp.open("GET", "/authors/ajaxziliao.aspx?id=" + id, false);
    xmlhttp.send();
}
function ziliaoClose(id) {
    document.getElementById('fanyiquan' + id).style.display = 'none';
    document.getElementById('fanyi' + id).style.display = 'block';
}

//译赏展示
function fanyiShow(id) {
    document.getElementById('fanyi' + id).style.display = 'none';
    document.getElementById('fanyiquan' + id).style.display = 'block';

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("fanyiquan" + id).innerHTML = xmlhttp.responseText;

            //如果正在播放
            if (document.getElementById('fanyiPlay' + id).style.display == "block") {
                document.getElementById('speakerimgFanyiquan' + id).src = "/img/speakerok.png";
            }
        }
    }
    xmlhttp.open("GET", "/shiwen2017/ajaxfanyi.aspx?id=" + id, false);
    xmlhttp.send();
}
function fanyiClose(id) {
    document.getElementById('fanyiquan' + id).style.display = 'none';
    document.getElementById('fanyi' + id).style.display = 'block';
}
function shangxiShow(id) {
    document.getElementById('shangxi' + id).style.display = 'none';
    document.getElementById('shangxiquan' + id).style.display = 'block';

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("shangxiquan" + id).innerHTML = xmlhttp.responseText;

            //如果正在播放
            if (document.getElementById('shangxiPlay' + id).style.display == "block") {
                document.getElementById('speakerimgShangxiquan' + id).src = "/img/speakerok.png";
            }
        }
    }
    xmlhttp.open("GET", "/shiwen2017/ajaxshangxi.aspx?id=" + id, false);
    xmlhttp.send();
}
function shangxiClose(id) {
    document.getElementById('shangxiquan' + id).style.display = 'none';
    document.getElementById('shangxi' + id).style.display = 'block';
}

//翻译
function ding(id, from) {
    if (getCookie('gsw2017user') == null) {
        window.parent.window.location.href = "https://so.gushiwen.org/user/login.aspx?from=" + from;
    }
    else {
        if (getCookie('dingpaify' + id) != null) {
            document.getElementById("ding" + id).innerHTML = "已赞";
            return;
        }

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("ding" + id).innerHTML = "有用(" + xmlhttp.responseText + ")";
            }
        }
        xmlhttp.open("GET", "/fyding2017.aspx?id=" + id + "&from=" + from, true);
        xmlhttp.send();
    }
}

//翻译拍
function pai(id, from) {
    if (getCookie('gsw2017user') == null) {
        window.parent.window.location.href = "https://so.gushiwen.org/user/login.aspx?from=" + from;
    }
    else {
        if (getCookie('dingpaify' + id) != null) {
            document.getElementById("pai" + id).innerHTML = "已踩";
            return;
        }

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("pai" + id).innerHTML = "没用(" + xmlhttp.responseText + ")";
            }
        }
        xmlhttp.open("GET", "/fypai2017.aspx?id=" + id + "&from=" + from, true);
        xmlhttp.send();
    }
}

function dingsx(id, from) {
    if (getCookie('gsw2017user') == null) {
        window.parent.window.location.href = "https://so.gushiwen.org/user/login.aspx?from=" + from;
    }
    else {
        if (getCookie('dingpaisx' + id) != null) {
            document.getElementById("dingsx" + id).innerHTML = "已赞";
            return;
        }

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("dingsx" + id).innerHTML = "有用(" + xmlhttp.responseText + ")";
            }
        }
        xmlhttp.open("GET", "/sxding2017.aspx?id=" + id + "&from=" + from, true);
        xmlhttp.send();
    }
}

function paisx(id, from) {
    if (getCookie('gsw2017user') == null) {
        window.parent.window.location.href = "https://so.gushiwen.org/user/login.aspx?from=" + from;
    }
    else {
        if (getCookie('dingpaisx' + id) != null) {
            document.getElementById("paisx" + id).innerHTML = "已踩";
            return;
        }

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("paisx" + id).innerHTML = "没用(" + xmlhttp.responseText + ")";
            }
        }
        xmlhttp.open("GET", "/sxpai2017.aspx?id=" + id + "&from=" + from, true);
        xmlhttp.send();
    }
}

function dingzl(id, from) {
    if (getCookie('gsw2017user') == null) {
        window.parent.window.location.href = "https://so.gushiwen.org/user/login.aspx?from=" + from;
    }
    else {
        if (getCookie('dingpaizl' + id) != null) {
            document.getElementById("dingzl" + id).innerHTML = "已赞";
            return;
        }

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("dingzl" + id).innerHTML = "有用(" + xmlhttp.responseText + ")";
            }
        }
        xmlhttp.open("GET", "/zlding2017.aspx?id=" + id + "&from=" + from, true);
        xmlhttp.send();
    }
}

function paizl(id, from) {
    if (getCookie('gsw2017user') == null) {
        window.parent.window.location.href = "https://so.gushiwen.org/user/login.aspx?from=" + from;
    }
    else {
        if (getCookie('dingpaizl' + id) != null) {
            document.getElementById("paizl" + id).innerHTML = "已踩";
            return;
        }

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("paizl" + id).innerHTML = "没用(" + xmlhttp.responseText + ")";
            }
        }
        xmlhttp.open("GET", "/zlpai2017.aspx?id=" + id + "&from=" + from, true);
        xmlhttp.send();
    }
}


//微信
function madeweixin(id, cont) {
    var weixin = document.getElementById("weixin" + id);
    document.getElementById('weixinimg' + id).src = "/img/weixinok.png";
    weixin.style.display = "block";
    if (weixin.style.backgroundColor == "aqua") {
        $("#weixin" + id).qrcode({
            render: "canvas", //table方式 
            text: utf16to8(cont)  //任意内容 
        });
        weixin.style.backgroundColor = "red";
    }
}
function outweixin(id) {
    var weixin = document.getElementById("weixin" + id);
    if (weixin.style.backgroundColor == "red") {
        document.getElementById('weixinimg' + id).src = "/img/weixin.png";
        weixin.style.display = "none";
    }
}

function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

//复制
function copy(id) {
    var value = document.getElementById('txtare' + id);
    value.focus();
    value.setSelectionRange(0, value.value.length);

    if (document.execCommand('copy', false, null)) {
        //success info
        alert('已复制到剪贴板');
    } else {
        //fail info
        alert('复制失败，请联系管理员');
    }
}

//复制作者
function copyAuthor(id) {
    var value = document.getElementById('txtareAuthor' + id);
    value.focus();
    value.setSelectionRange(0, value.value.length);

    if (document.execCommand('copy', false, null)) {
        //success info
        alert('已复制到剪贴板');
    } else {
        //fail info
        alert('复制失败，请联系管理员');
    }
}

//微信
function madeweixinAuthor(id, cont) {
    var weixin = document.getElementById("weixinAuthor" + id);
    document.getElementById('weixinAuthorImg' + id).src = "/img/weixinok.png";
    weixin.style.display = "block";
    if (weixin.style.backgroundColor == "aqua") {
        $("#weixinAuthor" + id).qrcode({
            render: "canvas", //table方式 
            text: utf16to8(cont)  //任意内容 
        });

        weixin.style.backgroundColor = "red";
    }
}
function outweixinAuthor(id) {
    var weixin = document.getElementById("weixinAuthor" + id);
    if (weixin.style.backgroundColor == "red") {
        document.getElementById('weixinAuthorImg' + id).src = "/img/weixin.png";
        weixin.style.display = "none";
    }
}

function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}


//取得cookie值
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

//播放
function Play(id) {
    if (document.getElementById('toolPlay' + id).style.display == "none") {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('toolPlay' + id).style.display = "block";
                document.getElementById('speakerimg' + id).src = "/img/speakerok.png";
                document.getElementById("toolPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/viewplay.aspx?id=" + id, false);
        xmlhttp.send();
    }
    else {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('toolPlay' + id).style.display = "none";
                document.getElementById('speakerimg' + id).src = "/img/speaker.png";
                document.getElementById("toolPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/viewplay.aspx?id=0", false);
        xmlhttp.send();
    }
}

//播放赏析
function PlayShangxi(id) {
    if (document.getElementById('shangxiPlay' + id).style.display == "none") {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('shangxiPlay' + id).style.display = "block";
                document.getElementById('speakerimgShangxi' + id).src = "/img/speakerok.png";
                if (document.getElementById('speakerimgShangxiquan' + id)) {
                    document.getElementById('speakerimgShangxiquan' + id).src = "/img/speakerok.png";
                }
                document.getElementById("shangxiPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/shangxiplay.aspx?id=" + id, false);
        xmlhttp.send();
    }
    else {

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('shangxiPlay' + id).style.display = "none";
                document.getElementById('speakerimgShangxi' + id).src = "/img/speaker.png";
                if (document.getElementById('speakerimgShangxiquan' + id)) {
                    document.getElementById('speakerimgShangxiquan' + id).src = "/img/speaker.png";
                }
                document.getElementById("shangxiPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/shangxiplay.aspx?id=0", false);
        xmlhttp.send();
    }
}

//播放赏析全
function PlayShangxiquan(id) {
    if (document.getElementById('shangxiPlay' + id).style.display == "none") {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('shangxiPlay' + id).style.display = "block";
                document.getElementById('speakerimgShangxi' + id).src = "/img/speakerok.png";
                document.getElementById('speakerimgShangxiquan' + id).src = "/img/speakerok.png";
                document.getElementById("shangxiPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/shangxiplay.aspx?id=" + id, false);
        xmlhttp.send();
    }
    else {

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('shangxiPlay' + id).style.display = "none";
                document.getElementById('speakerimgShangxi' + id).src = "/img/speaker.png";
                document.getElementById('speakerimgShangxiquan' + id).src = "/img/speaker.png";
                document.getElementById("shangxiPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/shangxiplay.aspx?id=0", false);
        xmlhttp.send();
    }
}

//播放翻译
function PlayFanyi(id) {
    if (document.getElementById('fanyiPlay' + id).style.display == "none") {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('fanyiPlay' + id).style.display = "block";
                document.getElementById('speakerimgFanyi' + id).src = "/img/speakerok.png";
                if (document.getElementById('speakerimgFanyiquan' + id)) {
                    document.getElementById('speakerimgFanyiquan' + id).src = "/img/speakerok.png";
                }
                document.getElementById("fanyiPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/fanyiplay.aspx?id=" + id, false);
        xmlhttp.send();
    }
    else {

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('fanyiPlay' + id).style.display = "none";
                document.getElementById('speakerimgFanyi' + id).src = "/img/speaker.png";
                if (document.getElementById('speakerimgFanyiquan' + id)) {
                    document.getElementById('speakerimgFanyiquan' + id).src = "/img/speaker.png";
                }
                document.getElementById("fanyiPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/fanyiplay.aspx?id=0", false);
        xmlhttp.send();
    }
}

//播放翻译全
function PlayFanyiquan(id) {
    if (document.getElementById('fanyiPlay' + id).style.display == "none") {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('fanyiPlay' + id).style.display = "block";
                document.getElementById('speakerimgFanyi' + id).src = "/img/speakerok.png";
                document.getElementById('speakerimgFanyiquan' + id).src = "/img/speakerok.png";
                document.getElementById("fanyiPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/fanyiplay.aspx?id=" + id, false);
        xmlhttp.send();
    }
    else {

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('fanyiPlay' + id).style.display = "none";
                document.getElementById('speakerimgFanyi' + id).src = "/img/speaker.png";
                document.getElementById('speakerimgFanyiquan' + id).src = "/img/speaker.png";
                document.getElementById("fanyiPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/fanyiplay.aspx?id=0", false);
        xmlhttp.send();
    }
}

//播放资料
function PlayZiliao(id) {
    if (document.getElementById('ziliaoPlay' + id).style.display == "none") {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('ziliaoPlay' + id).style.display = "block";
                document.getElementById('speakerimgZiliao' + id).src = "/img/speakerok.png";
                if (document.getElementById('speakerimgZiliaoquan' + id)) {
                    document.getElementById('speakerimgZiliaoquan' + id).src = "/img/speakerok.png";
                }
                document.getElementById("ziliaoPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/ziliaoplay.aspx?id=" + id, false);
        xmlhttp.send();
    }
    else {

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('ziliaoPlay' + id).style.display = "none";
                document.getElementById('speakerimgZiliao' + id).src = "/img/speaker.png";
                if (document.getElementById('speakerimgZiliaoquan' + id)) {
                    document.getElementById('speakerimgZiliaoquan' + id).src = "/img/speaker.png";
                }
                document.getElementById("ziliaoPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/ziliaoplay.aspx?id=0", false);
        xmlhttp.send();
    }
}

//播放资料全
function PlayZiliaoquan(id) {
    if (document.getElementById('ziliaoPlay' + id).style.display == "none") {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('ziliaoPlay' + id).style.display = "block";
                document.getElementById('speakerimgZiliao' + id).src = "/img/speakerok.png";
                document.getElementById('speakerimgZiliaoquan' + id).src = "/img/speakerok.png";
                document.getElementById("ziliaoPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/ziliaoplay.aspx?id=" + id, false);
        xmlhttp.send();
    }
    else {

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('ziliaoPlay' + id).style.display = "none";
                document.getElementById('speakerimgZiliao' + id).src = "/img/speaker.png";
                document.getElementById('speakerimgZiliaoquan' + id).src = "/img/speaker.png";
                document.getElementById("ziliaoPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/ziliaoplay.aspx?id=0", false);
        xmlhttp.send();
    }
}

//播放作者
function PlayAuthor(id) {
    if (document.getElementById('authorPlay' + id).style.display == "none") {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('authorPlay' + id).style.display = "block";
                document.getElementById('speakerimgAuthor' + id).src = "/img/speakerok.png";
                document.getElementById("authorPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/authorplay.aspx?id=" + id, false);
        xmlhttp.send();
    }
    else {

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('authorPlay' + id).style.display = "none";
                document.getElementById('speakerimgAuthor' + id).src = "/img/speaker.png";
                document.getElementById("authorPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/authorplay.aspx?id=0", false);
        xmlhttp.send();
    }
}

//播放古籍
function PlayBook(id) {
    if (document.getElementById('bookPlay' + id).style.display == "none") {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('bookPlay' + id).style.display = "block";
                document.getElementById('speakerimgBook' + id).src = "/img/speakerok.png";
                document.getElementById("bookPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/guwen/bookplay.aspx?id=" + id, false);
        xmlhttp.send();
    }
    else {

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('bookPlay' + id).style.display = "none";
                document.getElementById('speakerimgBook' + id).src = "/img/speaker.png";
                document.getElementById("bookPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/guwen/bookplay.aspx?id=0", false);
        xmlhttp.send();
    }
}

//播放古籍章节
function PlayBookv(id) {
    if (document.getElementById('bookvPlay' + id).style.display == "none") {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('bookvPlay' + id).style.display = "block";
                document.getElementById('speakerimgBookv' + id).src = "/img/speakerok.png";
                document.getElementById("bookvPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/guwen/bookvplay.aspx?id=" + id, false);
        xmlhttp.send();
    }
    else {

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('bookvPlay' + id).style.display = "none";
                document.getElementById('speakerimgBookv' + id).src = "/img/speaker.png";
                document.getElementById("bookvPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/guwen/bookvplay.aspx?id=0", false);
        xmlhttp.send();
    }
}

//播放章节翻译
function PlayBvfanyi(id) {
    if (document.getElementById('bvfanyiPlay' + id).style.display == "none") {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('bvfanyiPlay' + id).style.display = "block";
                document.getElementById('speakerimgBvfanyi' + id).src = "/img/speakerok.png";
                document.getElementById("bvfanyiPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/guwen/bvfanyiplay.aspx?id=" + id, false);
        xmlhttp.send();
    }
    else {

        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById('bvfanyiPlay' + id).style.display = "none";
                document.getElementById('speakerimgBvfanyi' + id).src = "/img/speaker.png";
                document.getElementById("bvfanyiPlay" + id).innerHTML = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET", "/guwen/bvfanyiplay.aspx?id=0", false);
        xmlhttp.send();
    }
}

function showBos() {
    if (document.getElementById("b").value == document.getElementById("txtKey").value) {
        return;
    }

    document.getElementById("b").value = document.getElementById("txtKey").value;

    var valuekey = document.getElementById("txtKey").value;

    valuekey = valuekey.replace(/[ ]/g, "").replace(/[　]/g, "");
    if (valuekey == "") {
        document.getElementById("box").style.display = 'none';
        return;
    }
    var zimu = ["backup", "exec", "select", "update", "delete", "insert", "script", "drop", "truncate", "create", "everyone", "request", "session"];
    for (var i = 0; i < zimu.length; i++) {
        if (valuekey.indexOf(zimu[i]) >= 0) {
            return;
        }
    }
    document.getElementById("box").style.display = 'block';

    //传去ajaxSearch.aspx处理
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("box").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", "/shiwen2017/ajaxSearchSo.aspx?valuekey=" + encodeURI(valuekey), false);
    xmlhttp.send();
}

function closeshowBos() {
    document.getElementById("box").style.display = 'none';
}

function selectSearch() {
    var txt = document.getElementById("txtKey");
    if (txt.value == "") {
        alert('请键入关键字！');
        return false;
    }
    return true;
}

function onAdiv(div) {
    document.getElementById(div).style.backgroundColor = '#F2F1E3';
}
function outAdiv(div) {
    document.getElementById(div).style.backgroundColor = '#F8FCFC';
}

//通过方向键控制弹出a标签的焦点(input项)
function noajaxkeyUp() {
    //取键盘值
    var keycode = event.keyCode;
    if (keycode == 40) {
        var aaid = document.getElementById("aa0");
        //判断诗文是否存在
        if (aaid) {
            document.getElementById("aa0").focus();
            document.getElementById("adiv0").style.backgroundColor = '#EBEAD9';
        }
        else {
            var baid = document.getElementById("ba0");
            //判断名句是否存在
            if (baid) {
                document.getElementById("ba0").focus();
                document.getElementById("bdiv0").style.backgroundColor = '#EBEAD9';
            }
            else {
                var caid = document.getElementById("ca0");
                //判断作者是否存在
                if (caid) {
                    document.getElementById("ca0").focus();
                    document.getElementById("cdiv0").style.backgroundColor = '#EBEAD9';
                }
                else {
                    var daid = document.getElementById("da0");
                    //判断类型是否存在
                    if (daid) {
                        document.getElementById("da0").focus();
                        document.getElementById("ddiv0").style.backgroundColor = '#EBEAD9';
                    }
                    else
                    {
                        var eaid=document.getElementById("ea0");
                        //判断典籍是否存在
                        if(eaid){
                            document.getElementById("ea0").focus();
                            document.getElementById("ediv0").style.backgroundColor = '#EBEAD9';
                        }
                    }
                }
            }
        }
    }

    else if (keycode == 38) {
        var baid = document.getElementById("ea2");
        //典籍
        if (baid) {
            document.getElementById("ea2").focus();
            document.getElementById("ediv2").style.backgroundColor = '#EBEAD9';
        }
        else {
            var baid = document.getElementById("ea1");
            if (baid) {
                document.getElementById("ea1").focus();
                document.getElementById("ediv1").style.backgroundColor = '#EBEAD9';
            }
            else {
                var baid = document.getElementById("ea0");
                if (baid) {
                    document.getElementById("ea0").focus();
                    document.getElementById("ediv0").style.backgroundColor = '#EBEAD9';
                }
                else {
                    var baid = document.getElementById("da2");
                    if (baid) {
                        document.getElementById("da2").focus();
                        document.getElementById("ddiv2").style.backgroundColor = '#EBEAD9';
                    }
                    else {
                        var baid = document.getElementById("da1");
                        if (baid) {
                            document.getElementById("da1").focus();
                            document.getElementById("ddiv1").style.backgroundColor = '#EBEAD9';
                        }
                        else {
                            var baid = document.getElementById("da0");
                            if (baid) {
                                document.getElementById("da0").focus();
                                document.getElementById("ddiv0").style.backgroundColor = '#EBEAD9';
                            }
                            else {
                                var baid = document.getElementById("ca2");
                                if (baid) {
                                    document.getElementById("ca2").focus();
                                    document.getElementById("cdiv2").style.backgroundColor = '#EBEAD9';
                                }
                                else {
                                    var baid = document.getElementById("ca1");
                                    if (baid) {
                                        document.getElementById("ca1").focus();
                                        document.getElementById("cdiv1").style.backgroundColor = '#EBEAD9';
                                    }
                                    else {
                                        var baid = document.getElementById("ca0");
                                        if (baid) {
                                            document.getElementById("ca0").focus();
                                            document.getElementById("cdiv0").style.backgroundColor = '#EBEAD9';
                                        }
                                        else {
                                            var baid = document.getElementById("ba2");
                                            if (baid) {
                                                document.getElementById("ba2").focus();
                                                document.getElementById("bdiv2").style.backgroundColor = '#EBEAD9';
                                            }
                                            else {
                                                var baid = document.getElementById("ba1");
                                                if (baid) {
                                                    document.getElementById("ba1").focus();
                                                    document.getElementById("bdiv1").style.backgroundColor = '#EBEAD9';
                                                }
                                                else {
                                                    var baid = document.getElementById("ba0");
                                                    if (baid) {
                                                        document.getElementById("ba0").focus();
                                                        document.getElementById("bdiv0").style.backgroundColor = '#EBEAD9';
                                                    }
                                                    else {
                                                        var baid = document.getElementById("aa2");
                                                        if (baid) {
                                                            document.getElementById("aa2").focus();
                                                            document.getElementById("adiv2").style.backgroundColor = '#EBEAD9';
                                                        }
                                                        else {
                                                            var baid = document.getElementById("aa1");
                                                            if (baid) {
                                                                document.getElementById("aa1").focus();
                                                                document.getElementById("adiv1").style.backgroundColor = '#EBEAD9';
                                                            }
                                                            else{
                                                                var baid = document.getElementById("aa0");
                                                                if (baid) {
                                                                    document.getElementById("aa0").focus();
                                                                    document.getElementById("adiv0").style.backgroundColor = '#EBEAD9';
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    //禁止浏览器受方向键控制浏览器可视面
    document.onkeydown = function(e) {
        e = e || event;
        if (e.keyCode == 38) {
            //你自己的代码
            return false;
        }
        if (e.keyCode == 40) {
            //你自己的代码
            return false;
        }
    }
}


//通过方向键控制弹出a标签的焦点(诗文项)
function aajaxkeyUp(num) {
    //取键盘值
    var keycode = event.keyCode;
    if (keycode == 40) {
        //当前num+1;
        var newnum = num + 1;
        var aaid = document.getElementById("aa" + newnum);
        //判断诗文是否存在
        if (aaid) {
            document.getElementById("aa" + newnum).focus();
            document.getElementById("adiv" + newnum).style.backgroundColor = '#EBEAD9';
            document.getElementById("adiv" + num).style.backgroundColor = '#F8FCFC';
        }
        else {
            var baid = document.getElementById("ba0");
            //判断名句是否存在
            if (baid) {
                document.getElementById("ba0").focus();
                document.getElementById("bdiv0").style.backgroundColor = '#EBEAD9';
                document.getElementById("adiv" + num).style.backgroundColor = '#F8FCFC';
            }
            else {
                var baid = document.getElementById("ca0");
                //判断作者是否存在
                if (baid) {
                    document.getElementById("ca0").focus();
                    document.getElementById("cdiv0").style.backgroundColor = '#EBEAD9';
                    document.getElementById("adiv" + num).style.backgroundColor = '#F8FCFC';
                }
                else {
                    var baid = document.getElementById("da0");
                    //判断类型是否存在
                    if (baid) {
                        document.getElementById("da0").focus();
                        document.getElementById("ddiv0").style.backgroundColor = '#EBEAD9';
                        document.getElementById("adiv" + num).style.backgroundColor = '#F8FCFC';
                    }
                    else{
                        var baid = document.getElementById("ea0");
                        //判断典籍是否存在
                        if (baid) {
                            document.getElementById("ea0").focus();
                            document.getElementById("ediv0").style.backgroundColor = '#EBEAD9';
                            document.getElementById("adiv" + num).style.backgroundColor = '#F8FCFC';
                        }
                        else {
                            document.getElementById("txtKey").focus();
                            document.getElementById("adiv" + num).style.backgroundColor = '#F8FCFC';
                        }
                    }
                }
            }
         }
    }
    else if (keycode == 38) {
        //当前num-1;
        var newnum = num - 1;
        var baid = document.getElementById("aa" + newnum);
        //判断诗文是否存在
        if (baid) {
            document.getElementById("aa" + newnum).focus();
            document.getElementById("adiv" + newnum).style.backgroundColor = '#EBEAD9';
            document.getElementById("adiv" + num).style.backgroundColor = '#F8FCFC';
        }
        else {
            document.getElementById("txtKey").focus();
            document.getElementById("adiv" + num).style.backgroundColor = '#F8FCFC';
        }
    }

    //禁止浏览器受方向键控制浏览器可视面
    document.onkeydown = function(e) {
        e = e || event;
        if (e.keyCode == 38) {
            //你自己的代码
            return false;
        }
        else if (e.keyCode == 40) {
            //你自己的代码
            return false;
        }
    }
}


//通过方向键控制弹出b标签的焦点(名句项)
function bajaxkeyUp(num) {
    //取键盘值
    var keycode = event.keyCode;
    if (keycode == 40) {
        //当前num+1;
        var newnum = num + 1;
        var baid = document.getElementById("ba" + newnum);
        //判断名句是否存在
        if (baid) {
            document.getElementById("ba" + newnum).focus();
            document.getElementById("bdiv"+newnum).style.backgroundColor = '#EBEAD9';
            document.getElementById("bdiv" + num).style.backgroundColor = '#F8FCFC';
        }
        else {
            var baid = document.getElementById("ca0");
            //判断作者是否存在
            if (baid) {
                document.getElementById("ca0").focus();
                document.getElementById("cdiv0").style.backgroundColor = '#EBEAD9';
                document.getElementById("bdiv" + num).style.backgroundColor = '#F8FCFC';
            }
            else {
                var baid = document.getElementById("da0");
                //判断类型是否存在
                if (baid) {
                    document.getElementById("da0").focus();
                    document.getElementById("ddiv0").style.backgroundColor = '#EBEAD9';
                    document.getElementById("bdiv" + num).style.backgroundColor = '#F8FCFC';
                }
                else{
                    var baid = document.getElementById("ea0");
                    //判断典籍是否存在
                    if (baid) {
                        document.getElementById("ea0").focus();
                        document.getElementById("ediv0").style.backgroundColor = '#EBEAD9';
                        document.getElementById("bdiv" + num).style.backgroundColor = '#F8FCFC';
                    }
                    else {
                    document.getElementById("txtKey").focus();
                    document.getElementById("bdiv" + num).style.backgroundColor = '#F8FCFC';
                    }
                }
            }
        }
    }
    else if (keycode == 38) {
        //当前num-1;
        var newnum = num - 1;
        var baid = document.getElementById("ba" + newnum);
        //判断名句是否存在
        if (baid) {
            document.getElementById("ba" + newnum).focus();
            document.getElementById("bdiv" + newnum).style.backgroundColor = '#EBEAD9';
            document.getElementById("bdiv" + num).style.backgroundColor = '#F8FCFC';
        }
        else {
            var aaid = document.getElementById("aa2");
            //判断诗文2是否存在
            if (aaid) {
                document.getElementById("aa2").focus();
                document.getElementById("adiv2").style.backgroundColor = '#EBEAD9';
                document.getElementById("bdiv" + num).style.backgroundColor = '#F8FCFC';
            }
            else {
                var aaid = document.getElementById("aa1");
                //判断诗文1是否存在
                if (aaid) {
                    document.getElementById("aa1").focus();
                    document.getElementById("adiv1").style.backgroundColor = '#EBEAD9';
                    document.getElementById("bdiv" + num).style.backgroundColor = '#F8FCFC';
                }
                else {
                    var aaid = document.getElementById("aa0");
                    //判断诗文0是否存在
                    if (aaid) {
                        document.getElementById("aa0").focus();
                        document.getElementById("adiv0").style.backgroundColor = '#EBEAD9';
                        document.getElementById("bdiv" + num).style.backgroundColor = '#F8FCFC';
                    }
                    else {
                        document.getElementById("txtKey").focus();
                        document.getElementById("bdiv" + num).style.backgroundColor = '#F8FCFC';
                    }
                }
            }
        }
    }

    //禁止浏览器受方向键控制浏览器可视面
    document.onkeydown = function(e) {
        e = e || event;
        if (e.keyCode == 38) {
            //你自己的代码
            return false;
        }
        if (e.keyCode == 40) {
            //你自己的代码
            return false;
        }
    }
}


//通过方向键控制弹出c标签的焦点(作者项)
function cajaxkeyUp(num) {
    //取键盘值
    var keycode = event.keyCode;
    if (keycode == 40) {
        //当前num+1;
        var newnum = num + 1;
        var baid = document.getElementById("ca"+newnum);
        //判断作者是否存在
        if (baid) {
            document.getElementById("ca" + newnum).focus();
            document.getElementById("cdiv"+newnum).style.backgroundColor = '#EBEAD9';
            document.getElementById("cdiv" + num).style.backgroundColor = '#F8FCFC';
        }
        else {
            var baid = document.getElementById("da0");
            //判断类型是否存在
            if (baid) {
                document.getElementById("da0").focus();
                document.getElementById("ddiv0").style.backgroundColor = '#EBEAD9';
                document.getElementById("cdiv" + num).style.backgroundColor = '#F8FCFC';
            }
            else{
                var baid = document.getElementById("ea0");
                //判断典籍是否存在
                if (baid) {
                    document.getElementById("ea0").focus();
                    document.getElementById("ediv0").style.backgroundColor = '#EBEAD9';
                    document.getElementById("cdiv" + num).style.backgroundColor = '#F8FCFC';
                }
                else {
                document.getElementById("txtKey").focus();
                document.getElementById("cdiv" + num).style.backgroundColor = '#F8FCFC';
                }
            }
        }
    }
    else if (keycode == 38) {
        //当前num-1;
        var newnum = num - 1;
        var baid = document.getElementById("ca" + newnum);
        //判断作者是否存在
        if (baid) {
            document.getElementById("ca" + newnum).focus();
            document.getElementById("cdiv" + newnum).style.backgroundColor = '#EBEAD9';
            document.getElementById("cdiv" + num).style.backgroundColor = '#F8FCFC';
        }
        else {
            var baid = document.getElementById("ba2");
            //判断名句2是否存在
            if (baid) {
                document.getElementById("ba2").focus();
                document.getElementById("bdiv2").style.backgroundColor = '#EBEAD9';
                document.getElementById("cdiv" + num).style.backgroundColor = '#F8FCFC';
            }
            else {
                var baid = document.getElementById("ba1");
                //判断名句1是否存在
                if (baid) {
                    document.getElementById("ba1").focus();
                    document.getElementById("bdiv1").style.backgroundColor = '#EBEAD9';
                    document.getElementById("cdiv" + num).style.backgroundColor = '#F8FCFC';
                }
                else {
                    var baid = document.getElementById("ba0");
                    //判断名句0是否存在
                    if (baid) {
                        document.getElementById("ba0").focus();
                        document.getElementById("bdiv0").style.backgroundColor = '#EBEAD9';
                        document.getElementById("cdiv" + num).style.backgroundColor = '#F8FCFC';
                    }
                    else {
                        var baid = document.getElementById("aa2");
                        //判断诗文2是否存在
                        if (baid) {
                            document.getElementById("aa2").focus();
                            document.getElementById("adiv2").style.backgroundColor = '#EBEAD9';
                            document.getElementById("cdiv" + num).style.backgroundColor = '#F8FCFC';
                        }
                        else {
                            var baid = document.getElementById("aa1");
                            //判断诗文1是否存在
                            if (baid) {
                                document.getElementById("aa1").focus();
                                document.getElementById("adiv1").style.backgroundColor = '#EBEAD9';
                                document.getElementById("cdiv" + num).style.backgroundColor = '#F8FCFC';
                            }
                            else {
                                var aaid = document.getElementById("aa0");
                                //判断诗文0是否存在
                                if (aaid) {
                                    document.getElementById("aa0").focus();
                                    document.getElementById("adiv0").style.backgroundColor = '#EBEAD9';
                                    document.getElementById("cdiv" + num).style.backgroundColor = '#F8FCFC';
                                }
                                else {
                                    document.getElementById("txtKey").focus();
                                    document.getElementById("cdiv" + num).style.backgroundColor = '#F8FCFC';
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    //禁止浏览器受方向键控制浏览器可视面
    document.onkeydown = function(e) {
        e = e || event;
        if (e.keyCode == 38) {
            //你自己的代码
            return false;
        }
        if (e.keyCode == 40) {
            //你自己的代码
            return false;
        }
    }
}


//通过方向键控制弹出d标签的焦点(类型项)
function dajaxkeyUp(num) {
    //取键盘值
    var keycode = event.keyCode;
    if (keycode == 40) {
        //当前num+1;
        var newnum = num + 1;
        var baid = document.getElementById("da"+newnum);
        //判断类型是否存在
        if (baid) {
            document.getElementById("da" + newnum).focus();
            document.getElementById("ddiv" + newnum).style.backgroundColor = '#EBEAD9';
            document.getElementById("ddiv" + num).style.backgroundColor = '#F8FCFC';
        }
        else{
            var baid = document.getElementById("ea0");
            //判断典籍是否存在
            if (baid) {
                document.getElementById("ea0").focus();
                document.getElementById("ediv0").style.backgroundColor = '#EBEAD9';
                document.getElementById("ddiv" + num).style.backgroundColor = '#F8FCFC';
            }
            else {
            document.getElementById("txtKey").focus();
            document.getElementById("ddiv" + num).style.backgroundColor = '#F8FCFC';
            }
        }
    }
    else if (keycode == 38) {
        //当前num-1;
        var newnum = num - 1;
        var baid = document.getElementById("da" + newnum);
        //判断类型是否存在
        if (baid) {
            document.getElementById("da" + newnum).focus();
            document.getElementById("ddiv" + newnum).style.backgroundColor = '#EBEAD9';
            document.getElementById("ddiv" + num).style.backgroundColor = '#F8FCFC';
        }
        else {
            var baid = document.getElementById("ca2");
            //判断作者2是否存在
            if (baid) {
                document.getElementById("ca2").focus();
                document.getElementById("cdiv2").style.backgroundColor = '#EBEAD9';
                document.getElementById("ddiv" + num).style.backgroundColor = '#F8FCFC';
            }
            else {
                var baid = document.getElementById("ca1");
                //判断作者1是否存在
                if (baid) {
                    document.getElementById("ca1").focus();
                    document.getElementById("cdiv1").style.backgroundColor = '#EBEAD9';
                    document.getElementById("ddiv" + num).style.backgroundColor = '#F8FCFC';
                }
                else {
                    var baid = document.getElementById("ca0");
                    //判断作者0是否存在
                    if (baid) {
                        document.getElementById("ca0").focus();
                        document.getElementById("cdiv0").style.backgroundColor = '#EBEAD9';
                        document.getElementById("ddiv" + num).style.backgroundColor = '#F8FCFC';
                    }
                    else {
                        var baid = document.getElementById("ba2");
                        //判断名句2是否存在
                        if (baid) {
                            document.getElementById("ba2").focus();
                            document.getElementById("bdiv2").style.backgroundColor = '#EBEAD9';
                            document.getElementById("ddiv" + num).style.backgroundColor = '#F8FCFC';
                        }
                        else {
                            var baid = document.getElementById("ba1");
                            //判断名句1是否存在
                            if (baid) {
                                document.getElementById("ba1").focus();
                                document.getElementById("bdiv1").style.backgroundColor = '#EBEAD9';
                                document.getElementById("ddiv" + num).style.backgroundColor = '#F8FCFC';
                            }
                            else {
                                var baid = document.getElementById("ba0");
                                //判断名句0是否存在
                                if (baid) {
                                    document.getElementById("ba0").focus();
                                    document.getElementById("bdiv0").style.backgroundColor = '#EBEAD9';
                                    document.getElementById("ddiv" + num).style.backgroundColor = '#F8FCFC';
                                }
                                else {
                                    var baid = document.getElementById("aa2");
                                    //判断诗文2是否存在
                                    if (baid) {
                                        document.getElementById("aa2").focus();
                                        document.getElementById("adiv2").style.backgroundColor = '#EBEAD9';
                                        document.getElementById("ddiv" + num).style.backgroundColor = '#F8FCFC';
                                    }
                                    else {
                                        var baid = document.getElementById("aa1");
                                        //判断诗文1是否存在
                                        if (baid) {
                                            document.getElementById("aa1").focus();
                                            document.getElementById("adiv1").style.backgroundColor = '#EBEAD9';
                                            document.getElementById("ddiv" + num).style.backgroundColor = '#F8FCFC';
                                        }
                                        else {
                                            var baid = document.getElementById("aa0");
                                            //判断诗文0是否存在
                                            if (baid) {
                                                document.getElementById("aa0").focus();
                                                document.getElementById("adiv0").style.backgroundColor = '#EBEAD9';
                                                document.getElementById("ddiv" + num).style.backgroundColor = '#F8FCFC';
                                            }
                                            else {
                                                document.getElementById("txtKey").focus();
                                                document.getElementById("ddiv" + num).style.backgroundColor = '#F8FCFC';
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    //禁止浏览器受方向键控制浏览器可视面
    document.onkeydown = function(e) {
        e = e || event;
        if (e.keyCode == 38) {
            //你自己的代码
            return false;
        }
        if (e.keyCode == 40) {
            //你自己的代码
            return false;
        }
    }
}


//通过方向键控制弹出e标签的焦点(典籍项)
function eajaxkeyUp(num) {
    //取键盘值
    var keycode = event.keyCode;
    if (keycode == 40) {
        //当前num+1;
        var newnum = num + 1;
        var baid = document.getElementById("ea"+newnum);
        //判断典籍是否存在
        if (baid) {
            document.getElementById("ea" + newnum).focus();
            document.getElementById("ediv" + newnum).style.backgroundColor = '#EBEAD9';
            document.getElementById("ediv" + num).style.backgroundColor = '#F8FCFC';
        }
        else {
        document.getElementById("txtKey").focus();
        document.getElementById("ediv" + num).style.backgroundColor = '#F8FCFC';
        }
    }
    else if (keycode == 38) {
        //当前num-1;
        var newnum = num - 1;
        var baid = document.getElementById("ea" + newnum);
        //判断典籍是否存在
        if (baid) {
            document.getElementById("ea" + newnum).focus();
            document.getElementById("ediv" + newnum).style.backgroundColor = '#EBEAD9';
            document.getElementById("ediv" + num).style.backgroundColor = '#F8FCFC';
        }
        else {
            var baid = document.getElementById("da2");
            //判断类型2是否存在
            if (baid) {
                document.getElementById("da2").focus();
                document.getElementById("ddiv2").style.backgroundColor = '#EBEAD9';
                document.getElementById("ediv" + num).style.backgroundColor = '#F8FCFC';
            }
            else {
                var baid = document.getElementById("da1");
                //判断类型1是否存在
                if (baid) {
                    document.getElementById("da1").focus();
                    document.getElementById("ddiv1").style.backgroundColor = '#EBEAD9';
                    document.getElementById("ediv" + num).style.backgroundColor = '#F8FCFC';
                }
                else {
                    var baid = document.getElementById("da0");
                    //判断类型0是否存在
                    if (baid) {
                        document.getElementById("da0").focus();
                        document.getElementById("ddiv0").style.backgroundColor = '#EBEAD9';
                        document.getElementById("ediv" + num).style.backgroundColor = '#F8FCFC';
                    }
                    else {
                        var baid = document.getElementById("ca2");
                        //判断作者2是否存在
                        if (baid) {
                            document.getElementById("ca2").focus();
                            document.getElementById("cdiv2").style.backgroundColor = '#EBEAD9';
                            document.getElementById("ediv" + num).style.backgroundColor = '#F8FCFC';
                        }
                        else {
                            var baid = document.getElementById("ca1");
                            //判断作者1是否存在
                            if (baid) {
                                document.getElementById("ca1").focus();
                                document.getElementById("cdiv1").style.backgroundColor = '#EBEAD9';
                                document.getElementById("ediv" + num).style.backgroundColor = '#F8FCFC';
                            }
                            else {
                                var baid = document.getElementById("ca0");
                                //判断作者0是否存在
                                if (baid) {
                                    document.getElementById("ca0").focus();
                                    document.getElementById("cdiv0").style.backgroundColor = '#EBEAD9';
                                    document.getElementById("ediv" + num).style.backgroundColor = '#F8FCFC';
                                }
                                else {
                                    var baid = document.getElementById("ba2");
                                    //判断名句2是否存在
                                    if (baid) {
                                        document.getElementById("ba2").focus();
                                        document.getElementById("bdiv2").style.backgroundColor = '#EBEAD9';
                                        document.getElementById("ediv" + num).style.backgroundColor = '#F8FCFC';
                                    }
                                    else {
                                        var baid = document.getElementById("ba1");
                                        //判断名句1是否存在
                                        if (baid) {
                                            document.getElementById("ba1").focus();
                                            document.getElementById("bdiv1").style.backgroundColor = '#EBEAD9';
                                            document.getElementById("ediv" + num).style.backgroundColor = '#F8FCFC';
                                        }
                                        else {
                                            var baid = document.getElementById("ba0");
                                            //判断名句0是否存在
                                            if (baid) {
                                                document.getElementById("ba0").focus();
                                                document.getElementById("bdiv0").style.backgroundColor = '#EBEAD9';
                                                document.getElementById("ediv" + num).style.backgroundColor = '#F8FCFC';
                                            }
                                            else{
                                                var baid = document.getElementById("aa2");
                                                //判断诗文2是否存在
                                                if (baid) {
                                                    document.getElementById("aa2").focus();
                                                    document.getElementById("adiv2").style.backgroundColor = '#EBEAD9';
                                                    document.getElementById("ediv" + num).style.backgroundColor = '#F8FCFC';
                                                }
                                                else{
                                                    var baid = document.getElementById("aa1");
                                                    //判断诗文1是否存在
                                                    if (baid) {
                                                        document.getElementById("aa1").focus();
                                                        document.getElementById("adiv1").style.backgroundColor = '#EBEAD9';
                                                        document.getElementById("ediv" + num).style.backgroundColor = '#F8FCFC';
                                                    }
                                                    else{
                                                        var baid = document.getElementById("aa0");
                                                        //判断诗文0是否存在
                                                        if (baid) {
                                                            document.getElementById("aa0").focus();
                                                            document.getElementById("adiv0").style.backgroundColor = '#EBEAD9';
                                                            document.getElementById("ediv" + num).style.backgroundColor = '#F8FCFC';
                                                        }
                                                        else {
                                                        document.getElementById("txtKey").focus();
                                                        document.getElementById("ddiv" + num).style.backgroundColor = '#F8FCFC';
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    //禁止浏览器受方向键控制浏览器可视面
    document.onkeydown = function(e) {
        e = e || event;
        if (e.keyCode == 38) {
            //你自己的代码
            return false;
        }
        if (e.keyCode == 40) {
            //你自己的代码
            return false;
        }
    }
}


(function() {
    var hb = 0,
    V = 107,
    yb = 40,
    tb = 0,
    vb = 13,
    gb = 0,
    N = 0,
    M = [[10, 3, 320, 330, '&#35789;&#20856;', 'zidian.png', 'get']],
    wb = navigator.userAgent.replace(/\s/img, "").toLowerCase(),
    R = wb.match(/msie[678]\.0/),
    F = window,
    b = document,
    i = b.body,
    Ab = b.getElementsByTagName("head")[0],
    kb = location.href.replace("http://", "").replace("https://", "");
    if (hb && !k) k = M[0][0];
    var J = b.documentElement,
    G = 0;
    function jb(b) {
        var a = e("link");
        a.setAttribute("rel", "stylesheet");
        a.setAttribute("type", "text/css");
        a.setAttribute("href", b);
        Ab.appendChild(a)
    }
    jb("/huaci/graybox.css");
    jb("/huaci/blackdownbar.css");
    function s(a) {
        return b.getElementById(a)
    }
    function e(a) {
        return b.createElement(a)
    }
    function a(c, a, b) {
        if (window.addEventListener) {
            c.addEventListener(a, b, false);
            return
        }
        window.attachEvent && c.attachEvent("on" + a, b)
    }
    function n(a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c);
        a.removeEventListener && a.removeEventListener(b, c, false)
    }
    function j(a) {
        a = m(a);
        if (a.stopPropagation) a.stopPropagation();
        else a.cancelBubble = true
    }
    function m(a) {
        return F.event || a
    }
    var d = e("div");
    i.appendChild(d);
    var W = 0,
    T = 0,
    Y = 0,
    ab = 0;
    d.className = "aihuaci";
    function db(b, a) {
        if (b < 100) return false;
        c(d, {
            width: b + "px"
        });
        a && c(d, {
            left: a + "px"
        })
    }
    function bb(a, b) {
        if (a < 100) return false;
        c(d, {
            height: a + "px"
        });
        a = a - 52;
        c(E, {
            height: a + "px"
        });
        c(l, {
            height: a - N + "px"
        });
        b && c(d, {
            top: b + "px"
        })
    }
    var y = e("div");
    d.appendChild(y);
    y.className = "aihuaciheader";
    y.innerHTML = '<p></p><button id="aihuacihead">&nbsp;</button><span></span><button id="aihuaciclose"></button>';
    var fb = s("aihuaciclose");
    a(fb, "mousedown",
    function(a) {
        j(a)
    });
    function eb(a) {
        d.style.display = "none";
        l.setAttribute("src", "about:blank");
        a && j(a)
    }
    a(fb, "click",
    function(a) {
        eb(a)
    });
    a(b, "keydown",
    function(a) {
        a = m(a);
        a.keyCode == 27 && eb()
    });
    var E = e("div");
    E.className = "aihuacimain";
    d.appendChild(E);
    var I = e("div");
    I.className = "aihuacimainloadbox";
    E.appendChild(I);
    I.innerHTML = '<img src="/huaci/img/loading.gif" width="32" height="32" />';
    var l = e("iframe");
    l.setAttribute("frameBorder", 0);
    l.setAttribute("id", "aihuaciiframe");
    l.setAttribute("name", "aihuaciiframe");
    if (R) l = e('<iframe frameBorder="0" id="aihuaciiframe" name="aihuaciiframe">');
    l.onscroll = function(a) {
        a = m(a);
        j(a)
    };
    E.appendChild(l);
    a(l, "load", P);
    function P() {
        I.style.display = "none";
        l.style.display = "block";
        u.style.display = N ? "block" : "none"
    }
    l.onreadystatechange = function() {
        this.readyState && this.readyState == "complete" && P()
    };
    function c(c, a) {
        try {
            for (var b in a) c.style[b] = a[b]
        } catch (d) { }
    }
    var u = e("iframe");
    if (R) u = e('<iframe frameBorder="0" id="aihuaciadvert" name="aihuaciadvert">');
    E.appendChild(u);
    X(u, {
        frameBorder: 0,
        id: "aihuaciadvert",
        name: "aihuaciadvert"
    });
    c(u, {
        height: N + "px",
        width: "100%"
    });
    var C = null;
    function sb(a) {
        C && i.removeChild(C);
        C = e("script");
        C.type = "text/javascript";
        C.src = a;
        i.appendChild(C)
    }
    var H = e("div");
    d.appendChild(H);
    H.innerHTML = '<p></p><div><button id="aihuacibottombtn"></button></div><a href="//www.gushiwen.org/" target="_blank">&#21476;&#35799;&#25991;&#32593;</a><span></span>';
    H.className = "aihuacibottom";
    mb = H.getElementsByTagName("a");
    a(mb[0], "mousedown",
    function(a) {
        j(a)
    });
    var q = e("button");
    d.appendChild(q);
    q.className = "aihuacisidebar";
    c(q, {
        width: "5px",
        height: "100%",
        top: "0px",
        left: "-2px",
        background: "black",
        cursor: "col-resize"
    });
    a(q, "mousedown",
    function() {
        c(g, {
            cursor: "col-resize"
        });
        a(b, "mousemove", q.move);
        a(b, "mouseup",
        function() {
            n(b, "mousemove", q.move)
        })
    });
    q.move = function(a) {
        a = m(a);
        db(W + (Y - a.clientX), a.clientX - K)
    };
    var r = e("button");
    d.appendChild(r);
    r.className = "aihuacisidebar";
    c(r, {
        width: "100%",
        height: "5px",
        top: "-2px",
        left: "0px",
        background: "black",
        cursor: "row-resize"
    });
    a(r, "mousedown",
    function() {
        c(g, {
            cursor: "row-resize"
        });
        a(b, "mousemove", r.move);
        a(b, "mouseup",
        function() {
            n(b, "mousemove", r.move)
        })
    });
    r.move = function(a) {
        a = m(a);
        bb(T + ab - a.clientY, a.clientY + t())
    };
    var p = e("button");
    d.appendChild(p);
    p.className = "aihuacisidebar";
    c(p, {
        width: "5px",
        height: "100%",
        top: "0px",
        right: "-2px",
        background: "black",
        cursor: "col-resize"
    });
    a(p, "mousedown",
    function() {
        c(g, {
            cursor: "col-resize"
        });
        a(b, "mousemove", p.move);
        a(b, "mouseup",
        function() {
            n(b, "mousemove", p.move)
        });
        return false
    });
    p.move = function(a) {
        a = m(a);
        db(a.clientX - Y + W);
        return false
    };
    var o = e("button");
    d.appendChild(o);
    o.className = "aihuacisidebar";
    c(o, {
        width: "100%",
        height: "5px",
        left: "0px",
        bottom: "-2px",
        background: "black",
        cursor: "row-resize"
    });
    a(o, "mousedown",
    function() {
        c(g, {
            cursor: "row-resize"
        });
        a(b, "mousemove", o.move);
        a(b, "mouseup",
        function() {
            n(b, "mousemove", o.move)
        });
        return false
    });
    o.move = function(a) {
        a = m(a);
        var b = T + (a.clientY - ab);
        bb(b);
        return false
    };
    var z = e("button");
    d.appendChild(z);
    z.className = "aihuacisidepart";
    c(z, {
        top: "-2px",
        left: "-2px",
        cursor: "nw-resize"
    });
    a(z, "mousedown",
    function() {
        c(g, {
            cursor: "nw-resize"
        });
        a(b, "mousemove", z.move);
        a(b, "mouseup",
        function() {
            n(b, "mousemove", z.move)
        });
        return false
    });
    z.move = function(a) {
        q.move(a);
        r.move(a);
        return false
    };
    var x = e("button");
    d.appendChild(x);
    x.className = "aihuacisidepart";
    c(x, {
        top: "-2px",
        right: "-2px",
        cursor: "ne-resize"
    });
    a(x, "mousedown",
    function() {
        c(g, {
            cursor: "ne-resize"
        });
        a(b, "mousemove", x.move);
        a(b, "mouseup",
        function() {
            n(b, "mousemove", x.move)
        });
        return false
    });
    x.move = function(a) {
        p.move(a);
        r.move(a);
        return false
    };
    var w = e("button");
    d.appendChild(w);
    w.className = "aihuacisidepart";
    c(w, {
        left: "-2px",
        bottom: "-2px",
        cursor: "sw-resize"
    });
    a(w, "mousedown",
    function() {
        c(g, {
            cursor: "sw-resize"
        });
        a(b, "mousemove", w.move);
        a(b, "mouseup",
        function() {
            n(b, "mousemove", w.move)
        });
        return false
    });
    w.move = function(a) {
        q.move(a);
        o.move(a);
        return false
    };
    var v = e("button");
    d.appendChild(v);
    v.className = "aihuacisidepart";
    c(v, {
        right: "-2px",
        bottom: "-2px",
        cursor: "se-resize"
    });
    a(v, "mousedown",
    function() {
        c(g, {
            cursor: "se-resize"
        });
        a(b, "mousemove", v.move);
        a(b, "mouseup",
        function() {
            n(b, "mousemove", v.move)
        });
        return false
    });
    v.move = function(a) {
        p.move(a);
        o.move(a);
        return false
    };
    var g = e("div");
    i.appendChild(g);
    g.className = "blankmask";
    g.style.display = "none";
    a(d, "mousedown",
    function(a) {
        a = m(a);
        j(a);
        W = d.offsetWidth;
        T = d.offsetHeight;
        Y = a.clientX;
        ab = a.clientY;
        g.setCapture && g.setCapture();
        c(g, {
            width: G + "px",
            height: Math.max(J.scrollHeight, i.scrollHeight, F.screen.availHeight, i.offsetHeight) + "px",
            display: "block",
            left: "-" + K + "px",
            top: "0px"
        });
        return false
    });
    a(g, "click",
    function(a) {
        j(a)
    });
    a(d, "mousemove",
    function() {
        return false
    });
    a(y, "dblclick",
    function(a) {
        j(a);
        return false
    });
    a(y, "mousedown",
    function() {
        return false
    });
    a(y, "mousemove",
    function() {
        return false
    });
    a(g, "mousemove",
    function() {
        return false
    });
    a(b, "mouseup",
    function() {
        g.releaseCapture && g.releaseCapture();
        g.style.display = "none";
        return false
    });
    function t() {
        return J.scrollTop || i.scrollTop
    }
    var h = {};
    h.top = function(a) {
        return !a ? 0 : a.offsetTop + this.top(a.offsetParent)
    };
    h.left = function(a) {
        return !a ? 0 : a.offsetLeft + this.left(a.offsetParent)
    };
    h.Move = function(a) {
        a = m(a);
        if (a.clientY < 10) return false;
        c(d, {
            left: a.clientX - h.PointX + "px",
            top: t() + a.clientY - h.PointY + "px"
        });
        return false
    };
    h.Stop = function() {
        d.onresize();
        c(g, {
            cursor: "default"
        });
        n(b, "mousemove", h.Move);
        n(b, "mouseup", h.Stop)
    };
    h.Down = function(e) {
        e = m(e);
        h.PointX = e.clientX - h.left(d.offsetParent) - h.left(d);
        h.PointY = t() + e.clientY - h.top(d);
        c(g, {
            cursor: "move",
            display: "block"
        });
        a(b, "mousemove", h.Move);
        a(b, "mouseup", h.Stop);
        return false
    };
    a(y, "mousedown", h.Down);
    var K = 0;
    function pb() {
        try {
            var d = i.currentStyle ? i.currentStyle.position : b.defaultView ? b.defaultView.getComputedStyle(i, null).position : "";
            if (d != "static") {
                var a = e("div");
                i.appendChild(a);
                c(a, {
                    width: "0px",
                    height: "0px",
                    overflow: "hidden",
                    padding: "0px",
                    margin: "0px"
                });
                i.style.position = "static";
                K = h.left(a);
                i.style.position = d;
                i.removeChild(a)
            }
            G = J.clientWidth || i.clientWidth
        } catch (f) { }
    }
    pb();
    a(F, "resize", pb);
    a(F, "scroll",
    function() {
        k && D[k] && setTimeout(function() {
            c(d, {
                top: t() + D[k][3] + "px"
            })
        },
        100)
    });
    var f = e("form");
    f.setAttribute("target", "aihuaciiframe");
    f.setAttribute("method", "post");
    if (R) f = e('<form target="aihuaciiframe" accept-charset="utf-8" method="post">');
    f.setAttribute("action", "/dict/fancha.aspx");
    f.acceptCharset = "utf-8";
    i.appendChild(f);
    f.className = "aihuacitollbar";
    f.innerHTML = '<input type="hidden" id="aihuacikeyword" name="z" /><input type="hidden" name="url" value="' + kb + '" />';
    function X(c, a) {
        for (var b in a) c.setAttribute(b, a[b])
    }
    function zb(a) {
        a = a.match(/\d+/img);
        for (var d = a.length,
        c = [], b = 0; b < d; b++) c.push(String.fromCharCode(a[b]));
        return c.join("")
    }
    var ib = e("ul");
    f.appendChild(ib);
    var lb = M.length;
    f.style.width = lb * yb + tb + "px";
    for (var L = [], cb = 0; cb < lb; cb++) {
        var B = e("li");
        ib.appendChild(B);
        var A = M[cb];
        X(B, {
            toolid: A[0],
            params: A[2] + "," + A[3] + "," + A[4]
        });
        var Z = e("img");
        B.appendChild(Z);
        Z.src = "";
        X(Z, {
            title: zb(A[4])
        });
        var S = e("button");
        S.setAttribute("type", "button");
        B.appendChild(S);
        S.innerHTML = A[4];
        L.push(B);
        Bb(B)
    }
    c(B, {
        backgroundPosition: "0px 0px"
    });
    var Cb = e("span");
    f.appendChild(Cb);
    function Q(a, c) {
        var b = encodeURIComponent(a);
        return b.length <= c ? b : Q(a.substring(0, a.length - 1), c)
    }
    var O = "";
    function Bb(e) {
        a(e, "mousedown",
        function(a) {
            j(a)
        });
        e.onclick = function(n) {
            j(n);
            var m = this;
            k = m.getAttribute("toolid");
            var e = m.getAttribute("params").split(",");
            if (!D[k]) {
                var h = Math.min(i.clientHeight, J.clientHeight) - e[1];
                if (h < 0) h = Math.max(i.clientHeight, J.clientHeight) - e[1];
                D[k] = [e[0], e[1], G - K - e[0], h - 2]
            }
            var g = O;
            s("aihuacihead").innerHTML = e[2] + " - " + g.substring(0, 15);
            var a = D[k];
            c(d, {
                width: a[0] + "px",
                height: a[1] + "px",
                display: "block",
                left: a[2] + "px",
                top: a[3] + t() + "px"
            });
            db(a[0], a[2] - 2);
            bb(a[1], a[3] + t());
            c(H, {
                bottom: "0px"
            });
            I.style.display = "block";
            c(l, {
                display: "none"
            });
            u.style.display = "none";
            setTimeout(function() {
                P()
            },
            3e3);
            if (M[6] == "get") {
                g = Q(g, 1800);
                s("aihuacititle").value = Q(b.title, 180)
            }
            s("aihuacikeyword").value = g;
            b.charset = "utf-8";
            N && u.setAttribute("src", "");
            f.submit();
            b.charset = s("aihuacicharset").value
        }
    }
    function rb() {
        return F.getSelection ? F.getSelection().toString() : b.selection && b.selection.createRange ? b.selection.createRange().text : null
    }
    var nb, ob;
    a(b, "mousedown",
    function(a) {
        a = m(a);
        nb = a.clientX
    });
    a(b, "mouseup",
    function(a) {
        a = m(a);
        ob = a.clientX;
        var e = parseInt((ob - nb) / 2);
        e = e > 0 ? 10 : -10;
        var g = rb();
        if (g.length > 0 & g.length < 15) {
            c(f, {
                display: "block"
            });
            if (O != g) {
                O = g;
                c(f, {
                    left: a.clientX + gb - e - K - 30 + "px",
                    top: t() + a.clientY + vb + "px"
                });
                if (hb) for (var h = L.length,
                b = 0; b < h; b++) if (parseInt(L[b].getAttribute("toolid")) == k) L[b].onclick(a)
            }
            f.offsetLeft + f.offsetWidth > G && c(f, {
                left: G + gb - e - f.offsetWidth + "px"
            });
            f.offsetLeft < 0 && c(f, {
                left: "0"
            });
        } else {
            c(f, {
                display: "none"
            });
            c(d, {
                display: "none"
            })
        }
    });
    var D = {};
    d.onresize = function() {
        D[k] = [d.offsetWidth, d.offsetHeight, d.offsetLeft, d.offsetTop - t()]
    };
    a(f, "click",
    function(a) {
        j(a)
    });
    a(f, "mousedown",
    function(a) {
        j(a)
    });
    a(f, "mouseup",
    function(a) {
        j(a)
    })
})()