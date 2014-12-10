define(	[
		'app/app'
		,'backbone.marionette'
		,'tmpl!templates/search-result.html'
	], function (
		app
		,Marionette
		,searchResultTemplate) {
	return Marionette.ItemView.extend({
		template: searchResultTemplate,
		
		tagName: 'li'
	});
});