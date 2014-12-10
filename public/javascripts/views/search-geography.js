define( [
		'app/app'
		,'backbone.marionette'
		,'backbone'
		,'views/search-result'
		,'tmpl!templates/search.html'
	], function (
		app
		,Marionette
		,Backbone
		,SearchResultView
		,searchTemplate) {
	return Marionette.CompositeView.extend({
		template: searchTemplate,
		
		className: 'repeater-search',
		
		itemView: SearchResultView,
		
		itemViewContainer: 'ul',
		
		initialize: function () {
			this.model = new Backbone.Model({
				placeholder: 'Search Locations'
			});
			
			this.collection = new Backbone.Collection();
		},
		
		events: {
			'click .btn': 'search'
		},
		
		search: function () {
			// Get the coordinates from Google
			
			var coordinates = {
				lat: 39.848784,
				lng: -86.141638
			};
			
			this.trigger('search', coordinates);
		}
	});
});