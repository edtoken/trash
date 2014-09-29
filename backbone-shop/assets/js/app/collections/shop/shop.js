define([
    'jquery',
    'underscore',
    'backbone'
    ], function(
        $,
        _,
        Backbone
    ){

    var ShopCollection = Backbone.Collection.extend({

        initialize:function(){
            
            this.app.collections.shop = this;

        }

    });

    return ShopCollection;
});