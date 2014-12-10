define(	[
		'./app'
		,'config'
		,'backbone'
		,'models/feed'
		,'models/mediaItem'
		,'views/navigation'
		,'views/home'
		,'views/media-item-detail'
	], function (
		app
		,config
		,Backbone
		,FeedCollection
		,MediaItemModel
		,NavigationView
		,HomeView
		,MediaItemDetailView) {
	
	app.addInitializer(function () {
		var mediaItems = new FeedCollection();

		mediaItems.fetch();
		
		app.models.set({
			mediaItems: mediaItems
		});
		
		var navigationView = new NavigationView();
		app.navigationRegion.show(navigationView);
	});

	var controller = {
		home: function () {
			app.mainRegion.show(new HomeView({
				collection: app.models.get('mediaItems')
			}));
		},
		mediaItem: function (id) {
			var collection = app.models.get('mediaItems');
			var model = collection.get(id);
			
			// Just in case the collection hasn't been fetched yet, or this item isn't in the collection...
			if (!model) {
				model = new MediaItemModel({
					id: id
				});
				
				model.fetch();
			}
			
			app.mainRegion.show(new MediaItemDetailView({
				model: model
			}));
		}
	};

	return controller;
});