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
		like: function (callback) {
			var self = this;
			$.ajax({
				type: this.get('user_has_liked') ? 'DELETE' : 'POST',
				url: this.url() + '/likes',
				complete: function(jqXHR, textStatus) {
					self.fetch();
					if (_.isFunction(callback)) callback();
				}
			});
		}
	});
});