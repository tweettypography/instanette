define(	[
		'app/app'
		,'backbone.marionette'
		,'backbone'
		,'config'
		,'tmpl!templates/item-detail.html'
	], function (
		app
		,Marionette
		,Backbone
		,config
		,itemDetailTemplate) {
	return Marionette.Layout.extend({
		template: itemDetailTemplate,
		
		// We're going to listen for the model to change its name, if it does then we'll re-render this view
		modelEvents: {
			"change:name": "nameChanged" // equivalent to this.listenTo(this.model, "change:name", this.nameChanged)
		},
		
		nameChanged: function() {
			// The name changed so let's re-render
			this.render();
		},
		
		onRender: function () {
			// We could perform some actions whenever we render
		}
	});
});