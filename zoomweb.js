// on page load complete, fire off a jQuery json-p query
// against Google web search
(function($) {
  var CSS3properties = {
    "transform" : true,
    "transform-origin": true,
    "animation-name": true,
    "animation-duration": true,
    "animation-iteration-count": true
  };
  
  function css3(properties) {
    var result = {};
    
    for (propertyName in properties) {
      if (properties.hasOwnProperty(propertyName)) {
        if (CSS3properties[propertyName]) {
          result["-webkit-" + propertyName] = properties[propertyName];
          result["-moz-" + propertyName] = properties[propertyName];
        } else {
          result[propertyName] = properties[propertyName];
        }
      }
    }
    
    return result;
  }

  // Modifies jQuery's css method so that it expands CSS3
  // properties to their browser specific equivalents.
  (function(){
    var oldCSS = $.fn.css;
    $.fn.css = function(arg1, arg2) {
      if (typeof(arg1) == "string") {
        if (typeof(arg2) == 'undefined') {
          return oldCSS.apply(this, [arg1, arg2]);
        } else {
          var newArg1 = {}
          newArg1[arg1] = arg2;
          arg1 = newArg1;
          arg2 = null;
        }
      }

      arg1 = css3(arg1);

      return oldCSS.apply(this, [arg1, arg2]);
    }
  })();

  $.fn.scale = function(s) {
    for (var i=0; i<this.length; i++) {
      var $e = $(this[i]);
      var width = $e.width();
      var height = $e.height()

      $e.css({
        "width": width,
        "height": height,        
        "transform": "scale("+(1/s)+")",
        "transform-origin": "0 0"
      }).wrap("<div class='shrunkContainer'/>").parent().css({
        width: (width*(1/s)),
        height:(height*(1/s)),
        overflow: "hidden"
      });

      $e.data("scale", s);
      $e.data("offset", $e.offset());
    }

    return this;
  };

  var $currentTarget = null;
  
  var parts = [];
  function collectCSS(key, value) {
    if (typeof(key) == "string") {
      if (typeof(value) == "object") {
        parts.push(key);
        parts.push("{");
        collectCSS(value);
        parts.push("}");
      } else {
        parts.push(key);
        parts.push(":");
        parts.push(value);
        parts.push(";");
      }
    } else {
      for (propertyName in key) {
        collectCSS(propertyName, key[propertyName]);
      }
    }
  }

  function buildCSS(key, value) {
    parts=[];
    collectCSS(key, value);     
    return parts.join("");
  }
  
  function buildStylesheet(key, value) {
    return "<style type='text/css' class='dynamicCSS'>"+buildCSS(key, value)+"</style>";
  }
  
  $.fn.appendStylesheet = function(rules, media) {
    var html =  "<style type='text/css' class='dynamicCSS' media='" + (media || 'all') +"'>"+buildCSS(rules)+"</style>";
    for (var i=0; i<this.length; i++) {
      $(this[i]).append(html); 
    }
  }
  
  $.zoomTo = function (target) {
    var $target = $(target);    
    var offset = $target.data("offset");   
    var scale = $target.data("scale");
  
    var $body = $("body");

    $(".dynamicCSS").remove();

    if ($.browser.webkit) {
      $body.appendStylesheet({
        ".grow": {
          "-webkit-transform-origin": offset.left+"px "+offset.top+"px",
          "-webkit-animation-name": "grow-anim",
          "width": "100%"
        },
        "@-webkit-keyframes grow-anim": {
          "0%": {"-webkit-transform": "translate(0, 0); scale(1)"},
          "100%": {
            "-webkit-transform": "translate("+(-offset.left)+"px, "+(-offset.top)+"px) scale("+scale+")"
          }
        },
        ".zoomed": {
          "-webkit-transform-origin": offset.left + "px "+offset.top + "px",
          "-webkit-transform": "translate("+(-offset.left)+"px,"+(-offset.top)+"px) scale("+scale+")"
        }
      });        
      
      $body.addClass("grow").removeClass("grown").removeClass("shrink");
      setTimeout(function() {
        $body.removeClass("grow").addClass("zoomed");
        $target.addClass("grown");
      }, 1000);
    } else if ($.browser.mozilla) {
      $body.appendStylesheet({
        ".zoomed": {
          "-moz-transform-origin": offset.left + "px "+offset.top + "px",
          "-moz-transform": "translate("+(-offset.left)+"px,"+(-offset.top)+"px) scale("+scale+")"        
        }
      });

      function emitAnimationStep(ratio) {
        $body.appendStylesheet({
            ".grow": {
            "-moz-transform-origin": offset.left+"px "+offset.top+"px",
            "-moz-transform": "translate("+(-offset.left*ratio)+"px,"+(-offset.top*ratio)+"px) scale("+(1+((scale-1) * ratio))+")"
          }
        });
      }
      emitAnimationStep(0);
      
      var startTime = new Date().getTime();
      var zoomIntervalId = setInterval(function() {
        var ratio = (new Date().getTime()-startTime)/1000;
        emitAnimationStep(ratio);
      }, 25);

      $body.addClass("grow").removeClass("grown").removeClass("shrink");
      setTimeout(function() {
        $body.removeClass("grow").addClass("zoomed");
        $target.addClass("grown");
        clearInterval(zoomIntervalId);
      }, 1000);
    }

    $currentTarget = $target;
  };


  jQuery.zoomOut = function() {
    if ($currentTarget == null)
      return;

    $currentTarget.removeClass("grown");
    var offset = $currentTarget.data("offset");
    var scale = $currentTarget.data("scale");

    $(".dynamicCSS").remove();

    if ($.browser.webkit) {
      $("body").appendStylesheet({        
        ".shrink": {
          "-webkit-transform-origin": offset.left+"px "+offset.top+"px; ",
          "-webkit-animation-name": "shrink-anim;"
        },
        "@-webkit-keyframes shrink-anim": {
          "0%": {
            "-webkit-transform": "translate("+(-offset.left)+"px, "+(-offset.top)+"px) scale("+scale+")"
          },
          "100%": { 
            "-webkit-transform": "scale(1) translate(0, 0)"
          }
        }
      });

      $("body").removeClass("grow").removeClass("zoomed").addClass("shrink");
      setTimeout(function() {
        $("body").removeClass("shrink");
      }, 1000);
    } else if ($.browser.mozilla) {
       $(".dynamicCSS").remove();

      function emitAnimationStep(ratio) {
        $("body").appendStylesheet({
          ".shrink": {
            "-moz-transform-origin": offset.left+"px "+offset.top+"px",
            "-moz-transform": "translate("+(-offset.left*ratio)+"px,"+(-offset.top*ratio)+"px) scale("+(1+(scale-1) * ratio)+")"
          }
        });
      }

      emitAnimationStep(1);
      
      var startTime = new Date().getTime();
      var zoomIntervalId = setInterval(function() {
        var ratio = 1-((new Date().getTime()-startTime)/1000);
        emitAnimationStep(ratio)
      }, 50);

      $("body").removeClass("grow").removeClass("grown").addClass("shrink");
      
      setTimeout(function() {
        $("body").removeClass("shrink");
        clearInterval(zoomIntervalId);
      }, 1000);
    }

    $currentTarget = null;
  }

  $(function() {
    $("body").css({
      "animation-duration" : "1s",
      "animation-iteration-count": 1
    });
  })
})(jQuery);
