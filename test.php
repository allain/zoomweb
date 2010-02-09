<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html>
<head> 
<title>Zooming with CSS3 Tests</title> 
<style type="text/css"> 
body {
  margin: 0;
  padding: 0;
  -webkit-transform-origin: 50% 50%;
  background-color: #444;
}


.box {  
  display: block;
  float: left;  
  text-align: center;  
}

.shrunkContainer {
  float: left; 
  margin-right: 10px;
  overflow: hidden;
}

a.zoomOut {
  visibility: hidden;
}

.grown a.zoomOut {
  visibility: visible; 
}

#pageContainer {
  width: 900px;
  min-height: 1024px;
  margin: auto;
  background-color: white;  
}
</style> 

<script type="text/javascript" src="jquery-1.4.1.min.js"></script>
<script type="text/javascript" src="zoomweb.js"></script>
</head>
<body> 
<div id="pageContainer">
<h2>Webkit Properties Test</h2>
<p><strong>Instructions:</strong> Click on one of the shrunk blocks to read it. When a block is in focused, click "Zoom Out" to return to the main view.</p>
<p><strong>Note:</strong> I'm trying to push the maximum scale to see where it can go without being too jittery.</p>

<?php for ($i=0; $i<10; $i++): ?>
<div class="box shrunk" title="This is Shrunk!">
<a href="#" class="zoomOut">Zoom Out</a>
<h2>Hello ZUI World!</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor, elit a egestas ultricies, purus 
ligula porta libero, eu sagittis augue sem nec sem. Quisque felis sem, faucibus at condimentum faucibus, fermentum 
non justo. Sed vitae lacus a libero consequat consectetur ut ac risus. Curabitur cursus erat eget mauris auctor 
vitae tincidunt ligula vestibulum. Aenean convallis molestie turpis vel aliquam. Morbi id dignissim risus. 
Cras auctor, lectus eget tristique elementum, erat mi imperdiet nisl, eget malesuada urna ante quis lacus. 
Vivamus vitae metus justo, ultrices pretium velit. Ut orci nisi, dictum sodales semper at, semper sit amet est. 
Aenean pretium vehicula porttitor. Aenean eget accumsan neque. Suspendisse eleifend pellentesque pellentesque.
Donec consequat mauris suscipit leo laoreet suscipit.</p>

<p>Vivamus venenatis laoreet nisl, eget dapibus elit aliquet eget. Nunc ac libero eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi velit ligula, tempor in rhoncus at, facilisis sed nulla. Maecenas ullamcorper felis sit amet dolor pulvinar condimentum. Nunc in elit nec ipsum varius sodales. Nunc cursus lorem volutpat ligula aliquet feugiat. Ut ultrices rutrum mi ac tincidunt. Vivamus faucibus porttitor quam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam in libero quis magna pharetra blandit.</p>

<p>Etiam diam nisl, mollis quis lobortis a, faucibus vel tortor. In porta faucibus velit, id vehicula ipsum tristique eget. Curabitur consequat ullamcorper condimentum. Aliquam pretium luctus sem vitae sagittis. In nec lectus eget orci elementum commodo. Vivamus id libero non purus dapibus tincidunt. Sed eleifend auctor libero ut rhoncus. Phasellus ac mattis tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus rhoncus, arcu sed vehicula scelerisque, metus nisl vehicula nulla, nec lobortis tortor elit volutpat turpis. Morbi nec mauris sed felis feugiat porttitor quis non leo. Sed a lacus libero. Maecenas leo arcu, ornare vel lobortis sed, iaculis volutpat diam.</p>

