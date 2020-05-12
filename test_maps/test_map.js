//Map takes .setView([Lat, Lng], zoomlevel);
var mymap = L.map('mapid').setView([40.631229, -73.952558], 19);

// Crediting OpenStreetMap(OSM) for tiles
const attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

//Tiling is basically the skin of the map
//In this case we're using the default OSM one and storing it in tileURL
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

//tilerLayer takes in URL and an object
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

//Adds marker to map
var marker = L.marker([40.631229, -73.952558]).addTo(mymap);
var marker2 = L.marker([40.631135, -73.95336]).addTo(mymap);

//Adds circle to map
var circle = L.circle([40.630754, -73.95147], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 30
}).addTo(mymap);

//Marker popup
marker.bindPopup("<b>Bedford Avenue</b><br>Cars go vroom vroom here").openPopup();
marker2.bindPopup("<b>This is called the Quad or West Quad</b><br>But nobody calls the other side East Quad<br>Like I never heard anyone call it")

//Circle popup
circle.bindPopup("This is not Boylan");