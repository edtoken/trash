define([
    'jquery',
    'underscore',
    'backbone'
    ], function(
        $,
        _,
        Backbone
    ){

    var ProductsCollection = Backbone.Collection.extend({

        initialize:function(){
            
            this.app.collections.products = this;

        }

    });

    return ProductsCollection;
});