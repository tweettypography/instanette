define(	[
		'backbone.marionette'
		,'backbone'
		,'handlebars'
		,'moment'
		,'config'
		,'jquery'
	], function (
		Marionette
		,Backbone
		,Handlebars
		,moment
		,config) {
	// Override renderer to use pre-compiled templates
	Marionette.Renderer.render = function(template, data) {
		// Config values will be available to all templates and will override model values with the same name
		return template && template(_.extend(data, config));
	};
	
	// Use moment.js to format dates in templates
	Handlebars.registerHelper('dateFormat', function(context, block) {
		var f = block.hash.format || 'MMM Do, YYYY';
		return moment(context).format(f);
	});

	// Create, configure, and return application object
	var app = new Marionette.Application();

	app.addRegions({
		mainRegion: '#main',
		navigationRegion: '#navigation'
	});

	app.addInitializer(function (options) {
		this.router = options.router;
		this.models = new Backbone.Model();
		this.views = new Backbone.Model();
	});

	app.on('initialize:after', function() {
		$(function () {
			Backbone.history.start({pushState: true, hashChange: false});
		});
	});
	
	app._gaq = (window && window._gaq) || app._gaq || [];
	
	return app;
});