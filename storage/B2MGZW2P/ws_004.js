(function($){

// HACK - this needs to be passed into our JavaScript some other way
WS.form.mandHtml = WS.form.mandHtml || '<span class="mand">*</span>';

// namespaces within WS.form

WS.form.autocomplete = {}
WS.form.validate = {};

/**
 * General utility functions
 */

// Attach this to input field as keyDown or keyPress handler to prevent
// the form from being submitted when the user presses enter.

WS.form.noFormSubmit = function(e) {
    if(window.event){
        intKey = event.keyCode;
    }
    else{
        intKey = e.which;
    }
    if(intKey == 13 || intKey == 38 || intKey == 40){
        return false;
    }
}

// Function to force a form submit when the <ENTER>
// key is pressed.
WS.form.submitFormEnter = function(e, form_elem) {
  var keypress = window.event ? e.keyCode : e.which;
  if (keypress == 13) {
      form_elem.form.submit();
      return false;
  }
//  return true;
}



/**
 * Autocomplete variables and functions
 */

WS.form.autocomplete.register = function(url, text_id, /* container_id, */ hidden_id,
                                /* schema, */ select_callback, delimiter, extra_params) {
    var appendRE = delimiter ? new RegExp('^(.*' + delimiter + '|).*','g') : undefined ;
    var _selected_text = null;
    var onSelect = function(event, ui) {
        var elem = $(this), hidden_elem;

        if(hidden_id) {
            hidden_elem = $('#' + hidden_id);
        } else {
            hidden_elem = $('#' + text_id + '__hidden_id');
        }
        hidden_elem.val(ui.item.value);

        if(delimiter) {
            var value = elem.val();
            value = value.replace(appendRE, '$1');
            elem.val(value + ' ' + ui.item.label);
        } else {
            elem.val(ui.item.label);
        }
        _selected_text = $(this).val();            
        if (select_callback) {
            select_callback(event, ui, elem, hidden_elem);
        }
        return false;
    };
    var _menu_open = false;
    var onOpen = function() {
        _menu_open = true;
    }
    var onClose = function() {
        _menu_open = false;
    }
    var onBlur = function(e) {
        if(WS.form.autocomplete.force && !_menu_open) {
            if($(this).val() != _selected_text) {
                $(this).val('');
                if(hidden_id) {
                    $('#' + hidden_id).val('');
                } else {
                    $('#' + text_id + '__hidden_id').val('');
                }
            }
        }
    }
    var onError = function(XMLHttpReq, err) {
        var sel = '#autocomplete_error__' + text_id;
        $('#' + text_id).removeClass('ui-autocomplete-loading');
        $(sel + ' img').attr('title',XMLHttpReq.statusText);
        $(sel).show();
    };
    var result_limit = 10;
    if(typeof(WS.form.autocomplete.max_results) != 'undefined') {
        var max_results = parseInt(WS.form.autocomplete.max_results);
        if(!isNaN(max_results)) {
            result_limit = max_results;
        }
    }
    var getJSON = function(query, callback) {
        var data = {q: query.term,
                    ta_q: query.term,
                    limit: result_limit,
                    join_type: 'or'};
        var ajax_params = {
            type: "POST",
            url: url,
            data: data,
            success: callback,
            dataType: 'json',
            error: onError
        };
        if(extra_params) {
            ajax_params['beforeSend'] = function(xhr, params) {
                params.data = params.data + extra_params;
            }
        }
        $('#autocomplete_error__' + text_id).hide();
        return $.ajax(ajax_params);
    };
    $(document).ready(
        function(){
            $('#' + text_id).autocomplete({
            delay: 425,
            source: getJSON,
            select: onSelect,
            open: onOpen,
            close: onClose,
            delimiter: delimiter
            }).blur(onBlur);
        });
};

// if the "force" flag is true, autocomplete fields will not allow any entries
// that were not selected from the autocomplete dropdown (i.e. "force" prevents
// users from typing in new/arbitrary values)
WS.form.autocomplete.force = false;

WS.form.autocomplete.filterAutoComplete = function (klass) {
        var regex = /^<div[^>]*>.*?<span[^>]*>\s*([^<]+).*/g;
        $('input.' + klass).each(function(){
            var value = $(this).val();
            if(value != ''){
                value = value.replace(regex, '$1');
                $(this).val(value);
            }
        });
    }

/**
 * Form validation functions
 */

// Ensure percentage does not exceed 100%
WS.form.validate.percentage = function(percentage) {
    if (percentage.value > 100) {
        alert('Percentage cannot exceed 100%');
        percentage.value = 100;
    }
}


/**
 *
 * Miscellaneous form functions
 *
 *
 */

WS.form.getDateFromInput = function(name) {
    var day = $("#day--" + name).val();
    var mon = $("#month--" + name).val();
    year = $("#year--" + name).val();
    var rv;
    if(day != 'none' && mon != 'none' && year != '') {
        rv = year+'-'+mon+'-'+day;
    } else {
        rv = '';
    }
    return rv;
};

WS.form.selectAll = function(form, selector, name, ids, sep) {
    $.each(ids, function(i, id) {
        daname = name + sep + id;
        if(form[daname]) {
            form[daname].checked = selector.checked;
        }
    });
};

WS.form.disableAll = function(form, selector, name, ids, sep) {
    for(var i=0; i < ids.length; i++) {
        var daname = name + sep + ids[i];
        if(form[daname]) {
            form[daname].disabled = selector.checked;
        }
    }
};

WS.form.disableList = function(form, selector, form_elems, not) {
    for(var i=0; i < form_elems.length; i++) {
        var daname = form_elems[i];
        var disable = selector.checked;
        if(not) disable = !disable;

        // disable normal elements
        if(form[daname]) {
            form[daname].disabled = disable;
        }
        // specially check for datepickers
        if(WS.calendar.picker['#'+daname]) {
            WS.calendar.picker['#'+daname].datepicker((disable ? 'disable' : 'enable'));
        }
    }
};

WS.form.deselectSelector = function(form, item, selector_name) {
    if(!item.checked) {
        form[selector_name].checked = false;
    }
};

/**
 * From an array of class names, desired class name to show, and an optional
 * callback, show and hide appropriate elements
 *
 * NOTE We are assuming we are show/hiding <TR> elements, and this call
 *   WILL NOT WORK with other element types
 *
 * @param assoc_cnames_values Array Associative array of class_name=>value pairs
 * @param value String Value dictating which elements to show
 * @param onChangeCallback Function (Optional) Per-element callback,
 *    only called when the state of the current element is changed
 */
WS.form.renderVizByValue = function(assoc_cnames_values, value, onChangeCallback) {
    // get the class name to show by matching the incoming value against
    //   each element in the assoc_cnames_values array, halting at the first
    //   occurrence
    var show_class = null;
    for (var cname in assoc_cnames_values) {
        show_class = cname;
        if (assoc_cnames_values[cname] == value) {
            break;
        }
    }

    // for every class name in assoc_cnames_values
    for( cname in assoc_cnames_values ) {
        if(cname != show_class) {
            $('.' + cname).hide();
        }
    }
    $('.' + show_class).show();
};

/**
 * From a radio group, show and hide DOM elements with selected classes
 * This returns null, which is possibly an error, but ignoring this for now;
 *   future enhancements would be to return an associative array of
 *   element=>value pairs such that we could reinstate the values if necessary,
 *   this would also be useful for AJAX
 *
 * @param assoc_cnames_values Array Associative array of cname=>value pairs
 * @param radio_elem Object Selected radio element
 * @param onChangeCallback Function Callback on every element's state change
 * @return null
 */
WS.form.renderVizByRadioValue = function(assoc_cnames_values, radio_elem, onChangeCallback) {
    // Must be passed in this format - "klass" name : 'value'
    // assoc_cnames_values = Array('range_search':'range',
    //                             'relative_search':'relative')
    if(radio_elem == undefined) { 
        return undefined;
    }
    return WS.form.renderVizByValue(assoc_cnames_values, $(radio_elem).val(), onChangeCallback);
};

WS.form.toggleVizByClass = function(cname, viz) {
    if(viz == "1" || viz == 1 || viz == true) {
        $('.' + cname).show();
    } else {
        $('.' + cname).hide();
    }
};

/**
 * From an array of class names, desired class name to require, and an optional
 * callback, show and hide appropriate elements
 *
 * NOTE We are assuming we are show/hiding <TR> elements, and this call
 *   WILL NOT WORK with other element types
 *
 * @param assoc_cnames_values Array Associative array of class_name=>value pairs
 * @param value String Value dictating which elements to show
 * @param onChangeCallback Function (Optional) Per-element callback,
 *    only called when the state of the current element is changed
 */
WS.form.mandatoryByValue = function (assoc_cnames_values, value, onChangeCallback) {
    // get the class name to show by matching the incoming value against
    //   each element in the assoc_cnames_values array, halting at the first
    //   occurrence
    var mand_class = null;
    for (var cname in assoc_cnames_values) {
        mand_class = cname;
        if (assoc_cnames_values[cname] == value) {
            break;
        }
    }

    for (cname in assoc_cnames_values) {
        if (cname != mand_class) {
            WS.form.removeThMandByRef($('.' + cname).find('th:first'));
        }
    }
    WS.form.addThMandByRef($('.' + mand_class).find('th:first'));
};

WS.form.removeThMandByRef = function ($el) {
    if (! $el.is('.mandbyref')) {
        return false;
    }
    $el.removeClass('mandbyref').find('span.mand').remove();
};

WS.form.addThMandByRef = function ($el) {
    if ($el.is('.mandbyref')) {
        return false;
    }
    $el.addClass('mandbyref').append(WS.form.mandHtml);
};

$(document).ready(function () {
    $(".toggle-it").each(function(i,elem) {
        var klass = $(elem).attr('rel');
        WS.form.toggleVizByClassCheckbox(klass, elem);
    });
    $(".toggle-it").live('change', function(evt) {
        var klass = $(evt.target).attr('rel');
        WS.form.toggleVizByClassCheckbox(klass, evt.target);
    });
});
WS.form.toggleVizByClassCheckbox = function(cname, checkbox) {
    if (cname) { // HACK
        if (checkbox.checked) {
            $('.'+cname).show();
        } else {
            $('.'+cname).hide();
        }
    }
};
WS.form.toggleVizByClassRadio = function(cname, elem) {
    return WS.form.toggleVizByClass(cname, $(elem).val());
};

// serializes form data as an object with field names as keys and
// field values as values. If multiple items share the same name, converts
// values to an array and assigns the array to opt[name]
WS.form.asDataObject = function(form_id) {
    var opt = {};
    $.each($('form#' + form_id).serializeArray(), function(i, item) {
        var name = item.name;
        if(typeof(opt[name] == 'undefined')) {
            opt[name] = item.value;
        } else {
            if(typeof(opt[name] != 'array')) {
                opt[name] = [opt[name]];
            }
            opt[name].push(item.value);
        }
    });
    return opt;
};

/**
 * Given an element, immediately read its `rel` attribute as a comma-separated list
 *   of jQuery selectors. Loop over every selector, get the list of matching
 *   elements, and for every match assign the attribute `checked` to be true.
 *   (For most browsers, presence of `checked` alone is the signifier for selection.)
 *
 * @param element DOMElement
 * @return bool success
 */
WS.form.activateRel = function(element) {
    if (typeof element !== 'object') {
        alert('Incorrect usage of JavaScript functin activateRel, passed ' +
              (typeof element) +
              ' instead of a DOM element');
        return false;
    }

    var $this = jQuery(element),
        activate_these = $this.attr('rel').split(',');
    for (var selector_key in activate_these ) {
        jQuery(activate_these[selector_key]).each(function (i, item) {
            $(item).attr('checked', true);
        });
    }
    return true;
};
/**
 * Helper method to call activateRel only in the onClick event for all elements
 *   matching a given jQuery selector
 * @param selector String jQuery selector
 * @return void
 */
WS.form.activateRelOnClick = function(selector) {
    jQuery(selector).click(function() {
        WS.form.activateRel(this);
    });
    return null;
};

// set input to given value and submit it in one click
WS.form.didYouMean = function(id, value) {
    var form_elem = document.getElementById(id);
    if(form_elem && form_elem.form) {
        form_elem.value = value.replace(/\\'/g, "'");
        form_elem.form.submit();
    }
    return false;
}


/////////////////////////////////////////////////////////////////////////////////
//      WS Calendar
/////////////////////////////////////////////////////////////////////////////////
WS.calendar = WS.calendar || {};
WS.calendar.picker = WS.calendar.picker || {};//This function will call create the Calendar Picker Objects
WS.calendar.makeCalendar = function(element_id, buttonURL, callback){
    //Get the fields
    var year = '#year--' + element_id;
    var month = '#month--' + element_id;
    var day = '#day--' + element_id;

    //get the select_handler
    var select_handler = WS.calendar.getSelectHandler(year,month, day, callback);
    //get the show handler
    var before_show_handler = WS.calendar.getBeforeShowHandler(year,month, day);

    // Create or re-use date picker
    if(WS.calendar.picker[year]) {
        WS.calendar.picker[year].datepicker('destroy');
    }
    $(month).keypress(function(e) {
        switch(e.which) {
            case 44:
            case 45:
            case 47:
            case 32:
                $(day).focus();
                break;
            default:
                break;
        }
    });
    $(day).keypress(function(e) {
        switch(e.which) {
            case 44:
            case 45:
            case 47:
            case 32:
                $(year).focus();
                break;
            default:
                break;
        }
    });
    WS.calendar.picker[year] = 
                $(year).
                datepicker({showOn:'button', buttonImage:buttonURL,buttonImageOnly: true,
                            beforeShow: before_show_handler, buttonText:'Select Date', yearRange:'-60:+10',
                            onSelect: select_handler, showButtonPanel: true, dateFormat: 'yy-mm-dd',
                            changeMonth: true,
                            changeYear:  true}).
                datepicker('enable');
};

WS.calendar.makeMiniCalendar = function(element_id, buttonURL, format, callback){
    var picker = '#' + element_id;
    var $picker = $(picker);
    // user-friendly dates
    var vals = $picker.val().split('-');
    if(vals.length == 3) {
        if(format == 'd/m/Y') {
            $picker.val(vals[2] + "/" + vals[1] + "/" + vals[0]);
        } else {
            $picker.val(vals[1] + "/" + vals[2] + "/" + vals[0]);
        }
    }
    // Create or re-use date picker
    if(WS.calendar.picker[picker]) {
        WS.calendar.picker[picker].datepicker('destroy');
    }
    WS.calendar.picker[picker] =
                $(picker).
                datepicker({showOn:'button', buttonImage:buttonURL,buttonImageOnly: true,
                            buttonText:'Select Date', yearRange:'-60:+10',
                            showButtonPanel: true, dateFormat: 'm/d/yy',
                            changeMonth: true,
                            changeYear:  true}).
                datepicker('enable');
};


WS.calendar.getSelectHandler = function(year_selector, month_selector, day_selector, callback) {
    return function(dateText, picker) {
        var nums = dateText.split("-");
        if(nums.length == 3) {
            $(this).val(nums[0]);
            $(month_selector).val(nums[1]);
            $(day_selector).val(nums[2]);
        } else if(dateText == '') {
            $(this).val('');
            $(month_selector).val('');
            $(day_selector).val('');
        }
        if(typeof(callback) == 'function') {
            callback(dateText, picker, year_selector, month_selector, day_selector);
        }
        if(typeof(callback) == 'string') {
            eval(callback);
        }
        // fire "change" events for all updated fields
        $(year_selector).add(month_selector).add(day_selector).change();
        return true;
    };
};

WS.calendar.getBeforeShowHandler = function(year_selector, month_selector, day_selector) {
    return function(the_input) {
        var default_date = new Date();
        var year_val = $(year_selector).val();
        if(typeof(year_val) != 'undefined' && year_val != '') {
            default_date.setYear(year_val);
        }
        var month_val = $(month_selector).val();
        if(typeof(month_val) != 'undefined' && month_val != '') {
            default_date.setMonth(month_val - 1);
        }
        var day_val = $(day_selector).val();
        if(typeof(day_val) != 'undefined' && day_val != '') {
            default_date.setDate(day_val);
        }
        return {defaultDate: default_date};
    }
};


/////////////////////////////////////////////////////////////////////////////////
//      WS WYME
/////////////////////////////////////////////////////////////////////////////////
WS.wyme_init = function(wyme_id, allow_images, wsimg_postargs) {
    var tools = [
        {'name': 'Bold', 'title': 'Strong', 'css': 'wym_tools_strong'},
        {'name': 'Italic', 'title': 'Emphasis', 'css': 'wym_tools_emphasis'},
        {'name': 'Underline', 'title': 'Underline', 'css': 'wym_tools_underline'},
        //{'name': 'Superscript', 'title': 'Superscript', 'css': 'wym_tools_superscript'},
        //{'name': 'Subscript', 'title': 'Subscript', 'css': 'wym_tools_subscript'},
        {'name': 'InsertOrderedList', 'title': 'Ordered_List', 'css': 'wym_tools_ordered_list'},
        {'name': 'InsertUnorderedList', 'title': 'Unordered_List', 'css': 'wym_tools_unordered_list'},
        {'name': 'Indent', 'title': 'Indent', 'css': 'wym_tools_indent'},
        {'name': 'Outdent', 'title': 'Outdent', 'css': 'wym_tools_outdent'},
        {'name': 'Undo', 'title': 'Undo', 'css': 'wym_tools_undo'},
        {'name': 'Redo', 'title': 'Redo', 'css': 'wym_tools_redo'},
        {'name': 'CreateLink', 'title': 'Link', 'css': 'wym_tools_link'},
        {'name': 'Unlink', 'title': 'Unlink', 'css': 'wym_tools_unlink'}
    ];
    if(allow_images == true) {
        tools = tools.concat([
            {'name': 'WSImageUpload', 'title': 'Image', 'css': 'wym_tools_wsimg'}
        ]);
    }
    tools = tools.concat([
        {'name': 'InsertTable', 'title': 'Table', 'css': 'wym_tools_table'},
        {'name': 'Cleanup', 'title': 'Cleanup', 'css': 'wym_tools_cleanup'},
        //{'name': 'Paste', 'title': 'Paste_From_Word', 'css': 'wym_tools_paste'},
        {'name': 'ToggleHtml', 'title': 'HTML', 'css': 'wym_tools_html'},
        {'name': 'Preview', 'title': 'Preview', 'css': 'wym_tools_preview'}
    ]);
    $(wyme_id).wymeditor({
        logoHtml: '',
        skin: 'wellspring',
        toolsItems: tools,
        postInit: function(wym) {

            //postInit is executed after WYMeditor initialization
            //'wym' is the current WYMeditor instance

            //we generally activate plugins after WYMeditor initialization

            wym.underline();
            wym.cleanup();
            //activate 'hovertools' plugin
            //which gives advanced feedback to the user:
            wym.hovertools();
            var wsimgopts = {};
            if (typeof wsimg_postargs != 'undefined') {
                wsimgopts['wsimg_postargs'] = wsimg_postargs;
            }
            wym.wsimg(wsimgopts);
            $(document).ready(function() {
                $(':submit').click(function() {
                    wym.cleanup();
                });
                $(document).scrollTop(0);
            });
        },
        // need to do some WS-specific stuff for Matt
        dialogLinkHtml:
        "<body class='wym_dialog wym_dialog_link'"
        + " onload='WYMeditor.INIT_DIALOG(" + WYMeditor.INDEX + ")'"
        + ">"
        + "<form>"
        + "<fieldset>"
        + "<input type='hidden' class='wym_dialog_type' value='"
        + WYMeditor.DIALOG_LINK
        + "' />"
        + "<legend>{Link}</legend>"
        + "<div class='row'>"
        + "<label>{URL}</label>"
        + "<input type='text' class='wym_href' value='http://' size='40' />"
        + "</div>"
        + "<div class='row'>"
        + "<label>{Title}</label>"
        + "<input type='text' class='wym_title' value='' size='40' />"
        + "</div>"
        + "<div class='row row-indent'>"
        + "<input class='wym_submit' type='button'"
        + " value='{Submit}' />"
        + "<input class='wym_cancel' type='button'"
        + "value='{Cancel}' />"
        + "</div>"
        + "</fieldset>"
        + "</form>"
        + "<script type='application/javascript'>"
        + "jQuery(':input:visible:first').focus();"
        + "</script>"
        + "</body>"
    });
};


/////////////////////////////////////////////////////////////////////////////////
//      WS Form Autosave
/////////////////////////////////////////////////////////////////////////////////

WS.form.autosave = WS.form.autosave || {
    'save_interval'  : 180000,
    'check_interval' : 30000,
    'handler' : undefined,
    'fields'  : [],
    'forms'   : {},
    'valid_input' : function() {
        if($(this).attr('type') == 'radio') {
            return $(this).attr('checked');
        }
        if($(this).attr('type') == 'checkbox') {
            return $(this).attr('checked');
        }
        return true;
    },
    'save'    : function() {
        try{
            $.each(WYMeditor.INSTANCES, function(i, item) {
                try {
                    item.update();
                } catch(e) {
                    // ignore
                }
            });
            var changed_forms = {};
            $.each(WS.form.autosave.fields, function(i, item) {
                if(item.changed == true) {
                    var form_name = item.form.attr('name');
                    changed_forms[form_name] = item.form;
                }
            });
            $.each(changed_forms, function(i, frm){
                var the_fields = frm.find(':input').filter(WS.form.autosave.valid_input);
                var url = frm.attr('action');
                var form_data = {};
                the_fields.each(function(f,fld) {
                    fld = $(fld);
                    var name = fld.attr('name');
                    var ftype = fld.attr('type');
                    if(name != '' && ftype != 'submit' && ftype != 'image') {
                        form_data[name] = fld.val();
                    }
                });
                form_data.autosave = 'autosave';
                $.post(url, form_data, function(host_form, host_url) {
                    return function(post_result_raw) {
                        var post_result = eval("(" + post_result_raw + ")");
                        var autosave_url = post_result.autosave_url;
                        var autosave_id = post_result.autosave_id;
                        var autosave_id_field = post_result.autosave_id_field;
                        if(typeof(autosave_id) != 'undefined' &&
                           typeof(autosave_id_field) != 'undefined') {
                            var id_field = $(host_form).find(':input[name="' + autosave_id_field + '"]');
                            $.each(id_field, function(i, item) {
                                item.val(autosave_id);
                            });
                        }
                        if(typeof(autosave_url) != 'undefined' &&
                           autosave_url != '') {
                                host_form.attr('action', autosave_url);
                           }
                        var status = $('div#autosave-status');
                        status.html("<i>Autosaved</a>").addClass('autosave-status').show();
                        setTimeout(function() {$('div#autosave-status').hide().removeClass('autosave-status');}, 3600);
                    }
                }(frm, url));
            });
        } catch(e) {
            //ignore
        } finally {
            WS.form.autosave.handler = undefined;
            WS.form.autosave.checkpoint();
        }
    },
    'check' : function () {
        setTimeout(WS.form.autosave.check, WS.form.autosave.check_interval);
        if(typeof(WS.form.autosave.handler) == 'undefined') {
            $.each(WYMeditor.INSTANCES, function(i, item) {
                item.update();
            });
            var unchanged = true;
            $.each(WS.form.autosave.fields, function(i, item) {
                if(unchanged && item.current_val != item.field.val()) {
                    item.changed = true;
                    unchanged = false;
                    if(!WS.form.autosave.handler) {
                        WS.form.autosave.handler = setTimeout( WS.form.autosave.save, WS.form.autosave.save_interval);
                    }
                }
            });
        }
    },
    'checkpoint' : function () {
        $.each(WS.form.autosave.fields, function(i, item) {
            item.current_val = item.field.val();
            item.changed = false;
        })
    },
    'setupAutosave' : function (field_name, form_name) {
        var the_field = $(':input[name="' + field_name + '"]');
        var the_form;
        if(typeof(WS.form.autosave.forms[form_name]) == 'undefined') {
            the_form = $('form[name="' + form_name + '"]');
            WS.form.autosave.forms[form_name] = the_form;
        } else {
            the_form = WS.form.autosave.forms[form_name];
        }
        var autosave_data = {
            field:       the_field,
            form:        the_form,
            current_val: 0,
            changed:     false};
        WS.form.autosave.fields.push(autosave_data);
    }
};
// convenience shortcut
WS.form.setupAutosave = WS.form.autosave.setupAutosave;
$(document).ready(function() {
    if(WS.form.autosave.fields.length > 0) {
        WS.form.autosave.checkpoint();
        setTimeout(WS.form.autosave.check, WS.form.autosave.check_interval);
        var status = $(document.createElement('div'));
        status.attr('id','autosave-status').css('display','none');
        $('body').append(status);
        $('form').submit(function() {
            if(WS.form.autosave.handler) {
                clearTimeout(WS.form.autosave.handler);
                return true;
            }
        });
    }
});


/////////////////////////////////////////////////////////////////////////////////
//      WS form autoresize
/////////////////////////////////////////////////////////////////////////////////
/*
 * jQuery autoResize (textarea auto-resizer)
 * @copyright James Padolsey http://james.padolsey.com
 * @version 1.04
 */
(function($){

    $.fn.autoResize = function(options) {

        // Just some abstracted details,
        // to make plugin users happy:
        var settings = $.extend({
            onResize : function(){},
            animate : true,
            animateDuration : 150,
            animateCallback : function(){},
            extraSpace : 20,
            limit: 1000
        }, options);

        // Only textarea's auto-resize:
        this.filter('textarea').each(function(){

                // Get rid of scrollbars and disable WebKit resizing:
            var textarea = $(this).css({resize:'none','overflow-y':'hidden'}),

                // Cache original height, for use later:
                origHeight = textarea.height(),

                // Need clone of textarea, hidden off screen:
                clone = (function(){

                    // Properties which may effect space taken up by chracters:
                    var props = ['height','width','lineHeight','textDecoration','letterSpacing'],
                        propOb = {};

                    // Create object of styles to apply:
                    $.each(props, function(i, prop){
                        propOb[prop] = textarea.css(prop);
                    });

                    // Clone the actual textarea removing unique properties
                    // and insert before original textarea:
                    return textarea.clone().removeAttr('id').removeAttr('name').css({
                        position: 'absolute',
                        top: 0,
                        left: -9999
                    }).css(propOb).attr('tabIndex','-1').insertBefore(textarea);

                })(),
                lastScrollTop = null,
                updateSize = function() {

                    // Prepare the clone:
                    clone.height(0).val($(this).val()).scrollTop(10000);

                    // Find the height of text:
                    var scrollTop = Math.max(clone.scrollTop(), origHeight) + settings.extraSpace,
                        toChange = $(this).add(clone);

                    // Don't do anything if scrollTip hasen't changed:
                    if (lastScrollTop === scrollTop) {return;}
                    lastScrollTop = scrollTop;

                    // Check for limit:
                    if ( scrollTop >= settings.limit ) {
                        $(this).css('overflow-y','');
                        return;
                    }
                    // Fire off callback:
                    settings.onResize.call(this);

                    // Either animate or directly apply height:
                    settings.animate && textarea.css('display') === 'block' ?
                        toChange.stop().animate({height:scrollTop}, settings.animateDuration, settings.animateCallback)
                        : toChange.height(scrollTop);
                };

            // Bind namespaced handlers to appropriate events:
            textarea
                .unbind('.dynSiz')
                .bind('keyup.dynSiz', updateSize)
                .bind('keydown.dynSiz', updateSize)
                .bind('change.dynSiz', updateSize);

        });

        // Chain:
        return this;

    };

})(jQuery);
$(document).ready(function () {
    $(document).bind('wsDomChanged', function(evt, context) {
        context = $(context);
        if (context.length < 1) {
            context = document;
        }
        $('textarea', context).autoResize().trigger('change');
    });
    $("textarea").autoResize().trigger('change');
    if(typeof(WS.form.submitForm) == 'undefined') {
        WS.form.submitForm = function(form) {
            form.submit();
        };
    }
});


/////////////////////////////////////////////////////////////////////////////////
//      File Folder drag-n-drop
/////////////////////////////////////////////////////////////////////////////////
WS.folder = WS.folder || {};

WS.folder.toggleVis = function(base_id,do_open) {
    var open_sel = '#' + base_id + '_open';
    var shut_sel = '#' + base_id + '_shut';

    if(do_open) {
        $(shut_sel).hide();
        $(open_sel).show();
        $('tr.' + base_id).show();
    } else {
        var kids = $('tr[id^=' + base_id + '-]');
        $(shut_sel).show();
        $(open_sel).hide();
        kids.hide();
        kids.find('img[id^=' + base_id + '-][id$=_open]').hide();
        kids.find('img[id^=' + base_id + '-][id$=_shut]').show();
    }
    var rows = $('tr#' + base_id).parents('table:first').find('tr:visible');
    rows.filter(':odd').addClass('odd').removeClass('even');
    rows.filter(':even').addClass('even').removeClass('odd');

    return false;
};

WS.folder.center = function(field, puck) {
    var center_y = Math.round(field.height() / 2) - 9;
    var center_x = Math.round(field.width() / 2);
    var puck_top = center_y - Math.round(puck.height() / 2);
    var puck_left = center_x - Math.round(puck.width() / 2);
    puck.css({left: puck_left, top: puck_top});
};

WS.folder.dropHandler = function(event, ui) {
    var zero_or = function(value) {
        if(typeof(value) == 'undefined') {
            return 0;
        }
        return value;
    }
    WS.ajax.dnd.folder = null;
    var dragging = ui.draggable;
    var drag_into = $(event.target); // ui.element;
    var drag_into_id = zero_or(drag_into.attr('data-drop-id'));
    var dragging_file_id = zero_or(dragging.attr('data-file-id'));
    var dragging_folder_id = zero_or(dragging.attr('data-folder-id'));
    var dragging_parent = dragging.parents('table:first');
    var overlay = dragging_parent.parents('div:first').find('.ff-overlay');
    var callback = function(data) {
        if(data.status == 'OK') {
            var new_table = $(data.table);
            dragging_parent.html(new_table.html());
            WS.folder.setupDragAndDropFF(dragging_parent);
        } else {
            alert(data.msg);
        }
        if(typeof(overlay) != 'undefined') {
            $(overlay).hide();
        }
    };
    var url = dragging_parent.attr('data-callback');
    url = url + '/folder/list/json/';
    var data_host = dragging_parent.attr('data-host');
    var data_host_index = dragging_parent.attr('data-host-index');
    var options = {
        data_host: data_host,
        data_host_index: data_host_index,
        drag_into_id: drag_into_id,
        file_id: dragging_file_id,
        folder_id: dragging_folder_id
    };
    var hgt = dragging_parent.height();
    var wid = dragging_parent.width();
    var min_hgt = hgt + 'px';
    var shade = overlay.find('.shade');
    var msg = overlay.find('.wait-msg');
    shade.css({
        minHeight: min_hgt, minWidth: wid+'px', height: min_hgt, width: wid+'px'
    });
    var rel_top = -1 * (hgt + 12);
    overlay.css({
        minHeight: min_hgt, minWidth: wid+'px', height: min_hgt, width: wid+'px', top: rel_top + 'px'});
    overlay.show();
    WS.folder.center(dragging_parent, msg);
    $.getJSON(url, options, callback);
};

WS.folder.dragHelper = function () {
    var table =document.createElement('table');
    $(table).html($(this).html());
    WS.ajax.dnd.folder = $(this);
    return table;
};

WS.folder.setupDragAndDropFF = function(tgt) {
    var drag_options =
        {axis:        'y',
            containment: 'parent',
            distance:    12,
            helper:      WS.folder.dragHelper,
            opacity:     0.66,
            revert:      'invalid'
        };
    var drop_options =
        {accept:      '.ff-draggable',
            drop:        WS.folder.dropHandler,
            hoverClass:  'highlight',
            tolerance:   'intersect'
        };
    tgt.find('tr').draggable(drag_options).droppable(drop_options).addClass('ff-draggable');
    // build non-draggable final drop zone for dragging things out of folders completely
    var one_row = tgt.find('tr:last');
    var new_row = $('<tr></tr>');
    one_row.children('td').each(function() {
        new_row.append($('<td>&nbsp;</td>'));
    });
    new_row.droppable(drop_options);
    tgt.append(new_row);
};

$(document).ready(function() {
    WS.folder.setupDragAndDropFF($('table.ff-draggable'));
    $('table.ff-draggable').each(function(i, tbl) {
        var tgt = $(tbl);
        var overlay = document.createElement('div');
        var wait_msg = tgt.attr('data-wait-msg');
        var msg_div = document.createElement('div');
        if(typeof(wait_msg) == 'undefined' || wait_msg == '') {
            wait_msg = 'Updating...';
        }
        $(msg_div).addClass('wait-msg').html(wait_msg).css({
            opacity: 1.0, backgroundColor: '#fff', zIndex: 110, fontSize: '16px',
            fontWeight: 'bold', color:'#444', padding: '9px', position: 'absolute'
        });
        var shade = document.createElement('div');
        $(shade).css({
            opacity: 0.44, backgroundColor: '#999', zIndex: 100, position: 'absolute'
        }).addClass('shade');
        $(overlay).addClass('ff-overlay').css({
            display: 'none',backgroundColor: 'transparent', position: 'relative'
        }).append(msg_div).append(shade);
        tgt.parents('div:first').append(overlay);
    });
});


/////////////////////////////////////////////////////////////////////////////////
//      Dynamic input masks
/////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $('input[data-mask]').setMask();
});

/////////////////////////////////////////////////////////////////////////////////
//      Resizing for IE selectboxes
/////////////////////////////////////////////////////////////////////////////////
if($.browser.msie){
$(document).ready(function() {
    $("select.select-mini, select.select_mini").focus(function(){
        $(this).css({"width": "auto"});
    });
    $("select.select-mini, select.select_mini").blur(function(){
        $(this).css({"width": "100px"});
    });
});
}

})(jQuery);

