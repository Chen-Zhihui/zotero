// Return the object with the given id (or the object itself
// if the "id" is not a string)
function getRawObject(obj) {
	if (typeof obj == "string") {
		var theObj = null;
		// Optional 3rd argument is the document to search;
		// defaults to the current document. (Added 10/17/06 MRG)
		var doc = (getRawObject.arguments.length < 3) ? document : getRawObject.arguments[2];
		if (doc.getElementById) {
			theObj = doc.getElementById(obj);	// w3c dom api
		} else if (doc.all) {
			theObj = doc.all[obj]; // ie 4 api
		} else if (doc.layers) {
			theObj = doc.layers[obj];	// netscape 4 api
		}
		if (theObj == null) {
			// Optional 2nd arg of "0" will disable this warning.
			// Use this in situations where you might get null.
			if ((getRawObject.arguments.length < 2) || getRawObject.arguments[1]) {
				gsError("not found: " + obj); 
			}
		}
		return theObj;
	} else {
		return obj;
	}
}

// return the "style" of an object
function getObjectStyle(obj) {
	var theObj = getRawObject(obj);
	return theObj.style;
}

// return the position (top & left) of an object
function getObjectPos(id) {
	var e = getRawObject(id);
	var topPos = 0;
	var leftPos = 0;

	while (e) 	{
		topPos += e.offsetTop;
		leftPos += e.offsetLeft;
		e = e.offsetParent;
	}

	return { top: topPos, left: leftPos };
}

// return the height & width of an object
function getObjectSize(id) {
	var e = getRawObject(id);

	if (e.offsetWidth) {
		return { height: e.offsetHeight, width: e.offsetWidth };
	} else {
		return { height: 0, width: 0 };
	}
}

// Determine how far the page has been scrolled (x & y)
function scrolledAmt() {

	var theElem = document.body;

	// Optional 1st argument is the element to examine; 
	// defaults to the document body. (Added 10/20/06 MRG)
	if (scrolledAmt.arguments.length >= 1) {
		theElem = scrolledAmt.arguments[0];
	} else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
		// Hack: IE(7) transitional uses document.body for scrolling 
		// but document.documentElement is also defined, so we "detected"
		// this by only using document.documentElement if we actually
		// saw scrolling there; this is fine for reading, but
		// doesn't help us with writing (in setScrolledAmt(), below). MRG 7/16/10
		theElem = document.documentElement;
	}

	if (theElem.scrollLeft != null) {
		return { x: theElem.scrollLeft, y: theElem.scrollTop };
	} else {
		return { x: 0, y: 0 };
	}
}

// Scroll the page to a given position (x & y)
function setScrolledAmt(x, y) {

	var theElem = document.body;

	// Optional 3rd argument is the element to examine; 
	// defaults to the document body. (Added 10/20/06 MRG)
	if (setScrolledAmt.arguments.length >= 3) {
		theElem = setScrolledAmt.arguments[2];
	} else if (document.documentElement && (document.documentElement.scrollLeft != null)) {
		// We need to set the documentElement rather than the body.  The body.scrollTop is only supported in quirks mode.
		// FireFox does not support body.scrollTop under loose and strict dtds.
		// RKH 9/29/10
		document.documentElement.scrollLeft = x;
		document.documentElement.scrollTop = y;
	}

	if (theElem.scrollLeft != null) {
		theElem.scrollLeft = x;
		theElem.scrollTop = y;
	}
}

// Return the size of the browser window (height & width)
function getWindowSize() {
	if (typeof(window.innerWidth) == 'number') {
		// Non-IE
		return { height: window.innerHeight, width: window.innerWidth };
	} else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
		// IE 6+ in 'standards compliant mode'
		return { height: document.documentElement.clientHeight, width: document.documentElement.clientWidth };
	} else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
		// IE 4 compatible
		return { height: document.body.clientHeight, width: document.body.clientWidth };
	} else {
		return { height: 0, width: 0 };
	}
}
