$j(function() {
	
	// Prompt tabs
	$j("html.sm.phone.responsive-content.tech-library #article-body .search-result-article .prompt-label").click(function() {
		var relatedPrompt = $j(this).attr("data-related-prompt");
		var promptGroup = $j(this).closest("div.search-result-article").find("#" + relatedPrompt).parent();
		
		$j(this).siblings().removeClass("active");
		$j(this).addClass("active");
		
		$j(promptGroup).siblings().hide();
		$j(promptGroup).show();
	});
});