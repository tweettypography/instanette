define(	[
		'backbone.marionette'
		,'backbone'
		,'views/item-list'
		,'tmpl!templates/home.html'
	], function (
		Marionette
		,Backbone
		,ItemListView
		,homeTemplate) {
	return Marionette.Layout.extend({
		template: homeTemplate,

		regions: {
			'itemList': '#item-list'
		},
		
		initialize: function() {
			// We're passing an empty model to the composite view because this example doesn't need one
			// That's not normally going to be the case
			this.views = {
				itemListView: new ItemListView({
					model: new Backbone.Model({}),
					collection: this.collection
				})
			};
		},

		onRender: function () {
			this.itemList.show(this.views.itemListView);
		}
	});
});