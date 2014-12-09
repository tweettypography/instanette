// IE compains about cookies from the iframe in QA. These policies have turned out to be worthless but the header is required
var p3pMiddleware = function p3pMiddleWare(req, res, next) {
	res.header('p3p', 'CP="This app does not have a P3P policy"');

	next();
};

module.exports = p3pMiddleware;