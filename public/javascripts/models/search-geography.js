define(	[
		'backbone'
		,'./base-collection'
		,'./mediaItem'
		,'config'
	], function (
		Backbone
		,BaseCollection
		,MediaItem
		,config) {
	return BaseCollection.extend({
		model: MediaItem,
		url: config.rest + 'media/search',
		paged: true,
		fetch: function (options) {
			if (!options) {
				options = {};
			}
			
			if (!options.data) {
				options.data = _.clone(this.coordinates);
			} else if (options.data.lat && options.data.lng) {
				this.coordinates.lat = options.data.lat;
				this.coordinates.lng = options.data.lng;
			} else {
				options.data.lat = this.coordinates.lat;
				options.data.lng = this.coordinates.lng;
			}
			
			return BaseCollection.prototype.fetch.call(this, options);
		},
		coordinates: {
			lat: 39.848784,
			lng: -86.141638
		}
	});
});