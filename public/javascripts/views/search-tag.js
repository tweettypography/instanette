define( [
		'app/app'
		,'backbone.marionette'
		,'backbone'
		,'tmpl!templates/search.html'
	], function (
		app
		,Marionette
		,Backbone
		,searchTemplate) {
	return Marionette.ItemView.extend({
		template: searchTemplate,

		className: 'repeater-search',

		initialize: function () {
			this.model = new Backbone.Model({
				placeholder: 'Search Tags'
			});
		},

		events: {
			'click .btn': 'search',
			'keyup input': 'search'
		},

		search: function () {
			var $searchInput = this.$('input');
			var searchText = $searchInput.val().replace(/\W+/g, "");

			this.trigger('search', searchText);
		}
	});
});