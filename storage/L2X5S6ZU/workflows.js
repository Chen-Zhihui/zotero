/* ==========================================================================
   Workflow Tabs
   ========================================================================== */
$(window).on('ready load resize hashchange', function(){
    if($('body').hasClass('workflow')) {
        var location = window.location.hash;
        if(location !== '' && location.indexOf('-tab') > -1) {
            setCookie("workflow-tab", location);
            $('.platform-container').addClass('hide');
            $('.workflow-tabs li a').removeClass('selected');
            $('.workflow-tabs li').removeClass('noborder');
            $(location.replace('-tab','')).removeClass('hide');
            $(location.replace('#','.')).addClass('selected');
            $(location.replace('#','.')).parents('li').next().addClass('noborder');
        }
        if(location == '') {
            $('.workflow-tabs .selected').parents('li').next().addClass('noborder');
        }
        if(getCookie('workflow-tab')!==null && !$('body').hasClass('workflow-guide')) {
            location = getCookie('workflow-tab');
            if($(location).length) {
                $('.platform-container').addClass('hide');
                $('.workflow-tabs li a').removeClass('selected');
                $('.workflow-tabs li').removeClass('noborder');
                $(location.replace('-tab','')).removeClass('hide');
                $(location.replace('#','.')).addClass('selected');
                $(location.replace('#','.')).parents('li').next().addClass('noborder');
            }
        }
        $('body, html').scrollTop(0);
    }
});
$(document).ready(function(){
    $('.inactive-link').click(function(e){
        e.preventDefault();
    });
});