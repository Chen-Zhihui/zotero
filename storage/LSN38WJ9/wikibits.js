// MediaWiki JavaScript support functions

var clientPC = navigator.userAgent.toLowerCase(); // Get client info
var is_gecko = ((clientPC.indexOf('gecko')!=-1) && (clientPC.indexOf('spoofer')==-1)
                && (clientPC.indexOf('khtml') == -1) && (clientPC.indexOf('netscape/7.0')==-1));
var is_safari = ((clientPC.indexOf('applewebkit')!=-1) && (clientPC.indexOf('spoofer')==-1));
var is_khtml = (navigator.vendor == 'KDE' || ( document.childNodes && !document.all && !navigator.taintEnabled ));
if (clientPC.indexOf('opera') != -1) {
	var is_opera = true;
	var is_opera_preseven = (window.opera && !document.childNodes);
	var is_opera_seven = (window.opera && document.childNodes);
}
var is_ie     = ((clientPC.indexOf('msie') != -1) && (!is_opera) && (!is_safari));

// add any onload functions in this hook (please don't hard-code any events in the xhtml source)

var doneOnloadHook;

if (!window.onloadFuncts)
	var onloadFuncts = [];

function addOnloadHook(hookFunct) {
	// Allows add-on scripts to add onload functions
	onloadFuncts[onloadFuncts.length] = hookFunct;
}

function runOnloadHook() {
	// don't run anything below this for non-dom browsers
	if (doneOnloadHook || !(document.getElementById && document.getElementsByTagName))
		return;

	histrowinit();
	unhidetzbutton();
	tabbedprefs();
	akeytt();
	scrollEditBox();
	setupCheckboxShiftClick();

	// Run any added-on functions
	for (var i = 0; i < onloadFuncts.length; i++)
		onloadFuncts[i]();

	doneOnloadHook = true;
}

function hookEvent(hookName, hookFunct) {
	if (window.addEventListener)
		addEventListener(hookName, hookFunct, false);
	else if (window.attachEvent)
		attachEvent("on" + hookName, hookFunct);
}

//note: all skins shoud call runOnloadHook() at the end of html output,
//      so the below should be redundant. It's there just in case.
hookEvent("load", runOnloadHook);

// document.write special stylesheet links
if (typeof stylepath != 'undefined' && typeof skin != 'undefined') {
	if (is_opera_preseven) {
		document.write('<link rel="stylesheet" type="text/css" href="'+stylepath+'/'+skin+'/Opera6Fixes.css">');
	} else if (is_opera_seven) {
		document.write('<link rel="stylesheet" type="text/css" href="'+stylepath+'/'+skin+'/Opera7Fixes.css">');
	} else if (is_khtml) {
		document.write('<link rel="stylesheet" type="text/css" href="'+stylepath+'/'+skin+'/KHTMLFixes.css">');
	}
}
// Un-trap us from framesets
if (window.top != window)
	window.top.location = window.location;

// for enhanced RecentChanges
function toggleVisibility(_levelId, _otherId, _linkId) {
	var thisLevel = document.getElementById(_levelId);
	var otherLevel = document.getElementById(_otherId);
	var linkLevel = document.getElementById(_linkId);
	if (thisLevel.style.display == 'none') {
		thisLevel.style.display = 'block';
		otherLevel.style.display = 'none';
		linkLevel.style.display = 'inline';
	} else {
		thisLevel.style.display = 'none';
		otherLevel.style.display = 'inline';
		linkLevel.style.display = 'none';
	}
}

// page history stuff
// attach event handlers to the input elements on history page
function histrowinit() {
	var hf = document.getElementById('pagehistory');
	if (!hf)
		return;
	var lis = hf.getElementsByTagName('li');
	for (var i = 0; i < lis.length; i++) {
		var inputs = historyRadios(lis[i]);
		if (inputs[0] && inputs[1]) {
			inputs[0].onclick = diffcheck;
			inputs[1].onclick = diffcheck;
		}
	}
	diffcheck();
}

