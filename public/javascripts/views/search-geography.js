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
	var geocoder = new window.google.maps.Geocoder();
			
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
		
		findPlaces: function () {
			// When the value in the input changes search the google places api
		},
		
		search: function () {
			var view = this;
			var coordinates = {
				lat: 39.848784,
				lng: -86.141638
			};
			var $searchInput = this.$('input');
			var searchText = $searchInput.val();
			
			// Get the coordinates from Google
			geocoder.geocode({
				address: searchText
			}, function(result, status) {
				if (_.isArray(result)) {
					var first = result[0];
					coordinates.lat = first.geometry.location.lat();
					coordinates.lng = first.geometry.location.lng();
				}
				
				view.trigger('search', coordinates);
			});
		}
	});
});