define([
	'jquery',
	'underscore',
	'backbone',
	'views/shop/item'
	], function(
		$,
		_,
		Backbone,
		ItemView
	){

	var ShopList = Backbone.View.extend({

		tagName:'ul',
		className:'js_shop_list',
		initialize:function(options){

			this.parent = options.parent;

		},

		render:function(){

			var that = this;
			this.el.innerHTML = '';

			_.each(this.parent.model.collection.models, function(model){
				that.$el.append(new ItemView({model:model}).render().$el);
			});

			return this;
		}

	});

	return ShopList;
});