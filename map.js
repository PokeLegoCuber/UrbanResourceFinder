//.fitWorld(), Sets a map view that mostly contains the whole world with the maximum zoom level possible
var mymap = L.map('URFmap').fitWorld();

// Crediting OpenStreetMap(OSM) for tiles
const attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

//Tiling is basically the skin of the map
//In this case we're using the default OSM one and storing it in tileURL
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

//tilerLayer takes in URL and an object
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

//Storing NYCOpenData JSONs
const fountainURL = 'https://data.cityofnewyork.us/api/views/bevm-apmm/rows.json';
const wifiURL = 'https://data.cityofnewyork.us/resource/yjub-udmw.json';
const recycleURL = 'https://data.cityofnewyork.us/resource/sxx4-xhzg.json';

//Declaring layer variables
var fountainLayer = L.layerGroup();
var wifiLayer = L.layerGroup();
var recycleLayer = L.layerGroup();

//Creating icon
var fountainIcon = L.icon({
	iconUrl: 'img/fountain.png',

    iconSize:     [32 , 32], // size of the icon
    iconAnchor:   [16 , 32], // point of the icon which will correspond to marker's location. Also the center point
    popupAnchor:  [0 , -32] // point from which the popup should open relative to the iconAnchor
});

var wifiIcon = L.icon({
	iconUrl: 'img/wifi.png',

    iconSize:     [32 , 25], // size of the icon
    iconAnchor:   [16 , 25], // point of the icon which will correspond to marker's location. Also the center point
    popupAnchor:  [0 , -25] // point from which the popup should open relative to the iconAnchor
});

var recycleIcon = L.icon({
	iconUrl: 'img/recycle.png',

    iconSize:     [32 , 31], // size of the icon
    iconAnchor:   [16 , 31], // point of the icon which will correspond to marker's location. Also the center point
    popupAnchor:  [0 , -31] // point from which the popup should open relative to the iconAnchor
});

var personIcon = L.icon({
	iconUrl: 'img/person.png',

    iconSize:     [32 , 36], // size of the icon
    iconAnchor:   [16 , 36], // point of the icon which will correspond to marker's location. Also the center point
    popupAnchor:  [0 , -36] // point from which the popup should open relative to the iconAnchor
});

async function loadFountain() 
{
	//Gets the JSON from URL stores it as a string
	let response = await fetch(fountainURL);
	//Converts the string back into JSON format
	let data = await response.json();
	// This is to parse "NYC Parks Drinking Fountains"
	console.log("NYC Parks Drinking Fountains");

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

async function loadWiFi() 
{
	//Gets the JSON from URL stores it as a string
	let response = await fetch(wifiURL);
	//Converts the string back into JSON format
	let data = await response.json();

	// This is to parse "NYC Wi-Fi Hotspot Locations"
	console.log("NYC Wi-Fi Hotspot Locations");

	for(i = 0; i<data.length; i++)
	{
		
		let loc_msg = "<b>Location:</b>"+data[i].name;
		let name_msg = "<b>Wi-Fi Name:</b>"+data[i].ssid;
		let type_msg = "<b>Type:</b>"+data[i].type;
		let detail_msg;
		if(data[i].remarks == undefined)
		{
			detail_msg = "<b>Details:</b>There are no details";
		}
		else
		{
			detail_msg = "<b>Details:</b>" + data[i].remarks;
		}
		let lat = data[i].location_lat_long.latitude;
		let long = data[i].location_lat_long.longitude;
		L.marker([lat, long] , {icon:wifiIcon}).bindPopup(loc_msg +"<br>"+ name_msg +"<br>"+ type_msg +"<br>"+ detail_msg).addTo(wifiLayer);
	}

	// for(i = 0; i<data.length; i++)
	// {
	// 	console.log(i);
	// 	console.log("Location: "+data[i].name);
	// 	console.log("Wi-Fi Name: "+data[i].ssid);
	// 	console.log("Type: "+data[i].type);
	// 	if(data[i].remarks == undefined)
	// 	{
	// 		console.log("Details: There are no details");
	// 	}
	// 	else
	// 	{
	// 		console.log("Details: " + data[i].remarks);
	// 	}
	// 	console.log("Latitude: "+data[i].location_lat_long.latitude);
	// 	console.log("Longitude: "+data[i].location_lat_long.longitude);
	// 	console.log("--------------------------------------------------");
	// }
}

async function loadRecycle() 
{
	//Gets the JSON from URL stores it as a string
	let response = await fetch(recycleURL);
	//Converts the string back into JSON format
	let data = await response.json();

	// This is to parse "Public Recycling Bins"
	console.log("Public Recycling Bins");

	for(i = 0; i <data.length; i++)
	{
		let loc_msg= "Location: " + data[i].park_site_name;
		let address_msg;
		if(data[i].address == undefined)
		{
			address_msg = "Address: No specified address";
		}
		else
		{
			address_msg = "Address: " + data[i].address;
		}
		let site_msg = "Site Type: " + data[i].site_type;
		let lat = data[i].latitude;
		let long = data[i].longitude;
		L.marker([lat, long] , {icon:recycleIcon}).bindPopup(loc_msg +"<br>"+ address_msg +"<br>"+ site_msg).addTo(recycleLayer);
	}

	// for(i = 0; i <data.length; i++)
	// {
	// 	console.log(i);
	// 	console.log("Location: " + data[i].park_site_name);
	// 	if(data[i].address == undefined)
	// 	{
	// 		console.log("Address: No specified address");
	// 	}
	// 	else
	// 	{
	// 		console.log("Address: " + data[i].address);
	// 	}
	// 	console.log("Site Type: " + data[i].site_type);
	// 	console.log("Latitude: " + data[i].latitude);
	// 	console.log("Longitude: " + data[i].longitude);
	// }
}
// Preloads the assets into the layers
loadFountain();
loadWiFi();
loadRecycle();

var overlayMaps = {
    "Fountains &#x1F6B0": fountainLayer,
    "Wi-Fi &#x1F4E1": wifiLayer,
    "Recycling Bin &#x267B": recycleLayer
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