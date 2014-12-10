define(	[
		'backbone.marionette'
		,'backbone'
		,'views/feed'
		,'views/search-geography'
		,'tmpl!templates/home.html'
	], function (
		Marionette
		,Backbone
		,FeedView
		,SearchGeographyView
		,homeTemplate) {
	return Marionette.Layout.extend({
		template: homeTemplate,

		regions: {
			'feed': '#feed'
		},
		
		initialize: function() {
			this.views = {};
			this.views.searchGeographyView = new SearchGeographyView();
			this.views.feedView = new FeedView({
				collection: this.collection,
				headerLeft: this.views.searchGeographyView
			});
			
			this.listenTo(this.views.searchGeographyView, 'search', this.setCoordinates);
		},
		
		setCoordinates: function (coordinates) {
			this.collection.coordinates = coordinates;
			this.collection.fetch();
		},

		onRender: function () {
			this.feed.show(this.views.feedView);
		}
	});
});