define(	[
		'app/app'
		,'backbone.marionette'
		,'tmpl!templates/comment.html'
	], function (
		app
		,Marionette
		,commentTemplate) {
	return Marionette.ItemView.extend({
		template: commentTemplate
	});
});