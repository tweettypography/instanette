define(	[
		'backbone.marionette'
		,'backbone'
		,'views/haughternaut-feed'
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