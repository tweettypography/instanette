var config = require('config');
var packageJson = require('./package.json');
var sessionMiddleware = require('./middleware/session');
var gzipMiddleware = require('./middleware/gzip');
var p3pMiddleware = require('./middleware/p3p');
var _ = require('underscore');
var express = require('express');
var errorHandler = require('errorhandler');
var hbs = require('hbs');
var http = require('http');
var request = require('request');
var httpProxy = require('http-proxy');
var url = require('url');
var proxy = httpProxy.createProxyServer({});

var staticBase = config.endpoints.defaultStaticBase + (config.endpoints.versionedDir ? packageJson.version + '/' : '');
var clientId = config.isLocal ? config.credentials.clientId : process.env.clientId;
var clientSecret = config.isLocal ? config.credentials.clientSecret : process.env.clientSecret;

var getConfig = function (req) {
	var browserConfig = {
		rest: config.endpoints.rest,
		user: req.session && req.session.user,
		version: packageJson.version,
		googleApiKey: packageJson.googleApiKey
	};
	
	return {
			browser: JSON.stringify(browserConfig),
			clientId: clientId,
			title: packageJson.name,
			description: packageJson.description,
			htmlClasses: 'fuelux',
			staticBase: staticBase,
			redirectUrl: config.endpoints.redirectUrl
		};
};

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
	app.set('query parser', true);
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
		.all(function logout(req, res) {
			var isAjaxRequest = (req.get('X-Requested-With') === 'XMLHttpRequest');
			
			delete req.session.accessToken;
			delete req.session.user;
		
			if (!isAjaxRequest) {
				res.redirect('/');
			} else {
				res.status(200).send('OK');
			}
		});
		
	app.route('/rest/*')
		.all(function rest(req, res) {
			var requestUrl = url.parse(req.url, true);
		
			req.url = url.format({
					pathname: requestUrl.pathname.replace('/rest', '/v1'),
					query: _.extend({
							access_token: req.session.accessToken
						}, requestUrl.query)
				});
			
			req.headers = {};
			
			proxy.web(req, res, {
				target: 'https://api.instagram.com:443'
			});
		});
	
	// The index page
	app.route(/^\/?([^\/]+)?/)
		.get(function index(req, res) {
			if (req.query.code) {
				request({
					uri: 'https://api.instagram.com/oauth/access_token',
					method: 'POST',
					form: {
						client_id: clientId,
						client_secret: clientSecret,
						grant_type: 'authorization_code',
						redirect_uri: config.endpoints.redirectUrl,
						code: req.query.code
					}
				}, function (error, response, body) {
					if (error) {
						console.error(error);
					} else if (body) {
						body = JSON.parse(body);
						
						req.session.accessToken = body.access_token;
						req.session.user = body.user;
					}
					
					res.redirect('/');
				});
			} else if (req.session && req.session.accessToken) {
				res.render('index', getConfig(req));
			} else {
				res.render('login', getConfig(req));
			}
		});
	
	// Display errors when we are in development mode
	app.use(errorHandler({
		dumpExceptions: !!config.developmentMode,
		showStack: !!config.developmentMode
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