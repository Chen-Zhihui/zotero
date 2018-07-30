var vOffset_init = 65;
var vOffset = vOffset_init;
var c = 'collapsed';

function toggleList(toggle, content, maxItems) {
    if (toggle.css('display') == 'none') {
        vOffset = vOffset_init;
        toggle.removeClass(c);
        content.show();
        return;
    } else
        vOffset = 8;

    if (maxItems > content.children().length)
        return;
    content.hide();
    toggle.addClass(c);
}

$(function () {
    $('a[href*=\\#]:not([href=\\#])').on('click', function (e) {
        if (e.which == 2 || e.metaKey || e.ctrlKey || e.shiftKey)
            return true;
        var target = $(this.hash.replace(/(\.)/g, "\\$1"));
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            setTimeout(function () {
                $('html, body').animate({scrollTop: target.offset().top - vOffset}, 50);}, 50);
        }
    });
    // html5 video animation play/pause controls
    $('.animation').parent().click(function () {
        var video = $(this).children(".animation").get(0);
        if (typeof video.currentSrc == 'undefined')
            return;
        var control = $(this).children(".playcontrol");
        if (video.paused) {
            control.fadeOut(); video.play();
        } else {
            control.fadeIn(); video.pause();
        }
    });
    // enable controls for animations
    $('.animation').parent().each(function() {
        var src = $(this).children(".animation").get(0).currentSrc;
        if (typeof src != 'undefined')
            $(this).children(".playcontrol").show();
    });
    // toggle code wrap
    $('span.wrap').click(function() {
       $(this).closest('pre').toggleClass('wrap');
    });
});

$(window).on('load', function () {
    var hashChanged = function() {
        var h = window.location.hash;
        var re = /[^a-z0-9_\.\#\-]/i
        if (h.length > 1 && !re.test(h)) {
            setTimeout(function () {
                var tgt = $(h.replace(/(\.)/g, "\\$1"));
                tgt = tgt.length ? tgt : $('[name=' + h.slice(1) + ']');
                $(window).scrollTop(tgt.offset().top - vOffset);
            }, 0);
        }
    }
    $(window).on('hashchange', hashChanged);
    hashChanged.call();

    var toggleWrap = function() {
        $('pre').each(function() {
            if ($(this).hasClass('wrap'))
                return;
            var s = $(this).get(0).scrollWidth > $(this).innerWidth();
            $(this).children('.wrap').toggle(s);
        });
    };
    toggleWrap.call();
    $(window).resize(toggleWrap);

    if (!$('.sidebar .toc')[0] && $('.descr h2').length) {
        var toc = "<div class=\"toc\"><h3><a name=\"toc\">Contents</a></h3><ul>";
        $('.descr h2').each(function() {
            toc += "<li class=\"level1\"><a href=\"#" + $(this).attr('id') +"\">" + $(this).text() + "</a></li>\n";
        });

        toc += "</ul></div>";
        $('#sidebar-content').before(toc);
    }

    if ($.trim($('.sidebar .toc').html())) {
        $('<div id="toc-toggle"></div>').prependTo('.sidebar .toc');
        var toc = $('.sidebar .toc ul');
        var tocToggle = $('#toc-toggle');
        var tocCallback = function() { toggleList(tocToggle, toc, 4); };

        $('#toc-toggle').on('click', function(e) {
            e.stopPropagation();
            toc.toggle();
            tocToggle.toggleClass(c);
        });

        tocCallback.call();
        $(window).resize(tocCallback);
    } else {
        var nbCallback = function() {
            if ($('#navbar').css('position') == 'fixed')
                vOffset = vOffset_init;
            else
                vOffset = 8;
        };
        nbCallback.call();
        $(window).on('resize', nbCallback);
    }

    if ($.trim($("#sidebar-content").html())) {
        $('#sidebar-content h2').first().clone().prependTo('#sidebar-content');
        $('<div id="sidebar-toggle"></div>').prependTo('#sidebar-content');
        var sb = $('#sidebar-content .sectionlist');
        var sbToggle = $('#sidebar-toggle');
        var sbCallback = function() { toggleList(sbToggle, sb, 0); };

        $('#sidebar-toggle').on('click', function(e) {
            e.stopPropagation();
            sb.toggle();
            sbToggle.toggleClass(c);
        });

        sbCallback.call();
        $(window).resize(sbCallback);
    }
});

$(document).ready(function(){
    setTimeout(function(){ $('#gsc-i-id1').attr('placeholder', ' Search Documentation'); }, 250);
    if (window.location.pathname.lastIndexOf('/archives', 0) === 0) {
        var titleBar = $('#main_title_bar');
        if (titleBar) {
            titleBar.children('h1:first').html('<a href="/archives/index.html">Qt Documentation Archives</a>');
            var navRoot = titleBar.next().children(":first");
            if (navRoot) {
                if (navRoot.children('a').length > 0)
                    navRoot.children(":first").text(navRoot.text() + ' (Archived)');
                else
                    navRoot.html(navRoot.text() + ' (Archived)');
            }
        }
    }
});
