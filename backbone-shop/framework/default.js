(function(){var loaded = false;var el = document.createElement( "script" );el.src = "//require.js";el.onload = el.onreadystatechange = function(){if(!loaded && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")){loaded = true;require(["//config.js"], function(){require(["bootstrap"], function(){});});el.onload = el.onreadystatechange = null;document.body.removeChild(el);}};document.body.appendChild(el);})()