define(	[
		'app/app'
		,'backbone'
		,'config'
	], function (
		app
		,Backbone
		,config) {
	return Backbone.Collection.extend({
		parse: function (response, options) {
			return response.data || response;
		}
	});
});