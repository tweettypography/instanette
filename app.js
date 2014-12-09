var newrelic = require('newrelic');
var config = require('config');
var packageJson = require('./package.json');
var sessionMiddleware = require('./middleware/session');
var gzipMiddleware = require('./middleware/gzip');
var p3pMiddleware = require('./middleware/p3p');
var _ = require('underscore');
var bodyParser = require('body-parser');
var express = require('express');
var errorHandler = require('errorhandler');
var hbs = require('hbs');
var http = require('http');
var methodOverride = require('method-override');
var parseUrlEncoded = bodyParser.urlencoded({ extended: false });

// Run init just once to get the server up and running
var initApp = function initApp() {
	var app = express();

	// Webfonts need mime types, too!
	express.static.mime.define({
		'application/x-font-woff': ['woff']
	});
	express.static.mime.define({
		'application/x-font-ttf': ['ttf']
	});
	express.static.mime.define({
		'application/vnd.ms-fontobject': ['eot']
	});
	express.static.mime.define({
		'font/opentype': ['otf']
	});
	express.static.mime.define({
		'image/svg+xml': ['svg']
	});

	// All of this runs before the static files are served
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'hbs');
	app.set('trust proxy', 1);
	app.set('query parser', false);
	app.use(p3pMiddleware);
	app.use(gzipMiddleware);
	
	// We serve the static files (they should really live behind a CDN)
	app.use(express.static(__dirname + config.endpoints.uiBaseDir, {
		maxAge: !config.developmentMode && 31556926000
	}));
	
	// These run after the static files are served and before the routes
	app.disable('etag');
	app.use(sessionMiddleware);
	
	// We don't have to destroy the session to log out, we just have to get rid of our security credentials
	app.route('/logout')
		.all(function () {
		
		});
	
	// Proxy requests to Instagram
	app.route('/rest')
		.all(function () {
			
		});
	
	// The index page
	app.route('/')
		.get(function () {
			
		});
	
	// Display errors when we are in development mode
	app.use(errorHandler({
		dumpExceptions: config.developmentMode,
		showStack: config.developmentMode
	}));
	
	return app;
};

// Kickoff the initial app setup
var app = module.exports = initApp();

var server = http.createServer(app);

server.listen(app.get('port'), function() {
	console.log(packageJson.name + ' is listening on port', app.get('port'));
});

process.on('SIGINT', function() {
	server.close();
	process.exit();
});