$(document).ready(function(){
/* ==========================================================================
   Temporary: remove
   ========================================================================== */
    if(!$('body').hasClass('workflow') && !$('#languageRootGuide').length) {
        $('.main').find('.topContentWrap, .main-heading, .ContextNameCell').wrapAll('<div class="main-heading-wrapper"><div class="inner">');
        $('.main-heading-wrapper + div').wrapInner('<div class="inner">');
    }
    if(!$('body').hasClass('workflow')){
        $('section').wrapInner('<div class="inner">');
    }
    $('.functionIntroWrap').wrap('<section class="function-wrapper"><div class="inner">');
    $('.FormatList, .formatIntroWrap, .indicatorIntroWrap').wrap('<section class="format-wrapper"><div class="inner">');
    $('.main-content').contents().unwrap();
    $('.modified').wrap('<section class="modified-wrapper"><div class="inner">');
    $('#SeeAlso, #TechNote, #Tutorials, section[id^="Related"]').addClass('related-links');
    if($('body#guide, body#techNote').length) {
        $('.main-heading-wrapper ~ *').not('.related-links, .feedback-wrapper').wrapAll('<section><div class="inner">');
    }
    $('.DeviceImage, .DeviceImageCaption').wrapAll('<section><div class="inner">');
    if(!$('body#guide, body#techNote').length) {
        $('.intro').wrap('<section><div class="inner">');
    }

});