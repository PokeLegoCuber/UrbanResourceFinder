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

//Creating icon
var GHParrotIcon = L.icon({
    iconUrl: 'githubparrot.gif',

    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location. Also the center point
    popupAnchor:  [0, -32] // point from which the popup should open relative to the iconAnchor
});

var OSSParrotIcon = L.icon({
    iconUrl: 'opensourceparrot.gif',

    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location. Also the center point
    popupAnchor:  [0, -32] // point from which the popup should open relative to the iconAnchor
});

//Adds marker to map
var marker = L.marker([40.631229, -73.952558], {icon: GHParrotIcon}).addTo(mymap);
var marker2 = L.marker([40.631135, -73.95336], {icon: OSSParrotIcon}).addTo(mymap);

//Adds circle to map
var circle = L.circle([40.630754, -73.95147], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 30
}).addTo(mymap);

//Marker popup
marker.bindPopup("<b>GitHub Parrot: </b><br>Just chillin at Bedford Avenue").openPopup();
marker2.bindPopup("<b>Open Source Parrot: </b><br>Hanging out in the Quad<br>Or is it the West Quad?")

//Circle popup
circle.bindPopup("This is not Boylan");