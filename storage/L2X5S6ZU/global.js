/* REFERENCE SITE GLOBAL FUNCTIONALITIES

   developer:   suef
   requires:    jQuery
   ========================================================================== */

$(document).ready(function(){
/* ==========================================================================
   Feedback
   ========================================================================== */
    $('.feedback').click(function(){
        $('#feedbackForm').toggleClass('opened');
    });
    $('#submit').on("click", function(e) {
        e.preventDefault();
        var feedbackval = $('#feedbackMessage').val();

        if(feedbackval === null || feedbackval === '')
        {
           $('#feedbackMessageTable').addClass('errorHighlight');
           $('#feedbackMessage').next('.errorbox').removeClass('hide');
        }
        else {
            $.post("/language-assets/inc/feedback.cgi", {
                feedback: $('#feedbackMessage').val(),
                name: $('input#name').val(),
                email: $('input#email').val(),
                url: document.URL
            }).done(function() {
                $('div#thank_you').removeClass('hide');
                $('table#formTable').addClass('hide');
                $('#feedbackMessageTable').removeClass('errorHighlight');
                
            }).fail(function() {
                $('#feedbackMessageTable').addClass('errorHighlight');
                $('#feedbackMessage').next('.errorbox').addClass('hide');
                $('#feedbackNotSent').removeClass('hide');
            });
        }
    });
   
    $('.animation').on('click', function(){
        if($(this).find('.video img').length) {
            var width = $(this).find('.video img').attr('data-video').split(' ')[0];
            var height = $(this).find('.video img').attr('data-video').split(' ')[1];
            var src = $(this).find('.video img').prop('src').replace(/\.[^/.]+$/, "") + '.mp4';
            $(this).find('.video').html('<video width="'+width+'" height="'+height+'" loop><source src="'+src+'" type="video/mp4"></video>');
        }
        if($(this).find('video').get(0).paused) {
            $(this).find('video').get(0).play();
            $(this).addClass('pause');
        } 
        else {
            $(this).find('video').get(0).pause();
            $(this).removeClass('pause');
        }
    });

    if($('.main-title-top').length && $('.experimental').length) {
        $('.main-heading').addClass('make-room');
    }

/* ==========================================================================
   No Orphans
   ========================================================================== 
    var titleWords = $('.main-title').text().split(' ');
    var titleWordsLength = titleWords.length;
    var concatinated = '';
    if(titleWordsLength > 1) {
        for(i = 0; i < titleWordsLength; i++) {
            if(i < titleWordsLength - 1) {
                concatinated += titleWords[i] + ' ';
            } else {
                concatinated = concatinated.trim();
                concatinated += '&nbsp;' + titleWords[i];
            }
        }
        $('.main-title').html(concatinated);
    }
        */

/* ==========================================================================
   Notes tables styling based on column width
   ========================================================================== */
    $('.NotesTable').each(function() {
        if ($(this).find('col').length == 4) {
            $(this).addClass('three-col');
        } else if ($(this).find('col').length == 3) {
            $(this).addClass('two-col');
        }
    });

/* ==========================================================================
   Sticky Alphabet listing
   ========================================================================== */
    if ($('.AlphabetListingJumpTo').length) {
        var left = document.getElementsByClassName('AlphabetListingJumpTo')[0];
        var stop = (left.offsetTop - 60);
        var lastScroll = 0;
        window.onscroll = function(e) {
            var st = $(this).scrollTop();
            var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            if (scrollTop >= stop && st < lastScroll) {
                left.className = 'AlphabetListingJumpTo sticky';
                $('.AlphabetListingJumpTo').css('top', _headerThin + $('.topContentWrap').height());
            } else {
                left.className = 'AlphabetListingJumpTo';
            }
            lastScroll = st;
        }
        $('.AlphabetListingJumpTo a').click(function() {
            var id = $(this).prop('href').split("#")[1];
            $('html,body').animate({
                scrollTop: $('#' + id).offset().top - 65 //offset height of header here too.
            }, 1000);
        });
    }
});

/* ==========================================================================
   Highlight
   ========================================================================== */
    $('.main-heading').on('click', '.highlight-link', function() {
        $('highlighting').not('.highlight-link').toggleClass('highlighting');
        $('.highlight-link').toggleClass('highlighting');
        $('.modified-text').toggleClass('highlighting');
        if($('.highlight-link').length) {
            $('#DetailsAndOptions h1, .alternateHeader h1').toggleClass('highlighting');
        }
    });
