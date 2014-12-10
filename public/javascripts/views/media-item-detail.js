define(	[
		'app/app'
		,'backbone.marionette'
		,'backbone'
		,'config'
		,'models/base-collection'
		,'views/comment-list'
		,'tmpl!templates/media-item-detail.html'
	], function (
		app
		,Marionette
		,Backbone
		,config
		,CommentCollection
		,CommentListView
		,mediaItemDetailTemplate) {
	return Marionette.Layout.extend({
		template: mediaItemDetailTemplate,

		regions: {
			commentList: '#comments'
		},

		modelEvents: {
			'change:comments': 'setComments',
			'change': 'render'
		},

		events: {
			'click .like': 'like'
		},

		initialize: function() {
			this.views = {};
			this.comments = new CommentCollection(this.model.get('comments'), {
				parse: true
			});
		},

		like: function () {
			console.log('like 1');
			this.model.like();
		},

		setComments: function (model, value, options) {
			if (value.data) {
				this.comments.set(value.data);
			}
		},

		showComments: function () {
			this.views.commentListView = this.views.commentListView || new CommentListView({
				collection: this.comments
			});

			this.commentList.show(this.views.commentListView);
		},

		onRender: function () {
			this.showComments();
		}
	});
});