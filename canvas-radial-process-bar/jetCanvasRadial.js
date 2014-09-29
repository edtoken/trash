(function($){

    $.fn.jetCanvasRadial = function(options){
        
        if("getContext" in document.createElement("canvas") === false){
            return false;
        }

        var App = this;

        App.defaultOptions = {
            debug:false,
            linewidth:6,
            background:'#ddd',
            backgroundinned:'#eee',
            linecolor:'#333333',
            color:'#999999'
        };

        function degToRad(deg) {
            return deg * Math.PI / 180;
        }


        /**
         * make canvas element
         */
        this.makeNode = function(){

            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            ctx.canvas.width = this.attributes.width;
            ctx.canvas.height = this.attributes.height;

            this.canvas = canvas;
            this.$canvas = $(canvas);
            this.ctx = ctx;

            return this;

        };

        /**
         * append canvas element
         */
        this.appendNode = function(){
            this.$canvas.insertAfter(this.el);
            return this;
        };

        /**
         * hidden el
         */
        this.hiddenNode = function(){
            var style = (this.el.getAttribute('style')) ? this.el.getAttribute('style') + 'display:none;' : 'display:none';
            this.el.setAttribute('style', style);
            return this;
        };

        /**
         * make options
         * returned app obj
         */
        this.getCompileOptions = function(options){

            if(typeof options === 'undefined'){
                options = {};
            }

            if(typeof options.width === 'undefined'){
                options.width = this.offsetWidth;
            }

            if(typeof options.height === 'undefined'){
                options.height = this.offsetHeight;
            }

            options.fulltext = this.innerHTML.split(' ').join('');
            
            if(parseInt(options.fulltext)){
                options.percentEnd = parseInt(options.fulltext);
            }else if(options.fulltex.indexOf('%') >= 0){
                options.percentEnd = parseInt(options.fulltext.split('$')[0]);
            }else{
                options.percentEnd = 0;
            }

            options.percentProcess = 0;


            return $.extend(App.defaultOptions, options);
        };


        /**
         * rendering
         */
        this.render = function(){
    
            var that = this;
            this.ctx.beginPath();
            this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);

            var sizeData = {
                w:this.attributes.width,
                h:this.attributes.height
            };

            if(sizeData.w > sizeData.h){
                sizeData.w = sizeData.h;
            }

            // background out
            this.ctx.fillStyle = this.attributes.background;
            this.ctx.beginPath();
            this.ctx.arc(
                sizeData.h /2,
                sizeData.w /2,
                sizeData.w /2, 0, 2 * Math.PI, false
            );
            this.ctx.closePath();
            this.ctx.fill();
            // #
            

            // line
            this.ctx.fillStyle = 'transparent';
            this.ctx.beginPath();
            this.ctx.arc(
                sizeData.w /2,
                sizeData.h /2,
                sizeData.w /2 - this.attributes.linewidth +3,
                -(Math.PI / 2),
                ((Math.PI * 2) * this.attributes.percentProcess/100) - Math.PI / 2,
                false
            );
            this.ctx.lineWidth = this.attributes.linewidth;
            this.ctx.strokeStyle = this.attributes.linecolor;
            this.ctx.stroke();

            this.ctx.closePath();
            this.ctx.fill();
            // #

            // background in
            this.ctx.fillStyle = this.attributes.backgroundinned;
            this.ctx.beginPath();

            this.ctx.arc(
                sizeData.h /2,
                sizeData.w /2,
                sizeData.w /2 - this.attributes.linewidth, 0, 2 * Math.PI, false
            );
            this.ctx.closePath();
            this.ctx.fill();
            // #

            // animate
            if(this.attributes.percentProcess <= this.attributes.percentEnd){
                this.attributes.percentProcess++;

                requestAnimationFrame(function(){
                    App.render.apply(that);
                });
            }

        };

        /**
         * slider initialize
         * returner app obj
         */
        this.init = function(options, callback){

            var OBJ = {};
            OBJ.attributes = App.getCompileOptions.call(this, options);
            OBJ.el = this;
            OBJ.$el = $(this);

            window.requestAnimationFrame = window.requestAnimationFrame ||
                                        window.mozRequestAnimationFrame ||
                                        window.webkitRequestAnimationFrame ||
                                        window.msRequestAnimationFrame;

            callback.apply(OBJ);
            return OBJ;

        };

        return this.each(function(num){

            var SliderRadial = App.init.call(this,options, function(){

                App.makeNode.apply(this);
                App.appendNode.apply(this);
                App.hiddenNode.apply(this);
                App.render.apply(this);

            });

        });
    };


    $(document).ready(function(){
        $('.jtc_radial').jetCanvasRadial();
    });

})(jQuery);