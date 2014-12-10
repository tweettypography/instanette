define( [
		'app/app'
		,'backbone.marionette'
		,'backbone'
		,'views/feed-list'
		,'views/feed-grid'
		,'views/repeater-toggle'
		,'tmpl!templates/feed.html'
	], function (
		app
		,Marionette
		,Backbone
		,FeedListView
		,FeedGridView
		,RepeaterToggleView
		,feedTemplate) {
	return Marionette.Layout.extend({
		template: feedTemplate,
		
		className: 'repeater',
		
		regions: {
			canvas: '.repeater-canvas',
			headerRight: '.repeater-header-right',
		},
		
		initialize: function() {
			this.views = {};
			this.repeaterStyle = new Backbone.Model({
				current: 'list'
			});
			
			this.listenTo(this.repeaterStyle, 'change:current', function (model, value, options) {
				if (value === 'thumbnail') {
					this.showGridView();
				} else {
					this.showListView();
				}
			});
		},
		
		showListView: function () {
			this.views.listView = this.views.listView || new FeedListView({
				model: new Backbone.Model({}),
				collection: this.collection
			});

			this.canvas.show(this.views.listView);
		},
		
		showGridView: function () {
			this.views.gridView = this.views.gridView || new FeedGridView({
				model: new Backbone.Model({}),
				collection: this.collection
			});

			this.canvas.show(this.views.gridView);
		},
		
		showRepeaterToggle: function () {
			this.views.repeaterToggleView = this.views.repeaterToggleView || new RepeaterToggleView({
				model: this.repeaterStyle
			});

			this.headerRight.show(this.views.repeaterToggleView);
		},
		
		onRender: function () {
			this.showListView();
			this.showRepeaterToggle();
		}
	});
});