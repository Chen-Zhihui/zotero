$(document).ready(function() {

	var noSwitcherFileList = {
	   "what-is-qml.htm": "QML",
	   "qt-qml-components.htm": "QML", 
	   "esri-qml-components.htm": "QML", 
	   "my-samples-in-the-qml-sample-app.htm": "QML",
	   "customizing-app-icon-and-splash-screen.htm": "QML",
	   "deploy-local-offline-data-with-your-app.htm": "QML",
	   "get-driving-directions-with-qml.htm": "QML",
	   "build-a-runtime-deployment.htm": "C++", 
	   "supported-raster-dataset-file-formats.htm": "C++", 
	   "supported-raster-types.htm": "C++", 
	   "packages-used-by-arcgis-runtime.htm": "C++", 
	   "supported-geoprocessing-tools.htm": "C++",
	   "author-and-publish-a-geoprocessing-model.htm": "C++",
	"task-operation-overview.htm": "C++",
	"geoprocessing-task-parameters.htm": "C++",
	"geoprocessing-task-operation-execute.htm": "C++",
	"geoprocessing-task-operation-submitjob.htm": "C++",
	"what-is-geoprocessing-.htm": "C++",
	"quick-tour-of-geoprocessing-in-the-runtime.htm": "C++",
	"message-processing.htm": "C++",
	"control-military-labelling.htm": "C++",
	"symbol-dictionary.htm": "C++",
	"local-server-package-support.htm": "C++",
	"local-server-geoprocessing-tools-support.htm": "C++",
	"local-server-raster-support.htm": "C++",
	"working-with-local-services.htm": "C++",
	"best-practices-for-qml-api-development.htm": "QML",
	"qml-and-esri-s-qml-api.htm": "QML",
	"local-server.htm": "C++",
	"create-a-local-server-deployment.htm": "C++"	
	}

						
    var section = "";
	 if(window.location.pathname.match( /(\/10-2\/)/)){
		section = "/10-2";
	 }else if(window.location.pathname.match( /(\/latest\/)/)){
		section = "/latest";
	 }
	 
	 var val = '<p id="plats" class="doc-platform-switcher">' +
        '<span class="viewing" data-langlabel="viewing">' + "Viewing" + ': </span>' +
        '<a data-appname="qt" data-plat="qml" data-prefix="/qt' + section + '/qml" href="/qt' + section + '/qml/" data-langlabel="qml" class=""> QML</a>' +
        '<a data-appname="qt" data-plat="cpp" data-prefix="/qt' + section + '/cpp" href="/qt' + section + '/cpp/" data-langlabel="cpp" class=""> C++</a>' +
        '</p>',

		prodKey = "qt",
	    prodDVal = "qml",
		homePath = "/qt",
		pathname = window.location.pathname,
		parts = pathname.split ("/"),
		fname = parts.pop(),
		fldpath = parts.join ("/"),
		plat = $.cookie (prodKey) || prodDVal,
		isHome = fldpath === homePath;

		if(!window.location.pathname.match( /(\/sample-code\/)/)){
			$('.column-17 h1, .content-section h1').after (val);
		}
		
	
	function modHomeUrls (plat) {
		$("a[href]").each (function (i) {
			var $ele = $(this),
				href = $ele.attr ("href"),
				parts = href.split("/");
				fname = parts.pop(),
				fld = parts.pop(),
				newHref = href.replace ("/"+prodDVal+"/", "/"+plat+"/");

			if (href.indexOf (homePath) === 0 ) {
				//console.log (href + "=>" + newHref);
				$ele.attr ("href", newHref);
			}
		})

	}


	$("#plats a[data-appname]").each (function (i) {
		var $ele = $(this),
			prefix = $ele.data ("prefix"),
			dplat = $ele.data ("plat"),
			url;

		if ((fldpath.indexOf (prefix) === 0))  {
			$ele.addClass ("is-active");
			url = prefix + fldpath.replace (prefix, "") + "/" + fname;
		} else {

			if(fname in noSwitcherFileList){
				// disable click
				url = "#";
				$ele.toggleClass ("is-disabled");
			}else{
				//url = prefix + "/" + fldpath.split("/").pop() + "/" + fname;
				url = prefix + "/" + fldpath.split("/").pop() + "/" + fname;
				$ele.toggleClass ("available");
			}

		}

		$ele.attr ("href", url);
	});


	$('a[data-prefix]').on ("click", function (evt) {
		var $ele = $(this),
			url = $ele.attr("href");

		$.cookie ($ele.data ("appname"), $ele.data ("plat"), {expires: new Date(2020,1,1), path:"/"});

		if (isHome) {
			modHomeUrls ($ele.data ("plat"));
		}
	})

// A temp fix
	$('.sub-nav-list a[href*="api-reference"]').removeClass("icon-ui-sub-nav").attr("target","_top");
});