function historyRadios(parent) {
	var inputs = parent.getElementsByTagName('input');
	var radios = [];
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].name == "diff" || inputs[i].name == "oldid")
			radios[radios.length] = inputs[i];
	}
	return radios;
}

// check selection and tweak visibility/class onclick
function diffcheck() {
	var dli = false; // the li where the diff radio is checked
	var oli = false; // the li where the oldid radio is checked
	var hf = document.getElementById('pagehistory');
	if (!hf)
		return true;
	var lis = hf.getElementsByTagName('li');
	for (i=0;i<lis.length;i++) {
		var inputs = historyRadios(lis[i]);
		if (inputs[1] && inputs[0]) {
			if (inputs[1].checked || inputs[0].checked) { // this row has a checked radio button
				if (inputs[1].checked && inputs[0].checked && inputs[0].value == inputs[1].value)
					return false;
				if (oli) { // it's the second checked radio
					if (inputs[1].checked) {
						oli.className = "selected";
						return false;
					}
				} else if (inputs[0].checked) {
					return false;
				}
				if (inputs[0].checked)
					dli = lis[i];
				if (!oli)
					inputs[0].style.visibility = 'hidden';
				if (dli)
					inputs[1].style.visibility = 'hidden';
				lis[i].className = "selected";
				oli = lis[i];
			}  else { // no radio is checked in this row
				if (!oli)
					inputs[0].style.visibility = 'hidden';
				else
					inputs[0].style.visibility = 'visible';
				if (dli)
					inputs[1].style.visibility = 'hidden';
				else
					inputs[1].style.visibility = 'visible';
				lis[i].className = "";
			}
		}
	}
	return true;
}

// generate toc from prefs form, fold sections
// XXX: needs testing on IE/Mac and safari
// more comments to follow
function tabbedprefs() {
	var prefform = document.getElementById('preferences');
	if (!prefform || !document.createElement)
		return;
	if (prefform.nodeName.toLowerCase() == 'a')
		return; // Occasional IE problem
	prefform.className = prefform.className + 'jsprefs';
	var sections = new Array();
	var children = prefform.childNodes;
	var seci = 0;
	for (var i = 0; i < children.length; i++) {
		if (children[i].nodeName.toLowerCase() == 'fieldset') {
			children[i].id = 'prefsection-' + seci;
			children[i].className = 'prefsection';
			if (is_opera || is_khtml)
				children[i].className = 'prefsection operaprefsection';
			var legends = children[i].getElementsByTagName('legend');
			sections[seci] = new Object();
			legends[0].className = 'mainLegend';
			if (legends[0] && legends[0].firstChild.nodeValue)
				sections[seci].text = legends[0].firstChild.nodeValue;
			else
				sections[seci].text = '# ' + seci;
			sections[seci].secid = children[i].id;
			seci++;
			if (sections.length != 1)
				children[i].style.display = 'none';
			else
				var selectedid = children[i].id;
		}
	}
	var toc = document.createElement('ul');
	toc.id = 'preftoc';
	toc.selectedid = selectedid;
	for (i = 0; i < sections.length; i++) {
		var li = document.createElement('li');
		if (i == 0)
			li.className = 'selected';
		var a = document.createElement('a');
		a.href = '#' + sections[i].secid;
		a.onmousedown = a.onclick = uncoversection;
		a.appendChild(document.createTextNode(sections[i].text));
		a.secid = sections[i].secid;
		li.appendChild(a);
		toc.appendChild(li);
	}
	prefform.parentNode.insertBefore(toc, prefform.parentNode.childNodes[0]);
	document.getElementById('prefsubmit').id = 'prefcontrol';
}

function uncoversection() {
	var oldsecid = this.parentNode.parentNode.selectedid;
	var newsec = document.getElementById(this.secid);
	if (oldsecid != this.secid) {
		var ul = document.getElementById('preftoc');
		document.getElementById(oldsecid).style.display = 'none';
		newsec.style.display = 'block';
		ul.selectedid = this.secid;
		var lis = ul.getElementsByTagName('li');
		for (var i = 0; i< lis.length; i++) {
			lis[i].className = '';
		}
		this.parentNode.className = 'selected';
	}
	return false;
}

