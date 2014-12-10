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
			return config.rest + 'tags/' + this.getRandomTag() + '/media/recent';
		},
		paged: true,
		count: 2,
		fetch: function (options) {
			if (options && options.data && options.data.tag) {
				this.tag = options.data.tag;
				delete options.data.tag;
			}

			return BaseCollection.prototype.fetch.call(this, options);
		},
		getRandomTag: function getRandomTag(){
			var dictionary = [
				'tweegram',
				'photooftheday',
				'20likes',
				'amazing',
				'smile',
				'look',
				'instalike',
				'igers',
				'picoftheday',
				'food',
				'instadaily',
				'iphoneonly',
				'instagood',
				'bestoftheday',
				'instacool',
				'instago',
				'all',
				'webstagram',
				'colorful',
				'style'
			];

			return dictionary[Math.floor(Math.random()*dictionary.length)];
		}
	});
});