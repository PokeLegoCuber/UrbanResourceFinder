//.fitWorld(), Sets a map view that mostly contains the whole world with the maximum zoom level possible
var mymap = L.map('URFmap', {fullscreenControl: true}).fitWorld();

// Crediting OpenStreetMap(OSM) for tiles
const attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

//Tiling is basically the skin of the map
//In this case we're using the default OSM one and storing it in tileURL
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

//tilerLayer takes in URL and an object
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

//Storing NYCOpenData JSONs
const thingURL = 'https://www.website.com/file.json';


//Declaring layer variables
var thingLayer = L.layerGroup();

//Creating icon
var thingIcon = L.icon({
	iconUrl: '../img/img.png',

    iconSize:     [32 , 32], // size of the icon
    iconAnchor:   [16 , 32], // point of the icon which will correspond to marker's location. Also the center point
    popupAnchor:  [0 , -32] // point from which the popup should open relative to the iconAnchor
});

var personIcon = L.icon({
	iconUrl: '../img/person.png',

    iconSize:     [32 , 36], // size of the icon
    iconAnchor:   [16 , 36], // point of the icon which will correspond to marker's location. Also the center point
    popupAnchor:  [0 , -36] // point from which the popup should open relative to the iconAnchor
});

async function loadThing() 
{
	//Gets the JSON from URL stores it as a Response object
	let response = await fetch(thingURL);
	//Converts the string back into JSON format
	let data = await response.json();
	// This is to parse "Output what is ranned"
	console.log("Output what is ranned");

	for(i = 0; i<data.data.length; i++)
	{

		//This finds the position of where the substring of Latitude begins and ends
		let lat_start = data.data[i][9].indexOf(" 4") + 1;
		let lat_end = data.data[i][9].indexOf(")");

		//This finds the position of where the substring of Longitude begins and ends
		let long_start = data.data[i][9].indexOf("-7");
		let long_end = data.data[i][9].indexOf(" 4");

		let lat = data.data[i][9].substring(lat_start , lat_end);
		let long = data.data[i][9].substring(long_start , long_end);
		let loc_msg = "<b>Location:</b> " + data.data[i][15];
		let detail_msg;
		if(data.data[i][11] == undefined)
		{
			detail_msg = "<b>Details:</b> There are no details";
		}
		else
		{
			detail_msg = "<b>Details:</b> " + data.data[i][11];
		}

		L.marker([lat, long] , {icon:fountainIcon}).bindPopup(loc_msg +"<br>"+ detail_msg).addTo(fountainLayer);
	}
	// for(i = 0; i<data.data.length; i++)
	// {

	// 	//This finds the position of where the substring of Latitude begins and ends
	// 	let lat_start = data.data[i][9].indexOf(" 4") + 1;
	// 	let lat_end = data.data[i][9].indexOf(")");

	// 	//This finds the position of where the substring of Longitude begins and ends
	// 	let long_start = data.data[i][9].indexOf("-7");
	// 	let long_end = data.data[i][9].indexOf(" 4");

	// 	console.log(i);
	// 	console.log(data.data[i][9]);
	// 	console.log("Location: " + data.data[i][15]);
	// 	if(data.data[i][11] == undefined)
	// 	{
	// 		console.log("Details: There are no details");
	// 	}
	// 	else
	// 	{
	// 		console.log("Details: " + data.data[i][11]);
	// 	}
	// 	console.log("Latitude: " + data.data[i][9].substring(lat_start , lat_end));
	// 	console.log("Longitude: " + data.data[i][9].substring(long_start , long_end));
	// 	console.log("---------------------------------------------");
	// }
}

// Preloads the assets into the layers
loadThing();

// Adds menu items to the Layer list
var overlayMaps = {
    "Thing &#x1F6B0": fountainLayer,
};

L.control.layers(null , overlayMaps).addTo(mymap);

//Zooms into the map with the detected location
mymap.locate({setView: true});

function onLocationFound(e) {
    //Store accuracy of location in meters into radius
    var radius = e.accuracy;
    //Adds marker using coords with popup message
    L.marker(e.latlng, {icon:personIcon}).addTo(mymap).bindPopup("You are here").openPopup();
    //Adds circle
    //L.circle(e.latlng, radius).addTo(mymap);
}

// .on(specfifed event, function to be called if event happens)
mymap.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

mymap.on('locationerror', onLocationError);