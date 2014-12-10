define(	[
		'app/app'
		,'backbone'
		,'config'
	], function (
		app
		,Backbone
		,config) {
	return Backbone.Model.extend({
		url: function () {
			var u = _.isFunction(this._url) ? this._url() : this._url;
			
			if (u) {
				return 'https://api.instagram.com/v1' + u + '?access_token=' + config.accessToken;
			} else {
				return undefined;
			}
		},
		parse: function (response, options) {
			return response.data || response;
		}
	});
});