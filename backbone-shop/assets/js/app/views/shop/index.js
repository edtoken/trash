define([
	'jquery',
	'underscore',
	'backbone',
	'models/shop/shop',
	'views/shop/list',
	'text!templates/shop/index.html'
	], function(
		$,
		_,
		Backbone,
		ShopModel,
		ListView,
		indexTpl
	){

	var ShopView = Backbone.View.extend({

		el:document.querySelector('.js_shop'),
		
		initialize:function(){

			this.model = new ShopModel();
			this.model.view = this;

			this.children = {};
			this.children.products_list = new ListView({parent:this, model:this.model});

			this.model.bind('change', this.render, this);
			this.model.trigger('change');
		},

		zoneShopPosition:function(pos){

			var pshop = {
				left:this.el.offsetLeft,
				right:this.el.offsetLeft + this.el.offsetWidth,
				top:this.el.offsetTop,
				bottom:this.el.offsetHeight + this.el.offsetTop
			};

			if(pos.y > pshop.top && pos.y < pshop.bottom && pos.x > pshop.left && pos.x < pshop.right){
				return true;
			}

			console.log('zoneShopPosition', pshop, pos);
			return false;
		},

		render:function(){

			var that = this;
			var data = this.model.toJSON();
			this.$el.html(_.template(indexTpl, data));

			_.each(this.children, function(view, node_id){
				// that.$el.append(view.$el);
				that.$el.append(view.render().$el);
				// that.$el.find('js_' + node_id).html(view.render().$el);
			});


		}

	});

	return ShopView;
});