<p>Quisque sagittis velit ut est rhoncus auctor. In commodo gravida lectus, vel tincidunt purus ultrices id. Phasellus in erat ac dolor volutpat gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas porttitor fringilla nunc quis vulputate. Morbi feugiat gravida quam eu pharetra. In vitae dolor ac purus placerat tincidunt. Fusce molestie, nunc ornare malesuada scelerisque, lectus justo luctus arcu, id dapibus mauris quam sollicitudin nunc. Duis hendrerit, urna eget hendrerit facilisis, ante elit sodales neque, a congue magna mauris in ligula. Cras semper, mauris vitae consequat pretium, sem augue posuere enim, quis cursus orci felis in tellus. Aenean porttitor leo mollis augue cursus egestas. Donec purus turpis, feugiat sed tincidunt eu, sodales in lacus. In et quam felis. Vivamus eleifend, est vitae blandit sagittis, nibh felis tristique ante, quis blandit turpis ligula id mi. Phasellus lectus mi, rhoncus laoreet scelerisque non, vehicula sed nunc. Nunc eu lacus nisi, quis consequat erat. Aenean id ligula tortor, faucibus faucibus felis. Integer consectetur nisl turpis. Suspendisse pharetra mi varius magna tempus rutrum eget porta urna.</p>

<p>Morbi felis nunc, scelerisque non tempus sed, tincidunt in odio. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque id erat et felis elementum molestie nec vel metus. Aliquam consequat molestie urna, non tincidunt tellus euismod quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In in arcu ac nisi elementum varius. Duis eget lacus urna. Fusce malesuada urna non dolor aliquet commodo aliquet nibh condimentum. Suspendisse commodo, dolor nec volutpat bibendum, sem massa dapibus purus, sed commodo enim lectus quis magna. Ut pharetra ultricies est commodo ultricies. Pellentesque consectetur dignissim felis eu consequat.</p>
<p>Vivamus venenatis laoreet nisl, eget dapibus elit aliquet eget. Nunc ac libero eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi velit ligula, tempor in rhoncus at, facilisis sed nulla. Maecenas ullamcorper felis sit amet dolor pulvinar condimentum. Nunc in elit nec ipsum varius sodales. Nunc cursus lorem volutpat ligula aliquet feugiat. Ut ultrices rutrum mi ac tincidunt. Vivamus faucibus porttitor quam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam in libero quis magna pharetra blandit.</p>

<p>Etiam diam nisl, mollis quis lobortis a, faucibus vel tortor. In porta faucibus velit, id vehicula ipsum tristique eget. Curabitur consequat ullamcorper condimentum. Aliquam pretium luctus sem vitae sagittis. In nec lectus eget orci elementum commodo. Vivamus id libero non purus dapibus tincidunt. Sed eleifend auctor libero ut rhoncus. Phasellus ac mattis tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus rhoncus, arcu sed vehicula scelerisque, metus nisl vehicula nulla, nec lobortis tortor elit volutpat turpis. Morbi nec mauris sed felis feugiat porttitor quis non leo. Sed a lacus libero. Maecenas leo arcu, ornare vel lobortis sed, iaculis volutpat diam.</p>

<p>Quisque sagittis velit ut est rhoncus auctor. In commodo gravida lectus, vel tincidunt purus ultrices id. Phasellus in erat ac dolor volutpat gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas porttitor fringilla nunc quis vulputate. Morbi feugiat gravida quam eu pharetra. In vitae dolor ac purus placerat tincidunt. Fusce molestie, nunc ornare malesuada scelerisque, lectus justo luctus arcu, id dapibus mauris quam sollicitudin nunc. Duis hendrerit, urna eget hendrerit facilisis, ante elit sodales neque, a congue magna mauris in ligula. Cras semper, mauris vitae consequat pretium, sem augue posuere enim, quis cursus orci felis in tellus. Aenean porttitor leo mollis augue cursus egestas. Donec purus turpis, feugiat sed tincidunt eu, sodales in lacus. In et quam felis. Vivamus eleifend, est vitae blandit sagittis, nibh felis tristique ante, quis blandit turpis ligula id mi. Phasellus lectus mi, rhoncus laoreet scelerisque non, vehicula sed nunc. Nunc eu lacus nisi, quis consequat erat. Aenean id ligula tortor, faucibus faucibus felis. Integer consectetur nisl turpis. Suspendisse pharetra mi varius magna tempus rutrum eget porta urna.</p>

