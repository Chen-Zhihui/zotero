$(document).ready(function() {

var mdstr = $(".sdksample_md pre code").text()
mdstr = mdstr.split('\n').slice(1).join('\n');


var extnHtmlUpdater = function(converter) {
  
  
  var ext1 = {
    type    : 'html', 
	 regex   : '<ol>', 
	 replace : '<ol class="list-numbered">'
  };
  
  var ext2 = {
	  type: 'html',
	  filter: function (text, converter, options) {
		  //text = text.replace("code", 'code123');
		  return text;
	  }
	};
	return [ext1, ext2]
}


var converter = new showdown.Converter({extensions: [extnHtmlUpdater]});
converter.setOption('tables', true);


//var converter = new showdown.Converter();
	 
	 $(".sdksample_md").html(converter.makeHtml(mdstr)).show()
	 $(".loader").hide()
	 $('.sdksample_md img').remove();
	 


});

/*
<script src="//cdnjs.cloudflare.com/ajax/libs/showdown/0.3.1/showdown.min.js"></script>
  <script src="/en/asset/js/mdtohtml.js"></script>
  
<script src="https://cdn.rawgit.com/showdownjs/showdown/1.4.2/dist/showdown.min.js"></script>
  <script src="/en/asset/js/mdtohtml.js"></script>
  */
  