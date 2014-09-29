define([
	'jquery',
	'underscore',
	'backbone',
	'views/index',
	'models/index'
	],function(
		$,
		_,
		Backbone,
		IndexView,
		IndexModel
	){

	var App = {

		attributes:{},
		router:false,
		timers:{},
		models:{},
		collections:{},
		views:{},

		log:function(data){

			if(typeof data.type === 'undefined'){
				data.type = 1;
			}

			switch(data.method){

				default:

					console.log('DEBUG ONLY ', data);
					break;
			}

		},

		success:function(resp, callback, method){
			
			if(callback){
				callback(resp);
			}
			this.log({msg:' success load ' + method + ' ', method:method});

		},

		error:function(resp, callback, method){

			if(callback){
				callback(resp);
			}
			this.log({msg:' error load ' + method + ' ', method:method});

		},

		initialize:function(attrs){

			App.attributes = _.extend({
				debug:true
			}, attrs);

			App.models.index = new IndexModel();
			App.views.index = new IndexView();

		}

	};

	return App;

});
