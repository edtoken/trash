define([
    'jquery',
    'underscore',
    'backbone',
    'collections/shop/shop'
    ], function(
        $,
        _,
        Backbone,
        ShopCollection
    ){

    var ShopModel = Backbone.Model.extend({

        defaults:{
            total:0
        },
        
        initialize:function(){

            this.app.models.shop = this;
            this.collection = new ShopCollection();

            this.collection.bind('add', this.calcitems, this);
            this.collection.bind('remove', this.calcitems, this);

        },

        calcitems:function(item){

            var price = 0;
            var prices = this.collection.pluck('price');
            prices.map(function(p){
                price += parseInt(p);
            });

            this.set({total:price});
        }

    });

    return ShopModel;
});