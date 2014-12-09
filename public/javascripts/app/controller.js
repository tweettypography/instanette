define(	[
		'./app'
		,'config'
		,'models/items'
		,'models/item'
		,'views/home'
		,'views/item-detail'
	], function (
		app
		,config
		,ItemCollection
		,ItemModel
		,HomeView
		,ItemDetailView) {
	
	var views = {};
	
	app.addInitializer(function () {
		var items = new ItemCollection();

		items.fetch();
		
		app.models.set({
			items: items
		});
	});

	var controller = {
		home: function () {
			views.homeView = views.homeView || new HomeView({
				collection: app.models.get('items')
			});
		
			app.mainRegion.show(views.homeView);
		},
		item: function (itemId) {
			var collection = app.models.get('items');
			var model = collection.get(itemId);
			
			// Just in case the collection hasn't been fetched yet...
			if (!model) {
				model = collection.create({
					_id: itemId
				});
			}
			
			app.mainRegion.show(new ItemDetailView({
				model: model,
				collection: collection
			}));
		}
	};

	return controller;
});