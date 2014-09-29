define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/products/item.html'
	], function(
		$,
		_,
		Backbone,
		defaultTpl
	){

	var ProductView = Backbone.View.extend({

		tagName:'li',
		className:'productItem',
		
		events:{
			'mousedown':'dragItemStart',
			'mousemove':'moveItem',
			'mouseup':'moveItemStop',
		},

		initialize:function(){

			this.options = {};
			this.model.bind('remove', this.remove, this);
		},

		moveItem:function(e){

			if(this.options.dragtable !== true){
				return false;
			}

			var pos = this.app.functions.getMouseXY(e);
			this.$el.css({
				left:(pos.x-20)+'px',
				top:(pos.y-20)+'px'
			});
		},

		moveItemStop:function(e){

			this.options.dragtable = false;
			var pos = this.app.functions.getMouseXY(e);
			
			if(this.app.views.shop.zoneShopPosition(pos)){

				this.model.collection.remove(this.model);
				this.app.collections.shop.add(this.model);

			}else{
				
				this.$el.css({
					left:'',
					top:''
				});

				this.$el.removeClass('move');

			}
			
		},

		dragItemStart:function(e){

			this.options.dragtable = true;
			var pos = this.app.functions.getMouseXY(e);

			this.$el.css({
				left:(pos.x-20)+'px',
				top:(pos.y-20)+'px'
			}).addClass('move');
		},

		render:function(){
			this.$el.html(_.template(defaultTpl, this.model.toJSON()));
			return this;
		}

	});

	return ProductView;
});