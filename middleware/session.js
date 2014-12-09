var redisClient = require('../redis-store');
var helpers = require('../helpers');
var config = require('config');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var sessionStore = session({store: new redisStore({ client: redisClient, ttl: config.cache.session_ttl }), proxy: true, resave: true, saveUninitialized: false, secret: '2ed99a026ca3481eafd587535aeef274', cookie: { path: '/', httpOnly: true, secure: !config.isLocal, maxAge: null, expires: false }});

// We're using redis for our session store (and elsewhere throughout the app)
var sessionMiddleware = function sessionMiddleware(req, res, next) {
	// Don't cache routes that use session information
	res.header('Cache-Control', 'private, no-cache, must-revalidate');
	res.header('Pragma', 'no-cache');
	res.header('Expires', 'Fri, 01 Jan 1990 00:00:00 GMT');
	res.header('X-Frame-Options', 'SAMEORIGIN');
	
	try {
		sessionStore(req, res, next);
	} catch (ex) {
		helpers.error('Exception', ex);
		res.send(500, 'Internal Server Error');
	}
};

module.exports = sessionMiddleware;