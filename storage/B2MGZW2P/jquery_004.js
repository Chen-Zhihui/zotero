/*
 * WYMeditor : what you see is What You Mean web-based editor
 * Copyright (c) 2005 - 2009 Jean-Francois Hovinne, http://www.wymeditor.org/
 * Dual licensed under the MIT (MIT-license.txt)
 * and GPL (GPL-license.txt) licenses.
 *
 * For further information visit:
 *        http://www.wymeditor.org/
 *
 * File Name:
 *        jquery.wymeditor.wsimg.js
 *        Tag cleanup plugin for WYMeditor
 *
 * File Authors:
 *        Jean-Francois Hovinne (jf.hovinne a-t wymeditor dotorg)
 *        adapted by Mark Nutter (mark dot nutter a-t wellspringworldwide dot com)
 */

WYMeditor.plugins = WYMeditor.plugins || {};
WYMeditor.plugins.wsimg = WYMeditor.plugins.wsimg || {};
WYMeditor.plugins.wsimg.callbacks = WYMeditor.plugins.wsimg.callbacks || {};
WYMeditor.plugins.wsimg.dialogs = WYMeditor.plugins.wsimg.dialogs || {};
WYMeditor.plugins.wsimg.getIframeDocument = function(thing) {
    var d;
    if(thing.contentDocument) {
        d = thing.contentDocument;
    } else if(thing.contentWindow) {
        d = thing.contentWindow.document;
    } else {
        d = window.frames['insert-img-iframe'].document
    }
    return d;
}
WYMeditor.plugins.wsimg.makeDialog = function(wym, img_postargs) {
    var url = $('body').attr('data-application-base-url');
    var form_start = '<form method="POST" action="' + url + '/file/form/" enctype="multipart/form-data"' +
        'onsubmit="return parent.WYMeditor.plugins.wsimg.handleUpload(' + wym._index + ');">';
    var frag = '';
    frag += form_start + "<div id='uploadform'><div class='row'><label for='thefile'>" +
        "Upload image file (gif/jpg/png)</label><span class='file-input'>" +
        "<input type='file' name='thefile' id='thefile'/></span></div>" +
        "<input type='hidden' name='json' value='save'/>" +
        "<input type='hidden' name='json_id' value='" + wym._index + "'/>";
    if (img_postargs) {
        for (var _k in img_postargs) {
            frag +=
                "<input type='hidden' name='" + _k + "' value='" + img_postargs[_k] + "' />";
        }
    }
    frag +=
        "<div class='button-bar'><input type='submit' name='save' id='save' value='Insert Image' " +
        "class='standard_button'/>" +
        "<span style='font-size:x-small'> or <a href='#' " +
        "onclick='parent.WYMeditor.plugins.wsimg.handleCancel(" + wym._index + ");'>CANCEL</a>" +
        "</span></div></div>" +
        "<div id='waitmsg' style='text-align:center;vertical-align:middle;font-style:italic;display:none;'>" +
        "<br/><br/>Uploading image file, please wait...</div>" +
        "</form>";
    var head = '<style type="text/css" media="screen">' +
     '@import "http://localhost/kms/css/core.css";' +
     '@import "http://localhost/kms/css/form.css";' +
     '@import "http://localhost/kms/css/messages.css";' +
     '@import "http://localhost/kms/css/misc.css";' +
     '@import "http://localhost/kms/css/helptip.css";' +
     '@import "http://localhost/kms/css/sortable.css";' +
     '@import "http://localhost/kms/css/calendar-blue.css";' +
     '@import "http://localhost/kms/static/financial_report_base/report_base.css";' +
     '@import "http://localhost/kms/static/globalsearch/globalsearch.css";' +
    '</style>';

    var iframeLoadHandler = function(frag, head) {
        return function() {
            var $this = $(this);
            var d = WYMeditor.plugins.wsimg.getIframeDocument(this);
            if(d.location.href == "about:blank") {
                $(d).find('head').html(head);
                $(d).find('body').html(frag).css('text-align','left');
                $this.show();
                return;
            }
        };
    };
    
    var iframe = $('<iframe src="about:blank" id="insert-img-iframe" style="display:none;"></iframe>');
    iframe.load(iframeLoadHandler(frag, head));
    $('body').append(iframe);

    WYMeditor.plugins.wsimg.dialogs[wym._index] = iframe;
    WYMeditor.plugins.wsimg.callbacks[wym._index] = function(new_url) {
        iframe.dialog('close');
        // Moz and others(?) no longer let you insert HTML with data- attributes,
        //   (e.g. instead replacing them with "_moz_dirty"),
        //   must use special class and remove it immediately
        var special_class = '_wyme_inserted_';
        wym.insert("<img src='" + new_url + "' class='"+special_class+"'/>");
        // restore absolute URL
        $('iframe').contents().find('img.'+special_class).each(function(i, el) {
           var $el = $(el);
           $el.attr('src', new_url).removeClass(special_class);
        });
    };
    iframe.dialog({
        autoOpen: true,
        width: 300,
        height: 136,
        title: 'Insert Image'
    });
};
WYMeditor.plugins.wsimg.handleUpload = function(idx) {
    var $dialog = parent.WYMeditor.plugins.wsimg.dialogs[idx];
    var dialog = $dialog.get(0);
    var doc = WYMeditor.plugins.wsimg.getIframeDocument(dialog);
    var filename = $(doc).find('#thefile').val();
    if(typeof(filename) == 'undefined' || filename == '') {
        alert("Please select a file or click Cancel.");
        return false;
    }
    $(doc).find('#uploadform').hide();
    $(doc).find('#waitmsg').show();
};
WYMeditor.plugins.wsimg.handleCancel = function(e) {
    var dialog = parent.WYMeditor.plugins.wsimg.dialogs[e];
    var par = dialog.parent();
    dialog.dialog('close');
    par.remove();
    $('#insert-img-iframe').remove();
    return false;
}

//Extend WYMeditor
WYMeditor.editor.prototype.wsimg = function(options) {
    // fix toolbar button
    var wym = this;
    var img_postargs = {};
    if (typeof(options) != 'undefined' && options['wsimg_postargs']) {
        img_postargs = options['wsimg_postargs'];
    }
    var wsimg_func = function() {
        return function(evt) {
            WYMeditor.plugins.wsimg.makeDialog(wym, img_postargs);
        };
    };
    jQuery(wym._box).
    find('li.wym_tools_wsimg a').
    unbind('click').click(wsimg_func());
    return(this);
};

