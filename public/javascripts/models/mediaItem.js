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
				success: function(data, textStatus, jqXHR){
					console.log('har', textStatus, jqXHR);
				},
				error: function(jqXHR, textStatus, errorThrown){
					console.log('err', textStatus, errorThrown, jqXHR);
				},
				complete: function(jqXHR, textStatus) {
					self.fetch();
				}
			});
		}
	});
});