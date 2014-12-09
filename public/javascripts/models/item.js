define(	[
		'app/app'
		,'backbone'
		,'./base-model'
		,'config'
	], function (
		app
		,Backbone
		,BaseModel) {
	return BaseModel.extend({
		idAttribute: '_id'
	});
});