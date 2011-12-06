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
          result["-o-" + propertyName] = properties[propertyName];
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
      }).wrap("<div class='zoomContainer'/>").parent().css({
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
  
  function calculateScale($target) {
      if ($target.length == 0)
          return 1;
      
      var scale = $target.data("scale");
      if (scale)
          return scale * calculateScale($target.parent());
      else
          return calculateScale($target.parent())
  }
  
  $.zoomTo = function (target) {
    var $target = $(target);    
    var offset = $target.data("offset");   
    var scale = calculateScale($target);
  
    var $body = $("body");

    if ($currentTarget)
        $currentTarget.removeClass("zoomed");
    
    if ($.browser.webkit || $.browser.opera || $.browser.mozilla) {
      $body.css({
          "transform-origin": offset.left + "px "+offset.top + "px",
          "transform": "translate("+(-offset.left)+"px,"+(-offset.top)+"px) scale("+scale+")"
      });
      
      $target.addClass("zoomed");
    }

    $currentTarget = $target;
  };


  jQuery.zoomOut = function() {
    if ($currentTarget == null)
      return;

    $currentTarget.removeClass("zoomed");

    var offset = $currentTarget.data("offset");
    var scale = $currentTarget.data("scale");

    //$(".dynamicCSS").remove();

    var $body = $("body");

    if ($.browser.webkit || $.browser.opera || $.browser.mozilla) {
       $body.css({
          "transform-origin": offset.left + "px "+offset.top + "px",
          "transform": "translate(0px,0px) scale(1)"
       });
    }

    $currentTarget = null;
  }
})(jQuery);
