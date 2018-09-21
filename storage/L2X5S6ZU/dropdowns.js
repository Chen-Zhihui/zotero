/* ==========================================================================
   Dropdowns
   ========================================================================== */
$(document).ready(function(){
    $("ul.dropdown .menu").on('click', function(e) {
        var menu = $(this);
        e.preventDefault();
        $("ul.dropdown .menu").not(menu).parents('li').removeClass("hover");
        menu.parents("li").toggleClass("hover");
        var elm = menu.next('.sub_menu');
        var l = elm.offset().left;
        var w = elm.outerWidth();
        var docW = $(".main").outerWidth();
        var isEntirelyVisible = (l + w <= docW);
        if (!isEntirelyVisible || l == undefined) {
            if (w > 425 && docW <= 430) {
                menu.parents("li").addClass("shrink");
            }
            if($('.collapsed-dropdown').length) {
                menu.parents("li").addClass('right-edge');
                menu.parents("li").removeClass('edge');
            } else {
                menu.parents("li").addClass('edge');
                menu.parents("li").removeClass('right-edge');
            }
        } 
        else {
            menu.parents("li").removeClass('edge');
            menu.parents("li").removeClass('right-edge');
        }
        var mainWrapperHeight = $('.main').height(); // height of main wrapper
        var dropdownHeight = $('li.hover ul').height() + 291; // height of selected dropdown
        if (dropdownHeight > mainWrapperHeight && menu.parents("li").hasClass("hover")) {
            $('.main').height(dropdownHeight);
        } else {
            $('.main').css('height', 'auto');
        }
    });
    $('body').on('touchstart', '.sub_menu a', function(){
        window.location = $(this).prop('href');
    });
    $('.dropdown > li').on('mouseleave touchend', function(){
        $(this).removeClass("hover").removeClass("edge");
        $('.main').css('height', 'auto');
    });
});
$(window).on('load ready resize scroll', function(){
    if($(this).width() < 485) {
        $('.dropdown').addClass('hide');
        $('.collapsed-dropdown').removeClass('open');
        $('.topContentWrap').removeClass('open');
        if(!$('.collapsed-dropdown').length) {
             $('.dropdown').before('<div class="collapsed-dropdown"><span class="square"></span><span class="square"></span><span class="square"></span></div>');
        }
    } else {
        $('.dropdown').removeClass('hide');
        $('.collapsed-dropdown').remove();
    }
    if($(this).width() < 485) {
        $('.topContentWrap').addClass('collapsed');
    }
    else {
        $('.topContentWrap').removeClass('collapsed');
    }
});
$('body').on('click', '.collapsed-dropdown', function(){
    $('.dropdown').toggleClass('hide');
    $(this).toggleClass('open');
    $('.topContentWrap').toggleClass('open');
});