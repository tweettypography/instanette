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
			
	var dictionary = [
		'catsofinstagram',
		'dogsofinstagram',
		'snowy',
		'igers',
		'igersindy',
		'igerssf',
		'holidays',
		'tbt',
		'goats',
		'hiking',
		'fail',
		'cats',
		'lol',
		'dogs',
		'adventure',
		'hawaii',
		'japan',
		'paris',
		'canada',
		'moose',
		'nofilter',
		'australia',
		'montreal',
		'vancouver',
		'portland',
		'mountain',
		'cat',
		'tiger',
		'billmurray',
		'forest',
		'waterfall',
		'tokyo',
		'mcm',
		'wcw'
	];
			
	return BaseCollection.extend({
		model: MediaItem,
		url: function () {
			return config.rest + 'tags/' + this.getRandomTag() + '/media/recent';
		},
		paged: false,
		fetch: function (options) {
			options = {
				remove: false,
				data: {
					count: 1
				}
			};
			
			this.reset();
			BaseCollection.prototype.fetch.call(this, options);
			return BaseCollection.prototype.fetch.call(this, options);
		},
		dictionary: [],
		getRandomTag: function getRandomTag(){
			if (this.dictionary.length === 0) {
				this.dictionary = _.clone(dictionary);
			}
			
			var i = Math.floor(Math.random()*this.dictionary.length);
			var tag = this.dictionary[i];
			
			this.dictionary.splice(i, 1);
			
			// In the future I'd like to add a function which removes elements from the array here
			// and stores much larger quantities to be sorted client side -- saves on API requets.
			
			return tag;
		}
	});
});