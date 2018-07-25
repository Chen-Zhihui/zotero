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
 *        jquery.wymeditor.cleanup.js
 *        Tag cleanup plugin for WYMeditor
 *
 * File Authors:
 *        Jean-Francois Hovinne (jf.hovinne a-t wymeditor dotorg)
 *        adapted by Mark Nutter (mark dot nutter a-t wellspringworldwide dot com)
 */

// HACK HACK
// Warning: this function overrides an undocumented internal subroutine inside
// the WYMEditor.  If the WYMEditor is ever upgraded from version 0.5-rc1, this
// function will need to be re-examined to see if it is still needed and/or
// correct.
WYMeditor.XhtmlSaxListener.prototype.removeEmptyTags = function(xhtml)
{
    return xhtml.replace(new RegExp('<('+this.block_tags.join("|").replace(/\|td/,'').replace(/\|th/, '')+')>(<br \/>|&#160;|&nbsp;)*<\/\\1>' ,'g'),'');
};

// HACK HACK
// Warning: this function overrides an undocumented internal subroutine inside
// the WYMEditor.
/**
*    Calls the parser method named after the current
*    mode. Empty content will be ignored. The lexer
*    has a parser handler for each mode in the lexer.
*    @param string content        Text parsed.
*    @param boolean is_match      Token is recognised rather
*                                  than unparsed data.
*    @access private
*/
WYMeditor.Lexer.prototype._invokeParser = function(content, is_match)
{

    if (!/ +/.test(content) && ((content === '') || (content === false))) {
        return true;
    }
    var current = this._mode.getCurrent();
    var handler = this._mode_handlers[current];
    var result;
    eval('result = this._parser.' + handler + '(content, is_match);');
    return result;
};




//Extend WYMeditor
WYMeditor.editor.prototype.cleanup = function(options) {
    // fix toolbar button
    var wym = this;
    var original_input = $(this._box).parent('div').find('textarea').get(0);
    var garbagetags = /<\/?(span|div|font|style|col|tbody)[^>]*>/ig;
    var stripstyles = /<!--([^>]|[^-]>|[^-]->)*-->/ig;
    var reducenewlines = /(\n|\r){2,}/g;
    var strippreparaws = /(\n|\r|\s)+<p>/ig;
    var strippostparaws = /<p>(\n|\r|\s)+/ig;
    var striptableattr = /<(table|tr|td) [^>]+>/ig;
    var cleanspuriousbreaks = /(\n|\r|\r\n)     /g;
    var convertBulletsStart = /<p class="MsoListParagraphCxSpFirst">\D(&(#160|nbsp);)+(([^<]|<(?!\/p>))*)<\/p>/ig;
    var convertBulletsMiddle = /<p class="MsoListParagraphCxSpMiddle">\D(&(#160|nbsp);)+(([^<]|<(?!\/p>))*)<\/p>/ig;
    var convertBulletsEnd = /<p class="MsoListParagraphCxSpLast">\D(&(#160|nbsp);)+(([^<]|<(?!\/p>))*)<\/p>/ig;
    var convertOListStart = /<p class="MsoListParagraphCxSpFirst">\d+(&(#160|nbsp);)+(([^<]|<(?!\/p>))*)<\/p>/ig;
    var convertOListMiddle = /<p class="MsoListParagraphCxSpMiddle">\d+(&(#160|nbsp);)+(([^<]|<(?!\/p>))*)<\/p>/ig;
    var convertOListEnd = /<p class="MsoListParagraphCxSpLast">\d+(&(#160|nbsp);)+(([^<]|<(?!\/p>))*)<\/p>/ig;
    var stripemptybreak = /^<br ?\/?>$/;
    var noTableDeadEnds = /<\/table>\s*$/;
    var basePath = wym._options.basePath;
    var makeCleanupFunc = function(wym, original_input) {
        return function() {
            wym.update();
            var orig = wym.html();
            var cleaned = orig.replace(garbagetags, '');
            cleaned = cleaned.replace(stripstyles, '');
            cleaned = cleaned.replace(cleanspuriousbreaks, ' ');
            cleaned = cleaned.replace(reducenewlines,"\n");
            cleaned = cleaned.replace(strippreparaws,'<p>');
            cleaned = cleaned.replace(strippostparaws,'<p>');
            cleaned = cleaned.replace(striptableattr, '<$1>');
            cleaned = cleaned.replace(convertBulletsStart,'<ul><li>$3</li>');
            cleaned = cleaned.replace(convertBulletsMiddle,'<li>$3</li>');
            cleaned = cleaned.replace(convertBulletsEnd,'<li>$3</li></ul>');
            cleaned = cleaned.replace(convertOListStart,'<ul><li>$3</li>');
            cleaned = cleaned.replace(convertOListMiddle,'<li>$3</li>');
            cleaned = cleaned.replace(convertOListEnd,'<li>$3</li></ul>');
            if(cleaned.length && cleaned.substr(0,1) != '<') {
                cleaned = '<p>' + cleaned + ' </p>';
            }
            cleaned = cleaned.replace(noTableDeadEnds, "</table><p> </p>");
            cleaned = cleaned.replace(stripemptybreak,'');
            wym.html(cleaned);
            var xclean = wym.xhtml();
            while(cleaned != xclean) {
                cleaned = xclean;
                wym.html(xclean);
                xclean = wym.xhtml(); // run it thru built-in xhtml parser/cleaner
            }
//            $(original_input).val(xclean);
            wym.html(xclean);
            wym.update();
            return false;
        };
    };
    var cleanupFunc = makeCleanupFunc(wym, original_input);
    jQuery(wym._box).
    find('li.wym_tools_cleanup a').
    css({
        'background-image':"url("+ basePath +"plugins/cleanup/wand.png)",
        'background-repeat':'no-repeat',
        'background-attachment':'scroll'
    }).
    unbind('click').click(cleanupFunc).click();
    jQuery(original_input).parents('form').submit(function() {wym.update();});
    // fix/prevent "invisible cursor" bug
    jQuery(document).ready(function() {
        jQuery(wym._doc).focus().blur();
    });
    return(this);
};

