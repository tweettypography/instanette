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
		
		nextTwo: function() {
			this.collection.fetch();
		}
	});
});