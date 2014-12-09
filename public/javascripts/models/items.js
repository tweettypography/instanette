define(	[
		'backbone'
		,'./base-collection'
		,'./item'
		,'config'
	], function (
		Backbone
		,BaseCollection
		,Item
		,config) {
	return BaseCollection.extend({
		model: Item,
		
		// We're going to dynamically build URLs based on the base defined in the config file
		url: config.rest + 'items'
	});
});