define(	[
		'backbone.marionette'
		,'backbone'
		,'views/feed'
		,'views/search-tag'
		,'tmpl!templates/home.html'
	], function (
		Marionette
		,Backbone
		,FeedView
		,SearchTagView
		,homeTemplate) {
	return Marionette.Layout.extend({
		template: homeTemplate,

		regions: {
			'feed': '#feed'
		},
		
		initialize: function() {
			this.views = {};
			this.views.searchTagView = new SearchTagView();
			this.views.feedView = new FeedView({
				collection: this.collection,
				headerLeft: this.views.searchTagView
			});
			
			this.listenTo(this.views.searchTagView, 'search', this.setTag);
		},
		
		setTag: function (tag) {
			this.collection.tag = tag;
			this.collection.fetch();
		},

		onRender: function () {
			this.feed.show(this.views.feedView);
		}
	});
});