define(	[
		'app/app'
		,'backbone.marionette'
		,'views/like-button'
	], function (
		app
		,Marionette
		,LikeButtonView) {
	return Marionette.Layout.extend({
		regions: {
			actions: '.actions'
		},

		onRender: function () {
			this.actions.show(new LikeButtonView({
				model: this.model
			}));
		}
	});
});