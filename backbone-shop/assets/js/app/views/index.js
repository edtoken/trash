define([
	'jquery',
	'underscore',
	'backbone',
	'views/shop/index',
	'views/products/index'
	], function(
		$,
		_,
		Backbone,
		ShopView,
		ProductsView
	){

	var AppView = Backbone.View.extend({

		initialize:function(){

			this.app.views.shop = new ShopView();
			this.app.views.products = new ProductsView();

		}

	});

	return AppView;
});