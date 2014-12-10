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
		},
		like: function () {
			var self = this;
			$.ajax({
				type: 'POST',
				url: this.url() + '/likes',
				complete: function(jqXHR, textStatus) {
					self.fetch();
				}
			});
		}
	});
});