<p>Morbi felis nunc, scelerisque non tempus sed, tincidunt in odio. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque id erat et felis elementum molestie nec vel metus. Aliquam consequat molestie urna, non tincidunt tellus euismod quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In in arcu ac nisi elementum varius. Duis eget lacus urna. Fusce malesuada urna non dolor aliquet commodo aliquet nibh condimentum. Suspendisse commodo, dolor nec volutpat bibendum, sem massa dapibus purus, sed commodo enim lectus quis magna. Ut pharetra ultricies est commodo ultricies. Pellentesque consectetur dignissim felis eu consequat.</p>
<p>Vivamus venenatis laoreet nisl, eget dapibus elit aliquet eget. Nunc ac libero eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi velit ligula, tempor in rhoncus at, facilisis sed nulla. Maecenas ullamcorper felis sit amet dolor pulvinar condimentum. Nunc in elit nec ipsum varius sodales. Nunc cursus lorem volutpat ligula aliquet feugiat. Ut ultrices rutrum mi ac tincidunt. Vivamus faucibus porttitor quam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam in libero quis magna pharetra blandit.</p>

<p>Etiam diam nisl, mollis quis lobortis a, faucibus vel tortor. In porta faucibus velit, id vehicula ipsum tristique eget. Curabitur consequat ullamcorper condimentum. Aliquam pretium luctus sem vitae sagittis. In nec lectus eget orci elementum commodo. Vivamus id libero non purus dapibus tincidunt. Sed eleifend auctor libero ut rhoncus. Phasellus ac mattis tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus rhoncus, arcu sed vehicula scelerisque, metus nisl vehicula nulla, nec lobortis tortor elit volutpat turpis. Morbi nec mauris sed felis feugiat porttitor quis non leo. Sed a lacus libero. Maecenas leo arcu, ornare vel lobortis sed, iaculis volutpat diam.</p>

<p>Quisque sagittis velit ut est rhoncus auctor. In commodo gravida lectus, vel tincidunt purus ultrices id. Phasellus in erat ac dolor volutpat gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas porttitor fringilla nunc quis vulputate. Morbi feugiat gravida quam eu pharetra. In vitae dolor ac purus placerat tincidunt. Fusce molestie, nunc ornare malesuada scelerisque, lectus justo luctus arcu, id dapibus mauris quam sollicitudin nunc. Duis hendrerit, urna eget hendrerit facilisis, ante elit sodales neque, a congue magna mauris in ligula. Cras semper, mauris vitae consequat pretium, sem augue posuere enim, quis cursus orci felis in tellus. Aenean porttitor leo mollis augue cursus egestas. Donec purus turpis, feugiat sed tincidunt eu, sodales in lacus. In et quam felis. Vivamus eleifend, est vitae blandit sagittis, nibh felis tristique ante, quis blandit turpis ligula id mi. Phasellus lectus mi, rhoncus laoreet scelerisque non, vehicula sed nunc. Nunc eu lacus nisi, quis consequat erat. Aenean id ligula tortor, faucibus faucibus felis. Integer consectetur nisl turpis. Suspendisse pharetra mi varius magna tempus rutrum eget porta urna.</p>

<p>Morbi felis nunc, scelerisque non tempus sed, tincidunt in odio. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque id erat et felis elementum molestie nec vel metus. Aliquam consequat molestie urna, non tincidunt tellus euismod quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In in arcu ac nisi elementum varius. Duis eget lacus urna. Fusce malesuada urna non dolor aliquet commodo aliquet nibh condimentum. Suspendisse commodo, dolor nec volutpat bibendum, sem massa dapibus purus, sed commodo enim lectus quis magna. Ut pharetra ultricies est commodo ultricies. Pellentesque consectetur dignissim felis eu consequat.</p>

<p><img src="http://en.gravatar.com/userimage/159925/3c07c997d99a171b1db5029f9e902f43.jpg" /></p>
</div>
<? endfor; ?>
</div>
</body>
</html>
