// on page load complete, fire off a jQuery json-p query
// against Google web search
$(function() {
  var $body = $("body");
  
  var scale = 20;
  
  var shrunkCount = 0;
  function shrinkElement(element, scale) {
    var $e = $(element);   
    var bodySize ={width: $("body").width(), height: $("body").height()};
    var size = {width: $e.width(), height: $e.height()};
        
    $e.wrap("<div class='shrunkContainer' style='width: "+ (size.width*(1/scale)) + "px; height: "+ (size.height*(1/scale))+"px'/>");            
    $e.css("width", size.width).css("height", size.height);
    
    var offset = $e.offset();
    
    shrunkCount ++;                   
    
    $("body").append("<style type='text/css'>"+
      ".grow"+shrunkCount+" {"+
      "-webkit-transform-origin: "+offset.left+"px "+offset.top+"px; "+
      "-webkit-animation-name: grow"+shrunkCount+"-anim;"+
      "-webkit-animation-duration: 1s; "+
      "-webkit-animation-direction: alternate; "+
      "-webkit-animation-iteration-count: 1; "+
      "-webkit-animation-timing-function: linear;"+
      "}"+
    "@-webkit-keyframes grow"+shrunkCount+"-anim {"+
    "0% { -webkit-transform: scale(1) translate(0, 0); } "+
    "100% { -webkit-transform: translate("+(-offset.left)+"px, "+(-offset.top+20*scale)+"px) scale("+scale+");  }"+
    "} "+
    ".zoomed"+shrunkCount+" { -webkit-transform: translate("+(-offset.left)+"px, "+(-offset.top+20*scale)+"px) scale("+scale+");  }"+
    "</style>");
    
    $("body").append("<style type='text/css'>"+
      ".shrink"+shrunkCount+" {"+
      "-webkit-transform-origin: "+offset.left+"px "+offset.top+"px; "+
      "-webkit-animation-name: shrink"+shrunkCount+"-anim;"+
      "-webkit-animation-duration: 1s; "+
      "-webkit-animation-direction: alternate; "+
      "-webkit-animation-iteration-count: 1; "+
      "-webkit-animation-timing-function: linear;"+
      "}"+
    "@-webkit-keyframes shrink"+shrunkCount+"-anim {"+
    "100% { -webkit-transform: scale(1) translate(0, 0); } "+
    "0% { -webkit-transform: translate("+(-offset.left)+"px, "+(-offset.top+20*scale)+"px) scale("+scale+");  }"+
    "}"+
    "</style>");    
  }
  
  $("body").append("<style type='text/css'>.shrunk { font-size: 100%; -webkit-transform-origin: 0 0; -webkit-transform: scale("+(1/scale)+"); text-align: left; }</style>");  
  
  
  $(".shrunk").each(function(i, e) {
    shrinkElement(e, scale)
    
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