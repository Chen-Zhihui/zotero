$(document).ready(function() {
    $('.InCell').wrap('<div class="clipboard">');
    $('.InCell').find('.IFL').after('<div class="tooltip"><i></i>Copy to clipboard.</div>');
    
    /* Mouse events
    ============================================================*/
    $(document).on('mouseenter', '.InCell', function() {
        var inCell = $(this);
        load_copy_text(inCell);
        inCell.addClass('hover');
        var visible = $(this).find('.tooltip').isOnScreen(0.5, 0.5);
        if(!visible) {
            $(this).find('.tooltip').addClass('bottom');
        } else {
            $(this).find('.tooltip').removeClass('bottom');
        }
        $('.InCell .tooltip').html('<i></i>Copy to clipboard.');
    });
    $(document).on('mouseleave', '.InCell', function() {
        $(this).removeClass('hover');
        $('.tooltip').removeClass('copied');
    });
    $(document).on('mouseup', '.InCell', function(e){
        var clicked_element = $(this);
        select_copy_text(clicked_element.find('.text').prop('id'));

        // check support for copy
        if (document.queryCommandSupported('copy')) {
            var successful = document.execCommand('copy');
            var text = '';
            var msg = successful ? text = '<i></i>Copied!' : text = 'Unable to copy.';
            $('.InCell .tooltip').html(text);
            $('.InCell .tooltip').html('<i></i>Copied!');
            $(this).find('.tooltip').addClass('copied');
        }
        else {
            $('.IFL').removeClass('show');
            $(this).find('.IFL').addClass('show');
            $(document).on('mouseup', '.close', function(e){
                e.stopPropagation();
                $(this).parents('.IFL').removeClass('show');
            });
        }
    });
    /* touch events
    =====================================================*/
    $(document).on('touchstart', '.InCell', function() {
        window.oncontextmenu = function (event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
        load_copy_text($(this));
        $(this).addClass('hover');
        tapFlag = true;
    });
    $(document).on('touchend', '.InCell', function(e) {
        $('.tooltip').removeClass('copied');
        if (tapFlag !== false) {

            select_copy_text($(this).find('.text').prop('id'));
            // check support for copy
            if (document.queryCommandSupported('copy')) {
                var successful = document.execCommand('copy');
                $(this).find('.tooltip').html('<i></i>Copied!');
                $(this).find('.tooltip').addClass('copied');
            }
            else {
                $(this).find('.IFL').addClass('show');
                $(document).on('touch', '.close', function(e){
                    e.stopPropagation();
                    $(this).parents('.IFL').removeClass('show');
                });
            }
            e.preventDefault();
            touchFlag = false;
        }
    });
    $(document).on('touchmove', function(e) {
        tapFlag = false;
    });
    var select_copy_text = function(el) {
        var doc = window.document, sel, range;
        var el = document.getElementById(el);
        if (window.getSelection && doc.createRange) {
            sel = window.getSelection();
            range = doc.createRange();
            range.selectNodeContents(el);
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (doc.body.createTextRange) {
            range = doc.body.createTextRange();
            range.moveToElementText(el);
            range.select();
        }
    };
    var load_copy_text = function(clicked_element) {
        var id_out = clicked_element.find('.IFL').prop('id');
        var file = 'Files/'+ baselang + '/' + id_out.replace('_out','') +'.txt';
        if(clicked_element.find('.IFL').text() == '') { // if file hasn't loaded already
            $.ajax({
                url: file,
                dataType: "text",
                success: function(data) {
                    var text = data.replace(/(\r|\n)+/g, '\n');
                    var innertxt = text.match(/<pre(?:.*?)>(.|\n)+<\/pre>/)[0].replace(/(<([^>]+)>)/ig,"");
                    $('#'+id_out).html('<span class="close">&#x2715;</span><pre id="'+id_out+'_text" class="text">'+innertxt+'</pre>');
                }
            });
        }
    };
});
$.fn.isOnScreen = function(){
    var element = this.get(0);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}