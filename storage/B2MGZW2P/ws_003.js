// WS GUI-related functions

(function($){

/**
 * Toggle a specified DIV element via Javascript call on a Subhead title click
 *
 * NOTE: if div_id does not match any valid DIV element id, then this function
 *   exits gracefully (fails silently) and nothing happens
 */
WS.gui.togglesubhead = function(div_id, on_icon, off_icon, callback) {
    if(div_id.indexOf('#') < 0) {
        div_id = '#' + div_id;
    }
    if($(div_id) == null) { return; }

    if($(div_id).css('display') == 'none') {
        $(div_id+'_icon').attr('src', off_icon);
    } else {
        $(div_id+'_icon').attr('src', on_icon);
    }

    if(typeof(callback) == 'undefined') {
        $(div_id).toggle('blind',{}, 500);
    } else {
        $(div_id).toggle('blind',{}, 500, callback);
    }
    
    return false;
};


/////////////////////////////////////////////////////////////////////////////////
// toggle-it functions
/////////////////////////////////////////////////////////////////////////////////

WS.gui.toggleIt = function(div_selector, on_icon, off_icon, icon_selector, on_callback, off_callback) {
    var div = $(div_selector),
        icon = $(icon_selector);
     
    //Ensure that the callbacks point to actual functions
    if (typeof(on_callback) == 'string') {
        on_callback = eval(on_callback);
    }
    if (typeof(on_callback) == 'string') {
        off_callback = eval(off_callback);
    }

    //Toggle the elements to show/hide
    if(icon !== undefined) {
        if(div.css('display') == 'none') {
            icon.attr('src', on_icon);
            
            if (typeof(on_callback) == 'function') {
                on_callback(div, icon, div_selector, icon_selector);
            }
        } else if (div.length == 0 && typeof(on_callback) == 'function') {
            icon.attr('src', on_icon);
            
            on_callback(div, icon, div_selector, icon_selector);
        } else {
            icon.attr('src', off_icon);
            
            if (typeof(off_callback) == 'function') {
                off_callback(div, icon, div_selector, icon_selector);
            }
        }
    }

    div.toggle();
};

$(document).ready(function () {
        $(".toggle-it").live('click', 
                             function(evt) {
                                 var elem = $(this),
                                     on_icon = elem.attr('data-toggle-it-on-icon'),
                                     off_icon = elem.attr('data-toggle-it-off-icon'),
                                     div_selector = elem.attr('data-toggle-it-selector'),
                                     icon_selector = elem.attr('data-toggle-it-icon-selector'),
                                     on_callback = elem.attr('data-toggle-it-on-callback'),
                                     off_callback = elem.attr('data-toggle-it-off-callback');

                                 // had master plan of getting target to determine icon
                                 // the problem is that the user might click to the edge of the icon
                                 // hence the target is the A not the IMG
                                 WS.gui.toggleIt(div_selector, on_icon, off_icon, icon_selector, on_callback, off_callback);
                             });
});



//This function will take a row classname and convert all rows of that classname 
// to the Odd/Even scheme everywhere else in the system
WS.gui.fixRowColors = function(className){
    $("tr." + className + ":visible").removeClass("even").removeClass("odd");
    $("tr." + className + ":visible:odd").addClass("even");
    $("tr." + className + ":visible:even").addClass("odd");
}

WS.gui.get$ = function(elem) {
    if(typeof(elem) == 'string' && elem.substring(0,1) != '#') {
        elem = '#' + elem;
    }
    return $(elem);
};

WS.gui.getDimensions = function(elem) {
    var dims = {};
    var $elem = WS.gui.get$(elem);
    dims.h = $elem.height();
    dims.w = $elem.width();
    dims.height = dims.h;
    dims.width = dims.w;
    return dims;
}
// utility function to get coords in both top/left and x/y pairs,
// for compatibility with jQuery and other 3rd party libs
WS.gui.getPosition = function(elem) {
    var pos = WS.gui.get$(elem).offset();
    pos.x = pos.left;
    pos.y = pos.top;
    return pos;
};

WS.gui.setPosition = function(elem, pos) {
    var left = pos.x || pos.left || 0;
    var top = pos.y || pos.top || 0;
    WS.gui.get$(elem).css('left', left + 'px').css('top', top + 'px');
}

WS.gui.appendChildNodes = function(node /*, nodes...*/) {
    var args = $.merge([],arguments);
    var parent = args.shift();
    $(parent).append(args);
}

WS.gui.showAllEmptySections = function(e) {
    $('.empty-section').toggle();
    return false;
};

$(document).ready(function() {
    if($('#show-empty-link').length > 0) {
        var empty_sections = $('.empty-section').hide();
        var num_empty = empty_sections.length;
        if(num_empty == 0) {
            $('#show-empty-link-section').hide();
        } else if(num_empty == 1) {
            $('#empty-section-info').text('1 empty section.');
            $('#show-empty-link a').text('Toggle empty section').
                click(WS.gui.showAllEmptySections);
        } else {
            $('#empty-section-info').text(num_empty + ' empty sections.');
            $('#show-empty-link').click(WS.gui.showAllEmptySections);
        }
    }
    $('.no-dbl-click').click(function(e) {
        // links set to no-dbl-click should ignore second click
        var $this = $(this);
        var original_enabled = $this.attr('enabled');
        var tmpDisable = function() {
            $this.attr('enabled',false);
        };
        var reEnable = function() {
            $this.attr('enabled', original_enabled);
        };
        setTimeout(tmpDisable,2);
        setTimeout(reEnable, 1200);
    });
});

///////////////////////////////////////////
// qTip/tooltip functionality
///////////////////////////////////////////

WS.gui.applyQtip = function(elem, is_json){
    if(arguments.length < 2){
        is_json=false;
    }
    var show_handler = (is_json)?'click':'focus';
    var $qt = $(elem);
    var msg = $qt.attr('data-qtip-msg');
    var content = msg;
    if(is_json){
        var url = $qt.attr('data-qtip-url');
        content = {msg: msg,
                   url: url};
    }
    var opts = {
            background: '#E8E7F0',
            border: {
               width: '1px',
               color: '#E8E7F0'
            }
    }
    if(!$.browser.msie) opts.border.radius = 8;
    $qt.qtip({
        content: content,
        show: show_handler,
        hide: {when: 'unfocus'},
        style: opts,
        position: {adjust: {screen: true}}
    }).blur(function(e) {
        $qt.qtip('hide');
    });
    $qt.addClass('ui-qtip-initialized');
}
WS.gui.setupQTips = function() {
   // set up qtip/helptip
   $('.ui-qtip').not('ui-qtip-initialized').each(function(i, qt) {
       WS.gui.applyQtip(qt, false);
   });
   $('.ui-qtip-json').not('ui-qtip-initialized').each(function(i, qt) {
       WS.gui.applyQtip(qt, true);
   });
};
$(document).ready(function() {
   WS.gui.setupQTips();
   $('body').bind('click', function(e) {
       var $target = $(e.target);
       var $chain = $target.add($target.parents()).not('.ui-qtip-initialized');
       var $new_qtip = $chain.filter('.ui-qtip').add($chain.filter('ui-qtip-json')).first();
       if($new_qtip.length > 0) {
           WS.gui.setupQTips();
           $new_qtip.blur();
           var quickset = function() {
               $target.click();
           }
           setTimeout(quickset, 300);
       }
   });
});

})(jQuery);
