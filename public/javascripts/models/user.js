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
		_url: function () {
			return '/users/' + this.id;
		}
	});
});