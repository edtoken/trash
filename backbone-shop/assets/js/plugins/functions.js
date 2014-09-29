define(['jquery'], function($){

    var F = function(){

        this.getMouseXY = function(e) {
            
            var IE = document.all?true:false;
            if (!IE) document.captureEvents(Event.MOUSEMOVE);
            // document.onmousemove = getMouseXY;
            var tempX = 0
            var tempY = 0

            if (IE) { // grab the x-y pos.s if browser is IE
                tempX = event.clientX + document.body.scrollLeft
                tempY = event.clientY + document.body.scrollTop
            } else {  // grab the x-y pos.s if browser is NS
                tempX = e.pageX
                tempY = e.pageY
            }  

            // catch possible negative values in NS4
            if (tempX < 0){tempX = 0}
            if (tempY < 0){tempY = 0}  
                            
            return {
                x:tempX,
                y:tempY
            }
        }

        this.setCookie = function(name, value, options) {
            options = options || {};

            var expires = options.expires;

            if (typeof expires === "number" && expires) {
                var d = new Date();
                d.setTime(d.getTime() + expires*1000);
                expires = options.expires = d;
            }
            
            if (expires && expires.toUTCString) {
                options.expires = expires.toUTCString();
            }

            value = encodeURIComponent(value);

            var updatedCookie = name + "=" + value;

            for(var propName in options) {
                updatedCookie += "; " + propName;
                var propValue = options[propName];
                if (propValue !== true) {
                    updatedCookie += "=" + propValue;
                }
            }

            document.cookie = updatedCookie;
        };


        this.getCookie = function(name) {
            var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        };

        this.deleteCookie = function(name) {
            this.setCookie(name, "", { expires: -1 });
        };


        this.preloadImage = function(option, onload, error, file){

            var _URL = window.URL || window.webkitURL;
            var img = new Image();

            img.onload = function() {
                onload(this);
            };

            img.onerror = function() {
                error(this);
            };

            if(file){
                img.src = _URL.createObjectURL(option);
            }else{
                img.src = option;
            }

            return true;
        },

        this.validateEmail = function(email){
            var re_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re_email.test(email);
        };

        this.validateStr = function(str, length){
            var re_str = /^([a-zA-Z0-9_-]){2,50}$/;
            return re_str.test(str);
        };

        this.getFormData = function(json){

            var d =  new FormData();
            if(!d){
                alert('your browser not supported formdata');
                return false;
            }

            for(var n in json){
                d.append(n, json[n]);
            }

            return d;
        },

        this.serializeObject = function(form)
        {
            var o = {};
            var a = $(form).serializeArray();



            $.each($(form).find('[type="file"]'), function(i, inpt) {
                
                if(inpt.files.length === 1){
                    a.push({name:inpt.name, value:inpt.files[0]});
                }else{
                    a.push({name:inpt.name, value:inpt.files});
                }

            });

            
            $.each(a, function() {

                if (o[this.name]) {

                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    
                    o[this.name].push(this.value || '');

                } else {

                    o[this.name] = this.value || '';
                }
            });

            return o;
        }
    };

    return F;
});