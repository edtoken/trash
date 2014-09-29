define([
    'jquery',
    'underscore',
    'backbone',
    'collections/products/products'
    ], function(
        $,
        _,
        Backbone,
        ProductsCollection
    ){

    var ProductsModel = Backbone.Model.extend({
           
        defaults:{
            page:0,
            limit:4
        },

        initialize:function(){

            this.app.models.products = this;
            this.collection = new ProductsCollection();

        }

    });

    return ProductsModel;
});