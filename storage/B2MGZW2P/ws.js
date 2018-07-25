/**
 *
 *  Our (very small) collection of globals:
 *
 */

// root Wellspring object -- everything else builds on this
WS = {};
/**
 *
 *  End of globals
 *
 */


(function($){

// core namespaces
WS.app = {};
WS.dom = {};
WS.util = {};
WS.locale = {};
WS.form = {};
WS.ajax = {};
WS.gui  = {};
WS.page = {}; // namespace for 1-off, per page functions and vars.

/**
 * Initialize the dynamic WS variables like locale and baseURL
 */
WS.util.ident = function () {return arguments;}

// Firebug support
if (typeof console == 'undefined') {
    console = {};
}

// fix broken IE "trim" function on strings
if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  }
}

/**
 * Initialize the dynamic WS variables like locale and baseURL
 */
$(function() {
    var body = $('body');
    // set up app and locale values
    WS.app.base_url = body.attr('data-application-base-url');
    WS.locale.decimal_separator = body.attr('data-locale-decimal-separator');
    WS.locale.thousands_separator = body.attr('data-locale-thousands-separator');
    WS.locale.currency_symbol = body.attr('data-locale-currency-symbol');

    // set up auto-hilite
    window.hiliteOn = window.highlightOn = function() {
        $(this).addClass('highlight');
    };
    window.hiliteOff = window.highlightOff = function() {
        $(this).removeClass('highlight');
    };
    $('#content').hover(hiliteOff);
    if ($.fn.jquery >= '1.4.3') {
        $('.highlight_row tr').live({
            'mouseenter': hiliteOn,
            'mouseleave': hiliteOff
        });
    } else if ($.fn.live) {
        $('.highlight_row tr').live('mouseenter mouseleave', function(e) {
            var e_type = e.type;
            if ($.inArray(e_type, ['mouseenter', 'mouseover']) > -1) {
                hiliteOn.call(this);
            } else if($.inArray(e_type, ['mouseleave', 'mouseout']) > -1) {
                hiliteOff.call(this);
            }
        });
   }

});
(function(console){
    var fn_name, fn,
        console_support = [
            'log', 'debug', 'dir', 'dirxml', 'count',
            'info', 'warning', 'error',
            'assert',
            'time', 'timeEnd',
            'profile', 'profileEnd', 'trace'];
    for(var i in console_support) {
        fn_name = console_support[i];
        fn = console[fn_name];
        if (typeof fn == 'function') {
            WS.util[fn_name] = fn;
        } else {
            WS.util[fn_name] = WS.util.ident;
        }
    }
})(window.console);

WS.log = WS.util.log ;

/**
 * from a relative or absolute url and optional parameters, set
 */
WS.util.mkurl = function (url, params) {
    var base_url = WS.app.base_url,
        rqualified = url.match(/^(?:https?|javascript|mailto|data):/i),
        rslash = url.match(/^\/+/);

    if (rqualified) {
        // fully qualified
        return url;
    }
    if (rslash) {
        // strip starting '/' from relative
        url = url.substr(rslash[0].length);
    }
    var new_url = base_url + url;
    if (typeof params == 'object') {
        new_url += '?' + $.param(params);
    }
    return new_url;
};

/**
 * Common utility functions
 */

/**
 * parse string values to numbers, locale-aware (and ignoring invalid symbols, if any)
 *
 * @param String amount to parse
 * @param float (optional) amount to use if parsed value isNaN
 * @return int|float if parsed correctly or ifNaN is specified, NaN otherwise
 */
WS.util.parseFloatLocale = function(amount, ifNaN ) {

    var re = new RegExp("[^-+0-9" + WS.locale.decimal_separator + "]", "g");
    amount = amount.replace(re, "");
    if(WS.locale.decimal_separator != '.') {
        amount = amount.replace(WS.locale.decimal_separator, ".");
    }

    var flt = parseFloat(amount);
        if( isNaN(flt) && (typeof ifNaN != 'undefined' )) {
            return ifNaN;
        }

        return flt;
}

// format number as locale-aware string
WS.util.formatFloatLocale = function(amount, decimalPlaces) {
    var re = new RegExp("(\\d)(\\d{3})(\\" + WS.locale.thousands_separator + "|$)");
    var remaining = amount;
    if(decimalPlaces == undefined) {
        decimalPlaces = 2;
    }
    amount = amount.toFixed(decimalPlaces);
    var decimal = amount.lastIndexOf(".");
    var wholePart = amount;
    var fractionalPart = '';
    if(decimal > 0) {
        wholePart = amount.substr(0, decimal);
        fractionalPart = amount.substr(decimal + 1);
    }
    while(remaining >= 1000.0) {
        wholePart = wholePart.replace(re, "$1" + WS.locale.thousands_separator + "$2$3");
        remaining = remaining / 1000.0;
    }
    var formatted_value = wholePart;
    if(fractionalPart != '') {
        formatted_value += WS.locale.decimal_separator + fractionalPart;
    }
    return formatted_value;
}

WS.util.toCurrency = function(amt) {
    return parseFloatLocale(form.amount.value).toFixed(2);
};

/**
 * Shared functions, included here for convenience
 */

// used by querybuilder alerts and by form letters
WS.util.insertText = function(formId, selector, value) {
    // private inner function
    var insertAtCursor = function(myField, myValue) {
       //IE support
       if (document.selection) {
          myField.focus();
          sel = document.selection.createRange();
          sel.text = myValue;
       }
       //MOZILLA/NETSCAPE support
       else if (myField.selectionStart || myField.selectionStart == '0') {
           var startPos = myField.selectionStart;
           var endPos = myField.selectionEnd;
           myField.value = myField.value.substring(0, startPos)
             + myValue
             + myField.value.substring(endPos, myField.value.length);
           myField.selectionEnd = endPos + myValue.length;
           myField.focus();
       } else {
          myField.val(myField.val() + myValue);
       }
    };

    var form = $('form#' + formId);
    var txtElem = form.find(selector);
    insertAtCursor(txtElem, "%(" + value + ")");
    txtElem.focus();
};
/**
 * provides a utility method to log the contents of an object to Firebug
 */
$.fn.tap = function() {
    return this.each(function(i){
        WS.util.log(i, this, $(this).html());
    });
};

})(jQuery);
