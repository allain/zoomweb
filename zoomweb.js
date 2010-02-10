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

  jQuery.fn.scale = function(s) {
    for (var i=0; i<this.length; i++) {
      var $e = $(this[i]);
      var size = {
        width: $e.width(),
        height: $e.height()
      };

      $e.css({
        "width": size.width,
        "height": size.height,        
        "transform": "scale("+(1/s)+")",
        "transform-origin": "0 0"
      }).wrap("<div class='shrunkContainer'/>").parent().css({
        width: (size.width*(1/s)),
        height:(size.height*(1/s)),
        overflow: "hidden"
      });

      $e.data("scale", s);
      $e.data("offset", $e.offset());
    }

    return this;
  };

  var $currentTarget = null;
  
  jQuery.zoomTo = function (target) {
    var $target = $(target);    
    var offset = $target.data("offset");   
    var scale = $target.data("scale");
  
    var $body = $("body");

    $(".dynamicCSS").remove();

    if ($.browser.webkit) {
      $body.append("<style type='text/css' class='dynamicCSS'>"+
        ".grow {"+
        emitProperties(css3({
          "transform-origin": offset.left+"px "+offset.top+"px",
          "animation-name": "grow-anim",
          "width": "100%"
        }))+
        "}\n"+
        "@-webkit-keyframes grow-anim {\n"+
        "0% { -webkit-transform: translate(0, 0); scale(1)}\n "+
        "100% { -webkit-transform: translate("+(-offset.left)+"px, "+(-offset.top)+"px) scale("+scale+");  }\n"+
        "}\n "+
        ".zoomed {\n" +
        emitProperties(css3({
          "transform-origin": offset.left + "px "+offset.top + "px",
          "transform": "translate("+(-offset.left)+"px,"+(-offset.top)+"px) scale("+scale+")"
        }))+ "}\n</style>");

      $body.addClass("grow").removeClass("grown").removeClass("shrink");
      setTimeout(function() {
        $body.removeClass("grow").addClass("zoomed");
        $target.addClass("grown");
      }, 1000);
    } else if ($.browser.mozilla) {
      $body.append("<style type='text/css' class='dynamicCSS'>"+
        ".zoomed {\n" +
        emitProperties(css3({
          "transform-origin": offset.left + "px "+offset.top + "px",
          "transform": "translate("+(-offset.left)+"px,"+(-offset.top)+"px) scale("+scale+")"
        }))+
        "}\n</style>");

      function emitAnimationStep(ratio) {
        $body.append("<style type='text/css' class='dynamicCSS'>"+
          ".grow {"+
            emitProperties(css3({
              "transform-origin": offset.left+"px "+offset.top+"px",
              "transform": "translate("+(-offset.left*ratio)+"px,"+(-offset.top*ratio)+"px) scale("+(1+((scale-1) * ratio))+")"
            }))+ "}");
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
    //alert(offset.left);
    var scale = $currentTarget.data("scale");

    $(".dynamicCSS").remove();

    if ($.browser.webkit) {
      $("body").append("<style type='text/css' class='dynamicCSS'>"+
        ".shrink {"+
        "-webkit-transform-origin: "+offset.left+"px "+offset.top+"px; "+
        "-webkit-animation-name: shrink-anim;"+
        "}"+
        "@-webkit-keyframes shrink-anim {"+
        "0% { -webkit-transform: translate("+(-offset.left)+"px, "+(-offset.top)+"px) scale("+scale+");  }"+
        "100% { -webkit-transform: scale(1) translate(0, 0); } "+
        "}"+
        "</style>");

      $("body").removeClass("grow").removeClass("zoomed").addClass("shrink");
      setTimeout(function() {
        $("body").removeClass("shrink");
      }, 1000);
    } else if ($.browser.mozilla) {
      function emitAnimationStep(ratio) {
        $("body").append("<style type='text/css' class='dynamicCSS'>"+
          ".shrink {"+
            emitProperties(css3({
              "transform-origin": offset.left+"px "+offset.top+"px",
              "transform": "translate("+(-offset.left*ratio)+"px,"+(-offset.top*ratio)+"px) scale("+(1+(scale-1) * ratio)+")"
            }))+ "}");
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


  function emitProperties(properties) {
    var parts = [];

    for (propertyName in properties) {
      parts.push(propertyName +":" + properties[propertyName]+";");
    }
    
    return parts.join("\n");
  }

  $(function() {
    $("body").css({
      "animation-duration" : "1s",
      "animation-iteration-count": 1
    });
  })
})(jQuery);