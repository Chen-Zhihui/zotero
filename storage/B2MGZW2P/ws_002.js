
(function($){

WS.ajax.postJSON = function(url, data, success) {
    // for historical reasons, the url may contain GET params (ie. QueryBuilder args)
    // We'll force that to be post args
    var parts = url.split(/\?/);
    if(parts.length > 1) {
        if ( jQuery.isFunction( data ) ) {
			success = data;
			data = {};
		}
        url = parts.shift();
        var pairs = parts.shift();
        jQuery.each(pairs.split(/\&/), function(i, item) {
            var kv = item.split(/=/);
            data[kv[0]] = kv[1];
        });
    }
    jQuery.post(url, data, success, "json");
}

/*
 * loadData is called to load some json data into another dropdown box
 *
 * Example given an organization load the people in the organizaiton
 * ARGS:
 *  key - the query parameter to pass to the json request
 *  value - the form element holding the value for the query
 *  target - the form element meant as the target dropdown box
 *  selected - the value of the selected item
 *  extras - any extra options you want added to the begining of target
 *  none_selected - options to present when none is selected
 *
 *  USAGE: WS.ajax.loadDropdown('org_id', this, this.form['mydropdown'],
 *                  'http://my.com/query/json/', {'':'None'},
 *                  {'':'Please select an orgization'})
 *         This would be on an onchange event of a dropdown
 *         It will query the page:
 *         http://my.com/query/json/?org_id=<the value of this>
 *         It expects a json return of the following format:
 *         {<value>:{'name':'The display name'}}
 */
WS.ajax.loadDropdown = function(key, value, target, base_url, selected, extras, none_selected) {
    // add one item
     var addOne = function(elem, item) {
        var l, v;
        if(typeof(item) == 'string') {
            l = item;
            v = elem.length;
        } else {
            l = item.label;
            v = item.value;
        }
        elem[elem.length] = new Option(l,v);
        if (selected == v) {
           elem.selectedIndex = elem.length - 1;
        }
    }
    // use this function to populate the dropdown menu
    var insertOptions = function(elem, items) {
        if(typeof(items) != 'array') {
            items = [items];
        }
        $.each(items, function(i, item) {
            addOne(elem, item);
        });
        return elem.length;
    }

    // if the dependent value has no value then set to none_selected
    if (!value.value) {
       target.length = 0;
       insertOptions(target, none_selected);
       return;
    }
    target.length = 0;
    insertOptions(target, 'Loading...');
    url = base_url + '?' + key + '=' + value.value;
    // function to load the data into the dropdown
     var gotData = function(data) {
        //var payload = evalJSONRequest(data);
        target.length = 0;
        var i = insertOptions(target, extras);
        var added = 0;
        $.each(data, function (i, item) {
            addOne(target, item);
            added += 1;
        });
        if(added == 1) {
            target.selectedIndex = target.length - 1;
        }
    }

    jQuery.getJSON(url, {}, gotData);
}

// Drag-and-drop file uploads
WS.ajax.dnd = {};
WS.ajax.dnd.setup = function(elt, otype, oid, url) {
    var files_to_send = [];

    if(typeof(url) == 'undefined' || url == '') {
        url = WS.app.base_url + '/file/form/';
    }

    var defaultDragHandler = function(e) {
        e.preventDefault();
    };

    var is_dragging = false;

    var hiliteDragHandler = function(e) {
        if(!is_dragging) {
            is_dragging = true;
            var $dnd = $('.drag-and-drop-upload-area');
//            $('#content').find('div.custom-layout-section').css('opacity', 0.5);
//            $('.drag-and-drop-upload-area').css('opacity', 1.0); //.find('*').css('opacity', 1.0);
            var $dnd_top = $dnd.offset().top - 280;
            console.log("Need to scroll by " + $dnd_top + " pixels.");
            if($dnd_top < 0) { $dnd_top = 0; }
            $(document).scrollTop($dnd_top)
            $dnd.css('border', '3px solid #543092');
        }
        e.preventDefault();
    }

    var getUploadHandler = function(rdr, file) {
        return function(e) {
            var fileName = file.name;
            var fileData = rdr.result;
            var fileSize = fileData.length;

            var boundary = "xxxxxxxxx";

            var xhr = new XMLHttpRequest();
            var uri = url +"?save=save&json=dnd&object_type=" + otype +"&object_id=" + oid;
            xhr.open("POST", uri , true);
            xhr.setRequestHeader("Content-Type", "multipart/form-data, boundary="+boundary); // simulate a file MIME POST request.
            xhr.setRequestHeader("Content-Length", fileSize);

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if ((xhr.status >= 200 && xhr.status <= 200) || xhr.status == 304) {

                        if (xhr.responseText != "") {
//                            alert(xhr.responseText); // display response.
                        }
                    }
                    nextUpload();
                }
            }

            var body = "--" + boundary + "\r\n";
            body += "Content-Disposition: form-data; name='thefile'; filename='" + fileName + "'\r\n";
            body += "Content-Transfer-Encoding: 8bit\r\n";
            body += "Content-Type: application/octet-stream\r\n\r\n";
            body += fileData + "\r\n";
            body += "--" + boundary + "--";
            xhr.sendAsBinary(body);
            return true;
        };
    };

    var nextUpload = function() {
        if(files_to_send.length < 1) {
            window.location.reload();
            return;
        }
        var f = files_to_send.shift();
        var rdr = new FileReader();
        rdr.addEventListener('load', getUploadHandler(rdr, f), false);
        rdr.readAsBinaryString(f);
    };
    
    var isEmpty = function(obj) {
        if(typeof(obj) == 'undefined') { return true; }
        if(obj == null) { return true; }
        return false;
    }

    var getDropHandler = function(url) {
        return function(jq_event) {
            var e = jq_event.originalEvent;
            is_dragging = false;
            if((!e.dataTransfer || !e.dataTransfer.files)) {
                if(isEmpty(WS.ajax.dnd.folder)) {
                    alert("We're sorry, drag-and-drop file uploads are not supported in this browser.");
                }
                return; // browser doesn't support? bail.'
            }
            $('.drag-and-drop-upload-area').css('opacity', 0.5);
            e.preventDefault();
            $.each(e.dataTransfer.files, function(i, f) {
                files_to_send.push(f);
            });
            nextUpload();
        };
    };

    var defaultDropHandler = function(e) {
        $('.drag-and-drop-upload-area').css('border','0px');
        is_dragging = false;
        e.preventDefault();
        return true;
    };
    
    $(elt).bind('dragover',defaultDragHandler);
    $('body').bind('dragover',hiliteDragHandler);
    $(elt).bind('drop', getDropHandler(url));
    $('body').bind('drop', defaultDropHandler).bind('dragexit', defaultDropHandler);
}

$(document).ready(function() {
    $('.drag-and-drop-upload-area').each(function(i, elt) {
        var $elt = $(elt);
        var otype = $elt.attr('data-rel-class');
        var oid = $elt.attr('data-rel-id');
        WS.ajax.dnd.setup(elt, otype, oid);
    });
});

// Convenience aliases
// these MUST be temporarily removed as IE has no native JSON object
//WS.ajax.json_encode = JSON.stringify;
//WS.ajax.json_decode = jQuery.parseJSON;

})(jQuery);