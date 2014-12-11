define(function (require){
	var app = require('app/app');
	var Marionette = require('backbone.marionette');
	var MediaItemView = require('views/media-item');
	var mediaHighResTemplate = require('tmpl!templates/media-high-res.html');

	return Marionette.CollectionView.extend({
		className: 'clearfix',

		itemView: MediaItemView.extend({
			template: mediaHighResTemplate,
			className: 'instachoice'
		})
	});
});