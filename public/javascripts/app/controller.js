define(	[
		'./app'
		,'config'
		,'models/feed'
		,'views/home'
		,'views/media-item-detail'
	], function (
		app
		,config
		,FeedCollection
		,HomeView
		,MediaItemDetailView) {
	
	var views = {};
	
	app.addInitializer(function () {
		var mediaItems = new FeedCollection();

		mediaItems.fetch();
		
		app.models.set({
			mediaItems: mediaItems
		});
	});

	var controller = {
		home: function () {
			views.homeView = views.homeView || new HomeView({
				collection: app.models.get('mediaItems')
			});
		
			app.mainRegion.show(views.homeView);
		},
		mediaItem: function (id) {
			var collection = app.models.get('items');
			var model = collection.get(id);
			
			// Just in case the collection hasn't been fetched yet, or this item isn't in the collection...
			if (!model) {
				model = collection.create({
					id: id
				});
			}
			
			app.mainRegion.show(new MediaItemDetailView({
				model: model,
				collection: collection
			}));
		}
	};

	return controller;
});