// Timezone stuff
// tz in format [+-]HHMM
function checkTimezone(tz, msg) {
	var localclock = new Date();
	// returns negative offset from GMT in minutes
	var tzRaw = localclock.getTimezoneOffset();
	var tzHour = Math.floor( Math.abs(tzRaw) / 60);
	var tzMin = Math.abs(tzRaw) % 60;
	var tzString = ((tzRaw >= 0) ? "-" : "+") + ((tzHour < 10) ? "0" : "") + tzHour + ((tzMin < 10) ? "0" : "") + tzMin;
	if (tz != tzString) {
		var junk = msg.split('$1');
		document.write(junk[0] + "UTC" + tzString + junk[1]);
	}
}

function unhidetzbutton() {
	var tzb = document.getElementById('guesstimezonebutton');
	if (tzb)
		tzb.style.display = 'inline';
}

// in [-]HH:MM format...
// won't yet work with non-even tzs
function fetchTimezone() {
	// FIXME: work around Safari bug
	var localclock = new Date();
	// returns negative offset from GMT in minutes
	var tzRaw = localclock.getTimezoneOffset();
	var tzHour = Math.floor( Math.abs(tzRaw) / 60);
	var tzMin = Math.abs(tzRaw) % 60;
	var tzString = ((tzRaw >= 0) ? "-" : "") + ((tzHour < 10) ? "0" : "") + tzHour +
		":" + ((tzMin < 10) ? "0" : "") + tzMin;
	return tzString;
}

function guessTimezone(box) {
	document.getElementsByName("wpHourDiff")[0].value = fetchTimezone();
}

function showTocToggle() {
	if (document.createTextNode) {
		// Uses DOM calls to avoid document.write + XHTML issues

		var linkHolder = document.getElementById('toctitle')
		if (!linkHolder)
			return;

		var outerSpan = document.createElement('span');
		outerSpan.className = 'toctoggle';

		var toggleLink = document.createElement('a');
		toggleLink.id = 'togglelink';
		toggleLink.className = 'internal';
		toggleLink.href = 'javascript:toggleToc()';
		toggleLink.appendChild(document.createTextNode(tocHideText));

		outerSpan.appendChild(document.createTextNode('['));
		outerSpan.appendChild(toggleLink);
		outerSpan.appendChild(document.createTextNode(']'));

		linkHolder.appendChild(document.createTextNode(' '));
		linkHolder.appendChild(outerSpan);

		var cookiePos = document.cookie.indexOf("hidetoc=");
		if (cookiePos > -1 && document.cookie.charAt(cookiePos + 8) == 1)
			toggleToc();
	}
}

function changeText(el, newText) {
	// Safari work around
	if (el.innerText)
		el.innerText = newText;
	else if (el.firstChild && el.firstChild.nodeValue)
		el.firstChild.nodeValue = newText;
}

function toggleToc() {
	var toc = document.getElementById('toc').getElementsByTagName('ul')[0];
	var toggleLink = document.getElementById('togglelink')

	if (toc && toggleLink && toc.style.display == 'none') {
		changeText(toggleLink, tocHideText);
		toc.style.display = 'block';
		document.cookie = "hidetoc=0";
	} else {
		changeText(toggleLink, tocShowText);
		toc.style.display = 'none';
		document.cookie = "hidetoc=1";
	}
}

var mwEditButtons = [];
var mwCustomEditButtons = []; // eg to add in MediaWiki:Common.js

// this function generates the actual toolbar buttons with localized text
// we use it to avoid creating the toolbar where javascript is not enabled
function addButton(imageFile, speedTip, tagOpen, tagClose, sampleText) {
	// Don't generate buttons for browsers which don't fully
	// support it.
	mwEditButtons[mwEditButtons.length] =
		{"imageFile": imageFile,
		 "speedTip": speedTip,
		 "tagOpen": tagOpen,
		 "tagClose": tagClose,
		 "sampleText": sampleText};
}

