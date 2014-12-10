define( [
		'app/app'
		,'backbone.marionette'
		,'views/media-item'
		,'tmpl!templates/media-low-res.html'
	], function (
		app
		,Marionette
		,MediaItemView
		,mediaLowResTemplate) {
	return Marionette.CollectionView.extend({
		className: 'clearfix repeater-thumbnail-cont align-justify',
		
		itemView: MediaItemView.extend({
			template: mediaLowResTemplate,
			className: 'thumbnail repeater-thumbnail'
		})
	});
});