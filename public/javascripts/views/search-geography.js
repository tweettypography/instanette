define( [
		'app/app'
		,'backbone.marionette'
		,'views/media-item'
		,'tmpl!templates/search.html'
	], function (
		app
		,Marionette
		,MediaItemView
		,searchTemplate
		,feedListItemTemplate) {
	return Marionette.CompositeView.extend({
		template: searchTemplate,
		
		className: 'repeater-search',
		
		itemView: MediaItemView,
		
		itemViewContainer: 'tbody'
	});
});