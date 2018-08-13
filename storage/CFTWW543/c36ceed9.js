(function() {
    "use strict";
    function __extends(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var globalWindow = window;
    var window$1 = globalWindow;
    var navigator$1 = globalWindow.navigator;
    var document$1 = globalWindow.document;
    var history = globalWindow.history;
    var location$1 = globalWindow.location;
    var $$1 = window$1.jQuery;
    var msDocs = window$1.msDocs;
    var contentLoaded = new Promise(function(resolve) {
        if (document$1.readyState === "loading") {
            document$1.addEventListener("DOMContentLoaded", function() {
                return resolve();
            });
        } else {
            resolve();
        }
    });
    function affix() {
        var isRightToLeft = msDocs.data.userDir == "rtl";
        var primary = document$1.querySelector(".primary-holder");
        var left = document$1.getElementById("sidebarContent");
        var right = document$1.getElementById("page-actions-content");
        var header = document$1.querySelector(".header-holder");
        var footer = document$1.querySelector(".footerContainer");
        var leftContainer = document$1.getElementById("left-container");
        var rightContainer = document$1.getElementById("right-container");
        var filterHolder = document$1.querySelector(".filterHolder");
        if (left === null && right === null) {
            return;
        }
        function update() {
            var spacing = 24;
            var _a = header.getBoundingClientRect(), headerBottom = _a.bottom, headerHeight = _a.height;
            var _b = footer.getBoundingClientRect(), footerTop = _b.top, footerHeight = _b.height;
            var primaryTop = primary.getBoundingClientRect().top;
            var filterHolderHeight = filterHolder !== null ? filterHolder.getBoundingClientRect().height : 0;
            var tocMaxHeight = filterHolderHeight;
            var headerInView = headerBottom >= 0;
            var footerInView = footerTop < window$1.innerHeight;
            var windowTop = primaryTop < 0 ? spacing : primaryTop + spacing;
            var bottom = Math.max(window$1.innerHeight, window$1.innerHeight - footerTop) + spacing;
            var height = bottom - windowTop - filterHolderHeight - spacing * 2 + "px";
            if (footerInView && !headerInView) {
                height = bottom - windowTop - footerHeight - filterHolderHeight - spacing * 4 + "px";
            }
            if (headerInView && footerInView) {
                height = bottom - windowTop - footerHeight - filterHolderHeight - spacing * 2 + "px";
            }
            var scrollAmount = window$1.pageYOffset;
            var scrollThreshold = headerHeight + spacing;
            if (left !== null) {
                var _c = leftContainer.getBoundingClientRect(), leftTop = _c.top, width = _c.width;
                var top = scrollAmount > scrollThreshold ? -leftTop + spacing : spacing;
                var toc = left.querySelector(".toc");
                toc.style.maxHeight = "calc(100% - " + tocMaxHeight + "px)";
                if (isRightToLeft) {
                    left.style.right = "0";
                    left.style.left = spacing + "px";
                } else {
                    left.style.left = "0";
                    left.style.right = spacing + "px";
                }
                left.style.top = top + "px";
                left.style.width = width - spacing + "px";
                left.style.height = height;
            }
            if (right !== null) {
                var _d = rightContainer.getBoundingClientRect(), rightTop = _d.top, width = _d.width;
                var top = scrollAmount > scrollThreshold ? -rightTop + spacing : 0;
                if (isRightToLeft) {
                    right.style.right = spacing + "px";
                    right.style.left = "0";
                } else {
                    right.style.left = spacing + "px";
                    right.style.right = "0";
                }
                right.style.top = top + "px";
                right.style.width = width - spacing + "px";
                right.style.height = height;
            }
        }
        var animationFrame = 0;
        function scheduleUpdate() {
            cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(update);
        }
        window$1.addEventListener("scroll", scheduleUpdate, {
            passive: true
        });
        window$1.addEventListener("resize", scheduleUpdate, {
            passive: true
        });
        window$1.addEventListener("content-update", scheduleUpdate);
        update();
        window$1.addEventListener("load", update, false);
        window$1.addEventListener("DOMContentLoaded", update, false);
    }
    function notifyContentUpdated() {
        window$1.dispatchEvent(new CustomEvent("content-update"));
    }
    var loc = window.msDocs.loc;
    function showDisclaimer(message, link, additionalClasses) {
        var disclaimerHolder = document$1.getElementById("disclaimer-holder");
        additionalClasses = additionalClasses || "";
        disclaimerHolder.insertAdjacentHTML("afterbegin", '\n\t\t<div class="alert disclaimer ' + additionalClasses + '" lang="' + msDocs.data.userLocale + '" dir="' + msDocs.data.userDir + '">\n\t\t\t<p>' + message + "</p>\n\t\t</div>\n\t");
        var alert = disclaimerHolder.firstElementChild;
        if (link) {
            alert.insertAdjacentHTML("beforeend", '<a class="button-border" href="' + link.url + '">' + link.text + "</a>");
        }
        if (checkIsArchived()) {
            alert.classList.add("previous-version-disc");
        }
        alert.insertAdjacentHTML("beforeend", '<button type="button" class="button-dismiss no-style"><span class="visually-hidden">' + loc["disclaimer.dismissAlert"] + "</span></button>");
        notifyContentUpdated();
        return alert;
    }
    function setupDismissAlerts() {
        window.addEventListener("click", function(_a) {
            var target = _a.target;
            var button = target instanceof Element && target.closest(".disclaimer > .button-dismiss");
            if (!button) {
                return;
            }
            var alert = button.parentElement;
            alert.classList.add("disappearing");
            setTimeout(function() {
                alert.parentNode.removeChild(alert);
                notifyContentUpdated();
            }, 500);
        }, {
            passive: true
        });
    }
    var metaDictionary;
    function readMetaTags() {
        metaDictionary = {};
        var metaTags = document$1.head.querySelectorAll("meta[name],meta[property]");
        for (var i = 0; i < metaTags.length; i++) {
            var meta = metaTags.item(i);
            var name = meta.name;
            if (name === "") {
                name = meta.getAttribute("property");
                if (name === "") {
                    continue;
                }
            }
            if (metaDictionary[name]) {
                metaDictionary[name].push(meta.content);
            } else {
                metaDictionary[name] = [ meta.content ];
            }
        }
    }
    function getMeta(name) {
        if (metaDictionary === undefined) {
            readMetaTags();
        }
        return metaDictionary[name] === undefined ? undefined : metaDictionary[name][0];
    }
    function getMetas(name) {
        if (metaDictionary === undefined) {
            readMetaTags();
        }
        return metaDictionary[name] ? metaDictionary[name].slice() : [];
    }
    function parseQueryString(queryString) {
        var match;
        var pl = /\+/g;
        var search = /([^&=]+)=?([^&]*)/g;
        var decode = function(s) {
            return decodeURIComponent(s.replace(pl, " "));
        };
        if (queryString === undefined) {
            queryString = location$1.search;
        }
        queryString = queryString.substring(1);
        var urlParams = {};
        while (match = search.exec(queryString)) {
            urlParams[decode(match[1])] = decode(match[2]);
        }
        return urlParams;
    }
    function toQueryString(args) {
        var parts = [];
        for (var name in args) {
            if (args.hasOwnProperty(name) && args[name] !== "" && args[name] !== null && args[name] !== undefined) {
                parts.push(encodeURIComponent(name) + "=" + encodeURIComponent(args[name]));
            }
        }
        return parts.join("&");
    }
    function updateQueryString(args, method) {
        var current = parseQueryString();
        var changed = false;
        for (var name in args) {
            if (args.hasOwnProperty(name) && current[name] !== args[name]) {
                current[name] = args[name];
                changed = true;
            }
        }
        if (!changed) {
            return;
        }
        var queryString = toQueryString(current);
        if (queryString.length > 0) {
            queryString = "?" + queryString;
        }
        var url = location$1.protocol + "//" + location$1.host + location$1.pathname + queryString + location$1.hash;
        if (method === "pushState") {
            history.pushState(current, document$1.title, url);
        } else if (method === "replaceState") {
            history.replaceState(current, document$1.title, url);
        } else {
            location$1.href = url;
        }
    }
    function parseUrl(url) {
        var a = document$1.createElement("a");
        if (/^https:\/\/|^http:\/\//.test(url)) {
            a.href = url;
        } else if (/^\/\//.test(url)) {
            a.href = location$1.protocol + url;
        } else {
            a.href = location$1.origin + url;
        }
        var pathname = a.pathname[0] === "/" ? a.pathname : "/" + a.pathname;
        var host = a.host.replace(/:443$|:80$/, "");
        var hostname = a.hostname.replace(/:443$|:80$/, "");
        return {
            hash: a.hash,
            host: host,
            hostname: hostname,
            href: a.href,
            origin: a.protocol + "//" + host,
            pathname: pathname,
            protocol: a.protocol,
            search: a.search
        };
    }
    var base = location.host === "localhost:44333" || location.hostname === "ppe.techprofile.microsoft.com" ? "https://auth.ppe.docs.microsoft.com/api/auth" : "https://docs.microsoft.com/api/auth";
    var claimsUrl = base + "/claims";
    var signInUrl = base + "/signin";
    var signOutUrl = base + "/signout";
    var returnUrlArg = "replyUrl";
    function tryLoadUser() {
        return fetch(claimsUrl, {
            mode: "cors",
            credentials: "include"
        }).then(function(response) {
            if (response.ok && response.status !== 204) {
                return response.json().then(function(claims) {
                    return user.readFromClaims(claims);
                });
            } else {
                user.setAnonymous();
            }
        }, function() {
            return user.setAnonymous();
        });
    }
    function process401Response(response) {
        if (response.status === 401) {
            user.setAnonymous();
        }
        return response;
    }
    var idProperty = "__event_type_id__";
    var nextId = 0;
    var EventBus = function() {
        function EventBus() {
            this.callbacks = {};
        }
        EventBus.prototype.publish = function(event) {
            var id = event.constructor[idProperty];
            if (id === undefined || this.callbacks[id] === undefined) {
                return;
            }
            var callbacks = this.callbacks[id].slice(0);
            for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
                var callback = callbacks_1[_i];
                callback(event);
            }
        };
        EventBus.prototype.subscribe = function(eventType, callback) {
            var _this = this;
            if (!eventType.hasOwnProperty(idProperty)) {
                eventType[idProperty] = nextId++;
            }
            var id = eventType[idProperty];
            if (this.callbacks[id] === undefined) {
                this.callbacks[id] = [];
            }
            var callbacks = this.callbacks[id];
            if (callbacks.indexOf(callback) === -1) {
                callbacks.push(callback);
            }
            return function() {
                return _this.unsubscribe(eventType, callback);
            };
        };
        EventBus.prototype.unsubscribe = function(eventType, callback) {
            var id = eventType[idProperty];
            if (id === undefined || this.callbacks[id] === undefined) {
                return;
            }
            var callbacks = this.callbacks[id];
            var index = callbacks.indexOf(callback);
            if (index !== -1) {
                callbacks.splice(index, 1);
            }
        };
        return EventBus;
    }();
    var eventBus = new EventBus();
    var fallbackImageUrl = "https://mem.gfx.ms/me/MeControl/9.18088.0/msa_enabled.png";
    var UserChangedEvent = function() {
        function UserChangedEvent() {}
        return UserChangedEvent;
    }();
    var User = function(_super) {
        __extends(User, _super);
        function User() {
            var _this = _super.call(this) || this;
            _this.setAnonymous();
            return _this;
        }
        User.prototype.setAnonymous = function() {
            if (this.isAuthenticated === false) {
                return;
            }
            this.id = "00000000-0000-0000-0000-000000000000";
            this.email = "anonymous@anonymous.com";
            this.name = "Anonymous";
            this.isAuthenticated = false;
            this.authenticationMode = "AAD";
            this.profileImageUrl = "";
            this.publish(new UserChangedEvent());
        };
        User.prototype.readFromClaims = function(claimsInfo) {
            this.id = claimsInfo.claims.id;
            this.email = claimsInfo.claims.email || "";
            this.name = claimsInfo.claims.name || claimsInfo.claims.email || loc.userNameFallback;
            this.isAuthenticated = true;
            this.authenticationMode = claimsInfo.authenticationMode.toUpperCase();
            this.profileImageUrl = claimsInfo.claims.profilePicLink || fallbackImageUrl;
            this.publish(new UserChangedEvent());
        };
        User.prototype.whenAuthenticated = function() {
            var _this = this;
            if (user.isAuthenticated) {
                return Promise.resolve();
            }
            return new Promise(function(resolve) {
                return _this.subscribe(UserChangedEvent, function() {
                    if (_this.isAuthenticated) {
                        resolve();
                    }
                });
            });
        };
        User.prototype.signout = function(returnUrl) {
            if (returnUrl === void 0) {
                returnUrl = encodeURIComponent(location.href);
            }
            location.href = signOutUrl + "?" + returnUrlArg + "=" + returnUrl;
        };
        return User;
    }(EventBus);
    var user = new User();
    function initDisplayClasses(user$$1, container) {
        var handler = function() {
            return container.setAttribute("data-authenticated", user$$1.isAuthenticated.toString());
        };
        handler();
        user$$1.subscribe(UserChangedEvent, handler);
    }
    var keyCodes = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        home: 36,
        end: 35,
        escape: 27,
        enter: 13
    };
    var signInClassName = "docs-sign-in";
    var signOutClassName = "docs-sign-out";
    function initSignInLinks(container) {
        initBIHandler(container);
        container.addEventListener("click", function(event) {
            if (!(event.target instanceof Element)) {
                return;
            }
            var element = event.target.closest("." + signInClassName + ", ." + signOutClassName);
            if (!element) {
                return;
            }
            var isSignIn = element.classList.contains(signInClassName);
            event.preventDefault();
            location.href = (isSignIn ? signInUrl : signOutUrl) + "?" + returnUrlArg + "=" + encodeURIComponent(location.href);
        });
    }
    function initBIHandler(container) {
        var attributeHandler = function(event) {
            if (!(event.target instanceof Element)) {
                return;
            }
            var element = event.target.closest("." + signInClassName + ", ." + signOutClassName);
            if (!element) {
                return;
            }
            var isSignIn = element.classList.contains(signInClassName);
            event.target.setAttribute("data-m", JSON.stringify({
                cN: isSignIn ? signInClassName : signOutClassName,
                bhvr: isSignIn ? 100 : 101
            }));
        };
        container.addEventListener("touchstart", attributeHandler, true);
        container.addEventListener("pointerdown", attributeHandler, true);
        container.addEventListener("keyup", function(event) {
            if (event.which === keyCodes.enter) {
                attributeHandler(event);
            }
        }, true);
    }
    var resolveAuthStatus;
    var authStatusDetermined = new Promise(function(resolve) {
        return resolveAuthStatus = resolve;
    });
    function initAuth() {
        if (!isSigninEnabled()) {
            return;
        }
        initDisplayClasses(user, document.documentElement);
        initSignInLinks(document.documentElement);
        createAuthenticationControl(document.documentElement);
        tryLoadUser().then(resolveAuthStatus);
    }
    function isSigninEnabled() {
        var restrictedBrands = {
            azure: true,
            mooncake: true,
            advocates: true,
            "regional-directors": true
        };
        return !restrictedBrands[msDocs.data.brand];
    }
    var nextId$1 = 0;
    function generateElementId() {
        return "ax-" + nextId$1++;
    }
    function loadLibrary(url, globalName) {
        return new Promise(function(resolve, reject) {
            var script = document.createElement("script");
            script.src = url;
            script.async = true;
            script.defer = true;
            script.onload = resolve;
            script.onerror = function() {
                reject("Failed to load " + url);
            };
            (document.body || document.head).appendChild(script);
        }).then(function() {
            if (globalName === undefined) {
                return undefined;
            }
            if (window[globalName] === undefined) {
                throw new Error(url + " loaded successfully but " + globalName + " is undefined.");
            }
            return window[globalName];
        });
    }
    var rtlDictionary = {
        "ar-sa": true,
        "he-il": true
    };
    function loadUhf() {
        var isAzure = msDocs.data.brand === "azure";
        var method = isAzure ? "GetConsentBanner" : "GetUHF";
        var args = isAzure ? {
            locale: msDocs.data.userLocale
        } : {
            locale: msDocs.data.userLocale,
            headerId: getMeta("force_uhf_ppe") ? "MSDocsHeader-DocsL1" : checkIsArchived() ? "MSDocsHeader-Archive" : msDocs.data.context.uhfHeaderId || getMeta("uhfHeaderId") || "MSDocsHeader-DocsL1",
            footerId: "MSDocsFooter"
        };
        var promise = Promise.resolve(false);
        if (!isAzure && getMeta("force_uhf_ppe") === "true") {
            promise = Promise.resolve(true);
        }
        return promise.then(function(experimentEnabled) {
            if (experimentEnabled) {
                args.usePPE = true;
            }
            var url = "https://docs.microsoft.com/api/" + method + "?" + toQueryString(args);
            return fetch(url).then(function(response) {
                return response.json();
            });
        }).then(function(uhf) {
            var htmlPrerequisites = [ contentLoaded ];
            var firstHeadElt = document$1.head.firstElementChild;
            var _loop_1 = function(url) {
                var link = document$1.createElement("link");
                link.rel = "stylesheet";
                link.href = url;
                htmlPrerequisites.push(new Promise(function(resolve) {
                    link.onload = resolve;
                }));
                document$1.head.insertBefore(link, firstHeadElt);
            };
            for (var _i = 0, _a = uhf.cssIncludes; _i < _a.length; _i++) {
                var url = _a[_i];
                _loop_1(url);
            }
            return Promise.all(htmlPrerequisites).then(function() {
                return uhf;
            });
        }).then(function(uhf) {
            var placeholderId = isAzure ? "azure-cookie-notification-holder" : "headerAreaHolder";
            var placeholder = document$1.getElementById(placeholderId);
            placeholder.innerHTML = uhf.headerHTML;
            if (!isAzure) {
                placeholder.querySelector(".c-uhfh-actions").insertAdjacentHTML("beforeend", '<div class="auth-control" aria-busy="true" aria-label="' + loc.loading + '"></div>');
            }
            notifyContentUpdated();
            var scriptPromises = [];
            var _loop_2 = function(url) {
                var script = document$1.createElement("script");
                script.src = url;
                script.defer = true;
                scriptPromises.push(new Promise(function(resolve) {
                    script.onload = resolve;
                }));
                document$1.head.appendChild(script);
            };
            for (var _i = 0, _a = uhf.javascriptIncludes; _i < _a.length; _i++) {
                var url = _a[_i];
                _loop_2(url);
            }
            return Promise.all(scriptPromises);
        });
    }
    function disableSearchSuggestions() {
        var shellOptions = {
            as: {
                callback: function() {}
            }
        };
        if (window$1.msCommonShell) {
            window$1.msCommonShell.load(shellOptions);
        } else {
            window$1.onShellReadyToLoad = function() {
                delete window$1.onShellReadyToLoad;
                window$1.msCommonShell.load(shellOptions);
            };
        }
    }
    function getProfileUrl() {
        var hostname = location.hostname;
        if (hostname === "ppe.docs.microsoft.com") {
            return "/learn-sandbox/profile";
        }
        return "/profile";
    }
    function loadAzureHeader() {
        var azureHeaderLocale = msDocs.data.azureHeaderLocale;
        var baseUrl = "https://azurecomcdn.azureedge.net";
        var scriptUrl = baseUrl + "/" + azureHeaderLocale + "/asset/menujs/";
        var htmlUrl = baseUrl + "/" + azureHeaderLocale + "/asset/header/";
        var htmlPromise = fetch(htmlUrl, {
            mode: "cors"
        }).then(function(response) {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.text();
        });
        return Promise.all([ htmlPromise, contentLoaded ]).then(function(_a) {
            var html = _a[0];
            var placeholder = document$1.getElementById("headerAreaHolder");
            placeholder.lang = azureHeaderLocale;
            placeholder.dir = "ltr";
            placeholder.innerHTML = html;
            return loadLibrary(scriptUrl);
        }).catch(function(_a) {});
    }
    var setHeaderLoaded;
    var headerLoaded = new Promise(function(resolve) {
        return setHeaderLoaded = resolve;
    });
    function initHeader() {
        var _a = msDocs.data, brand = _a.brand;
        if (brand === "mooncake") {
            setHeaderLoaded();
            return;
        }
        if (brand !== "azure" && brand !== "mooncake") {
            disableSearchSuggestions();
        }
        var promises = [ loadUhf() ];
        if (brand === "azure") {
            promises.push(loadAzureHeader());
        }
        Promise.all(promises).then(function() {
            return setHeaderLoaded();
        });
    }
    function setUhfSearchPlaceholder(text) {
        return headerLoaded.then(function() {
            var input = document$1.getElementById("cli_shellHeaderSearchInput");
            if (input) {
                input.placeholder = text;
            }
        });
    }
    function createAuthenticationControl(documentElt) {
        return headerLoaded.then(function() {
            var uhfActions = documentElt.querySelector(".c-uhfh-actions");
            authStatusDetermined.then(function() {
                var authElement = uhfActions.querySelector(".auth-control");
                populateAuthenticationControl(user, authElement);
                user.subscribe(UserChangedEvent, function() {
                    populateAuthenticationControl(user, authElement);
                });
            });
        });
    }
    function populateAuthenticationControl(user$$1, authElement) {
        authElement.removeAttribute("aria-busy");
        authElement.removeAttribute("aria-label");
        if (user$$1.isAuthenticated) {
            authElement.classList.add("dropdown");
            authElement.innerHTML = loggedInTemplate(user$$1);
        } else {
            authElement.classList.remove("dropdown");
            authElement.innerHTML = signInTemplate;
        }
        setTimeout(function() {
            authElement.classList.add("loaded");
        }, 50);
    }
    var signInTemplate = '\n\t<a class="auth-main ' + signInClassName + '" href="#" aria-label="' + loc.signIn + '" title="' + loc.signIn + '">\n\t\t<div class="auth-title sign-in">' + loc.signIn + "</div>\n\t</a>\n";
    var loggedInTemplate = function(user$$1) {
        var dropdownId = generateElementId();
        return '\n\t\t<button class="auth-main dropdown-trigger" role="button" tabindex="0" aria-label="' + loc.yourAccount + '" title="' + loc.yourAccount + '" aria-haspopup="true" aria-controls="' + dropdownId + '" aria-expanded="false">\n\t\t\t<div class="auth-title">' + user$$1.name.split(" ")[0] + '</div>\n\t\t\t<div class="auth-profile-pic">\n\t\t\t\t<img role="presentation" src="' + user$$1.profileImageUrl + '" alt="" onerror="if (this.src != \'' + fallbackImageUrl + "') this.src = '" + fallbackImageUrl + '\'"/>\n\t\t\t</div>\n\t\t</button>\n\t\t<div class="auth-menu dropdown-menu" id="' + dropdownId + '" role="menu">\n\t\t\t<div role="dialog" tabindex="-1" aria-label="' + loc.yourAccount + '">\n\t\t\t\t<div class="">\n\t\t\t\t\t<img role="presentation" src="' + user$$1.profileImageUrl + '" alt="" onerror="if (this.src != \'' + fallbackImageUrl + "') this.src = '" + fallbackImageUrl + '\'">\n\t\t\t\t\t<div class="auth-info">\n\t\t\t\t\t\t<div class="active-name">' + user$$1.name + '</div>\n\t\t\t\t\t\t<div class="active-email">' + user$$1.email + '</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<a class="auth-link" href="' + getProfileUrl() + '">' + loc.profile + '</a>\n\t\t\t\t<a class="auth-link ' + signOutClassName + '" href="#">' + loc.signOut + "</a>\n\t\t\t</div>\n\t\t</div>\n\t";
    };
    var checkIsArchived = function() {
        var isArchived;
        return function(force) {
            if (!force && isArchived !== undefined) {
                return isArchived;
            }
            var dataSource = parseQueryString().dataSource;
            isArchived = getMeta("is_archived") === "true" || msDocs.data.pageTemplate === "SearchPage" && dataSource === "previousVersions";
            return isArchived;
        };
    }();
    function checkMachineTranslated(meta) {
        return /^(?:MT|MTE|MTE75|MTE95)$/i.test(meta);
    }
    function checkIsRetired() {
        var dataSource = parseQueryString().dataSource;
        return getMeta("is_retired") === "true";
    }
    function showArchiveDisclaimer() {
        if (!checkIsArchived()) {
            return;
        }
        var isMachineTranslated = checkMachineTranslated(getMeta("ms.translationtype"));
        var retireString = isMachineTranslated ? loc["disclaimer.archiveRetireMachineTranslated"] : loc["disclaimer.archiveRetire"];
        var archiveString = isMachineTranslated ? loc["disclaimer.archiveMachineTranslated"] : loc["disclaimer.archive"];
        var archiveUrl = getMeta("current_version_url");
        var disclaimer = checkIsRetired() ? retireString : archiveString;
        var visualStudioArchive = getMeta("vs_archive") === "true";
        if (visualStudioArchive) {
            var visualStudioBanner = loc.visualStudioArchive;
            var text = loc.visualStudioArchiveDownload;
            showDisclaimer(visualStudioBanner, {
                url: "https://aka.ms/upgradevs2017",
                text: text
            }, "visual-studio-disc");
        }
        if (archiveUrl) {
            var text = loc["disclaimer.recommendedVersion"];
            showDisclaimer(disclaimer, {
                url: archiveUrl,
                text: text
            });
        } else if (msDocs.data.pageTemplate === "SearchPage") {
            var text = loc["disclaimer.returnToMain"];
            showDisclaimer(loc.disclaimerSearchPreviousVersions, {
                url: "https://docs.microsoft.com",
                text: text
            });
        } else {
            var text = loc["disclaimer.returnToMain"];
            showDisclaimer(disclaimer, {
                url: "https://docs.microsoft.com",
                text: text
            });
        }
    }
    function handleArchive() {
        if (!checkIsArchived()) {
            return;
        }
        setUhfSearchPlaceholder(loc.searchPreviousVersions);
        showArchiveDisclaimer();
    }
    function generateOptionsMap(selectorDivElement, isSingleSelector) {
        var optionsMap = {};
        getAzureSelectorAnchors(selectorDivElement).each(function() {
            if ($(this) && $(this).text()) {
                var contents = isSingleSelector ? [ $(this).text(), "default" ] : $(this).text().trim().slice(1, -1).split("|");
                if (contents.length === 2) {
                    var firstOption = contents[0].trim();
                    var secondOption = contents[1].trim();
                    var targetLink = $(this).attr("href");
                    if (firstOption && secondOption && targetLink) {
                        if (!optionsMap[firstOption]) {
                            optionsMap[firstOption] = {};
                        }
                        optionsMap[firstOption][secondOption] = targetLink;
                    }
                }
            }
        });
        return optionsMap;
    }
    function getAbsoluteURI(url) {
        var link = document.createElement("a");
        link.href = url;
        if (link.host === "") {
            link.href = link.href;
        }
        return link.protocol + "//" + link.host + link.pathname;
    }
    function getCurrentSelectedOptions(optionsMap, isSingleSelector) {
        var browserUrlString = window.location.href.toLowerCase();
        var browser = getAbsoluteURI(browserUrlString);
        for (var mainOptionValue in optionsMap) {
            for (var secondaryOptionValue in optionsMap[mainOptionValue]) {
                var targetUrlString = optionsMap[mainOptionValue][secondaryOptionValue].toLowerCase();
                if (getAbsoluteURI(targetUrlString).localeCompare(browser, undefined, {
                    sensitivity: "base"
                }) === 0) {
                    return [ mainOptionValue, secondaryOptionValue ];
                }
            }
        }
        return [ null, null ];
    }
    function createDropdowns(selectorDivElement, isSingleSelector, defaultOption) {
        function dropdownItemTemplate(key) {
            return [ key, key ];
        }
        function jumpToUrl(targetUrl) {
            window.location.href = targetUrl;
        }
        var optionsMap = generateOptionsMap(selectorDivElement, isSingleSelector);
        var selectedOptions = getCurrentSelectedOptions(optionsMap, isSingleSelector);
        var container = createAzureSelectorsContainer();
        var firstDropdown = createAzureSelectorDropdown(container, selectorDivElement.attr("title1"));
        var secondDropdown = null;
        populateDropdownOptions(firstDropdown, optionsMap, dropdownItemTemplate, false, defaultOption);
        firstDropdown.val(selectedOptions[0]);
        if (!isSingleSelector) {
            secondDropdown = createAzureSelectorDropdown(container, selectorDivElement.attr("title2"));
            firstDropdown.change(function() {
                populateDropdownOptions(secondDropdown, firstDropdown.val() ? optionsMap[firstDropdown.val()] : {}, dropdownItemTemplate, false, defaultOption);
            });
            secondDropdown.change(function() {
                if (firstDropdown.val() && secondDropdown.val()) {
                    jumpToUrl(optionsMap[firstDropdown.val()][secondDropdown.val()]);
                }
            });
            firstDropdown.change();
            secondDropdown.val(selectedOptions[1]);
        } else {
            firstDropdown.change(function() {
                if (firstDropdown.val()) {
                    jumpToUrl(optionsMap[firstDropdown.val()].default);
                }
            });
        }
        selectorDivElement.replaceWith(container);
    }
    function renderAzureSelectors() {
        var defaultOption = msDocs.loc["null.option.description"];
        getSingleAzureSelectors().each(function() {
            createDropdowns($(this), true, defaultOption);
        });
        getDoubleAzureSelectors().each(function() {
            createDropdowns($(this), false, defaultOption);
        });
    }
    function getSingleAzureSelectors() {
        return $(".op_single_selector");
    }
    function getDoubleAzureSelectors() {
        return $(".op_multi_selector");
    }
    function getAzureSelectorAnchors(azureSelector) {
        return azureSelector.find("li > a");
    }
    function createAzureSelectorsContainer() {
        return $('<div class="' + cssClassNames.azureSelectorContainer + '"></div>');
    }
    var cssClassNames = {
        linkNoHref: "nohref",
        tocNodeContainer: "toc-content",
        tocNodeLevelPrefix: "toc-level-",
        tocNodeExpander: "toc-expander",
        tocNodeCollapsed: "toc-collapsed",
        azureSelectorContainer: "azureselector"
    };
    function createAzureSelectorDropdown(azureSelectorContainer, title) {
        var wrapper = $("<div></div>");
        var dropdown = $("<select></select>");
        if (title) {
            wrapper.append($("<label>" + title + "</label>"));
        }
        wrapper.append(dropdown);
        azureSelectorContainer.append(wrapper);
        return dropdown;
    }
    function populateDropdownOptions(selectElement, optionsModel, itemTemplate, noNullOption, defaultOption) {
        selectElement.empty();
        if (!noNullOption) {
            selectElement.append($('<option value="">' + defaultOption + "</option>"));
        }
        for (var key in optionsModel) {
            var item = itemTemplate(key, optionsModel[key]);
            if (item && item.length === 2) {
                selectElement.append($('<option value="' + item[1] + '">' + item[0] + "</option>"));
            }
        }
    }
    var consentGranted;
    var cookieConsent = new Promise(function(resolve) {
        return consentGranted = resolve;
    });
    var setInitialDisposition;
    var initialCookieConsentDisposition = new Promise(function(resolve) {
        return setInitialDisposition = resolve;
    });
    function initCookieConsent() {
        if (msDocs.data.context.chromeless) {
            consentGranted();
            return;
        }
        headerLoaded.then(function() {
            var mscc = window$1.mscc;
            var hasConsent = mscc === undefined || mscc.hasConsent();
            setInitialDisposition(hasConsent);
            if (hasConsent) {
                consentGranted();
            } else {
                var unobserve_1 = observeInteractions(mscc);
                mscc.on("consent", function() {
                    unobserve_1();
                    consentGranted();
                });
            }
        });
    }
    function observeInteractions(mscc) {
        function processInteraction(_a) {
            var isTrusted = _a.isTrusted, target = _a.target, type = _a.type;
            if (!isTrusted) {
                return;
            }
            if (/input|change/.test(type) && (target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) {
                mscc.setConsent();
                return;
            }
            if (type === "click" && target instanceof Element && $(target).closest("button").length > 0) {
                mscc.setConsent();
                return;
            }
        }
        window$1.addEventListener("input", processInteraction, {
            passive: true
        });
        window$1.addEventListener("change", processInteraction, {
            passive: true
        });
        window$1.addEventListener("click", processInteraction, {
            passive: true
        });
        return function() {
            window$1.removeEventListener("input", processInteraction);
            window$1.removeEventListener("change", processInteraction);
            window$1.removeEventListener("click", processInteraction);
        };
    }
    var isHighContrast = false;
    function detectHighContrast() {
        var div = document$1.createElement("div");
        div.style.cssText = "position:absolute;top:0;left:-2300px;background-color:#878787";
        div.textContent = "hc";
        document$1.body.appendChild(div);
        var color = window$1.getComputedStyle(div).backgroundColor.toLowerCase();
        document$1.body.removeChild(div);
        if (color !== "#878787" && color !== "rgb(135, 135, 135)") {
            document$1.documentElement.className += " highContrast";
            isHighContrast = true;
        }
    }
    var contentTags = {
        id: "id",
        name: "name",
        type: "type",
        scenario: "scn",
        scenarioStep: "scnstp",
        scenarioStepNumber: "subnm"
    };
    var contentAttrs = {
        id: "data-bi-id",
        name: "data-bi-name",
        type: "data-bi-type",
        scenario: "data-bi-scn",
        scenarioStep: "data-bi-scnstp",
        scenarioStepNumber: "data-bi-subnm",
        satisfaction: "data-bi-sat"
    };
    function nm(name) {
        return contentAttrs.name + '="' + name + '"';
    }
    var jsllUrl = "https://az725175.vo.msecnd.net/scripts/jsll-4.js";
    var tagMapping = {
        audience: "aud",
        author: "author",
        manager: "manager",
        "ms.assetid": "asst",
        "ms.author": "pgauth",
        "ms.contentsource": "pgpubl",
        "ms.custom": "custom",
        "ms.date": "date",
        depot_name: "depotname",
        "ms.devlang": "pgdevlng",
        gitcommit: "gitcommit",
        original_content_git_url: "giturl",
        updated_at: "publishtime",
        "ms.prod": "product",
        "ms.reviewer": "reviewer",
        "ms.service": "pgsrvcs",
        "ms.suite": "suite",
        "ms.technology": "technology",
        "ms.tgt_pltfrm": "pgtrgtplf",
        "ms.topic": "pgtop",
        "ms.workload": "workload",
        "ms.search.region": "searchregion",
        "ms.prod_service": "prod_service",
        "ms.component": "component",
        experimental: "experimental",
        experiment_id: "experiment_id",
        "ms.assigned_experiments": "assigned_experiments",
        translationtype: "translationtype",
        document_version_independent_id: "document_version_independent_id"
    };
    var notifyJsllReady;
    function track() {
        return Promise.all([ loadLibrary(jsllUrl, "awa"), initialCookieConsentDisposition ]).then(function(_a) {
            var awa = _a[0], hasCookieConsent = _a[1];
            configureJsll(awa, hasCookieConsent);
            trackSelectElementChange(awa);
            trackPageFocus(awa);
            trackPageVisibility(awa);
            trackPrint(awa);
            trackSecondaryContentScroll(awa);
            trackUnload(awa);
            trackUHFSearch(awa);
            trackCtrlF(awa);
            notifyJsllReady(awa);
        });
    }
    function configureJsll(awa, hasCookieConsent) {
        var isOPSBased = msDocs.data.brand !== "techprofile";
        var jsllConfig = {
            syncMuid: hasCookieConsent,
            urlCollectHash: true,
            urlCollectQuery: true,
            autoCapture: {
                pageView: true,
                onLoad: true,
                click: true,
                scroll: true,
                resize: true,
                jsError: true,
                addin: true,
                msTags: false,
                perf: true,
                assets: false,
                lineage: true
            },
            coreData: {
                appId: {
                    "docs.microsoft.com": "Docs",
                    "techprofile.microsoft.com": "TechProfile",
                    "review.docs.microsoft.com": "DocsReview",
                    "docs.azure.cn": "DocsCN",
                    "developer.microsoft.com": "DevCenter"
                }[location.hostname] || "JsllTest",
                pageName: isOPSBased ? getMeta("document_id") || "missing document_id" : getMeta("page_name"),
                market: msDocs.data.userLocale,
                pageType: getMeta("page_type"),
                pageTags: {}
            },
            shareAuthStatus: true,
            get authMethod() {
                return user.authenticationMode === "MSA" ? 1 : 2;
            },
            get isLoggedIn() {
                return user.isAuthenticated;
            }
        };
        if (isOPSBased) {
            var metas = document$1.querySelectorAll("meta");
            for (var i = 0; i < metas.length; i++) {
                var meta = metas.item(i);
                var awaTag = tagMapping[meta.name];
                if (awaTag) {
                    jsllConfig.coreData.pageTags[awaTag] = meta.content;
                }
            }
            jsllConfig.coreData.pageTags.contentlocale = msDocs.data.contentLocale;
            jsllConfig.coreData.pageTags.theme = msDocs.data.currentTheme;
            jsllConfig.coreData.pageTags.highContrast = isHighContrast.toString();
        }
        awa.consoleVerbosity = awa.verbosityLevels.WARNING;
        awa.init(jsllConfig);
    }
    var jsllReady = new Promise(function(resolve) {
        return notifyJsllReady = resolve;
    });
    function getName(element) {
        while (element && element.hasAttribute && !element.hasAttribute(contentAttrs.name)) {
            element = element.parentElement;
        }
        if (!element) {
            return "";
        }
        return element.getAttribute(contentAttrs.name);
    }
    function trackSelectElementChange(awa) {
        function handleChange(event) {
            if (!event.isTrusted || !(event.target instanceof HTMLSelectElement) || !event.target.hasAttribute(contentAttrs.name)) {
                return;
            }
            awa.ct.capturePageAction(event.target, {
                actionType: awa.actionType.OTHER,
                behavior: awa.behavior.OTHER,
                content: {
                    event: "select-value-changed",
                    name: getName(event.target),
                    value: event.target.value
                }
            });
        }
        document$1.addEventListener("change", handleChange, {
            passive: true
        });
    }
    function trackPageFocus(awa) {
        var previousType = "";
        function reportFocusChanged(event) {
            if (!event.isTrusted || previousType === event.type) {
                return;
            }
            previousType = event.type;
            awa.ct.captureContentPageAction({
                actionType: awa.actionType.OTHER,
                behavior: awa.behavior.OTHER,
                content: {
                    event: "page-focus-changed",
                    value: event.type
                }
            });
        }
        var timeout = 0;
        function handleFocusedChanged(event) {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                return reportFocusChanged(event);
            }, 50);
        }
        window$1.addEventListener("focus", handleFocusedChanged, {
            passive: true
        });
        window$1.addEventListener("blur", handleFocusedChanged, {
            passive: true
        });
    }
    function trackPageVisibility(awa) {
        function visibilityChanged(event) {
            awa.ct.captureContentPageAction({
                actionType: awa.actionType.OTHER,
                behavior: awa.behavior.OTHER,
                content: {
                    event: "page-visibility-changed",
                    value: document$1.hidden ? "hidden" : "visible"
                }
            });
        }
        function attach() {
            document$1.addEventListener("visibilitychange", visibilityChanged, {
                passive: true
            });
        }
        document$1.readyState === "interactive" || document$1.readyState === "complete" ? attach() : document$1.addEventListener("DOMContentLoaded", attach);
    }
    function trackPrint(awa) {
        if (!window$1.matchMedia) {
            return;
        }
        window$1.matchMedia("print").addListener(function(m) {
            if (!m.matches) {
                return;
            }
            awa.ct.captureContentPageAction({
                actionType: awa.actionType.OTHER,
                behavior: awa.behavior.PRINT,
                content: {
                    event: "print"
                }
            });
        });
    }
    function trackSecondaryContentScroll(awa) {
        function reportScroll(event) {
            if (!event.isTrusted || !(event.target instanceof HTMLElement)) {
                return;
            }
            var _a = event.target.getBoundingClientRect(), width = _a.width, height = _a.height;
            var _b = event.target, scrollLeft = _b.scrollLeft, scrollTop = _b.scrollTop, scrollWidth = _b.scrollWidth, scrollHeight = _b.scrollHeight;
            awa.ct.capturePageAction(event.target, {
                actionType: awa.actionType.OTHER,
                behavior: awa.behavior.OTHER,
                content: {
                    event: "secondary-content-scroll",
                    name: getName(event.target),
                    viewPortWidth: Math.floor(width),
                    viewPortHeight: Math.floor(height),
                    contentWidth: Math.floor(scrollWidth),
                    contentHeight: Math.floor(scrollHeight),
                    horizontalOffset: Math.floor(scrollLeft),
                    verticalOffset: Math.floor(scrollTop)
                }
            });
        }
        function handleScroll(event) {
            if (event.target === document$1) {
                return;
            }
            var target = event.target;
            clearTimeout(target.reportScrollTimeout);
            target.reportScrollTimeout = setTimeout(function() {
                return reportScroll(event);
            }, 100);
        }
        window$1.addEventListener("scroll", handleScroll, {
            passive: true,
            capture: true
        });
    }
    function trackUnload(awa) {
        var anchor = false;
        function handleUnload(event) {
            awa.ct.captureContentPageAction({
                actionType: awa.actionType.OTHER,
                behavior: awa.behavior.OTHER,
                content: {
                    event: "unload",
                    anchor: anchor
                }
            });
        }
        function handleClick(event) {
            if (event.target instanceof HTMLAnchorElement) {
                anchor = true;
                setTimeout(function() {
                    return anchor = false;
                });
            }
        }
        function handleKeyDown(event) {
            if (event.target instanceof HTMLAnchorElement) {
                anchor = true;
                setTimeout(function() {
                    return anchor = false;
                });
            }
        }
        window$1.addEventListener("keydown", handleKeyDown, {
            capture: true,
            passive: true
        });
        window$1.addEventListener("click", handleClick, {
            capture: true,
            passive: true
        });
        window$1.addEventListener("beforeunload", handleUnload, {
            passive: true
        });
    }
    function trackUHFSearch(awa) {
        function handleSubmit(event) {
            var form = event.target;
            if (form.id !== "searchForm") {
                return;
            }
            var term = form.querySelector('input[name="search"]').value;
            var submitButtonIsFocused = form.querySelector("#search:focus") !== null;
            awa.ct.capturePageAction(form, {
                actionType: awa.actionType.OTHER,
                behavior: awa.behavior.SEARCH,
                content: {
                    event: "uhf-search",
                    value: term,
                    submitButton: submitButtonIsFocused
                }
            });
        }
        window$1.addEventListener("submit", handleSubmit, {
            passive: true,
            capture: true
        });
    }
    function trackCtrlF(awa) {
        function handleKeyDown(event) {
            if (event.isTrusted && event.keyCode === 70 && event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
                awa.ct.captureContentPageAction({
                    actionType: awa.actionType.OTHER,
                    behavior: awa.behavior.OTHER,
                    content: {
                        event: "ctrl-f"
                    }
                });
            }
        }
        window$1.addEventListener("keydown", handleKeyDown, {
            passive: true
        });
    }
    var localStorage$2 = {
        setItem: function(key, value) {
            try {
                window$1.localStorage.setItem(key, value);
            } catch (e) {}
        },
        getItem: function(key) {
            try {
                return window$1.localStorage.getItem(key);
            } catch (e) {
                return null;
            }
        },
        removeItem: function(key) {
            try {
                window$1.localStorage.removeItem(key);
            } catch (e) {}
        }
    };
    var sessionStorage = {
        setItem: function(key, value) {
            try {
                window$1.sessionStorage.setItem(key, value);
            } catch (e) {}
        },
        getItem: function(key) {
            try {
                return window$1.sessionStorage.getItem(key);
            } catch (e) {
                return null;
            }
        },
        removeItem: function(key) {
            try {
                window$1.sessionStorage.removeItem(key);
            } catch (e) {}
        }
    };
    function getPlatform() {
        var navigatorPlatforms = {
            iPhone: "ios",
            iPad: "ios",
            iPod: "ios",
            Macintosh: "macos",
            MacIntel: "macos",
            MacPPC: "macos",
            Mac68K: "macos",
            Win32: "windows",
            Win64: "windows",
            Windows: "windows",
            WinCE: "windows"
        };
        var platform = navigatorPlatforms[navigator.platform];
        if (platform !== undefined) {
            return platform;
        }
        if (/Android/.test(navigator.userAgent)) {
            return "android";
        }
        if (/Linux/.test(navigator.platform)) {
            return "linux";
        }
        return null;
    }
    function isPlatform(s) {
        return /^(?:android|ios|linux|macos|windows)$/.test(s);
    }
    var isMobileOrTablet = checkMobileOrTablet();
    function checkMobileOrTablet() {
        var check = false;
        var userAgent = navigator.userAgent || navigator.vendor;
        var mobileRegex = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i;
        var mobileRegex2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
        if (mobileRegex.test(userAgent) || mobileRegex2.test(userAgent.substr(0, 4))) {
            check = true;
        }
        return check;
    }
    var platform = getPlatform();
    var platformStorageKey = "preferred-platform";
    function getPreferredPlatform() {
        var raw = localStorage$2.getItem(platformStorageKey);
        if (raw !== null && isPlatform(raw)) {
            return raw;
        }
        return null;
    }
    var preferredPlatform = getPreferredPlatform();
    function setPreferredPlatform(platform) {
        localStorage$2.setItem(platformStorageKey, platform);
    }
    var breakTextRegexDots = /([A-Z]\.|[a-z]\.)([A-Z]|[a-z])/g;
    var breakTextRegexCase = /([a-z])([A-Z]+[a-z])/g;
    var breakTextReplace = "$1<wbr>$2";
    var unbreakTextRegex = /\u200B/g;
    function breakText(str, dotsOnly) {
        if (dotsOnly === void 0) {
            dotsOnly = false;
        }
        if (!str || str.length === 0) {
            return str;
        }
        str = str.replace(breakTextRegexDots, breakTextReplace);
        if (dotsOnly) {
            return str;
        }
        return str.replace(breakTextRegexCase, breakTextReplace);
    }
    function unbreakText(str) {
        return str.replace(unbreakTextRegex, "");
    }
    function supportsWbrElement() {
        var testDiv = document.createElement("div");
        testDiv.style.cssText = "position:fixed;width:1px;line-height:16px;word-wrap:normal;word-break:normal;white-space:normal;border: 1px solid red;top:-1000px";
        testDiv.innerHTML = "x<wbr>x";
        document.body.appendChild(testDiv);
        var supportsWbr = testDiv.clientHeight > 16;
        document.body.removeChild(testDiv);
        return supportsWbr;
    }
    function polyfillWbrElement() {
        var style = document.createElement("style");
        style.textContent = 'wbr::after { content: "​"}';
        document.head.appendChild(style);
    }
    function ensureWbr() {
        addWbrViaClass(document.body);
        if (!supportsWbrElement()) {
            polyfillWbrElement();
        }
    }
    function addWbrViaClass(element) {
        var xrefs = Array.from(element.querySelectorAll(".break-text > .xref"));
        xrefs.forEach(function(node) {
            if (node.firstElementChild !== null) {
                return;
            }
            var dotsOnly = node.parentElement.classList.contains("dots-only");
            var replacementHTML = breakText(node.textContent.replace(/</g, "&lt;").replace(/>/g, "&gt;"), dotsOnly);
            node.innerHTML = replacementHTML;
        });
    }
    function cleanText(value) {
        if (value && value.length) {
            return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&amp;lrm;/g, "&lrm;");
        }
        return value;
    }
    var htmlEscapes = {
        "&": "&amp",
        "<": "&lt",
        ">": "&gt",
        '"': "&quot",
        "'": "&#39"
    };
    var reUnescapedHtml = /[&<>"']/g;
    var reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    function escape$1(string) {
        return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, function(chr) {
            return htmlEscapes[chr];
        }) : string;
    }
    function escapeRegExp(string) {
        return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    var supportsInnerText = false;
    function checkInnerTextSupported() {
        document.body.insertAdjacentHTML("beforeend", "<div><span hidden>hidden</span></div>");
        var el = document.body.lastElementChild;
        supportsInnerText = el.innerText === "";
        document.body.removeChild(el);
        return supportsInnerText;
    }
    function getVisibleTextContent(elt) {
        if (supportsInnerText) {
            return elt.innerText;
        }
        var clone = elt.cloneNode(true);
        clone.hidden = true;
        document.body.appendChild(clone);
        function removeHiddenNodes(el) {
            if (el === null) {
                return;
            }
            removeHiddenNodes(el.nextElementSibling);
            if (window.getComputedStyle(el, null).getPropertyValue("display") === "none") {
                el.parentElement.removeChild(el);
            } else {
                removeHiddenNodes(el.firstElementChild);
            }
        }
        removeHiddenNodes(clone.firstElementChild);
        document.body.removeChild(clone);
        return clone.textContent;
    }
    var h2Headings = [];
    var sectionIndicatorEnabled = false;
    var ignoreScrollOnce = false;
    var ignoreContentUpdateUntilScroll = false;
    function renderInTopicTOC() {
        var centerContainer = document$1.getElementById("center-doc-outline");
        var sideContainer = document$1.getElementById("side-doc-outline");
        var containers = [ centerContainer, sideContainer ];
        if (centerContainer === null || sideContainer === null) {
            return;
        }
        var headings = Array.from(document$1.querySelectorAll("#main h2")).filter(function(h) {
            return h.offsetParent !== null;
        });
        var minHeadings = msDocs.data.pageTemplate === "NamespaceListPage" ? 2 : 1;
        var hide = headings.length < minHeadings;
        containers.forEach(function(container) {
            container.hidden = hide;
            if (container.lastElementChild.nodeName === "OL") {
                container.removeChild(container.lastElementChild);
            }
        });
        if (hide) {
            return;
        }
        var ol = document$1.createElement("ol");
        h2Headings = [];
        for (var _i = 0, headings_1 = headings; _i < headings_1.length; _i++) {
            var heading = headings_1[_i];
            var text = getVisibleTextContent(heading).trim();
            if (heading.id.length === 0 || !heading.id) {
                heading.id = text.toLowerCase().replace(/\s+/g, "-");
            }
            var a = document$1.createElement("a");
            a.href = "#" + heading.id;
            a.textContent = text;
            var li = document$1.createElement("li");
            li.appendChild(a);
            ol.appendChild(li);
            h2Headings.push({
                element: heading,
                anchor: a
            });
        }
        sideContainer.appendChild(ol);
        centerContainer.appendChild(ol.cloneNode(true));
        if (h2Headings.length <= 1) {
            return;
        }
        if (!sectionIndicatorEnabled) {
            sideContainer.addEventListener("click", function(event) {
                var item = event.target instanceof Element && event.target.closest("a");
                if (!item) {
                    return;
                }
                ignoreScrollOnce = true;
                ignoreContentUpdateUntilScroll = true;
                selectH2ItemInSideOutline({
                    element: null,
                    anchor: item
                });
            });
            window.addEventListener("scroll", function() {
                if (ignoreScrollOnce) {
                    ignoreScrollOnce = false;
                    return;
                }
                ignoreContentUpdateUntilScroll = false;
                scheduleUpdate();
            }, {
                passive: true
            });
            window.addEventListener("content-update", function() {
                if (ignoreContentUpdateUntilScroll) {
                    return;
                }
                scheduleUpdate();
            });
            sectionIndicatorEnabled = true;
        }
        scheduleUpdate();
    }
    var animationFrame = 0;
    function scheduleUpdate() {
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(updateH2Selection);
    }
    function updateH2Selection() {
        var selectedHeading = findDisplayedH2Item();
        selectH2ItemInSideOutline(selectedHeading);
    }
    function findDisplayedH2Item() {
        for (var i = h2Headings.length - 1; i >= 0; i--) {
            if (h2Headings[i].element.getBoundingClientRect().top <= 20) {
                return h2Headings[i];
            }
        }
        return h2Headings[0] || null;
    }
    function selectH2ItemInSideOutline(heading) {
        if (heading === null) {
            return;
        }
        var current = document$1.querySelector("#side-doc-outline > ol > li.selected");
        if (current) {
            current.classList.remove("selected");
        }
        heading.anchor.parentElement.classList.add("selected");
    }
    var translationMeta = getMeta("ms.translationtype");
    var machineTranslated = checkMachineTranslated(translationMeta);
    var translated = machineTranslated || translationMeta === "HT";
    var sideBySideTranslation = getMeta("enable_loc_sxs") === "true" || getMeta("bilingual_type") === "hover over";
    function displayTranslations() {
        if (!translated) {
            return;
        }
        if (!sideBySideTranslation) {
            if (checkIsArchived()) {
                return;
            }
            if (machineTranslated) {
                showDisclaimer(loc["disclaimer.machineTranslatedOnly"]);
                return;
            }
        }
        var pageTemplate = msDocs.data.pageTemplate;
        if (!sideBySideTranslation || isMobileOrTablet || pageTemplate === "HubPage" || pageTemplate === "LandingPage") {
            return;
        }
        var stus = document.querySelectorAll("span[data-stu-id]");
        var stu;
        var ttus = document.querySelectorAll("span[data-ttu-id]");
        var ttu;
        var translations = {};
        var i;
        var id;
        for (i = 0; i < stus.length; i++) {
            stu = stus.item(i);
            id = stu.getAttribute("data-stu-id");
            translations[id] = stu.textContent;
        }
        for (i = 0; i < ttus.length; i++) {
            ttu = ttus.item(i);
            id = ttu.getAttribute("data-ttu-id");
            if (translations[id] === undefined) {
                continue;
            }
            ttu.setAttribute("translation", translations[id]);
        }
        var disclaimer = showDisclaimer(machineTranslated ? loc["disclaimer.sxs.machine"] : loc["disclaimer.sxs.human"]);
        var toggleButton = document.createElement("button");
        var enableText = document.createElement("span");
        var disableText = document.createElement("span");
        var head = document.documentElement.classList;
        disclaimer.classList.add("sxs-translation");
        enableText.textContent = loc.enable;
        enableText.classList.add("translation-enable");
        disableText.textContent = loc.disable;
        disableText.classList.add("translation-disable");
        toggleButton.classList.add("button-primary");
        toggleButton.appendChild(enableText);
        toggleButton.appendChild(disableText);
        disclaimer.appendChild(toggleButton);
        function toggle() {
            if (head.contains("translations-enabled")) {
                localStorage$2.setItem("translations-enabled", "0");
                head.remove("translations-enabled");
            } else {
                localStorage$2.setItem("translations-enabled", "1");
                head.add("translations-enabled");
            }
        }
        toggleButton.addEventListener("click", toggle);
        disclaimer.appendChild(toggleButton);
        if (localStorage$2.getItem("translations-enabled") == "1" || machineTranslated) {
            head.add("translations-enabled");
        }
    }
    function handleEngContentToggle(container) {
        var content = document.querySelector(".primary-holder main.content");
        var languageToggle = document.getElementById("language-toggle");
        if (!translated || !languageToggle) {
            return;
        }
        var english = sessionStorage.getItem("toggledToEnglish") === "true";
        setEngToggleBi(languageToggle, english);
        var languageConfig = {
            originalLang: content.lang,
            originalDir: content.dir
        };
        if (english) {
            languageToggle.checked = true;
            toggleContentLanguage(english, languageConfig);
        }
        languageToggle.addEventListener("change", function(e) {
            var target = e.target;
            var checked = target.checked;
            setEngToggleBi(languageToggle, checked);
            toggleContentLanguage(checked, languageConfig);
            renderInTopicTOC();
            notifyContentUpdated();
        });
        container.style.display = "flex";
    }
    function toggleContentLanguage(toEnglish, _a) {
        var originalLang = _a.originalLang, originalDir = _a.originalDir;
        sessionStorage.setItem("toggledToEnglish", "" + toEnglish);
        var content = document.querySelector("main.content");
        var localizedElements = Array.from(content.querySelectorAll("[data-ttu-id]"));
        var sxslookupElements = Array.from(content.querySelectorAll(".sxs-lookup"));
        var sxsDisclaimer = document.querySelector(".sxs-translation");
        if (toEnglish) {
            localizedElements.forEach(function(elt) {
                return elt.style.display = "none";
            });
            sxslookupElements.forEach(function(elt) {
                return elt.style.display = "inline";
            });
            content.lang = "en-us";
            content.dir = "ltr";
            if (sideBySideTranslation) {
                localStorage$2.setItem("translations-enabled", "0");
                if (document.documentElement.classList.contains("translations-enabled")) {
                    document.documentElement.classList.remove("translations-enabled");
                }
                if (sxsDisclaimer) {
                    sxsDisclaimer.style.display = "none";
                }
            }
        } else {
            localizedElements.forEach(function(elt) {
                return elt.style.display = "inline";
            });
            sxslookupElements.forEach(function(elt) {
                return elt.style.display = "none";
            });
            content.lang = originalLang;
            content.dir = originalDir;
            if (sideBySideTranslation) {
                if (sxsDisclaimer) {
                    sxsDisclaimer.style.display = "flex";
                }
            }
        }
    }
    function setEngToggleBi(elt, english) {
        var toggleAttribute = english ? "off" : "on";
        var oppos = !english ? "off" : "on";
        var attribute = "data-bi-engtoggle-" + toggleAttribute;
        var oppAttr = "data-bi-engtoggle-" + oppos;
        if (elt.hasAttribute(oppAttr)) {
            elt.removeAttribute(oppAttr);
        }
        elt.setAttribute(attribute, "");
    }
    var cookieApi;
    (function(factory) {
        cookieApi = factory();
    })(function() {
        var extend = function() {
            var i = 0;
            var result = {};
            for (;i < arguments.length; i++) {
                var attributes = arguments[i];
                for (var key in attributes) {
                    result[key] = attributes[key];
                }
            }
            return result;
        };
        function init(converter) {
            var api = function(key, value, attributes) {
                var result;
                if (typeof document === "undefined") {
                    return;
                }
                if (arguments.length > 1) {
                    attributes = extend({
                        path: "/"
                    }, api.defaults, attributes);
                    if (typeof attributes.expires === "number") {
                        var expires = new Date();
                        expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e5);
                        attributes.expires = expires;
                    }
                    attributes.expires = attributes.expires ? attributes.expires.toUTCString() : "";
                    try {
                        result = JSON.stringify(value);
                        if (/^[\{\[]/.test(result)) {
                            value = result;
                        }
                    } catch (e) {}
                    if (!converter.write) {
                        value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                    } else {
                        value = converter.write(value, key);
                    }
                    key = encodeURIComponent(String(key));
                    key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                    key = key.replace(/[\(\)]/g, escape);
                    var stringifiedAttributes = "";
                    for (var attributeName in attributes) {
                        if (!attributes[attributeName]) {
                            continue;
                        }
                        stringifiedAttributes += "; " + attributeName;
                        if (attributes[attributeName] === true) {
                            continue;
                        }
                        stringifiedAttributes += "=" + attributes[attributeName];
                    }
                    return document.cookie = key + "=" + value + stringifiedAttributes;
                }
                if (!key) {
                    result = {};
                }
                var cookies = document.cookie ? document.cookie.split("; ") : [];
                var rdecode = /(%[0-9A-Z]{2})+/g;
                var i = 0;
                for (;i < cookies.length; i++) {
                    var parts = cookies[i].split("=");
                    var cookie = parts.slice(1).join("=");
                    if (cookie.charAt(0) === '"') {
                        cookie = cookie.slice(1, -1);
                    }
                    try {
                        var name = parts[0].replace(rdecode, decodeURIComponent);
                        cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);
                        if (this.json) {
                            try {
                                cookie = JSON.parse(cookie);
                            } catch (e) {}
                        }
                        if (key === name) {
                            result = cookie;
                            break;
                        }
                        if (!key) {
                            result[name] = cookie;
                        }
                    } catch (e) {}
                }
                return result;
            };
            api.set = api;
            api.get = function(key) {
                return api.call(api, key);
            };
            api.getJSON = function() {
                return api.apply({
                    json: true
                }, [].slice.call(arguments));
            };
            api.defaults = {};
            api.remove = function(key, attributes) {
                api(key, "", extend(attributes, {
                    expires: -1
                }));
            };
            api.withConverter = init;
            return api;
        }
        return init(function() {});
    });
    var cookies = cookieApi;
    function isDevelopment(origin) {
        var whitelist = {
            "https://review.docs.microsoft.com": true,
            "https://ppe.docs.microsoft.com": true
        };
        if (whitelist[origin]) {
            return true;
        }
        return false;
    }
    function createBranchSelectorHtml(branches) {
        var branchesHtml;
        branchesHtml = branches.sort().map(function(branchName) {
            return '<option value="' + branchName + '">' + branchName + "</option>";
        }).join("");
        return $('\n\t\t<select id="branch-selector">\n\t\t\t<option value="">-- Select Branch --</option>\n\t\t\t' + branchesHtml + "\n\t\t</select>\n\t");
    }
    function renderBranchSelector() {
        if (!isDevelopment(location.origin)) {
            return;
        }
        $("#contenteditbtn").removeAttr("hidden");
        if (msDocs.data.context.branches) {
            var branchList = msDocs.data.context.branches.split(",");
            if (branchList.length === 0) {
                return;
            }
            var dropdown_1 = createBranchSelectorHtml(branchList);
            dropdown_1.change(function() {
                var targetBranchName = dropdown_1.val();
                if (targetBranchName) {
                    cookies.set("CONTENT_BRANCH", targetBranchName);
                    window.location.search = "?branch=" + encodeURIComponent(targetBranchName);
                }
            });
            dropdown_1.val(cookies.get("CONTENT_BRANCH"));
            var branchSelector = $('\n\t\t\t<li>\n\t\t\t\t<label for="branch-selector">Branch</label>\n\t\t\t</li>');
            branchSelector.append(dropdown_1);
            $(".action-bar > .action-list").append(branchSelector);
        }
    }
    var clipboardCopySupported = document$1.queryCommandSupported && document$1.queryCommandSupported("copy");
    function clipboardCopy(text, owner) {
        if (!clipboardCopySupported) {
            return false;
        }
        var txt = document$1.createElement("textarea");
        txt.setAttribute(contentAttrs.name, getName(owner));
        txt.textContent = text;
        txt.classList.add("visually-hidden");
        document$1.body.appendChild(txt);
        txt.select();
        try {
            return document$1.execCommand("copy");
        } catch (ex) {
            return false;
        } finally {
            document$1.body.removeChild(txt);
        }
    }
    var unprintable = false;
    function interceptCopy() {
        function handleCopy(event) {
            var value = window$1.getSelection().toString();
            var cleanValue = unbreakText(value);
            if (clipboardCopySupported && value !== cleanValue && !unprintable) {
                unprintable = true;
                clipboardCopy(cleanValue, event.target);
                return;
            }
            jsllReady.then(function(awa) {
                return awa.ct.capturePageAction(event.target, {
                    actionType: awa.actionType.OTHER,
                    behavior: awa.behavior.COPY,
                    content: {
                        event: "copy",
                        name: getName(event.target),
                        value: value,
                        unprintable: unprintable
                    }
                });
            });
            unprintable = false;
        }
        document$1.addEventListener("copy", handleCopy, {
            passive: true
        });
    }
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    if (!Element.prototype.closest) {
        Element.prototype.closest = function(selector) {
            var el = this;
            do {
                if (el.matches(selector)) {
                    return el;
                }
                el = el.parentElement;
            } while (el !== null);
            return null;
        };
    }
    (function(arr) {
        arr.forEach(function(item) {
            if (item.hasOwnProperty("remove")) {
                return;
            }
            Object.defineProperty(item, "remove", {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function remove() {
                    if (this.parentNode !== null) {
                        this.parentNode.removeChild(this);
                    }
                }
            });
        });
    })([ Element.prototype, CharacterData.prototype, DocumentType.prototype ]);
    var interactiveTypes = {};
    function registerInteractiveType(interactiveType) {
        interactiveTypes[interactiveType.name] = interactiveType;
    }
    function getLanguageNameRtlHtml(displayName, contentDir) {
        if (contentDir == "rtl") {
            return escape$1(displayName).replace(/(^|\s|\>)(C#|F#|C\+\+)(\s*|[.!?;:]*)(\<|[\n\r]|$)/gi, "$1$2&lrm;$3$4");
        }
        return displayName;
    }
    function addCodeHeader(block, config, contentDir) {
        var header = document$1.createElement("div");
        header.classList.add("codeHeader");
        header.setAttribute(contentAttrs.name, "code-header");
        header.innerHTML = '<span class="language">' + getLanguageNameRtlHtml(block.displayName, contentDir) + "</span>";
        if (clipboardCopySupported) {
            header.insertAdjacentHTML("beforeend", '\n\t\t\t<button class="action" ' + contentAttrs.name + '="copy">\n\t\t\t\t<span class="docon docon-edit-copy" aria-role="presentation"></span>\n\t\t\t\t<span>' + escape$1(loc.copy) + "</span>\n\t\t\t</button>");
            header.lastElementChild.addEventListener("click", function() {
                copyCodeBlockToClipboard(block.element.firstElementChild, block.language);
            });
        }
        var interactiveType = block.interactiveType;
        if (interactiveType) {
            var buttonConfig = interactiveType.activateButtonConfig;
            header.insertAdjacentHTML("beforeend", '\n\t\t\t<button class="action action-interactive" ' + contentAttrs.name + '="code-header-try-it-' + interactiveType.name + '">\n\t\t\t\t<span class="' + buttonConfig.iconClass + '" aria-role="presentation"></span>\n\t\t\t\t<span>' + escape$1(buttonConfig.name) + "</span>\n\t\t\t</button>");
            var activateButton_1 = header.lastElementChild;
            for (var _i = 0, _a = buttonConfig.attributes; _i < _a.length; _i++) {
                var attr = _a[_i];
                activateButton_1.setAttribute(attr.name, attr.value);
            }
            activateButton_1.addEventListener("click", function() {
                activateButton_1.classList.add("is-loading");
                activateButton_1.disabled = true;
                interactiveType.activateCodeBlock(block.element).catch(function() {}).then(function() {
                    activateButton_1.classList.remove("is-loading");
                    activateButton_1.disabled = false;
                });
            });
        }
        block.element.classList.remove("loading");
        block.element.insertAdjacentElement("beforebegin", header);
        block.header = header;
    }
    function copyCodeBlockToClipboard(codeBlock, language) {
        var text = codeBlock.textContent.trim();
        if (language === "powershell") {
            text = text.replace(/\bPS [a-z]:\\>\s?/gi, "");
        }
        return clipboardCopy(text, codeBlock);
    }
    var preferenceStorageKey = "proglang";
    var languageConfig = {
        displayNameMap: {
            "aspx-csharp": "ASP.NET (C#)",
            "aspx-vb": "ASP.NET (VB)",
            vb: "VB",
            csharp: "C#",
            cs: "C#",
            cshtml: "CSHTML",
            dotnetcli: ".NET Console",
            fsharp: "F#",
            html: "HTML",
            azurecli: "Azure CLI",
            vstscli: "VSTS CLI",
            azurepowershell: "Azure PowerShell",
            http: "HTTP",
            json: "JSON",
            cpp: "C++",
            cppcx: "C++/CX",
            cppwinrt: "C++/WinRT",
            java: "Java",
            objc: "Objective-C",
            qsharp: "Q#",
            ruby: "Ruby",
            php: "PHP",
            powershell: "PowerShell",
            js: "JavaScript",
            javascript: "JavaScript",
            typescript: "TypeScript",
            azcopy: "AzCopy",
            python: "Python",
            nodejs: "NodeJS",
            xaml: "XAML",
            xml: "XML",
            sql: "SQL",
            swift: "Swift",
            md: "Markdown",
            odata: "OData",
            dax: "DAX",
            powerappsfl: "PowerApps Formula",
            go: "Go",
            rest: "HTTP"
        },
        visibilityMap: {
            "aspx-csharp": "csharp",
            "aspx-vb": "vb"
        },
        syntaxMap: {
            azurepowershell: "powershell",
            cshtml: "html",
            cppcx: "cpp",
            cppwinrt: "cpp",
            nodejs: "js"
        },
        unset: "",
        default: msDocs.settings.defaultDevLang || "",
        get preferred() {
            return (localStorage$2.getItem(preferenceStorageKey) || languageConfig.unset).substr(5);
        },
        set preferred(language) {
            localStorage$2.setItem(preferenceStorageKey, "lang-" + language);
        }
    };
    var globalScriptTag = document.querySelector("script[src*='global.min.js'], script[src*='chromeless.min.js']");
    function relativeToGlobal(relativePath) {
        if (globalScriptTag) {
            var replacement = relativePath.indexOf("?") === -1 ? relativePath + "?$1" : relativePath;
            return globalScriptTag.src.replace(/js\/(?:(\w+)(?:\.))?(global|chromeless)\.min.*$/, replacement);
        }
        return relativePath;
    }
    var worker;
    var nextId$2 = 0;
    var pending = {};
    function syntaxHighlight(instructions) {
        if (worker === undefined) {
            createWorker();
        }
        var request = {
            id: nextId$2++,
            instructions: instructions
        };
        worker.postMessage(request);
        return new Promise(function(resolve) {
            return pending[request.id] = resolve;
        });
    }
    function createWorker() {
        var highlightJsUrl = relativeToGlobal("js/highlight.pack.js?v=10.11.2017");
        var blob = new Blob([ "(" + workerScript.toString() + ")('" + highlightJsUrl + "')\n//# sourceURL=syntax-highlighter.js" ], {
            type: "application/javascript"
        });
        var url = URL.createObjectURL(blob);
        worker = new Worker(url);
        worker.onmessage = function(message) {
            var response = message.data;
            pending[response.id](response.results);
        };
    }
    function workerScript(highlightJsUrl) {
        function parseHighlightLines(code, rawInstruction) {
            var instructions = [];
            if (rawInstruction === null) {
                return instructions;
            }
            var lineRegex = /\n/g;
            var lines = 1;
            while (lineRegex.exec(code)) {
                lines++;
            }
            var rangeRegex = /(\d+)(?:\s*-\s*(\d+))?/g;
            var match;
            while (match = rangeRegex.exec(rawInstruction)) {
                var start = +match[1] - 1;
                if (isNaN(start) || start >= lines) {
                    continue;
                }
                var end = match[2] === undefined ? start : +match[2] - 1;
                if (isNaN(end) || end < start) {
                    continue;
                }
                end = Math.min(end, lines - 1);
                instructions.push({
                    start: start,
                    end: end
                });
            }
            return instructions;
        }
        function handleMessage(event) {
            var _a = event.data, id = _a.id, instructions = _a.instructions;
            var results = [];
            for (var _i = 0, instructions_1 = instructions; _i < instructions_1.length; _i++) {
                var _b = instructions_1[_i], language = _b.language, code = _b.code, highlightLines = _b.highlightLines;
                var result = {
                    code: code,
                    html: "",
                    success: false
                };
                try {
                    result.html = hljs.highlight(language, code, true).value;
                    result.success = true;
                } catch (err) {}
                if (result.success) {
                    var lineInstructions = parseHighlightLines(code, highlightLines);
                    if (lineInstructions.length) {
                        var lines = result.html.split("\n");
                        for (var _c = 0, lineInstructions_1 = lineInstructions; _c < lineInstructions_1.length; _c++) {
                            var _d = lineInstructions_1[_c], start = _d.start, end = _d.end;
                            for (var i = start; i <= end; i++) {
                                lines[i] = '<span class="line-highlight">' + lines[i] + "</span>";
                            }
                        }
                        result.html = lines.join("\n");
                    }
                }
                results.push(result);
            }
            var response = {
                id: id,
                results: results
            };
            self.postMessage(response);
        }
        self.importScripts(highlightJsUrl);
        self.addEventListener("message", handleMessage);
    }
    function getElementLanguage(element, config) {
        for (var i = 0; i < element.classList.length; i++) {
            var name = element.classList.item(i);
            if (/^lang-.+$/i.test(name)) {
                return name.substr(5);
            }
        }
        return config.unset;
    }
    function readGroupsFromContent(content, config, selectionOptions) {
        var selector = 'pre > code, span[class*="lang-"]';
        var elements = content.querySelectorAll(selector);
        var groups = [];
        var previous;
        for (var i = 0; i < elements.length; i++) {
            var element = elements.item(i);
            var language = getElementLanguage(element, config);
            var syntaxLanguage = config.syntaxMap[language] || language;
            var visibilityLanguage = config.visibilityMap[language] || language;
            var displayName = config.displayNameMap[language] || language || "";
            var code = element.querySelector("br") ? element.innerText : element.textContent;
            var interactiveType = void 0;
            var highlightLines = "";
            var isPreCode = element.nodeName === "CODE";
            if (isPreCode) {
                highlightLines = element.getAttribute("highlight-lines") || "";
                interactiveType = interactiveTypes[element.getAttribute("data-interactive")];
                element = element.parentElement;
                interactiveType = interactiveType || interactiveTypes[element.getAttribute("data-interactive")];
            }
            var current = {
                type: isPreCode ? "precode" : "span",
                element: element,
                language: language,
                syntaxLanguage: syntaxLanguage,
                visibilityLanguage: visibilityLanguage,
                displayName: displayName,
                code: code,
                interactiveType: interactiveType,
                highlightLines: highlightLines,
                isEnhanced: false
            };
            var createNewGroup = !previous || previous.type !== current.type || previous.element !== current.element.previousElementSibling || selectionOptions.indexOf(visibilityLanguage) === -1 || selectionOptions.indexOf(previous.visibilityLanguage) === -1;
            if (createNewGroup) {
                var newGroup = {
                    default: current,
                    members: [ current ]
                };
                groups.push(newGroup);
            } else {
                var currentGroup = groups[groups.length - 1];
                currentGroup.members.push(current);
                if (current.visibilityLanguage === config.default) {
                    currentGroup.default = current;
                }
            }
            previous = current;
        }
        return groups;
    }
    function enhanceVisibleBlocks(groups, config, contentDir) {
        var toHighlight = [];
        for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
            var group = groups_1[_i];
            for (var _a = 0, _b = group.members; _a < _b.length; _a++) {
                var member = _b[_a];
                if (member.type === "precode" && !member.isEnhanced && !member.element.hidden) {
                    toHighlight.push(member);
                    member.isEnhanced = true;
                }
            }
        }
        if (toHighlight.length === 0) {
            return Promise.resolve();
        }
        var instructions = toHighlight.map(function(item) {
            return {
                language: item.syntaxLanguage,
                code: item.code,
                highlightLines: item.highlightLines
            };
        });
        return syntaxHighlight(instructions).then(function(results) {
            for (var i = 0; i < results.length; i++) {
                var _a = results[i], html = _a.html, success = _a.success;
                var item = toHighlight[i];
                addCodeHeader(item, config, contentDir);
                if (success) {
                    item.element.firstElementChild.innerHTML = html;
                }
            }
            notifyContentUpdated();
        });
    }
    function setVisibility(groups, language) {
        var setBlockVisibility = function(block, visible) {
            block.element.hidden = !visible;
            if (block.header) {
                block.header.hidden = !visible;
            }
        };
        for (var _i = 0, groups_2 = groups; _i < groups_2.length; _i++) {
            var group = groups_2[_i];
            var anyVisible = false;
            for (var _a = 0, _b = group.members; _a < _b.length; _a++) {
                var member = _b[_a];
                var visible = member.visibilityLanguage === language;
                setBlockVisibility(member, visible);
                anyVisible = anyVisible || visible;
            }
            if (!anyVisible) {
                setBlockVisibility(group.default, true);
            }
        }
        notifyContentUpdated();
    }
    function getInitialSelection(options, config) {
        var preferred = config.preferred;
        if (preferred !== config.unset && options.indexOf(preferred) !== -1) {
            return preferred;
        }
        if (config.default !== config.unset && options.indexOf(config.default) !== -1) {
            return config.default;
        }
        return options[0];
    }
    var codeBlockPageTemplates = [ "Conceptual", "Hub", "LandingPage", "NamespaceListPage", "Reference", "Rest", "Tutorial", "ModuleUnit" ];
    function makeCodeBlocks() {
        if (codeBlockPageTemplates.indexOf(msDocs.data.pageTemplate) === -1) {
            return;
        }
        var title = document$1.getElementById("lang-title");
        var dropdownLinks = Array.from(document$1.querySelectorAll("#language-selector a"));
        var options = [];
        dropdownLinks.forEach(function(code) {
            options.push(code.dataset.biName.substr(5));
        });
        var hasSelector = dropdownLinks !== null && options.length > 0;
        var groups = readGroupsFromContent(document$1.body, languageConfig, options);
        if (hasSelector) {
            var language = getInitialSelection(options, languageConfig);
            var initialLang = document$1.querySelector('[data-bi-name="lang-' + language + '"]').innerHTML;
            setVisibility(groups, language);
            title.innerText = initialLang;
            dropdownLinks.forEach(function(link) {
                link.addEventListener("click", function() {
                    var language = link.dataset.biName.substr(5);
                    title.innerText = link.innerText;
                    languageConfig.preferred = language;
                    setVisibility(groups, language);
                    renderInTopicTOC();
                    enhanceVisibleBlocks(groups, languageConfig, msDocs.data.contentDir);
                });
            });
        }
        return enhanceVisibleBlocks(groups, languageConfig, msDocs.data.contentDir);
    }
    var ratingPageTemplates = [ "Conceptual", "LandingPage", "NamespaceListPage", "Reference", "Rest", "Tutorial" ];
    function initRating(_a) {
        var isArchived = _a.isArchived, pageTemplate = _a.pageTemplate, storage = _a.storage, container = _a.container, pathname = _a.pathname, mobile = _a.mobile;
        var storageKey = "rating" + pathname;
        if (isArchived || ratingPageTemplates.indexOf(pageTemplate) === -1 || storage.getItem(storageKey)) {
            return false;
        }
        renderRating(container, mobile, function() {
            return storage.setItem(storageKey, "true");
        });
        return true;
    }
    function renderRating(container, mobile, setRated) {
        var initialState = mobile ? "rating-mobile-feedback-active" : "rating-helpful-active";
        container.innerHTML = '\n\t\t<form class="rating ' + initialState + '" action="javascript:" data-bi-name="rating">\n\t\t\t<button class="rating-close docon docon-navigate-close" type="button" aria-label="' + loc.close + '" data-bi-name="rating-close"></button>\n\t\t\t<button class="rating-button rating-mobile-feedback" type="button" data-bi-name="rating-mobile-feedback">' + escape$1(loc.feedback) + '</button>\n\t\t\t<div class="rating-helpful">\n\t\t\t\t<label>' + escape$1(loc.isThisHelpful) + '</label>\n\t\t\t\t<button class="rating-button" type="button" data-bi-name="rating-yes" data-bi-sat="1">' + escape$1(loc.yes) + '</button>\n\t\t\t\t<button class="rating-button" type="button" data-bi-name="rating-no" data-bi-sat="0">' + escape$1(loc.no) + '</button>\n\t\t\t</div>\n\t\t\t<div class="rating-verbatim">\n\t\t\t\t<label for="rating-0">' + escape$1(loc.howCanWeImprove) + '</label>\n\t\t\t\t<textarea class="rating-textarea" id="rating-0" placeholder="' + loc.ratingShareIdeas + '"></textarea>\n\t\t\t\t<button class="rating-button" type="submit" data-bi-name="rating-verbatim" disabled>' + escape$1(loc.submit) + '</button>\n\t\t\t</div>\n\t\t\t<div class="rating-thanks1">\n\t\t\t\t<p>' + escape$1(loc.thanksForFeedback) + "</p>\n\t\t\t\t<p>" + loc.ratingCommentsPrompt + '</p>\n\t\t\t</div>\n\t\t\t<div class="rating-thanks2">\n\t\t\t\t<span>' + escape$1(loc.thanksForFeedback) + "</span>\n\t\t\t</div>\n\t\t</form>";
        var form = container.firstElementChild;
        var textarea = form.querySelector("textarea");
        var submit = form.querySelector('[data-bi-name="rating-verbatim"]');
        textarea.onchange = textarea.oninput = function() {
            var value = textarea.value;
            var cN = submit.getAttribute("data-bi-name");
            submit.setAttribute("data-m", JSON.stringify({
                cN: cN,
                value: value,
                vtbm: value
            }));
            submit.disabled = value.length === 0;
        };
        form.addEventListener("click", function(event) {
            var target = event.target;
            var button = target instanceof Element && target.closest("button,a");
            if (!button || button instanceof HTMLButtonElement && button.disabled) {
                return;
            }
            event.preventDefault();
            var name = button.getAttribute("data-bi-name").replace(/^rating-/, "");
            switch (name) {
              case "close":
                form.parentElement.removeChild(form);
                break;

              case "mobile-feedback":
                form.className = "rating rating-helpful-active";
                break;

              case "yes":
                form.className = "rating rating-thanks1-active";
                setRated();
                setTimeout(function() {
                    return form.remove();
                }, 1e4);
                break;

              case "no":
              case "verbatim-link":
                form.className = "rating rating-verbatim-active";
                setRated();
                break;

              case "verbatim":
                form.className = "rating rating-thanks2-active";
                setTimeout(function() {
                    return form.remove();
                }, 3e3);
                break;

              default:
                throw new Error('Unexpected rating button name: "' + name + '".');
            }
        });
    }
    var url = "https://dc.services.visualstudio.com/v2/track";
    var instrumentationKey = {
        "docs.microsoft.com": "396432b3-92d9-4406-ae10-7c080ba82169",
        "docs.azure.cn": "396432b3-92d9-4406-ae10-7c080ba82169",
        "review.docs.microsoft.com": "9a395e30-2be5-4c76-b839-8ba90f106030",
        localhost: "9a395e30-2be5-4c76-b839-8ba90f106030"
    }[location.hostname];
    var flushDelay = 5e3;
    function trackEvent(name) {
        track$1("Event", {
            name: name
        });
    }
    function trackDependency(method, url, totalTime, success, resultCode) {
        var _a = parseUrl(url), hostname = _a.hostname, pathname = _a.pathname;
        var duration = new Date(totalTime).toISOString().substr(11, 12);
        var id = newId();
        track$1("RemoteDependency", {
            data: pathname,
            duration: duration,
            id: id,
            name: method + " " + pathname,
            resultCode: resultCode,
            success: success,
            target: hostname,
            type: "Ajax"
        });
    }
    var enabled = false;
    var pendingEvents = [];
    var pendingFlush = 0;
    function track$1(type, data) {
        if (!enabled) {
            return;
        }
        var event = {
            data: {
                baseData: data,
                baseType: type + "Data"
            },
            iKey: instrumentationKey,
            name: "Microsoft.ApplicationInsights." + instrumentationKey + "." + type,
            tags: {
                "ai.device.id": "browser",
                "ai.device.type": "Browser",
                "ai.operation.name": location.pathname
            },
            time: new Date().toISOString()
        };
        pendingEvents.push(event);
        clearTimeout(pendingFlush);
        pendingFlush = setTimeout(flush, flushDelay);
    }
    function flush() {
        if (pendingEvents.length === 0) {
            return;
        }
        var events = pendingEvents.splice(0, pendingEvents.length);
        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(events)
        });
    }
    function newId() {
        var base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var result = "";
        var random = Math.random() * 1073741824;
        while (random > 0) {
            var char = base64chars.charAt(random % 64);
            result += char;
            random = Math.floor(random / 64);
        }
        return result;
    }
    var fetchWithTimeout = function(input, init) {
        var timeout = 30 * 1e3;
        return new Promise(function(resolve, reject) {
            var timeoutHandle = setTimeout(function() {
                return trackAndReject("timeout");
            }, timeout);
            var start = Date.now();
            var _a = getUrlAndMethod(input, init), url = _a.url, method = _a.method;
            var trackAndResolve = function(response) {
                clearTimeout(timeoutHandle);
                trackDependency(method, url, Date.now() - start, response.ok, response.status);
                resolve(response);
            };
            var trackAndReject = function(reason) {
                clearTimeout(timeoutHandle);
                trackDependency(method, url, Date.now() - start, false, 0);
                reject(reason);
            };
            fetch(input, init).then(trackAndResolve, trackAndReject);
        });
    };
    function getUrlAndMethod(input, init) {
        var url;
        var method;
        if (input instanceof Request) {
            url = input.url;
            method = input.method;
        } else if (init && init.method) {
            url = input;
            method = init.method;
        } else {
            url = input;
            method = "GET";
        }
        return {
            url: url,
            method: method
        };
    }
    var selectedClass = "is-primary";
    function initZonePivots() {
        var groups = (getMeta("zone_pivot_groups") || "").split(",").map(function(g) {
            return g.trim();
        }).filter(function(g) {
            return g.length;
        });
        if (!groups.length) {
            return Promise.resolve();
        }
        return Promise.all([ getDefinitions(), contentLoaded ]).then(function(_a) {
            var definitions = _a[0];
            var insertAfter = document.querySelector(".content .page-metadata");
            if (!insertAfter) {
                return;
            }
            renderZonePivots(insertAfter, groups, definitions);
        });
    }
    function renderZonePivots(insertAfter, groups, definitions) {
        var pivotsArg = parseQueryString().pivots;
        var queryStringPivots = pivotsArg ? pivotsArg.split(",").map(function(x) {
            return x.trim().toLowerCase();
        }) : [];
        var selectedPivots = getInitialSelection$1(definitions, groups, queryStringPivots, preferredPlatform || platform);
        var style = document.createElement("style");
        document.head.appendChild(style);
        displaySelectedPivots(style, selectedPivots);
        var alert = createPivotAlert(insertAfter, definitions, groups, selectedPivots);
        var radios = Array.from(alert.querySelectorAll('input[type="radio"]')).map(function(input) {
            return {
                input: input,
                button: input.closest(".button")
            };
        });
        var syncChecked = function() {
            displaySelectedPivots(style, radios.filter(function(x) {
                return x.input.checked;
            }).map(function(x) {
                return x.input.value;
            }));
            radios.forEach(function(_a) {
                var input = _a.input, button = _a.button;
                if (input.checked) {
                    button.classList.add(selectedClass);
                } else {
                    button.classList.remove(selectedClass);
                }
            });
        };
        var syncFocus = function() {
            return radios.forEach(function(_a) {
                var input = _a.input, button = _a.button;
                var method = input.matches(":focus") ? "add" : "remove";
                button.classList[method]("is-focused");
            });
        };
        alert.addEventListener("change", syncChecked);
        alert.addEventListener("blur", syncFocus, true);
        alert.addEventListener("focus", syncFocus, true);
    }
    function displaySelectedPivots(style, selectedPivots) {
        style.textContent = "\n\t\t[data-pivot]" + selectedPivots.map(function(pivot) {
            return ":not([data-pivot~='" + pivot + "'])";
        }).join("") + " {\n\t\t\tdisplay: none !important;\n\t\t}";
        renderInTopicTOC();
        notifyContentUpdated();
        updateQueryString({
            pivots: selectedPivots.join()
        }, "replaceState");
    }
    function createPivotAlert(insertAfter, definitions, groups, selectedPivots) {
        var _a = msDocs.data, userDir = _a.userDir, userLocale = _a.userLocale;
        var toDisplay = groups.map(function(group) {
            return definitions.find(function(g) {
                return g.id === group;
            });
        });
        insertAfter.insertAdjacentHTML("afterend", '\n\t\t<div class="alert" dir="' + userDir + '" lang="' + userLocale + '">\n\t\t\t' + toDisplay.map(function(group) {
            return '\n\t\t\t<fieldset class="field is-paddingless is-borderless">\n\t\t\t\t<legend class="label">' + group.prompt + '</legend>\n\t\t\t\t<div class="buttons has-addons">\n\t\t\t\t\t' + group.pivots.map(function(pivot) {
                return '\n\t\t\t\t\t<label class="button ' + (selectedPivots.indexOf(pivot.id) === -1 ? "" : selectedClass) + '">\n\t\t\t\t\t\t<input class="visually-hidden" type="radio" name="' + group.id + '" value="' + pivot.id + '" ' + (selectedPivots.indexOf(pivot.id) === -1 ? "" : "checked") + ">\n\t\t\t\t\t\t<span>" + escape$1(pivot.title) + "</span>\n\t\t\t\t\t</label>";
            }).join("\n") + "\n\t\t\t\t</div>\n\t\t\t</fieldset>";
        }).join("\n") + "\n\t\t</div>");
        return insertAfter.nextElementSibling;
    }
    function getInitialSelection$1(definitions, groups, queryStringPivots, platform$$1) {
        var selectedPivots = [];
        var _loop_1 = function(group) {
            var definition = definitions.find(function(d) {
                return d.id === group;
            });
            if (!definition) {
                return "continue";
            }
            var pivots = definition.pivots;
            var queryStringPivot = void 0;
            var platformPivot = void 0;
            var firstPivotInGroup = void 0;
            for (var _i = 0, pivots_1 = pivots; _i < pivots_1.length; _i++) {
                var pivot = pivots_1[_i];
                if (!firstPivotInGroup) {
                    firstPivotInGroup = pivot.id;
                }
                if (!queryStringPivot && queryStringPivots.indexOf(pivot.id) !== -1) {
                    queryStringPivot = pivot.id;
                }
                if (!platformPivot && pivot.id === platform$$1) {
                    platformPivot = pivot.id;
                }
            }
            selectedPivots.push(queryStringPivot || platformPivot || firstPivotInGroup);
        };
        for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
            var group = groups_1[_i];
            _loop_1(group);
        }
        return selectedPivots;
    }
    function getDefinitions() {
        var branch = parseQueryString().branch;
        var queryString = branch ? "?" + toQueryString({
            branch: branch
        }) : "";
        var url = location.pathname.split("/").slice(0, 3).join("/") + "/zone-pivot-groups.json" + queryString;
        return fetchWithTimeout(url, {
            credentials: "include"
        }).then(function(response) {
            return response.json();
        }).then(function(definitions) {
            return definitions.groups;
        });
    }
    function handleModals() {
        window.addEventListener("click", function(e) {
            var target = e.target;
            if (target.classList.contains("modal-close") || target.classList.contains("delete")) {
                var modal = target.closest(".modal");
                modal.classList.remove("is-active");
            }
        });
    }
    function fixContent() {
        fixAlerts();
        fixDivAnchors();
    }
    function fixAlerts() {
        var rogueAlerts = Array.from(document.querySelectorAll(".TIP, .NOTE, .IMPORTANT, .WARNING, .CAUTION"));
        rogueAlerts.forEach(function(alert) {
            alert.classList.add("alert");
        });
        if (/^en/.test(msDocs.data.contentLocale)) {
            return;
        }
        var selector = ".TIP > p:first-child, .NOTE > p:first-child, .IMPORTANT > p:first-child, .WARNING > p:first-child, .CAUTION > p:first-child";
        var alertsTitles = Array.from(document.querySelectorAll(selector));
        alertsTitles.forEach(function(title) {
            var locAddress = title.textContent.toLowerCase();
            if (locAddress in loc) {
                title.textContent = loc[locAddress];
            }
        });
    }
    function fixDivAnchors() {
        Array.from(document.querySelectorAll(".content div.button a, .content div.step-by-step a")).forEach(function(anchor) {
            anchor.classList.add("primary-action");
            anchor.closest(".button,.step-by-step").className = "";
        });
    }
    Promise.all([ cookieConsent, contentLoaded ]).then(function() {
        var imageList = document$1.querySelectorAll(".contributors img[data-src]");
        var _loop_1 = function(i) {
            var image = imageList[i];
            var newImage = new Image();
            newImage.onload = function() {
                image.src = newImage.src;
            };
            newImage.onerror = function() {
                var anchorEle = image.parentElement;
                var listEle = anchorEle.parentElement;
                image.title = anchorEle.getAttribute("title");
                listEle.removeChild(anchorEle);
                listEle.appendChild(image);
            };
            newImage.src = image.getAttribute("data-src");
        };
        for (var i = 0; i < imageList.length; i++) {
            _loop_1(i);
        }
    });
    if (typeof CustomEvent !== "function") {
        window$1.CustomEvent = function CustomEvent(event, params) {
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined
            };
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };
        window$1.CustomEvent.prototype = Event.prototype;
    }
    function dedupMain() {
        if (msDocs.data.pageTemplate !== "HubPage") {
            var mains = document.querySelectorAll("#main:not(main)");
            for (var i = 0; i < mains.length; i++) {
                mains[i].removeAttribute("id");
            }
        }
    }
    function initDropdowns(container) {
        container.addEventListener("click", function(event) {
            var trigger = event.target instanceof Element && event.target.closest(".dropdown-trigger");
            if (!trigger) {
                return;
            }
            event.preventDefault();
            var dropdown = trigger.parentElement;
            var activate = trigger.getAttribute("aria-expanded") !== "true";
            trigger.setAttribute("aria-expanded", activate.toString());
            if (activate) {
                if (dropdown.hasAttribute("auto-align")) {
                    var menu = dropdown.querySelector(".dropdown-menu");
                    alignMenu(trigger, menu);
                }
                var collapse_1 = function() {
                    container.removeEventListener("focus", checkTarget_1);
                    container.removeEventListener("click", checkTarget_1);
                    container.removeEventListener("touchstart", checkTarget_1);
                    trigger.setAttribute("aria-expanded", "false");
                };
                var checkTarget_1 = function(_a) {
                    var target = _a.target;
                    if (target instanceof Element && !dropdown.contains(target)) {
                        collapse_1();
                    }
                };
                var useCapture = true;
                container.addEventListener("focus", checkTarget_1, useCapture);
                container.addEventListener("click", checkTarget_1);
                container.addEventListener("touchstart", checkTarget_1);
                container.addEventListener("collapse-dropdown", function(event) {
                    event.stopPropagation();
                    collapse_1();
                });
            }
        });
    }
    function collapseDropdown(child) {
        child.dispatchEvent(new CustomEvent("collapse-dropdown", {
            bubbles: true
        }));
    }
    function alignMenu(trigger, menu) {
        var overflowX = function(el) {
            return window$1.getComputedStyle(el).overflowX;
        };
        var container = trigger.parentElement;
        while (container && container.nodeName !== "BODY" && overflowX(container) !== "hidden") {
            container = container.parentElement;
        }
        if (container === null) {
            return "left";
        }
        var _a = container.getBoundingClientRect(), containerLeft = _a.left, containerRight = _a.right;
        var _b = trigger.getBoundingClientRect(), left = _b.left, right = _b.right;
        if (left - containerLeft < containerRight - right) {
            menu.style.left = "0";
            menu.style.right = "";
        } else {
            menu.style.left = "";
            menu.style.right = "0";
        }
    }
    function editLinkRedirect() {
        if (document$1.location.host.toLowerCase() === "review.docs.microsoft.com") {
            var contenteditbtn = document$1.querySelectorAll("#contenteditbtn a");
            for (var i = 0; i < contenteditbtn.length; i++) {
                try {
                    var el = contenteditbtn[i];
                    var original_content_git_url = el.dataset.original_content_git_url;
                    if (original_content_git_url && original_content_git_url.length) {
                        el.setAttribute("href", original_content_git_url);
                    }
                } catch (e) {}
            }
        }
    }
    function detectFeatures() {
        var html = document$1.documentElement;
        var className = html.className.replace("no-js", "js");
        var w = window$1;
        if ("ontouchstart" in w || w.DocumentTouch && document$1 instanceof w.DocumentTouch) {
            className += " hasTouch";
        } else {
            className += " noTouch";
        }
        html.className = className;
    }
    function expander(controller) {
        var isExpanded = function() {
            return controller.getAttribute("aria-expanded") === "true";
        };
        var finishPendingTransition;
        var toggleInternal = function(expand) {
            if (finishPendingTransition) {
                finishPendingTransition();
            }
            controller.setAttribute("aria-expanded", expand.toString());
            var targets = controller.getAttribute("aria-controls").split(" ").map(function(id) {
                return document$1.getElementById(id);
            });
            for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
                var target = targets_1[_i];
                target.style.maxHeight = expand ? "0px" : "100vh";
                target.style.opacity = expand ? "0" : "1";
                target.style.transition = "max-height 300ms ease-in-out, opacity 300ms ease-in-out";
                target.hidden = false;
            }
            var pendingAnimation = requestAnimationFrame(function() {
                for (var _i = 0, targets_2 = targets; _i < targets_2.length; _i++) {
                    var target = targets_2[_i];
                    target.style.maxHeight = expand ? "100vh" : "0px";
                    target.style.opacity = expand ? "1" : "0";
                }
            });
            var finish = function() {
                cancelAnimationFrame(pendingAnimation);
                for (var _i = 0, targets_3 = targets; _i < targets_3.length; _i++) {
                    var target = targets_3[_i];
                    target.hidden = !expand;
                    target.style.transition = "";
                    target.style.maxHeight = "";
                    target.style.opacity = "";
                }
                clearTimeout(timeout);
                finishPendingTransition = undefined;
                notifyContentUpdated();
            };
            var timeout = setTimeout(finish, 300);
            finishPendingTransition = finish;
            controller.dispatchEvent(new CustomEvent(expand ? "expand" : "collapse", {
                bubbles: true
            }));
        };
        controller.onclick = function(event) {
            event.preventDefault();
            toggleInternal(!isExpanded());
        };
        var toggle = function(expand) {
            if (expand === void 0) {
                expand = !isExpanded();
            }
            if (isExpanded() === expand) {
                return;
            }
            toggleInternal(expand);
        };
        controller.onkeydown = function(event) {
            switch (event.which) {
              case keyCodes.left:
                event.preventDefault();
                toggle(false);
                break;

              case keyCodes.right:
                event.preventDefault();
                toggle(true);
                break;
            }
        };
        return toggle;
    }
    var unitTypes = [ {
        factor: 1e3,
        singular: loc.aSecondAgo,
        plural: loc.secondsAgo
    }, {
        factor: 1e3 * 60,
        singular: loc.aMinuteAgo,
        plural: loc.minutesAgo
    }, {
        factor: 1e3 * 60 * 60,
        singular: loc.anHourAgo,
        plural: loc.hoursAgo
    }, {
        factor: 1e3 * 60 * 60 * 24,
        singular: loc.aDayAgo,
        plural: loc.daysAgo
    }, {
        factor: 1e3 * 60 * 60 * 24 * 7,
        singular: loc.aWeekAgo,
        plural: loc.weeksAgo
    }, {
        factor: 1e3 * 60 * 60 * 24 * 27,
        singular: loc.aMonthAgo,
        plural: loc.monthsAgo
    } ];
    var fuzzyFactor = 1.1;
    var formatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric"
    };
    function timeAgo(now, then) {
        var elapsed = now - then.getTime();
        if (elapsed < 5e3) {
            return loc.justNow;
        }
        var i = 0;
        while (unitTypes[i + 1] && elapsed * fuzzyFactor > unitTypes[i + 1].factor) {
            i++;
        }
        var _a = unitTypes[i], factor = _a.factor, singular = _a.singular, plural = _a.plural;
        var units = Math.round(elapsed / factor);
        if (units > 3 && i === unitTypes.length - 1) {
            return loc.onSpecificDate.replace("{0}", then.toLocaleDateString(undefined, formatOptions).replace(/\u200E/g, ""));
        }
        if (units === 1) {
            return singular;
        }
        return plural.replace("{0}", units.toString());
    }
    function getAssociationBadgeHtml(association, repo) {
        var a = authorAssociation[association];
        if (a === undefined) {
            return "";
        }
        var org = repo.substr(0, repo.indexOf("/"));
        var description = a.desc.replace(/\{repo\}/g, repo).replace(/\{org\}/g, org);
        return '\n\t\t<span class="github-author-association ' + association.toLowerCase() + '" aria-label="' + description + '" title="' + description + '">\n\t\t\t' + (a.icon ? '<img aria-hidden="true" width="12" height="12" src="' + a.icon + '">' : "") + "\n\t\t\t<span>" + escape$1(a.name) + "</span>\n\t\t</span>";
    }
    var authorAssociation = {
        COLLABORATOR: {
            name: loc.collaborator,
            desc: loc.collaboratorDescription,
            icon: ""
        },
        CONTRIBUTOR: {
            name: loc.contributor,
            desc: loc.contributorDescription,
            icon: ""
        },
        MEMBER: {
            name: loc.member,
            desc: loc.memberDescription,
            icon: "https://c.s-microsoft.com/favicon.ico?v2"
        },
        OWNER: {
            name: loc.owner,
            desc: loc.ownerDescription,
            icon: "https://c.s-microsoft.com/favicon.ico?v2"
        }
    };
    function doOAuthFlow(_a) {
        var type = _a.type, signInUrl = _a.signInUrl, returnUrlArg = _a.returnUrlArg, signInArgs = _a.signInArgs;
        return new Promise(function(resolve) {
            installCrossWindowCallback();
            var authorizedEvent = type + "-authorized";
            var authorizedHandler = function() {
                window$1.removeEventListener(authorizedEvent, authorizedHandler);
                resolve();
            };
            window$1.addEventListener(authorizedEvent, authorizedHandler);
            var storageEventFallbackHandler = function(_a) {
                var key = _a.key, newValue = _a.newValue;
                if (key === authorizedEvent && newValue !== null) {
                    window$1.removeEventListener("storage", storageEventFallbackHandler);
                    authorizedHandler();
                }
            };
            window$1.addEventListener("storage", storageEventFallbackHandler);
            var returnUrl = relativeToGlobal("authorized.html?" + type);
            signInArgs[returnUrlArg] = returnUrl;
            window$1.open(signInUrl + "?" + toQueryString(signInArgs), "_blank");
        });
    }
    function installCrossWindowCallback() {
        if (window$1.notifyAuthorized === undefined) {
            window$1.notifyAuthorized = function(type) {
                return window$1.dispatchEvent(new CustomEvent(type + "-authorized"));
            };
        }
    }
    var tokenChangedEvent = "github-token-changed";
    var Token = function() {
        function Token() {
            this.storageKey = "github_token";
            this.token = localStorage$2.getItem(this.storageKey);
        }
        Object.defineProperty(Token.prototype, "value", {
            get: function() {
                return this.token;
            },
            set: function(newValue) {
                if (newValue === null) {
                    localStorage$2.removeItem(this.storageKey);
                } else {
                    localStorage$2.setItem(this.storageKey, newValue);
                }
                if (this.token !== newValue) {
                    this.token = newValue;
                    window$1.dispatchEvent(new CustomEvent(tokenChangedEvent));
                }
            },
            enumerable: true,
            configurable: true
        });
        return Token;
    }();
    var token = new Token();
    function login() {
        var baseUrl = "https://docs.microsoft.com/api/githubauth";
        var args = {
            type: "github",
            signInUrl: baseUrl + "/authorize",
            signInArgs: {},
            returnUrlArg: "redirect_uri"
        };
        return doOAuthFlow(args).then(function() {
            return fetchWithTimeout(baseUrl + "/token", {
                mode: "cors",
                credentials: "include"
            });
        }).then(function(response) {
            if (response.ok) {
                return response.json();
            }
            return response.text().then(function(text) {
                return Promise.reject("Error retrieving token:\n" + text);
            });
        }).then(function(t) {
            token.value = t;
        }, function(reason) {
            token.value = null;
            throw reason;
        });
    }
    function whenSignedIn() {
        if (token.value) {
            return Promise.resolve();
        }
        return new Promise(function(resolve) {
            var handler = function() {
                if (!token.value) {
                    return;
                }
                window$1.removeEventListener(tokenChangedEvent, handler);
                resolve();
            };
            window$1.addEventListener(tokenChangedEvent, handler);
        });
    }
    var GITHUB_API = "https://api.github.com/";
    var GITHUB_ENCODING__HTML_JSON = "application/vnd.github.VERSION.html+json";
    var GITHUB_ENCODING__REACTIONS_PREVIEW = "application/vnd.github.squirrel-girl-preview";
    var PAGE_SIZE = 100;
    var rateLimitExceededEvent = "github-rate-limit-exceeded";
    var githubApiErrorEvent = "github-api-error";
    function acceptHtmlAndReactions(request) {
        var accept = GITHUB_ENCODING__HTML_JSON + "," + GITHUB_ENCODING__REACTIONS_PREVIEW;
        request.headers.set("Accept", accept);
    }
    function githubRequest(relativeUrl, init) {
        init = init || {};
        init.mode = "cors";
        init.cache = "no-cache";
        var request = new Request(GITHUB_API + relativeUrl, init);
        if (token.value !== null && !/^search/.test(relativeUrl)) {
            request.headers.set("Authorization", "token " + token.value);
        }
        return request;
    }
    var RateLimitExceededError = function() {
        function RateLimitExceededError(reset, limit, signedIn, isSearch) {
            this.limit = limit;
            this.signedIn = signedIn;
            this.isSearch = isSearch;
            this.resetDate = new Date(0);
            this.resetDate.setUTCSeconds(reset);
            this.message = "Rate limit exceeded. Rate limit resets at " + this.resetDate.toLocaleTimeString() + ".";
        }
        Object.defineProperty(RateLimitExceededError.prototype, "resetsInMinutes", {
            get: function() {
                return Math.round((this.resetDate.getTime() - new Date().getTime()) / 1e3 / 60);
            },
            enumerable: true,
            configurable: true
        });
        return RateLimitExceededError;
    }();
    var rateLimit = {
        standard: {
            limit: Number.MAX_VALUE,
            remaining: Number.MAX_VALUE,
            reset: 0
        },
        search: {
            limit: Number.MAX_VALUE,
            remaining: Number.MAX_VALUE,
            reset: 0
        }
    };
    function processRateLimit(response, isSearch) {
        var limit = +response.headers.get("X-RateLimit-Limit");
        var remaining = +response.headers.get("X-RateLimit-Remaining");
        var reset = +response.headers.get("X-RateLimit-Reset");
        var rate = isSearch ? rateLimit.search : rateLimit.standard;
        rate.limit = limit;
        rate.remaining = remaining;
        rate.reset = reset;
        if (response.status === 403 && rate.remaining === 0) {
            var error = new RateLimitExceededError(rate.reset, rate.limit, !!token.value, isSearch);
            window$1.dispatchEvent(new CustomEvent(rateLimitExceededEvent, {
                detail: error
            }));
            throw error;
        }
    }
    function readRelNext(response) {
        var link = response.headers.get("link");
        if (link === null) {
            return 0;
        }
        var match = /\?page=([2-9][0-9]*)>; rel="next"/.exec(link);
        if (match === null) {
            return 0;
        }
        return +match[1];
    }
    function githubFetch(request) {
        var isSearch = /\/search\//.test(request.url);
        return fetchWithTimeout(request).then(function(response) {
            if (response.status === 401) {
                token.value = null;
                if (request.method === "GET" && request.headers.has("Authorization")) {
                    request.headers.delete("Authorization");
                    return githubFetch(request);
                }
            }
            processRateLimit(response, isSearch);
            if (!response.ok) {
                var status_1 = response.status;
                if (status_1 !== 401 && status_1 !== 403) {
                    response.text().then(function(responseText) {
                        var detail = {
                            url: request.url,
                            status: status_1,
                            isSearch: isSearch,
                            responseText: responseText
                        };
                        window$1.dispatchEvent(new CustomEvent(githubApiErrorEvent, {
                            detail: detail
                        }));
                    });
                }
                throw new Error("Error fetching " + request.url);
            }
            return response;
        }, function(reason) {
            var detail = {
                url: request.url,
                status: 0,
                isSearch: isSearch,
                responseText: reason.toString()
            };
            window$1.dispatchEvent(new CustomEvent(githubApiErrorEvent, {
                detail: detail
            }));
            return Promise.reject(reason);
        });
    }
    function loadIssuesByTermInBody(repo, term) {
        var q = '"' + term + '" type:issue in:body repo:' + repo;
        var request = githubRequest("search/issues?q=" + encodeURIComponent(q) + "&sort=created&order=desc");
        acceptHtmlAndReactions(request);
        return githubFetch(request).then(function(response) {
            return response.json();
        });
    }
    function commentsRequest(repo, issueNumber, page) {
        var url = "repos/" + repo + "/issues/" + issueNumber + "/comments?page=" + page + "&per_page=" + PAGE_SIZE;
        var request = githubRequest(url);
        acceptHtmlAndReactions(request);
        return request;
    }
    function loadCommentsPage(repo, issueNumber, page) {
        var request = commentsRequest(repo, issueNumber, page);
        return githubFetch(request).then(function(response) {
            var nextPage = readRelNext(response);
            return response.json().then(function(items) {
                return {
                    items: items,
                    nextPage: nextPage
                };
            });
        });
    }
    function createIssue(repo, title, body) {
        var request = githubRequest("repos/" + repo + "/issues", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                body: body
            })
        });
        acceptHtmlAndReactions(request);
        return githubFetch(request).then(function(response) {
            return response.json();
        });
    }
    function postComment(repo, issueNumber, markdown) {
        var url = "repos/" + repo + "/issues/" + issueNumber + "/comments";
        var body = JSON.stringify({
            body: markdown
        });
        var request = githubRequest(url, {
            method: "POST",
            body: body
        });
        acceptHtmlAndReactions(request);
        return githubFetch(request).then(function(response) {
            return response.json();
        });
    }
    function toggleIssueReaction(repo, issueNumber, reaction) {
        var url = "repos/" + repo + "/issues/" + issueNumber + "/reactions";
        return toggleReaction(url, reaction);
    }
    function toggleCommentReaction(repo, commentId, reaction) {
        var url = "repos/" + repo + "/issues/comments/" + commentId + "/reactions";
        return toggleReaction(url, reaction);
    }
    function toggleReaction(url, content) {
        var body = JSON.stringify({
            content: content
        });
        var request = githubRequest(url, {
            method: "POST",
            body: body
        });
        request.headers.set("Accept", GITHUB_ENCODING__REACTIONS_PREVIEW);
        return githubFetch(request).then(function(response) {
            if (response.status === 201) {
                return response.json().then(function(reaction) {
                    return {
                        reaction: reaction,
                        deleted: false
                    };
                });
            }
            if (response.status !== 200) {
                throw new Error('expected "201 reaction created" or "200 reaction already exists"');
            }
            return response.json().then(function(reaction) {
                var request = githubRequest("reactions/" + reaction.id, {
                    method: "DELETE"
                });
                request.headers.set("Accept", GITHUB_ENCODING__REACTIONS_PREVIEW);
                return githubFetch(request).then(function() {
                    return reaction;
                });
            }).then(function(reaction) {
                return {
                    reaction: reaction,
                    deleted: true
                };
            });
        });
    }
    function getUser() {
        var request = githubRequest("user");
        return githubFetch(request).then(function(response) {
            return response.json();
        });
    }
    var context = {
        repo: msDocs.data.feedbackGitHubRepo,
        documentId: getMeta("document_id") || btoa(location.pathname),
        versionIndependentDocumentId: getMeta("document_version_independent_id") || btoa(location.pathname),
        documentSourceUrl: msDocs.data.contentGitUrl || getMeta("original_content_git_url") || getMeta("original_ref_skeleton_git_url") || "",
        service: getMeta("ms.service"),
        product: getMeta("ms.prod"),
        author: getMeta("author"),
        msAuthor: getMeta("ms.author"),
        contentTitle: getMeta("og:title") || document.title
    };
    function createAlert(message, info) {
        if (info === void 0) {
            info = false;
        }
        var alert = document.createElement("div");
        alert.setAttribute("role", "alert");
        alert.classList.add("feedback-alert");
        if (info) {
            alert.classList.add("info");
        }
        alert.innerHTML = '\n\t\t<span class="docon docon-status-error-outline" aria-hidden="true"></span>\n\t\t<span class="message">' + message + '</span>\n\t\t<button type="button" class="dismiss" aria-label="' + loc["disclaimer.dismissAlert"] + '">\n\t\t\t<span class="docon docon-navigate-close" aria-hidden="true"></span>\n\t\t</button>';
        var dismiss = alert.querySelector("button");
        dismiss.onclick = function() {
            dismiss.onclick = null;
            alert.style.maxHeight = "0";
            alert.style.opacity = "0";
            var finishTransition = function() {
                alert.removeEventListener("transitionend", finishTransition);
                alert.parentElement.removeChild(alert);
            };
            alert.addEventListener("transitionend", finishTransition);
        };
        return alert;
    }
    function confirmSubmit(type) {
        var message = "⚠ CAUTION: It looks like you're on an internal site. " + context.repo + " is a public repo! ⚠\n\nAre you sure you want to post this " + type + "?";
        return location$1.host === "docs.microsoft.com" || location$1.host === "docs.azure.cn" || window$1.confirm(message);
    }
    function configureValidation(form) {
        var _loop_1 = function(i) {
            var element = form.elements.item(i);
            if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                element.onchange = function() {
                    return element.setCustomValidity(/^\s+$/.test(element.value) ? loc.pleaseFillOut : "");
                };
            }
            if (element instanceof HTMLButtonElement && element.type === "submit") {
                element.onclick = function() {
                    return form.classList.add("show-validation-status");
                };
            }
        };
        for (var i = 0; i < form.elements.length; i++) {
            _loop_1(i);
        }
    }
    function resetForm(form) {
        for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements.item(i);
            if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                element.value = "";
                element.setCustomValidity("");
            }
        }
        form.classList.remove("show-validation-status");
        clearFormAlert(form);
    }
    function showFormAlert(form, message) {
        clearFormAlert(form);
        var alert = createAlert(message);
        var firstLabel = form.querySelector("label");
        firstLabel.insertAdjacentElement("beforebegin", alert);
    }
    function clearFormAlert(form) {
        var alert = form.querySelector(".feedback-alert");
        if (alert) {
            form.removeChild(alert);
        }
    }
    var signInButtonClassName = "feedback-sign-in-button";
    function initSignInButtonHandler(container) {
        container.addEventListener("click", function(event) {
            if (event.target instanceof Element && event.target.closest("." + signInButtonClassName)) {
                event.preventDefault();
                login();
            }
        });
    }
    var anonymousAvatar = "data:image/svg+xml;base64," + btoa('<svg width="120" height="120" viewBox="0 0 120 120" fill="transparent" xmlns="http://www.w3.org/2000/svg"></svg>');
    function dimensionAvatarUrl(url) {
        return "" + url + (url.indexOf("?") ? "&" : "?") + "s=72";
    }
    var avatar = {
        alt: loc.avatar,
        src: anonymousAvatar
    };
    var username = "";
    function initUser(section) {
        var handleTokenChange = function() {
            var setAnonymous = function() {
                avatar.alt = loc.avatar;
                avatar.src = anonymousAvatar;
                username = "";
                update(section);
            };
            if (token.value) {
                getUser().then(function(_a) {
                    var avatar_url = _a.avatar_url, login$$1 = _a.login;
                    avatar.alt = login$$1;
                    avatar.src = dimensionAvatarUrl(avatar_url);
                    username = login$$1;
                    update(section);
                }, setAnonymous);
                return;
            } else {
                setAnonymous();
            }
        };
        window$1.addEventListener(tokenChangedEvent, handleTokenChange);
        handleTokenChange();
    }
    function update(container) {
        updateAvatars(container);
        updateUsername(container);
        toggleCurrentUserClass(container);
    }
    function updateUsername(container) {
        var elements = container.querySelectorAll(".current-user .username");
        for (var i = 0; i < elements.length; i++) {
            elements.item(i).textContent = username;
        }
    }
    function updateAvatars(container) {
        var images = container.querySelectorAll(".current-user img.avatar");
        for (var i = 0; i < images.length; i++) {
            var img = images.item(i);
            img.alt = avatar.alt;
            img.src = avatar.src;
        }
    }
    function toggleCurrentUserClass(container) {
        var elements = container.querySelectorAll("[data-github-user]");
        for (var i = 0; i < elements.length; i++) {
            var el = elements.item(i);
            if (el.getAttribute("data-github-user") === username) {
                el.classList.add("current-user");
            } else {
                el.classList.remove("current-user");
            }
        }
    }
    var commentCreatedEvent = "comment-created-event";
    function renderCommentForm(container, issueNumber) {
        var signInButtonContent = '<span class="docon docon-brand-github" aria-hidden="true"></span> ' + escape$1(loc.signInToComment);
        container.insertAdjacentHTML("afterbegin", '\n\t\t<div class="github-comment current-user">\n\t\t\t<img class="comment-aside avatar" src="' + avatar.src + '" alt="' + avatar.alt + '" width="36" height="36" aria-hidden="true">\n\n\t\t\t<form class="comment-main feedback-form" accept-charset="UTF-8" autocomplete="off" action="javascript:">\n\t\t\t\t<h4 class="visually-hidden">' + escape$1(loc.leaveAComment) + '</h4>\n\n\t\t\t\t<label>\n\t\t\t\t\t<span class="visually-hidden">' + escape$1(loc.leaveAComment) + '</span>\n\t\t\t\t\t<textarea name="body" placeholder="' + escape$1(loc.leaveAComment) + '" required disabled></textarea>\n\t\t\t\t</label>\n\n\t\t\t\t<div class="action-container">\n\t\t\t\t\t<button class="primary-action ' + signInButtonClassName + '" type="button" name="sign-in" ' + nm("feedback-comment-sign-in") + ">" + signInButtonContent + '</button>\n\t\t\t\t\t<button class="primary-action" type="submit" name="submit" hidden>' + escape$1(loc.comment) + "</button>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>");
        var form = container.firstElementChild.querySelector(".feedback-form");
        var body = form.elements.namedItem("body");
        var submit = form.elements.namedItem("submit");
        var signIn = form.elements.namedItem("sign-in");
        configureValidation(form);
        var enableControls = function() {
            var signedIn = !!token.value;
            signIn.hidden = signedIn;
            submit.hidden = !signedIn;
            body.disabled = !signedIn;
        };
        enableControls();
        form.onsubmit = function() {
            if (submit.disabled || !confirmSubmit("comment")) {
                return;
            }
            submit.disabled = true;
            submit.classList.add("is-loading");
            postComment(context.repo, issueNumber, body.value).then(function(comment) {
                resetForm(form);
                window$1.dispatchEvent(new CustomEvent(commentCreatedEvent, {
                    detail: {
                        issueNumber: issueNumber,
                        comment: comment,
                        bodyMarkdown: body.value
                    }
                }));
            }, function() {
                var url = "https://github.com/" + context.repo + "/issues/" + issueNumber;
                var message = loc.errorCreatingComment.replace("{0}", url);
                showFormAlert(form, message);
            }).then(function() {
                submit.disabled = false;
                submit.classList.remove("is-loading");
            });
        };
        window$1.addEventListener(tokenChangedEvent, enableControls);
        return {
            form: form,
            body: body,
            submit: submit,
            signIn: signIn
        };
    }
    var reactionChangedEvent = "reaction-changed";
    var reactions = {
        "+1": {
            label: "+1",
            countLabel: loc.thumbsUpReactionCount,
            accessor: function(x) {
                return x.reactions["+1"];
            }
        },
        "-1": {
            label: "-1",
            countLabel: loc.thumbsDownReactionCount,
            accessor: function(x) {
                return x.reactions["-1"];
            }
        },
        laugh: {
            label: loc.laugh,
            countLabel: loc.laughReactionCount,
            accessor: function(x) {
                return x.reactions.laugh;
            }
        },
        hooray: {
            label: loc.hooray,
            countLabel: loc.hoorayReactionCount,
            accessor: function(x) {
                return x.reactions.hooray;
            }
        },
        confused: {
            label: loc.confused,
            countLabel: loc.confusedReactionCount,
            accessor: function(x) {
                return x.reactions.confused;
            }
        },
        heart: {
            label: loc.heart,
            countLabel: loc.heartReactionCount,
            accessor: function(x) {
                return x.reactions.heart;
            }
        }
    };
    function isIssue(owner) {
        return "number" in owner;
    }
    function getReactionButtonHtml(type, count, ownerId, ownerType, displayCount) {
        var labelFormat = displayCount ? reactions[type].countLabel : reactions[type].label;
        var disabled = token.value ? "" : "disabled";
        return '\n\t\t<button class="github-reaction"\n\t\t\ttype="button"\n\t\t\taria-label="' + labelFormat.replace("{0}", count.toString()) + '"\n\t\t\tdata-label-format="' + labelFormat + '"\n\t\t\tdata-reaction-type="' + type + '"\n\t\t\tdata-reaction-owner="' + ownerId + '"\n\t\t\tdata-reaction-owner-type="' + ownerType + '"\n\t\t\t' + (displayCount ? 'data-reaction-count="' + count + '"' : "") + "\n\t\t\t" + disabled + "\n\t\t\t" + nm(type) + ">\n\t\t</button>";
    }
    function getReactionsBarHtml(owner, forMenu, htmlAttrs) {
        if (forMenu === void 0) {
            forMenu = false;
        }
        if (htmlAttrs === void 0) {
            htmlAttrs = "";
        }
        var types = [ "+1", "-1", "laugh", "hooray", "confused", "heart" ];
        var ownerId = isIssue(owner) ? owner.number : owner.id;
        var ownerType = isIssue(owner) ? "issue" : "comment";
        var displayCount = !forMenu;
        var buttons = types.map(function(t) {
            return getReactionButtonHtml(t, reactions[t].accessor(owner), ownerId, ownerType, displayCount);
        });
        return '\n\t\t<div class="github-reactions ' + (forMenu ? "" : "has-divider") + '" ' + nm("reactions") + " " + htmlAttrs + ">\n\t\t\t" + buttons.join("") + "\n\t\t\t" + (forMenu ? "" : '<span class="hr"></span>' + getReactionsMenuHtml(owner)) + "\n\t\t</div>";
    }
    function getReactionsMenuHtml(owner, htmlAttrs) {
        if (htmlAttrs === void 0) {
            htmlAttrs = "";
        }
        var menuId = generateElementId();
        return '\n\t\t<div class="github-reactions-dropdown dropdown has-caret" auto-align ' + nm("reactions-menu") + " " + htmlAttrs + '>\n\t\t\t<button class="dropdown-trigger muted-link text-subtle"\n\t\t\t\t\taria-label="' + loc.chooseReaction + '"\n\t\t\t\t\taria-haspopup="true"\n\t\t\t\t\taria-controls="' + menuId + '">\n\t\t\t\t<span class="docon docon-octicon-plus-small" aria-hidden="true"></span>\n\t\t\t\t<span class="docon docon-octicon-smiley" aria-hidden="true"></span>\n\t\t\t</button>\n\t\t\t<div class="dropdown-menu" id="' + menuId + '" role="menu" aria-label="' + loc.pickReaction + '">\n\t\t\t\t<a class="feedback-sign-in-button" href="#" data-bi-name="feedback-reaction-sign-in" ' + (token.value ? "hidden" : "") + '>\n\t\t\t\t\t<span class="docon docon-brand-github" aria-hidden="true"></span>\n\t\t\t\t\t' + loc.signInToReact + '\n\t\t\t\t</a>\n\t\t\t\t<div>\n\t\t\t\t\t<span class="pick-reaction">' + escape$1(loc.pickReaction) + "</span>\n\t\t\t\t\t" + getReactionsBarHtml(owner, true) + "\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>";
    }
    function incrementReactionCount(container, type, delta, ownerId, ownerType) {
        var selector = '[data-reaction-owner="' + ownerId + '"][data-reaction-owner-type="' + ownerType + '"][data-reaction-type="' + type + '"][data-reaction-count]';
        var elements = container.querySelectorAll(selector);
        for (var i = 0; i < elements.length; i++) {
            var element = elements.item(i);
            var count = parseInt(element.getAttribute("data-reaction-count")) + delta;
            element.setAttribute("data-reaction-count", count.toString());
            var format = element.getAttribute("data-label-format");
            element.setAttribute("aria-label", format.replace("{0}", count.toString()));
        }
    }
    function initReactions(container) {
        window$1.addEventListener(reactionChangedEvent, function(event) {
            var _a = event.detail, ownerId = _a.ownerId, ownerType = _a.ownerType, reaction = _a.reaction, deleted = _a.deleted;
            incrementReactionCount(container, reaction.content, deleted ? -1 : 1, ownerId, ownerType);
        });
        container.addEventListener("click", function(event) {
            var button = event.target instanceof Element && event.target.closest("button[data-reaction-type]");
            if (!button) {
                return;
            }
            event.preventDefault();
            var ownerId = +button.getAttribute("data-reaction-owner");
            var ownerType = button.getAttribute("data-reaction-owner-type");
            var type = button.getAttribute("data-reaction-type");
            if (button.disabled) {
                return;
            }
            button.disabled = true;
            button.classList.add("submitting");
            var toggleReaction = ownerType === "issue" ? toggleIssueReaction : toggleCommentReaction;
            toggleReaction(context.repo, ownerId, type).then(function(_a) {
                var reaction = _a.reaction, deleted = _a.deleted;
                var detail = {
                    ownerId: ownerId,
                    ownerType: ownerType,
                    reaction: reaction,
                    deleted: deleted
                };
                window$1.dispatchEvent(new CustomEvent(reactionChangedEvent, {
                    detail: detail
                }));
            }, function(err) {}).then(function() {
                button.disabled = false;
                button.classList.remove("submitting");
                collapseDropdown(button);
            });
        });
        window$1.addEventListener(tokenChangedEvent, function() {
            Array.from(container.querySelectorAll(".github-reaction")).forEach(function(el) {
                return el.disabled = !token.value;
            });
            Array.from(container.querySelectorAll(".github-reactions-dropdown .feedback-sign-in-button")).forEach(function(el) {
                return el.hidden = !!token.value;
            });
        });
    }
    function initComments(commentList, issueNumber, commentCount) {
        if (commentCount > 0) {
            loadComments(commentList, issueNumber, commentCount);
        }
        var formListItem = document.createElement("li");
        renderCommentForm(formListItem, issueNumber);
        commentList.appendChild(formListItem);
        window$1.addEventListener(commentCreatedEvent, function(event) {
            if (event.detail.issueNumber !== issueNumber) {
                return;
            }
            var comment = event.detail.comment;
            formListItem.insertAdjacentHTML("beforebegin", getCommentHtml(comment));
            notifyContentUpdated();
        });
    }
    function loadComments(commentList, issueNumber, commentCount) {
        var count = Math.min(10, commentCount);
        var placeholderComments = new Array(count + 1).join(placeholderCommentHtml);
        commentList.insertAdjacentHTML("afterbegin", placeholderComments);
        var removePlaceholderComments = function() {
            while (count--) {
                commentList.removeChild(commentList.firstElementChild);
            }
        };
        loadCommentsPage(context.repo, issueNumber, 1).then(function(page) {
            removePlaceholderComments();
            commentList.insertAdjacentHTML("afterbegin", page.items.map(getCommentHtml).join("\n"));
            notifyContentUpdated();
        }, function(err) {
            removePlaceholderComments();
            var message = err instanceof RateLimitExceededError ? loc.rateLimitedLoadingComments + " " + (err.signedIn ? "" : loc.signInToIncreaseRateLimit) : loc.errorLoadingComments;
            var alert = createAlert(message, err instanceof RateLimitExceededError);
            var errorListItem = document.createElement("li");
            errorListItem.appendChild(alert);
            commentList.insertAdjacentElement("afterbegin", errorListItem);
            notifyContentUpdated();
            if (err instanceof RateLimitExceededError && !err.signedIn) {
                whenSignedIn().then(function() {
                    commentList.removeChild(errorListItem);
                    loadComments(commentList, issueNumber, commentCount);
                });
            }
        });
    }
    function getCommentHtml(comment) {
        var relativeTime = escape$1(timeAgo(Date.now(), new Date(comment.created_at)));
        var commentWhen = escape$1(loc.commentPostedFormat).replace("{name}", '<a class="comment-author muted-link" href="' + comment.user.html_url + '" ' + nm("github-issue-comment-user") + ">" + comment.user.login + "</a>").replace("{time ago}", '\n\t\t\t<a class="comment-date muted-link" href="' + comment.html_url + '" ' + nm("github-issue-comment") + '>\n\t\t\t\t<time datetime="' + comment.created_at + '">' + relativeTime + "</time>\n\t\t\t</a>");
        return '\n\t\t<li>\n\t\t\t<div class="github-comment ' + (comment.user.login === username ? "current-user" : "") + '" data-github-user="' + comment.user.login + '">\n\t\t\t\t<img class="comment-aside avatar" src="' + dimensionAvatarUrl(comment.user.avatar_url) + '" alt="' + comment.user.login + '" width="36" height="36" aria-hidden="true">\n\n\t\t\t\t<article class="comment-main">\n\t\t\t\t\t<h4 class="comment-title">\n\t\t\t\t\t\t<span class="comment-meta">\n\t\t\t\t\t\t\t' + commentWhen + '\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span class="title-aside">\n\t\t\t\t\t\t\t' + getAssociationBadgeHtml(comment.author_association, context.repo) + "\n\t\t\t\t\t\t\t" + getReactionsMenuHtml(comment) + '\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</h4>\n\t\t\t\t\t<div class="comment-body github-content" ' + nm("comment-body") + ">\n\t\t\t\t\t\t" + comment.body_html + "\n\t\t\t\t\t</div>\n\t\t\t\t\t" + getReactionsBarHtml(comment) + "\n\t\t\t\t</article>\n\t\t\t</div>\n\t\t</li>";
    }
    var placeholderCommentHtml = '\n\t<li>\n\t\t<div class="github-comment">\n\t\t\t<img class="comment-aside avatar" src="' + anonymousAvatar + '" alt="' + loc.avatar + '" width="36" height="36" aria-hidden="true">\n\n\t\t\t<article class="comment-main">\n\t\t\t\t<h4 class="comment-title">&nbsp;</h4>\n\t\t\t\t<div class="comment-body">&nbsp;</div>\n\t\t\t</article>\n\t\t</div>\n\t</li>';
    var issuesLoadedEvent = "issues-loaded";
    var issueCreatedEvent = "issue-created";
    var issueListOverflowEvent = "issue-list-overflow";
    var issueListMax = 10;
    function initIssueLists(section) {
        var tabGroupElement = section.querySelector(".feedback-tab-group");
        var tabGroup = tabGroupElement.tabGroup;
        var _a = tabGroup.tabs, openTab = _a[0], closedTab = _a[1];
        openTab.selected = true;
        closedTab.selected = false;
        var _b = Array.from(tabGroupElement.querySelectorAll('[role="tab"]')), openTabElement = _b[0], closedTabElement = _b[1];
        var _c = Array.from(tabGroupElement.querySelectorAll(".github-issues-list")), openList = _c[0], closedList = _c[1];
        var _d = Array.from(tabGroupElement.querySelectorAll(".no-issues-placeholder")), noOpen = _d[0], noClosed = _d[1];
        var updateTabs = function() {
            openTabElement.textContent = loc.numberOpenIssues.replace("{0}", openList.children.length.toString());
            closedTabElement.textContent = loc.numberClosedIssues.replace("{0}", closedList.children.length.toString());
            tabGroupElement.hidden = openList.children.length === 0 && closedList.children.length === 0;
            noOpen.hidden = openList.children.length > 0;
            noClosed.hidden = closedList.children.length > 0;
        };
        var insertIssue = function(issue, position, permitOverflow) {
            var ul = issue.state === "open" ? openList : closedList;
            if (!permitOverflow && ul.children.length >= issueListMax) {
                window$1.dispatchEvent(new CustomEvent(issueListOverflowEvent, {
                    detail: issue
                }));
                return;
            }
            var li = createIssueListItem(issue);
            ul.insertAdjacentElement(position, li);
        };
        var handleIssuesLoaded = function(event) {
            var issues = event.detail;
            for (var _i = 0, issues_1 = issues; _i < issues_1.length; _i++) {
                var issue = issues_1[_i];
                insertIssue(issue, "beforeend", false);
            }
            updateTabs();
            notifyContentUpdated();
        };
        var handleIssueCreated = function(event) {
            var issue = event.detail.issue;
            insertIssue(issue, "afterbegin", true);
            updateTabs();
            notifyContentUpdated();
        };
        var handleCommentCreated = function(event) {
            var issueNumber = event.detail.issueNumber;
            var el = document.querySelector('.comment-count[data-issue="' + issueNumber + '"]');
            var count = +el.getAttribute("data-count");
            count++;
            el.setAttribute("data-count", count.toString());
        };
        window$1.addEventListener(issuesLoadedEvent, handleIssuesLoaded);
        window$1.addEventListener(issueCreatedEvent, handleIssueCreated);
        window$1.addEventListener(commentCreatedEvent, handleCommentCreated);
        return {
            tabGroup: tabGroup,
            tabGroupElement: tabGroupElement,
            openTab: openTab,
            closedTab: closedTab,
            openTabElement: openTabElement,
            closedTabElement: closedTabElement,
            openList: openList,
            closedList: closedList
        };
    }
    function createIssueListItem(issue) {
        var relativeTime = escape$1(timeAgo(Date.now(), new Date(issue.created_at)));
        var viewAuthorTip = loc.viewUserOnGH.replace("{username}", issue.user.login);
        var openedWhenBy = escape$1(loc.issueOpenedFormat).replace("{time ago}", '<time datetime="' + issue.created_at + '">' + relativeTime + "</time>").replace("{name}", '<a class="issue-author" href="' + issue.user.html_url + '" ' + nm("github-issue-user") + ' title="' + viewAuthorTip + '">' + issue.user.login + "</a>");
        var issueListItem = document.createElement("li");
        issueListItem.innerHTML = '\n\t\t<article>\n\t\t\t<div class="github-issue ' + (issue.user.login === username ? "current-user" : "") + '" data-github-user="' + issue.user.login + '">\n\t\t\t\t<h3 class="visually-hidden">' + escape$1(issue.title) + '</h3>\n\t\t\t\t<div class="issue-title-container">\n\t\t\t\t\t<a\tclass="issue-title muted-link" href="#" ' + nm("issue-expander") + '\n\t\t\t\t\t\taria-role="button" aria-expanded="false"\n\t\t\t\t\t\taria-controls="issue-' + issue.number + "-body issue-" + issue.number + "-comments issue-" + issue.number + "-reactions issue-" + issue.number + '-reactions-menu"\n\t\t\t\t\t\taria-label="' + loc.toggleIssue + '">\n\t\t\t\t\t\t<span class="expand-indicator text-subtle docon docon-chevron-right-light" aria-hidden="true"></span>\n\t\t\t\t\t\t' + escape$1(issue.title) + '\n\t\t\t\t\t</a>\n\t\t\t\t\t<div class="title-aside">\n\t\t\t\t\t\t' + getReactionsMenuHtml(issue, 'id="issue-' + issue.number + '-reactions-menu" hidden') + '\n\t\t\t\t\t\t<button\tclass="comment-count muted-link text-subtle"\n\t\t\t\t\t\t\t\tdata-issue="' + issue.number + '" data-count="' + issue.comments + '"\n\t\t\t\t\t\t\t\ttabindex="-1" role="button" aria-label="' + loc.toggleIssue + '">\n\t\t\t\t\t\t\t<span class="docon docon-comment-outline" aria-hidden="true"></span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="issue-body github-content" id="issue-' + issue.number + '-body" hidden ' + nm("issue-body") + ">\n\t\t\t\t\t" + issue.body_html + '\n\t\t\t\t</div>\n\t\t\t\t<div class="issue-footer">\n\t\t\t\t\t<div class="text-subtle">\n\t\t\t\t\t\t<a class="issue-number" href="' + issue.html_url + '" ' + nm("github-issue") + ' title="' + loc.viewIssueOnGH + '"><cite>#' + issue.number + "</cite></a>\n\t\t\t\t\t\t" + openedWhenBy + "\n\t\t\t\t\t\t" + getAssociationBadgeHtml(issue.author_association, context.repo) + "\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t" + getReactionsBarHtml(issue, false, 'id="issue-' + issue.number + '-reactions" hidden') + '\n\t\t\t</div>\n\t\t\t<ul class="github-comments-list" id="issue-' + issue.number + '-comments" aria-label="' + loc.comments + '" hidden></ul>\n\t\t</article>';
        var markdownBody = issueListItem.querySelector(".github-content");
        removeDocumentDetails(markdownBody);
        var toggle = issueListItem.querySelector(".issue-title");
        var toggleExpand = expander(toggle);
        var commentCountToggle = issueListItem.querySelector(".comment-count");
        commentCountToggle.onclick = function(event) {
            toggleExpand();
        };
        var onFirstExpand = function() {
            toggle.removeEventListener("expand", onFirstExpand);
            var commentList = issueListItem.firstElementChild.lastElementChild;
            initComments(commentList, issue.number, issue.comments);
        };
        toggle.addEventListener("expand", onFirstExpand);
        return issueListItem;
    }
    function removeDocumentDetails(markdownBody) {
        var hr = markdownBody.querySelector("hr:last-of-type");
        if (hr) {
            while (hr.nextElementSibling) {
                markdownBody.removeChild(hr.nextElementSibling);
            }
            markdownBody.removeChild(hr);
            return;
        }
        markdownBody.removeChild(markdownBody.lastElementChild);
    }
    function formatIssueBody(body) {
        var documentDetails = loc.documentDetails, doNotEditThis = loc.doNotEditThis;
        var markdown = body + "\n\n---\n#### " + documentDetails + "\n\n⚠ *" + doNotEditThis + "*\n\n";
        var url = location.href;
        var documentId = context.documentId, versionIndependentDocumentId = context.versionIndependentDocumentId, documentSourceUrl = context.documentSourceUrl, contentTitle = context.contentTitle;
        var documentSourceTitle = documentSourceUrl.replace(/^https:\/\/github.com\/[^/]+\/[^/]+\/blob\/[^/]+\//i, "").replace(/\[|\]/g, "\\$&");
        contentTitle = contentTitle.replace(/\[|\]/g, "\\$&");
        markdown += "* ID: " + documentId + "\n* Version Independent ID: " + versionIndependentDocumentId + "\n* Content: [" + contentTitle + "](" + url + ")\n* Content Source: [" + documentSourceTitle + "](" + documentSourceUrl + ")";
        var service = context.service, product = context.product;
        if (service !== undefined) {
            markdown += "\n* Service: **" + service.toLowerCase() + "**";
        }
        if (product !== undefined) {
            markdown += "\n* Product: **" + product.toLowerCase() + "**";
        }
        var author = context.author, msAuthor = context.msAuthor;
        if (author !== undefined) {
            if (/github\.com/.test(documentSourceUrl)) {
                markdown += "\n* GitHub Login: @" + author;
            } else {
                markdown += "\n* Git Login: **" + author + "**";
            }
        }
        if (msAuthor !== undefined) {
            markdown += "\n* Microsoft Alias: **" + msAuthor + "**";
        }
        markdown = markdown.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return markdown;
    }
    function getCreateOnGitHubUrl(title, body) {
        return "https://github.com/" + context.repo + "/issues/new?title=" + encodeURIComponent(title) + "&body=" + encodeURIComponent(formatIssueBody(body));
    }
    function initChooseFeedback(section) {
        var signIn = section.querySelector(".feedback-sign-in-button");
        var formToggle = section.querySelector(".feedback-form-toggle");
        var createOnGitHub = section.querySelector(".documentation-feedback-menu a");
        createOnGitHub.href = getCreateOnGitHubUrl("", "\n\n" + loc.feedbackPlaceholder + "\n");
        var toggleForm = expander(formToggle);
        var setButtonVisibility = function() {
            var signedIn = !!token.value;
            signIn.hidden = signedIn;
            formToggle.hidden = !signedIn;
        };
        setButtonVisibility();
        signIn.onclick = function() {
            return whenSignedIn().then(function() {
                return toggleForm(true);
            });
        };
        window$1.addEventListener(tokenChangedEvent, setButtonVisibility);
        window$1.addEventListener(issueCreatedEvent, function() {
            return toggleForm(false);
        });
    }
    function initInstrumentation() {
        jsllReady.then(instrument);
    }
    function instrument(awa) {
        var repo = context.repo;
        window$1.addEventListener(issueCreatedEvent, function(event) {
            var _a = event.detail, _b = _a.issue, id = _b.id, number = _b.number, title = _b.title, user = _b.user.login, author_association = _b.author_association, body = _a.bodyMarkdown;
            awa.ct.captureContentPageAction({
                content: {
                    type: "github-issue-created",
                    repo: repo,
                    id: id,
                    number: number,
                    title: title,
                    body: body,
                    user: user,
                    author_association: author_association
                }
            });
        });
        window$1.addEventListener(commentCreatedEvent, function(event) {
            var issueNumber = event.detail.issueNumber;
            var _a = event.detail, _b = _a.comment, id = _b.id, user = _b.user.login, author_association = _b.author_association, body = _a.bodyMarkdown;
            awa.ct.captureContentPageAction({
                content: {
                    type: "github-comment-created",
                    repo: repo,
                    id: id,
                    issueNumber: issueNumber,
                    body: body,
                    user: user,
                    author_association: author_association
                }
            });
        });
        window$1.addEventListener(reactionChangedEvent, function(event) {
            var _a = event.detail, ownerId = _a.ownerId, ownerType = _a.ownerType, _b = _a.reaction, id = _b.id, user = _b.user.login, content = _b.content, deleted = _a.deleted;
            awa.ct.captureContentPageAction({
                content: {
                    type: "github-reaction-changed",
                    repo: repo,
                    id: id,
                    ownerId: ownerId,
                    ownerType: ownerType,
                    user: user,
                    content: content,
                    deleted: deleted
                }
            });
        });
        window$1.addEventListener(rateLimitExceededEvent, function(event) {
            var error = event.detail;
            var apiType = error.isSearch ? "search" : "standard";
            trackEvent("github-" + apiType + "-rate-limit-exceeded");
            awa.ct.captureContentPageAction({
                content: {
                    type: "github-rate-limit-exceeded",
                    "api-type": apiType
                }
            });
        });
        window$1.addEventListener(githubApiErrorEvent, function(event) {
            var _a = event.detail, url = _a.url, status = _a.status, responseText = _a.responseText;
            awa.ct.captureContentPageAction({
                content: {
                    type: "github-api-error",
                    url: url,
                    status: status,
                    responseText: responseText
                }
            });
        });
    }
    function initIssueForm(section) {
        var form = section.querySelector(".feedback-form");
        var title = form.elements.namedItem("title");
        var body = form.elements.namedItem("body");
        var submitButton = form.elements.namedItem("submit");
        configureValidation(form);
        form.onsubmit = function() {
            if (submitButton.disabled || !confirmSubmit("issue")) {
                return;
            }
            submitButton.disabled = true;
            submitButton.classList.add("is-loading");
            submitIssue(title.value, body.value).then(function() {
                return resetForm(form);
            }, function() {
                var url = getCreateOnGitHubUrl(title.value, body.value);
                var message = loc.errorCreatingIssue.replace("{0}", url);
                showFormAlert(form, message);
            }).then(function() {
                submitButton.disabled = false;
                submitButton.classList.remove("is-loading");
            });
        };
    }
    function submitIssue(title, body) {
        body = formatIssueBody(body);
        return createIssue(context.repo, title, body).then(function(issue) {
            return window$1.dispatchEvent(new CustomEvent(issueCreatedEvent, {
                detail: {
                    issue: issue,
                    bodyMarkdown: body
                }
            }));
        });
    }
    function whenVisible(section) {
        return new Promise(function(resolve) {
            var inViewPort = false;
            var observer;
            var evaluate = function() {
                if (!inViewPort || document.hidden) {
                    return;
                }
                document.removeEventListener("visibilitychange", evaluate);
                if (observer) {
                    observer.disconnect();
                }
                removeEventListener("resize", fallbackCheck);
                removeEventListener("scroll", fallbackCheck);
                removeEventListener("content-updated", fallbackCheck);
                document.querySelector(".primary-holder").addEventListener("scroll", fallbackCheck);
                resolve();
            };
            var fallbackCheck = function() {
                var rect = section.getBoundingClientRect();
                var newValue = rect.top >= 0 && rect.top <= document.documentElement.clientHeight;
                if (newValue !== inViewPort) {
                    inViewPort = newValue;
                    evaluate();
                }
            };
            document.addEventListener("visibilitychange", evaluate);
            if (typeof IntersectionObserver === "undefined") {
                addEventListener("resize", fallbackCheck);
                addEventListener("scroll", fallbackCheck);
                addEventListener("content-updated", fallbackCheck);
                document.querySelector(".primary-holder").addEventListener("scroll", fallbackCheck);
                fallbackCheck();
            } else {
                var callback = function(entries) {
                    inViewPort = entries[0].intersectionRatio > 0;
                    evaluate();
                };
                observer = new IntersectionObserver(callback);
                observer.observe(section);
            }
            evaluate();
        });
    }
    var loadingFeedbackEvent = "loading-feedback-event";
    function loadFeedback(section) {
        var loadFeedback = function() {
            window$1.dispatchEvent(new CustomEvent(loadingFeedbackEvent));
            loadIssuesByTermInBody(context.repo, context.versionIndependentDocumentId).then(function(result) {
                var issues = result.items.filter(function(x) {
                    return !x.locked;
                });
                window$1.dispatchEvent(new CustomEvent(issuesLoadedEvent, {
                    detail: issues
                }));
            });
        };
        Promise.all([ cookieConsent, whenVisible(section) ]).then(loadFeedback);
    }
    function initStatusAlert(section) {
        var alert = section.querySelector(".feedback-status");
        window$1.addEventListener(loadingFeedbackEvent, function() {
            alert.hidden = false;
            alert.classList.remove("warning");
            alert.classList.remove("note");
            alert.classList.add("is-loading");
            alert.innerHTML = "<p>" + loc.loadingFeedback + "</p>";
        });
        window$1.addEventListener(issueCreatedEvent, function() {
            return alert.hidden = true;
        });
        window$1.addEventListener(issuesLoadedEvent, function(event) {
            var issues = event.detail;
            if (issues.length > 0) {
                alert.hidden = true;
            } else {
                alert.hidden = false;
                alert.textContent = loc.thereIsCurrentlyNoFeedback;
                alert.classList.remove("warning");
                alert.classList.remove("note");
                alert.classList.remove("is-loading");
            }
        });
        window$1.addEventListener(rateLimitExceededEvent, function(event) {
            var err = event.detail;
            if (!err.isSearch) {
                return;
            }
            var message = "" + loc.rateLimitedLoadingIssues;
            alert.hidden = false;
            alert.classList.remove("warning");
            alert.classList.add("note");
            alert.classList.remove("is-loading");
            alert.innerHTML = "<p>" + message + "</p>";
        });
        window$1.addEventListener(githubApiErrorEvent, function(event) {
            var details = event.detail;
            if (!details.isSearch) {
                return;
            }
            alert.hidden = false;
            alert.classList.add("warning");
            alert.classList.remove("note");
            alert.classList.remove("is-loading");
            alert.innerHTML = "<p>" + loc.errorLoadingFeedback + "</p>";
        });
    }
    function initViewOnGithub(section) {
        var viewOnGitHub = section.querySelector(".view-on-github");
        viewOnGitHub.search = toQueryString({
            utf8: "✓",
            q: '"' + context.versionIndependentDocumentId + '"',
            in: "body"
        });
        var handleOverflow = function() {
            viewOnGitHub.firstElementChild.nextElementSibling.textContent = loc.viewMoreOnGitHub;
            window$1.removeEventListener(issueListOverflowEvent, handleOverflow);
        };
        window$1.addEventListener(issueListOverflowEvent, handleOverflow);
        var handleIssues = function(_a) {
            var type = _a.type, detail = _a.detail;
            if (type === issuesLoadedEvent && detail.length === 0) {
                return;
            }
            viewOnGitHub.hidden = false;
            window$1.removeEventListener(issuesLoadedEvent, handleIssues);
            window$1.removeEventListener(issueCreatedEvent, handleIssues);
        };
        window$1.addEventListener(issuesLoadedEvent, handleIssues);
        window$1.addEventListener(issueCreatedEvent, handleIssues);
    }
    function initFeedback() {
        var section = document.body.querySelector(".feedback-section");
        initSignInButtonHandler(section);
        initChooseFeedback(section);
        initIssueForm(section);
        initUser(section);
        initIssueLists(section);
        initStatusAlert(section);
        initReactions(section);
        initInstrumentation();
        initViewOnGithub(section);
        loadFeedback(section);
        addEventListener("keydown", function(_a) {
            var keyCode = _a.keyCode, altKey = _a.altKey, ctrlKey = _a.ctrlKey;
            if (keyCode === 71 && altKey && ctrlKey && clipboardCopy(formatIssueBody(""), document.body)) {
                alert("✅ GitHub issue footer copied.");
            }
        });
    }
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, "find", {
            value: function(predicate) {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }
                var o = Object(this);
                var len = o.length >>> 0;
                if (typeof predicate !== "function") {
                    throw new TypeError("predicate must be a function");
                }
                var thisArg = arguments[1];
                var k = 0;
                while (k < len) {
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    k++;
                }
                return undefined;
            }
        });
    }
    if (Array.from === undefined) {
        Array.from = function(x) {
            return Array.prototype.slice.call(x);
        };
    }
    function fixDate() {
        $$1("time[datetime]").each(function() {
            var originalAttr = $$1(this).attr("datetime");
            var originalText = $$1(this).text();
            var $this = $$1(this);
            try {
                var dateVal = new Date(originalAttr);
                $this.attr("datetime", dateVal.toISOString());
                $this.text(dateVal.toLocaleDateString(msDocs.data.userLocale, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }));
            } catch (e) {
                $this.attr("datetime", originalAttr).text(originalText);
            }
            $this.removeClass("loading").parent().removeClass("loading");
        });
    }
    function enableGoogleAnalytics() {
        Promise.all([ contentLoaded, cookieConsent ]).then(function() {
            (function(i, s, o, g, r, a, m) {
                i.GoogleAnalyticsObject = r;
                i[r] = i[r] || function() {
                    (i[r].q = i[r].q || []).push(arguments);
                }, i[r].l = 1 * new Date();
                a = s.createElement(o), m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m);
            })(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");
            ga("create", "UA-62780441-21", "auto");
            ga("set", "anonymizeIp", true);
            ga("send", "pageview");
        });
    }
    var headingAnchorWhitelist = {
        Conceptual: true,
        ContentPage: true,
        LandingPage: true,
        Reference: true,
        Rest: true
    };
    function handleHeadings(container) {
        if (!(msDocs.data.pageTemplate in headingAnchorWhitelist)) {
            return;
        }
        var allowParents = [ ".content", ".content section", ".content [data-moniker]", ".anchor-headings" ];
        var allowHeadings = [ "h2", "h3", "h4", "h5", "h6" ];
        var headings = Array.from(container.querySelectorAll("" + allowHeadings.join(",")));
        headings.forEach(function(heading) {
            if (heading.parentElement.matches("" + allowParents.join(","))) {
                heading.classList.add("heading-with-anchor");
                var id = heading.id || getVisibleTextContent(heading).trim().toLowerCase().split(" ").join("-");
                if (!heading.id) {
                    heading.id = id;
                }
                var html = '<a class="docon docon-link heading-anchor" tabindex="-1" aria-hidden="true" href="#' + id + '"></a>';
                heading.insertAdjacentHTML("beforeend", html);
            }
        });
    }
    function ie10MobileFix() {
        if (navigator$1.userAgent.match(/IEMobile\/10\.0/)) {
            var msViewportStyle = document$1.createElement("style");
            msViewportStyle.appendChild(document$1.createTextNode("@-ms-viewport{width:auto!important}"));
            document$1.getElementsByTagName("head")[0].appendChild(msViewportStyle);
        }
    }
    var APExpandedChangedEvent = function() {
        function APExpandedChangedEvent(expanded) {
            this.expanded = expanded;
        }
        return APExpandedChangedEvent;
    }();
    var apClasses = {
        expanded: "ap-expanded",
        collapsed: "ap-collapsed",
        expandButton: "ap-expand-behavior",
        collapseButton: "ap-collapse-behavior"
    };
    var mobileQuery = window.matchMedia("screen and (max-width: 768px)");
    function getActionPanel(expandMode) {
        var html = document.documentElement.classList;
        var actionPanel = document.querySelector(".action-panel");
        if (html.contains("ap-layout") || expandMode === "none") {
            return actionPanel;
        }
        var primaryHolder = document.querySelector(".primary-holder");
        var restoreScroll = snapshotScroll();
        html.add("ap-layout");
        if (expandMode === "animate") {
            html.add("ap-layout-animates");
        }
        setTimeout(function() {
            return html.add("ap-layout-in");
        }, 20);
        var finish = function() {
            actionPanel.removeEventListener("transitionend", finish);
            html.remove("ap-layout-animates");
            html.add("ap-layout-finished");
            notifyContentUpdated();
            restoreScroll(primaryHolder);
            eventBus.publish(new APExpandedChangedEvent(true));
        };
        actionPanel.addEventListener("transitionend", finish);
        return actionPanel;
    }
    function collapseActionPanel() {
        var html = document.documentElement.classList;
        var primaryHolder = document.querySelector(".primary-holder");
        var restoreScroll = snapshotScroll();
        html.remove("ap-layout");
        html.remove("ap-layout-animates");
        html.remove("ap-layout-in");
        html.remove("ap-layout-finished");
        notifyContentUpdated();
        restoreScroll(document.documentElement);
        eventBus.publish(new APExpandedChangedEvent(false));
    }
    function snapshotScroll() {
        var children = document.querySelector(".content").children;
        var _loop_1 = function(i) {
            var element = children.item(i);
            var top = element.getBoundingClientRect().top;
            if (top <= 5 || i === 0) {
                var width_1 = element.clientWidth;
                return {
                    value: function(scrollableParent) {
                        element.scrollIntoView(true);
                        scrollableParent.scrollTop -= top * width_1 / element.clientWidth;
                    }
                };
            }
        };
        for (var i = children.length - 1; i >= 0; i--) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object") return state_1.value;
        }
        return function(scrollableParent) {};
    }
    function initActionPanel() {
        addEventListener("click", function(event) {
            if (!(event.target instanceof Element)) {
                return;
            }
            var element = event.target.closest("." + apClasses.expandButton + ", ." + apClasses.collapseButton);
            if (!element) {
                return;
            }
            if (element.classList.contains(apClasses.expandButton)) {
                getActionPanel("animate");
            } else {
                collapseActionPanel();
            }
        });
        mobileQuery.addListener(collapseActionPanel);
    }
    function scrollContentToTop() {
        window.scrollTo(0, 0);
        if (!msDocs.data.context.chromeless) {
            document.querySelector(".primary-holder").scrollTop = 0;
        }
    }
    function resetSidebar() {
        var sidebarContent = document.getElementById("sidebarContent");
        if (sidebarContent) {
            sidebarContent.style.cssText = "";
        }
    }
    var Tokens = function() {
        function Tokens() {
            this.tokens = null;
        }
        Object.defineProperty(Tokens.prototype, "value", {
            get: function() {
                return this.tokens;
            },
            set: function(newValue) {
                if (this.tokens !== newValue) {
                    this.tokens = newValue;
                }
            },
            enumerable: true,
            configurable: true
        });
        return Tokens;
    }();
    var tokens = new Tokens();
    function login$1() {
        if (tokens.value) {
            return;
        }
        var args = {
            type: "azure",
            signInUrl: "https://token.docs.microsoft.com/signin",
            returnUrlArg: "returnUrl",
            signInArgs: {}
        };
        return doOAuthFlow(args).then(function() {
            return tryLoadTokens();
        });
    }
    function logout() {
        var args = {
            type: "azure-logout",
            signInUrl: "https://token.docs.microsoft.com/signout",
            returnUrlArg: "returnUrl",
            signInArgs: {}
        };
        return doOAuthFlow(args).then(function() {
            tokens.value = null;
        });
    }
    var signingInHtml = "\n\t<h2>" + escape$1(loc.signingIn) + '</h2>\n\t<div class="c-progress f-indeterminate-local f-progress-large" role="progressbar" tabindex="0" aria-valuetext="' + loc["cloudShell.loggingIn"] + '" aria-label="' + loc["cloudShell.loggingIn"] + '">\n\t\t<span></span>\n\t\t<span></span>\n\t\t<span></span>\n\t\t<span></span>\n\t\t<span></span>\n\t</div>';
    function renderAuthentication(container) {
        return new Promise(function(resolve) {
            container.innerHTML = '\n\t\t\t<div class="azure-auth">\n\t\t\t\t<div class="azure-auth-step">\n\t\t\t\t\t' + signingInHtml + "\n\t\t\t\t</div>\n\t\t\t</div>";
            var authContainer = container.firstElementChild.firstElementChild;
            var resolveToken = function(token) {
                container.innerHTML = "";
                resolve(token);
            };
            var processTokens = function(tokens) {
                if (tokens === null) {
                    renderLogin(authContainer, processTokens);
                } else if (tokens.length === 1) {
                    resolveToken(tokens[0]);
                } else {
                    renderTokenSelector(authContainer, resolveToken, tokens);
                }
            };
            tryLoadTokens().then(function() {
                return processTokens(tokens.value);
            });
        });
    }
    function renderLogin(container, processTokens) {
        reportLoginPrompt();
        container.innerHTML = "\n\t\t<h2>" + escape$1(loc.signIn) + "</h2>\n\t\t<p>" + escape$1(loc.signInAzure) + '</p>\n\t\t<button type="button" class="button is-primary is-radiusless" data-bi-name="azure-auth-login">\n\t\t\t' + loc.signIn + "\n\t\t</button>";
        var loginButton = container.lastElementChild;
        loginButton.onclick = function() {
            reportLogin();
            container.innerHTML = signingInHtml;
            login$1().then(function() {
                if (tokens.value !== null) {
                    reportAuthorized();
                }
                processTokens(tokens.value);
            });
        };
    }
    var tryLoadTokens = function() {
        var url = "https://token.docs.microsoft.com/accesstokens";
        var requestInit = {
            method: "POST",
            mode: "cors",
            credentials: "include"
        };
        return fetch(url, requestInit).then(function(response) {
            if (response.ok) {
                return response.json().then(function(x) {
                    tokens.value = x;
                    return true;
                });
            }
            tokens.value = null;
            return false;
        }, function() {
            return false;
        });
    };
    function renderTokenSelector(container, resolve, tokens) {
        container.innerHTML = "\n\t\t<h2>" + loc["cloudShell.chooseAccount"] + '</h2>\n\t\t<ul class="azure-auth-tokens"></ul>';
        var list = container.lastElementChild;
        var _loop_1 = function(token) {
            list.insertAdjacentHTML("beforeend", '\n\t\t\t<li>\n\t\t\t\t<button class="azure-auth-token" type="button" data-bi-name="azure-auth-token">\n\t\t\t\t\t<span>' + escape$1(token.display_name) + "</span>\n\t\t\t\t\t<span>" + escape$1(token.default_domain) + "</span>\n\t\t\t\t</button>\n\t\t\t</li>");
            var button = list.lastElementChild.firstElementChild;
            button.onclick = function(event) {
                return resolve(token);
            };
        };
        for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
            var token = tokens_1[_i];
            _loop_1(token);
        }
    }
    function reportLoginPrompt() {
        jsllReady.then(function(awa) {
            var _a;
            return awa.ct.captureContentPageAction({
                behavior: awa.behavior.STARTPROCESS,
                actionType: awa.actionType.CLICKLEFT,
                contentTags: (_a = {}, _a[contentTags.scenario] = "azure-cli-login", _a[contentTags.scenarioStep] = "login-prompt", 
                _a)
            });
        });
    }
    function reportLogin() {
        jsllReady.then(function(awa) {
            var _a;
            return awa.ct.captureContentPageAction({
                behavior: awa.behavior.PROCESSCHECKPOINT,
                actionType: awa.actionType.CLICKLEFT,
                contentTags: (_a = {}, _a[contentTags.scenario] = "azure-cli-login", _a[contentTags.scenarioStep] = "login", 
                _a)
            });
        });
    }
    function reportAuthorized() {
        jsllReady.then(function(awa) {
            var _a;
            return awa.ct.captureContentPageAction({
                behavior: awa.behavior.COMPLETEPROCESS,
                actionType: awa.actionType.OTHER,
                contentTags: (_a = {}, _a[contentTags.scenario] = "azure-cli-login", _a[contentTags.scenarioStep] = "authorized", 
                _a)
            });
        });
    }
    var cliPageOrigin = "https://ux.console.azure.com";
    var CloudShell = function() {
        function CloudShell(isPowerShell) {
            var _this = this;
            this.isPowerShell = isPowerShell;
            this.messageHandler = function(_a) {
                var _b = _a.data, signature = _b.signature, type = _b.type, audience = _b.audience, origin = _a.origin;
                if (origin !== cliPageOrigin || signature !== "portalConsole") {
                    return;
                }
                if (type === "getToken") {
                    if (audience !== "") {
                        return;
                    }
                    if (_this.token) {
                        _this.replyToken();
                        return;
                    }
                    return;
                }
            };
            window$1.addEventListener("message", this.messageHandler);
            this.element = document$1.createElement("div");
            this.element.classList.add("cloud-shell");
            this.element.setAttribute(contentAttrs.name, "azure-cli");
            this.element.cloudShell = this;
            renderAuthentication(this.element).then(function(token) {
                var lang = getCloudShellLanguage(msDocs.data.userLocale);
                _this.token = token;
                _this.element.innerHTML = '\n\t\t\t\t\t<div class="cloud-shell-header">\n\t\t\t\t\t\t<div class="has-addons">\n\t\t\t\t\t\t\t<button class="button is-white is-radiusless" data-bi-name="restart">\n\t\t\t\t\t\t\t\t<span class="docon docon-power" aria-role="presentation"></span>\n\t\t\t\t\t\t\t\t<span class="visually-hidden">' + escape(loc.restart) + '</span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t<a class="button is-white is-radiusless" data-bi-name="feedback" href="https://aka.ms/cloudshellfeedback">\n\t\t\t\t\t\t\t\t<span class="docon docon-feedback-positive-outline" aria-role="presentation"></span>\n\t\t\t\t\t\t\t\t<span class="visually-hidden">' + escape(loc.feedback) + '</span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<h2 class="cloud-shell-header-title">Azure Cloud Shell</h2>\n\t\t\t\t\t</div>\n\t\t\t\t\t<iframe\tclass="cloud-shell-frame is-' + (isPowerShell ? "powershell" : "bash") + '"\n\t\t\t\t\t\t\t\t\tsrc="' + cliPageOrigin + "?trustedAuthority=" + location$1.origin + "&embed=true&feature.azureconsole.ostype=" + (isPowerShell ? "windows" : "linux") + "&l=" + lang + '"\n\t\t\t\t\t\t\t\t\tframeborder="0">\n\t\t\t\t\t</iframe>';
                var restartButton = _this.element.querySelector('button[data-bi-name="restart"]');
                restartButton.onclick = function() {
                    return _this.restart();
                };
                _this.consoleFrame = _this.element.querySelector("iframe");
            });
        }
        CloudShell.prototype.restart = function() {
            if (this.consoleFrame.hidden) {
                return;
            }
            this.consoleFrame.contentWindow.postMessage({
                signature: "portalConsole",
                type: "restart"
            }, cliPageOrigin);
        };
        CloudShell.prototype.dispose = function() {
            this.element.cloudShell = null;
            window$1.azureCliAuthorized = null;
            window$1.removeEventListener("message", this.messageHandler);
        };
        CloudShell.prototype.replyToken = function() {
            var tokensByAudience = [ {
                audience: "",
                token: this.token.access_token
            }, {
                audience: "graph",
                token: this.token.graph_access_token
            }, {
                audience: "keyvault",
                token: this.token.key_vault_access_token
            } ];
            for (var _i = 0, tokensByAudience_1 = tokensByAudience; _i < tokensByAudience_1.length; _i++) {
                var _a = tokensByAudience_1[_i], audience = _a.audience, token = _a.token;
                this.consoleFrame.contentWindow.postMessage({
                    signature: "portalConsole",
                    type: "postToken",
                    audience: audience,
                    message: "Bearer " + token
                }, cliPageOrigin);
            }
        };
        return CloudShell;
    }();
    function showInActionPanel(isPowerShell) {
        var actionPanel = getActionPanel("animate");
        var existing = actionPanel.firstElementChild ? actionPanel.firstElementChild.cloudShell : undefined;
        if (existing) {
            if (existing.isPowerShell === isPowerShell) {
                return Promise.resolve();
            } else {
                existing.dispose();
                actionPanel.firstElementChild.remove();
            }
        }
        actionPanel.appendChild(new CloudShell(isPowerShell).element);
        return Promise.resolve();
    }
    var activateButtonConfig = {
        name: loc["try.it"],
        iconClass: "docon docon-terminal",
        attributes: [ {
            name: "aria-haspopup",
            value: "true"
        } ]
    };
    registerInteractiveType({
        name: "azurecli",
        activateButtonConfig: activateButtonConfig,
        activateCodeBlock: function() {
            return showInActionPanel(false);
        },
        getElement: function() {
            return new CloudShell(false).element;
        }
    });
    registerInteractiveType({
        name: "azurepowershell",
        activateButtonConfig: activateButtonConfig,
        activateCodeBlock: function() {
            return showInActionPanel(true);
        },
        getElement: function() {
            return new CloudShell(true).element;
        }
    });
    function getCloudShellLanguage(locale) {
        switch (locale) {
          case "zh-cn":
            return "zh-hans";

          case "zh-hk":
            return "zh-hans";

          case "zh-tw":
            return "zh-hant";
        }
        var cloudShellSupports = [ "en", "cs", "de", "es", "fr", "hu", "it", "ja", "ko", "nl", "pl", "pt-br", "pt-pt", "ru", "sv", "tr", "zh-hans", "zh-hant" ];
        var match = cloudShellSupports.find(function(lang) {
            return locale.indexOf(lang) === 0;
        });
        return match || "en";
    }
    var dotNetOnlineOrigin = "https://try.dot.net";
    var iconClass = "docon docon-play";
    registerInteractiveType({
        name: "csharp",
        activateButtonConfig: {
            name: loc.run,
            iconClass: iconClass,
            attributes: []
        },
        activateCodeBlock: function(codeBlock) {
            return activateCodeBlock(codeBlock);
        },
        getElement: function() {
            return new DotNetOnline("").element;
        }
    });
    function activateCodeBlock(codeBlock) {
        var code = codeBlock.textContent.trim();
        var actionPanel = getActionPanel("animate");
        var instance = actionPanel.firstElementChild ? actionPanel.firstElementChild.dotnetOnline : undefined;
        if (instance) {
            return instance.ready.then(function() {
                return instance.setCode(code);
            }).then(function() {
                return instance.run();
            });
        }
        instance = new DotNetOnline(code);
        actionPanel.appendChild(instance.element);
        return instance.ready.then(function() {
            return instance.run();
        });
    }
    var DotNetOnline = function() {
        function DotNetOnline(code) {
            var _this = this;
            this.title = loc.dotnetEditor;
            this.pendingMessages = {};
            this.messageHandler = function(_a) {
                var data = _a.data, origin = _a.origin, source = _a.source;
                if (origin !== dotNetOnlineOrigin || source !== _this.editor.contentWindow || !_this.pendingMessages[data.type]) {
                    return;
                }
                var pendingMessage = _this.pendingMessages[data.type];
                delete _this.pendingMessages[data.type];
                clearTimeout(pendingMessage.timeoutId);
                pendingMessage.resolve(data);
            };
            this.themeHandler = function(event) {
                _this.setTheme();
            };
            this.element = document$1.createElement("div");
            this.element.classList.add("dotnet-online");
            this.element.dotnetOnline = this;
            this.element.innerHTML = '\n\t\t\t<div class="dotnet-online-editor-section" hidden>\n\t\t\t\t<div class="dotnet-online-header">\n\t\t\t\t\t<h3>' + escape$1(this.title) + '</h3>\n\t\t\t\t\t<button class="button is-success is-radiusless" data-bi-name="tutorial-run-csharp">\n\t\t\t\t\t\t<span class="' + iconClass + '" aria-role="presentation"></span>\n\t\t\t\t\t\t<span>' + escape$1(loc.run) + '</span>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<iframe\tclass="dotnet-online-editor" src="' + dotNetOnlineOrigin + "/v2/editor?hostOrigin=" + encodeURIComponent(location.origin) + '&waitForConfiguration=true">\n\t\t\t\t</iframe>\n\t\t\t\t<div class="dotnet-online-header">\n\t\t\t\t\t<h3>' + escape$1(loc.output) + '</h3>\n\t\t\t\t\t<a class="button is-white is-radiusless" data-bi-name="feedback" href="https://github.com/dotnet/try">\n\t\t\t\t\t\t<span class="docon docon-feedback-positive-outline" aria-role="presentation"></span>\n\t\t\t\t\t\t<span class="visually-hidden">' + escape$1(loc.feedback) + '</span>\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t\t<pre class="dotnet-online-output"></pre>\n\t\t\t</div>\n\t\t\t<div class="dotnet-online-service-unavailable" hidden>' + escape$1(loc.serviceUnavailable) + '</div>\n\t\t\t<div class="dotnet-online-loader c-progress f-indeterminate-local f-progress-large" role="progressbar" tabindex="0" aria-valuetext="' + loc.loading + '" aria-label="' + loc.loading + '">\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t</div>';
            var _a = Array.from(this.element.children).map(function(x) {
                return x;
            }), editorSection = _a[0], serviceUnavailable = _a[1], loader = _a[2];
            this.runButton = editorSection.querySelector("button");
            this.runButton.onclick = function() {
                return _this.run();
            };
            this.editor = editorSection.querySelector("iframe");
            this.output = editorSection.querySelector("pre");
            window$1.addEventListener("message", this.messageHandler);
            window$1.addEventListener("theme-changed", this.themeHandler);
            this.ready = this.waitForMessage("HostListenerReady").then(function() {
                return Promise.all([ _this.setCode(code), _this.setTheme() ]);
            }).then(function() {
                return _this.showEditor();
            }).then(function() {
                loader.hidden = true;
                editorSection.hidden = false;
            }).catch(function(err) {
                loader.hidden = true;
                editorSection.hidden = true;
                serviceUnavailable.hidden = false;
                throw err;
            });
        }
        DotNetOnline.prototype.waitForMessage = function(type) {
            var _this = this;
            return new Promise(function(resolve, reject) {
                var timeoutId = setTimeout(function() {
                    delete _this.pendingMessages[type];
                    reject("timeout");
                }, 30 * 1e3);
                _this.pendingMessages[type] = {
                    resolve: resolve,
                    timeoutId: timeoutId
                };
            });
        };
        DotNetOnline.prototype.setTheme = function() {
            var isDark = document$1.documentElement.classList.contains("theme_night");
            var theme = isDark ? "vs-dark" : "vs-light";
            this.editor.contentWindow.postMessage({
                type: "configureMonacoEditor",
                editorOptions: {
                    theme: theme,
                    scrollBeyondLastLine: true,
                    minimap: {
                        enabled: false
                    }
                },
                theme: theme
            }, dotNetOnlineOrigin);
            return Promise.resolve();
        };
        DotNetOnline.prototype.setCode = function(code) {
            this.editor.contentWindow.postMessage({
                type: "setSourceCode",
                sourceCode: code
            }, dotNetOnlineOrigin);
            return this.waitForMessage("CodeModified");
        };
        DotNetOnline.prototype.showEditor = function() {
            this.editor.hidden = false;
            this.editor.contentWindow.postMessage({
                type: "showEditor"
            }, dotNetOnlineOrigin);
            return this.waitForMessage("MonacoEditorReady");
        };
        DotNetOnline.prototype.focus = function() {
            this.editor.contentWindow.postMessage({
                type: "focusEditor"
            }, dotNetOnlineOrigin);
            return Promise.resolve();
        };
        DotNetOnline.prototype.run = function() {
            var _this = this;
            if (this.runPromise) {
                return this.runPromise;
            }
            this.runButton.classList.add("is-loading");
            this.output.classList.remove("error");
            this.output.textContent = "";
            var interval = setInterval(function() {
                _this.output.textContent += ".";
                if (_this.output.textContent.length > 3) {
                    _this.output.textContent = "";
                }
            }, 200);
            this.editor.contentWindow.postMessage({
                type: "run"
            }, dotNetOnlineOrigin);
            this.runPromise = this.waitForMessage("RunCompleted").then(function(result) {
                _this.runPromise = null;
                clearInterval(interval);
                _this.runButton.classList.remove("is-loading");
                switch (result.outcome) {
                  case "CompilationError":
                    _this.output.classList.add("error");
                    _this.output.textContent = result.output.join("\n");
                    break;

                  case "Exception":
                    _this.output.classList.add("error");
                    _this.output.textContent = result.output.join("\n") + "\n" + result.exception;
                    break;

                  case "Success":
                    _this.output.classList.remove("error");
                    var output = result.output.join("\n");
                    if (output.length === 0) {
                        output = loc.noOutput;
                    }
                    _this.output.textContent = output;
                    break;

                  default:
                    throw new Error("Unexpected run result: " + _this.output);
                }
            });
            this.runPromise.catch(function(reason) {
                clearInterval(interval);
                _this.runPromise = null;
                _this.output.classList.add("error");
                _this.output.textContent = loc.serviceUnavailable;
                console.error(reason);
            });
            return this.runPromise;
        };
        DotNetOnline.prototype.dispose = function() {
            window$1.removeEventListener("message", this.messageHandler);
            window$1.removeEventListener("theme-changed", this.themeHandler);
        };
        return DotNetOnline;
    }();
    function scrollTo(y, duration, container) {
        if (container === void 0) {
            container = window;
        }
        var startingY = container instanceof Window ? window.pageYOffset : container.scrollTop;
        var diff = y - startingY;
        var start;
        function step(timestamp) {
            if (!start) {
                start = timestamp;
            }
            var elapsed = timestamp - start;
            var targetPercentComplete = Math.min(elapsed / duration, 1);
            if (container instanceof Window) {
                container.scrollTo(0, startingY + diff * targetPercentComplete);
            } else {
                container.scrollTop = startingY + diff * targetPercentComplete;
            }
            if (elapsed < duration) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    }
    function restRequest(tryitRequest, init) {
        init = init || {};
        init.mode = "cors";
        init.cache = "reload";
        init.method = tryitRequest.httpVerb;
        if (tryitRequest.body) {
            init.body = tryitRequest.body;
        }
        var url = tryitRequest.url;
        var request = new Request(url, init);
        if (token$1 !== null) {
            request.headers.set("Authorization", "Bearer " + token$1.access_token);
        }
        if (tryitRequest.headers !== null) {
            tryitRequest.headers.forEach(function(item) {
                if (item.value !== "") {
                    request.headers.set(item.name, item.value);
                }
            });
        }
        return request;
    }
    function restFetch(bus, request) {
        return fetch(request).then(function(response) {
            jsllReady.then(function(awa) {
                awa.ct.captureContentPageAction({
                    behavior: awa.behavior.OTHER,
                    actionType: awa.actionType.OTHER,
                    content: {
                        event: "rest-tryit-fetch-complete",
                        status: response.status,
                        method: request.method
                    }
                });
            });
            return response;
        });
    }
    function createRestTryitResponse(response) {
        var tryitResponse = {};
        tryitResponse.statusCode = response.status.toString();
        var headers = response.headers;
        tryitResponse.header = "";
        headers.forEach(function(value, key) {
            tryitResponse.header += key + ": " + value + "\n";
        });
        if (/application\/json/i.test(response.headers.get("Content-Type"))) {
            return response.json().then(function(data) {
                tryitResponse.body = JSON.stringify(data, null, 2);
                return tryitResponse;
            });
        } else {
            return response.text().then(function(text) {
                tryitResponse.body = text;
                return tryitResponse;
            });
        }
    }
    var subscriptionUrl = "https://management.azure.com/subscriptions?api-version=2016-06-01";
    var RestParamValueChanged = function() {
        function RestParamValueChanged() {}
        return RestParamValueChanged;
    }();
    var RestAddParamEvent = function() {
        function RestAddParamEvent(param) {
            this.param = param;
        }
        return RestAddParamEvent;
    }();
    var RestSubscriptionIdLoading = function() {
        function RestSubscriptionIdLoading() {}
        return RestSubscriptionIdLoading;
    }();
    var RestSubscriptionIdLoaded = function() {
        function RestSubscriptionIdLoaded(subscriptions) {
            this.subscriptions = subscriptions;
        }
        return RestSubscriptionIdLoaded;
    }();
    function renderParam(container, bus, param, isHeaders, urlParams) {
        if (isHeaders === void 0) {
            isHeaders = true;
        }
        if (urlParams === void 0) {
            urlParams = {};
        }
        var li = document.createElement("li");
        li.classList.add("param-group");
        li.classList.add("small");
        var nameGroup = document.createElement("div");
        nameGroup.classList.add("param-name-group");
        var label = document.createElement("label");
        label.classList.add("param-name");
        label.classList.add("param-name-label");
        label.setAttribute("aria-label", "parameter name " + param.name);
        label.textContent = param.name;
        nameGroup.appendChild(label);
        li.appendChild(nameGroup);
        var valueGroup = document.createElement("div");
        valueGroup.classList.add("param-value-group");
        var valueInput = document.createElement("input");
        valueInput.classList.add("param-value");
        var selectList = [];
        var valueSelect = document.createElement("select");
        if (param.type === "boolean") {
            selectList.push("True");
            selectList.push("False");
        }
        switch (param.type) {
          case "boolean":
          case "azure-subscriptions":
          case "enum":
            if (selectList.length >= 1) {
                var defaultOption = document.createElement("option");
                defaultOption.value = "";
                defaultOption.selected = true;
                defaultOption.disabled = true;
                defaultOption.hidden = true;
                defaultOption.text = "Select";
                valueSelect.appendChild(defaultOption);
            }
            selectList.forEach(function(item) {
                var option = document.createElement("option");
                option.value = item;
                option.text = item;
                valueSelect.appendChild(option);
            });
            valueSelect.classList.add("param-select-value");
            if (param.isRequired) {
                valueSelect.setAttribute("required", "true");
            }
            valueSelect.setAttribute("aria-label", "select parameter value option for " + param.name);
            valueSelect.onchange = function() {
                bus.publish(new RestParamValueChanged());
                if (valueSelect.textContent !== valueSelect.value) {
                    subscriptionId.textContent = valueSelect.value;
                }
            };
            if (param.name === "subscriptionId") {
                valueSelect.disabled = true;
                valueSelect.innerHTML = '<option value="">Login to load...</option>';
            }
            valueGroup.appendChild(valueSelect);
            break;

          case "array":
            break;

          case "object":
            break;

          default:
            valueInput.setAttribute("value", param.value);
            if (param.isRequired) {
                valueInput.setAttribute("required", "true");
            }
            valueInput.setAttribute("aria-label", "enter parameter value for " + param.name);
            valueInput.onblur = function() {
                bus.publish(new RestParamValueChanged());
            };
            valueGroup.appendChild(valueInput);
            break;
        }
        if (param.isRequired) {
            label.insertAdjacentHTML("beforeend", '<span class="required-asterisk" aria-hidden="true">*</span>');
        }
        li.appendChild(valueGroup);
        var delButton = document.createElement("button");
        delButton.classList.add("param-button");
        delButton.classList.add("docon");
        delButton.classList.add("docon-math-multiply");
        if (param.isRequired) {
            delButton.style.visibility = "hidden";
        }
        delButton.setAttribute("aria-label", loc.deleteParameter);
        delButton.setAttribute("type", "button");
        li.appendChild(delButton);
        delButton.onclick = function(event) {
            li.parentElement.removeChild(li);
            bus.unsubscribe(RestRetrieveRequestData, handleRetrieveData);
            bus.publish(new RestParamValueChanged());
            event.preventDefault();
        };
        var subscriptionId = document.createElement("div");
        subscriptionId.classList.add("subscription-id");
        subscriptionId.textContent = "";
        var handleRetrieveData = function(event) {
            var requestData = event.restTryItRequest;
            var value = param.type === "boolean" || param.type === "azure-subscriptions" || param.type === "enum" ? valueSelect.value : valueInput.value;
            if (isHeaders) {
                requestData.headers.push({
                    name: param.name,
                    value: value,
                    type: param.type,
                    in: param.in,
                    isRequired: param.isRequired
                });
            } else {
                requestData.params.push({
                    name: param.name,
                    value: value,
                    type: param.type,
                    in: param.in,
                    isRequired: param.isRequired
                });
            }
        };
        container.appendChild(li);
        bus.subscribe(RestRetrieveRequestData, handleRetrieveData);
        if (!isHeaders) {
            if (param.name === "subscriptionId") {
                bus.subscribe(RestSubscriptionIdLoading, function() {
                    valueSelect.innerHTML = '<option value=""></option>';
                    valueSelect.disabled = false;
                });
                bus.subscribe(RestSubscriptionIdLoaded, function(event) {
                    var subscriptions = event.subscriptions;
                    if (subscriptions.length === 0) {
                        valueSelect.innerHTML = '<option value="">Error</option>';
                        valueSelect.value = null;
                    } else {
                        valueSelect.innerHTML = subscriptions.map(function(_a) {
                            var displayName = _a.displayName, subscriptionId = _a.subscriptionId;
                            return '<option value="' + subscriptionId + '">' + displayName + "</option>";
                        }).join("\n");
                        valueSelect.value = subscriptions[0].subscriptionId;
                        valueSelect.hidden = false;
                        valueSelect.disabled = false;
                    }
                    subscriptionId.textContent = subscriptions[0].subscriptionId;
                    bus.publish(new RestParamValueChanged());
                });
            }
        }
        if (param.type === "string" && param.in === "query" && urlParams[param.name] !== undefined && urlParams[param.name].indexOf(param.name) === -1) {
            valueInput.value = urlParams[param.name];
            bus.publish(new RestParamValueChanged());
        }
        if (param.name === "subscriptionId") {
            loadSubscriptions(bus);
        }
        return {
            label: label,
            valueInput: valueInput,
            delButton: delButton,
            li: li
        };
    }
    function renderEmptyParam(container, bus, isHeaders) {
        if (isHeaders === void 0) {
            isHeaders = true;
        }
        var li = document.createElement("li");
        li.classList.add("param-group");
        li.classList.add("small");
        var nameGroup = document.createElement("div");
        nameGroup.classList.add("param-name-group");
        var nameInput = document.createElement("input");
        nameInput.classList.add("param-name");
        nameInput.setAttribute("placeholder", "name");
        nameInput.setAttribute("aria-label", "add new parameter name");
        nameGroup.appendChild(nameInput);
        var errorLabel = document.createElement("div");
        errorLabel.classList.add("error-message");
        nameGroup.appendChild(errorLabel);
        li.appendChild(nameGroup);
        nameInput.onblur = function() {
            if (nameInput.value !== "" && errorLabel.textContent !== "") {
                container.removeChild(errorLabel);
            }
        };
        var valueGroup = document.createElement("div");
        valueGroup.classList.add("param-value-group");
        var valueInput = document.createElement("input");
        valueInput.classList.add("param-value");
        valueInput.setAttribute("placeholder", "value");
        valueInput.setAttribute("aria-label", "add new parameter value");
        valueGroup.appendChild(valueInput);
        li.appendChild(valueGroup);
        var addButton = document.createElement("button");
        addButton.classList.add("param-button");
        addButton.classList.add("param-plus");
        addButton.classList.add("docon");
        addButton.classList.add("docon-math-plus");
        addButton.setAttribute("aria-label", loc.addParameter);
        addButton.setAttribute("type", "button");
        li.appendChild(addButton);
        container.appendChild(li);
        var addEmptyParam = function(event) {
            var name = nameInput.value;
            var value = valueInput.value;
            if (name === "") {
                errorLabel.textContent = loc.emptyNameNotAllowed;
                nameGroup.appendChild(errorLabel);
                event.preventDefault();
                return;
            }
            var inType = null;
            if (isHeaders) {
                inType = "header";
            } else {
                var inputUrl = document.querySelector(".url-input");
                if (inputUrl.value.indexOf("{" + name + "}") !== -1) {
                    inType = "path";
                } else {
                    inType = "query";
                }
            }
            li.parentElement.removeChild(li);
            bus.publish(new RestAddParamEvent({
                name: name,
                value: value,
                type: "string",
                in: inType,
                isRequired: false
            }));
        };
        addButton.onclick = function(event) {
            addEmptyParam(event);
        };
        return {
            nameInput: nameInput,
            valueInput: valueInput,
            addButton: addButton,
            li: li
        };
    }
    var loadSubscriptions = function(bus) {
        bus.publish(new RestSubscriptionIdLoading());
        var request = new Request(subscriptionUrl, {
            mode: "cors"
        });
        if (token$1 === null) {
            bus.publish(new RestSubscriptionIdLoaded([]));
            throw new Error("error fetching subscription: autherization header no token");
        }
        request.headers.append("Authorization", "Bearer " + token$1.access_token);
        return fetch(request).then(function(response) {
            if (!response.ok) {
                response.text().then(function(text) {
                    throw new Error("error fetching subscriptions:\n\n" + text);
                });
                bus.publish(new RestSubscriptionIdLoaded([]));
                return false;
            }
            return response.json().then(function(_a) {
                var subscriptions = _a.value;
                bus.publish(new RestSubscriptionIdLoaded(subscriptions));
                return true;
            });
        }, function() {
            return false;
        });
    };
    function renderHttpRequest(container, bus, request) {
        var blockDiv = document.createElement("div");
        var heading = document.createElement("h3");
        heading.textContent = loc.requestPreview;
        blockDiv.appendChild(heading);
        var codeHeader = document.createElement("div");
        codeHeader.classList.add("codeHeader");
        var codeHeading = document.createElement("span");
        codeHeading.classList.add("language");
        codeHeading.textContent = "HTTP";
        codeHeader.appendChild(codeHeading);
        var copyButton = document.createElement("button");
        copyButton.classList.add("action");
        copyButton.classList.add("copy");
        var copySpan = document.createElement("span");
        copyButton.type = "button";
        copySpan.textContent = loc.copy;
        copyButton.appendChild(copySpan);
        codeHeader.appendChild(copyButton);
        copyButton.onclick = function(event) {
            copyCodeBlockToClipboard(codeBlock, "json");
            event.preventDefault();
        };
        var codeBlock = document.createElement("pre");
        codeBlock.setAttribute("name", "http-request");
        codeBlock.textContent = buildHttpRequestString(request);
        codeBlock.classList.add("small");
        blockDiv.appendChild(codeHeader);
        blockDiv.appendChild(codeBlock);
        container.appendChild(blockDiv);
        syntaxHighlight([ {
            code: codeBlock.textContent,
            language: "http",
            highlightLines: ""
        } ]).then(function(results) {
            codeBlock.innerHTML = results[0].html;
        });
        var handleParamValueChanged = function(event) {
            var requestData = {
                url: null,
                httpVerb: null,
                headers: [],
                params: [],
                body: null
            };
            bus.publish(new RestRetrieveRequestData(requestData));
            codeBlock.textContent = buildHttpRequestString(requestData);
            syntaxHighlight([ {
                code: codeBlock.textContent,
                language: "http",
                highlightLines: ""
            } ]).then(function(results) {
                codeBlock.innerHTML = results[0].html;
            });
        };
        bus.subscribe(RestParamValueChanged, handleParamValueChanged);
    }
    function buildHttpRequestString(request) {
        var httpRequest = restRequest(request);
        var httpRequestString = httpRequest.method + " " + httpRequest.url + "\n";
        var headers = httpRequest.headers;
        headers.forEach(function(value, key) {
            httpRequestString += "" + key[0].toUpperCase() + key.substring(1) + ": " + value + "\n";
        });
        return httpRequestString;
    }
    function renderParamList(container, bus, params, isHeaders, urlParams) {
        if (isHeaders === void 0) {
            isHeaders = true;
        }
        if (urlParams === void 0) {
            urlParams = {};
        }
        var blockDiv = document.createElement("div");
        var outerDiv = document.createElement("div");
        outerDiv.classList.add("param-group");
        outerDiv.classList.add("heading-group");
        var innerDiv = document.createElement("div");
        innerDiv.classList.add("param-name-group");
        var heading = document.createElement("h3");
        if (isHeaders) {
            heading.textContent = loc.headers;
        } else {
            heading.textContent = loc.parameters;
        }
        innerDiv.appendChild(heading);
        outerDiv.appendChild(innerDiv);
        blockDiv.appendChild(outerDiv);
        var ul = document.createElement("ul");
        for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
            var param = params_1[_i];
            renderParam(ul, bus, param, isHeaders, urlParams);
        }
        renderEmptyParam(ul, bus, isHeaders);
        blockDiv.appendChild(ul);
        container.appendChild(blockDiv);
        var handleAddParam = function(event) {
            if (event.param.in === "header" && isHeaders || event.param.in !== "header" && !isHeaders) {
                renderParam(ul, bus, event.param, isHeaders);
                renderEmptyParam(ul, bus, isHeaders);
                bus.publish(new RestParamValueChanged());
            }
        };
        bus.subscribe(RestAddParamEvent, handleAddParam);
        return ul;
    }
    var url$1 = "";
    var RestRetrieveRequestData = function() {
        function RestRetrieveRequestData(restTryItRequest) {
            this.restTryItRequest = restTryItRequest;
        }
        return RestRetrieveRequestData;
    }();
    var RestRunEvent = function() {
        function RestRunEvent(restTryItRequest) {
            this.restTryItRequest = restTryItRequest;
        }
        return RestRunEvent;
    }();
    function renderRequest(container, bus, request) {
        var _a = parseRequestUrl(request.url), url = _a.url, urlParams = _a.urlParams;
        var blockDiv = document.createElement("div");
        blockDiv.classList.add("request-section");
        renderRequestUrl(blockDiv, bus, url, request.httpVerb);
        renderParamList(blockDiv, bus, request.params, false, urlParams);
        renderParamList(blockDiv, bus, request.headers, true);
        if (request.body !== null) {
            renderBody(blockDiv, bus, request.body);
        }
        renderHttpRequest(blockDiv, bus, request);
        var runButton = renderRunButton(blockDiv, bus);
        container.appendChild(blockDiv);
        return runButton;
    }
    function parseRequestUrl(path) {
        url$1 = path;
        var urlParams = {};
        var index = path.indexOf("?");
        if (index !== -1) {
            var queryString = path.substr(index);
            url$1 = path.substr(0, index);
            urlParams = parseQueryString(queryString);
        }
        return {
            url: url$1,
            urlParams: urlParams
        };
    }
    function renderRequestUrl(container, bus, url, httpVerb) {
        var blockDiv = document.createElement("div");
        var heading = document.createElement("h3");
        heading.textContent = loc.requestUrl;
        blockDiv.appendChild(heading);
        var urlDiv = document.createElement("div");
        urlDiv.classList.add("url-group");
        var httpVerbDiv = document.createElement("div");
        httpVerbDiv.classList.add("http-verb");
        var verbInfo = document.createElement("span");
        verbInfo.textContent = httpVerb;
        httpVerbDiv.appendChild(verbInfo);
        var inputUrl = document.createElement("input");
        inputUrl.setAttribute("name", "url");
        inputUrl.readOnly = true;
        inputUrl.classList.add("url-input");
        inputUrl.classList.add("is-short");
        inputUrl.setAttribute("aria-label", loc.requestUrl);
        inputUrl.setAttribute("value", url);
        urlDiv.appendChild(httpVerbDiv);
        urlDiv.appendChild(inputUrl);
        blockDiv.appendChild(urlDiv);
        container.appendChild(blockDiv);
        bus.subscribe(RestRetrieveRequestData, function(event) {
            var requestData = event.restTryItRequest;
            requestData.url = url;
            requestData.httpVerb = verbInfo.textContent;
        });
        var handleParamValueChanged = function(event) {
            var requestData = {
                url: null,
                httpVerb: null,
                headers: [],
                params: [],
                body: null
            };
            bus.publish(new RestRetrieveRequestData(requestData));
            url = inputUrl.value;
            requestData.params.forEach(function(param) {
                url = updateUrlParam(url, param);
            });
        };
        bus.subscribe(RestParamValueChanged, handleParamValueChanged);
        return {
            inputUrl: inputUrl
        };
    }
    function updateUrlParam(url, param) {
        if (param.in === "path" && param.value !== "") {
            url = url.replace("{" + param.name + "}", encodeURIComponent(param.value));
        } else if (param.in === "query" && param.value !== "") {
            if (url.indexOf("?") === -1) {
                url = url + "?" + encodeURIComponent(param.name) + "=" + encodeURIComponent(param.value);
            } else {
                url = url + "&" + encodeURIComponent(param.name) + "=" + encodeURIComponent(param.value);
            }
        }
        return url;
    }
    function renderBody(container, bus, body) {
        var blockDiv = document.createElement("div");
        var heading = document.createElement("h3");
        heading.textContent = loc.body;
        blockDiv.appendChild(heading);
        var bodyText = document.createElement("textarea");
        bodyText.setAttribute("name", loc.body);
        bodyText.textContent = body;
        bodyText.classList.add("textarea");
        bodyText.classList.add("request-body");
        bodyText.classList.add("tall");
        bodyText.classList.add("small");
        bodyText.setAttribute("aria-label", loc.body);
        blockDiv.appendChild(bodyText);
        container.appendChild(blockDiv);
        bus.subscribe(RestRetrieveRequestData, function(event) {
            var requestData = event.restTryItRequest;
            requestData.body = bodyText.value;
        });
        return {
            bodyText: bodyText
        };
    }
    function renderRunButton(container, bus) {
        var runButton = document.createElement("button");
        runButton.setAttribute("type", "submit");
        runButton.classList.add("button");
        runButton.classList.add("is-success");
        runButton.classList.add("is-large");
        runButton.classList.add("is-radiusless");
        runButton.setAttribute("data-bi-name", "rest-tryit-run");
        var runSpan = document.createElement("span");
        runSpan.classList.add("run-text");
        runSpan.textContent = loc.run;
        runButton.appendChild(runSpan);
        var runIconSpan = document.createElement("span");
        runIconSpan.classList.add("docon");
        runIconSpan.classList.add("docon-play");
        runIconSpan.setAttribute("aria-hidden", "true");
        runButton.appendChild(runIconSpan);
        container.insertAdjacentHTML("beforeend", '<div class="request-section"></div>');
        container.lastElementChild.appendChild(runButton);
        bus.subscribe(RestRunEventDone, function() {
            runButton.classList.remove("is-loading");
        });
        return runButton;
    }
    var displayContainer;
    function initResponse(container, bus) {
        displayContainer = container;
        var handleRenderResponse = function(event) {
            renderResponse(displayContainer, event.response);
        };
        bus.subscribe(RestRenderResponse, handleRenderResponse);
    }
    function renderResponse(container, response) {
        var responseContainer = container.querySelector(".response-section");
        if (responseContainer) {
            container.removeChild(responseContainer);
        }
        var blockDiv = document.createElement("div");
        blockDiv.classList.add("response-section");
        renderResponseCode(blockDiv, response.statusCode);
        renderResponseComponent(blockDiv, response.header, true);
        if (response.body !== null) {
            renderResponseComponent(blockDiv, response.body);
        }
        container.appendChild(blockDiv);
    }
    function renderResponseCode(container, code) {
        var heading = document.createElement("h2");
        heading.textContent = loc["response.code"] + ": ";
        var codeLabel = document.createElement("span");
        codeLabel.classList.add("status-code");
        if (code.charAt(0) === "2") {
            codeLabel.classList.add("status-success");
        } else if (code.charAt(0) === "3") {
            codeLabel.classList.add("status-warning");
        } else {
            codeLabel.classList.add("status-fail");
        }
        codeLabel.textContent = code;
        heading.appendChild(codeLabel);
        container.appendChild(heading);
    }
    function renderResponseComponent(container, code, isHeader) {
        if (isHeader === void 0) {
            isHeader = false;
        }
        var blockDiv = document.createElement("div");
        var heading = document.createElement("h3");
        if (isHeader) {
            heading.textContent = loc.headers;
        } else {
            heading.textContent = loc.body;
        }
        blockDiv.appendChild(heading);
        var codeHeader = document.createElement("div");
        codeHeader.classList.add("codeHeader");
        var codeHeading = document.createElement("span");
        codeHeading.classList.add("language");
        if (isHeader) {
            codeHeading.textContent = "HTTP";
        } else {
            codeHeading.textContent = "JSON";
        }
        codeHeader.appendChild(codeHeading);
        var copyButton = document.createElement("button");
        copyButton.classList.add("action");
        copyButton.classList.add("copy");
        var copySpan = document.createElement("span");
        copySpan.textContent = loc.copy;
        copyButton.appendChild(copySpan);
        codeHeader.appendChild(copyButton);
        blockDiv.appendChild(codeHeader);
        copyButton.onclick = function(event) {
            copyCodeBlockToClipboard(codeBlock, "json");
            event.preventDefault();
        };
        var codeBlock = document.createElement("pre");
        if (isHeader) {
            codeBlock.classList.add("response-header");
        } else {
            codeBlock.classList.add("response-body");
        }
        codeBlock.classList.add("small");
        codeBlock.textContent = code;
        blockDiv.appendChild(codeBlock);
        container.appendChild(blockDiv);
        syntaxHighlight([ {
            code: codeBlock.textContent,
            language: isHeader ? "http" : "json",
            highlightLines: ""
        } ]).then(function(results) {
            codeBlock.innerHTML = results[0].html;
        });
    }
    var RestRunEventDone = function() {
        function RestRunEventDone() {}
        return RestRunEventDone;
    }();
    var RestRenderResponse = function() {
        function RestRenderResponse(response) {
            this.response = response;
        }
        return RestRenderResponse;
    }();
    var token$1 = null;
    var restTryItRequest = null;
    var actionPanel = null;
    function initRestTryIt() {
        restTryItRequest = buildRestTryItRequest(msDocs.data.restAPIData);
        actionPanel = getActionPanel("animate");
        if (actionPanel.firstElementChild && actionPanel.firstElementChild.matches(".rest-tryit-form,.azure-auth-page")) {
            return;
        }
        actionPanel.innerHTML = "";
        renderAuthentication(actionPanel).then(function(selectedToken) {
            token$1 = selectedToken;
            var container = document$1.createElement("form");
            container.classList.add("rest-tryit-form");
            var blockDiv = document$1.createElement("div");
            blockDiv.classList.add("signin-section");
            renderLogoutButton(blockDiv);
            container.appendChild(blockDiv);
            actionPanel.insertAdjacentElement("afterbegin", container);
            var bus = new EventBus();
            renderRestTryIt(container, bus, restTryItRequest);
            initResponse(container, bus);
        });
    }
    function buildRestTryItRequest(restApiData) {
        var restTryItRequest = {
            url: restApiData.path,
            httpVerb: restApiData.httpVerb,
            headers: [],
            params: [],
            body: restApiData.requestBody
        };
        if (restApiData.httpVerb === "PUT" || restApiData.httpVerb === "POST" || restApiData.httpVerb === "PATCH") {
            restTryItRequest.headers.push({
                name: "Content-Type",
                value: "application/json",
                type: "string",
                in: "header",
                isRequired: true
            });
        }
        restApiData.requestHeader.forEach(function(header) {
            if (header.in === "header") {
                restTryItRequest.headers.push({
                    name: header.name,
                    value: "",
                    type: header.type,
                    in: header.in,
                    isRequired: header.isRequired
                });
            }
        });
        restApiData.uriParameters.forEach(function(uriParam) {
            if (uriParam.in === "path" || uriParam.in === "query") {
                restTryItRequest.params.push({
                    name: uriParam.name,
                    value: "",
                    type: uriParam.type,
                    in: uriParam.in,
                    isRequired: uriParam.isRequired
                });
            }
        });
        return restTryItRequest;
    }
    function renderLogoutButton(container) {
        container.innerHTML = "";
        var heading = document$1.createElement("h2");
        heading.textContent = "REST API " + loc["try.it"];
        container.appendChild(heading);
        var description = document$1.createElement("p");
        description.textContent = "" + loc.tryItDescription;
        container.appendChild(description);
        var logoutButton = document$1.createElement("button");
        logoutButton.setAttribute("type", "button");
        logoutButton.setAttribute("name", "signout");
        logoutButton.classList.add("signout");
        logoutButton.classList.add("is-light");
        logoutButton.classList.add("button");
        logoutButton.classList.add("is-radiusless");
        logoutButton.classList.add("is-small");
        logoutButton.textContent = loc.signOut;
        container.appendChild(logoutButton);
        logoutButton.onclick = function() {
            actionPanel.innerHTML = "";
            logout().then(function() {
                renderAuthentication(actionPanel).then(function(selectedToken) {
                    token$1 = selectedToken;
                    var container = document$1.createElement("form");
                    container.classList.add("rest-tryit-form");
                    var blockDiv = document$1.createElement("div");
                    blockDiv.classList.add("signin-section");
                    renderLogoutButton(blockDiv);
                    container.appendChild(blockDiv);
                    actionPanel.appendChild(container);
                    var bus = new EventBus();
                    renderRestTryIt(container, bus, restTryItRequest);
                    initResponse(container, bus);
                });
            });
        };
    }
    function renderRestTryIt(container, bus, request) {
        var runButton = renderRequest(container, bus, request);
        configureValidation(container);
        container.onsubmit = function(event) {
            submitTryitForm(runButton, bus);
            event.preventDefault();
        };
        var handleRunRequest = function(event) {
            var restReq = event.restTryItRequest;
            var httpRequest = restRequest(restReq);
            restFetch(bus, httpRequest).then(function(resp) {
                createRestTryitResponse(resp).then(function(tryitResponse) {
                    bus.publish(new RestRenderResponse(tryitResponse));
                    bus.publish(new RestRunEventDone());
                }).then(function() {
                    var form = document$1.querySelector(".rest-tryit-form");
                    var scrollTop = form.scrollTop;
                    var height = document$1.querySelector(".request-section").getBoundingClientRect().height;
                    if (scrollTop >= height) {
                        return;
                    }
                    scrollTo(height, 500, form);
                });
            }).catch(function(error) {
                bus.publish(new RestRunEventDone());
                throw error;
            });
        };
        bus.subscribe(RestRunEvent, handleRunRequest);
    }
    function submitTryitForm(runButton, bus) {
        runButton.classList.add("is-loading");
        var requestData = {
            url: null,
            httpVerb: null,
            headers: [],
            params: [],
            body: null
        };
        bus.publish(new RestRetrieveRequestData(requestData));
        bus.publish(new RestRunEvent(requestData));
    }
    var activateButtonConfig$1 = {
        name: loc["try.it"],
        iconClass: "docon docon-play",
        attributes: []
    };
    registerInteractiveType({
        name: "http",
        activateButtonConfig: activateButtonConfig$1,
        activateCodeBlock: function(codeBlock) {
            return activateCodeBlock$1(codeBlock);
        },
        getElement: function() {
            return null;
        }
    });
    function activateCodeBlock$1(codeBlock) {
        initRestTryIt();
        return Promise.resolve();
    }
    registerInteractiveType({
        name: "cloudshell",
        getElement: function() {
            return new CloudShell(false).element;
        }
    });
    registerInteractiveType({
        name: "cloudshellEditor",
        getElement: function() {
            return new CloudShell(false).element;
        }
    });
    registerInteractiveType({
        name: "dotnet",
        getElement: function() {
            return new DotNetOnline("").element;
        }
    });
    registerInteractiveType({
        name: "powershell",
        getElement: function() {
            return new CloudShell(true).element;
        }
    });
    function pluginAddState() {
        $$1.fn.removeState = function(namespace) {
            $$1(this).each(function() {
                var $this = $$1(this);
                if ($this.attr("class") && $this.attr("class").indexOf(namespace) >= 0) {
                    var otherClasses = $$1.grep($this.attr("class").split(" "), function(aClass) {
                        return aClass.lastIndexOf(namespace, 0) !== 0;
                    });
                    $this.attr("class", otherClasses.join(" "));
                }
            });
            return this;
        };
        $$1.fn.addState = function(namespace, state) {
            this.removeState(namespace);
            this.addClass(namespace + state);
            return this;
        };
        $$1.fn.toggleState = function(namespace, state, switchVal) {
            var $this = $$1(this);
            if (typeof switchVal === "boolean") {
                if (switchVal) {
                    $this.addState(namespace, state);
                } else {
                    $this.removeClass(namespace + state);
                }
                return this;
            }
            if ($this.hasClass(namespace + state)) {
                $this.removeClass(namespace + state);
            } else {
                $this.addState(namespace, state);
            }
            return this;
        };
    }
    function pluginDomReadyShield() {
        $$1.fn.oldReady = $$1.fn.ready;
        $$1.fn.ready = function(fn) {
            return $$1.fn.oldReady(function() {
                try {
                    if (fn) {
                        fn.apply($$1, arguments);
                    }
                } catch (e) {
                    console.error(e);
                }
            });
        };
    }
    function pluginIfThen() {
        $$1.fn.extend({
            ifThen: function() {
                var args = arguments;
                if (args.length < 2) {
                    return this;
                }
                for (var i = 0; i < args.length; i = i + 2) {
                    if (args[i] && jQuery.isFunction(args[i + 1])) {
                        args[i + 1].call(this);
                        return this;
                    }
                }
                if (args.length % 2 && typeof args[args.length - 1] === "function") {
                    args[args.length - 1].call(this);
                }
                return this;
            }
        });
    }
    function pluginLALD() {
        var domReady = false;
        var $document = $$1(document$1);
        var handleAttachment = function(selector, event, arg1, arg2, namespace) {
            var namespacedEvent = event + "." + namespace;
            var data = arg2 ? arg1 : null;
            var handler = arg2 ? arg2 : arg1;
            if (!domReady) {
                if (data) {
                    $document.on(namespacedEvent, selector, data, handler);
                } else {
                    $document.on(namespacedEvent, selector, handler);
                }
            }
            $$1(function() {
                domReady = true;
                $document.off(namespacedEvent, selector, handler);
                if (namespace === "lald") {
                    if (data) {
                        $$1(selector).on(namespacedEvent, data, handler);
                    } else {
                        $$1(selector).on(namespacedEvent, handler);
                    }
                }
            });
        };
        $$1.lald = function(selector, event, arg1, arg2) {
            handleAttachment(selector, event, arg1, arg2, "lald");
        };
        $$1.lad = function(selector, event, arg1, arg2) {
            handleAttachment(selector, event, arg1, arg2, "lad");
        };
    }
    var DialogOpenEvent = "dialog-open-event";
    var DialogCloseEvent = "dialog-close-event";
    var tabbable = [ "a", "area", "button", "iframe", "input", "select", "textarea", "[contenteditable]", "[tabindex]" ];
    function constrainFocus(element) {
        return function(event) {
            if (event.target instanceof Element && !element.contains(event.target)) {
                event.preventDefault();
                var target = void 0;
                if (event.target.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING) {
                    target = element.querySelector(tabbable.join(",")) || element;
                } else {
                    target = Array.from(element.querySelectorAll(tabbable.join(","))).pop() || element;
                }
                target.focus();
            }
        };
    }
    var template = '\n\t<div class="dialog-content">\n\t</div>\n';
    var buttonTemplate = '\n\t<button type="button" class="dialog-close" aria-label="' + loc.dialogCloseWindow + '">\n\t\t<span class="docons docons-navigate-close"></span>\n\t</button>\n';
    var Dialog = function() {
        function Dialog(container) {
            var _this = this;
            this.stack = [];
            this.keyhandler = document$1.addEventListener("keydown", function(event) {
                if (event.which === keyCodes.escape && _this.stack.length) {
                    _this.stack.pop().hide();
                }
            }.bind(this));
            this.container = container || document$1.createElement("div");
            this.container.setAttribute("tabindex", "-1");
            this.container.setAttribute("role", "dialog");
            this.overlay = document$1.createElement("div");
            this.overlay.classList.add("modal-overlay");
            this.active = false;
        }
        Dialog.prototype.show = function(view, options) {
            var _this = this;
            if (this.active) {
                return;
            }
            this.container.classList.add("dialog");
            this.previousElement = document$1.activeElement;
            this.container.innerHTML = template;
            this.container.setAttribute("aria-label", options.label);
            this.container.querySelector(".dialog-content").appendChild(view);
            this.wrapper = document$1.createElement("div");
            this.wrapper.insertAdjacentElement("afterbegin", this.container);
            if (!options.customizeCloseButton) {
                var button = document$1.createElement("div");
                button.innerHTML = buttonTemplate;
                var closeButton = button.firstElementChild;
                closeButton.addEventListener("click", function(event) {
                    event.preventDefault();
                    _this.hide();
                });
                this.wrapper.insertAdjacentElement("afterbegin", closeButton);
            }
            if (options.modal) {
                if (!options.customizeCloseButton) {
                    this.overlay.addEventListener("click", this.hide.bind(this));
                }
                this.wrapper.insertAdjacentElement("afterbegin", this.overlay);
                document$1.documentElement.style.overflowY = "hidden";
                this.focusHandler = constrainFocus(this.wrapper);
                window$1.addEventListener("focus", this.focusHandler, true);
            }
            this.stack.push(this);
            this.active = !this.active;
            document$1.body.insertAdjacentElement("afterbegin", createTabSentinel(document$1));
            document$1.body.insertAdjacentElement("afterbegin", this.wrapper);
            document$1.body.insertAdjacentElement("afterbegin", createTabSentinel(document$1));
            this.container.focus();
            document$1.dispatchEvent(new CustomEvent(DialogOpenEvent));
        };
        Dialog.prototype.hide = function() {
            if (!this.active) {
                return;
            }
            this.stack.pop();
            this.wrapper.parentElement.removeChild(this.wrapper);
            Array.from(document$1.body.querySelectorAll(".tab-sentinel")).forEach(function(element) {
                document$1.body.removeChild(element);
            });
            document$1.documentElement.style.overflowY = "scroll";
            document$1.querySelector(".mainContainer").style.filter = null;
            window$1.removeEventListener("focus", this.focusHandler);
            this.previousElement.focus();
            this.active = !this.active;
            document$1.dispatchEvent(new CustomEvent(DialogCloseEvent));
        };
        return Dialog;
    }();
    function createTabSentinel(document) {
        var sentinel = document.createElement("span");
        sentinel.setAttribute("tabindex", "0");
        sentinel.classList.add("dialog-tab-sentinel");
        return sentinel;
    }
    var imageBrowserCloseEvent = "image-browser-close-event";
    function attachEvents(imageBrowser, imageElement) {
        var scalar = 5;
        var state = {
            horizontal: 0,
            vertical: 0
        };
        imageElement.addEventListener("keypress", function(event) {
            if (event.which === keyCodes.enter) {
                event.preventDefault();
                imageBrowser.toggleExpand();
            }
        });
        imageElement.addEventListener("keydown", function(event) {
            var code = event.which || event.keyCode;
            switch (code) {
              case keyCodes.left:
                event.preventDefault();
                state.horizontal = 1;
                break;

              case keyCodes.right:
                event.preventDefault();
                state.horizontal = -1;
                break;

              case keyCodes.up:
                event.preventDefault();
                state.vertical = 1;
                break;

              case keyCodes.down:
                event.preventDefault();
                state.vertical = -1;
                break;
            }
            if ([ keyCodes.left, keyCodes.right, keyCodes.up, keyCodes.down ].indexOf(code) > -1) {
                imageBrowser.panViewport(scalar * state.horizontal, scalar * state.vertical);
            }
        });
        imageElement.addEventListener("keyup", function(event) {
            var code = event.which || event.keyCode;
            switch (code) {
              case keyCodes.left:
                event.preventDefault();
                state.horizontal = 0;
                break;

              case keyCodes.right:
                event.preventDefault();
                state.horizontal = 0;
                break;

              case keyCodes.up:
                event.preventDefault();
                state.vertical = 0;
                break;

              case keyCodes.down:
                event.preventDefault();
                state.vertical = 0;
                break;
            }
        });
    }
    var mousemoveListener = null;
    var state = {};
    function attachEvents$1(imageBrowser, imageElement) {
        mousemoveListener = mousemoveListener || function(event) {
            if (imageBrowser.state.expanded) {
                if (event.buttons % 2) {
                    event.preventDefault();
                    state.dragging = true;
                    var movementX = event.movementX || !isNaN(state.prevX) ? event.screenX - state.prevX : 0;
                    var movementY = event.movementY || !isNaN(state.prevY) ? event.screenY - state.prevY : 0;
                    imageBrowser.panViewport(movementX, movementY);
                } else {
                    setTimeout(function() {
                        state.dragging = false;
                    }, 0);
                }
            } else {
                state.dragging = false;
            }
            state.prevX = event.screenX;
            state.prevY = event.screenY;
        };
        document$1.removeEventListener("mousemove", mousemoveListener);
        document$1.addEventListener("mousemove", mousemoveListener);
        imageElement.addEventListener("click", function(event) {
            if (!state.dragging) {
                event.preventDefault();
                imageBrowser.toggleExpand(event.offsetX * -1, event.offsetY * -1, true);
            }
        });
    }
    var template$1 = '\n\t<section class="image-browser">\n\t\t<figure>\n\t\t\t<div>\n\t\t\t\t<img tabindex="0" id="image-browser-image" src="" />\n\t\t\t</div>\n\t\t\t<figcaption id="image-browser-caption">\n\n\t\t\t</figcaption>\n\t\t</figure>\n\t</section>\n';
    function attachEvents$2(imageBrowser, imageElement) {
        var state = {
            touches: []
        };
        imageElement.addEventListener("touchstart", function(event) {
            if (imageBrowser.state.expanded) {
                event.preventDefault();
                Array.from(event.changedTouches).forEach(function(_a) {
                    var identifier = _a.identifier, screenX = _a.screenX, screenY = _a.screenY;
                    state.touches.push(Object.assign({}, {
                        identifier: identifier,
                        screenX: screenX,
                        screenY: screenY
                    }));
                });
            }
        });
        imageElement.addEventListener("touchmove", function(event) {
            if (imageBrowser.state.expanded) {
                event.preventDefault();
                var identifiers_1 = state.touches.map(function(x) {
                    return x.identifier;
                });
                var touch = Array.from(event.changedTouches).filter(function(x) {
                    return x.identifier === state.touches[0].identifier;
                });
                var deltaX = touch[0].screenX - state.touches[0].screenX;
                var deltaY = touch[0].screenY - state.touches[0].screenY;
                Array.from(event.changedTouches).forEach(function(touch) {
                    var index = identifiers_1.indexOf(touch.identifier);
                    if (index >= 0) {
                        state.touches[index] = Object.assign({}, {
                            identifier: touch.identifier,
                            screenX: touch.screenX,
                            screenY: touch.screenY
                        });
                    }
                });
                imageBrowser.panViewport(deltaX, deltaY);
            }
        });
        imageElement.addEventListener("touchend", function(event) {
            var identifiers = state.touches.map(function(x) {
                return x.identifier;
            });
            Array.from(event.changedTouches).forEach(function(_a) {
                var identifier = _a.identifier;
                state.touches.splice(identifiers.indexOf(identifier), 1);
            });
        });
    }
    var maxWidthInPixels = 1200;
    var ImageBrowser = function() {
        function ImageBrowser() {
            this.state = {
                expanded: false
            };
        }
        ImageBrowser.prototype.open = function(container, eventTarget, _a) {
            var _this = this;
            var url = _a.url, alt = _a.alt;
            var promise = new Promise(function(resolve, reject) {
                container.innerHTML = template$1;
                _this.imageContainer = container.querySelector("div");
                _this.imageContainer.dir = "ltr";
                _this.imageContainer.style.width = maxWidthInPixels + "px";
                _this.imageContainer.style.height = maxWidthInPixels * 16 / 9 + "px";
                _this.imageElement = container.querySelector("#image-browser-image");
                _this.imageElement.style.width = maxWidthInPixels + "px";
                _this.imageElement.style.height = maxWidthInPixels * 16 / 9 + "px";
                _this.imageElement.style.opacity = "0";
                _this.captionElement = container.querySelector("#image-browser-caption");
                _this.imageElement.style.transformOrigin = "0 0";
                _this.imageElement.addEventListener("error", function(event) {});
                _this.imageElement.addEventListener("load", function(event) {
                    _this.imageElement.classList.add("expandable");
                    _this.imageElement.style.width = null;
                    _this.imageElement.style.height = null;
                    var scale = Math.min(_this.imageContainer.clientWidth / _this.imageElement.naturalWidth, 1);
                    _this.imageElement.style.transform = "scale(" + scale + ")";
                    _this.imageContainer.classList.add("transition");
                    _this.imageContainer.addEventListener("transitionend", function(event) {
                        _this.imageContainer.classList.remove("transition");
                    });
                    _this.imageContainer.style.height = _this.imageElement.naturalHeight * scale + "px";
                    _this.imageContainer.style.width = Math.min(maxWidthInPixels, _this.imageElement.naturalWidth) + "px";
                    _this.imageElement.style.opacity = "1";
                    attachEvents(_this, _this.imageElement);
                    attachEvents$1(_this, _this.imageElement);
                    attachEvents$2(_this, _this.imageElement);
                    window$1.addEventListener("resize", function(event) {
                        if (!_this.state.expanded) {
                            _this.imageElement.style.transform = "scale(" + Math.min(_this.imageContainer.clientWidth / _this.imageElement.naturalWidth, 1) + ")";
                        } else {
                            _this.panViewport(0, 0);
                        }
                        _this.imageContainer.style.height = _this.imageElement.naturalHeight * Math.min(_this.imageContainer.clientWidth / _this.imageElement.naturalWidth, 1) + "px";
                    });
                    resolve();
                });
                _this.imageElement.src = url;
                _this.captionElement.textContent = alt;
            });
            return promise;
        };
        ImageBrowser.prototype.close = function() {
            window$1.dispatchEvent(new CustomEvent(imageBrowserCloseEvent));
        };
        ImageBrowser.prototype.toggleExpand = function(x, y, convertCoordinates) {
            if (convertCoordinates) {
                x = x + this.imageContainer.clientWidth / 2;
                y = y + this.imageElement.naturalHeight * Math.min(this.imageContainer.clientHeight / this.imageElement.naturalHeight, 1) / 2;
            }
            if (!this.state.expanded) {
                this.state.translationX = !isNaN(x) ? Math.min(0, Math.max(this.imageElement.naturalWidth * -1 + this.imageContainer.clientWidth, x)) : 0;
                this.state.translationY = !isNaN(y) ? Math.min(0, Math.max(this.imageElement.naturalHeight * -1 + this.imageContainer.clientHeight, y)) : 0;
            }
            this.imageElement.style.transform = this.state.expanded ? "scale(" + Math.min(this.imageContainer.clientWidth / this.imageElement.naturalWidth, 1) + ")" : "scale(1) translate(" + this.state.translationX + "px,  " + this.state.translationY + "px)";
            this.imageElement.classList.remove(this.state.expanded ? "pannable" : "expandable");
            this.imageElement.classList.add(this.state.expanded ? "expandable" : "pannable");
            this.state.expanded = !this.state.expanded;
        };
        ImageBrowser.prototype.panViewport = function(x, y) {
            if (this.state.expanded) {
                this.state.translationX = Math.min(0, Math.max(this.imageElement.naturalWidth * -1 + this.imageContainer.clientWidth, this.state.translationX + x));
                this.state.translationY = Math.min(0, Math.max(this.imageElement.naturalHeight * -1 + this.imageContainer.clientHeight, this.state.translationY + y));
                this.imageElement.style.transform = "translate(" + this.state.translationX + "px,  " + this.state.translationY + "px)";
            }
        };
        return ImageBrowser;
    }();
    function initInstrumentation$1() {
        jsllReady.then(instrument$1);
    }
    function instrument$1(awa) {
        window$1.addEventListener(imageBrowserCloseEvent, function(event) {
            var detail = event.detail;
            awa.ct.captureContentPageAction({
                behavior: awa.behavior.REDUCE,
                actionType: awa.actionType.CLICKLEFT,
                content: {
                    type: "lightbox-close",
                    image: detail.image
                }
            });
        });
    }
    function initializeLightBox(mainElement) {
        initInstrumentation$1();
        var className = "lightbox-enabled";
        var elements = Array.from(mainElement.querySelectorAll('a[href$="#lightbox"]'));
        var browser = new ImageBrowser();
        window$1.addEventListener(DialogCloseEvent, browser.close.bind(browser));
        elements.forEach(function(elem) {
            elem.classList.add(className);
            elem.setAttribute("data-bi-name", "lightbox");
            elem.addEventListener("click", function(event) {
                event.preventDefault();
                var element = document.createElement("div");
                browser.open(element, event.srcElement, {
                    url: elem.href,
                    alt: elem.querySelector("img").alt
                });
                new Dialog().show(element, {
                    modal: true
                });
            });
        });
    }
    function initLiveFyre() {
        if (msDocs.data.userLocale.indexOf("en-") === 0 && location.hostname.indexOf(".azure.cn") === -1 && location.hostname.indexOf("developer.microsoft.com") === -1) {
            cookieConsent.then(function() {
                return loadLibrary(relativeToGlobal("js/livefyre-commenting.js"));
            });
        }
    }
    var localeNames = {
        "id-id": "Bahasa Indonesia",
        "ms-my": "Bahasa Malaysia",
        "ca-es": "Català",
        "cs-cz": "Čeština",
        "da-dk": "Dansk",
        "de-de": "Deutsch",
        "de-at": "Deutsch (Österreich)",
        "de-ch": "Deutsch (Schweiz)",
        "et-ee": "Eesti",
        "en-au": "English (Australia)",
        "en-ca": "English (Canada)",
        "en-in": "English (India)",
        "en-ie": "English (Ireland)",
        "en-my": "English (Malaysia)",
        "en-nz": "English (New Zealand)",
        "en-sg": "English (Singapore)",
        "en-za": "English (South Africa)",
        "en-gb": "English (United Kingdom)",
        "en-us": "English (United States)",
        "es-es": "Español (España)",
        "es-mx": "Español (México)",
        "eu-es": "Euskara",
        "fr-fr": "Français",
        "fr-be": "Français (Belgique)",
        "fr-ca": "Français (Canada)",
        "fr-ch": "Français (Suisse)",
        "gl-es": "Galego",
        "hr-hr": "Hrvatski",
        "is-is": "Íslenska",
        "it-it": "Italiano",
        "it-ch": "italiano (Svizzera)",
        "lv-lv": "Latviešu",
        "lt-lt": "Lietuvių",
        "hu-hu": "Magyar",
        "nl-nl": "Nederlands",
        "nl-be": "Nederlands (België)",
        "nb-no": "Norsk",
        "pl-pl": "Polski",
        "pt-br": "Português (Brasil)",
        "pt-pt": "Português (Portugal)",
        "ro-ro": "Română",
        "sk-sk": "Slovenčina",
        "sl-si": "Slovenski",
        "fi-fi": "Suomi",
        "sv-se": "Svenska",
        "vi-vn": "Tiếng Việt",
        "tr-tr": "Türkçe",
        "el-gr": "Ελληνικά",
        "bg-bg": "Български",
        "kk-kz": "Қазақ",
        "ru-ru": "Русский",
        "sr-cyrl-rs": "Српски (Србија и Црна Гора)",
        "sr-latn-rs": "Srpski (Srbija i Crna Gora)",
        "uk-ua": "Українська",
        "he-il": "עברית‏",
        "ar-sa": "العربية",
        "hi-in": "हिंदी",
        "th-th": "ไทย",
        "ko-kr": "한국어",
        "zh-tw": "中文 (台灣)",
        "zh-cn": "中文 (中华人民共和国)",
        "zh-hk": "中文 (香港特別行政區)",
        "ja-jp": "日本語",
        "bs-latn-ba": "Bosanski",
        "bs-cyrl-ba": "Босански"
    };
    var pathLocaleRegex = /^\/([a-z]{2}-(?:[a-z]{4}-)?[a-z]{2})(\/|$)/i;
    var localeCookieName = "MarketplaceSelectedLocale";
    function checkLocaleSupported(locale) {
        return !!localeNames[locale];
    }
    function getLocaleFromPath(path) {
        var match = pathLocaleRegex.exec(path);
        return match === null ? "en-us" : match[1];
    }
    function removeLocaleFromPath(path) {
        return path.replace(pathLocaleRegex, "/");
    }
    function replaceLocaleInPath(path, locale) {
        return path.replace(pathLocaleRegex, "/" + locale + "$2");
    }
    function setDocumentLocale() {
        var userLocale = msDocs.data.userLocale;
        var contentLocale = msDocs.data.contentLocale;
        msDocs.data.userLocaleName = localeNames[userLocale];
        $$1(function() {
            if (contentLocale !== userLocale && /^en/.test(contentLocale) && !/^en/.test(userLocale) && (msDocs.data.pageTemplate === "ContentPage" || msDocs.data.pageTemplate === "Conceptual")) {
                showDisclaimer(loc["disclaimer.text"]);
            }
            setupLocaleLink(userLocale);
        });
    }
    function setLocaleCookie(locale) {
        cookies.set(localeCookieName, locale, {
            expires: 365 * 10
        });
    }
    function setupLocaleLink(userLocale) {
        var localeSelector = document.getElementById("locale-selector-link");
        if (!localeSelector) {
            return;
        }
        localeSelector.textContent = localeNames[userLocale];
        var path = "/" + userLocale + "/locale";
        localeSelector.href = path + "?target=" + encodeURIComponent(location.pathname + location.search + location.hash);
    }
    var platformConfig = {
        dotnet: {
            displayName: ".NET",
            validSearchTerm: /^[A-Za-z][A-Za-z0-9.<>,]{2,255}$/,
            namespaceItemType: "Namespace",
            namespacesPath: "namespaces",
            allApisLabel: loc.allapis,
            resultsHeadingTemplate: loc.apiReference,
            selectLabel: loc.selectVersion
        },
        java: {
            displayName: "Java",
            validSearchTerm: /^[A-Za-z][A-Za-z0-9.<>,]{2,255}$/,
            namespaceItemType: "Package",
            namespacesPath: "namespaces",
            allApisLabel: loc.allapis,
            resultsHeadingTemplate: loc.apiReference,
            selectLabel: loc.selectVersion
        },
        javascript: {
            displayName: "JavaScript",
            validSearchTerm: /^[A-Za-z][A-Za-z0-9.<>,\-]{2,255}$/,
            namespaceItemType: "Package",
            namespacesPath: "packages",
            allApisLabel: loc.allPackages,
            resultsHeadingTemplate: loc.packageReference,
            selectLabel: loc.selectPackage
        },
        powershell: {
            displayName: "PowerShell",
            validSearchTerm: /^[A-Za-z][A-Za-z0-9.-]{2,255}$/,
            namespaceItemType: "Module",
            namespacesPath: "modules",
            allApisLabel: loc.allPackages,
            resultsHeadingTemplate: loc.moduleReference,
            selectLabel: loc.selectPackage
        },
        python: {
            displayName: "Python",
            validSearchTerm: /^[A-Za-z][A-Za-z0-9.<>,]{2,255}$/,
            namespaceItemType: "Package",
            namespacesPath: "packages",
            allApisLabel: loc.allPackages,
            resultsHeadingTemplate: loc.packageReference,
            selectLabel: loc.selectPackage
        },
        rest: {
            displayName: "REST",
            validSearchTerm: /^[A-Za-z ]{3,255}$/,
            namespaceItemType: "",
            namespacesPath: "services",
            allApisLabel: loc.allapis,
            resultsHeadingTemplate: loc.apiReference,
            selectLabel: loc.selectVersion
        }
    };
    function findDhsApiBase() {
        var base = location.origin + "/_api/";
        var whitelist = {
            "https://docs.microsoft.com/_api/": true,
            "https://review.docs.microsoft.com/_api/": true,
            "https://ppe.docs.microsoft.com/_api/": true,
            "https://opsdocs.azurewebsites.net/_api/": true
        };
        if (whitelist[base]) {
            return base;
        } else {
            return "https://docs.microsoft.com/_api/";
        }
    }
    var restProductsPromise;
    function getRestProducts() {
        if (!restProductsPromise) {
            var url = getMeta("api") || "/en-us/rest/api/rest-products.json";
            restProductsPromise = fetchWithTimeout(url, {
                credentials: "include"
            }).then(function(response) {
                return response.json();
            });
        }
        return restProductsPromise;
    }
    var apiBase = "https://docs.microsoft.com/api/";
    var dhsApiBase = findDhsApiBase();
    function fetchPlatform(platformId) {
        return platformId === "rest" ? getRestProducts().then(function(data) {
            return mapSiteSearchToPlatform(data, platformId);
        }).catch(function() {
            return {
                platformId: platformId,
                displayName: platformId,
                families: []
            };
        }) : fetchWithTimeout(dhsApiBase + "familyTrees/byPlatform/" + encodeURIComponent(platformId)).then(function(response) {
            return response.json();
        }).then(function(dhsFamlies) {
            return mapDhsPlatformToPlatform(dhsFamlies, platformId);
        }).catch(function() {
            return {
                platformId: platformId,
                displayName: platformId,
                families: []
            };
        });
    }
    function search(platform, moniker, term, locale) {
        if (locale === void 0) {
            locale = "en-us";
        }
        if (platform === "rest") {
            return siteSearch(locale, "", moniker, term + "*", 0, 25);
        }
        var url = apiBase + "apibrowser/" + platform + "/search?api-version=0.2&search=" + encodeURIComponent(term);
        if (moniker !== "") {
            url += "&$filter=monikers/any(t: t eq '" + encodeURIComponent(moniker) + "')";
        }
        return fetchWithTimeout(url).then(function(response) {
            return response.json();
        });
    }
    function siteSearch(locale, dataSource, scope, term, skip, take) {
        var url = "https://docs.microsoft.com/api/search?locale=" + locale + "&search=" + term + "&$skip=" + skip + "&$top=" + take;
        var allScopes = scope !== "" ? [ "REST" ].concat([ scope ]) : [ "REST" ];
        var filterExpression = allScopes.map(function(x) {
            return "scopes/any(t:t eq '" + x + "')";
        }).join(" and ");
        url += "&$filter=" + encodeURIComponent(filterExpression);
        if (dataSource !== "") {
            url += "&dataSource=" + encodeURIComponent(dataSource);
        }
        return fetchWithTimeout(url).then(function(response) {
            return response.json();
        }).then(siteSearchToApiSearch);
    }
    function siteSearchToApiSearch(siteSearchResponse) {
        return {
            count: siteSearchResponse.count,
            "@nextLink": siteSearchResponse["@nextLink"],
            results: siteSearchResponse.results.map(function(y) {
                return {
                    displayName: y.title,
                    url: y.url,
                    description: y.description,
                    itemType: null,
                    itemKind: null
                };
            })
        };
    }
    function fetchNamespaces(platform, moniker) {
        if (platform === "rest") {
            return fetchRestNamespaces(platform, moniker);
        }
        var namespacesPath = platformConfig[platform].namespacesPath;
        return fetchWithTimeout(apiBase + "apibrowser/" + encodeURIComponent(platform) + "/" + namespacesPath + "?moniker=" + encodeURIComponent(moniker) + "&api-version=0.2").then(function(response) {
            return response.json();
        });
    }
    function fetchRestNamespaces(platform, moniker) {
        return getRestProducts().then(function(data) {
            return mapSiteSearchToNamespaceResponse(data, moniker);
        });
    }
    function fetchFamilyByMoniker(moniker) {
        return fetchWithTimeout(dhsApiBase + "familyTrees/bymoniker/" + encodeURIComponent(moniker)).then(function(response) {
            if (response.ok) {
                return response.json().then(function(dhsFamily) {
                    assertMonikerExists(moniker, dhsFamily);
                    return dhsFamily;
                });
            }
            return Promise.reject(null);
        }).then(function(family) {
            return mapDhsFamilyToFamily(family);
        }).catch(function() {
            return createFamilyFromMoniker(moniker);
        });
    }
    function createFamilyFromMoniker(moniker) {
        return {
            displayName: moniker,
            products: [ {
                displayName: moniker,
                packages: [ {
                    displayName: moniker,
                    isDefault: true,
                    moniker: moniker,
                    versionDisplayName: moniker,
                    isDeprecated: false,
                    isPrerelease: false
                } ]
            } ]
        };
    }
    function mapDhsFamilyToFamily(dhsFamily) {
        return {
            displayName: dhsFamily.familyName,
            products: dhsFamily.products.map(function(_a) {
                var productName = _a.productName, packages = _a.packages;
                return {
                    displayName: productName,
                    packages: packages.sort(function(a, b) {
                        return b.order - a.order;
                    }).filter(function(pkg) {
                        return filterDhsPackage(pkg);
                    }).map(function(p) {
                        return {
                            displayName: p.monikerDisplayName,
                            isDefault: p.isDefault,
                            moniker: p.monikerName,
                            versionDisplayName: p.versionDisplayName,
                            isDeprecated: p.isDeprecated,
                            isPrerelease: p.isPrerelease
                        };
                    })
                };
            })
        };
    }
    function filterDhsPackage(pkg) {
        if (msDocs.data.brand === "mooncake") {
            return pkg.monikerName !== "azure-cli-2017-03-09-profile";
        }
        return true;
    }
    function mapDhsPlatformToPlatform(dhsFamilies, platformId) {
        return {
            platformId: platformId,
            families: dhsFamilies.map(mapDhsFamilyToFamily)
        };
    }
    function assertMonikerExists(moniker, family) {
        if (!family.products.find(function(product) {
            return !!product.packages.find(function(pkg) {
                return pkg.monikerName === moniker;
            });
        })) {
            throw new Error('The family "' + family.familyName + '" does not contain the moniker "' + moniker + '".');
        }
    }
    function mapSiteSearchToPlatform(response, platformId) {
        return {
            platformId: platformId,
            families: [ {
                displayName: "",
                products: [ {
                    displayName: "",
                    packages: response.map(function(each) {
                        return {
                            displayName: each.name,
                            moniker: each.scope,
                            versionDisplayName: each.name,
                            isDefault: false,
                            isDeprecated: false,
                            isPrerelease: false
                        };
                    })
                } ]
            } ]
        };
    }
    function mapSiteSearchToNamespaceResponse(response, moniker) {
        var apiItems = (response.filter(function(platform) {
            return (platform.scope || "").toLowerCase() === (moniker || "").toLowerCase();
        })[0].services || []).map(function(each) {
            return {
                displayName: each.name,
                url: each.url,
                description: each.description,
                itemKind: loc.service
            };
        });
        return {
            apiItems: apiItems
        };
    }
    var monikerChangedEvent = "moniker-changed";
    var sameMonikerSelectedEvent = "same-moniker-selected";
    var readMonikerFromQuery = function() {
        var view = parseQueryString().view;
        return view === undefined ? "" : view;
    };
    var moniker = readMonikerFromQuery();
    function getMoniker() {
        return moniker;
    }
    function setMoniker(newMoniker) {
        if (newMoniker === moniker) {
            window$1.dispatchEvent(new CustomEvent(sameMonikerSelectedEvent, {
                detail: {
                    moniker: moniker
                }
            }));
            return;
        }
        moniker = newMoniker;
        window$1.dispatchEvent(new CustomEvent(monikerChangedEvent, {
            detail: {
                moniker: moniker
            }
        }));
    }
    window$1.addEventListener("popstate", function() {
        return setMoniker(readMonikerFromQuery());
    });
    var familyPromise;
    function getFamily() {
        if (familyPromise === undefined) {
            var moniker = getMoniker();
            familyPromise = fetchFamilyByMoniker(moniker);
        }
        return familyPromise;
    }
    function findPackageInFamily(family, moniker) {
        for (var _i = 0, _a = family.products; _i < _a.length; _i++) {
            var product = _a[_i];
            for (var _b = 0, _c = product.packages; _b < _c.length; _b++) {
                var pkg = _c[_b];
                if (pkg.moniker === moniker) {
                    return pkg;
                }
            }
        }
        return null;
    }
    var pageMonikers = {
        any: false
    };
    function readPageMonikers() {
        var tags = getMetas("monikers");
        pageMonikers.any = tags.length > 0;
        for (var i = 0; i < tags.length; i++) {
            pageMonikers[tags[i]] = true;
        }
    }
    readPageMonikers();
    function pageSupportsMoniker(moniker) {
        return moniker !== "" && pageMonikers[moniker] !== undefined;
    }
    function renderAppliesTo(container) {
        getFamily().then(function(family) {
            var output = "";
            var productIndex = 0;
            for (var _i = 0, _a = family.products; _i < _a.length; _i++) {
                var product = _a[_i];
                var packageLinks = [];
                for (var _b = 0, _c = product.packages; _b < _c.length; _b++) {
                    var _d = _c[_b], moniker = _d.moniker, versionDisplayName = _d.versionDisplayName;
                    if (pageSupportsMoniker(moniker) && pageMonikers[moniker]) {
                        packageLinks.push('<span class="cdl">' + escape$1(versionDisplayName) + "</span>");
                    }
                }
                if (packageLinks.length === 0) {
                    continue;
                }
                var titleClass = productIndex === 0 ? "propertyInfoTitle" : "propertyInfoTitle stack";
                output += '<div class="' + titleClass + '">' + escape$1(product.displayName) + '</div>\n\n\t\t\t<div class="cdlHoder">' + packageLinks.join(", ") + "</div>\n";
                productIndex++;
            }
            container.insertAdjacentHTML("afterend", output);
        });
    }
    var fallbackDisclaimer;
    function displayMonikerFallbackMessage() {
        removeMonikerFallbackMessage();
        var fallbackFromMoniker = escape$1(parseQueryString().viewFallbackFrom);
        if (fallbackFromMoniker === undefined) {
            return Promise.resolve();
        }
        return getFamily().then(function(family) {
            var pkg = findPackageInFamily(family, fallbackFromMoniker);
            return pkg ? pkg.displayName : fallbackFromMoniker;
        }, function() {
            return fallbackFromMoniker;
        }).then(function(displayName) {
            fallbackDisclaimer = showDisclaimer(loc.monikerFallback.replace("{0}", displayName));
        });
    }
    function removeMonikerFallbackMessage() {
        if (fallbackDisclaimer) {
            fallbackDisclaimer.parentElement.removeChild(fallbackDisclaimer);
            fallbackDisclaimer = null;
            notifyContentUpdated();
        }
    }
    function filterContentByMoniker() {
        var moniker = getMoniker();
        if (!pageSupportsMoniker(moniker)) {
            return false;
        }
        processDataMoniker(moniker);
        var links = discoverLinks(document$1.documentElement, document$1.getElementById("main"));
        processLinks(links, moniker);
        renderInTopicTOC();
        notifyContentUpdated();
        return true;
    }
    var monikerStyle = document$1.createElement("style");
    document$1.head.appendChild(monikerStyle);
    function processDataMoniker(moniker) {
        monikerStyle.textContent = "\n\t\t[data-moniker]:not([data-moniker~='" + moniker + "']) {\n\t\t\tdisplay: none !important;\n\t\t}\n\t";
        var addId = document$1.querySelectorAll("[data-moniker~='" + moniker + "'] [data-id]");
        for (var i = 0; i < addId.length; i++) {
            var element = addId.item(i);
            element.id = element.getAttribute("data-id");
        }
        var removeId = document$1.querySelectorAll("[data-moniker]:not([data-moniker~='" + moniker + "']) [id]");
        for (var i = 0; i < removeId.length; i++) {
            var element = removeId.item(i);
            element.setAttribute("data-id", element.id);
            element.removeAttribute("id");
        }
    }
    function discoverLinks(containerElement, contentElement) {
        return Array.from(containerElement.querySelectorAll('a[href*="view="]:not(.preserve-view):not([data-linktype="external"])')).filter(function(element) {
            return !(contentElement.contains(element) && !element.classList.contains("xref"));
        });
    }
    function processLinks(links, moniker) {
        function processLink(a) {
            if (a.search === "") {
                return;
            }
            var query = parseQueryString(a.search);
            if (query.view === undefined) {
                return;
            }
            query.view = moniker;
            a.search = toQueryString(query);
        }
        links.forEach(processLink);
    }
    function canHandleClientSide(moniker) {
        return pageMonikers[moniker] !== undefined || msDocs.data.pageTemplate === "ApiBrowserPage";
    }
    function monikerChangedHandler() {
        var moniker = getMoniker();
        var isClientSide = canHandleClientSide(moniker);
        updateQueryString({
            view: moniker,
            viewFallbackFrom: null
        }, isClientSide ? "pushState" : "href");
        if (isClientSide) {
            removeMonikerFallbackMessage();
            filterContentByMoniker();
        }
    }
    function sameMonikerSelectedHandler() {
        updateQueryString({
            viewFallbackFrom: null
        }, "replaceState");
        removeMonikerFallbackMessage();
    }
    function handleMonikerChange() {
        window$1.addEventListener(monikerChangedEvent, monikerChangedHandler);
        window$1.addEventListener(sameMonikerSelectedEvent, sameMonikerSelectedHandler);
    }
    var platformId = getMeta("platform") || getMeta("apiPlatform") || null;
    var platformPromise;
    function getPlatform$1() {
        if (platformPromise === undefined) {
            platformPromise = fetchPlatform(platformId).then(flattenPlatform);
        }
        return platformPromise;
    }
    function flattenPlatform(platform) {
        var platformId = platform.platformId, families = platform.families;
        var packages = [];
        var packagesByMoniker = {};
        var products = [];
        for (var i = 0; i < families.length; i++) {
            var family = families[i];
            for (var j = 0; j < family.products.length; j++) {
                var product = family.products[j];
                products.push(product);
                for (var k = 0; k < product.packages.length; k++) {
                    var _a = product.packages[k], moniker = _a.moniker, displayName = _a.displayName, versionDisplayName = _a.versionDisplayName, isDefault = _a.isDefault, isDeprecated = _a.isDeprecated, isPrerelease = _a.isPrerelease;
                    var pkg = {
                        platform: platform,
                        family: family,
                        product: product,
                        moniker: moniker,
                        displayName: displayName,
                        versionDisplayName: versionDisplayName,
                        isDefault: isDefault,
                        isDeprecated: isDeprecated,
                        isPrerelease: isPrerelease
                    };
                    packages.push(pkg);
                    packagesByMoniker[pkg.moniker] = pkg;
                }
            }
        }
        return {
            platformId: platformId,
            families: families,
            products: products,
            packages: packages,
            packagesByMoniker: packagesByMoniker
        };
    }
    var bigScreenQuery = window$1.matchMedia("screen and (min-width: 768px), screen and (min-height: 1024px)");
    var singleProduct = false;
    function createMonikerPicker(allApis) {
        var _a = initialRender(), element = _a.element, button = _a.button, buttonCaption = _a.buttonCaption, productList = _a.productList;
        var checkEventTarget = function(event) {
            if (event.target instanceof Element && !element.contains(event.target)) {
                collapse();
            }
        };
        var expand = function() {
            document$1.body.removeAttribute("style");
            document$1.documentElement.classList.add("moniker-picker-expanded");
            element.classList.add("expanded");
            button.setAttribute("aria-expanded", "true");
            window$1.addEventListener("focus", checkEventTarget, {
                capture: true
            });
            window$1.addEventListener("click", checkEventTarget);
            bigScreenQuery.addListener(collapse);
        };
        var collapse = function() {
            document$1.documentElement.classList.remove("moniker-picker-expanded");
            element.classList.remove("expanded");
            button.setAttribute("aria-expanded", "false");
            window$1.removeEventListener("focus", checkEventTarget, {
                capture: true
            });
            window$1.removeEventListener("click", checkEventTarget);
            bigScreenQuery.removeListener(collapse);
        };
        var collapseAndFocusButton = function() {
            collapse();
            button.focus();
        };
        finishRenderingAsync(allApis, button, buttonCaption, productList);
        handleMainMenuButtonInteraction(button, productList, expand, collapseAndFocusButton);
        handleKeyboardInteractionInMenu(productList, collapseAndFocusButton);
        handleMenuItemClick(button, productList, collapseAndFocusButton);
        return element;
    }
    function initialRender() {
        var element = document$1.createElement("div");
        element.classList.add("moniker-picker");
        element.setAttribute(contentAttrs.name, "moniker-picker");
        var buttonId = generateElementId();
        var menuId = generateElementId();
        element.innerHTML = '\n\t\t<button class="products"\n\t\t\t\tid="' + buttonId + '"\n\t\t\t\taria-haspopup="true"\n\t\t\t\taria-controls="' + menuId + '"\n\t\t\t\taria-expanded="false">\n\t\t\t<span class="visually-hidden">' + escape$1(platformId ? platformConfig[platformId].selectLabel : loc.selectedVersion) + '</span>\n\t\t\t<span aria-hidden="true"></span>\n\t\t</button>\n\t\t<div\tclass="products"\n\t\t\t\tid="' + menuId + '"\n\t\t\t\trole="menu"\n\t\t\t\taria-labelledby="' + buttonId + '" style="z-index: 5000">\n\t\t\t<span aria-hidden="true">' + escape$1(loc.product) + '</span>\n\t\t\t<ul aria-label="' + escape$1(loc.product) + '"></ul>\n\t\t</div>';
        return {
            element: element,
            button: element.firstElementChild,
            buttonCaption: element.firstElementChild.lastElementChild,
            productList: element.lastElementChild.lastElementChild
        };
    }
    function finishRenderingAsync(allApis, button, buttonCaption, productList) {
        if (platformId === "rest") {
            singleProduct = true;
        }
        if (allApis) {
            return getPlatform$1().then(function(platform) {
                if (platform.packagesByMoniker[getMoniker()] === undefined) {
                    setMoniker("");
                }
                var updateCaption = function() {
                    var moniker = getMoniker();
                    if (moniker === "") {
                        buttonCaption.textContent = platformConfig[platformId].allApisLabel;
                    } else {
                        buttonCaption.innerHTML = breakText(platform.packagesByMoniker[moniker].displayName);
                    }
                };
                window$1.addEventListener(monikerChangedEvent, updateCaption);
                updateCaption();
                renderAllApis(productList);
                for (var _i = 0, _a = platform.families; _i < _a.length; _i++) {
                    var family = _a[_i];
                    renderProducts(family.products, productList);
                }
            });
        }
        return getFamily().then(function(family) {
            singleProduct = family.products.length === 1;
            if (singleProduct && family.products[0].packages.length === 1) {
                button.disabled = true;
            }
            var updateCaption = function() {
                var moniker = getMoniker();
                buttonCaption.innerHTML = breakText(findPackageInFamily(family, moniker).displayName);
            };
            window$1.addEventListener(monikerChangedEvent, updateCaption);
            updateCaption();
            renderProducts(family.products, productList);
        });
    }
    function renderAllApis(productList) {
        var displayName = platformConfig[platformId].allApisLabel;
        productList.insertAdjacentHTML("afterbegin", '<li><a class="preserve-view" role="menuitem" href="?view=" tabindex="-1">' + displayName + "</a></li>");
    }
    function renderProducts(products, productList) {
        if (singleProduct) {
            productList.previousElementSibling.textContent = platformId === "rest" ? loc.product : loc.version;
            renderPackages(products[0].packages, productList);
            return;
        }
        for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
            var _a = products_1[_i], displayName = _a.displayName, packages = _a.packages;
            var buttonId = generateElementId();
            var menuId = generateElementId();
            var dotsOnly = true;
            productList.insertAdjacentHTML("beforeend", '<li>\n\t\t\t\t<button class="versions"\n\t\t\t\t\t\tid="' + buttonId + '"\n\t\t\t\t\t\trole="menuitem"\n\t\t\t\t\t\taria-haspopup="true"\n\t\t\t\t\t\taria-controls="' + menuId + '"\n\t\t\t\t\t\taria-expanded="false"\n\t\t\t\t\t\ttabindex="-1">\n\t\t\t\t\t' + breakText(displayName, dotsOnly) + '\n\t\t\t\t</button>\n\t\t\t\t<div\tclass="versions"\n\t\t\t\t\t\tid="' + menuId + '"\n\t\t\t\t\t\trole="menu"\n\t\t\t\t\t\taria-labelledby="' + buttonId + '">\n\t\t\t\t\t<span aria-hidden="true">' + escape$1(loc.version) + '</span>\n\t\t\t\t\t<ul aria-label="' + escape$1(loc.version) + '"></ul>\n\t\t\t\t</div>\n\t\t\t</li>');
            var versionsMenu = productList.lastElementChild.lastElementChild;
            var packageList = versionsMenu.lastElementChild;
            renderPackages(packages, packageList);
            versionsMenu.insertAdjacentHTML("beforeend", '<p class="moniker-auxillary-links"></p>');
            var monikerLinks = versionsMenu.lastElementChild;
            if (packages.find(function(pkg) {
                return /^azurermps/.test(pkg.moniker);
            })) {
                monikerLinks.insertAdjacentHTML("beforeend", '<a href="https://aka.ms/pshelpmechoose">' + escape$1(loc.helpMeChoose) + "</a>");
            }
            var archiveUrl = getMeta("archive_url");
            if (archiveUrl) {
                monikerLinks.insertAdjacentHTML("beforeend", '<a href="' + archiveUrl + '">' + escape$1(loc.archiveDocs) + "</a>");
            }
        }
    }
    function renderPackages(packages, packageList) {
        for (var _i = 0, packages_1 = packages; _i < packages_1.length; _i++) {
            var _a = packages_1[_i], moniker = _a.moniker, isDefault = _a.isDefault, versionDisplayName = _a.versionDisplayName, displayName = _a.displayName;
            packageList.insertAdjacentHTML("beforeend", '<li><a class="preserve-view" role="menuitem" href="?view=' + moniker + '" aria-label="' + displayName + '" data-default="' + isDefault + '" tabindex="-1">' + escape$1(versionDisplayName) + "</a></li>");
        }
    }
    function expandProduct(productList, productButton) {
        var current = productList.querySelector('button[aria-expanded="true"]');
        if (current === productButton) {
            return;
        }
        if (current !== null) {
            current.setAttribute("aria-expanded", "false");
        }
        if (productButton !== null) {
            productButton.setAttribute("aria-expanded", "true");
        }
    }
    function findAnchorByMoniker(container, moniker) {
        return container.querySelector('a[href="?view=' + moniker + '"]');
    }
    function findAnchorToSelect(productButton) {
        var versionsMenu = productButton.nextElementSibling;
        var current = findAnchorByMoniker(versionsMenu, getMoniker());
        var productDefault = versionsMenu.querySelector('a[href^="?view="][data-default="true"]');
        var first = versionsMenu.querySelector('a[href^="?view="]');
        return current || productDefault || first;
    }
    function getProductButton(monikerAnchor) {
        if (monikerAnchor.search === "?view=" || singleProduct) {
            return null;
        }
        return monikerAnchor.parentElement.parentElement.parentElement.previousElementSibling;
    }
    function handleMainMenuButtonInteraction(button, productList, expand, collapse) {
        var expandAndSelectCurrent = function() {
            expand();
            var moniker = getMoniker();
            var anchor = findAnchorByMoniker(productList, moniker);
            var productButton = getProductButton(anchor);
            expandProduct(productList, productButton);
            setTimeout(function() {
                if (productButton !== null) {
                    productButton.scrollIntoView(false);
                }
                anchor.scrollIntoView(false);
                anchor.focus();
            });
        };
        button.addEventListener("click", function(event) {
            var expand = button.getAttribute("aria-expanded") === "false";
            if (expand) {
                expandAndSelectCurrent();
            } else {
                collapse();
            }
        });
        button.addEventListener("keydown", function(event) {
            var expanded = button.getAttribute("aria-expanded") === "true";
            if (expanded && event.keyCode === keyCodes.up) {
                event.preventDefault();
                collapse();
            } else if (!expanded && event.keyCode === keyCodes.down) {
                event.preventDefault();
                expandAndSelectCurrent();
            }
        });
    }
    function handleKeyboardInteractionInMenu(productList, collapse) {
        productList.addEventListener("keydown", function(event) {
            if (!bigScreenQuery.matches) {
                return;
            }
            var target = event.target;
            if (target.getAttribute("role") !== "menuitem") {
                return;
            }
            var keyCode = event.keyCode;
            var el;
            switch (keyCode) {
              case keyCodes.left:
                if (target instanceof HTMLAnchorElement && target.search !== "?view=") {
                    event.preventDefault();
                    getProductButton(target).focus();
                }
                break;

              case keyCodes.right:
                if (target instanceof HTMLButtonElement && target.hasAttribute("aria-controls")) {
                    event.preventDefault();
                    findAnchorToSelect(target).focus();
                }
                break;

              case keyCodes.up:
              case keyCodes.down:
                event.preventDefault();
                var nextFn = keyCode === keyCodes.up ? "previousElementSibling" : "nextElementSibling";
                var firstFn = keyCode === keyCodes.up ? "lastElementChild" : "firstElementChild";
                if (target.parentElement[nextFn] === null) {
                    el = target.parentElement.parentElement[firstFn].firstElementChild;
                } else {
                    el = target.parentElement[nextFn].firstElementChild;
                }
                el.focus();
                if (el.parentElement.parentElement === productList) {
                    expandProduct(productList, el instanceof HTMLButtonElement ? el : null);
                }
                break;

              case keyCodes.home:
              case keyCodes.end:
                event.preventDefault();
                var fn = keyCode === keyCodes.home ? "firstElementChild" : "lastElementChild";
                el = target.parentElement.parentElement[fn].firstElementChild;
                el.focus();
                if (el.parentElement.parentElement === productList) {
                    expandProduct(productList, el instanceof HTMLButtonElement ? el : null);
                }
                break;

              case keyCodes.escape:
                event.preventDefault();
                collapse();
                break;
            }
        });
    }
    function handleMenuItemClick(button, productList, collapse) {
        productList.addEventListener("click", function(event) {
            var target = event.target;
            if (target.getAttribute("role") !== "menuitem") {
                return;
            }
            if (target instanceof HTMLAnchorElement) {
                event.preventDefault();
                var moniker = parseQueryString(target.search).view;
                setMoniker(moniker);
                collapse();
                return;
            }
            if (target instanceof HTMLButtonElement) {
                if (!bigScreenQuery.matches && target.getAttribute("aria-expanded") === "true") {
                    target.setAttribute("aria-expanded", "false");
                } else {
                    expandProduct(productList, target);
                }
                target.focus();
            }
        });
    }
    var blockName = "api-search-quick-filter";
    function readQuickFilters() {
        return getPlatform$1().then(function(platform) {
            var packages = platform.packagesByMoniker;
            var any = false;
            var readColumn = function(name) {
                var raw = getMeta(name) || "";
                var monikers = raw.split(",").map(function(str) {
                    return str.trim();
                }).filter(function(moniker) {
                    if (packages[moniker] === undefined) {
                        console.warn('Quick Filter: no package with moniker "' + moniker + '" was found.');
                        return false;
                    }
                    any = true;
                    return true;
                });
                return monikers.map(function(moniker) {
                    return {
                        moniker: moniker,
                        displayName: packages[moniker].displayName
                    };
                });
            };
            var columns = [ readColumn("quickFilterColumn1"), readColumn("quickFilterColumn2"), readColumn("quickFilterColumn3") ];
            return {
                any: any,
                columns: columns
            };
        });
    }
    function createQuickFilter(quickFilters) {
        var blockDiv = document$1.createElement("div");
        blockDiv.classList.add(blockName);
        blockDiv.setAttribute(contentAttrs.name, blockName);
        var heading = document$1.createElement("h2");
        heading.textContent = loc.quickfilters;
        heading.classList.add("api-search-heading");
        blockDiv.appendChild(heading);
        for (var _i = 0, _a = quickFilters.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            var columnDiv = document$1.createElement("div");
            blockDiv.appendChild(columnDiv);
            var _loop_1 = function(moniker, displayName) {
                var button = document$1.createElement("button");
                button.innerHTML = breakText(displayName);
                button.addEventListener("click", function(event) {
                    jsllReady.then(function(awa) {
                        return awa.ct.capturePageAction(button, {
                            actionType: awa.actionType.OTHER,
                            behavior: awa.behavior.OTHER,
                            content: {
                                event: "api-browser-quickfilter",
                                value: moniker,
                                platform: platformId
                            }
                        });
                    });
                    setMoniker(moniker);
                });
                columnDiv.appendChild(button);
            };
            for (var _b = 0, column_1 = column; _b < column_1.length; _b++) {
                var _c = column_1[_b], moniker = _c.moniker, displayName = _c.displayName;
                _loop_1(moniker, displayName);
            }
        }
        return blockDiv;
    }
    var config = platformConfig[platformId];
    var containers = [];
    function addResultsContainer(container, renderHeading) {
        containers.push({
            container: container,
            renderHeading: renderHeading
        });
    }
    function renderResults(platform, results, moreUrl) {
        document$1.documentElement.classList.add("api-search-has-results");
        var _loop_1 = function(container, renderHeading) {
            container.innerHTML = "";
            if (results.length === 0) {
                var noResultsMessage = platformId === "rest" ? loc.noResultsRest : loc["no.results"];
                container.insertAdjacentHTML("afterbegin", '\n\t\t\t\t<div class="no-results">\n\t\t\t\t\t' + noResultsMessage + "\n\t\t\t\t</div>\n\t\t\t");
                return {
                    value: void 0
                };
            }
            if (renderHeading) {
                renderResultsHeading(container, platform);
            }
            var table = document$1.createElement("table");
            table.classList.add("api-search-results");
            table.setAttribute(contentAttrs.name, "api-search-results");
            var thead = document$1.createElement("thead");
            table.appendChild(thead);
            var theadrow = document$1.createElement("tr");
            thead.appendChild(theadrow);
            var th = document$1.createElement("th");
            th.textContent = loc.name;
            theadrow.appendChild(th);
            th = document$1.createElement("th");
            th.textContent = loc.description;
            theadrow.appendChild(th);
            var tbody = document$1.createElement("tbody");
            table.appendChild(tbody);
            appendResultsToTable(tbody, results);
            container.appendChild(table);
            if (moreUrl && renderHeading) {
                var moreButton_1 = document$1.createElement("button");
                moreButton_1.classList.add("more-button");
                moreButton_1.classList.add("secondary-action");
                moreButton_1.textContent = loc.loadMoreResults;
                moreButton_1.setAttribute(contentAttrs.name, "api-browser-load-more-results");
                moreButton_1.addEventListener("click", function() {
                    fetchWithTimeout(moreUrl).then(function(response) {
                        return response.json();
                    }).then(function(result) {
                        if (platform.platformId === "rest") {
                            result = siteSearchToApiSearch(result);
                        }
                        moreUrl = result["@nextLink"];
                        if (moreUrl === undefined) {
                            container.removeChild(moreButton_1);
                        }
                        appendResultsToTable(tbody, result.results);
                    });
                });
                container.appendChild(moreButton_1);
            }
        };
        for (var _i = 0, containers_1 = containers; _i < containers_1.length; _i++) {
            var _a = containers_1[_i], container = _a.container, renderHeading = _a.renderHeading;
            var state_1 = _loop_1(container, renderHeading);
            if (typeof state_1 === "object") return state_1.value;
        }
    }
    function appendResultsToTable(tbody, results) {
        var parser = document$1.createElement("div");
        var toText = function(html) {
            parser.innerHTML = html;
            return parser.textContent !== "null" ? parser.textContent : "";
        };
        var moniker = getMoniker();
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            var resultType = result.itemKind || result.itemType || config.namespaceItemType;
            var tr = document$1.createElement("tr");
            tbody.appendChild(tr);
            var td = document$1.createElement("td");
            var a = document$1.createElement("a");
            a.href = processUrl(result.url, moniker);
            a.innerHTML = breakText(result.displayName.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
            var s = document$1.createElement("span");
            s.textContent = " " + resultType;
            td.appendChild(a);
            td.appendChild(s);
            tr.appendChild(td);
            td = document$1.createElement("td");
            td.textContent = toText(result.description);
            tr.appendChild(td);
            tr.appendChild(td);
        }
    }
    function displayLoadingIndicator() {
        document$1.documentElement.classList.add("api-search-has-results");
        for (var _i = 0, containers_2 = containers; _i < containers_2.length; _i++) {
            var container = containers_2[_i].container;
            container.innerHTML = '\n\t\t\t<div class="c-progress f-indeterminate-regional" role="progressbar" aria-valuetext="Loading..." tabindex="0" aria-label="indeterminate regional progress bar">\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t</div>';
        }
    }
    function renderText(text) {
        document$1.documentElement.classList.add("api-search-has-results");
        for (var _i = 0, containers_3 = containers; _i < containers_3.length; _i++) {
            var container = containers_3[_i].container;
            container.textContent = text;
        }
    }
    function clearResults() {
        document$1.documentElement.classList.remove("api-search-has-results");
        for (var _i = 0, containers_4 = containers; _i < containers_4.length; _i++) {
            var container = containers_4[_i].container;
            container.innerHTML = "";
        }
    }
    function renderResultsHeading(container, platform) {
        var moniker = getMoniker();
        var displayName;
        var versionDisplayName;
        if (moniker === "") {
            displayName = platformConfig[platformId].displayName;
            versionDisplayName = null;
        } else {
            var pkg = platform.packagesByMoniker[moniker];
            displayName = pkg.product.displayName;
            versionDisplayName = pkg.versionDisplayName;
        }
        var heading = document$1.createElement("h2");
        heading.classList.add("api-search-results-heading");
        heading.innerHTML = config.resultsHeadingTemplate.replace("{0}", displayName);
        if (versionDisplayName !== null && platformId === "rest") {
            heading.innerHTML = escape$1(moniker) + " REST " + heading.innerHTML;
        } else if (versionDisplayName !== null) {
            heading.innerHTML = heading.innerHTML + ' <span class="moniker-version">version ' + escape$1(versionDisplayName) + "</span>";
        }
        container.appendChild(heading);
    }
    function processUrl(url, moniker) {
        if (moniker !== "" && !/[?&]view=/i.test(url)) {
            var _a = url.split("#"), path = _a[0], hash = _a[1];
            hash = hash === undefined ? "" : "#" + hash;
            url = platformId === "rest" ? "" + path + hash : path + "?view=" + encodeURIComponent(moniker) + hash;
        }
        if (/^https:\/\/docs.microsoft.com/.test(url)) {
            url = url.substr("https://docs.microsoft.com".length);
        }
        return url;
    }
    var apiSearchTermChangedEvent = "api-search-term-changed";
    var term = "";
    function getTerm() {
        return term;
    }
    function setTerm(newTerm) {
        newTerm = newTerm.trim();
        if (newTerm === term) {
            return;
        }
        term = newTerm;
        if (msDocs.data.pageTemplate === "ApiBrowserPage") {
            updateQueryString({
                term: term
            }, "pushState");
        }
        window.dispatchEvent(new CustomEvent(apiSearchTermChangedEvent, {
            detail: {
                term: term
            }
        }));
    }
    function readTermFromQueryString() {
        var term = parseQueryString().term;
        return term === undefined ? "" : term.trim();
    }
    if (msDocs.data.pageTemplate === "ApiBrowserPage") {
        term = readTermFromQueryString();
        window.addEventListener("popstate", function() {
            return setTerm(readTermFromQueryString());
        });
    }
    function initApiSearch() {
        window$1.addEventListener(apiSearchTermChangedEvent, doApiSearch);
        window$1.addEventListener(monikerChangedEvent, doApiSearch);
        if (msDocs.data.pageTemplate === "ApiBrowserPage") {
            doApiSearch();
        }
    }
    var previousSearch = "";
    function doApiSearch() {
        var term = getTerm();
        var moniker = getMoniker();
        var currentSearch = term + "/" + moniker;
        if (currentSearch === previousSearch) {
            return;
        }
        previousSearch = currentSearch;
        if (msDocs.data.pageTemplate === "ApiBrowserPage" && moniker !== "" && term === "") {
            displayLoadingIndicator();
            return Promise.all([ fetchNamespaces(platformId, moniker), getPlatform$1() ]).then(function(_a) {
                var result = _a[0], platform = _a[1];
                if (currentSearch !== previousSearch) {
                    return;
                }
                if (result.apiItems.length === 0) {
                    renderText("No namespaces");
                    return;
                }
                renderResults(platform, result.apiItems, null);
            }, function(error) {
                renderText(loc.apiSearchIsUnavailable);
            });
        }
        if (term.length < 3) {
            clearResults();
            return Promise.resolve();
        }
        if (!platformConfig[platformId].validSearchTerm.test(term)) {
            return getPlatform$1().then(function(platform) {
                return renderResults(platform, [], null);
            });
        }
        displayLoadingIndicator();
        return Promise.all([ search(platformId, moniker, term, msDocs.data.userLocale), getPlatform$1() ]).then(function(_a) {
            var result = _a[0], platform = _a[1];
            if (currentSearch !== previousSearch) {
                return;
            }
            bi(moniker, term, result.results.length);
            renderResults(platform, result.results, result["@nextLink"]);
        }, function(error) {
            renderText(loc.apiSearchIsUnavailable);
        });
    }
    function bi(moniker, term, results) {
        jsllReady.then(function(awa) {
            return awa.ct.captureContentPageAction({
                actionType: awa.actionType.OTHER,
                behavior: awa.behavior.SEARCH,
                content: {
                    event: "api-browser-search",
                    platform: platformId,
                    moniker: moniker,
                    term: term,
                    results: results
                }
            });
        });
    }
    var blockName$1 = "api-search-field";
    function createSearchField() {
        var form = document$1.createElement("form");
        form.classList.add(blockName$1);
        form.setAttribute(contentAttrs.name, blockName$1);
        form.action = "javascript:";
        form.addEventListener("submit", function(event) {
            return event.preventDefault();
        });
        var label = document$1.createElement("label");
        var labelSpan = document$1.createElement("span");
        labelSpan.classList.add("visually-hidden");
        labelSpan.textContent = loc.search;
        label.appendChild(labelSpan);
        form.appendChild(label);
        var input = document$1.createElement("input");
        input.type = "search";
        input.value = getTerm();
        input.placeholder = loc.search;
        label.appendChild(input);
        var clearAnchor = document$1.createElement("a");
        clearAnchor.href = "#";
        clearAnchor.title = loc.clearterm;
        clearAnchor.classList.add("clear");
        clearAnchor.addEventListener("click", function(event) {
            event.preventDefault();
            input.value = "";
            input.dispatchEvent(new CustomEvent("change", {
                bubbles: true
            }));
        });
        label.appendChild(clearAnchor);
        var updateEmpty = function() {
            if (input.value === "") {
                input.classList.add("empty");
            } else {
                input.classList.remove("empty");
            }
        };
        updateEmpty();
        var timeout = 0;
        var handleInput = function(event) {
            updateEmpty();
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                return setTerm(input.value);
            }, 500);
        };
        input.addEventListener("change", handleInput);
        input.addEventListener("input", handleInput);
        window$1.addEventListener(apiSearchTermChangedEvent, function() {
            var term = getTerm();
            if (input.value.trim() === term) {
                return;
            }
            input.value = term;
            updateEmpty();
        });
        return form;
    }
    function apiBrowserPage() {
        handleMonikerChange();
        initApiSearch();
        if (platformId === "rest") {
            var h1 = document$1.querySelector("h1");
            h1.insertAdjacentHTML("beforeend", '<span class="tag top is-rounded is-large important">' + loc.preview + "</span>");
        }
        var contentDiv = document$1.querySelector(".content");
        var searchFieldContainer = document$1.createElement("div");
        searchFieldContainer.classList.add("api-browser-search-field-container");
        contentDiv.appendChild(searchFieldContainer);
        var allApis = true;
        searchFieldContainer.appendChild(createMonikerPicker(allApis));
        searchFieldContainer.appendChild(createSearchField());
        readQuickFilters().then(function(result) {
            if (!result.any) {
                return;
            }
            var quickFilter = createQuickFilter(result);
            searchFieldContainer.appendChild(quickFilter);
        });
        var resultsContainer = document$1.createElement("div");
        resultsContainer.classList.add("api-browser-results-container");
        contentDiv.appendChild(resultsContainer);
        var renderHeading = true;
        addResultsContainer(resultsContainer, renderHeading);
        var updateStatus = function() {
            var method = getMoniker() === "" && getTerm() === "" ? "remove" : "add";
            document$1.documentElement.classList[method]("has-moniker-or-term");
        };
        updateStatus();
        window.addEventListener(monikerChangedEvent, updateStatus);
        window.addEventListener(apiSearchTermChangedEvent, updateStatus);
    }
    function profileListPage() {
        var filter = document.querySelector(".filter-list");
        if (!filter) {
            return;
        }
        var profileContainer = document.querySelector(".profiles-container ul");
        var profilesRaw = Array.from(document.querySelectorAll(".profile-component"));
        var timeout;
        var handleSearch = function() {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                searchToFilter(escapeRegExp(filter.value), profilesRaw);
            }, 250);
        };
        filter.addEventListener("input", handleSearch);
        filter.addEventListener("change", handleSearch);
    }
    function searchToFilter(searchTerm, arr) {
        var noResults = document.querySelector(".no-results");
        var regex = new RegExp(searchTerm, "gi");
        noResults.hidden = true;
        var filtered = arr.filter(function(el) {
            el.hidden = !el.textContent.match(regex);
            if (!el.hidden) {
                return el;
            }
        });
        if (filtered.length === 0) {
            noResults.hidden = false;
        }
        return filtered;
    }
    function homePage() {
        var dirLink = document$1.querySelector(".home-greeting-container a[href='#docs-directory']");
        if (dirLink === null) {
            return;
        }
        dirLink.addEventListener("click", function(e) {
            e.preventDefault();
            var directoryOffset = document$1.querySelector("#docs-directory").getBoundingClientRect().top;
            scrollTo(directoryOffset, 500);
        });
    }
    var hoverImgUrls = [];
    var hoverImgEls = [];
    function loadHoverImages() {
        if ($("html.hasTouch").length || $("html.highContrast").length) {
            return;
        }
        setTimeout(function() {
            $("img[data-hoverimage]").each(function() {
                var $this = $(this);
                hoverImgUrls.push($this.attr("data-hoverimage"));
                hoverImgEls.push(this);
            });
            loadHoverImg();
        }, 20);
    }
    var loadHoverImg = function() {
        if (hoverImgUrls.length > 0) {
            var imgUrl = hoverImgUrls[0];
            var img = new Image();
            img.onload = setHoverImage;
            img.src = imgUrl;
        }
    };
    var setHoverImage = function() {
        var imgUrl = hoverImgUrls.shift();
        var imgEl = hoverImgEls.shift();
        var $this = $(imgEl);
        var $card = $this.parent();
        $card.css({
            "background-image": "url(" + imgUrl + ")",
            "background-size": "cover"
        });
        $this.parents(".card").mouseover(function() {
            var $img = $(this).find(".cardImage");
            $img.css("background-position", "-" + $card.width() + "px 0");
        }).mouseout(function() {
            resetHover(this);
        }).click(function() {
            resetHover(this);
        });
        setTimeout(function() {
            $card.parent().parent().addClass("ready");
            $this.fadeOut("fast");
        }, 20);
        loadHoverImg();
    };
    var resetHover = function(el) {
        var $img = $(el).find(".cardImage");
        $img.css("background-position", "0 0");
    };
    function loadScaleImages() {
        if ($("html.highContrast").length) {
            return;
        }
        $("img[data-scaleimage]").each(function() {
            var $this = $(this);
            var $card = $this.parent();
            $this.attr("role", "presentation");
            $card.css("background-image", "url(" + $this.attr("data-scaleimage") + ")").addClass("cardScaleImage");
            $this.hide();
        });
    }
    function hubPage() {
        loadScaleImages();
        loadHoverImages();
    }
    function hubPagePage() {
        var hash = parseQueryString(location.hash);
        var selectedPivotID = hash.pivot;
        var selectedPanelID = hash.panel;
        var panelItemNavOffsets = [];
        var pivotSelectorClassName = "pivotSelector";
        var isPivotMenuVisible = false;
        var savedPanelNavItem;
        var init = function() {
            var hasPivotBeenSelected = false;
            if (selectedPivotID !== undefined) {
                selectedPivotID = "#" + selectedPivotID;
            }
            if (selectedPanelID !== undefined) {
                selectedPanelID = "#" + selectedPanelID;
            }
            var pivotsNavUl = $("<ul>");
            var pivotLinks = $("ul.pivots>li>a");
            var pivotCount = pivotLinks.length;
            pivotLinks.each(function() {
                pivotsNavUl.append($("<li>").append($(this).clone()));
                $(this).parent().attr("data-id", $(this).attr("href")).addClass("pivotItem");
                var hrefAttr = $(this).attr("href");
                if (typeof hrefAttr !== "undefined" && hrefAttr.substring(0, 1) === "#") {
                    $(this).on("click", function(e) {
                        e.preventDefault();
                        hidePivotMenu();
                        selectPivot($(this), false);
                    });
                }
            });
            $(".pivotItem>ul>li").each(function() {
                $(this).addClass("panelItem");
            });
            $(".panelItem>ul").each(function() {
                $(this).addClass("panelContent");
            });
            $("ul.panelContent > li > div.container").each(function() {
                $(this).parent().addClass("fullSpan");
            });
            var $pivotsNav = $("<nav>").addClass("pivotTabs").append(pivotsNavUl);
            var $pivots = $("ul.pivots");
            if (pivotCount === 1) {
                $pivotsNav.addClass("singlePivot");
                $pivots.addClass("tabLess");
            }
            $pivots.before($pivotsNav);
            $pivots.before($("<button>").addClass(pivotSelectorClassName).on("click", togglePivotMenu));
            $(".panelItem>a").each(function() {
                if ($(this).attr("href").substring(0, 1) === "#") {
                    $(this).on("click", function(e) {
                        e.preventDefault();
                    });
                    $(this).parent().on("click", function(e) {
                        hidePivotMenu();
                        selectPanel($(this));
                    });
                }
            });
            $("nav.pivotTabs a").each(function() {
                var hrefAttr = $(this).attr("href");
                if (typeof hrefAttr !== "undefined" && hrefAttr.substring(0, 1) === "#") {
                    if (selectedPivotID !== undefined && $(this).attr("href").toLowerCase() === selectedPivotID.toLowerCase()) {
                        hasPivotBeenSelected = true;
                        selectPivot($(this), false);
                    }
                    $(this).on("click", function(e) {
                        selectPivot($(this), true);
                        e.stopPropagation();
                        e.preventDefault();
                    });
                }
            });
            if (pivotCount > 0 && !hasPivotBeenSelected) {
                var defaultLinks = $("nav.pivotTabs a[data-default='true']");
                if (defaultLinks.length > 0) {
                    selectPivot($(defaultLinks[0]), false);
                } else {
                    selectPivot($("nav.pivotTabs a:first"), false);
                }
            }
            loadScaleImages();
            loadHoverImages();
        };
        var selectPivot = function($this, isUrlUpdated) {
            selectedPivotID = $this.attr("href");
            if (isUrlUpdated) {
                selectedPanelID = undefined;
                updateHash();
            }
            $("nav.pivotTabs li").removeClass("selected");
            $this.parent().addClass("selected");
            $(".pivotItem").hide();
            var $selectedPivot = $(".pivotItem[data-id='" + selectedPivotID + "']");
            $selectedPivot.show();
            panelItemNavOffsets = [];
            $selectedPivot.find(".panelItem>a").each(function(index) {
                $(this).parent().attr("data-index", index);
                panelItemNavOffsets.push(this.offsetTop);
            });
            $("." + pivotSelectorClassName).text($this.text());
            $(".pivotItem>ul>li>a").removeClass("selected");
            selectPanel(savedPanelNavItem);
            savedPanelNavItem = undefined;
        };
        var selectPanel = function($this) {
            if ($this === undefined) {
                var hasPanelBeenSelected_1 = false;
                var panelCount_1 = 0;
                var $selectedPivot = $("ul.pivots").find(selectedPivotID);
                $selectedPivot.children("li").each(function() {
                    panelCount_1 += 1;
                    if (selectedPanelID !== undefined && $(this).children("a").attr("href").toLowerCase() === selectedPanelID.toLowerCase()) {
                        hasPanelBeenSelected_1 = true;
                        selectPanelNavItem($(this), false);
                    }
                });
                if (panelCount_1 > 0 && !hasPanelBeenSelected_1) {
                    var defaultLinks = $selectedPivot.find("li > a[data-default='true']");
                    if (defaultLinks.length > 0) {
                        selectPanelNavItem($(defaultLinks[0]).parent(), false);
                    } else {
                        selectPanelNavItem($selectedPivot.children("li:first"), false);
                    }
                }
            } else {
                var thisParentID = $this.parent().parent().attr("data-id");
                if (selectedPivotID !== thisParentID) {
                    savedPanelNavItem = $this;
                    selectPivot($("nav.pivotTabs a[href='" + thisParentID + "']"), true);
                } else {
                    selectPanelNavItem($this, true);
                }
            }
        };
        var selectPanelNavItem = function($this, isUrlUpdated) {
            var $link = $($this.children("a")[0]);
            selectedPanelID = $link.attr("href");
            var $selectedPivot = $("ul.pivots").find(selectedPivotID);
            if (isUrlUpdated) {
                updateHash();
            }
            var panelNavIndex = $this.attr("data-index");
            var topOffset = "0";
            if (panelNavIndex > 0) {
                topOffset = "-" + panelItemNavOffsets[panelNavIndex] + "px";
            } else {
                if ($link.parent().siblings().length == 0 && !$link.hasClass("singlePanelNavItem")) {
                    $selectedPivot.find(selectedPanelID).addClass("singlePanelContent");
                    $link.addClass("singlePanelNavItem");
                }
            }
            $(selectedPivotID).find("li>a").removeClass("selected");
            $link.addClass("selected");
            $selectedPivot.find(".panelContent").not(".panelContent .panelContent").hide();
            $selectedPivot.find(selectedPanelID).css({
                "margin-top": topOffset,
                display: "flex"
            });
        };
        var hidePivotMenu = function() {
            if (isPivotMenuVisible) {
                $(".pivots").parent().removeClass("pivotMenu");
            }
            isPivotMenuVisible = false;
        };
        var togglePivotMenu = function() {
            if (isPivotMenuVisible) {
                hidePivotMenu();
            } else {
                $(".pivots").parent().addClass("pivotMenu");
                isPivotMenuVisible = true;
            }
        };
        var handlingHashChange = false;
        var updateHash = function() {
            if (handlingHashChange) {
                return;
            }
            var hsh = "";
            if (selectedPivotID !== undefined) {
                hsh = "pivot=" + selectedPivotID.substring(1);
                if (selectedPanelID !== undefined) {
                    hsh += "&panel=" + selectedPanelID.substring(1);
                }
                removeEventListener("hashchange", handleHashChange);
                parent.location.hash = hsh;
                setTimeout(function() {
                    addEventListener("hashchange", handleHashChange);
                });
            }
        };
        function handleHashChange(event) {
            var hash = parseQueryString(location.hash);
            handlingHashChange = true;
            var tabs = document.querySelector("nav.pivotTabs");
            var el = tabs.querySelector('a[href$="#' + hash.pivot + '"]') || tabs.querySelector('a[data-default="true"]') || tabs.querySelector("a");
            $(el).trigger("click");
            el = document.querySelector('a[href$="#' + hash.panel + '"]');
            if (el) {
                $(el).trigger("click");
            }
            setTimeout(function() {
                handlingHashChange = false;
            }, 100);
        }
        addEventListener("hashchange", handleHashChange);
        init();
    }
    function landingPage() {
        loadScaleImages();
        loadHoverImages();
    }
    var sharing = {
        facebook: function(url, title) {
            return "https://www.facebook.com/sharer/sharer.php?u=" + url;
        },
        twitter: function(url, title) {
            return "https://twitter.com/intent/tweet?original_referer=" + url + "&text=" + title + "&tw_p=tweetbutton&url=" + url;
        },
        linkedin: function(url, title) {
            return "https://www.linkedin.com/cws/share?url=" + url;
        },
        email: function(url, title) {
            var subject = encodeURIComponent(loc.sharedArticleSubject).replace(encodeURIComponent("{0}"), title);
            var body = "" + title + encodeURIComponent("\n\n") + url;
            return "mailto:?subject=" + subject + "&body=" + body;
        },
        weibo: function(url, title) {
            return "http://service.weibo.com/share/share.php?title=" + title + "&url=" + url;
        }
    };
    function initSharingLinks(container, url, title) {
        var encodedTitle = encodeURIComponent(title);
        var campaignUrl = url += (url.indexOf("?") !== -1 ? "&" : "?") + "WT.mc_id=";
        for (var _i = 0, _a = Object.keys(sharing); _i < _a.length; _i++) {
            var platform = _a[_i];
            var anchor = container.querySelector(".share-" + platform);
            if (anchor === null) {
                continue;
            }
            var encodedUrl = encodeURIComponent(campaignUrl + platform);
            var hrefFunc = sharing[platform];
            anchor.href = hrefFunc(encodedUrl, encodedTitle);
        }
    }
    var defaultNextUnit = {
        title: loc.moreTutorials,
        url: getLearnHomeUrl()
    };
    function getLearnHomeUrl() {
        var hostname = location.hostname;
        if (location.hostname === "localhost") {
            return "/" + msDocs.data.userLocale + "/learn-sandbox/";
        }
        if (hostname === "ppe.docs.microsoft.com") {
            return "/learn-sandbox/";
        }
        return "/learn/";
    }
    var quizId = getMeta("challenge_uid");
    var tutorialName = getMeta("tutorial_name");
    var unitId = getMeta("uid");
    var prodServerUrl = "https://docs.microsoft.com/api/learn";
    var newDevelopServerUrl = "https://docslearning-ppe.azurewebsites.net";
    var branch = getBranch();
    function getModuleProgress(moduleId) {
        var query = {
            branch: branch
        };
        var url = getServerUrl() + "/progress/modules/" + moduleId + "?" + toQueryString(query);
        var init = {
            method: "GET",
            credentials: "include"
        };
        return fetchWithTimeout(createRequest(url, init)).then(function(response) {
            return process401Response(response);
        }).then(function(response) {
            if (response.status === 204) {
                return null;
            } else if (response.ok) {
                return response.json();
            }
            return null;
        });
    }
    function getUnitProgress(unitId) {
        var query = {
            branch: branch
        };
        var url = getServerUrl() + "/progress/units/" + unitId + "?" + toQueryString(query);
        var init = {
            method: "GET",
            credentials: "include"
        };
        return fetchWithTimeout(createRequest(url, init)).then(function(response) {
            return process401Response(response);
        }).then(function(response) {
            if (response.status === 204) {
                return null;
            }
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(undefined);
        });
    }
    function putUnitProgress(unitId, stepId) {
        var query = {
            branch: branch
        };
        var url = getServerUrl() + "/progress/units/" + unitId + "/steps/" + stepId + "?" + toQueryString(query);
        var completedTime = new Date().toISOString();
        var body = JSON.stringify({
            uid: stepId,
            type: "normalStep",
            isCompleted: true,
            completedTime: completedTime
        });
        var init = {
            method: "PUT",
            credentials: "include",
            body: body
        };
        return fetchWithTimeout(createRequest(url, init)).then(function(response) {
            return process401Response(response);
        }).then(function(response) {
            return response.json();
        });
    }
    function getAchievements(locale) {
        var query = {
            locale: locale,
            branch: branch
        };
        var url = getServerUrl() + "/achievements?" + toQueryString(query);
        var init = {
            method: "GET",
            credentials: "include"
        };
        return fetchWithTimeout(url, init).then(function(response) {
            return process401Response(response);
        }).then(function(response) {
            return response.ok ? response.json() : {
                ok: false
            };
        });
    }
    function exportUserProgress(locale) {
        var query = {
            locale: locale,
            branch: branch
        };
        var url = getServerUrl() + "/progress/user?" + toQueryString(query);
        var init = {
            method: "GET",
            credentials: "include"
        };
        return fetchWithTimeout(createRequest(url, init)).then(function(response) {
            return process401Response(response);
        }).then(function(response) {
            return response.ok ? response.text() : Promise.resolve("");
        });
    }
    function deleteUserProgress() {
        localStorage.removeItem("tutorialProgress");
        var query = {
            branch: branch
        };
        var url = getServerUrl() + "/progress/user?" + toQueryString(query);
        var init = {
            method: "DELETE",
            credentials: "include"
        };
        return fetchWithTimeout(createRequest(url, init)).then(function(response) {
            return process401Response(response);
        }).then(function(response) {
            return response.ok;
        });
    }
    function getModule(locale, moduleId) {
        var query = {
            locale: locale,
            branch: branch
        };
        var url = getServerUrl() + "/modules/" + moduleId + "?" + toQueryString(query);
        var init = {
            method: "GET"
        };
        return fetchWithTimeout(createRequest(url, init)).then(function(response) {
            return response.json();
        });
    }
    function getModuleByUnit(locale, unitId) {
        var query = {
            unitId: unitId,
            locale: locale,
            branch: branch
        };
        var url = getServerUrl() + "/modules?" + toQueryString(query);
        var init = {
            method: "GET"
        };
        return fetchWithTimeout(createRequest(url, init)).then(function(response) {
            return response.json();
        });
    }
    function getLearningPath(locale, pathId) {
        var query = {
            locale: locale,
            branch: branch
        };
        var url = getServerUrl() + "/paths/" + pathId + "?" + toQueryString(query);
        var init = {
            method: "GET"
        };
        return fetchWithTimeout(createRequest(url, init)).then(function(response) {
            return response.json();
        });
    }
    function createRequest(url, init) {
        init = init || {};
        init.mode = "cors";
        init.credentials = "include";
        var request = new Request(url, init);
        if (request.method === "PUT" || request.method === "POST") {
            request.headers.set("Content-Type", "application/json");
        }
        return request;
    }
    function getServerUrl() {
        var hostname = location.hostname;
        if (hostname === "localhost" || hostname === "ppe.docs.microsoft.com") {
            return newDevelopServerUrl;
        }
        return prodServerUrl;
    }
    function getBranch() {
        if (location.hostname === "localhost") {
            return "master";
        }
        var params = parseQueryString(location.search);
        return params.branch !== undefined ? params.branch : "";
    }
    function learningPathPage() {
        var pathId = getMeta("uid");
        displayModuleUnits(pathId);
    }
    function displayModuleUnits(pathId) {
        getLearningPath(msDocs.data.userLocale, pathId).then(function(learningPath) {
            return contentLoaded.then(function() {
                for (var _i = 0, _a = learningPath.modules; _i < _a.length; _i++) {
                    var module = _a[_i];
                    populateModuleCard(module);
                }
            });
        }).catch(function(error) {});
    }
    function populateModuleCard(module) {
        var template = function(units) {
            return '\n\t\t\t\t<ul class="is-marginless-bottom is-marginless-left is-marginless-right">\n\t\t\t\t\t' + module.units.map(function(unit) {
                return '\n\t\t\t\t\t\t<li class="is-unstyled">\n\t\t\t\t\t\t\t<a href="/' + msDocs.data.userLocale + unit.url + '">' + unit.title + '</a>\n\t\t\t\t\t\t\t<span class="">' + unit.durationInMinutes + "min</span>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t";
            }).join("") + "\n\t\t\t\t</ul>\n\t\t\t";
        };
        var element = document.querySelector("#" + module.uid.replace(".", "\\.") + " .module-units");
        element.innerHTML = template(module.units);
    }
    function localePage() {
        document.getElementById("locale-selector-link").hidden = true;
        var contentElements = document.querySelectorAll(".content h2, .content ul > li > a");
        var form = document.querySelector(".select-locale form");
        var headlineCurrentLocaleElement = document.querySelector(".select-locale .headline strong");
        var regions = [];
        var localeInfo;
        var regionIndexes = {
            americas: 0,
            europeMiddleEastAfrica: 1,
            asiaPacific: 2
        };
        var targetPath;
        function readTargetPath() {
            targetPath = parseQueryString().target || location.pathname;
            var a = document.createElement("a");
            a.href = targetPath;
            if (a.hostname !== "" && a.hostname !== location.hostname) {
                targetPath = location.pathname;
                return;
            }
            targetPath = a.pathname + a.search + a.hash;
            if (!/^\//.test(targetPath)) {
                targetPath = "/" + targetPath;
            }
        }
        readTargetPath();
        headlineCurrentLocaleElement.textContent = msDocs.data.userLocaleName;
        if (msDocs.data.contentDir === "rtl" && /\)$/.test(headlineCurrentLocaleElement.textContent)) {
            headlineCurrentLocaleElement.appendChild(document.createTextNode("‎"));
        }
        for (var i = 0; i < contentElements.length; i++) {
            var element = contentElements.item(i);
            if (element instanceof HTMLHeadingElement) {
                regions.push({
                    h2: element,
                    locales: []
                });
            } else if (element instanceof HTMLAnchorElement) {
                localeInfo = {
                    a: element,
                    locale: element.search.substr(1).toLocaleLowerCase(),
                    name: element.title.toLocaleLowerCase(),
                    displayName: element.textContent.toLocaleLowerCase()
                };
                regions[regions.length - 1].locales.push(localeInfo);
                localeInfo.a.href = replaceLocaleInPath(targetPath, localeInfo.locale);
                if (document.referrer.indexOf("techprofile.microsoft.com") !== -1 || document.referrer.indexOf("localhost:44333") !== -1) {
                    localeInfo.a.href = localeInfo.a.href.replace("https://docs.microsoft.com", "https://techprofile.microsoft.com");
                }
                element.setAttribute("data-locale", localeInfo.locale);
                element.setAttribute("data-bi-name", localeInfo.locale);
                if (localeInfo.locale === msDocs.data.userLocale) {
                    element.parentElement.classList.add("selected");
                }
                if (msDocs.data.contentDir === "rtl" && /\)$/.test(element.textContent)) {
                    element.appendChild(document.createTextNode("‎"));
                }
            }
        }
        function filterLocales(event) {
            var selectedRegion = form.querySelector(":checked").value;
            var term = form.querySelector('[type="search"]').value.trim().toLocaleLowerCase();
            var region;
            var regionHidden;
            var locale;
            var localeHidden;
            var visibleLocalesInRegion;
            var visibleLocales = 0;
            for (var i = 0; i < regions.length; i++) {
                region = regions[i];
                regionHidden = selectedRegion !== "worldwide" && i !== regionIndexes[selectedRegion];
                visibleLocalesInRegion = 0;
                for (var j = 0; j < region.locales.length; j++) {
                    locale = region.locales[j];
                    localeHidden = regionHidden || term.length && locale.locale.indexOf(term) === -1 && locale.name.indexOf(term) === -1 && locale.displayName.indexOf(term) === -1;
                    locale.a.parentElement.hidden = localeHidden;
                    if (!localeHidden) {
                        visibleLocalesInRegion++;
                        visibleLocales++;
                    }
                }
                region.h2.hidden = regionHidden || visibleLocalesInRegion === 0;
            }
            msDocs.data.jsllReady.then(function(awa) {
                awa.ct.capturePageAction(event.target, {
                    behavior: awa.behavior.OTHER,
                    actionType: awa.actionType.OTHER,
                    content: {
                        type: "localesearch",
                        region: selectedRegion,
                        term: term,
                        results: visibleLocales
                    }
                });
            });
        }
        var filterTimeout = 0;
        function throttleInput(event) {
            clearTimeout(filterTimeout);
            filterTimeout = setTimeout(function() {
                filterLocales(event);
            }, 300);
        }
        form.addEventListener("input", throttleInput);
        form.addEventListener("change", filterLocales);
        document.querySelector(".content").addEventListener("click", function(event) {
            if (event.target instanceof HTMLAnchorElement) {
                var locale = event.target.getAttribute("data-locale");
                if (locale) {
                    setLocaleCookie(locale);
                }
            }
        });
    }
    function convertMinsToHrsMins(mins) {
        var h = Math.floor(mins / 60);
        var m = mins % 60;
        if (h === 0) {
            return m + "min";
        } else if (h === 1) {
            return h + "hr " + m + "min";
        } else {
            return h + "hrs " + m + "min";
        }
    }
    function modulePage() {
        var moduleId = getMeta("uid");
        Promise.all([ contentLoaded, loadModuleInformation(moduleId) ]).then(function(_a) {
            var _ = _a[0], detail = _a[1];
            displayModuleDuration(detail.durationInMinutes);
            displayModuleUnitDuration(detail.units);
            displayRelatedLearningPaths(detail.parents);
        }).then(function() {
            user.whenAuthenticated().then(function() {
                displayProgress(moduleId);
            });
        });
    }
    function displayProgress(moduleId) {
        var progress = getModuleProgress(moduleId);
        return Promise.all([ progress, contentLoaded ]).then(function(_a) {
            var progress = _a[0];
            if (!progress) {
                return;
            }
            var moduleFinished = true;
            var list = document.querySelector(".unit-list");
            progress.items.forEach(function(unit) {
                if (unit.isCompleted) {
                    list.querySelector("li[data-unit-uid='" + unit.uid + "'] .unit-duration").innerHTML = '<span class="docon docon-check" aria-label="' + loc.complete + '"></span>';
                } else {
                    moduleFinished = false;
                }
            });
            if (moduleFinished) {
                var moduleDuration = document.querySelector(".module-duration");
                moduleDuration.innerHTML = '<span aria-label="module complete" class="docon docon-check"></span>';
            }
        });
    }
    function loadModuleInformation(moduleId) {
        return getModule(msDocs.data.userLocale, moduleId).then(function(result) {
            return result;
        });
    }
    function displayRelatedLearningPaths(parents) {
        var template = function(paths) {
            return '\n\t<h2 class="title is-size-6 is-marginless-bottom">This module is part of these learning paths</h2>\n\t<ul class="is-marginless-bottom is-marginless-left is-marginless-right">\n\t\t' + paths.map(function(path) {
                return '<li class="is-unstyled"><a href="' + path.url + '">' + path.title + "</a></li>";
            }).join("") + "\n\t</ul>\n\t";
        };
        document.getElementById("parent-learning-paths").innerHTML = template(parents);
    }
    function displayModuleDuration(durationInMinutes) {
        var element = document.querySelector(".module-duration-minutes");
        element.innerHTML = "- " + convertMinsToHrsMins(durationInMinutes);
    }
    function displayModuleUnitDuration(units) {
        var list = document.getElementById("unit-list");
        units.forEach(function(unit) {
            list.querySelector("li[data-unit-uid='" + unit.uid + "'] span").innerHTML = convertMinsToHrsMins(unit.durationInMinutes);
        });
    }
    function moduleUnitPage() {
        var unitId = getMeta("uid");
        getModule$1(unitId);
        renderInteractiveElement();
    }
    function getModule$1(unitId) {
        getModuleByUnit(msDocs.data.userLocale, unitId).then(function(module) {
            return contentLoaded.then(function() {
                var unitTotal = module.units.length;
                var unitIndex = module.units.findIndex(function(unit) {
                    return unit.uid === unitId;
                });
                buildUnitMenu(module, unitIndex);
                buildUnitNavigation(module.units, unitIndex, unitTotal);
            });
        }).catch(function(error) {});
    }
    function buildUnitNavigation(units, unitIndex, unitTotal) {
        var previousButton = document.getElementById("previous-unit-link");
        var nextButton = document.getElementById("next-unit-link");
        var unitPlace = document.getElementById("unit-place");
        var unitDetailText = loc.unitMarker.replace("{index}", (unitIndex + 1).toString()).replace("{total}", unitTotal.toString());
        unitPlace.innerText = unitDetailText;
        if (unitIndex !== 0) {
            previousButton.setAttribute("href", "/" + msDocs.data.userLocale + units[unitIndex - 1].url);
            previousButton.classList.remove("is-invisible");
        }
        if (unitIndex !== unitTotal) {
            nextButton.setAttribute("href", "/" + msDocs.data.userLocale + units[unitIndex + 1].url);
            nextButton.classList.remove("is-invisible");
        }
    }
    function buildUnitMenu(module, unitIndex) {
        var template = '\n\t<div class="columns is-mobile is-marginless">\n\t\t<div class="column is-12 is-paddingless-sides">\n\t\t\t<h2 class="is-size-5 is-marginless-top">' + module.title + '</h2>\n\t\t\t<ul class="is-marginless is-size-7 has-text-subtle is-unstyled" data-bi-name="module-menu-links">\n\t\t\t\t' + module.units.map(function(unit) {
            return '\n\t\t\t\t\t<li class="is-unstyled">\n\t\t\t\t\t\t<a href="/' + msDocs.data.userLocale + unit.url + '">' + unit.title + '</a>\n\t\t\t\t\t\t<span class="">' + unit.durationInMinutes + "min</span>\n\t\t\t\t\t</li>\n\t\t\t\t";
        }).join("") + "\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n\t";
        document.getElementById("module-menu").innerHTML = template;
        document.querySelector(".centered-navigation li:nth-of-type(" + (unitIndex + 1) + ")").classList.add("current");
    }
    function renderInteractiveElement() {
        var interactiveContainer = document.getElementById("interactive-container");
        var interactiveType = getMeta("interactive");
        if (!interactiveContainer || interactiveType === undefined) {
            return;
        }
        var interactiveComponent = interactiveTypes[interactiveType].getElement();
        interactiveContainer.appendChild(interactiveComponent);
    }
    function signInTemplate$1() {
        return "<p>" + loc.signInToSeeProfile + "</p>";
    }
    function authenticatedTemplate() {
        return '\n\t\t<h1 id="my-profile-name"></h1>\n\t\t<p id="my-profile-id"></p>\n\t\t<div class="profile-wrapper">\n\t' + (getMeta("hide_learn") === "true" ? "" : '\n\t\t\t<section>\n\t\t\t\t<div class="profile-card">\n\t\t\t\t\t<h2>' + loc.achievements + '</h2>\n\t\t\t\t\t<div id="my-profile-achievements">\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</section>\n\t') + ('\n\t\t\t<section class="data-control">\n\t\t\t\t<h2>' + loc.yourData + "</h2>\n\t\t\t\t<p>" + loc.yourDataDescription + '</p>\n\t\t\t\t<button data-bi-name="profile-create-archive" id="create-new-archive" class="button is-outline is-radiusless">\n\t\t\t\t\t' + loc.download + '\n\t\t\t\t</button>\n\t\t\t\t<button data-bi-name="profile-attempt-delete" id="delete-profile" class="button is-danger is-radiusless">\n\t\t\t\t\t' + loc.delete + '\n\t\t\t\t</button>\n\t\t\t\t<span class="archive-message" id="create-new-archive-information"></span>\n\t\t\t</section>\n\t\t</div>\n\t');
    }
    function achievementsSectionTemplate(achievements) {
        return !achievements.length ? loc.noAchievements.replace("{0}", getLearnHomeUrl()) : '\n\t\t\t<ul id="my-profile-achievements" class="achievements-list">\n\t\t\t\t' + achievements.map(achievementTemplate).join("\n") + '\n\t\t\t</ul>\n\t\t\t<a href="' + getLearnHomeUrl() + '">' + loc.earnMoreAchievements + "</a>\n\t\t";
    }
    function achievementTemplate(achievement) {
        return '<li tabindex="0">\n\t\t<img src="' + achievement.imageUrl + '" role="presentation" alt="" />\n\t\t<div class="achievement-card visually-hidden">\n\t\t\t<h3>' + achievement.title + "</h3>\n\t\t\t<p>" + loc.receivedAchievement.replace("{0}", achievement.earnedAt ? timeAgo(Date.now(), new Date(achievement.earnedAt)) : "").replace("{1}", '<a href="' + achievement.sourceItem.url + '">' + achievement.sourceItem.title + "</a>") + '</p>\n\t\t\t<ul class="share">\n\t\t\t\t<li><a data-bi-name="facebook" class="share-facebook" href="#" aria-label="' + loc.shareAchievement.replace("{0}", "Facebook") + '"><span class="docon docon-brand-facebook" aria-hidden="true"></span></a></li>\n\t\t\t\t<li><a data-bi-name="linkedin" class="share-linkedin" href="#" aria-label="' + loc.shareAchievement.replace("{0}", "LinkedIn") + '"><span class="docon docon-brand-linkedin" aria-hidden="true"></span></a></li>\n\t\t\t\t<li><a data-bi-name="twitter" class="share-twitter" href="#" aria-label="' + loc.shareAchievement.replace("{0}", "Twitter") + '"><span class="docon docon-brand-twitter" aria-hidden="true"></span></a></li>\n\t\t\t</ul>\n\t\t</div>\n\t</li>';
    }
    function deleteProfileConfirmationTemplate() {
        return '\n\t\t<section class="dialog-message">\n\t\t\t<h1>' + loc.areYouSure + "</h1>\n\t\t\t<p>" + loc.areYouSureDescription + '</p>\n\t\t\t<div class="dialog-actions">\n\t\t\t\t<button id="close-delete-dialog" data-bi-name="profile-cancel-delete" class="button is-outline is-radiusless">' + loc.close + '</button>\n\t\t\t\t<button id="delete-profile" data-bi-name="profile-confirm-delete" class="button is-danger is-radiusless">' + loc.delete + "</button>\n\t\t\t</div>\n\t\t</section>\n\t";
    }
    function progressBarTemplate() {
        return '\n\t<div class="c-progress f-indeterminate-regional" role="progressbar" aria-valuetext="' + loc.loading + '" tabindex="0" aria-label="indeterminate regional progress bar">\n\t\t<span></span>\n\t\t<span></span>\n\t\t<span></span>\n\t\t<span></span>\n\t\t<span></span>\n\t</div>\n\t';
    }
    function myProfilePage(element) {
        element.innerHTML = progressBarTemplate();
        return authStatusDetermined.then(function() {
            renderProfileUI(user, element);
            user.subscribe(UserChangedEvent, function() {
                return renderProfileUI(user, element);
            });
        });
    }
    function renderProfileUI(user$$1, element) {
        return contentLoaded.then(function() {
            if (!user$$1.isAuthenticated) {
                element.innerHTML = signInTemplate$1();
                return Promise.resolve();
            }
            element.innerHTML = authenticatedTemplate();
            element.querySelector("#my-profile-name").innerText = user$$1.name;
            element.querySelector("#my-profile-id").innerText = user$$1.email;
            element.querySelector("#create-new-archive").addEventListener("click", exportUserProgressHandler);
            element.querySelector("#delete-profile").addEventListener("click", confirmDeleteUserProgressHandler);
            var achievementsElement = element.querySelector("#my-profile-achievements");
            setupAchievementsEventHandlers(achievementsElement);
            return getMeta("hide_learn") === "true" ? Promise.resolve() : displayAchievements(achievementsElement, msDocs.data.userLocale);
        });
    }
    function displayAchievements(element, locale) {
        if (getMeta("hide_learn") !== "true") {
            element.innerHTML = progressBarTemplate();
            return getAchievements(locale).then(function(achievements) {
                element.innerHTML = achievementsSectionTemplate(achievements);
                Array.from(element.querySelectorAll(".share")).forEach(function(shareElement, index) {
                    var achievement = achievements[index];
                    initSharingLinks(shareElement, location$1.origin + "/" + msDocs.data.userLocale + achievement.sourceItem.url, loc.achievementsBlastMessage.replace("{0}", achievement.sourceItem.title));
                });
            });
        }
        return Promise.resolve();
    }
    function exportUserProgressHandler(event) {
        var target = event.target;
        target.classList.add("is-loading");
        var infoElement = document$1.querySelector("#create-new-archive-information");
        infoElement.innerHTML = "";
        return exportUserProgress(msDocs.data.userLocale).then(function(response) {
            target.classList.remove("is-loading");
            if (response) {
                location$1.href = response;
                infoElement.innerHTML = "";
            } else {
                infoElement.innerHTML = loc.exportProfileNoInformation;
            }
        }).catch(function() {
            target.classList.remove("is-loading");
        });
    }
    function confirmDeleteUserProgressHandler(event, dialog) {
        dialog = dialog || new Dialog();
        var viewElement = document$1.createElement("div");
        viewElement.innerHTML = deleteProfileConfirmationTemplate();
        viewElement.querySelector("#close-delete-dialog").addEventListener("click", dialog.hide.bind(dialog));
        viewElement.querySelector("#delete-profile").addEventListener("click", function(event) {
            deleteUserProgressHandler(event);
        });
        dialog.show(viewElement, {
            label: loc.areYouSureDescription,
            modal: true,
            customizeCloseButton: true
        });
    }
    function deleteUserProgressHandler(event) {
        var target = event.target;
        target.classList.add("is-loading");
        return deleteUserProgress().then(function(success) {
            if (success) {
                user.signout();
            } else {
                target.classList.remove("is-loading");
            }
        }).catch(function() {
            target.classList.remove("is-loading");
        });
    }
    function setupAchievementsEventHandlers(element) {
        if (getMeta("hide_learn") !== "true") {
            var show = function(event) {
                Array.from(element.querySelectorAll(".achievement-card")).forEach(function(cardElement) {
                    cardElement.classList.add("visually-hidden");
                    if (cardElement.parentElement === event.target || cardElement.parentElement.contains(event.target)) {
                        cardElement.classList.remove("visually-hidden");
                    }
                });
            };
            var hide = function(event) {
                var card = event.target.querySelector(".achievement-card");
                if (card) {
                    card.classList.add("visually-hidden");
                }
            };
            element.addEventListener("focusin", show);
            element.addEventListener("mouseover", show);
            element.addEventListener("mouseleave", hide);
        }
    }
    function namepaceListPage() {
        var followedByNamespaceTable = function() {
            var $next = $(this).next();
            return $next.is("div") && $next.hasClass("mx-namespace");
        };
        var filterList = function(inputField) {
            var val = $(inputField).val().toLowerCase();
            if (val && val.length) {
                var resultIsEmpty_1 = true;
                $(".mx-namespace td:nth-child(1)").each(function() {
                    var $this = $(this);
                    var $link = $this.find("a");
                    if ($link.length > 0 && $link.attr("data-name").indexOf(val) !== -1 || $this.text().toLowerCase().indexOf(val) !== -1) {
                        resultIsEmpty_1 = false;
                        $this.parents("tr").show();
                    } else {
                        $this.parents("tr").hide();
                    }
                });
                if (resultIsEmpty_1) {
                    $(".emptyFilterMessage").show();
                    $(".content h2").filter(followedByNamespaceTable).hide();
                } else {
                    $(".emptyFilterMessage").hide();
                    $(".content h2").filter(followedByNamespaceTable).each(function() {
                        var $this = $(this);
                        if ($this.next().find("tr:visible").length > 0) {
                            $this.show();
                            $this.next().show();
                        } else {
                            $this.hide();
                            $this.next().hide();
                        }
                    });
                }
            } else {
                $(".emptyFilterMessage").hide();
                $(".content h2").show();
                $(".mx-namespace").show();
                $(".mx-namespace tr").show();
            }
        };
        var init = function() {
            $(".mx-namespace table").each(function() {
                $(this).addClass("nameValue");
            });
            $(".mx-namespace td:nth-child(1) a").each(function() {
                var $this = $(this);
                $this.attr("data-name", $this.text().toLowerCase());
                $this.html(breakText(escape$1($this.text()), true));
            });
            var $namespaceForm = $(".mx-namespaceForm");
            if ($namespaceForm.length) {
                var $nsformHolder = $("<div>").addClass("nsformHolder");
                var $formFilter = $("<form>").submit(function(e) {
                    e.preventDefault();
                });
                var $formInput = $("<input>").attr("type", "search").attr("placeholder", "Filter").keypress(function(e) {
                    if (e.which === 13) {
                        e.preventDefault();
                        return;
                    }
                }).keyup(function() {
                    filterList(this);
                });
                $formFilter.append($formInput);
                $nsformHolder.append($formFilter);
                var $nsFormActions = $("<div>").addClass("nsformActions");
                $nsFormActions.append($("<div>").addClass("pdfDownloadHolder"));
                $nsformHolder.append($nsFormActions);
                $namespaceForm.append($nsformHolder);
                $namespaceForm.append($("<div>").addClass("emptyFilterMessage").html("No results"));
            }
        };
        init();
    }
    function createSearchTermsFromPath() {
        return removeLocaleFromPath(location.pathname).replace(/\/|-/g, " ").trim();
    }
    function createSearchUrlFromPath() {
        var terms = encodeURIComponent(createSearchTermsFromPath()).replace(/\s+/g, "+");
        return "https://docs.microsoft.com/en-us/search/index?search=" + terms;
    }
    function notFoundPage() {
        var links = document.querySelector(".suggested-links");
        var SUGGESTION_LIMIT = 5;
        var searchTermLink = document.getElementById("term-to-search");
        searchTermLink.href = createSearchUrlFromPath();
        var placeholderLinks = {
            counter: 5,
            facets: null,
            "@nextLink": "",
            results: [ {
                title: loc.windowsDocs,
                url: "https://docs.microsoft.com/windows",
                description: "",
                lastUpdatedDate: "",
                breadcrumbs: []
            }, {
                title: loc.azureDocs,
                url: "https://docs.microsoft.com/azure/",
                description: "",
                lastUpdatedDate: "",
                breadcrumbs: []
            }, {
                title: loc.visualStudioDocs,
                url: "https://docs.microsoft.com/visualstudio/products/",
                description: "",
                lastUpdatedDate: "",
                breadcrumbs: []
            }, {
                title: loc.officeDocs,
                url: "https://docs.microsoft.com/office/",
                description: "",
                lastUpdatedDate: "",
                breadcrumbs: []
            }, {
                title: loc.dotnetDocs,
                url: "https://docs.microsoft.com/dotnet/",
                description: "",
                lastUpdatedDate: "",
                breadcrumbs: []
            } ]
        };
        var apiConfig = {
            search: createSearchTermsFromPath(),
            locale: msDocs.data.userLocale,
            $top: SUGGESTION_LIMIT
        };
        fetchWithTimeout("https://docs.microsoft.com/api/search?" + toQueryString(apiConfig)).then(function(response) {
            return response.ok ? response.json() : placeholderLinks;
        }).then(function(search) {
            var suggestions = search.results.length ? search.results : placeholderLinks.results;
            for (var i = 0; i < SUGGESTION_LIMIT; i++) {
                links.insertAdjacentHTML("beforeend", '\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<a href="' + suggestions[i].url + '" data-bi-name="404-suggested-link">' + suggestions[i].title + "</a></li>\n\t\t\t\t\t</li>\n\t\t\t\t");
            }
        });
        return links;
    }
    function referencePage() {
        $(".derivedClassesButton").click(function() {
            var hdc = $(".hiddenDerivedClass[hidden]");
            if (hdc.length) {
                hdc.removeAttr("hidden");
                $(".derivedClassesButton").html("Less&#8230;");
            } else {
                $(".hiddenDerivedClass").attr("hidden", "true");
                $(".derivedClassesButton").html("More&#8230;");
                window.location.hash = "#derived";
            }
            return false;
        });
        $(".globalParamsHolder>a").click(function() {
            var $div = $(this).parent();
            if ($div.attr("aria-expanded") === "true") {
                $div.attr("aria-expanded", "false");
            } else {
                $div.attr("aria-expanded", "true");
            }
            return false;
        });
    }
    function searchPage() {
        var formatNumber = function(num) {
            return num.toString().replace(/\d(?=(\d{3})+$)/g, "$&,");
        };
        var encodeSearchValue = function(searchValue) {
            var map = {
                "(": "%28",
                ")": "%29",
                "'": "%27"
            };
            return encodeURIComponent(searchValue).replace(/[\(\)']/g, function(match) {
                return map[match];
            });
        };
        var queryString = parseQueryString();
        var searchValue = queryString.search === undefined ? "" : queryString.search;
        var encodedSearchValue = searchValue.split(" ").map(encodeSearchValue).join("+");
        var dataSource;
        if (queryString.hasOwnProperty("dataSource")) {
            dataSource = queryString.dataSource;
        }
        var skipValue = queryString.skip;
        var scopeValue = queryString.scope;
        var pageSize = 10;
        var selectedPageBuffer = 4;
        if (searchValue.length > 0) {
            var resultsDiv_1 = $(".searchResults");
            resultsDiv_1.append("<div class='searchResultItem'>" + loc.loading + "</div>");
            var skipParam_1 = "";
            var skipCount_1 = 0;
            if (skipValue) {
                skipParam_1 = "&$skip=" + encodeURIComponent(skipValue);
            }
            var scopeApiParam = "";
            var scopeUrlParam_1 = "";
            var dataSourceUrlParam_1 = "";
            if (scopeValue) {
                scopeApiParam = "&$filter=" + encodeURIComponent("scopes/any(t: t eq '" + scopeValue + "')");
                scopeUrlParam_1 = "&scope=" + encodeURIComponent(scopeValue);
            }
            if (dataSource) {
                dataSourceUrlParam_1 = "&dataSource=" + encodeURIComponent(dataSource);
            }
            var basePath = "https://docs.microsoft.com/api/search";
            var rssPath_1 = basePath + "/rss";
            var params_1 = "?search=" + encodedSearchValue + "&locale=" + encodeURIComponent(msDocs.data.userLocale) + dataSourceUrlParam_1 + scopeApiParam;
            $.ajax({
                url: basePath + params_1 + "&$top=" + pageSize + skipParam_1,
                dataType: "json",
                global: false
            }).done(function(data) {
                $(".searchPage h1").wrap('<div class="header-container"></div>').append("<span>" + formatNumber(data.count) + " " + loc["results.title"] + ' "' + escape$1(searchValue) + '"</span>');
                $(".searchPage h1").after('<div class="feed-rss"><a href="' + rssPath_1 + params_1 + '" class="link-rss" aria-label="' + loc.clickForRSS + '"><span class="docon docon-feed" aria-hidden="true"></span><span>' + loc.rss + "</span></a></div>");
                resultsDiv_1.empty();
                if (data.count > 0) {
                    var datePrefix_1 = loc["last.updated"];
                    var index_1 = 0;
                    data.results.forEach(function(r) {
                        var html = [];
                        var dateVal = new Date(r.lastUpdatedDate);
                        html.push("<div><a data-bi-name='searchItem." + index_1 + "' href='" + r.url + "'>" + escape$1(r.title) + "</a>");
                        if (r.breadcrumbs !== undefined && r.breadcrumbs.length > 0) {
                            html.push("<ul>");
                            r.breadcrumbs.forEach(function(obj) {
                                html.push("<li><a data-bi-name='searchItem." + index_1 + ".breadcrumb' href='" + obj.url + "'>" + escape$1(obj.name) + "</a></li>");
                            });
                            html.push("</ul>");
                        }
                        if (r.description !== null) {
                            html.push("<div>" + r.description + "</div>");
                        } else {
                            html.push("<div class='na'>" + loc["no.description"] + "</div>");
                        }
                        if (r.lastUpdatedDate !== null) {
                            html.push("<div class='date'>" + datePrefix_1 + " <time datetime='" + dateVal.toISOString() + "'>" + dateVal.toLocaleDateString(msDocs.data.userLocale, {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit"
                            }) + "</time></div>");
                        } else {
                            html.push("<div class='date na'>" + loc["no.date"] + "</div>");
                        }
                        html.push("</div>");
                        resultsDiv_1.append("<div class='searchResultItem'>" + html.join("") + "</div>");
                        index_1++;
                    });
                    var pagingDiv = $(".searchPaging ul");
                    var pageCount = Math.ceil(data.count / pageSize);
                    var pageUrl = location.href.replace(location.search, "") + "?search=" + encodedSearchValue;
                    var pageIndex = 0;
                    var aClass = "";
                    var liClass = "";
                    skipParam_1 = "";
                    if (parseInt(skipValue) > 0) {
                        pageIndex = parseInt(skipValue) / pageSize;
                    }
                    if (pageIndex > 0) {
                        if (pageIndex - 1 > 0) {
                            skipCount_1 = (pageIndex - 1) * pageSize;
                            skipParam_1 = "&skip=" + skipCount_1;
                        } else {
                            skipParam_1 = "";
                        }
                        pagingDiv.append('<li><a href="' + pageUrl + skipParam_1 + scopeUrlParam_1 + ' aria-label="' + msDocs.loc.previousPage + '"><span class="docon docon-arrow-left" aria-hidden="true"></span></a></li>');
                    }
                    for (var i = 0; i < pageCount; i++) {
                        if (i >= pageIndex - selectedPageBuffer && i <= pageIndex + selectedPageBuffer) {
                            liClass = aClass = "";
                            if (i > 0) {
                                skipCount_1 = i * pageSize;
                                skipParam_1 = "&skip=" + skipCount_1;
                            } else {
                                skipParam_1 = "";
                            }
                            if (i === pageIndex) {
                                aClass = "class='selected' ";
                            } else {
                                if (i < pageIndex && pageIndex - i > selectedPageBuffer * .5) {
                                    liClass = " class='edge'";
                                } else if (i > pageIndex && i - pageIndex > selectedPageBuffer * .5) {
                                    liClass = " class='edge'";
                                }
                            }
                            pagingDiv.append("<li" + liClass + "><a " + aClass + "href='" + pageUrl + skipParam_1 + scopeUrlParam_1 + dataSourceUrlParam_1 + "' aria-label='" + msDocs.loc.page.replace("{0}", String(i + 1)) + "'>" + (i + 1) + "</a></li>");
                        }
                    }
                    if (pageIndex < pageCount - 1) {
                        skipCount_1 = (pageIndex + 1) * pageSize;
                        skipParam_1 = "&skip=" + skipCount_1;
                        pagingDiv.append('<li><a href="' + pageUrl + skipParam_1 + scopeUrlParam_1 + dataSourceUrlParam_1 + '" aria-label="' + msDocs.loc.nextPage + '"><span class="docon docon-arrow-right"></span></a></li>');
                    }
                } else {
                    resultsDiv_1.append("<div class='searchResultItem'><h2>" + loc["no.results"] + "</h2></div>");
                }
                jsllReady.then(function(awa) {
                    awa.ct.captureContentPageAction({
                        behavior: awa.behavior.OTHER,
                        actionType: awa.actionType.OTHER,
                        content: {
                            event: "uhf-search-results",
                            term: searchValue,
                            results: data.count,
                            skip: skipCount_1 ? skipValue : "0",
                            dataSource: dataSource || ""
                        }
                    });
                });
            });
        } else {
            $(".searchPage h1").append(loc["no.search.term"]);
        }
    }
    var CombinedProgressService = function() {
        function CombinedProgressService(user, unitUid, progressTransferred) {
            var _this = this;
            this.user = user;
            if (unitUid) {
                this.remote = new RemoteProgressService(unitUid);
                user.whenAuthenticated().then(function() {
                    return _this.transferProgress();
                }).then(progressTransferred);
            }
            this.local = new LocalProgressService(localStorage$2, "section_" + location.pathname.replace(/[^a-zA-Z\d\s]+/g, "_"));
        }
        CombinedProgressService.prototype.getProgress = function() {
            return this.user.isAuthenticated && this.remote ? this.remote.getProgress() : this.local.getProgress();
        };
        CombinedProgressService.prototype.setProgress = function(step) {
            return this.user.isAuthenticated && this.remote ? this.remote.setProgress(step) : this.local.setProgress(step);
        };
        CombinedProgressService.prototype.transferProgress = function() {
            var _this = this;
            return Promise.all([ this.local.getProgress(), this.remote.getProgress() ]).then(function(_a) {
                var localProgress = _a[0], remoteProgress = _a[1];
                if (localProgress.isEmpty || !remoteProgress.isEmpty) {
                    return remoteProgress;
                }
                return Promise.all(Object.keys(localProgress).filter(function(step) {
                    return /^\d+$/.test(step) && localProgress[step];
                }).map(function(step) {
                    return parseInt(step);
                }).map(function(step) {
                    return _this.remote.setProgress(step);
                })).then(function() {
                    return localProgress;
                });
            });
        };
        return CombinedProgressService;
    }();
    var LocalProgressService = function() {
        function LocalProgressService(localStorage, pageId) {
            this.localStorage = localStorage;
            this.pageId = pageId;
            this.key = "tutorialProgress";
        }
        LocalProgressService.prototype.getProgress = function() {
            var data = this.getFromStorage();
            var pageData = data[this.pageId];
            if (!pageData) {
                return Promise.resolve({
                    quizComplete: false,
                    isEmpty: true
                });
            }
            var newFormat = Object.keys(pageData).filter(function(k) {
                return /^#step-\d+$/.test(k);
            }).reduce(function(progress, k) {
                progress[+k.substr(6)] = true;
                progress.isEmpty = false;
                return progress;
            }, {
                isEmpty: true
            });
            return Promise.resolve(newFormat);
        };
        LocalProgressService.prototype.setProgress = function(step) {
            var data = this.getFromStorage();
            if (!data[this.pageId]) {
                data[this.pageId] = {};
            }
            var pageData = data[this.pageId];
            pageData["#step-" + step] = true;
            this.localStorage.setItem(this.key, JSON.stringify(data));
            return Promise.resolve();
        };
        LocalProgressService.prototype.getFromStorage = function() {
            var serialized = this.localStorage.getItem(this.key);
            if (serialized === null) {
                return {};
            }
            var data = null;
            try {
                data = JSON.parse(serialized);
            } catch (e) {}
            return data || {};
        };
        return LocalProgressService;
    }();
    var RemoteProgressService = function() {
        function RemoteProgressService(unitUid) {
            this.unitUid = unitUid;
        }
        RemoteProgressService.prototype.getProgress = function() {
            var _this = this;
            return getUnitProgress(this.unitUid).then(function(data) {
                return _this.processProgressData(data);
            });
        };
        RemoteProgressService.prototype.setProgress = function(step) {
            return putUnitProgress(this.unitUid, this.unitUid + "-step-" + step).then(function() {});
        };
        RemoteProgressService.prototype.processProgressData = function(data) {
            if (data === null) {
                return {
                    isEmpty: true
                };
            }
            return data.items.reduce(function(progress, step) {
                var index = parseInt(/\d+$/.exec(step.uid)[0]);
                progress[index] = step.isCompleted;
                progress.isEmpty = false;
                return progress;
            }, {
                isEmpty: true
            });
        };
        return RemoteProgressService;
    }();
    var argName = "tutorial-step";
    var mobileQuery$1 = window.matchMedia("screen and (max-width: 768px)");
    var progressService;
    var autoExpand = false;
    var minStep = msDocs.data.context.chromeless && getMeta("labUrl") ? 1 : 0;
    function tutorialPage() {
        contentLoaded.then(function() {
            if (msDocs.data.context.chromeless) {
                var prevButton = document.querySelector(".tutorial-step:nth-of-type(2) .tutorial-nav-button-previous");
                prevButton.parentElement.removeChild(prevButton);
            }
            var unitUid = getMeta("uid");
            progressService = new LocalProgressService(localStorage$2, "section_" + location.pathname.replace(/[^a-zA-Z\d\s]+/g, "_"));
            processQueryString();
            addEventListener("content-update", addRunButtons);
            addEventListener("popstate", function() {
                return processQueryString();
            });
            addEventListener("click", handleStepNavClick);
        });
    }
    function readStepFromQueryString() {
        var rawStep = parseQueryString()[argName] || "0";
        if (/^\d+$/.test(rawStep)) {
            return parseInt(rawStep);
        }
        return 0;
    }
    function processQueryString() {
        var step = readStepFromQueryString();
        if (step === 0) {
            autoExpand = true;
        }
        showStep(step);
    }
    function showStep(step) {
        var steps = document.querySelectorAll(".tutorial-step");
        if (step <= minStep || step >= steps.length) {
            step = minStep;
            var args = parseQueryString();
            args[argName] = step === 0 ? null : step.toString();
            updateQueryString(args, "replaceState");
        }
        progressService.getProgress().then(renderToc);
        progressService.setProgress(step);
        var isFirst = step === 0;
        var isLast = step === steps.length - 1;
        var hasInteractive = !isFirst && !isLast && msDocs.data.tutorialInteractiveType && !msDocs.data.context.chromeless;
        var fallback = document.createElement("span");
        var h1 = document.querySelector("h1");
        var metadata = document.querySelector(".page-metadata") || fallback;
        var feedback = document.querySelector(".feedback-section") || fallback;
        var liveFyre = document.getElementById("comments-container") || fallback;
        var feedbackSystemAlert = document.querySelector(".feedback-system-change-alert") || fallback;
        var pageActionList = document.querySelector(".action-list") || fallback;
        var feedbackPageAction = (document.querySelector('.action-list a[href="#feedback"]') || fallback).parentElement || fallback;
        var rightContainer = document.querySelector("#right-container");
        h1.hidden = !isFirst;
        metadata.hidden = !isFirst;
        feedback.hidden = !isLast;
        feedbackPageAction.hidden = !isLast;
        liveFyre.hidden = !isLast;
        feedbackSystemAlert.hidden = !isLast;
        pageActionList.hidden = !isFirst && !isLast;
        rightContainer.hidden = !isFirst && !isLast;
        if (hasInteractive) {
            document.documentElement.classList.remove("hasPageActions");
        } else {
            document.documentElement.classList.add("hasPageActions");
        }
        Array.from(steps).forEach(function(s, i) {
            return s.hidden = i !== step;
        });
        notifyContentUpdated();
        scrollContentToTop();
        if (hasInteractive) {
            ensureInteractive();
        } else {
            collapseActionPanel();
        }
    }
    function ensureInteractive() {
        var actionPanel = getActionPanel(autoExpand && !mobileQuery$1.matches ? "animate" : "none");
        autoExpand = false;
        if (actionPanel.firstElementChild) {
            return;
        }
        var interactiveComponent = interactiveTypes[msDocs.data.tutorialInteractiveType].getElement();
        actionPanel.appendChild(interactiveComponent);
    }
    function handleStepNavClick(event) {
        if (!(event.target instanceof HTMLElement)) {
            return;
        }
        var anchor = event.target.closest(".tutorial-nav-behavior");
        if (!anchor) {
            return;
        }
        var targetStep = parseQueryString(anchor.search)[argName];
        if (targetStep === undefined) {
            return;
        }
        event.preventDefault();
        var args = parseQueryString(location.search);
        args[argName] = targetStep;
        updateQueryString(args, "pushState");
        processQueryString();
    }
    function renderToc(progress) {
        if (msDocs.data.context.chromeless) {
            return;
        }
        var activeStep = readStepFromQueryString();
        var checkMark = '<svg class="check-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path d="M160 397.255L9.373 246.627l45.255-45.254L160 306.745 393.373 73.373l45.254 45.255L160 397.255z"/></svg>';
        var steps = Array.from(document.querySelectorAll(".tutorial-step")).map(function(section, index) {
            return {
                index: index,
                title: section.getAttribute("tutorial-step-title"),
                type: section.getAttribute("tutorial-step-type")
            };
        });
        document.querySelector(".toc").innerHTML = '\n\t\t<ol class="tutorial-toc">\n\t\t\t' + steps.map(function(_a) {
            var index = _a.index, type = _a.type, title = _a.title;
            return '\n\t\t\t<li class="' + (progress[index] ? "completed-step" : "") + " " + (index === activeStep ? "active-step" : "") + '">\n\t\t\t\t<a class="tutorial-nav-behavior" href="?tutorial-step=' + index + '">\n\t\t\t\t\t' + checkMark + "\n\t\t\t\t\t<span>" + title + "</span>\n\t\t\t\t</a>\n\t\t\t</li>";
        }).join("") + "\n\t\t</ol>";
    }
    function addRunButtons() {
        var type = msDocs.data.tutorialInteractiveType;
        if (!type) {
            return;
        }
        var selector = 'section.tutorial-step:not(:first-of-type):not(:last-of-type) .codeHeader + pre > code[class="lang-' + type + '"]';
        var blocks = Array.from(document.querySelectorAll(selector)).map(function(block) {
            return block.parentElement.previousElementSibling;
        }).filter(function(header) {
            return !header.querySelector(".ap-expand-behavior");
        }).forEach(function(header) {
            header.insertAdjacentHTML("beforeend", '\n\t\t\t\t<button class="action ap-expand-behavior ap-collapsed" data-bi-name="code-header-try-it-' + type + '">\n\t\t\t\t\t<span class="docon docon-play" aria-hidden="true"></span>\n\t\t\t\t\t' + loc["try.it"] + "\n\t\t\t\t</button>\n\t\t\t");
        });
    }
    function pageTemplateSpecific(pageTemplate) {
        switch (pageTemplate) {
          case "ApiBrowserPage":
            apiBrowserPage();
            break;

          case "Home":
            homePage();
            break;

          case "Hub":
            hubPage();
            break;

          case "HubPage":
            hubPagePage();
            break;

          case "LandingPage":
            landingPage();
            break;

          case "LocalePage":
            localePage();
            break;

          case "NamespaceListPage":
            namepaceListPage();
            break;

          case "NotFound":
            notFoundPage();
            break;

          case "ProfileList":
            profileListPage();
            break;

          case "Reference":
            referencePage();
            break;

          case "SearchPage":
            searchPage();
            break;

          case "Tutorial":
            tutorialPage();
            break;

          case "MyProfile":
            myProfilePage(document$1.getElementById("main"));
            break;

          case "Module":
            modulePage();
            break;

          case "ModuleUnit":
            moduleUnitPage();
            break;

          case "LearningPath":
            learningPathPage();
            break;

          case "Sample":
            break;
        }
    }
    var BING_MAPS_KEY = "Apoz1_I8r9NMGHKv2saSMyFUvQaECEpRw9TVqq3RZajMaMMsmaj3NRK-jkiOabRt";
    var profiles;
    var activeProfiles;
    var filteredProfiles;
    var infobox;
    var clusterLayer;
    var map;
    var center;
    var filterInput;
    var pushpinOptions = {
        color: "#d73924"
    };
    function setupMap() {
        if (!msDocs.data.mapMode) {
            return;
        }
        var loadMapScenario = new Promise(function(resolve) {
            window.loadMapScenario = resolve;
        });
        Promise.all([ loadMapScenario, loadLibrary("https://www.bing.com/api/maps/mapcontrol?key=" + BING_MAPS_KEY + "&callback=loadMapScenario", "Microsoft") ]).then(function() {
            profiles = activeProfiles = msDocs.data.profileList;
            center = new Microsoft.Maps.Location(35.433847, -75.133743);
            filterInput = document.getElementById("filter-list-map");
            var queryStringValue = parseQueryString().filter;
            if (queryStringValue !== undefined && queryStringValue !== "") {
                filteredProfiles = searchFilterProfiles(queryStringValue, profiles);
                filterInput.value = queryStringValue;
            } else {
                filteredProfiles = profiles;
            }
            var mapConfig = {
                credentials: "",
                center: center,
                zoom: 3,
                minZoom: 3,
                maxZoom: 6,
                disableStreetside: true
            };
            map = new Microsoft.Maps.Map(document.getElementById("map"), mapConfig);
            infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
                visible: false,
                showCloseButton: false
            });
            infobox.setMap(map);
            updateClusterLayer(filteredProfiles, createCustomClusteredPin);
            Microsoft.Maps.Events.addHandler(map, "click", function(e) {
                infobox.setOptions({
                    visible: false
                });
            });
            filterInput.addEventListener("input", handleMapSearch);
            filterInput.addEventListener("change", handleMapSearch);
            filterInput.addEventListener("keydown", handleInfoboxVisiblity);
            var timeout;
            function handleMapSearch() {
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    map.layers.remove(clusterLayer);
                    filteredProfiles = searchFilterProfiles(escapeRegExp(filterInput.value), profiles);
                    updateClusterLayer(filteredProfiles, createCustomClusteredPin);
                    updateQueryString({
                        filter: filterInput.value
                    }, "replaceState");
                }, 300);
            }
            function handleInfoboxVisiblity() {
                if (infobox.getVisible()) {
                    infobox.setOptions({
                        visible: false
                    });
                }
            }
        });
    }
    function createPushpins(profileList) {
        var pushpins = [];
        activeProfiles = [];
        if (!profileList) {
            activeProfiles = profiles;
            return [];
        }
        if (profileList.length === 1) {
            var profile = profileList[0];
            activeProfiles.push(profileList[0]);
            var name = profile.name, _a = profile.location, display = _a.display, lat = _a.lat, long = _a.long;
            if (lat && long) {
                var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(lat, long), pushpinOptions);
                Microsoft.Maps.Events.addHandler(pushpin, "click", pushpinClicked);
                pushpins = [ pushpin ];
            }
        } else {
            pushpins = profileList.reduce(function(pins, profile) {
                var name = profile.name, _a = profile.location, display = _a.display, lat = _a.lat, long = _a.long;
                if (lat && long) {
                    activeProfiles.push(profile);
                    var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(lat, long), pushpinOptions);
                    Microsoft.Maps.Events.addHandler(pushpin, "click", pushpinClicked);
                    pins.push(pushpin);
                }
                return pins;
            }, []);
        }
        return pushpins;
    }
    function pushpinClicked(e) {
        showInfobox(e.target);
    }
    function showInfobox(pin) {
        var location = pin.getLocation();
        var listItems = "";
        var numOfPins;
        if (pin.containedPushpins !== undefined) {
            listItems = pinsToInfoboxHtml(pin.containedPushpins, activeProfiles);
        } else {
            listItems = pinsToInfoboxHtml([ pin ], activeProfiles);
        }
        var htmlContent = '<div class="map-infobox">\n\t\t\t\t\t\t\t<ul class="map-ul">\n\t\t\t\t\t\t\t\t' + listItems + "\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>";
        var infoboxOffset = getInfoboxOffset(numOfPins);
        infobox.setOptions({
            location: pin.getLocation(),
            htmlContent: htmlContent,
            visible: true,
            offset: new Microsoft.Maps.Point(24, infoboxOffset)
        });
        function pinsToInfoboxHtml(pushpins, profiles) {
            var htmlDict = {};
            var html = "";
            numOfPins = pushpins.length;
            pushpins.forEach(function(pin) {
                var location = pin.getLocation();
                profiles.forEach(function(profile) {
                    if (location.latitude === profile.location.lat && location.longitude === profile.location.long) {
                        if (!htmlDict["" + profile.name]) {
                            htmlDict["" + profile.name] = profile.html;
                        }
                    }
                });
            });
            for (var key in htmlDict) {
                html += htmlDict[key];
            }
            return html;
        }
        function getInfoboxOffset(numOfPins) {
            var offsetY = 42.5;
            if (numOfPins > 4) {
                numOfPins = 4;
            }
            offsetY = (offsetY + (numOfPins + 1)) * numOfPins;
            return -offsetY;
        }
    }
    function buildHtmlProfiles(profiles) {
        return profiles.map(function(profile) {
            var href = profile.uid.split(".").length > 1 ? "./" + String(profile.uid.split(".")[1]) : "./" + String(profile.uid.split(".")[0]);
            profile.location.display = checkForUndefined(profile.location.display);
            profile.twitter = profile.twitter ? '<p><a class="twitter" href="http://twitter.com/' + profile.twitter + '">' + profile.twitter + "</a></p>" : "";
            profile.tagline = profile.tagline ? '<p class="tagline">' + profile.tagline + "</p>" : "";
            profile.html = '\n\t\t\t<li class="map-profile-component">\n\t\t\t\t<a href="' + href + '" title="' + profile.name + '">\n\t\t\t\t\t<img class="profile-list-image" src="' + profile.image.src + '" alt="' + profile.image.alt + '">\n\t\t\t\t</a>\n\t\t\t\t<div class="profile-text">\n\t\t\t\t\t<a href="' + href + '" title="' + profile.name + '">\n\t\t\t\t\t\t<h3>' + profile.name + "</h3>\n\t\t\t\t\t</a>\n\t\t\t\t\t" + profile.twitter + "\n\t\t\t\t\t" + profile.tagline + "\n\t\t\t\t</div>\n\t\t\t</li>";
            profile.searchText = profile.name + " " + profile.twitter + " " + profile.tagline + " " + profile.location.display;
            return profile;
        }, {});
    }
    function searchFilterProfiles(searchTerm, arr) {
        var placeholder = document.querySelector(".no-results");
        var regex = new RegExp(searchTerm, "gi");
        placeholder.hidden = true;
        var filtered = arr.filter(function(profile) {
            if (profile.searchText.match(regex)) {
                return profile;
            }
        });
        if (filtered.length === 0) {
            placeholder.hidden = false;
            return [];
        } else {
            return filtered;
        }
    }
    function updateClusterLayer(profileList, clusteredPinCallback) {
        Microsoft.Maps.loadModule("Microsoft.Maps.Clustering", function() {
            var pins = createPushpins(profileList);
            clusterLayer = new Microsoft.Maps.ClusterLayer(pins, {
                clusteredPinCallback: clusteredPinCallback,
                gridSize: 120
            });
            var locations = clusterLayer.getPushpins().map(function(pin) {
                return pin.getLocation();
            });
            var rect = Microsoft.Maps.LocationRect.fromLocations(locations);
            map.setView({
                bounds: rect,
                zoom: 12,
                center: center
            });
            map.layers.insert(clusterLayer);
            if (locations.length === 1) {
                showInfobox(clusterLayer.getPushpins()[0]);
            }
        });
    }
    function createCustomClusteredPin(cluster) {
        cluster.setOptions(pushpinOptions);
        Microsoft.Maps.Events.addHandler(cluster, "click", pushpinClicked);
    }
    function checkForUndefined(value) {
        if (value === undefined) {
            return "";
        } else {
            return value;
        }
    }
    function wrapContentTables() {
        var tables = Array.from(document$1.querySelectorAll(".content table"));
        if (!tables.length) {
            return;
        }
        var wrappers = tables.map(function(table) {
            var wrapper = document$1.createElement("div");
            wrapper.classList.add("table-scroll-wrapper");
            table.parentElement.insertBefore(wrapper, table);
            wrapper.appendChild(table);
            return wrapper;
        });
        window$1.addEventListener("resize", throttle(function(event) {
            return addBorders(wrappers);
        }));
        addBorders(wrappers);
    }
    var addBorders = function(elements) {
        elements.forEach(function(wrapper) {
            var table = wrapper.firstElementChild;
            if (wrapper.clientWidth < table.clientWidth) {
                wrapper.classList.add("table-scroll-wrapper-scrollable");
            } else {
                wrapper.classList.remove("table-scroll-wrapper-scrollable");
            }
        });
    };
    var throttle = function(fn, thisArg) {
        var running = false;
        return function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!running) {
                running = true;
                window$1.requestAnimationFrame(function() {
                    fn.apply(thisArg, args);
                    running = false;
                });
            }
        };
    };
    var Tab = function() {
        function Tab(li, a, section) {
            this.li = li;
            this.a = a;
            this.section = section;
        }
        Object.defineProperty(Tab.prototype, "tabIds", {
            get: function() {
                return this.a.getAttribute("data-tab").split(" ");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "condition", {
            get: function() {
                return this.a.getAttribute("data-condition");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "visible", {
            get: function() {
                return !this.li.hasAttribute("hidden");
            },
            set: function(value) {
                if (value) {
                    this.li.removeAttribute("hidden");
                    this.li.removeAttribute("aria-hidden");
                } else {
                    this.li.setAttribute("hidden", "hidden");
                    this.li.setAttribute("aria-hidden", "true");
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "selected", {
            get: function() {
                return !this.section.hasAttribute("hidden");
            },
            set: function(value) {
                if (value) {
                    this.a.setAttribute("aria-selected", "true");
                    this.a.tabIndex = 0;
                    this.section.removeAttribute("hidden");
                    this.section.removeAttribute("aria-hidden");
                } else {
                    this.a.setAttribute("aria-selected", "false");
                    this.a.tabIndex = -1;
                    this.section.setAttribute("hidden", "hidden");
                    this.section.setAttribute("aria-hidden", "true");
                }
            },
            enumerable: true,
            configurable: true
        });
        Tab.prototype.focus = function() {
            this.a.focus();
        };
        return Tab;
    }();
    function updateVisibilityAndSelection(group, state) {
        var anySelected = false;
        var platformTab;
        var firstVisibleTab;
        for (var _i = 0, _a = group.tabs; _i < _a.length; _i++) {
            var tab = _a[_i];
            tab.visible = tab.condition === null || state.selectedTabs.indexOf(tab.condition) !== -1;
            if (tab.visible) {
                if (!firstVisibleTab) {
                    firstVisibleTab = tab;
                }
                if (!platformTab && tab.tabIds[0] === (preferredPlatform || platform)) {
                    platformTab = tab;
                }
            }
            tab.selected = tab.visible && arraysIntersect(state.selectedTabs, tab.tabIds);
            anySelected = anySelected || tab.selected;
        }
        if (!anySelected) {
            for (var _b = 0, _c = group.tabs; _b < _c.length; _b++) {
                var tabIds = _c[_b].tabIds;
                for (var _d = 0, tabIds_1 = tabIds; _d < tabIds_1.length; _d++) {
                    var tabId = tabIds_1[_d];
                    var index = state.selectedTabs.indexOf(tabId);
                    if (index === -1) {
                        continue;
                    }
                    state.selectedTabs.splice(index, 1);
                }
            }
            var tab = platformTab || firstVisibleTab;
            tab.selected = true;
            state.selectedTabs.push(tab.tabIds[0]);
        }
    }
    function initTabGroup(element) {
        var group = {
            independent: element.hasAttribute("data-tab-group-independent"),
            tabs: []
        };
        var li = element.firstElementChild.firstElementChild;
        while (li) {
            var a = li.firstElementChild;
            a.setAttribute(contentAttrs.name, "tab");
            var dataTab = a.getAttribute("data-tab").replace(/\+/g, " ");
            a.setAttribute("data-tab", dataTab);
            var id = a.getAttribute("aria-controls");
            var section = element.querySelector('[id="' + id + '"],[data-id="' + id + '"]');
            var tab = new Tab(li, a, section);
            group.tabs.push(tab);
            li = li.nextElementSibling;
        }
        element.setAttribute(contentAttrs.name, "tab-group");
        element.tabGroup = group;
        return group;
    }
    function initTabs(container) {
        var queryStringTabs = readTabsQueryStringParam();
        var elements = container.querySelectorAll(".tabGroup");
        var state = {
            groups: [],
            selectedTabs: []
        };
        for (var i = 0; i < elements.length; i++) {
            var group = initTabGroup(elements.item(i));
            if (!group.independent) {
                updateVisibilityAndSelection(group, state);
                state.groups.push(group);
            }
        }
        container.addEventListener("click", function(event) {
            return handleClick(event, state);
        });
        container.addEventListener("keydown", function(event) {
            return handleKeyDown(event);
        });
        if (state.groups.length === 0) {
            return state;
        }
        selectTabs(queryStringTabs, container);
        updateTabsQueryStringParam(state);
        notifyContentUpdated();
        return state;
    }
    function getTabInfoFromEvent(event) {
        if (!(event.target instanceof HTMLElement)) {
            return null;
        }
        var anchor = event.target.closest("a[data-tab]");
        if (anchor === null) {
            return null;
        }
        var tabIds = anchor.getAttribute("data-tab").split(" ");
        var group = anchor.parentElement.parentElement.parentElement.tabGroup;
        if (group === undefined) {
            return null;
        }
        return {
            tabIds: tabIds,
            group: group,
            anchor: anchor
        };
    }
    function handleClick(event, state) {
        var info = getTabInfoFromEvent(event);
        if (info === null) {
            return;
        }
        event.preventDefault();
        info.anchor.href = "javascript:";
        setTimeout(function() {
            return info.anchor.href = "#" + info.anchor.getAttribute("aria-controls");
        });
        var tabIds = info.tabIds, group = info.group;
        var originalTop = info.anchor.getBoundingClientRect().top;
        if (group.independent) {
            for (var _i = 0, _a = group.tabs; _i < _a.length; _i++) {
                var tab = _a[_i];
                tab.selected = arraysIntersect(tab.tabIds, tabIds);
            }
        } else {
            if (arraysIntersect(state.selectedTabs, tabIds)) {
                return;
            }
            var previousTabId = group.tabs.filter(function(t) {
                return t.selected;
            })[0].tabIds[0];
            state.selectedTabs.splice(state.selectedTabs.indexOf(previousTabId), 1, tabIds[0]);
            for (var _b = 0, _c = state.groups; _b < _c.length; _b++) {
                var group_1 = _c[_b];
                updateVisibilityAndSelection(group_1, state);
            }
            updateTabsQueryStringParam(state);
        }
        notifyContentUpdated();
        if (isPlatform(tabIds[0])) {
            setPreferredPlatform(tabIds[0]);
        }
        var top = info.anchor.getBoundingClientRect().top;
        if (top !== originalTop && event instanceof MouseEvent) {
            window$1.scrollTo(0, window$1.pageYOffset + top - originalTop);
        }
    }
    function handleKeyDown(event) {
        var info = getTabInfoFromEvent(event);
        if (info === null) {
            return;
        }
        var tabIds = info.tabIds, group = info.group;
        var key = event.which;
        if (!event.altKey && (key === keyCodes.left || key === keyCodes.right || key === keyCodes.home || key === keyCodes.end)) {
            event.preventDefault();
            var isLeft = key === keyCodes.left || key === keyCodes.home;
            var index = void 0;
            if (event.ctrlKey || key === keyCodes.home || key === keyCodes.end) {
                var increment = isLeft ? 1 : -1;
                index = isLeft ? 0 : group.tabs.length - 1;
                while (!group.tabs[index].visible) {
                    index += increment;
                }
            } else {
                var increment = isLeft ? -1 : 1;
                index = isLeft ? group.tabs.length - 1 : 0;
                while (group.tabs[index].tabIds[0] !== tabIds[0] || !group.tabs[index].visible) {
                    index += increment;
                }
                do {
                    index += increment;
                    if (index === -1) {
                        index = group.tabs.length - 1;
                    } else if (index === group.tabs.length) {
                        index = 0;
                    }
                } while (!group.tabs[index].visible);
            }
            group.tabs[index].focus();
            return;
        }
    }
    function selectTabs(tabIds, container) {
        for (var _i = 0, tabIds_2 = tabIds; _i < tabIds_2.length; _i++) {
            var tabId = tabIds_2[_i];
            var a = container.querySelector('.tabGroup > ul > li > a[data-tab="' + tabId + '"]:not([hidden])');
            if (a === null) {
                return;
            }
            a.dispatchEvent(new CustomEvent("click", {
                bubbles: true
            }));
        }
    }
    function readTabsQueryStringParam() {
        var qs = parseQueryString();
        var t = qs.tabs;
        if (t === undefined || t === "") {
            return [];
        }
        return t.split(",");
    }
    function updateTabsQueryStringParam(state) {
        var qs = parseQueryString();
        qs.tabs = state.selectedTabs.join();
        var url = location$1.protocol + "//" + location$1.host + location$1.pathname + "?" + toQueryString(qs) + location$1.hash;
        if (location$1.href === url) {
            return;
        }
        history.replaceState({}, document$1.title, url);
    }
    function arraysIntersect(a, b) {
        for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
            var itemA = a_1[_i];
            for (var _a = 0, b_1 = b; _a < b_1.length; _a++) {
                var itemB = b_1[_a];
                if (itemA === itemB) {
                    return true;
                }
            }
        }
        return false;
    }
    var themeMap = {
        light: {
            black: "hsla(0, 0%, 0%, 1)",
            "black-hover": "hsla(0, 0%, 18%, 1)",
            "black-active": "hsla(0, 0%, 21%, 1)",
            "black-box-shadow": "hsla(0, 0%, 0%, .25)",
            "black-static": "hsla(0, 0%, 0%, .999)",
            "black-10": "hsla(0, 0%, 0%, 0.1)",
            "black-20": "hsla(0, 0%, 0%, 0.2)",
            "black-80": "hsla(0, 0%, 0%, 0.8)",
            "black-bis": "hsla(0, 0%, 9%, 1)",
            "black-ter": "hsla(0, 0%, 18%, .999)",
            "grey-darkest": "hsla(0, 0%, 9%, .999)",
            "grey-darker": "hsla(0, 0%, 19%, 1)",
            "grey-darker-hover": "hsla(0, 0%, 21%, .999)",
            "grey-darker-active": "hsla(0, 0%, 23%, 1)",
            "grey-darker-box-shadow": "hsla(0, 0%, 18%, .25)",
            "grey-darker-static": "hsla(0, 0%, 18%, .998)",
            "grey-dark-30": "hsla(0, 0%, 21%, .3)",
            "grey-dark": "hsla(0, 0%, 27%, 1)",
            grey: "hsla(0, 0%, 46%, 1)",
            "grey-hover": "hsla(0, 0%, 49%, 1)",
            "grey-active": "hsla(0, 0%, 51%, 1)",
            "grey-box-shadow": "hsla(0, 0%, 46%, .25)",
            "grey-light": "hsla(0, 0%, 67%, 1)",
            "grey-lighter": "hsla(0, 0%, 89%, 1)",
            "grey-lightest": "hsla(0, 0%, 95%, 1)",
            "grey-50": "hsla(0, 0%, 52%, .5)",
            "blue-darkest": "hsla(216, 100%, 12%, 1)",
            "blue-darker": "hsla(216, 100%, 22%, 1)",
            "blue-dark": "hsla(216, 100%, 32%, 1)",
            "blue-static": "hsla(216, 99%, 39%, 1)",
            blue: "hsla(216, 100%, 39%, 1)",
            "blue-bg": "hsla(0, 0, 0, .998)",
            "blue-hover": "hsla(216, 100%, 42%, 1)",
            "blue-active": "hsla(216, 100%, 44%, 1)",
            "blue-box-shadow": "hsla(216, 100%, 39%, .25)",
            "blue-light": "hsla(216, 100%, 52%, 1)",
            "blue-lighter": "hsla(216, 100%, 67%, 1)",
            "blue-lightest": "hsla(216, 100%, 82%, 1)",
            "blue-05": "hsla(216, 100%, 39%, .05)",
            "blue-10": "hsla(216, 100%, 39%, .1)",
            "blue-15": "hsla(216, 100%, 39%, .15)",
            "blue-80": "hsla(216, 100%, 39%, .8)",
            white: "hsla(0, 0%, 100%, 1)",
            "white-hover": "hsla(0, 0%, 97%, 1)",
            "white-active": "hsla(0, 0%, 95%, .999)",
            "white-box-shadow": "hsla(0, 0%, 95%, .25)",
            "white-static": "hsla(0, 0%, 100%, .999)",
            "white-80": "hsla(0, 0%, 100%, .8)",
            "white-50": "hsla(0, 0%, 100%, .5)",
            "white-90": "hsla(0, 0%, 100%, .9)",
            "white-bis": "hsla(0, 0%, 98%, 1)",
            "white-ter": "hsla(0, 0%, 94%, 1)",
            "white-ter-hover": "hsla(0, 0%, 91%, 1)",
            "white-ter-active": "hsla(0, 0%, 89%, .999)",
            "white-ter-box-shadow": "hsla(0, 0%, 94%, .25)",
            "breadcrumb-background": "hsla(200, 13%, 95%, 1)",
            "grey-to-blue": "hsla(0, 0%, 9%, .998)",
            cyan: "hsla(193, 100%, 27%, 1)",
            "cyan-bg": "hsla(193, 100%, 93%, 1)",
            "cyan-text": "hsla(194, 100%, 27%, 1)",
            "cyan-hover": "hsla(193, 100%, 30%, 1)",
            "cyan-active": "hsla(193, 100%, 32%, 1)",
            "cyan-box-shadow": "hsla(193, 100%, 27%, .25)",
            green: "hsla(164, 100%, 24%, 1)",
            "green-bg": "hsla(164, 63%, 95%, 1)",
            "green-text": "hsla(164, 100%, 20%, 1)",
            "green-hover": "hsla(164, 100%, 27%, 1)",
            "green-active": "hsla(164, 100%, 29%, 1)",
            "green-box-shadow": "hsla(164, 100%, 24%, .25)",
            yellow: "hsla(44, 100%, 50%, 1)",
            "yellow-bg": "hsla(11, 81%, 96%, 1)",
            "yellow-text": "hsla(10, 78%, 38%, 1)",
            "yellow-hover": "hsla(44, 79%, 53%, 1)",
            "yellow-active": "hsla(44, 79%, 55%, 1)",
            "yellow-box-shadow": "hsla(10, 79%, 58%, .25)",
            red: "hsla(357, 76%, 28%, 1)",
            "red-bg": "hsla(356, 80%, 96%, 1)",
            "red-text": "hsla(358, 76%, 28%, 1)",
            "red-hover": "hsla(357, 76%, 31%, 1)",
            "red-active": "hsla(357, 76%, 33%, 1)",
            "red-box-shadow": "hsla(357, 76%, 28%, .25)",
            purple: "hsla(262, 52%, 47%, 1)",
            "purple-bg": "hsla(260, 52%, 94%, 1)",
            "purple-text": "hsla(262, 52%, 24%, 1)",
            "purple-hover": "hsla(262, 52%, 50%, 1)",
            "purple-active": "hsla(262, 52%, 52%, 1)",
            "purple-box-shadow": "hsla(262, 52%, 47%, .25)",
            "code-header-background": "hsla(0, 0%, 97%, .999)"
        },
        night: {
            black: "hsla(0, 0%, 80%, 1)",
            "black-hover": "hsla(0, 0%, 77%, 1)",
            "black-active": "hsla(0, 0%, 75%, 1)",
            "black-box-shadow": "hsla(0, 0%, 80%, .75)",
            "black-static": "hsla(0, 0%, 10%, .999)",
            "black-10": "hsla(0, 0%, 80%, 0.3)",
            "black-20": "hsla(0, 0%, 80%, 0.4)",
            "black-80": "hsla(0, 0%, 80%, 0.8)",
            "black-bis": "hsla(0, 0%, 98%, 1)",
            "black-ter": "hsla(0, 0%, 94%, 1)",
            "grey-darkest": "hsla(0, 0%, 95%, 1)",
            "grey-darker": "hsla(0, 0%, 67%, 1)",
            "grey-darker-hover": "hsla(0, 0%, 70%, 1)",
            "grey-darker-active": "hsla(0, 0%, 72%, 1)",
            "grey-darker-box-shadow": "hsla(0, 0%, 67%, .75)",
            "grey-dark-30": "hsla(0, 0%, 51%, .3)",
            "grey-dark": "hsla(0, 0%, 51%, 1)",
            grey: "hsla(0, 0%, 46%, 1)",
            "grey-hover": "hsla(0, 0%, 46%, .999)",
            "grey-active": "hsla(0, 0%, 46%, .998)",
            "grey-box-shadow": "hsla(0, 0%, 46%, .75)",
            "grey-darker-static": "hsla(0, 0%, 18%, .998)",
            "grey-light": "hsla(0, 0%, 27%, 1)",
            "grey-lighter": "hsla(0, 0%, 18%, 1)",
            "grey-lightest": "hsla(0, 0%, 9%, 1)",
            "grey-50": "hsla(0, 0%, 46%, .5)",
            "blue-darkest": "hsla(206, 100%, 82%, 1)",
            "blue-darker": "hsla(206, 100%, 67%, 1)",
            "blue-dark": "hsla(206, 100%, 52%, 1)",
            "blue-static": "hsla(216, 99%, 39%, 1)",
            blue: "hsla(206, 100%, 48%, 1)",
            "blue-bg": "hsla(0, 0%, 0%, 1)",
            "blue-hover": "hsla(206, 100%, 51%, 1)",
            "blue-active": "hsla(206, 100%, 53%, 1)",
            "blue-box-shadow": "hsla(206, 100%, 48%, .75)",
            "blue-light": "hsla(206, 100%, 32%, 1)",
            "blue-lighter": "hsla(206, 100%, 22%, 1)",
            "blue-lightest": "hsla(206, 100%, 12%, 1)",
            "blue-05": "hsla(200, 100%, 48%, .05)",
            "blue-10": "hsla(200, 100%, 48%, .1)",
            "blue-15": "hsla(200, 100%, 48%, .15)",
            "blue-80": "hsla(200, 100%, 48%, .8)",
            white: "hsla(0, 0%, 10%, 1)",
            "white-hover": "hsla(0, 0%, 13%, 1)",
            "white-active": "hsla(0, 0%, 15%, 1)",
            "white-box-shadow": "hsla(0, 0%, 10%, .75)",
            "white-static": "hsla(0, 0%, 100%, 1)",
            "white-bis": "hsla(0, 0%, 9%, .999)",
            "white-ter": "hsla(0, 0%, 18%, .999)",
            "white-ter-hover": "hsla(0, 0%, 21%, 1)",
            "white-ter-active": "hsla(0, 0%, 23%, 1)",
            "white-ter-box-shadow": "hsla(0, 0%, 18%, .75)",
            "white-50": "hsla(0, 0%, 10%, .5)",
            "white-80": "hsla(0, 0%, 10%, .8)",
            "white-90": "hsla(0, 0%, 10%, .9)",
            "breadcrumb-background": "hsla(0, 0%, 20%, 1)",
            "grey-to-blue": "hsla(201, 100%, 48%, 1)",
            cyan: "hsla(193, 100%, 17%, 1)",
            "cyan-bg": "hsla(193, 100%, 16%, 1)",
            "cyan-text": "hsla(193, 100%, 87%, 1)",
            "cyan-hover": "hsla(193, 100%, 20%, 1)",
            "cyan-active": "hsla(193, 100%, 22%, 1)",
            "cyan-box-shadow": "hsla(193, 100%, 17%, .75)",
            green: "hsla(129, 38%, 20%, 1)",
            "green-bg": "hsla(164, 100%, 10%, 1)",
            "green-text": "hsla(163, 41%, 87%, 1)",
            "green-hover": "hsla(129, 38%, 23%, 1)",
            "green-active": "hsla(129, 38%, 25%, 1)",
            "green-box-shadow": "hsla(129, 38%, 20%, .75)",
            yellow: "hsla(38, 66%, 25%, 1)",
            "yellow-bg": "hsla(10, 79%, 28%, 1)",
            "yellow-text": "hsla(10, 78%, 93%, 1)",
            "yellow-hover": "hsla(38, 66%, 28%, 1)",
            "yellow-active": "hsla(38, 66%, 30%, 1)",
            "yellow-box-shadow": "hsla(38, 66%, 25%, .75)",
            red: "hsla(357, 74%, 25%, 1)",
            "red-bg": "hsla(357, 74%, 15%, 1)",
            "red-text": "hsla(357, 76%, 90%, 1)",
            "red-hover": "hsla(357, 74%, 18%, 1)",
            "red-active": "hsla(357, 74%, 20%, 1)",
            "red-box-shadow": "hsla(357, 74%, 15%, .75)",
            purple: "hsla(262, 52%, 47%, 1)",
            "purple-bg": "hsla(262, 52%, 24%, 1)",
            "purple-text": "hsla(262, 51%, 87%, 1)",
            "purple-hover": "hsla(262, 52%, 50%, 1)",
            "purple-active": "hsla(262, 52%, 52%, 1)",
            "purple-box-shadow": "hsla(262, 52%, 47%, .75)",
            "code-header-background": "hsla(0, 0%, 14%, 1)"
        }
    };
    function initThemeFallback() {
        if (supportsCSSProperties()) {
            return;
        }
        var stylesheets = Array.from(document.styleSheets).filter(function(s) {
            return s instanceof CSSStyleSheet && s.href !== null && s.href.indexOf(location.origin) === 0;
        }).map(function(s) {
            return s;
        });
        var inverseThemeMap = createInverseThemeMap(themeMap);
        addEventListener("theme-changed", function(_a) {
            var isDark = _a.detail.isDark;
            return changeTheme(stylesheets, inverseThemeMap, isDark);
        });
        if (document.documentElement.classList.contains("theme_night")) {
            changeTheme(stylesheets, inverseThemeMap, true);
        }
    }
    function supportsCSSProperties() {
        return "CSS" in window && CSS.supports && CSS.supports("--test", "red");
    }
    var hslaRegex = /hsla\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*,\s*0?(\.?\d+)\s*\)/;
    var globalHslaRegex = new RegExp(hslaRegex.source, "g");
    function changeTheme(stylesheets, inverseThemeMap, isDark) {
        var theme = isDark ? "night" : "light";
        var inverseTheme = isDark ? "light" : "night";
        for (var _i = 0, stylesheets_1 = stylesheets; _i < stylesheets_1.length; _i++) {
            var stylesheet = stylesheets_1[_i];
            for (var i = 0; i < stylesheet.cssRules.length; i++) {
                var rule = stylesheet.cssRules.item(i);
                if (rule.type !== CSSRule.STYLE_RULE) {
                    continue;
                }
                var cssText = rule.style.cssText.replace(globalHslaRegex, function(_, hue, saturation, lightness, alpha) {
                    var hsla = "hsla(" + hue + ", " + lightness + "%, " + saturation + "%, " + alpha + ")";
                    var name = inverseThemeMap[inverseTheme][hsla];
                    return themeMap[theme][name];
                });
                if (cssText === rule.style.cssText) {
                    continue;
                }
                rule.style.cssText = cssText;
            }
        }
    }
    function createInverseThemeMap(themeMap$$1) {
        var lookup = {
            light: {},
            night: {}
        };
        for (var _i = 0, _a = [ "light", "night" ]; _i < _a.length; _i++) {
            var theme = _a[_i];
            for (var _b = 0, _c = Object.keys(themeMap$$1[theme]); _b < _c.length; _b++) {
                var name = _c[_b];
                var hsla = themeMap$$1[theme][name];
                var _d = hsla.match(hslaRegex), hue = _d[1], saturation = _d[2], lightness = _d[3], alpha = _d[4];
                lookup[theme]["hsla(" + hue + ", " + lightness + "%, " + saturation + "%, " + alpha + ")"] = name;
            }
        }
        return lookup;
    }
    var nightClassName = "theme_night";
    var html = document.documentElement.classList;
    function setTheme(isDark) {
        if (isDark) {
            localStorage$2.setItem("theme", nightClassName);
            html.add(nightClassName);
        } else {
            html.remove(nightClassName);
            localStorage$2.removeItem("theme");
        }
    }
    function toggleTheme() {
        var isDark = !html.contains(nightClassName);
        setTheme(isDark);
        document.documentElement.dispatchEvent(new CustomEvent("theme-changed", {
            bubbles: true,
            detail: {
                isDark: isDark
            }
        }));
    }
    function syncThemeToggle(icon, text) {
        var isDark = html.contains(nightClassName);
        icon.classList.remove("docon-sun");
        icon.classList.remove("docon-moon");
        icon.classList.add(isDark ? "docon-sun" : "docon-moon");
        text.textContent = isDark ? loc.light : loc.dark;
    }
    function initThemeToggle() {
        var button = document.querySelector(".toggle-theme");
        if (!button) {
            return;
        }
        var icon = button.querySelector(".docon");
        var text = button.querySelector(".action-item-text");
        syncThemeToggle(icon, text);
        button.onclick = function() {
            toggleTheme();
            syncThemeToggle(icon, text);
        };
    }
    function initTheme() {
        var isDark = localStorage$2.getItem("theme") === nightClassName;
        setTheme(isDark);
        contentLoaded.then(initThemeToggle);
    }
    function hasClicktale() {
        var clicktaleWhiteList = {
            ApiBrowserPage: true,
            Home: true,
            Hub: true,
            HubPage: true,
            LandingData: true,
            LandingPage: true
        };
        return msDocs.data.pageTemplate in clicktaleWhiteList || getMeta("clicktale") === "true";
    }
    if (hasClicktale()) {
        Promise.all([ cookieConsent, contentLoaded ]).then(function() {
            return loadLibrary("https://cdnssl.clicktale.net/www32/ptc/78a0ae88-af64-436a-9729-c30d90de7d5e.js");
        });
    }
    if (getMeta("twitterWidgets") === "true") {
        Promise.all([ cookieConsent, contentLoaded ]).then(function() {
            return loadLibrary("https://platform.twitter.com/widgets.js");
        });
    }
    function getParam(name, type) {
        var frag = type === "hash" ? window$1.location.hash : window$1.location.search;
        if (frag.length > 1) {
            frag = frag.substring(1);
            var cmpstring = name + "=";
            var cmplen = cmpstring.length;
            var temp = frag.split("&");
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].substr(0, cmplen) == cmpstring) {
                    return temp[i].substr(cmplen);
                }
            }
        }
        return undefined;
    }
    function getPdfUrl(pdfName, pdfFullPath) {
        if (pdfFullPath === void 0) {
            pdfFullPath = null;
        }
        var urlTemplate = pdfName !== null ? getMeta("pdf_url_template") : pdfFullPath;
        if (urlTemplate !== undefined) {
            var branchName = cookies.get("CONTENT_BRANCH");
            if (branchName === undefined) {
                branchName = "live";
            }
            var params = parseQueryString();
            var viewName = params.view !== undefined ? params.view : null;
            if (pdfName !== null) {
                var url = urlTemplate.replace(/\{branchName\}/, branchName);
                url = url.replace(/\{viewName\}/, viewName);
                url = url.replace(/\{pdfName\}/, pdfName);
                return url;
            } else {
                if (viewName !== null) {
                    return urlTemplate + "?view=" + viewName + "&branch=" + branchName;
                } else {
                    return urlTemplate + "?branch=" + branchName;
                }
            }
        }
        return null;
    }
    function renderPdfLink(pdfName, pdfFullPath) {
        if (pdfFullPath === void 0) {
            pdfFullPath = null;
        }
        var url = getPdfUrl(pdfName, pdfFullPath);
        if (url === null) {
            return;
        }
        var holder = document$1.querySelector(".pdfDownloadHolder");
        if (!holder) {
            return;
        }
        var a = document$1.createElement("a");
        a.href = url;
        a.textContent = loc.downloadPdf;
        a.setAttribute(contentAttrs.name, "downloadPdf");
        holder.style.display = "block";
        holder.appendChild(a);
    }
    var pageTemplate = msDocs.data.pageTemplate;
    var pageType = getMeta("page_type");
    var oldPageType = getMeta("pagetype");
    var useMonikerPicker = pageMonikers.any && msDocs.data.pageTemplate !== "HubPage" || pageTemplate === "Conceptual" && oldPageType === "Reference" && platformId !== null || pageTemplate === "Conceptual" && pageType === "powershell" && platformId !== null || pageTemplate === "Conceptual" && oldPageType === "Conceptual" && platformId === "powershell" || pageTemplate === "Conceptual" && pageType === "conceptual" && platformId === "powershell" || msDocs.data.forceVersionPicker || parseQueryString()["force-version-picker"] !== undefined;
    var useApiSearch = pageTemplate === "Reference" && platformId !== null || pageTemplate === "Conceptual" && oldPageType === "Reference" && platformId !== null || pageTemplate === "Conceptual" && pageType === "powershell" && platformId !== null;
    function setupToc() {
        if (!useMonikerPicker && !useApiSearch) {
            return;
        }
        var filterHolder = document.querySelector(".filterHolder");
        var h1 = document.querySelector("h1");
        if (filterHolder === null || h1 === null) {
            return;
        }
        if (useMonikerPicker) {
            handleMonikerChange();
            var picker = createMonikerPicker(false);
            filterHolder.appendChild(picker);
            var picker2 = createMonikerPicker(false);
            h1.insertAdjacentElement("beforebegin", picker2);
        }
        if (useApiSearch && useMonikerPicker) {
            initApiSearch();
            var renderHeading = false;
            var searchField = createSearchField();
            filterHolder.appendChild(searchField);
            var toc = document.querySelector(".toc");
            var resultsContainer = document.createElement("div");
            resultsContainer.classList.add("api-search-results-container");
            toc.appendChild(resultsContainer);
            addResultsContainer(resultsContainer, renderHeading);
            var position = document.querySelector(".content .moniker-picker");
            var searchField2 = createSearchField();
            position.insertAdjacentElement("afterend", searchField2);
            var resultsContainer2 = document.createElement("div");
            resultsContainer2.classList.add("api-search-results-container");
            searchField2.insertAdjacentElement("afterend", resultsContainer2);
            addResultsContainer(resultsContainer2, renderHeading);
        }
    }
    function createContextUrl(url) {
        var param = (getParam("context") || "").split("/").slice(0, -1).join("/");
        if (url) {
            return "/" + [ getLocaleFromPath(document$1.location.pathname), param, url ].join("/");
        }
    }
    function createToc() {
        var urlTocQueryName = "toc";
        var urlTocMetaName = "toc_rel";
        var urlBcQueryName = "bc";
        var urlBcMetaName = "breadcrumb_path";
        var selectedClass = "selected";
        var selectedHolderClass = "selectedHolder";
        var rotateClass = "rotate";
        var noSubsClass = "noSubs";
        var noSibsClass = "noSibs";
        var filterClassName = "tocFilter";
        var emptyFilterClassName = "emptyFilter";
        var emptyFilterMessageClassName = "emptyFilterMessage";
        var hideFocusClass = "hideFocus";
        var groupClass = "group";
        var tocHolderSelector = ".toc";
        var filterHolderSelector = ".filterHolder";
        var emptyFilterMessageSelector = ".emptyFilterMessage";
        var breadcrumbClass = "breadcrumbs";
        var eventNamespace = "msDocs";
        var isTouchEvent = false;
        var debounceIntervalInMilliseconds = 500;
        var timeout = 1e4;
        var relativeCanonicalUrl = "";
        var relativeCanonicalUrlNoQuery = "";
        var relativeCanonicalUrlNoQueryWithHash;
        var relativeCanonicalUrlUniformIndexWithHash;
        var relativeCanonicalUrlUniformIndex = "";
        var hasCanonicalHash = false;
        var hasFullTocMatch = false;
        var tocUrl = "";
        var tocFolder = "";
        var bcUrl = "";
        var bcFolder = "";
        var locale = "";
        var locationFolder = "";
        var $savedToc;
        var tocJson = [];
        var nodes_to_expand = [];
        var hasNodesToExpand = false;
        var tocUrlQueue = [];
        var bcUrlQueue = [];
        var pageMetadata = {};
        var tocContextUrl = createContextUrl(msDocs.data.context.tocRel);
        var tocQueryUrl = getParam(urlTocQueryName);
        var tocMetaUrl = getMeta(urlTocMetaName);
        var hasMoniker = false;
        var view = getParam("view");
        var monikerParams = "";
        if (view && view.length) {
            hasMoniker = true;
            view = view.toLowerCase();
            view = view.replace(/[^\w.|-]+/g, "");
            monikerParams = "view=" + view;
        }
        var bcContextUrl = createContextUrl(msDocs.data.context.breadcrumbPath);
        var bcQueryUrl = getParam(urlBcQueryName);
        if (bcQueryUrl) {
            bcQueryUrl = decodeURIComponent(bcQueryUrl);
        }
        var bcMetaUrl = getMeta(urlBcMetaName);
        var tocBestMatch = [];
        var tocFinished = $$1.Deferred();
        var bcFinished = $$1.Deferred();
        var normalizeToc = function(toc, extractMetadata) {
            if (extractMetadata === void 0) {
                extractMetadata = false;
            }
            if (extractMetadata) {
                if (toc.metadata) {
                    pageMetadata = toc.metadata;
                } else if (Array.isArray(toc) && toc.length) {
                    var toc0 = toc[0];
                    pageMetadata.pdf_absolute_path = toc0.pdf_absolute_path;
                    pageMetadata.pdf_name = toc0.pdf_name;
                    pageMetadata.universal_ref_toc = toc0.universal_ref_toc;
                    pageMetadata.universal_conceptual_toc = toc0.universal_conceptual_toc;
                } else if (Array.isArray(toc.items) && toc.items.length) {
                    var toc0 = toc.items[0];
                    pageMetadata.pdf_absolute_path = toc0.pdf_absolute_path;
                    pageMetadata.pdf_name = toc0.pdf_name;
                    pageMetadata.universal_ref_toc = toc0.universal_ref_toc;
                    pageMetadata.universal_conceptual_toc = toc0.universal_conceptual_toc;
                }
            }
            if (Array.isArray(toc)) {
                return toc;
            }
            if (Array.isArray(toc.items)) {
                return toc.items;
            }
            return [];
        };
        var resolveRelativePath = function(path, folder) {
            if (!path || !path.length) {
                return path;
            }
            if (typeof folder !== "string") {
                folder = locationFolder;
            }
            var firstChar = path.charAt(0);
            if (firstChar === "/") {
                return checkLocaleSupported(path.substr(1).split("/")[0]) ? path : "/" + locale + path;
            }
            if (path.substr(0, 7) === "http://" || path.substr(0, 8) === "https://") {
                return path;
            }
            if (firstChar !== ".") {
                return "/" + locale + folder + "/" + path;
            }
            if (path.substr(0, 3) === "../") {
                return resolveRelativePath(path.substr(3), getFolder(folder));
            }
            if (path.substr(0, 2) === "./") {
                return "/" + locale + folder + "/" + path.substr(2);
            }
            return path;
        };
        var removeQueryString = function(path) {
            if (path && path.length) {
                var index = path.indexOf("?");
                if (index > 0) {
                    var hashIndex = path.indexOf("#");
                    if (hashIndex === -1) {
                        path = path.substring(0, index);
                    } else {
                        path = path.substring(0, index) + path.substring(hashIndex);
                    }
                }
            }
            return path;
        };
        var getUniformIndex = function(path) {
            if (path && path.length) {
                path = removeQueryString(path);
                if (path.charAt(path.length - 1) == "/" || path.indexOf("/#") > 0) {
                    return path;
                }
                var whackIndex = path.lastIndexOf("/");
                var indexIndex = path.indexOf("index", whackIndex);
                if (indexIndex > 0) {
                    var hashIndex = path.indexOf("#");
                    if (hashIndex === -1) {
                        if (indexIndex == path.length - 5) {
                            return path.substring(0, indexIndex);
                        }
                        var dotIndex = path.indexOf(".", whackIndex);
                        if (dotIndex > 0) {
                            path = path.substring(0, dotIndex);
                            if (path.substring(path.length - 6) == "/index") {
                                return path.substring(0, path.length - 5);
                            }
                        }
                    } else {
                        var hash = path.substring(hashIndex);
                        path = path.substring(0, hashIndex);
                        if (indexIndex == path.length - 5) {
                            return path.substring(0, indexIndex) + hash;
                        }
                        var dotIndex = path.indexOf(".", whackIndex);
                        if (dotIndex > 0) {
                            path = path.substring(0, dotIndex);
                            if (path.substring(path.length - 6) == "/index") {
                                return path.substring(0, path.length - 5) + hash;
                            }
                        }
                    }
                }
            }
            return "";
        };
        var getRelativeCanonicalUrl = function(removeTheQueryString) {
            var canonicalUrl = $$1('link[rel="canonical"]').attr("href");
            if (canonicalUrl && canonicalUrl.length) {
                if (canonicalUrl.substr(0, 7) === "http://" || canonicalUrl.substr(0, 8) === "https://") {
                    canonicalUrl = canonicalUrl.substring(canonicalUrl.indexOf("//") + 2);
                    canonicalUrl = canonicalUrl.substring(canonicalUrl.indexOf("/"));
                }
            } else {
                canonicalUrl = document$1.location.pathname;
            }
            canonicalUrl = removeLocaleFromPath(canonicalUrl);
            if (removeTheQueryString) {
                canonicalUrl = removeQueryString(canonicalUrl);
            }
            return canonicalUrl;
        };
        var getFolder = function(path) {
            return path.substring(0, path.lastIndexOf("/"));
        };
        var thisIsMe = function(hrefNoQuery, hrefUniformIndex) {
            if (hrefNoQuery && hrefNoQuery.length) {
                if (hasCanonicalHash) {
                    if (relativeCanonicalUrlNoQueryWithHash === hrefNoQuery) {
                        return true;
                    }
                } else {
                    if (relativeCanonicalUrlNoQuery === hrefNoQuery) {
                        return true;
                    }
                }
                if (relativeCanonicalUrlUniformIndex && hrefUniformIndex.length > 0) {
                    if (hasCanonicalHash) {
                        if (relativeCanonicalUrlUniformIndexWithHash === hrefUniformIndex) {
                            return true;
                        }
                    } else {
                        if (relativeCanonicalUrlUniformIndex === hrefUniformIndex) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        var thisIsAlmostMe = function(hrefNoQuery, hrefUniformIndex) {
            if (hasCanonicalHash) {
                if (hrefNoQuery && hrefNoQuery.length) {
                    if (relativeCanonicalUrlNoQuery === hrefNoQuery) {
                        return true;
                    }
                    if (relativeCanonicalUrlUniformIndex && hrefUniformIndex.length > 0) {
                        if (relativeCanonicalUrlUniformIndex === hrefUniformIndex) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        msDocs.functions.toggleAriaExpanded = function(el) {
            var $el = $$1(el);
            var tempHeight;
            var $ulKids = $el.children("ul");
            if ($el.attr("aria-expanded") == "true") {
                $el.addClass(rotateClass).children("ul").each(function(i, el) {
                    var $tempEl = $$1(el);
                    $tempEl.css({
                        height: $tempEl.height()
                    }).animate({
                        height: 0
                    }, 200, function() {
                        $$1(this).css("height", "");
                        $el.attr("aria-expanded", "false").removeClass(rotateClass);
                    });
                });
                $ulKids.find("li").css("display", "none");
            } else {
                $el.attr("aria-expanded", "true");
                $ulKids.find("li").css("display", "");
                $ulKids.each(function(i, el) {
                    var $tempEl = $$1(el);
                    tempHeight = $tempEl.height();
                    $tempEl.css({
                        height: "0"
                    }).animate({
                        height: tempHeight
                    }, 200, function() {
                        $$1(this).css("height", "");
                    });
                });
            }
        };
        msDocs.functions.stopSomePropagation = function(e, direction) {
            switch (direction) {
              case "top":
                if (isTouchEvent) {
                    if (e.offsetY > 20) {
                        e.stopPropagation();
                    }
                } else {
                    e.stopPropagation();
                }
                break;

              case "left":
                if (isTouchEvent) {
                    if (e.offsetX > 15) {
                        e.stopPropagation();
                    }
                } else {
                    e.stopPropagation();
                }
                break;
            }
        };
        var drawToc = function(json) {
            var createTocNode = function(node, ul, nodeMap, isRoot) {
                var aNode;
                var href;
                var pieces;
                var aCleanTitle;
                var displayName;
                nodeMap.push(-1);
                ul.setAttribute("role", "tree");
                ul.setAttribute("onclick", 'msDocs.functions.stopSomePropagation(event, "top")');
                for (var i = 0; i < node.length; i++) {
                    aNode = node[i];
                    aCleanTitle = cleanText(aNode.toc_title);
                    if (aNode.displayName && aNode.displayName.length) {
                        displayName = cleanText(aNode.displayName);
                    } else {
                        displayName = "";
                    }
                    nodeMap[nodeMap.length - 1] = i;
                    var nextNode = document$1.createElement("li");
                    nextNode.setAttribute("role", "treeitem");
                    var titleHolder = void 0;
                    if (aNode.href && aNode.href.length) {
                        href = aNode.href;
                        titleHolder = document$1.createElement("a");
                        if (i == 0) {
                            titleHolder.setAttribute("onclick", 'msDocs.functions.stopSomePropagation(event, "left")');
                        }
                        titleHolder.setAttribute("tabindex", "0");
                        if (aNode.thisIsMe || !hasFullTocMatch && aNode.thisIsAlmostMe) {
                            aNode.expanded = true;
                            titleHolder.classList.add(selectedClass);
                            titleHolder.setAttribute("aria-current", "page");
                            titleHolder.setAttribute("data-showme", "true");
                            if (!nodeMap.length || tocBestMatch.length < nodeMap.length) {
                                tocBestMatch = nodeMap.slice(0);
                            }
                        }
                        if (aNode.isInternalHref && (hasMoniker && !aNode.hasViewParam || aNode.maintainContext)) {
                            pieces = href.split("#");
                            titleHolder.setAttribute("href", pieces[0] + (pieces[0].indexOf("?") > -1 ? "&" : "?") + (aNode.maintainContext ? maintainContextParams + (hasMoniker && !aNode.hasViewParam ? "&" : "") : "") + (hasMoniker && !aNode.hasViewParam ? monikerParams : "") + (pieces[1] ? "#" + pieces[1] : ""));
                        } else {
                            titleHolder.setAttribute("href", href);
                        }
                    } else {
                        titleHolder = document$1.createElement("span");
                        titleHolder.setAttribute("aria-hidden", "true");
                    }
                    if (aNode.expanded) {
                        titleHolder.setAttribute("data-showme", "true");
                    }
                    titleHolder.setAttribute("data-text", aCleanTitle.toLowerCase() + " " + displayName.toLowerCase());
                    titleHolder.innerHTML = breakText(aCleanTitle);
                    nextNode.appendChild(titleHolder);
                    if (aNode.newGroup) {
                        nextNode.classList.add(groupClass);
                    }
                    if (aNode.monikers !== undefined && aNode.monikers.length) {
                        nextNode.setAttribute("data-moniker", aNode.monikers.join(" "));
                    }
                    if (aNode.children && aNode.children.length) {
                        nextNode.setAttribute("aria-expanded", "false");
                        nextNode.setAttribute("aria-label", aCleanTitle.toLowerCase() + " " + displayName.toLowerCase());
                        nextNode.setAttribute("tabindex", "0");
                        nextNode.setAttribute("role", "group");
                        nextNode.setAttribute("onclick", "event.stopPropagation();msDocs.functions.toggleAriaExpanded(this)");
                        var hasGrandKids = false;
                        for (var j = 0; j < aNode.children.length; j++) {
                            if (aNode.children[j].children && aNode.children[j].children.length) {
                                hasGrandKids = true;
                                break;
                            }
                        }
                        if (!hasGrandKids) {
                            nextNode.classList.add(noSubsClass);
                        }
                        var nextUL = document$1.createElement("ul");
                        createTocNode(aNode.children, nextUL, nodeMap.slice(0), false);
                        nextNode.appendChild(nextUL);
                    }
                    ul.appendChild(nextNode);
                }
            };
            var createFilter = function() {
                var $filter = $$1("<form>").addClass(filterClassName).attr("aria-label", loc.landmarkTocFilterFormLabel).submit(function(e) {
                    e.preventDefault();
                }).append($$1("<input>").attr("placeholder", loc["filter.placeholder"]).attr("aria-label", loc["filter.text"]).attr("data-bi-name", "toc-filter").attr("id", "toc-filter").attr("type", "search").attr("aria-controls", "filterResults").keypress(function(e) {
                    if (e.which === 13) {
                        e.preventDefault();
                        return;
                    }
                }).keyup(function() {
                    filterToc(this);
                })).append($$1("<a>").attr("href", "#").attr("title", loc.clearfilter).addClass("clearInput").html('<span class="visually-hidden">' + loc.clearfilter + "</span>").on("click", function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var ipt = $$1("." + filterClassName + " input[type=search]");
                    ipt.val("");
                    filterToc(ipt);
                }));
                var $noResults = $$1("<div>").addClass(emptyFilterMessageClassName).html(loc["no.results"]);
                return [ $filter, $noResults ];
            };
            var maintainContextParams = urlTocQueryName + "=" + encodeURIComponent(resolveRelativePath(tocUrl)) + "&" + urlBcQueryName + "=" + encodeURIComponent(resolveRelativePath(bcUrl));
            var toc = document$1.createElement("ul");
            createTocNode(json, toc, [], true);
            var $toc = $$1(toc);
            var selectedPath = JSON.parse(localStorage$2.getItem("toc-selected") || "{}")[tocUrl];
            if (selectedPath && Array.isArray(selectedPath)) {
                var selectedNodes = toc.querySelectorAll(".selected");
                var selected_1 = toc;
                for (var i = 0; i < selectedPath.length; i++) {
                    if (!selected_1) {
                        break;
                    }
                    var childIndex = selectedPath[i];
                    selected_1 = selected_1.children[childIndex];
                }
                if (selected_1 && selected_1.firstElementChild && selected_1.firstElementChild.classList.contains(selectedClass)) {
                    Array.from(selectedNodes).forEach(function(node) {
                        if (node.parentElement === selected_1) {
                            return;
                        }
                        node.classList.remove(selectedClass);
                        node.removeAttribute("data-showme");
                    });
                }
            }
            var $selectedParent = $toc.find("." + selectedClass).parent().addClass(selectedHolderClass);
            $toc.find("[data-showme]").parents('li[aria-expanded="false"]').attr("aria-expanded", "true");
            $toc.on("touchstart pointerdown MSPointerDown", function(e) {
                if (e.type == "touchstart" || (e.type == "pointerdown" || e.type == "MSPointerDown") && e.originalEvent.pointerType == "touch") {
                    isTouchEvent = true;
                    setTimeout(function() {
                        isTouchEvent = false;
                    }, 700);
                }
            }).on("mousedown", function(e) {
                $$1(this).addClass(hideFocusClass);
            }).on("mouseup", function(e) {
                $$1(e.target).blur().parent().blur();
                $$1(this).removeClass(hideFocusClass);
                saveSelectedPathToLocalStorage(e.target.parentElement, toc);
            }).on("keydown", "a", function(e) {
                if (e.which === 13) {
                    document$1.location.href = $$1(e.target).attr("href");
                    e.stopPropagation();
                    saveSelectedPathToLocalStorage(e.target.parentElement, toc);
                    return false;
                }
            }).on("keydown", "li", function(e) {
                if (e.which === 13 && !$$1(this).hasClass(noSibsClass)) {
                    e.stopPropagation();
                    msDocs.functions.toggleAriaExpanded($$1(this));
                }
            });
            if (json.length == 1) {
                $toc.addClass(noSibsClass);
                $toc.children("li").attr("aria-expanded", "true").off("click." + eventNamespace).removeAttr("tabindex");
            }
            $$1(function() {
                var $tocHolder = $$1(tocHolderSelector);
                $tocHolder.attr("role", "application")[0].appendChild(toc);
                $tocHolder.attr("aria-label", loc.landmarkToc);
                $tocHolder.attr("id", "filterResults");
                try {
                    var scrollAmount_1 = $selectedParent.offset().top - $tocHolder.offset().top - 44;
                    $tocHolder.scrollTop(scrollAmount_1);
                    setTimeout(function() {
                        $tocHolder.scrollTop(scrollAmount_1);
                    }, 1);
                } catch (e) {}
                if (!useApiSearch) {
                    $$1(filterHolderSelector).append(createFilter());
                }
                tocFinished.resolve();
            });
        };
        var debounceTimeout = 0;
        var filterToc = function(inputField) {
            var val = inputField.value;
            var $tocHolder = $$1(tocHolderSelector);
            var $filterHolder = $$1(filterHolderSelector);
            var $emptyHolder = $$1(emptyFilterMessageSelector);
            var rawScope = getMeta("scope");
            var scopes = rawScope ? rawScope.split(",").map(function(s) {
                return s.trim();
            }).filter(function(s) {
                return s.length;
            }) : "";
            var scope = scopes.length !== 0 ? escape$1(scopes[scopes.length - 1]) : "";
            var _a = msDocs.data, brand = _a.brand, userLocale = _a.userLocale;
            $filterHolder.removeClass(emptyFilterClassName);
            $emptyHolder.attr("role", "none");
            if (val && val.length) {
                $$1("." + filterClassName).addClass("clearFilter");
                var resultIsEmpty_1 = true;
                var $currentToc = $tocHolder.children('ul[role="tree"]').detach();
                if (!$savedToc) {
                    $savedToc = $currentToc.clone(true, true);
                }
                $currentToc.find("li").css("display", "none").filter("[aria-expanded]").attr("aria-expanded", "false");
                var $this_1;
                $currentToc.find("a, span").each(function(a) {
                    $this_1 = $$1(this);
                    if ($this_1.attr("data-text").indexOf(val) !== -1) {
                        resultIsEmpty_1 = false;
                        $this_1.parents("li").css("display", "").filter("[aria-expanded]").not($this_1.parent()).attr("aria-expanded", "true");
                    }
                });
                $tocHolder.append($currentToc);
                if (resultIsEmpty_1) {
                    var url = "/search/index?search=" + encodeURIComponent(val) + "&scope=" + encodeURIComponent(scope);
                    if (brand === "mooncake") {
                        url = "https://www.azure.cn/zh-cn/searchresults/?source=3&query=" + encodeURIComponent(val);
                    } else if (brand === "azure") {
                        url = "https://azure.microsoft.com/" + (userLocale !== undefined ? userLocale : "") + "/search/?q=" + encodeURIComponent(val);
                    }
                    $filterHolder.addClass(emptyFilterClassName);
                    $emptyHolder.attr("role", "alert");
                    $emptyHolder.html(loc.noResultsToc);
                    var termTextNode = $emptyHolder[0].firstChild;
                    termTextNode.textContent = termTextNode.textContent.replace("{term}", val);
                    var anchor = $emptyHolder[0].lastElementChild;
                    anchor.href = url;
                    anchor.textContent = anchor.textContent.replace("{filter-text}", val).replace("{scope}", scope);
                }
            } else if ($savedToc) {
                $$1("." + filterClassName).removeClass("clearFilter");
                $tocHolder.children('ul[role="tree"]').replaceWith($savedToc);
                $savedToc = null;
            }
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(function() {
                if (val.length) {
                    jsllReady.then(function(awa) {
                        awa.ct.capturePageAction(inputField, {
                            actionType: awa.actionType.OTHER,
                            behavior: awa.behavior.SEARCH,
                            content: {
                                event: "toc-filter",
                                value: val
                            }
                        });
                    });
                }
            }, debounceIntervalInMilliseconds);
        };
        var getDataFromToc = function(nodeName) {
            return pageMetadata[nodeName] || null;
        };
        var gatherAllTocFiles = function(pageTocJson, pageTocFolder) {
            var uniRefTocUrl = getDataFromToc("universal_ref_toc");
            var uniConTocUrl = getDataFromToc("universal_conceptual_toc");
            var moniker = getMoniker();
            var addMonikerToUrl = function(aUrl, moniker) {
                if (aUrl && aUrl.length) {
                    var newMonikerTerm = "view=" + moniker;
                    var qMark = aUrl.indexOf("?");
                    var qMarkPlus1 = qMark + 1;
                    var terms = [];
                    var swapped = false;
                    if (qMark > 0 && qMarkPlus1 != aUrl.length) {
                        terms = aUrl.substring(qMarkPlus1).split("&");
                        for (var i = 0; i < terms.length; i++) {
                            if (terms[i].indexOf("view=") === 0) {
                                terms[i] = newMonikerTerm;
                                swapped = true;
                            }
                        }
                    } else {
                        if (qMarkPlus1 != aUrl.length) {
                            aUrl = aUrl + "?";
                        }
                        qMarkPlus1 = aUrl.length;
                    }
                    if (!swapped) {
                        terms.push(newMonikerTerm);
                    }
                    aUrl = aUrl.substring(0, qMarkPlus1) + terms.join("&");
                }
                return aUrl;
            };
            var updateAllHrefs = function(json, folder, checkThisIsMe) {
                var hrefLowerCase = "";
                var hrefNoQuery = "";
                var hrefUniformIndex = "";
                for (var i = 0; i < json.length; i++) {
                    if (json[i].href) {
                        json[i].href = resolveRelativePath(json[i].href, folder);
                        hrefLowerCase = json[i].href.toLowerCase();
                        if (checkThisIsMe && json[i].href.length) {
                            hrefNoQuery = removeQueryString(removeLocaleFromPath(hrefLowerCase));
                            if (relativeCanonicalUrlUniformIndex) {
                                hrefUniformIndex = getUniformIndex(hrefNoQuery);
                            } else {
                                hrefUniformIndex = "";
                            }
                            if (thisIsMe(hrefNoQuery, hrefUniformIndex)) {
                                json[i].thisIsMe = true;
                                hasFullTocMatch = true;
                            }
                            if (hasCanonicalHash && !hasFullTocMatch) {
                                if (thisIsAlmostMe(hrefNoQuery, hrefUniformIndex)) {
                                    json[i].thisIsAlmostMe = true;
                                }
                            }
                            if (hrefLowerCase.indexOf("view=") > 0) {
                                json[i].hasViewParam = true;
                            }
                        }
                        json[i].isInternalHref = isInternalHref(json[i].href);
                        if (hasNodesToExpand) {
                            for (var j = 0; j < nodes_to_expand.length; j++) {
                                if (nodes_to_expand[j] === hrefLowerCase) {
                                    json[i].expanded = true;
                                }
                            }
                        }
                    }
                    if (json[i].children) {
                        updateAllHrefs(json[i].children, folder, checkThisIsMe);
                    }
                }
            };
            if (uniRefTocUrl || uniConTocUrl) {
                var uniRefTocFinished_1 = $$1.Deferred();
                var uniConTocFinished_1 = $$1.Deferred();
                if (moniker) {
                    uniRefTocUrl = addMonikerToUrl(uniRefTocUrl, moniker);
                    uniConTocUrl = addMonikerToUrl(uniConTocUrl, moniker);
                }
                uniRefTocUrl = resolveRelativePath(uniRefTocUrl, tocFolder);
                uniConTocUrl = resolveRelativePath(uniConTocUrl, tocFolder);
                if (uniRefTocUrl) {
                    $$1.ajax({
                        url: uniRefTocUrl,
                        dataType: "json",
                        timeout: timeout
                    }).done(function(data, textStatus, jqXHR) {
                        var uniRefTocFolder = getFolder(removeLocaleFromPath(resolveRelativePath(uniRefTocUrl)));
                        var uniRefTocJson = normalizeToc(jqXHR.responseJSON);
                        updateAllHrefs(uniRefTocJson, uniRefTocFolder);
                        uniRefTocFinished_1.resolve(uniRefTocJson);
                    }).fail(function() {
                        uniRefTocFinished_1.resolve(null);
                    });
                } else {
                    uniRefTocFinished_1.resolve(null);
                }
                if (uniConTocUrl) {
                    $$1.ajax({
                        url: uniConTocUrl,
                        dataType: "json",
                        timeout: timeout
                    }).done(function(data, textStatus, jqXHR) {
                        var uniConTocFolder = getFolder(removeLocaleFromPath(resolveRelativePath(uniConTocUrl)));
                        var uniConTocJson = normalizeToc(jqXHR.responseJSON);
                        updateAllHrefs(uniConTocJson, uniConTocFolder);
                        uniConTocFinished_1.resolve(uniConTocJson);
                    }).fail(function() {
                        uniConTocFinished_1.resolve(null);
                    });
                } else {
                    uniConTocFinished_1.resolve(null);
                }
                updateAllHrefs(pageTocJson, pageTocFolder, true);
                $$1.when(uniRefTocFinished_1, uniConTocFinished_1).then(function(uniRefTocJson, uniConTocJson) {
                    var combinedToc;
                    var matchAndMerge = function(hrefToMatch, json, childJson) {
                        for (var i = 0; i < json.length; i++) {
                            if (json[i].href === hrefToMatch) {
                                json[i] = childJson;
                                break;
                            }
                            if (json[i].children) {
                                matchAndMerge(hrefToMatch, json[i].children, childJson);
                            }
                        }
                    };
                    if (uniRefTocJson && uniConTocJson) {
                        uniRefTocJson[0].newGroup = true;
                        var hrefToMatch = pageTocJson[0].href;
                        matchAndMerge(hrefToMatch, uniRefTocJson, pageTocJson[0]);
                        combinedToc = uniConTocJson.concat(uniRefTocJson);
                    } else if (uniConTocJson) {
                        pageTocJson[0].newGroup = true;
                        combinedToc = uniConTocJson.concat(pageTocJson);
                    } else if (uniRefTocJson) {
                        uniRefTocJson[0].newGroup = true;
                        combinedToc = pageTocJson.concat(uniRefTocJson);
                    } else {
                        combinedToc = pageTocJson;
                    }
                    tocJson = combinedToc;
                    drawToc(combinedToc);
                });
            } else {
                updateAllHrefs(pageTocJson, pageTocFolder, true);
                tocJson = pageTocJson;
                drawToc(pageTocJson);
            }
        };
        var getTocData = function(url, fallbackUrls) {
            $$1.ajax({
                url: url,
                dataType: "json",
                timeout: timeout
            }).done(function(data, textStatus, jqXHR) {
                tocUrl = resolveRelativePath(url);
                tocFolder = getFolder(removeLocaleFromPath(tocUrl));
                tocJson = normalizeToc(jqXHR.responseJSON, true);
                gatherAllTocFiles(tocJson, tocFolder);
                var pdfUrlTemplate = getMeta("pdf_url_template");
                if (pdfUrlTemplate && pdfUrlTemplate.length) {
                    var pdfAbsolutePath = getDataFromToc("pdf_absolute_path");
                    var pdfName_1 = getDataFromToc("pdf_name");
                    if (pdfAbsolutePath && pdfAbsolutePath.length) {
                        var pdfFullPath_1 = document$1.location.origin + "/" + locale + pdfAbsolutePath;
                        $$1(function() {
                            return renderPdfLink(null, pdfFullPath_1);
                        });
                    } else if (pdfName_1 && pdfName_1.length) {
                        $$1(function() {
                            return renderPdfLink(pdfName_1, null);
                        });
                    }
                }
            }).fail(function() {
                if (fallbackUrls && fallbackUrls.length) {
                    getTocData(fallbackUrls[0], fallbackUrls.slice(1));
                }
            });
        };
        var extendBc = function() {
            var $breadcrumbs = $$1("." + breadcrumbClass);
            var addNodeToBc = function(node, bestMatch) {
                var href = node.href;
                var aCleanTitle = breakText(cleanText(node.toc_title));
                var pieces;
                $breadcrumbs.ifThen(node.thisIsMe || !href || !href.length || !bestMatch.length && relativeCanonicalUrlUniformIndex === getUniformIndex(node.href).toLowerCase(), function() {
                    this.append($$1("<li>").html(aCleanTitle));
                }, function() {
                    href = resolveRelativePath(href, tocFolder);
                    this.append($$1("<li>").append($$1("<a>").ifThen(hasMoniker, function() {
                        pieces = href.split("#");
                        this.attr("href", pieces[0] + (pieces[0].indexOf("?") > -1 ? "&" : "?") + monikerParams + (pieces[1] ? "#" + pieces[1] : ""));
                    }, function() {
                        this.attr("href", href);
                    }).html(aCleanTitle)));
                });
                if (bestMatch.length && node.children && node.children.length) {
                    addNodeToBc(node.children[bestMatch.shift()], bestMatch);
                }
            };
            if (tocBestMatch.length) {
                addNodeToBc(tocJson[tocBestMatch.shift()], tocBestMatch);
            }
            $breadcrumbs.children().has("a").last().addClass("mobile-breadcrumb");
        };
        var drawBc = function(json) {
            var relativeCanonicaFolder = getFolder(relativeCanonicalUrlNoQuery) + "/";
            var bestMatch = [];
            var $breadcrumbsContainer = $$1("<ul></ul>");
            var node;
            var nodeHrefNoQuery;
            var findBestMatch = function(json, nodeMap) {
                nodeMap.push(-1);
                for (var i = 0; i < json.length; i++) {
                    node = json[i];
                    nodeMap[nodeMap.length - 1] = i;
                    if (!nodeMap.length || bestMatch.length < nodeMap.length) {
                        if (node.href) {
                            nodeHrefNoQuery = node.href.split("?")[0].toLowerCase();
                            if (relativeCanonicaFolder.indexOf(nodeHrefNoQuery) === 0 || relativeCanonicalUrlNoQuery === nodeHrefNoQuery) {
                                bestMatch = nodeMap.slice(0);
                            }
                        }
                    }
                    if (node.children && node.children.length) {
                        findBestMatch(node.children, nodeMap.slice(0));
                    }
                }
            };
            var makeDisplayHtml = function($breadcrumbs, node, bestMatch) {
                var href = node.homepage || node.href || "";
                var aCleanTitle = breakText(cleanText(node.toc_title));
                var pieces;
                $breadcrumbs.ifThen(!href || !href.length || !bestMatch.length && relativeCanonicalUrlUniformIndex === getUniformIndex(node.href).toLowerCase(), function() {
                    if (checkIsArchived() && aCleanTitle === loc.search) {
                        aCleanTitle = loc.searchPreviousVersions;
                    }
                    this.append($$1('<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">').append($$1('<span itemprop="name">').html(aCleanTitle)));
                }, function() {
                    href = resolveRelativePath(href, bcFolder);
                    this.append($$1('<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">').append($$1('<a itemprop="item">').ifThen(hasMoniker, function() {
                        pieces = href.split("#");
                        this.attr("href", pieces[0] + (pieces[0].indexOf("?") > -1 ? "&" : "?") + monikerParams + (pieces[1] ? "#" + pieces[1] : ""));
                    }, function() {
                        this.attr("href", href);
                    }).html(aCleanTitle)));
                });
                if (bestMatch.length && node.children && node.children.length) {
                    makeDisplayHtml($breadcrumbs, node.children[bestMatch.shift()], bestMatch);
                }
            };
            findBestMatch(json, []);
            if (bestMatch.length) {
                makeDisplayHtml($breadcrumbsContainer, json[bestMatch.shift()], bestMatch);
            }
            $$1(function() {
                var $breadcrumbs = $$1("." + breadcrumbClass).empty();
                $breadcrumbsContainer.children().appendTo($breadcrumbs);
                if (!msDocs.settings.extendBreadcrumb || tocUrlQueue.length === 0) {
                    $breadcrumbs.children().has("a").last().addClass("mobile-breadcrumb");
                }
                bcFinished.resolve();
            });
        };
        var getBcData = function(url, fallbackUrls) {
            var hideBc = getMeta("hide_bc");
            if (hideBc === undefined || hideBc !== "true") {
                $$1.ajax({
                    url: resolveRelativePath(url),
                    dataType: "json",
                    timeout: timeout
                }).done(function(data, textStatus, jqXHR) {
                    bcFolder = getFolder(removeLocaleFromPath(bcUrl));
                    drawBc(normalizeToc(jqXHR.responseJSON));
                }).fail(function() {
                    if (fallbackUrls && fallbackUrls.length) {
                        getBcData(fallbackUrls[0], fallbackUrls.slice(1));
                    }
                });
            }
        };
        function saveSelectedPathToLocalStorage(element, root) {
            var store = JSON.parse(localStorage$2.getItem("toc-selected") || "{}");
            var el = element;
            var arr = [];
            while (el && el != root) {
                arr.unshift(Array.from(el.parentElement.children).indexOf(el));
                el = el.parentElement;
            }
            store[tocUrl] = arr;
            localStorage$2.setItem("toc-selected", JSON.stringify(store));
        }
        locale = getLocaleFromPath(document$1.location.pathname);
        locationFolder = getFolder(removeLocaleFromPath(document$1.location.pathname));
        nodes_to_expand = getMetas("nodes_to_expand");
        if (nodes_to_expand.length) {
            for (var i = 0; i < nodes_to_expand.length; i++) {
                nodes_to_expand[i] = resolveRelativePath(nodes_to_expand[i]).toLowerCase();
            }
            hasNodesToExpand = true;
        }
        relativeCanonicalUrl = getRelativeCanonicalUrl();
        relativeCanonicalUrlNoQuery = getRelativeCanonicalUrl(true).toLowerCase();
        relativeCanonicalUrlUniformIndex = getUniformIndex(relativeCanonicalUrlNoQuery);
        if (document$1.location.hash) {
            hasCanonicalHash = true;
            relativeCanonicalUrlNoQueryWithHash = relativeCanonicalUrlNoQuery + document$1.location.hash;
            relativeCanonicalUrlUniformIndexWithHash = relativeCanonicalUrlUniformIndex + document$1.location.hash;
        }
        if (document$1.documentElement.classList.contains("hasSidebar")) {
            if (tocContextUrl && tocContextUrl.length) {
                tocUrlQueue.push(tocContextUrl);
            }
            if (tocQueryUrl && tocQueryUrl.length) {
                tocUrlQueue.push(resolveRelativePath(decodeURIComponent(tocQueryUrl)));
            }
            if (tocMetaUrl && tocMetaUrl.length) {
                tocUrlQueue.push(tocMetaUrl);
            }
            getTocData(tocUrlQueue[0], tocUrlQueue.slice(1));
        }
        if (bcContextUrl && bcContextUrl.length) {
            bcUrlQueue.push(bcContextUrl);
        }
        if (bcQueryUrl && bcQueryUrl.length) {
            bcUrlQueue.push(bcQueryUrl);
        }
        if (bcMetaUrl && bcMetaUrl.length) {
            bcUrlQueue.push(bcMetaUrl);
        }
        bcUrl = bcContextUrl || bcQueryUrl || bcMetaUrl;
        getBcData(bcUrlQueue[0], bcUrlQueue.slice(1));
        if (msDocs.settings.extendBreadcrumb) {
            $$1(function() {
                $$1.when(tocFinished, bcFinished).done(function() {
                    extendBc();
                });
            });
        }
        contentLoaded.then(function() {
            var html = document$1.documentElement.classList;
            var mobileQuery = window$1.matchMedia("screen and (max-width: 768px)");
            if (!html.contains("hasSidebar")) {
                return;
            }
            var focusToc = function() {
                return (document$1.querySelector(".toc a.selected, .tutorial-toc .active-step a") || document$1.querySelector(".toc li a")).focus();
            };
            var constrainFocus = function(_a) {
                var target = _a.target;
                if (target instanceof HTMLElement && target.closest(".sidebar")) {
                    return;
                }
                if (mobileQuery.matches) {
                    close();
                } else {
                    focusToc();
                }
            };
            var collapseOnLinkClicks = function(_a) {
                var target = _a.target;
                if (target instanceof HTMLElement && target.closest(".toc a, .tutorial-toc a")) {
                    close();
                }
            };
            var openButtons = Array.from(document$1.querySelectorAll(".contents-button"));
            var close = function() {
                html.remove("sidebar-expanded");
                mobileQuery.removeListener(close);
                removeEventListener("focus", constrainFocus, true);
                removeEventListener("click", collapseOnLinkClicks);
                eventBus.unsubscribe(APExpandedChangedEvent, close);
                openButtons.filter(function(openButton) {
                    return openButton.style.display !== "none";
                });
                openButtons[0].focus();
            };
            var closeButton = document$1.querySelector(".sidebar-header");
            closeButton.onclick = close;
            var open = function() {
                html.add("sidebar-expanded");
                resetSidebar();
                focusToc();
                mobileQuery.addListener(close);
                addEventListener("focus", constrainFocus, true);
                addEventListener("click", collapseOnLinkClicks);
                eventBus.subscribe(APExpandedChangedEvent, close);
            };
            openButtons.forEach(function(openButton) {
                openButton.onclick = open;
            });
        });
    }
    function isInternalHref(url) {
        if (url && url.length && url.indexOf("/") === 0 && url.indexOf("//") === -1) {
            return true;
        }
        return url.indexOf("docs.microsoft.com") !== -1 || url.indexOf(window$1.location.hostname) !== -1;
    }
    function addScopeButton() {
        var form = document$1.getElementById("searchForm");
        if (!form) {
            return;
        }
        form.action = "https://docs.microsoft.com/" + msDocs.data.userLocale + "/search/index";
        form.querySelector("button#search").removeAttribute("name");
        var searchInput = form.querySelector('input[name="search"]');
        var rawScope = msDocs.data.context.searchScope || getMeta("scope");
        var isSearchPage = msDocs.data.pageTemplate === "SearchPage";
        if (isSearchPage) {
            var queryString = parseQueryString();
            rawScope = queryString.scope;
            var searchValue = queryString.search;
            if (searchValue !== undefined && searchValue.length > 0) {
                searchInput.value = searchValue;
            }
        }
        var hideScope = getMeta("hideScope");
        if (hideScope === "true" || rawScope === undefined || rawScope.length === 0) {
            return;
        }
        var scopes = rawScope.split(",").map(function(s) {
            return s.trim();
        }).filter(function(s) {
            return s.length;
        });
        if (scopes.length === 0) {
            return;
        }
        var scopeStyle = document$1.createElement("style");
        document$1.head.appendChild(scopeStyle);
        var padInputForScope = function(padding) {
            scopeStyle.textContent = padding === 0 ? "" : '\n\t\t\t.c-uhfh input[type="search"],\n\t\t\t.c-uhfh.c-sgl-stck .c-uhfh-actions .c-search input[type="search"] {\n\t\t\t\tpadding-' + (document$1.body.dir === "rtl" ? "right" : "left") + ": " + padding + "px !important;\n\t\t\t}";
        };
        var scope = scopes[scopes.length - 1];
        var scopeInput = document$1.createElement("input");
        scopeInput.name = "scope";
        scopeInput.value = scope;
        scopeInput.hidden = true;
        var scopeAnchor = document$1.createElement("a");
        scopeAnchor.classList.add("search-scope");
        scopeAnchor.href = "#";
        scopeAnchor.setAttribute("role", "button");
        var scopeSpan = document$1.createElement("span");
        scopeSpan.classList.add("search-scope-text");
        scopeSpan.textContent = scope;
        scopeAnchor.appendChild(scopeSpan);
        scopeAnchor.title = loc.searchScopeTitle.replace("{0}", scope);
        scopeAnchor.insertAdjacentHTML("beforeend", ' <span class="docon docon-navigate-close"></span>');
        scopeAnchor.onclick = function(event) {
            event.stopPropagation();
            event.preventDefault();
            scopeAnchor.parentElement.removeChild(scopeAnchor);
            scopeInput.parentElement.removeChild(scopeInput);
            searchInput.style.transition = "padding ease .5s";
            padInputForScope(0);
            jsllReady.then(function(awa) {
                return awa.ct.capturePageAction(event.target, {
                    actionType: awa.actionType.CLICKLEFT,
                    behavior: awa.behavior.OTHER,
                    content: {
                        event: "uhf-search-scope-removed",
                        name: "uhf-search-scope-link",
                        value: scope
                    }
                });
            });
        };
        scopeAnchor.style.top = "-1000px";
        scopeAnchor.style.display = "block";
        document$1.body.appendChild(scopeAnchor);
        var scopeWidth = scopeAnchor.getBoundingClientRect().width;
        document$1.body.removeChild(scopeAnchor);
        scopeAnchor.style.cssText = "";
        padInputForScope(Math.floor(scopeWidth + 12));
        form.appendChild(scopeInput);
        form.appendChild(scopeAnchor);
    }
    function addDataSourceInput() {
        if (checkIsArchived()) {
            var form = document$1.getElementById("searchForm");
            var searchDataSource = document$1.createElement("input");
            searchDataSource.name = "dataSource";
            searchDataSource.value = "previousVersions";
            searchDataSource.hidden = true;
            form.appendChild(searchDataSource);
        }
    }
    if (msDocs.data.brand !== "mooncake" && msDocs.data.brand !== "azure") {
        headerLoaded.then(addScopeButton);
        headerLoaded.then(addDataSourceInput);
    }
    msDocs.loc = loc;
    msDocs.data.rtl = rtlDictionary;
    msDocs.data.interactiveTypes = interactiveTypes;
    msDocs.data.jsllReady = jsllReady;
    msDocs.data.cookieConsent = cookieConsent;
    msDocs.data.isArchived = checkIsArchived();
    msDocs.functions.notifyContentUpdated = notifyContentUpdated;
    msDocs.functions.escape = escape$1;
    msDocs.functions.cookies = cookies;
    msDocs.functions.loadLibrary = loadLibrary;
    msDocs.functions.parseQueryString = parseQueryString;
    msDocs.functions.buildHtmlProfiles = buildHtmlProfiles;
    detectFeatures();
    $$1(dedupMain);
    $$1(detectHighContrast);
    ie10MobileFix();
    $$1(editLinkRedirect);
    $$1(fixDate);
    pluginDomReadyShield();
    pluginLALD();
    pluginAddState();
    pluginIfThen();
    initTheme();
    setDocumentLocale();
    initHeader();
    createToc();
    $$1(setupToc);
    $$1(makeCodeBlocks);
    if (pageSupportsMoniker(getMoniker())) {
        $$1(filterContentByMoniker);
    } else {
        $$1(renderInTopicTOC);
    }
    $$1(displayMonikerFallbackMessage);
    $$1(setupMap);
    $$1(handleArchive);
    setupDismissAlerts();
    $$1(affix);
    $$1(function() {
        return initTabs(document$1.body);
    });
    track();
    interceptCopy();
    initCookieConsent();
    $$1(ensureWbr);
    $$1(checkInnerTextSupported);
    $$1(function() {
        var monikerContainer = document$1.querySelector(".moniker-applies-to");
        if (monikerContainer === null) {
            return;
        }
        renderAppliesTo(monikerContainer);
    });
    $$1(displayTranslations);
    $$1(function() {
        handleHeadings(document$1.querySelector(".content"));
    });
    enableGoogleAnalytics();
    $$1(function() {
        return initDropdowns(document$1.body);
    });
    $$1(function() {
        return initSharingLinks(document$1.body, location.origin + location.pathname + location.search, document$1.title);
    });
    $$1(function() {
        return pageTemplateSpecific(msDocs.data.pageTemplate);
    });
    if (msDocs.data.hasComments) {
        if (msDocs.data.feedbackSystem === "GitHub") {
            $$1(initFeedback);
        } else if (msDocs.data.feedbackSystem === "LiveFyre") {
            $$1(initLiveFyre);
        }
    }
    $$1(renderBranchSelector);
    $$1(renderAzureSelectors);
    $$1(fixContent);
    $$1(function() {
        return initializeLightBox(document$1.querySelector("#main"));
    });
    $$1(wrapContentTables);
    $$1(function() {
        handleEngContentToggle(document$1.querySelector(".lang-toggle-container"));
    });
    initAuth();
    initActionPanel();
    contentLoaded.then(function() {
        return initRating({
            container: document$1.getElementById("openFeedbackContainer"),
            isArchived: checkIsArchived(),
            pageTemplate: msDocs.data.pageTemplate,
            storage: localStorage$2,
            pathname: location.pathname,
            mobile: document$1.documentElement.clientWidth < 1024
        });
    });
    initThemeFallback();
    initZonePivots();
    $$1(handleModals);
})();