/////////////////////////////////////////////////////////////////////////////////
// sum-it functions
/////////////////////////////////////////////////////////////////////////////////

/**
 * This function trys to get a numeric value from a form element or any html part
 * To get the value from the any html it assumes the inner html of the element
 * is the value or is a Wellspring formated number which wraps the number in a
 * span with the data-numeric_value set. If the element contains a .value property
 * it returns that value.
 *
 * @param elem the element
 * @param ifNaN what to return if not a number
 * @return number
 */
WS.form.getNumericValue = function(elem, ifNaN) {
    var value = undefined;
    var factor = $(elem).attr("data-numeric_value_factor");
    if(factor == undefined) {
        factor = 1;
    } else {
        factor = WS.util.parseFloatLocale(factor,1);
    }
    
    if(elem.value) {
       value = elem.value;
    } else {
        value = $(elem).html();
        if($(value).is("span[data-numeric_value]")) {
            value = $(value).first("span[data-numeric_value]").attr("data-numeric_value");
        }
    }
    value = WS.util.parseFloatLocale(value,ifNaN);
    if(factor != 1) {
        value = ws_multiply(value, factor);
    }
    return value;
}

/**
 * A bit magically if the value passed in a number it will parse it and return
 * the float value. If the value is a css class or html id then it will go grab
 * the value of that element (the first one) and return the value using
 * WS.form.getNumericValue which will look both in text inputs and html data.
 *
 * @param value_class_id the value to return
 * @param ifNaN what to return if not a number
 * @return number
 */
