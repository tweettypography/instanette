define(	[
		'app/app'
		,'backbone'
		,'./base-model'
		,'config'
	], function (
		app
		,Backbone
		,BaseModel
		,config) {
	return BaseModel.extend({
		url: function () {
			return config.rest + 'media/' + this.id;
		}
	});
});