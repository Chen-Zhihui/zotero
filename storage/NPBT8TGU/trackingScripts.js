/*	
 * Include all of the third party javascript tracking files below.
*/

//Google Tag Manager ( Google Analytics	)
try {
	$j(window).on("load", function() {
		
		// Google Tracking 
		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://www' : 'http://www') + '.googletagmanager.com/gtag/js?id=UA-10659429-1';
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);

			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments)};
			gtag('js', new Date());
			gtag('config', 'UA-10659429-1');
			gtag('config', 'AW-1072270420');
		})();
	});
} catch (ex){ }