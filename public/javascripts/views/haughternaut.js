define(	[
		'backbone.marionette'
		,'backbone'
		,'views/media-item'
		,'tmpl!templates/haughternaut.html'
		,'tmpl!templates/media-high-res.html'
	], function (
		Marionette
		,Backbone
		,MediaItemView
		,haughternautTemplate
		,mediaItemTemplate) {
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
		},
		
		nextTwo: function() {
			this.collection.fetch();
		}
	});
});