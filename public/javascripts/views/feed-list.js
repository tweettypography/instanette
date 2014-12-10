define( [
		'app/app'
		,'backbone.marionette'
		,'views/media-item'
		,'tmpl!templates/feed-list.html'
		,'tmpl!templates/feed-list-item.html'
	], function (
		app
		,Marionette
		,MediaItemView
		,feedListTemplate
		,feedListItemTemplate) {
	return Marionette.CompositeView.extend({
		template: feedListTemplate,
		
		className: 'repeater-list',
		
		// The view that will be rendered for each model in our collection
		// When items are added or removed from the collection Marionette will automatically add or remove views to match
		itemView: MediaItemView.extend({
			template: feedListItemTemplate,
			tagName: 'tr'
		}),
		
		// The HTML element in item-list.html that we want to populate with our itemViews
		itemViewContainer: 'tbody'
	});
});