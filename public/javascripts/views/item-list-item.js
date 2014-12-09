define(	[
		'app/app'
		,'backbone.marionette'
		,'tmpl!templates/item-list-item.html'
	], function (
		app
		,Marionette
		,itemListItemTemplate) {
	return Marionette.ItemView.extend({
		// The tag that will wrap this item
		// Every view gets wrapped, if you don't specify the tagName it will be wrapped by a div
		tagName: 'li',
		
		template: itemListItemTemplate
	});
});