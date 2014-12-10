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
		url: config.rest + 'users/self/feed'
	});
});