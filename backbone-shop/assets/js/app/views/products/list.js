define([
	'jquery',
	'underscore',
	'backbone',
	'views/products/item'
	], function(
		$,
		_,
		Backbone,
		ItemView
	){

	var ProductsList = Backbone.View.extend({

		tagName:'ul',
		className:'js_products_list',
		initialize:function(options){

			this.parent = options.parent;
			this.model.bind('change', this.render, this);
			this.model.collection.bind('add', this.render, this);
			this.model.collection.bind('remove', this.render, this);

		},

		render:function(){

			var that = this;
			this.el.innerHTML = '';

			var items = this.model.collection.slice(this.model.get('page'), this.model.get('limit'));
			_.each(items, function(model){
				that.$el.append(new ItemView({model:model}).render().$el);
			});

			return this;
		}

	});

	return ProductsList;
});