WS.form.getValueFromElementOrRaw = function(value_class_id, ifNaN) {
    if(value_class_id != undefined) {
        if($("."+value_class_id).length > 0) {
            value_class_id = WS.form.getNumericValue($("."+value_class_id).first(), ifNaN);
        } else if($("#"+value_class_id).length > 0) {
            value_class_id = WS.form.getNumericValue($("#"+value_class_id).first(), ifNaN);
        } else {
            value_class_id = WS.util.parseFloatLocale(value_class_id, ifNaN);
        }
    }
    return value_class_id;
}
/**
 * Calculate the sum of all html elements with a given css class and put that
 * value in the html element passed in (either input element or other dom element).
 *
 * If the new sum is not within the minValue and/or maxValue then it will add a
 * css class to the element to indicate its "out-of-range". sum-it-above-maximum
 * or sum-it-below-minimum will be added depending on the case. This class is
 * then removed once the sum falls into the proper range again.
 *
 * @param elem the element to place the value (the bucket)
 * @param klass the css class to look for values in
 * @param decimalPlaces when displaying the total how many decimal places to who (default 2)
 * @param minValue the minimum value (see WS.form.getValueFromElementOrRaw for input options)
 * @param maxValue the maximum value (see WS.form.getValueFromElementOrRaw for input options)
 * @return formated_value the total
 */
