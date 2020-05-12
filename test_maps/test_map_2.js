//Map takes .setView([Lat, Lng], zoomlevel);
var mymap = L.map('map').fitWorld();
// Crediting OpenStreetMap(OSM) for tiles
const attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

//Tiling is basically the skin of the map
//In this case we're using the default OSM one and storing it in tileURL
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png

//tilerLayer takes in URL and an object
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

//Zooms into the map with the detected location
mymap.locate({setView: true});

function onLocationFound(e) {
    //Store accuracy of location in meters into radius
    var radius = e.accuracy;
    //Adds marker using coords with popup message
    L.marker(e.latlng).addTo(mymap).bindPopup("You are within " + radius + " meters from this point").openPopup();
    //Adds circle
    L.circle(e.latlng, radius).addTo(mymap);
}

// .on(specfifed event, function to be called if event happens)
mymap.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

mymap.on('locationerror', onLocationError);