// this function generates the actual toolbar buttons with localized text
// we use it to avoid creating the toolbar where javascript is not enabled
function mwInsertEditButton(parent, item) {
	var image = document.createElement("img");
	image.width = 23;
	image.height = 22;
	image.src = item.imageFile;
	image.border = 0;
	image.alt = item.speedTip;
	image.title = item.speedTip;
	image.style.cursor = "pointer";
	image.onclick = function() {
		insertTags(item.tagOpen, item.tagClose, item.sampleText);
		return false;
	}
	
	parent.appendChild(image);
	return true;
}

function mwSetupToolbar() {
	var toolbar = document.getElementById('toolbar');
	if (!toolbar) return false;

	var textbox = document.getElementById('wpTextbox1');
	if (!textbox) return false;
	
	// Don't generate buttons for browsers which don't fully
	// support it.
	if (!document.selection && textbox.selectionStart == null)
		return false;
	
	for (var i in mwEditButtons) {
		mwInsertEditButton(toolbar, mwEditButtons[i]);
	}
	for (var i in mwCustomEditButtons) {
		mwInsertEditButton(toolbar, mwCustomEditButtons[i]);
	}
	return true;
}

function escapeQuotes(text) {
	var re = new RegExp("'","g");
	text = text.replace(re,"\\'");
	re = new RegExp("\\n","g");
	text = text.replace(re,"\\n");
	return escapeQuotesHTML(text);
}

function escapeQuotesHTML(text) {
	var re = new RegExp('&',"g");
	text = text.replace(re,"&amp;");
	var re = new RegExp('"',"g");
	text = text.replace(re,"&quot;");
	var re = new RegExp('<',"g");
	text = text.replace(re,"&lt;");
	var re = new RegExp('>',"g");
	text = text.replace(re,"&gt;");
	return text;
}

// apply tagOpen/tagClose to selection in textarea,
// use sampleText instead of selection if there is none
// copied and adapted from phpBB
function insertTags(tagOpen, tagClose, sampleText) {
	if (document.editform)
		var txtarea = document.editform.wpTextbox1;
	else {
		// some alternate form? take the first one we can find
		var areas = document.getElementsByTagName('textarea');
		var txtarea = areas[0];
	}

	// IE
	if (document.selection  && !is_gecko) {
		var theSelection = document.selection.createRange().text;
		if (!theSelection)
			theSelection=sampleText;
		txtarea.focus();
		if (theSelection.charAt(theSelection.length - 1) == " ") { // exclude ending space char, if any
			theSelection = theSelection.substring(0, theSelection.length - 1);
			document.selection.createRange().text = tagOpen + theSelection + tagClose + " ";
		} else {
			document.selection.createRange().text = tagOpen + theSelection + tagClose;
		}

	// Mozilla
	} else if(txtarea.selectionStart || txtarea.selectionStart == '0') {
		var replaced = false;
		var startPos = txtarea.selectionStart;
		var endPos = txtarea.selectionEnd;
		if (endPos-startPos)
			replaced = true;
		var scrollTop = txtarea.scrollTop;
		var myText = (txtarea.value).substring(startPos, endPos);
		if (!myText)
			myText=sampleText;
		if (myText.charAt(myText.length - 1) == " ") { // exclude ending space char, if any
			subst = tagOpen + myText.substring(0, (myText.length - 1)) + tagClose + " ";
		} else {
			subst = tagOpen + myText + tagClose;
		}
		txtarea.value = txtarea.value.substring(0, startPos) + subst +
			txtarea.value.substring(endPos, txtarea.value.length);
		txtarea.focus();
		//set new selection
		if (replaced) {
			var cPos = startPos+(tagOpen.length+myText.length+tagClose.length);
			txtarea.selectionStart = cPos;
			txtarea.selectionEnd = cPos;
		} else {
			txtarea.selectionStart = startPos+tagOpen.length;
			txtarea.selectionEnd = startPos+tagOpen.length+myText.length;
		}
		txtarea.scrollTop = scrollTop;

	// All other browsers get no toolbar.
	// There was previously support for a crippled "help"
	// bar, but that caused more problems than it solved.
	}
	// reposition cursor if possible
	if (txtarea.createTextRange)
		txtarea.caretPos = document.selection.createRange().duplicate();
}