WS.form.updateSum = function(elem, klass, decimalPlaces, minValue, maxValue) {
    maxValue = WS.form.getValueFromElementOrRaw(maxValue, 2^12)
    minValue = WS.form.getValueFromElementOrRaw(minValue, 0);
    var total = 0;
    $("." + klass).each(function(i,input) {
        total = ws_add(total, WS.form.getNumericValue(input, 0));
        if(maxValue != undefined && total > maxValue) {
            $(elem).addClass("sum-it-above-maximum");
        } else {
            $(elem).removeClass("sum-it-above-maximum")
        }
        if(minValue != undefined && total < minValue) {
            $(elem).addClass("sum-it-below-minimum");
        } else {
            $(elem).removeClass("sum-it-below-minimum");
        }
    })
    var formatted_value = WS.util.formatFloatLocale(total,decimalPlaces);
    if(typeof(elem.value) != 'undefined') {
        elem.value = formatted_value;
    } else {
        $(elem).html(formatted_value);
    }
    $(elem).trigger('change');
    return formatted_value;
}

$(document).ready(function () {
    $(".sum-it").each(function(i,elem) {
        var klass = $(elem).attr('data-sum-it-class');
        var decimalPlaces = $(elem).attr('data-sum-it-decimal-places');
        if(decimalPlaces == undefined) {decimalPlaces=2;}
        var maxValue = $(elem).attr('data-sum-it-maximum');
        var minValue = $(elem).attr('data-sum-it-minimum');
        $("." + klass).live('change', function(e) {
            WS.form.updateSum(elem, klass, decimalPlaces, minValue, maxValue);
        });
        WS.form.updateSum(elem, klass, decimalPlaces, minValue, maxValue);
    })
});