/* ==========================================================================
   Tooltips in top icons
   ========================================================================== */
    if($('.media')) {
        $('.media').on('mouseenter', function(){
            $('.media').removeClass('hover');
            $(this).addClass('hover');
        });
        $('.media').on('click', function(){
            $(this).toggleClass('hover');
        });
        $('.tooltip, .media-icons').on('mouseleave', function(){
            $('.media').removeClass('hover');
        });
    }
$(window).on('load resize', function() {
/* ==========================================================================
   Ins and outs collapsing to numbers with half brackets
   ========================================================================== */
    $('.lab').each(function(){
        if($(this).text().indexOf('[') > -1) {
            var number = $(this).text().split('[')[1].split(']')[0];
            if($(window).outerWidth() < 600) {
                if($(this).parents('.InCell').find('.number').length < 1) {
                    $(this).parents('.InCell tr').prepend('<td class="number">'+number+'</td>');
                }
                if($(this).parents('.OCell').find('.number').length < 1) {
                    $(this).parents('.OCell tr').prepend('<td class="number">'+number+'</td>');
                }
            }
        }
    });
/* ==========================================================================
   Images swap
   ========================================================================== */
    $('.InCell img').each(function() {
        if($(this).is('[data-src]')) {
            if ($(window).width() < 600) {
                var src = $(this).attr('data-src');
                var extension = src.split('.')[2];
                var w = $(this).attr('data-small').split(' ')[0];
                var h = $(this).attr('data-small').split(' ')[1];
                if (src.indexOf('_405') < 0) {
                    $(this).prop('src', src.replace('.'+extension, '_405.'+extension));
                    $(this).prop('width', w);
                    $(this).prop('height', h);
                }
            } else {
                var src = $(this).attr('data-src');
                var w = $(this).attr('data-big').split(' ')[0];
                var h = $(this).attr('data-big').split(' ')[1];
                $(this).prop('src', src);
                $(this).prop('width', w);
                $(this).prop('height', h);
            }
        }
    });
/* ==========================================================================
   Search swap
   ========================================================================== */
    if($(window).width() < 600) {
        $('.no-bfc').prop('action', '/search/');
        $('#_search-input').prop('name', 'q');
        if($('input[name="source"]').length) {
            $('input[name="source"]').remove();
        }
    }
});

/* ==========================================================================
   Back to top link
   ========================================================================== */
$(window).on('load resize scroll', function() {
    if($('.feedback').length) {
        var offset = 250;
        var duration = 100;
        var main_scroll_height = $('.feedback').offset().top - 100;
        var topLinkPos = $('.footer-links .toplink').offset().top;
        var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        if ($(this).scrollTop() > offset) {
            $('.footer-links .toplink').fadeIn(duration);
            if (topLinkPos > main_scroll_height) {
                $('.footer-links .toplink').addClass('above-footer');
            } else {
                $('.footer-links .toplink').removeClass('above-footer');
            }
        } else {
            $('.footer-links .toplink').fadeOut(duration);
        }
    }
});
$(document).ready(function(){
    $('.toplink').click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 100);
        return false;
    });
});
$(window).on('ready load hashchange', function() {
/* ==========================================================================
   Open anchor location even on closed content
   ========================================================================== */
   if(window.location.hash) {
        var jumpLocation = window.location.hash.replace('#','');
        if(isNaN(jumpLocation) == false) {
            var foundLocation = false;
            $('section a').each(function(){
                if($(this).prop('name') == jumpLocation) {
                    foundLocation = true;
                    $(this).parents('.hideable').prev('.toggle').addClass('open');
                    if($(this).parents('section').find('.NotesThumbnails').length) {
                        $(this).parents('.hideable').prev('.NotesThumbnails').prev('.toggle').addClass('open');
                    }
                }
            });
            if(foundLocation == false && $('#Examples').length) {
                $('.load').each(function(i){
                    var load = $(this);
                    load.attr('data-content', i+1);
                    var index = $(this).attr('data-content');
                    var fileurl = 'Files/'+baselang+'/'+baselang.split('.')[0].toLowerCase()+index+'.html';
                    $.ajax({
                        type: "GET",
                        async: false,
                        url: fileurl,
                        dataType: "html",
                        success: function(data) {
                            if(data.indexOf(jumpLocation) > -1) {
                                load.addClass('open');
                                load.next('.hideable').empty().html(data);
                            }
                        }
                    });
                });
            }
        }
    }
});

function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}