//2007.02.12 add by King Kong 
function getSelectionText() {
	var theSelection = '';
	//IE
	if (document.selection) {
		if (document.selection.type!='None'){
			theSelection = document.selection.createRange().text;
		}
		t=d.selection?(d.selection.type!='None'?d.selection.createRange().text:''):(d.getSelection?d.getSelection():'')
	// Mozilla
	} else if (document.getSelection){
		theSelection = document.getSelection();
	}
	return theSelection;
}

function akeytt() {
	if (typeof ta == "undefined" || !ta)
		return;
	var pref = 'alt-';
	if (is_safari || navigator.userAgent.toLowerCase().indexOf('mac') + 1
		|| navigator.userAgent.toLowerCase().indexOf('konqueror') + 1 )
		pref = 'control-';
	if (is_opera)
		pref = 'shift-esc-';

	for (var id in ta) {
		var n = document.getElementById(id);
		if (n) {
			var a = null;
			var ak = '';
			// Are we putting accesskey in it
			if (ta[id][0].length > 0) {
				// Is this object a object? If not assume it's the next child.

				if (n.nodeName.toLowerCase() == "a") {
					a = n;
				} else {
					a = n.childNodes[0];
				}

				if (a) {
					a.accessKey = ta[id][0];
					ak = ' ['+pref+ta[id][0]+']';
				}
			} else {
				// We don't care what type the object is when assigning tooltip
				a = n;
				ak = '';
			}

			if (a) {
				a.title = ta[id][1]+ak;
			}
		}
	}
}

function setupRightClickEdit() {
	if (document.getElementsByTagName) {
		var divs = document.getElementsByTagName('div');
		for (var i = 0; i < divs.length; i++) {
			var el = divs[i];
			if(el.className == 'editsection') {
				addRightClickEditHandler(el);
			}
		}
	}
}

function addRightClickEditHandler(el) {
	for (var i = 0; i < el.childNodes.length; i++) {
		var link = el.childNodes[i];
		if (link.nodeType == 1 && link.nodeName.toLowerCase() == 'a') {
			var editHref = link.getAttribute('href');

			// find the following a
			var next = el.nextSibling;
			while (next.nodeType != 1)
				next = next.nextSibling;

			// find the following header
			next = next.nextSibling;
			while (next.nodeType != 1)
				next = next.nextSibling;

			if (next && next.nodeType == 1 &&
				next.nodeName.match(/^[Hh][1-6]$/)) {
				next.oncontextmenu = function() {
					document.location = editHref;
					return false;
				}
			}
		}
	}
}

function setupCheckboxShiftClick() {
	if (document.getElementsByTagName) {
		var uls = document.getElementsByTagName('ul');
		var len = uls.length;
		for (var i = 0; i < len; ++i) {
			addCheckboxClickHandlers(uls[i]);
		}
	}
}

function addCheckboxClickHandlers(ul, start, finish) {
	if (ul.checkboxHandlersTimer) {
		clearInterval(ul.checkboxHandlersTimer);
	}
	if ( !ul.childNodes ) {
		return;
	}
	var len = ul.childNodes.length;
	if (len < 2) {
		return;
	}
	start = start || 0;
	finish = finish || start + 250;
	if ( finish > len ) { finish = len; }
	ul.checkboxes = ul.checkboxes || [];
	ul.lastCheckbox = ul.lastCheckbox || null;
	for (var i = start; i<finish; ++i) {
		var child = ul.childNodes[i];
		if ( child && child.childNodes && child.childNodes[0] ) {
			var cb = child.childNodes[0];
			if ( !cb.nodeName || cb.nodeName.toLowerCase() != 'input' ||
			     !cb.type || cb.type.toLowerCase() != 'checkbox' ) {
				return;
			}
			cb.index = ul.checkboxes.push(cb) - 1;
			cb.container = ul;
			cb.onmouseup = checkboxMouseupHandler;
		}
	}
	if (finish < len) {
	  var f=function(){ addCheckboxClickHandlers(ul, finish, finish+250); };
	  ul.checkboxHandlersTimer=setInterval(f, 200);
	}
}

