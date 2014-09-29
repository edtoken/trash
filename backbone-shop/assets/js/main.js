require([
	'config'
	], function(Cfg){

	require.config(Cfg);

	require([
		'jquery',
		'underscore',
		'backbone',
		'functions',
		'app'
		], function(
			$,
			_,
			Backbone,
			Functions,
			App
		){

		var appOptions = {
			debug:true
		};

		/**
		 * remove view childrens
		 */
		var removeFunc = Backbone.View.prototype.remove;
		Backbone.View.prototype.remove = function(){

			if(this.children){
				_.each(this.children, function(item){
					item.remove();
				});
			}

			return removeFunc.call(this, arguments);
		};

		Functions.prototype.app = App;
		Backbone.Model.prototype.app = App;
		Backbone.View.prototype.app = App;
		Backbone.Collection.prototype.app = App;
		
		App.functions = new Functions();

		$(document).ready(function(){
				App.initialize(appOptions);
		});

	});

});