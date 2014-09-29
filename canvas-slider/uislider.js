$.fn.sliderUI = function(optionsInit){    

    var App = this;

    var support = "getContext" in document.createElement("canvas");
    if(!support){
        return false;
    }

    var defaultOptions = {
        img_src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAbCAYAAACTHcTmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3OTk3MjJlYi0yMDlhLTRkYTMtOWJjMi0wYmFiMjRkMTQ0N2MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjJGN0ZDQjQyOURFMTFFNDg5Q0Q4N0Q5RTFDM0Q3NEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjJGN0ZDQjMyOURFMTFFNDg5Q0Q4N0Q5RTFDM0Q3NEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDJmOWI0OTItMDA1ZC00MTcyLThjMzAtYjdmMjYzZjE4MjYwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc5OTcyMmViLTIwOWEtNGRhMy05YmMyLTBiYWIyNGQxNDQ3YyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgzkhZ4AAAFmSURBVHjaYlRSUmIAAlUg7gBiFyDmYyAdfALiPUBcAcS3GYGGqgMZJ4BYgIFy8AGILZgFBQVnARmGDNQBHEAsBXLpRzK9jAt8YaKygSDAw4RN1MrKimH//v0oYo6Ojih8kLyFhQVWUzEMZWdnZ8jLyyPKSdnZ2QysrKyEDY2Pj2cQFxcnylAZGRmG0NBQ/IYqKChgVYQPxMTEMIiIiOA2tKCggIGFhYUkQzk5ORkyMjJwG/rmzRuyoltUVBS3oTNmzGD4/v07SQb++fOHYcKECfhdumTJEpIMXbNmDcP9+/fxx/7q1asZnjx5QpSBr169Yli4cCHhJPX792+GqVOnEmXoxIkTGX78+IEhDsr7/6mcTcEu/URlM8EFyh4qG7oL5H0NIOM4FQtpS5BLb4BKayBeB8SfyTTsM1Q/yJwbjNA6ihBAjkxGQooZ///HH/nKyspYDb179y7e2GegRZIaNZS6ACDAAN8TWV7XViNTAAAAAElFTkSuQmCC',
        value:0,
        debug:true,
        steps:1,
        start:0,
        end:10,
        width:100,
        height:40,
        sector_height:10,
        value_process:0,
        default_color:'#d1d1d1',
        colors:['#ffffff']
    };


    this.getCompileAppData = function(obj){
        
        var Img = new Image();
        Img.src = obj.options.img_src;
        obj.options.slider_img = Img;

        if(obj.options.value < obj.options.start){
            obj.options.value = obj.options.start;
        }

        if(obj.options && typeof obj.options.width == 'undefined'){
            obj.options.width = obj.el.offsetWidth;
        }

        if(obj.options && typeof obj.options.height == 'undefined'){
            obj.options.height = obj.el.offsetHeight;
        }

        return obj;
    };

    this.getSectorsData = function(obj){

        var out = [];

        var itemValue = ( obj.options.end - obj.options.start ) / obj.options.steps;
        var itemWidth = obj.options.width / obj.options.steps;

        var color;

        for(var i=0; i< obj.options.steps; i++){


            if(typeof obj.options.colors[i] !== 'undefined'){
                color = obj.options.colors[i];
            }

            out.push({
                value:itemValue * i,
                color:color,
                width:itemWidth
            });

        }

        return out;

    };

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    this.appendNode = function(obj){
        obj.el.parentNode.insertBefore(obj.node, obj.el);
    };

    this.renderSectors = function(obj){

        for(var i=0; i<obj.sectors.length; i++ ){

            var color = obj.options.default_color;
            if(obj.options.value_process > obj.sectors[i].value){
                color = obj.sectors[i].color;
            }

            obj.ctx.fillStyle = color;
            var start = obj.sectors[i].width * i;
            // var top = obj.options.height - ( (obj.options.height - obj.options.sector_height) / 2);
            var top = 3;

            obj.ctx.fillRect(start, top, obj.sectors[i].width, obj.options.sector_height);

        }

    };

    this.renderButton = function(obj){

        var img_pos = obj.options.value - (obj.options.slider_img.width/2);
        obj.ctx.drawImage(obj.options.slider_img, img_pos, 0);

    };


    this.createEvents = function(obj){

        obj.node.addEventListener('mouseout', function(evt){
            obj.options.move = false;
        });

        obj.node.addEventListener('mousedown', function(evt){
            obj.options.move = true;
        });

        obj.node.addEventListener('mouseup', function(evt){
            obj.options.move = false;
        });

        obj.node.addEventListener('mousemove', function(evt){

            if(obj.options.move !== true){
                return ;
            }

            var mousePos = getMousePos(obj.node, evt);
            obj.options.value = mousePos.x;
            obj.options.value_process = ((obj.options.end - obj.options.start ) / 100)  * obj.options.value;

            App.render(obj);

        });

    };

    this.render = function(obj){

        obj.ctx.beginPath();
        obj.ctx.clearRect(0,0,obj.ctx.canvas.width, obj.ctx.canvas.height);

        App.renderSectors(obj);
        App.renderButton(obj);

        obj.el.value = obj.options.value_process;

    };

    return this.each(function(a, b){

        var PL = {};
        var tmpPL = {};
        var tmpOptions = $.extend(defaultOptions, optionsInit);
        
        tmpPL.el = b;
        tmpPL.options = tmpOptions;
        tmpPL.node = document.createElement('canvas');

        PL = App.getCompileAppData(tmpPL);
        PL.id = a;
        PL.ctx = PL.node.getContext("2d");

        PL.ctx.canvas.width = PL.options.width;
        PL.ctx.canvas.height = PL.options.height;

        PL.sectors = App.getSectorsData(PL);

        App.appendNode(PL);
        App.createEvents(PL);

        PL.options.slider_img.onload = function(){
            App.render(PL);
        };        

    });

};

$(document).ready(function(){

    $('.ui-slider').sliderUI({
        debug:true, 
        start:20,
        end:500, 
        steps:5,
        value_process:20,
        colors:['#165799', '#4fd300', '#ffea00', '#ff9c00', '#ff5400']
    });

});