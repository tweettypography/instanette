define(	[
		'app/app'
		,'backbone.marionette'
		,'tmpl!templates/repeater-toggle.html'
	], function (
		app
		,Marionette
		,repeaterToggleTemplate) {
	return Marionette.ItemView.extend({
		template: repeaterToggleTemplate,
		
		events: {
			'click input': 'toggle'
		},
		
		modelEvents: {
			'change:current': 'setActiveClass'
		},
		
		toggle: function (e) {
			var $input = this.$(e.currentTarget);
			
			this.model.set('current', $input.val());
		},
		
		setActiveClass: function (model, value, options) {
			var $labels = this.$('label');
			var $label = this.$('input[value=\'' + value + '\']').parent('label');
			
			$labels.toggleClass('active', false);
			$label.toggleClass('active', true);
		},
		
		onRender: function () {
			this.setActiveClass(this.model, this.model.get('current'));
		}
	});
});