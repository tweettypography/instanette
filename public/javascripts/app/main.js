// Note, this file is used by the require.js compiler but the actual config settings are embeded directly into a script tag on the page. (Check out the layout file)
require.config({
	baseUrl: '../../vendor',
	paths: {
		// Each type of file we use lives in its own directory. Each of these directories is given a convenient alias.
		templates: '../templates',
		models: '../javascripts/models',
		views: '../javascripts/views',
		app: '../javascripts/app',
		jquery: 'jquery-1.11.1',
        underscore: 'lodash.underscore',
        bootstrap: 'bootstrap-collapse'
	},
	deps: ['app/router', 'bootstrap'],
	enforceDefine: true,
	waitSeconds: 0,
	shim: {
        'underscore': {
            exports: '_'
        },
        'json2': {
            exports: 'JSON'
        },
        'bootstrap': {
	        deps: ['jquery'],
	        exports: '$.fn.collapse'
        }
    }
});