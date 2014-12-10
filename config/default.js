module.exports = {
	endpoints: {
		rest: '/rest/',
		uiBaseDir: '/public-optimized/',
		versionedDir: true,
		defaultStaticBase: '/',
		redirectUrl: 'https://instanette.herokuapp.com/'
	},
	developmentMode: false,
	cache: {
		// Session length. Default is 6 hours. Cookies expire with browser session
		session_ttl: 21600
	},
	redis: {
		host: '127.0.0.1',
		port: 6379
	}
};