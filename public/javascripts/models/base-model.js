define(	[
		'app/app'
		,'backbone'
		,'config'
	], function (
		app
		,Backbone
		,config) {
	return Backbone.Model.extend({
		parse: function (response, options) {
			return response.data || response;
		}
	});
});