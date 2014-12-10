define(	[
		'app/app'
		,'backbone.marionette'
		,'tmpl!templates/like-button.html'
	], function (
		app
		,Marionette
		,likeButtonTemplate) {
	return Marionette.ItemView.extend({
		template: likeButtonTemplate,
		
		tagName: 'button',
		
		className: 'btn btn-primary like',
		
		events: {
			'click': 'like'
		},
		
		modelEvents: {
			'change:user_has_liked': 'statusChanged'
		},
		
		statusChanged: function (model, liked) {
			this.$el.toggleClass('btn-primary', !liked);
			this.$el.toggleClass('btn-success', liked);
			this.$('.d').toggle(liked);
		},
		
		like: function () {
			var view = this;
			this.$el.prop('disabled', true);
			
			this.model.like(function () {
				view.$el.prop('disabled', false);
			});
		},
		
		onRender: function () {
			this.statusChanged(this.model, !!this.model.get('user_has_liked'));
		}
	});
});