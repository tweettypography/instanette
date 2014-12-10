define(	[
		'app/app'
		,'backbone.marionette'
		,'backbone'
		,'config'
		,'models/base-collection'
		,'views/comment-list'
		,'views/like-button'
		,'tmpl!templates/media-item-detail.html'
	], function (
		app
		,Marionette
		,Backbone
		,config
		,CommentCollection
		,CommentListView
		,LikeButtonView
		,mediaItemDetailTemplate) {
	return Marionette.Layout.extend({
		template: mediaItemDetailTemplate,

		regions: {
			commentList: '#comments',
			actions: '.actions'
		},

		modelEvents: {
			'change:comments': 'setComments',
			'change': 'render'
		},

		initialize: function() {
			this.views = {};
			this.comments = new CommentCollection(this.model.get('comments'), {
				parse: true
			});
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
			this.actions.show(new LikeButtonView({
				model: this.model
			}));
		}
	});
});