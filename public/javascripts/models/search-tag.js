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
		url: function () {
			return config.rest + 'tags/' + (this.tag || 'igersindy') + '/media/recent';
		},
		paged: true,
		fetch: function (options) {
			if (options && options.data && options.data.tag) {
				this.tag = options.data.tag;
				delete options.data.tag;
			}
			
			return BaseCollection.prototype.fetch.call(this, options);
		},
		tag: 'igersindy'
	});
});