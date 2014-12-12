define(function (require) {
	var Backbone = require('backbone');
	var BaseCollection = require('./base-collection');
	var MediaItem = require('./mediaItem');
	var config = require('config');

	var dictionary = [
		'architecture',
		'china',
		'scotland',
		'steampunk',
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
			this.lastTag = this.getRandomTag();
			return config.rest + 'tags/' + this.lastTag + '/media/recent';
		},
		paged: false,
		seenPics: [],
		SHOWN_PER_VEIW: 2,
		fetch: function (options) {
			var self = this;
			options = {
				remove: false,
				data: {
					count: 150
				},
				success: function chooseTwo(collection, response, options) {
					//filter out already seen pictures
					_.each(collection.models, function(element, index, list){
						if(_.contains(self.seenPics, element.id)){
							collect.models.splice(index, 1);
						}
					});

					//if collection has less than two pictures in it, fetch again
					if(collection.models.length < self.SHOWN_PER_VEIW){
						self.fetch();
					}

					//choose N pictures
					var chosenPics = [];
					for(var i=0; i<self.SHOWN_PER_VEIW; i++){
						//choose a pic
						var picId = collection.models[Math.floor(Math.random() * collection.models.length)].id;
						chosenPic = collection.get(picId);

						//remove pic from models
						collection.remove(picId, {silent: true});

						//add pictures to "already seen"
						self.seenPics.push(chosenPic);
					}

					//replace collection's models with chosen few
					collection.set(chosenPics);
				}
			};

			this.reset();
			// BaseCollection.prototype.fetch.call(this, options);
			return BaseCollection.prototype.fetch.call(this, options);
		},
		dictionary: [],
		getRandomTag: function getRandomTag() {
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