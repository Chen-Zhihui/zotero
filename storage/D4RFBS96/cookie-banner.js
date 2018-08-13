(function () {
    var arcgisCookieSetter = 'https://doc.arcgis.com/cookie-setter.html?gdpr=';
    var esriCookieSetter = 'https://webapps-cdn.esri.com/CDN/components/Cookie/cookie-setter.html?gdpr=';
    var gisdayCookieSetter = 'https://www.gisday.com/cookie-setter.html?gdpr=';
    var wikiGisCookieSetter = 'https://wiki.gis.com/wiki/cookie-setter.html?gdpr=';
    var pardotCookieSetter = 'https://go.pardot.com/l/82202/2018-05-24/kxp8rm?gdpr=';
    var esriIrelandCookieSetter = 'https://www.esri-ireland.ie/cookie-setter?gdpr=';

    var fontStyleSheet = 'https://webapps-cdn.esri.com/CDN/fonts/fonts.css';
    var cookieStyleSheet = window.location.hostname === 'webapps-cdn-dev.esri.com' || window.location.hostname === 'localhost' ? 'https://webapps-cdn-dev.esri.com/CDN/components/Cookie/cookie-banner.css' : 'https://webapps-cdn.esri.com/CDN/components/Cookie/cookie-banner.css?nocache=true';

    var esriDomains = ['esri.com', 'arcgis.com', 'gisday.com', 'gis.com', 'pardot.com'];
    var esriUKDomains = ['esriuk.com', 'esri-ireland.ie'];

    var hostName = window.location.hostname;
    function addCss(filename) {
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('link');
        style.href = filename;
        style.type = 'text/css';
        style.rel = 'stylesheet';
        head.appendChild(style);
    };

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toGMTString();
        var domain = '';
        domain = hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1));
        if (domain.indexOf(".com") == 0) domain = hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".com") - 1));

        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/; domain=" + domain + ";";
    };

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    function setGDPRCookies(cookieValue, redirectUrl) {
        if (cookieValue == 'true') {
            setCookie("esri_gdpr", cookieValue, 365);
            setCookie("sat_track", cookieValue, 365);
        } else {
            setCookie("esri_gdpr", cookieValue, 182);
            setCookie("sat_track", cookieValue, 182);
        }

        if (esriDomains.indexOf(hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1)) > -1) {
            setCookieIframe(cookieValue, arcgisCookieSetter, "arcgis-cookie-iframe");
            setCookieIframe(cookieValue, gisdayCookieSetter, "gisday-cookie-iframe");
            setCookieIframe(cookieValue, wikiGisCookieSetter, "gis-cookie-iframe");
            setCookieIframe(cookieValue, pardotCookieSetter, "pardot-cookie-iframe");
            setCookieIframe(cookieValue, esriCookieSetter, "esri-cookie-iframe", redirectUrl);
        } else if (esriUKDomains.indexOf(hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1)) > -1) {
            setCookieIframe(cookieValue, esriIrelandCookieSetter, "esri-ireland-cookie-iframe", redirectUrl);
        }
        document.getElementById("esri-cookie-banner").classList.add('hide');
    }

    function setCookieIframe(val, cookieUrl, id, redirectUrl) {
        var iframe = document.createElement('iframe');
        iframe.id = id;
        if (typeof redirectUrl !== "undefined") iframe.onload = function () {
            window.location.href = redirectUrl;
        };
        iframe.setAttribute('src', cookieUrl + val);
        iframe.classList.add('esri-cookie-hidden');
        document.body.appendChild(iframe);
    };

    function getCookieConfig() {
        if (window._cookieNotificationSettings) {
            return window._cookieNotificationSettings;
        } else {
            return {
                "show": "true",
                "dialogText": "<p>We use cookies to support your experience.</p>\r\n",
                "dialogTheme": "dark",
                "dialogPlacement": "bottom",
                "button1_show": "true",
                "button1_style": "link",
                "button1_label": "Learn more",
                "button1_sets_cookie": "true",
                "button1_cookie_value": "false",
                "button1_is_link": "true",
                "button1_link_url": "https://www.esri.com/en-us/privacy/manage-privacy/cookies",
                "button2_show": "true",
                "button2_style": "button",
                "button2_label": "Accept cookies",
                "button2_sets_cookie": "true",
                "button2_cookie_value": "true",
                "button2_is_link": "false",
                "button2_link_url": ""
            };
        }
    }

    function insertBannerAndBind(cookieNotification) {
        var body = document.getElementsByTagName('body')[0];
        body.insertBefore(cookieNotification, body.firstChild);
        [].slice.call(document.getElementsByClassName('cookie-banner-action')).forEach(function (elm) {
            elm.addEventListener('click', function (evt) {
                evt.preventDefault();
                var btn = evt.target;
                if (btn.hasAttribute('data-sets-cookie') && btn.attributes['data-sets-cookie'].value === "true") {
                    var cookieValue = btn.attributes['data-cookie-value'].value;
                    if (btn.hasAttribute('data-is-link') && btn.attributes['data-is-link'].value === "true") {
                        var linkUrl = btn.attributes['data-link-url'].value;
                        setGDPRCookies(cookieValue, linkUrl);
                    } else {
                        setGDPRCookies(cookieValue, window.location.href);
                    }
                } else if (btn.hasAttribute('data-is-link') && btn.attributes['data-is-link'].value === "true") {
                    var _linkUrl = btn.attributes['data-link-url'].value;
                    window.location.href = _linkUrl;
                } else {
                    document.getElementById("esri-cookie-banner").classList.add('hide');
                    window.location.reload();
                }
            });
        });
    };

    if (readCookie('esri_gdpr') === null) {
        addCss(fontStyleSheet);
        addCss(cookieStyleSheet);

        var cookieConfig = getCookieConfig();

        var cookieNotification = document.createElement('div');
        cookieNotification.id = 'esri-cookie-notification';
        var html = '';
        html += '<div id="esri-cookie-banner" data-theme=\'' + cookieConfig.dialogTheme + '\' data-position=\'' + cookieConfig.dialogPlacement + '\' data-fixed="false" style="display: none;">';
        html += '   <div class="esri-cookie-banner__inner">';
        html += '       <div class="esri-cookie-banner__inner-content">';
        html += '           <div class="esri-cookie-banner__text-wrapper">';
        html += '                  <div class="esri-cookie-banner__text"> ' + cookieConfig.dialogText + '</div>';
        html += '           </div>';
        html += '           <div class="esri-cookie-banner__button-wrapper">';
        html += '               <a class="cookie-banner-action esri-cookie-banner__button-one ' + (cookieConfig.button1_show !== 'true' ? 'esri-cookie-hidden' : cookieConfig.button1_style) + '" data-is-link="' + cookieConfig.button1_is_link + '" data-link-url="' + cookieConfig.button1_link_url + '" data-sets-cookie="' + cookieConfig.button1_sets_cookie + '" data-cookie-value="' + cookieConfig.button1_cookie_value + '" >' + cookieConfig.button1_label + '</a>';
        html += '               <a class="cookie-banner-action esri-cookie-banner__button-two ' + (cookieConfig.button2_show !== 'true' ? 'esri-cookie-hidden' : cookieConfig.button2_style) + '" data-is-link="' + cookieConfig.button2_is_link + '" data-link-url="' + cookieConfig.button2_link_url + '" data-sets-cookie="' + cookieConfig.button2_sets_cookie + '" data-cookie-value="' + cookieConfig.button2_cookie_value + '" >' + cookieConfig.button2_label + '</a>';
        html += '           </div>';
        html += '       </div>';
        html += '   </div>';
        html += '</div>';
        cookieNotification.innerHTML = html;

        insertBannerAndBind(cookieNotification);
    }
})();
//# sourceMappingURL=cookie-banner.js.map