$(document).ready(function () {
    $(".follow-number").each(function(i,elem) {
        var id = $(elem).attr('rel');
        $("#" + id).live('change', function(e) {
            WS.form.copyNumber(id, $(elem), 2);
        });
        WS.form.copyNumber(id, $(elem), 2);
    })
});


/**
 * Calculate the product of all html elements with a given css class and put that
 * value in the html element passed in (either input element or other dom element).
 *
 * If the new product is not within the minValue and/or maxValue then it will add a
 * css class to the element to indicate its "out-of-range". product-it-above-maximum
 * or product-it-below-minimum will be added depending on the case. This class is
 * then removed once the sum falls into the proper range again.
 *
 * @param elem the element to place the value (the bucket)
 * @param klass the css class to look for values in
 * @param decimalPlaces when displaying the total how many decimal places to who (default 2)
 * @param minValue the minimum value (see WS.form.getValueFromElementOrRaw for input options)
 * @param maxValue the maximum value (see WS.form.getValueFromElementOrRaw for input options)
 * @return formated_value the total
 */
WS.form.updateProduct = function(elem, klass, decimalPlaces, minValue, maxValue) {
    maxValue = WS.form.getValueFromElementOrRaw(maxValue, 2^12)
    minValue = WS.form.getValueFromElementOrRaw(minValue, 0);
    var total = 1;
    $("." + klass).each(function(i,input) {
        total = ws_multiply(total, WS.form.getNumericValue(input, 0));
        if(maxValue != undefined && total > maxValue) {
            $(elem).addClass("product-it-above-maximum");
        } else {
            $(elem).removeClass("product-it-above-maximum")
        }
        if(minValue != undefined && total < minValue) {
            $(elem).addClass("product-it-below-minimum");
        } else {
            $(elem).removeClass("product-it-below-minimum");
        }
    })
    var formatted_value = WS.util.formatFloatLocale(total,decimalPlaces);
    if(typeof(elem.value) != 'undefined') {
        elem.value = formatted_value;
    } else {
        $(elem).html(formatted_value);
    }
    $(elem).trigger('change');
    return formatted_value;
}


