define( [
		'app/app'
		,'backbone.marionette'
		,'views/item-list-item'
		,'tmpl!templates/item-list.html'
	], function (
		app
		,Marionette
		,ItemListItemView
		,itemListTemplate) {
	return Marionette.CompositeView.extend({
		template: itemListTemplate,
		
		// The view that will be rendered for each model in our collection
		// When items are added or removed from the collection Marionette will automatically add or remove views to match
		itemView: ItemListItemView,
		
		// The HTML element in item-list.html that we want to populate with our itemViews
		itemViewContainer: 'ul'
	});
});