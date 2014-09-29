define([
	'jquery',
	'underscore',
	'backbone',
	'models/products/products',
	'views/products/list',
	'text!templates/products/index.html'
	], function(
		$,
		_,
		Backbone,
		ProductsModel,
		ListView,
		productsTpl
	){

	var ProductsView = Backbone.View.extend({

		el:document.querySelector('.js_products'),
		
		initialize:function(){

			var that = this;
			this.model = new ProductsModel();
			this.model.view = this;

			this.children = {};
			this.children.products_list = new ListView({parent:this, model:this.model});
			
			this.render();

			$.getJSON( "products.json", function( data ) {
				that.model.collection.reset(data);
				that.model.trigger('change');
			});

		},

		render:function(){

			var that = this;
			this.$el.html(productsTpl);

			_.each(this.children, function(view, node_id){
				that.$el.append(view.$el);
				// that.$el.append(view.render().$el);
				// that.$el.find('js_' + node_id).html(view.render().$el);
			});

			return this;

		}

	});

	return ProductsView;
});