$(document).ready(function () {
    $(".product-it").each(function(i,elem) {
        var klass = $(elem).attr('data-product-it-class');
        var decimalPlaces = $(elem).attr('data-product-it-decimal-places');
        if(decimalPlaces == undefined) {decimalPlaces=2;}
        var maxValue = $(elem).attr('data-product-it-maximum');
        var minValue = $(elem).attr('data-product-it-minimum');
        $("." + klass).live('change', function(e) {
            WS.form.updateProduct(elem, klass, decimalPlaces, minValue, maxValue);
        });
        WS.form.updateProduct(elem, klass, decimalPlaces, minValue, maxValue);
    })
});

/////////////////////////////////////////////////////////////////////////////////
// Date form functions - math and such
/////////////////////////////////////////////////////////////////////////////////

/**
 * This function takes two date element ids and returns the number of
 * days between those two dates. This currently only works with the
 * Wellspring standard three-box date form elements.
 * THIS FUNCTION RELIES ON date.js (see datejs.com)
 */
WS.form.dateDifference = function(date_1_elem_id, date_2_elem_id) {
    var date_1 = WS.form.getDateFromInput(date_1_elem_id);
    var date_2 = WS.form.getDateFromInput(date_2_elem_id);
    var difference = NaN;
    if(date_1 != '' && date_2 != '') {
        var date_1_obj = Date.parse(date_1);
        var date_2_obj = Date.parse(date_2);
        var diff = new Date();
        diff.setTime(date_2_obj.getTime() - date_1_obj.getTime());
        var time_diff = diff.getTime();
        difference = Math.floor(time_diff / (1000 * 60 * 60 * 24)); 
    }
    return difference;
}

