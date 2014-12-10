define(	[
		'backbone.marionette'
		,'backbone'
		,'tmpl!templates/navigation.html'
	], function (
		Marionette
		,Backbone
		,navigationTemplate) {
	return Marionette.Layout.extend({
		template: navigationTemplate,
		
		className: 'row',
		
		initialize: function() {
		}
	});
});