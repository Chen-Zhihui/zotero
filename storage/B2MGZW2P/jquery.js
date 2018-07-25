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
 *        jquery.wymeditor.underline.js
 *        Underline support plugin for WYMeditor
 *
 * File Authors:
 *        Mark Nutter (mark dot nutter a-t wellspringworldwide dotcom)
 */

//Extend WYMeditor
WYMeditor.editor.prototype.underline = function() {
  var wym = this;

  // This plugin requires modifications to the SaxListener and
  // XhtmlValidator classes in jquery.wymeditor.js so that it
  // recognizes the (deprecated!) underline tag.  Add "u" to the
  // array of block_tags in SaxListener, and append "41":"u" to
  // the _tags object in the XhtmlValidator object.
  
// //construct the button's html
//  var html = "<li class='wym_tools_underline'>"
//         + "<a name='Underline' href='#'"
//         + " style='background-image:"
//         + " url(" + wym._options.basePath +"plugins/underline/text_underline.png)'>"
//         + "Underline"
//         + "</a></li>";

  // find the button in the toolbar and update its background image to show the
  // correct icon. The button was placed there by an entry in the tools parameter

  //fix the button to the tools box
  jQuery(wym._box)
    .find('li.wym_tools_underline a')
    .css({'background-image':"url("+ wym._options.basePath +"plugins/underline/text_underline.png)",
          'background-repeat':'no-repeat',
          'background-position':'33% 66%',
          'background-attachment':'scroll'});

  //handle click event -- we don't need to do anything because the built-in code handles this automatically.
//  jQuery(wym._box).find('li.wym_tools_underline a').click(function() {
//    wym._exec('underline',null, null);
//    return(false);
//  });
};
