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
		'tokyo'
	];
	
	var SHOWN_PER_VEIW = 2;

	return BaseCollection.extend({
		model: MediaItem,
		url: function () {
			return config.rest + 'tags/' + this.getRandomTag() + '/media/recent';
		},
		paged: false,
		seenPics: [],
		dictionary: [],
		masterList: new Backbone.Collection(),
		fetch: function (options) {
			options = {
				remove: false,
				data: {
					count: 50
				}
			};

			this.reset();
			
			// Once we get a master list over a certain length we can start fetching way less often
			if (this.masterList.length < 300) {
				BaseCollection.prototype.fetch.call(this, options);
			} else {
				this.add({
					data: []
				}, {
					parse: true
				});
			}
		},
		getRandomTag: function getRandomTag() {
			if (this.dictionary.length === 0) {
				this.dictionary = _.clone(dictionary);
			}

			var i = Math.floor(Math.random()*this.dictionary.length);
			var tag = this.dictionary[i];

			this.dictionary.splice(i, 1);

			return tag;
		},
		seed: function (data) {
			// Filter out already seen / liked pictures
			this.masterList.add(_.reject(data, function(pic) {
				var seen = _.contains(this.seenPics, pic.id);
				var liked = pic.user_has_liked;
				
				return seen || liked;
			}, this));
		},
		parse: function (data) {
			var chosenPics = [];
			
			data = BaseCollection.prototype.parse.call(this, data);
			
			// Filter out already seen pictures
			this.seed(data);

			// If collection has less than two pictures in it, go ahead and use the dups
			if (this.masterList.length < SHOWN_PER_VEIW) {
				this.masterList.add(data);
			}

			// Choose N pictures
			for (var i = 0; i < SHOWN_PER_VEIW; i++) {
				// Choose a pic
				var chosenPic = this.masterList.models[Math.floor(Math.random() * this.masterList.length)];
				
				// Add the pic to the data we will return
				chosenPics.push(chosenPic);
				
				// Add the pic to "already seen"
				this.seenPics.push(chosenPic.id);
				
				// Remove pic from the master list
				this.masterList.remove(chosenPic);
			}

			return chosenPics;
		}
	});
});