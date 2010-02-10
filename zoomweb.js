// on page load complete, fire off a jQuery json-p query
// against Google web search
$(function() {  
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
        var newArg1 = {}
        newArg1[arg1] = arg2;
        arg1 = newArg1;
        arg2 = null;
      }

      arg1 = css3(arg1);

      return oldCSS.apply(this, [arg1, arg2]);
    }
  })();

  $.fn.scale = function(s) {
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
    }

    return this;
  };

  function emitProperties(properties) {
    var parts = [];

    for (propertyName in properties) {
      parts.push(propertyName +":" + properties[propertyName]+";");
    }
    
    return parts.join("\n");
  }

  var $body = $("body").css({
    "animation-duration" : "1s",
    "animation-iteration-count": 1
  });
  
  var shrunkCount = 0;
  function shrinkElement(element, scale) {    
    var offset = $(element).scale(scale).offset();
    
    shrunkCount ++;                   
    
    $("body").append("<style type='text/css'>"+
      ".grow"+shrunkCount+" {"+
      emitProperties(css3({
        "transform-origin": offset.left+"px "+offset.top+"px",
        "animation-name": "grow"+shrunkCount+"-anim"
      }))+      
      "}"+
      "@-webkit-keyframes grow"+shrunkCount+"-anim {"+
      "0% { -webkit-transform: scale(1) translate(0, 0); } "+
      "100% { -webkit-transform: translate("+(-offset.left)+"px, "+(-offset.top+20*scale)+"px) scale("+scale+");  }"+
      "} "+
      ".zoomed"+shrunkCount+" { " +
      emitProperties(css3({"transform": "translate("+(-offset.left)+"px, "+(-offset.top+20*scale)+"px) scale("+scale+")"}))+
      "</style>");
    
    $("body").append("<style type='text/css'>"+
      ".shrink"+shrunkCount+" {"+
      "-webkit-transform-origin: "+offset.left+"px "+offset.top+"px; "+
      "-webkit-animation-name: shrink"+shrunkCount+"-anim;"+
      "}"+
      "@-webkit-keyframes shrink"+shrunkCount+"-anim {"+
      "100% { -webkit-transform: scale(1) translate(0, 0); } "+
      "0% { -webkit-transform: translate("+(-offset.left)+"px, "+(-offset.top+20*scale)+"px) scale("+scale+");  }"+
      "}"+
      "</style>");
  }
    
  $(".shrunk").each(function(i, e) {
    shrinkElement(e, 20)
    
    var $e = $(e);
      
    $e.click(function() {        
      if ($body.hasClass("grow"+(i+1))) {          
        return;
      }
        
      $body.addClass("grow"+(i+1)).removeClass("grown"+(i+1)).removeClass("shrink");
      setTimeout(function() {
        $body.addClass("zoomed"+(i+1));
        $e.addClass("grown");
      }, 1000);   
        
      return false;
    });
      
    $e.find(".zoomOut").click(function() {        
      if (!$body.hasClass("grow"+(i+1))) {          
        return;
      }
      
      $e.removeClass("grown");
              
      $("body").removeClass("grow"+(i+1)).removeClass("zoomed"+(i+1)).addClass("shrink"+(i+1));
      setTimeout(function() {
        $("body").removeClass("shrink"+(i+1));
      }, 1000); 
       
      return false;     
    });
  });           
});