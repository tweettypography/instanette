define(function (require) {
	var Marionette = require('backbone.marionette');
	var Backbone = require('backbone');
	var MediaItemView = require('views/media-item');
	var haughternautTemplate = require('tmpl!templates/haughternaut.html');
	var mediaItemTemplate = require('tmpl!templates/media-high-res.html');

	return Marionette.CompositeView.extend({
		template: haughternautTemplate,

		tagName: 'section',

		className: 'haughternaut',

		itemView: MediaItemView.extend({
			template: mediaItemTemplate,
			className: 'col-md-6 col-xs-6'
		}),

		itemViewContainer: '#haughternaut',

		events: {
			'click .skip': 'nextTwo'
		},

		initialize: function () {
			this.listenTo(this.collection, 'change:user_has_liked', this.nextTwo);
			this.listenTo(this.collection, 'sync', this.refreshTag);
		},

		refreshTag: function() {
			this.$el.find('h4').text(this.getTag());
		},

		getTag: function() {
			return this.collection.lastTag;
		},

		nextTwo: function() {
			this.collection.fetch();
		}
	});
});