/**
 * This function will update an element with the number of days
 * between two dates (given by their element ids).
 */
WS.form.updateDateDifference = function(elem, date_1_elem_id, date_2_elem_id) {
    var diff = WS.form.dateDifference(date_1_elem_id, date_2_elem_id);
    var formatted_value = '';
    if(isNaN(diff)) {
        formatted_value = "0";
    } else {
        formatted_value = WS.util.formatFloatLocale(diff, 0);
    }
    if(typeof(elem.value) != 'undefined') {
        elem.value = formatted_value
    } else {
        $(elem).html(formatted_value);
    }
    $(elem).trigger('change');
}

$(document).ready(function () {
    $(".days-between").each(function(i,elem) {
        var date_1_id = $(elem).attr('data-days-between-first');
        var date_2_id = $(elem).attr('data-days-between-second');

        var dates = $("#day--" + date_1_id + ",#month--" + date_1_id + ",#year--" + date_1_id + ",#day--" + date_2_id + ",#month--" + date_2_id + ",#year--" + date_2_id);

        dates.live('change', function(e) {
            WS.form.updateDateDifference(elem, date_1_id, date_2_id);
        });
        WS.form.updateDateDifference(elem, date_1_id, date_2_id);
    })
});

/**
 * This function will update an element with the number of months
 * between two dates (given by their element ids).
 */
WS.form.updateDateMonthDifference = function(elem, date_1_elem_id, date_2_elem_id, rounding_type) {
    var diff = WS.form.dateDifference(date_1_elem_id, date_2_elem_id);
    var diff_month = (0.0 + diff) / 30.0;
    if(rounding_type) {
        if(rounding_type == 'up') {
            diff_month = Math.ceil(diff_month);
        } else if(rounding_type == 'down') {
            diff_month = Math.floor(diff_month);
        } else if(rounding_type == 'round') {
            diff_month = Math.round(diff_month);
        } // else anything else no rounding
    }
    var formatted_value = '';
    if(isNaN(diff)) {
        diff = 'N/A';
    } else {
        formatted_value = WS.util.formatFloatLocale(diff_month, 0);
    }
    if(typeof(elem.value) != 'undefined') {
        elem.value = formatted_value
    } else {
        $(elem).html(formatted_value);
    }
    $(elem).trigger('change');
}

