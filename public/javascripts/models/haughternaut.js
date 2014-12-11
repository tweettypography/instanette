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
		'nofilter'
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
		getRandomTag: function getRandomTag(){
			var i = Math.floor(Math.random()*dictionary.length);
			var tag = dictionary[i];
			
			// In the future I'd like to add a function which removes elements from the array here
			// and stores much larger quantities to be sorted client side -- saves on API requets.
			
			return tag;
		}
	});
});