define( [
		'app/app'
		,'backbone.marionette'
		,'backbone'
		,'views/haughternaut-grid'
		,'tmpl!templates/haughternaut.html'
	], function (
		app
		,Marionette
		,Backbone
		,FeedGridView
		,feedTemplate) {
	return Marionette.Layout.extend({
		template: feedTemplate,

		className: 'repeater',

		regions: {
			canvas: '.repeater-canvas',
			headerRight: '.repeater-header-right',
			headerLeft: '.repeater-header-left',
		},

		events: {
			'click .repeater-next': 'nextPage'
		},

		views: {},

		initialize: function() {
			this.model = this.collection.pagination;
		},

		nextPage: function () {
			this.collection.nextPage();
		},

		showListView: function () {
			this.views.listView = this.views.listView || new FeedGridView({
				model: this.model,
				collection: this.collection
			});

			this.canvas.show(this.views.listView);
		},

		onRender: function () {
			this.showListView();
		}
	});
});