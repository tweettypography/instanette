// Router
// ------

// Maps URL paths to controller functions.
define(	[
		'./app'
		,'backbone.marionette'
		,'backbone'
		,'./controller'
		,'jquery'
		,'json2'
	], function (
		app
		,Marionette
		,Backbone
		,controller) {		
	// We use Marionette to keep these files free of boilerplate code.
	var Router = Marionette.AppRouter.extend({
		// Update this collection of routes to map a new URL.
		appRoutes: {
			// Loading the page without an explicit path takes us to the 'home' screen
			'': 'home',
			'media/:id(/)': 'mediaItem'
		},
		
		initialize: function () {
			// Track page views with Google Analytics even when we use push state
			this.bind('route', this._trackPageview);
		},

        // Google Analytics handler
        _trackPageview: function() {
            var url = '/' + Backbone.history.getFragment();
            if (Backbone.history.location && Backbone.history.location.search) url += Backbone.history.location.search;
            return app._gaq.push(['_trackPageview', url]);
        }
	});

	var router = new Router({ controller: controller });
	app.start({ router: router });

	// Use delegation to avoid initial DOM selection and allow all matching elements to bubble
	$(document).on('click', 'a[href^="/"]:not([target="_top"]):not([href^="//"])', function (event) {
		var href = $(this).attr('href');
		event.preventDefault();
		router.navigate(href, {trigger: true});
	});

	return router;
});