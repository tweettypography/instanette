define(	[
		'app/app'
		,'backbone'
		,'config'
	], function (
		app
		,Backbone
		,config) {
	return Backbone.Collection.extend({
		fetch: function (options) {
			if (this.ensurePagination()) {
				if (!options) {
					options = {};
				}
				
				if (!options.data) {
					options.data = {};
				}
				
				options.data.count = this.pagination.get('count');
				options.data.max_id = this.pagination.get('page');
			}
			
			return Backbone.Collection.prototype.fetch.call(this, options);
		},
		
		parse: function (response, options) {
			if (this.ensurePagination()) {
				if (response.pagination) {
					this.pagination.set('next', response.pagination.next_max_id);
				}
			}
			
			return response.data || response;
		},
		
		nextPage: function (options) {
			if (this.ensurePagination()) {
				this.pagination.set('page', this.pagination.get('next'));
				return this.fetch(options);
			}
		},
		
		resetPages: function (options) {
			if (this.ensurePagination()) {
				this.pagination.unset('page');
				return this.fetch(options);
			}
		},
		
		ensurePagination: function () {
			if (!this.paged) {
				return false;
			}
			
			if (!this.pagination) {
				this.pagination = new Backbone.Model({
					count: 15
				});
				
				this.listenTo(this.pagination, 'change:count', function () {
					this.fetch();
				});
			}
			
			return true;
		}
	});
});