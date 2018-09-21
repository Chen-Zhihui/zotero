$(document).ready(function(){
    var link = window.location.hash;
    if(link !== '' && link !== '#_') {
        var tab = link.replace('#', '#tab-');
        setTimeout(function (){
           $('body, html').stop().delay(2000).animate({
                scrollTop:   $(tab).offset().top
            }, 500);
        }, 0); 
    }
    $('.podheader').click(function(){
        var clickedPod = $(this);
        $('.podheader').not(clickedPod).parents('.thumb').removeClass('selected');
        clickedPod.parents('.thumb').toggleClass('selected');
        $('.podheader').not(clickedPod).next('.links-list').removeClass('show');
        clickedPod.next('.links-list').toggleClass('show');
        var height = clickedPod.next('.links-list').outerHeight() - 1;
        $('.spacer').remove();
        if($('.links-list.show').length) {
            clickedPod.next('.links-list').after('<div class="spacer" style="height: '+height+'px"></div>');
        } else {
            window.history.pushState({ page: "Root Guide" }, "Root Guide", "/language/");
        }
    });
});
$(window).on('resize', function(){
    if($('.thumb .show').length) {
        var height = $('.links-list.show').outerHeight() - 1;
        $('.spacer').remove();
        $('.links-list.show').after('<div class="spacer" style="height: '+height+'px"></div>');
    }
});
$(window).on('ready load hashchange', function(){
    var link = window.location.hash;
    if(link !== '' && link !== '#_') {
        targetLink = link.replace('#', '#tab-');
        $(link).attr('id', targetLink.replace('#',''));
        $('.podheader').not(targetLink).parents('.thumb').removeClass('selected');
        $(targetLink).parents('.thumb').addClass('selected');
        $('.thumb').children('.podheader').not(targetLink).next('.links-list').removeClass('show');
        $('.thumb').find(targetLink).next('.links-list').addClass('show');
        var height = $(targetLink).next('.links-list').outerHeight() - 1;
        $('.spacer').remove();
        $(targetLink).next('.links-list').after('<div class="spacer" style="height: '+height+'px"></div>');
    }
});