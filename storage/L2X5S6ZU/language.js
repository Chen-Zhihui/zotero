$(document).ready(function(){
     /* ==========================================================================
   Search
   ========================================================================== */
    $('.clearfield').click(function(e){
        e.preventDefault();
        $('#query').prop('value', '');
        $('.clearfield').hide();
        $('#query').focus();
    })
    $("#ref-search-form").submit(function() {
        $.ajax({
            type: "GET",
            traditional: true,
            url: "/search-api/search.json",
            dataType: "json",
            data: {
                query: $("#query").val(),
                limit: 3,
                disableSpelling: true,
                collection: ["documentation10"],
                fields: "uri,title"
            },

            success: function(data) {
                if(data.adResult) {
                    if(data.adResult.fields.title[0] == $("#query").val()) {
                        location.href = "/language/" + data.adResult.fields.uri[0] + ".html?q=" + encodeURIComponent($("#query").val());
                    } else {
                            location.href = "/search/?q="+ encodeURIComponent($("#query").val());
                    }
                } else {
                    location.href = "/search/?q="+ encodeURIComponent($("#query").val());
                }
            }

        });
        return false;
    });
    if(window.location.search.length) {
        if(window.location.search.indexOf('q=') > -1) {
            $('.search #query').prop('value', decodeURIComponent(window.location.search.split('q=')[1]));
            $('.search #query').addClass('term-found');
        }
    }
    $('.search #query').on('keyup', function(){
        $('.search #query').addClass('term-found');
    }); 
});
$(document).on('ready change keyup', function(){
    if($('#query').prop('value') == '') {
        $('.clearfield').hide();
    }
});
$(document).on('keyup ready', function(){
    if($('#query').prop('value') !== '') {
        $('.clearfield').show();
    }
});

/* ==========================================================================
   Sticky dropdown
   ========================================================================== */
var scrollPosition = 0;
$(window).on('scroll', function() {
    var currentScrollPosition = $(this).scrollTop();
    var offset = $('.header').height() + $('.main-heading-wrapper').height() - 50;
    var stickyHeight = $('.main-heading-wrapper').not('.sticky').outerHeight()+50;
    if($(this).scrollTop() > offset) {
        $('.main-heading-wrapper').addClass('sticky');
        if(!$('.main-heading-wrapper .topContentWrapInner').length) {
            $('.main-heading-wrapper').wrapInner('<div class="inner topContentWrapInner"></div>');
        } else {
            $('.main-heading-wrapper .topContentWrapInner').addClass('inner');
        }
        if(!$('.main-heading-wrapper').next('.filler').length) {
            $('.main-heading-wrapper').after('<div class="filler" style="height: '+stickyHeight+'px"></div>');
        } 
    }
    if(currentScrollPosition < scrollPosition) {
        if($(this).scrollTop() < offset) {
            $('.main-heading-wrapper').next('.filler').remove();
            $('.main-heading-wrapper').removeClass('sticky');
        $('.main-heading-wrapper .topContentWrapInner').removeClass('inner');
        }
    }
    scrollPosition = currentScrollPosition;
});