function checkboxMouseupHandler(e) {
	if (typeof e == 'undefined') {
		e = window.event;
	}
	if ( !e.shiftKey || this.container.lastCheckbox === null ) {
		this.container.lastCheckbox = this.index;
		return true;
	}
	var endState = !this.checked;
	if ( is_opera ) { // opera has already toggled the checkbox by this point
		endState = !endState;
	}
	var start, finish;
	if ( this.index < this.container.lastCheckbox ) {
		start = this.index + 1;
		finish = this.container.lastCheckbox;
	} else {
		start = this.container.lastCheckbox;
		finish = this.index - 1;
	}
	for (var i = start; i <= finish; ++i ) {
		this.container.checkboxes[i].checked = endState;
	}
	this.container.lastCheckbox = this.index;
	return true;
}

function toggle_element_activation(ida,idb) {
	if (!document.getElementById)
		return;
	document.getElementById(ida).disabled=true;
	document.getElementById(idb).disabled=false;
}

function toggle_element_check(ida,idb) {
	if (!document.getElementById)
		return;
	document.getElementById(ida).checked=true;
	document.getElementById(idb).checked=false;
}

function fillDestFilename(id) {
	if (!document.getElementById)
		return;
	var path = document.getElementById(id).value;
	// Find trailing part
	var slash = path.lastIndexOf('/');
	var backslash = path.lastIndexOf('\\');
	var fname;
	if (slash == -1 && backslash == -1) {
		fname = path;
	} else if (slash > backslash) {
		fname = path.substring(slash+1, 10000);
	} else {
		fname = path.substring(backslash+1, 10000);
	}

	// Capitalise first letter and replace spaces by underscores
	fname = fname.charAt(0).toUpperCase().concat(fname.substring(1,10000)).replace(/ /g, '_');

	// Output result
	var destFile = document.getElementById('wpDestFile');
	if (destFile)
		destFile.value = fname;
}


function considerChangingExpiryFocus() {
	if (!document.getElementById)
		return;
	var drop = document.getElementById('wpBlockExpiry');
	if (!drop)
		return;
	var field = document.getElementById('wpBlockOther');
	if (!field)
		return;
	var opt = drop.value;
	if (opt == 'other')
		field.style.display = '';
	else
		field.style.display = 'none';
}

function scrollEditBox() {
	var editBoxEl = document.getElementById("wpTextbox1");
	var scrollTopEl = document.getElementById("wpScrolltop");
	var editFormEl = document.getElementById("editform");

	if (editBoxEl && scrollTopEl) {
		if (scrollTopEl.value) editBoxEl.scrollTop = scrollTopEl.value;
		editFormEl.onsubmit = function() {
			document.getElementById("wpScrolltop").value = document.getElementById("wpTextbox1").scrollTop;
		}
	}
}

hookEvent("load", scrollEditBox);

function allmessagesfilter() {
	text = document.getElementById('allmessagesinput').value;
	k = document.getElementById('allmessagestable');
	if (!k) { return;}

	var items = k.getElementsByTagName('span');

	if ( text.length > allmessages_prev.length ) {
		for (var i = items.length-1, j = 0; i >= 0; i--) {
			j = allmessagesforeach(items, i, j);
		}
	} else {
		for (var i = 0, j = 0; i < items.length; i++) {
			j = allmessagesforeach(items, i, j);
		}
	}
	allmessages_prev = text;
}

