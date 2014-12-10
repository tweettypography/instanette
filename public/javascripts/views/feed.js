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
			headerLeft: '.repeater-header-left',
		},
		
		events: {
			'change .results-per-page': 'setResultsPerPage',
			'click .repeater-next': 'nextPage'
		},
		
		initialize: function() {
			this.model = this.collection.pagination;
			
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
		
		setResultsPerPage: function (e) {
			var numResults = this.$(e.currentTarget).val();
			this.model.set('count', numResults);
		},
		
		nextPage: function () {
			this.collection.nextPage();
		},
		
		showListView: function () {
			this.views.listView = this.views.listView || new FeedListView({
				model: this.model,
				collection: this.collection
			});

			this.canvas.show(this.views.listView);
		},
		
		showGridView: function () {
			this.views.gridView = this.views.gridView || new FeedGridView({
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
		
		showHeaderLeft: function () {
			if (this.options.headerLeft) {
				this.headerLeft.show(this.options.headerLeft);
			}
		},
		
		onRender: function () {
			this.showListView();
			this.showRepeaterToggle();
			this.showHeaderLeft();
		}
	});
});