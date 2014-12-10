define( [
		'app/app'
		,'backbone.marionette'
		,'views/media-item'
		,'tmpl!templates/feed-grid-item.html'
	], function (
		app
		,Marionette
		,MediaItemView
		,feedGridItemTemplate) {
	return Marionette.CollectionView.extend({
		className: 'clearfix repeater-thumbnail-cont align-justify',
		
		itemView: MediaItemView.extend({
			template: feedGridItemTemplate,
			className: 'thumbnail repeater-thumbnail'
		})
	});
});