function allmessagesforeach(items, i, j) {
	var hItem = items[i].getAttribute('id');
	if (hItem.substring(0,17) == 'sp-allmessages-i-') {
		if (items[i].firstChild && items[i].firstChild.nodeName == '#text' && items[i].firstChild.nodeValue.indexOf(text) != -1) {
			var itemA = document.getElementById( hItem.replace('i', 'r1') );
			var itemB = document.getElementById( hItem.replace('i', 'r2') );
			if ( itemA.style.display != '' ) {
				var s = "allmessageshider(\"" + hItem.replace('i', 'r1') + "\", \"" + hItem.replace('i', 'r2') + "\", '')";
				var k = window.setTimeout(s,j++*5);
			}
		} else {
			var itemA = document.getElementById( hItem.replace('i', 'r1') );
			var itemB = document.getElementById( hItem.replace('i', 'r2') );
			if ( itemA.style.display != 'none' ) {
				var s = "allmessageshider(\"" + hItem.replace('i', 'r1') + "\", \"" + hItem.replace('i', 'r2') + "\", 'none')";
				var k = window.setTimeout(s,j++*5);
			}
		}
	}
	return j;
}


function allmessageshider(idA, idB, cstyle) {
	var itemA = document.getElementById( idA );
	var itemB = document.getElementById( idB );
	if (itemA) { itemA.style.display = cstyle; }
	if (itemB) { itemB.style.display = cstyle; }
}

function allmessagesmodified() {
	allmessages_modified = !allmessages_modified;
	k = document.getElementById('allmessagestable');
	if (!k) { return;}
	var items = k.getElementsByTagName('tr');
	for (var i = 0, j = 0; i< items.length; i++) {
		if (!allmessages_modified ) {
			if ( items[i].style.display != '' ) {
				var s = "allmessageshider(\"" + items[i].getAttribute('id') + "\", null, '')";
				var k = window.setTimeout(s,j++*5);
			}
		} else if (items[i].getAttribute('class') == 'def' && allmessages_modified) {
			if ( items[i].style.display != 'none' ) {
				var s = "allmessageshider(\"" + items[i].getAttribute('id') + "\", null, 'none')";
				var k = window.setTimeout(s,j++*5);
			}
		}
	}
}

function allmessagesshow() {
	k = document.getElementById('allmessagesfilter');
	if (k) { k.style.display = ''; }

	allmessages_prev = '';
	allmessages_modified = false;
}

hookEvent("load", allmessagesshow);
hookEvent("load", mwSetupToolbar);

//2007.06.08 add by King Kong
function clickWhatlinsMore(moreItem,blockId,classname){
   var item = document.getElementById(blockId); 
   if (item){ 
   item.className=classname;
   }
   moreItem.style.display='none';
   return false;
}

//2008.07.14 add by King Kong
function installSearchEngine(url,name,tip){
	if (window.external && ("AddSearchProvider" in window.external)){
		//Firefox 2 and IE 7, OpenSearch
		document.write("<a href=\"javascript:window.external.AddSearchProvider('"+url+"')\" title=\""+tip+"\">"+name+"</a>");
	}
}

//2009.06.26 add by King Kong
function setTabBar(menu,tab){
	var oMenu = $("#"+menu);
	if (oMenu){
		oMenu.find('.header li').each(function(i){
			$(this).removeClass('Selected');
		});
		oMenu.find("#tab-"+tab).addClass('Selected');
		oMenu.find(".block").each(function(i){
			$(this).hide();
		});
		oMenu.find("#block-"+tab).show();
	}
}
function openToolMenu(){
	$("#p-tb .pBody").show();
}
function installToolMenu(){
	$("#p-tb h5,#p-tb .pBody").mouseover(function(){
		$("#p-tb .pBody").show();
	});
	$("#p-tb .pBody").mouseout(function(){
		$("#p-tb .pBody").hide();
	});
}

