mapboxgl.accessToken = 'pk.eyJ1IjoiaGFtb29yZSIsImEiOiJjanNkZGQ3eWwwdGZpNDRqbjR5czBqOW1rIn0.0sFYOjlfd_2l220VFNFkSw'; // replace this with your access token
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/hamoore/cjsdezm9y0r0f1fpi8bpy9fvy', // replace this with your style URL
  center: [-88.426583, 22.008867],
  zoom: 3.7,
  trackResize: true
});

map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['alternative-springbreak'] // replace this with the name of the layer
  });

  if (!features.length) {
    return;
  }

  var feature = features[0];

  var website = feature.properties.website;
  var snapchat = feature.properties.snapchat;
  var title;
  var snapchatText;

  if ( website === "" ) {
    title = '<h3 class="title">' + feature.properties.title + '</h3>'
  } else {
    title = '<h3 class="title"><a class="spring-break__link" href="' + feature.properties.website + '">' + feature.properties.title + '</a></h3>'
  }

  if ( snapchat === "") {
    snapchatText = "";
  } else {
    snapchatText = '<span class="sc-wrap"><img src="interactive/2019/03/spring-break/images/snapchat.png" alt="snapchat icon"><a class="sc-takeover" href="https://story.snapchat.com/s/northeasternu" class="sc-takeover">Snapchat takeover &bull; ' + snapchat + '</a></span>';
  }

  var popup = new mapboxgl.Popup({ offset: [0, 0] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(title + '<ul><li>Location: ' + feature.properties.location + '</li><li>Team Leaders: ' + feature.properties.team + '</li><li>University Representative: ' + feature.properties.urep + '</li></ul><img src="' + feature.properties.image + '" alt="' + feature.properties.title + '"/><p>' + feature.properties.description + snapchatText + '</p>')
    .setLngLat(feature.geometry.coordinates)
    .addTo(map);
});

var bbox = [[-125.892588, 44.248382], [-51.111561, -4.137534]];
window.onresize = function(event) {
  map.fitBounds(bbox, {
    padding: {top: 10, bottom:25, left: 15, right: 5}
  });
}
window.onload = function(event) {
  map.fitBounds(bbox, {
    padding: {top: 10, bottom:25, left: 15, right: 5}
  });
}

map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl());
