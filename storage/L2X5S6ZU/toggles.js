$(document).ready(function(){
/* ==========================================================================
   Toggles
   ========================================================================== */
    $('.toggle').click(function(){
        if($(this).parents('section').attr('id') !== "Examples") {
            $(this).toggleClass('open');
            $(this).parents('section').toggleClass('open');
        }
    });
    $('#Examples').on('click', '.toggle', function(){
        var clicked = $(this);
        clicked.toggleClass('open');
        if(clicked.hasClass('load')) {
            $('.load').each(function(i){
                $(this).attr('data-content', i+1);
            });
            var index = clicked.attr('data-content');
            var fileurl = 'Files/'+baselang+'/'+baselang.split('.')[0].toLowerCase()+index+'.html';
            $.ajax({
                type: "GET",
                async: false,
                url: fileurl,
                dataType: "html",
                success: function(data) {
                    clicked.next('.hideable').html(data);
                }
            });
        }
    });
    if($('#Examples').length) {
        $('#Examples .hideable').last().addClass('last-hideable');
    }
    $('.open-all').click(function(){
        if(window.location.search.indexOf('?view=all') < 0) {
            window.history.pushState({ page: "View All" }, "View All", "?view=all");
        }
        openAll();
    });
    if(window.location.search.indexOf('?view=all') > -1 && $('.open-all').length) {
        openAll();
    }
    function openAll() {
        $('.open-all').removeClass('on');
        $('.close-all').addClass('on');
        $('#Examples .toggle').addClass('open');
        if($('#Examples .toggle').hasClass('load')) {
            $('.load').each(function(i){
                load = $(this);
                load.attr('data-content', i+1);
                index = load.attr('data-content');
                fileurl = 'Files/'+baselang+'/'+baselang.split('.')[0].toLowerCase()+index+'.html';
                $.ajax({
                    type: "GET",
                    async: false,
                    url: fileurl,
                    dataType: "html",
                    success: function(data) {
                        load.next('.hideable').html(data);
                    }
                });
            });
        }
    }
    $('.close-all').click(function(){
        $('.open-all').addClass('on');
        $('.close-all').removeClass('on');
        $('#Examples .hideable .toggle').removeClass('open');
    });
    $('#DetailsAndOptions, .alternateHeader').click(function(){
        if(!$(this).hasClass('open') && $('.NotesThumbnails').length > 0) {
            $(this).find('h1').toggleClass('open');
            $(this).toggleClass('open');
        }
    });
    $('#DetailsAndOptions .toggle, .alternateHeader .toggle').click(function(e){
        e.stopPropagation();
        $(this).parent('section').toggleClass('open');
    });
});