/**
 * Given a list of element ids cooresponding to wellspring date input
 * elements this function will return the first in the list that is
 * not empty.
 */
WS.form.firstNonEmptyDateId = function(potential_date_ids) {
    for(var i=0; i<potential_date_ids.length; i++) {
        var date_id = potential_date_ids[i];
        var date_val = WS.form.getDateFromInput(date_id);
        if(date_val != '') {
            return date_id;
        }
    }
    // they are all blank, return 0
    return false;
}

/**
 * Will set the value of elem to the number of months between the two
 * dates given. However the dates given can contain multiple date
 * element ids. The first non-empty date element encountered will be
 * the one used to perform the calculation. For example if you had a
 * start date, target end date, and revised target end date then you
 * could calculate the number of target duration by using the start
 * date then either the revised target end date or target end date. It
 * would first check the revised date and if non empty use it
 * otherwise it would use target end date.
 */
WS.form.updateDateMonthDifferenceMultipleDates = function(elem, date_1_elem_ids, date_2_elem_ids, rounding_type) {
    var date_1_elem_id = WS.form.firstNonEmptyDateId(date_1_elem_ids);
    var date_2_elem_id = WS.form.firstNonEmptyDateId(date_2_elem_ids);
    if(date_1_elem_id && date_2_elem_id) {
        WS.form.updateDateMonthDifference(elem, date_1_elem_id, date_2_elem_id, rounding_type);
    }
}

$(document).ready(function () {
    $(".months-between").each(function(i,elem) {
        var date_1_id = $(elem).attr('data-months-between-first');
        var date_1_ids = date_1_id.split(',');
        var date_2_id = $(elem).attr('data-months-between-second');
        var date_2_ids = date_2_id.split(',');
        var rounding_type = $(elem).attr('data-months-between-rounding-type');
        var all_date_ids = $.merge(date_1_id.split(','), date_2_id.split(','));

        var dates = false;
        // need all the various dates to bind our
        for(var i=0; i<all_date_ids.length; i++) {
            var date_id = all_date_ids[i];
            var selector = "#day--" + date_id + ",#month--" + date_id + ",#year--" + date_id;
            if(dates) {
                dates = dates.add(selector);
            } else {
                dates = $(selector);
            }
        }

        // for some reason live does not work in this case.
        dates.bind('change', function(e) {
            WS.form.updateDateMonthDifferenceMultipleDates(elem, date_1_ids, date_2_ids, rounding_type);
        });
        WS.form.updateDateMonthDifferenceMultipleDates(elem, date_1_ids, date_2_ids, rounding_type);
    })
});


/////////////////////////////////////////////////////////////////////////////////
// For all form-money input elements we automatically re-format to WS local format
/////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    $("input.form-money").each(function(i,elem) {
        $(elem).bind('change', function(e) {
            elem.value = WS.util.formatFloatLocale(WS.util.parseFloatLocale(elem.value,0), 2);
        });
    });
});


WS.form.getByIdOrClass = function(id_or_class) {
    if(typeof id_or_class == 'object') {
        id_or_class = id_or_class;
    } else if($("."+id_or_class).length > 0) {
        id_or_class = $("."+id_or_class);
    } else if($("#"+id_or_class).length > 0) {
        id_or_class = $("#"+id_or_class);
    } else {
        id_or_class = undefined;
    }
    return id_or_class;
}
/////////////////////////////////////////////////////////////////////////////////
// copy number functions
/////////////////////////////////////////////////////////////////////////////////
WS.form.copyNumber = function(source, dest, decimalPlaces) {
    var decimalPlaces_val = decimalPlaces;
    var source_val = WS.form.getValueFromElementOrRaw(source);
    var $dest = WS.form.getByIdOrClass(dest);
    source_val = WS.util.formatFloatLocale(source_val, decimalPlaces_val);
    $dest.each(function(i, my_dest) {
        if(my_dest.value) {
            $(my_dest).val(source_val);
        } else {
            $(my_dest).html(source_val);
        }
        // trigger the change event for the destination
        $(my_dest).trigger('change');
    });
}

$(document).ready(function () {
    $(".copy-number").each(function(i,elem) {
        var source = $(elem).attr('data-copy-number-source');
        var dest = $(elem).attr('data-copy-number-destination');
        var def = $(elem).attr('data-copy-number-default');
        if(def == undefined) {def="0.00";}
        var decimalPlaces = $(elem).attr('data-copy-number-decimal-places');
        if(decimalPlaces == undefined) {decimalPlaces=2;}

        $(elem).bind('change', function(evt) {
            if(!evt.target.checked) {
                WS.form.copyNumber(def, dest, decimalPlaces);
            } else {
                WS.form.copyNumber(source, dest, decimalPlaces);
            }
        });
    })
});


/**
 * This function copies down data from a source to all elements
 * referenced by a comma separated list of jquery selectors in the
 * 'rel' attribute on the source.
 */
WS.form.copyToRelative = function(source) {
    var hidden_field_suffix = '__hidden_id';
    var hidden_field_suffix_length = hidden_field_suffix.length;
    var $source = $(source);
    var rel_text = $(source).attr('rel');
    if(rel_text) {
        var copy_to_these = rel_text.split(',');
        var copy_value = $(source).val();
        var copy_value_hidden = null;
        var type_ahead = false;
        if($source.hasClass('ui-autocomplete-input')) {
            var hidden_val = $('#'+$source.attr('id')+ hidden_field_suffix);
            if(hidden_val.length > 0) {
                copy_value_hidden = hidden_val.val();
                type_ahead = true;
            }
        }

        for (var selector_key in copy_to_these ) {
            $(copy_to_these[selector_key]).each(function (i, item) {
                var item_id = $(item).attr('id');
                if($(item).hasClass('ui-autocomplete-input') && type_ahead) {
                    // its an auto complete, copy text and hidden value
                    $(item).val(copy_value);
                    var hidden_item = $('#'+item_id + hidden_field_suffix);
                    if(hidden_item.length > 0) {
                        hidden_item.val(copy_value_hidden);
                    }
                } else if(item_id.substr(item_id.length-hidden_field_suffix_length,hidden_field_suffix_length) == hidden_field_suffix) {
                    // this is a hidden autocomplete field, do nothing
                } else {
                    $(item).val(copy_value);
                }
            });
        }
    }
}
/**
 * This function is used to distribute shares on inventions
 */
function setProRata() {
    var pro_rata = 100 / arguments.length;
    $.each(arguments, function(i, item) {
        $('input[name=' + item + ']').val(pro_rata);
    });
}
