define(function(){
    
    var Config = {

        paths:{
            plugins:'./plugins',
            appdir:'./app',
            models:'./app/models',
            views:'./app/views',
            collections:'./app/collections',
            jquery:'./lib/jquery-1.11.1.min',
            // functions:'./plugins/functions',
            underscore:'./lib/underscore-min',
            backbone:'./lib/backbone-min',
            templates:'../templates',
            functions:'./plugins/functions',
            text:'./lib/text'
        },

        shim:{

            plugins:{
                deps:['jquery']
            },

            underscore:{
                exports:'_'
            },

            backbone:{
                deps:['jquery', 'underscore'],
                exports:'Backbone'
            },

            functions :{
                deps:['jquery']
            }


        },

        waitSeconds:200

    };

    return Config;
});