define( [
		'app/app'
		,'backbone.marionette'
		,'views/comment'
	], function (
		app
		,Marionette
		,CommentView) {
	return Marionette.CollectionView.extend({
		tagName: 'ul',
		
		itemView: CommentView.extend({
			tagName: 'li'
		})
	});
});