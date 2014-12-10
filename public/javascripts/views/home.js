define(	[
		'backbone.marionette'
		,'backbone'
		,'views/feed'
		,'tmpl!templates/home.html'
	], function (
		Marionette
		,Backbone
		,FeedView
		,homeTemplate) {
	return Marionette.Layout.extend({
		template: homeTemplate,

		regions: {
			'feed': '#feed'
		},
		
		initialize: function() {
			// We're passing an empty model to the composite view because this example doesn't need one
			// That's not normally going to be the case
			this.views = {
				feedView: new FeedView({
					collection: this.collection
				})
			};
		},

		onRender: function () {
			this.feed.show(this.views.feedView);
		}
	});
});