function installSearchHotKey() {
	var evt = arguments[0]||window.event;
	var element = evt.srcElement || evt.target;
	if (element.nodeName != 'INPUT' && element.nodeName != 'OBJECT') {
		var myKeyCode = (is_ie) ? evt.which : evt.keyCode;
		if (myKeyCode >= 65 && myKeyCode <= 90 && myKeyCode != 67 && evt.altKey == false && evt.ctrlKey == false) {
			var notKey = 1;
			window.scrollTo(0, 0);
			if ($("#searchInput").val()) {
				$("#searchInput").select();
			} else {
				$("#searchInput").focus();
			}
		} else {
			var notKey = 0;
		}
	}
	return 0;
}

function installGoTop(){
		$('#gotop').click(function(){
			$("html,body").animate({ scrollTop: 0 }, 120);
		});
		var win_w = $(window).width();
		var win_h = $(window).height();
		var con_w = $("#globalWrapper").width();
		var btn_w = $("#gotop").width();
		var _r = win_w-con_w <= 20 ?
			(win_w - con_w)/2:(win_w - con_w)/2-btn_w;
		var _b = win_h * 0.2;
		$('#gotop').css({right :_r,bottom :_b});
	
		$(window).scroll(function(){
			if($(window).scrollTop() <= 200){
				$('#gotop').stop(true, true).fadeOut();
			}else{
				$('#gotop').stop(true, true).fadeIn();
			}
		});
}

function installShare(){
window._bd_share_config = {
		common : {
			bdText : encodeURI(document.title),	
			//bdUrl : encodeURIComponent(document.location), 	
			bdPic : ''
		},
		share : [{
			"bdSize" : 24
		}]
	}
	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='https://static.mbalib.com/common/baidushare/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
}

function installNavigation(){
	$(".kind-button").click(function(){
			$("#p-navigation").toggle();
			return false;
	});
}

 
     /*
 	 * 按屏幕宽度来调节分类列数
	 *2014.08.22 add by King Kong
	 */
function installCategoryLayout(){
			function renderCategoryLayout(){
				$("table").each(function(){
						var mergedtd = $(this).find("td:gt(0)");
						var hasmerged = $(this).find(".category_merged").length > 0 ;
						var ismobile = $(document.body).width()<700 ;
						if(  ismobile && ! hasmerged) 	{
							var mergedwapper = $("<div class=\"category_merged\">").append(mergedtd.html());
							if(mergedtd[1].innerHTML)
								mergedwapper.append(mergedtd[1].innerHTML);
							mergedwapper.find("h3:contains('续'),h3:contains('續')").hide();
							//alert(mergedwapper);
							$(this).find("td:eq(0)").append(mergedwapper);
							mergedtd.hide();
					   }
					   if( ! ismobile &&  hasmerged) 	{  
							$(this).find(".category_merged").remove();
							mergedtd.show();
						}
				});
			}
			$(window).resize(function(){
				renderCategoryLayout();
			});
			renderCategoryLayout();
}

//

function installColumnHeight(){
	function renderColumnHeight(){
		var clienth = document.documentElement.clientWidth;
		$(".columnC-r").each(function(){
				$(this).height('100%');
				$(this).siblings(".columnC-l").height('100%');
				if(clienth>=980 || (navigator.appName=='Microsoft Internet Explorer' && (navigator.appVersion.match(/6./i)=='6.' || navigator.appVersion.match(/7./i)=='7.' || navigator.appVersion.match(/8./i)=='8.')) ){
					if($(this).height()>$(this).siblings(".columnC-l").height())	{
							$(this).siblings(".columnC-l").height($(this).height());
					}else{
							$(this).height($(this).siblings(".columnC-l").height());
					}
				}
		});
	}
	$(window).resize(function(){
			renderColumnHeight();
	});
	renderColumnHeight();
}

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}

function setCookie(c_name,value,expiredays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+";path=/"+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function wfIsPc() {
	if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
		return false;
	}
	return true;
}

function wfIsWeixin(){
	if(navigator.userAgent.toLowerCase().indexOf("micromessenger") > 0)
	{
		return true;
	}	
	return false;
}

// init 
function initSetup(){
	installToolMenu();
	installShare();
	installNavigation();
	installGoTop();
	if (wgCanonicalNamespace == "Category") installCategoryLayout();
	installColumnHeight();
}



