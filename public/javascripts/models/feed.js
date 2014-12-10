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
		_url: '/users/self/feed'
	});
});