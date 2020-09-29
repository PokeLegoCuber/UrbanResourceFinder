//.fitWorld(), Sets a map view that mostly contains the whole world with the maximum zoom level possible
let mymap = L.map('URFmap', {fullscreenControl: true}).fitWorld();

// Crediting OpenStreetMap(OSM) for tiles
const attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

//Tiling is basically the skin of the map
//In this case we're using the default OSM one and storing it in tileURL
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

//tilerLayer takes in URL and an object
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

//These 2 lines control the radius in which the icon will appear
const lat_dif = .005;
const long_dif = .02;

//Storing NYCOpenData JSONs
const fountainURL = 'https://data.cityofnewyork.us/api/views/bevm-apmm/rows.json';
const wifiURL = 'https://data.cityofnewyork.us/resource/yjub-udmw.json';
const recycleURL = 'https://data.cityofnewyork.us/resource/sxx4-xhzg.json';
const autotoiletURL = 'https://data.cityofnewyork.us/api/views/7z3a-ched/rows.json';
const MTAwifiURL = 'https://data.ny.gov/resource/pwa9-tmie.json';

//Declaring layer variables
let fountainLayer = L.layerGroup();
let wifiLayer = L.layerGroup();
let recycleLayer = L.layerGroup();
let autotoiletLayer = L.layerGroup();
let MTAwifiLayer = L.layerGroup();

//Creating icon
let fountainIcon = L.icon({
	iconUrl: '../img/fountain.png',

    iconSize:     [32 , 32], // size of the icon
    iconAnchor:   [16 , 32], // point of the icon which will correspond to marker's location. Also the center point
    popupAnchor:  [0 , -32] // point from which the popup should open relative to the iconAnchor
});

let wifiIcon = L.icon({
	iconUrl: '../img/wifi.png',

    iconSize:     [32 , 25], // size of the icon
    iconAnchor:   [16 , 25], // point of the icon which will correspond to marker's location. Also the center point
    popupAnchor:  [0 , -25] // point from which the popup should open relative to the iconAnchor
});

let recycleIcon = L.icon({
	iconUrl: '../img/recycle.png',

    iconSize:     [32 , 31], // size of the icon
    iconAnchor:   [16 , 31], // point of the icon which will correspond to marker's location. Also the center point
    popupAnchor:  [0 , -31] // point from which the popup should open relative to the iconAnchor
});

let autotoiletIcon = L.icon({
	iconUrl: '../img/autotoilet.png',

    iconSize:     [32 , 31], // size of the icon
    iconAnchor:   [16 , 31], // point of the icon which will correspond to marker's location. Also the center point
    popupAnchor:  [0 , -31] // point from which the popup should open relative to the iconAnchor
});

let MTAwifiIcon = L.icon({
	iconUrl: '../img/MTA_Wi-Fi.png',

	iconSize:     [32 , 29], // size of the icon
	iconAnchor:   [16 , 29], // point of the icon which will correspond to marker's location. Also the center point
    popupAnchor:  [0 , -29] // point from which the popup should open relative to the iconAnchor

});

let personIcon = L.icon({
	iconUrl: '../img/person.png',

    iconSize:     [32 , 36], // size of the icon
    iconAnchor:   [16 , 36], // point of the icon which will correspond to marker's location. Also the center point
    popupAnchor:  [0 , -36] // point from which the popup should open relative to the iconAnchor
});

async function loadFountain(e) 
{
	//Gets the JSON from URL stores it as a Response object
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

		if(e.code === 1)//e will return code:1 if there isn't a latitude or longitude
		{
			console.log("Hello");
			L.marker([lat, long] , {icon:fountainIcon}).bindPopup(loc_msg +"<br>"+ detail_msg).addTo(fountainLayer);
		}
		else if(Math.abs(lat - e.latlng.lat) < lat_dif && Math.abs(long - e.latlng.lng) < long_dif)
		{
			console.log("Bye");
			L.marker([lat, long] , {icon:fountainIcon}).bindPopup(loc_msg +"<br>"+ detail_msg).addTo(fountainLayer);
		}

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

async function loadWiFi(e) 
{
	//Gets the JSON from URL stores it as a Response object
	let response = await fetch(wifiURL);
	//Converts the string back into JSON format
	let data = await response.json();

	// This is to parse "NYC Wi-Fi Hotspot Locations"
	console.log("NYC Wi-Fi Hotspot Locations");

	for(i = 0; i<data.length; i++)
	{
		
		let loc_msg = "<b>Location:</b> "+data[i].name;
		let name_msg = "<b>Wi-Fi Name:</b> "+data[i].ssid;
		let type_msg = "<b>Type:</b> "+data[i].type;
		let detail_msg;
		if(data[i].remarks == undefined)
		{
			detail_msg = "<b>Details:</b> There are no details";
		}
		else
		{
			detail_msg = "<b>Details:</b> " + data[i].remarks;
		}
		let lat = data[i].location_lat_long.latitude;
		let long = data[i].location_lat_long.longitude;
		
		if(e.code === 1)//e will return code:1 if there isn't a latitude or longitude
		{
			console.log("Hello");
			L.marker([lat, long] , {icon:wifiIcon}).bindPopup(loc_msg +"<br>"+ name_msg +"<br>"+ type_msg +"<br>"+ detail_msg).addTo(wifiLayer);
		}
		else if(Math.abs(lat - e.latlng.lat) < lat_dif && Math.abs(long - e.latlng.lng) < long_dif)
		{
			console.log("Bye");
			L.marker([lat, long] , {icon:wifiIcon}).bindPopup(loc_msg +"<br>"+ name_msg +"<br>"+ type_msg +"<br>"+ detail_msg).addTo(wifiLayer);	
		}
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

async function loadRecycle(e) 
{
	//Gets the JSON from URL stores it as a Response object
	let response = await fetch(recycleURL);
	//Converts the string back into JSON format
	let data = await response.json();

	// This is to parse "Public Recycling Bins"
	console.log("Public Recycling Bins");

	for(i = 0; i <data.length; i++)
	{
		let loc_msg = "<b>Location:</b> " + data[i].park_site_name;
		let address_msg;
		if(data[i].address == undefined)
		{
			address_msg = "<b>Address:</b> No specified address";
		}
		else
		{
			address_msg = "<b>Address:</b> " + data[i].address;
		}
		let site_msg = "<b>Site Type:</b> " + data[i].site_type;
		let lat = data[i].latitude;
		let long = data[i].longitude;
		if(lat == undefined || long == undefined)
		{
			continue;
		}
		else if(e.code === 1)//e will return code:1 if there isn't a latitude or longitude
		{
			console.log("Hello");
			L.marker([lat, long] , {icon:recycleIcon}).bindPopup(loc_msg +"<br>"+ address_msg +"<br>"+ site_msg).addTo(recycleLayer);
			
		}
		else if(Math.abs(lat - e.latlng.lat) < lat_dif && Math.abs(long - e.latlng.lng) < long_dif)
		{
			console.log("Bye");
			L.marker([lat, long] , {icon:recycleIcon}).bindPopup(loc_msg +"<br>"+ address_msg +"<br>"+ site_msg).addTo(recycleLayer);
		}
		
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

async function loadAutoToilet(e) 
{
	//Gets the JSON from URL stores it as a Response object
	let response = await fetch(autotoiletURL);
	//Converts the string back into JSON format
	let data = await response.json();
	
	// This is to parse "Auto Toilet"
	console.log("Auto Toilet");

	for(i = 0; i < data.data.length; i++)
	{
		//This finds the position of where the substring of Latitude begins and ends
		let lat_start = data.data[i][10].indexOf(" 4") + 1;
		let lat_end = data.data[i][10].indexOf(")");

		//This finds the position of where the substring of Longitude begins and ends
		let long_start = data.data[i][10].indexOf("-7");
		let long_end = data.data[i][10].indexOf(" 4");

		let lat = data.data[i][10].substring(lat_start , lat_end);
		let long = data.data[i][10].substring(long_start , long_end);

		let loc_msg = "<b>Location:</b> " + data.data[i][14];
		let address_msg = "<b>Street:</b> " + data.data[i][17];

		if(e.code === 1)//e will return code:1 if there isn't a latitude or longitude
		{
			console.log("Hello");
			L.marker([lat, long] , {icon:autotoiletIcon}).bindPopup(loc_msg +"<br>"+ address_msg).addTo(autotoiletLayer);
		}
		else if(Math.abs(lat - e.latlng.lat) < lat_dif && Math.abs(long - e.latlng.lng) < long_dif)
		{
			console.log("Bye");
			L.marker([lat, long] , {icon:autotoiletIcon}).bindPopup(loc_msg +"<br>"+ address_msg).addTo(autotoiletLayer);
		}
		
	}

	// Debugging Purposes
	// console.log(data.data.length);
	// for(i = 0; i < data.data.length; i++)
	// {
	// 	//This finds the position of where the substring of Latitude begins and ends
	// 	let lat_start = data.data[i][10].indexOf(" 4") + 1;
	// 	let lat_end = data.data[i][10].indexOf(")");

	// 	//This finds the position of where the substring of Longitude begins and ends
	// 	let long_start = data.data[i][10].indexOf("-7");
	// 	let long_end = data.data[i][10].indexOf(" 4");

	// 	let lat = data.data[i][10].substring(lat_start , lat_end);
	// 	let long = data.data[i][10].substring(long_start , long_end);

	// 	console.log(i);
	// 	console.log("Location: " + data.data[i][14]);
	// 	console.log("Street: " + data.data[i][17]);
	// 	console.log("Coords: " + data.data[i][10]);
	// 	console.log("Lat: " + lat);
	// 	console.log("Long: " + long);
	// }

}

async function loadMTAwifi(e)
{
	//Gets the JSON from URL stores it as a Response object
	let response = await fetch(MTAwifiURL);
	//Converts the string back into JSON format
	let data = await response.json();
	
	// This is to parse "MTA Wi-Fi"
	console.log("MTA Wi-Fi");

	for(i = 0; i < data.length; i++)
	{
		let name_msg = "<b>Station Name:</b> " + data[i].station_name;
		let line_msg = "<b>Lines:</b> ";
		if(data[i].lines.length > 1)
		{
			for(j = 0; j < data[i].lines.length; j++)
			{
				//Once we reach the last character in the string, it'll come here so that we don't add an unnecessary
				if(j == data[i].lines.length - 1)
				{
					line_msg = line_msg + data[i].lines.slice(j);
				}
				else
				{
					line_msg = line_msg + data[i].lines.slice(j,j + 1) + ',';
				}
				console.log(line_msg);
			}
			console.log(line_msg);
		}
		else
		{
			line_msg = "<b>Lines:</b> " + data[i].lines;
		}
		let carrier_msg = "<b>Carrier:</b> ";
		if(data[i].at_t === "Yes")
		{
			carrier_msg = carrier_msg + "AT&T, ";
		}
		if(data[i].sprint === "Yes")
		{
			carrier_msg = carrier_msg + "Sprint, ";
		}
		if(data[i].t_mobile === "Yes")
		{
			carrier_msg = carrier_msg + "T-Mobile, ";
		}
		if(data[i].verizon === "Yes")
		{
			carrier_msg = carrier_msg + "Verizon ";
		}
		if(carrier_msg === "<b>Carrier:</b> ")
		{
			carrier_msg = "<b>Carrier:</b> None"
		}
		let lat = data[i].location.latitude;
		let long = data[i].location.longitude;

		if(e.code === 1)//e will return code:1 if there isn't a latitude or longitude
		{
			console.log("Hello");
			L.marker([lat, long] , {icon:MTAwifiIcon}).bindPopup(name_msg +"<br>"+ line_msg +"<br>"+ carrier_msg).addTo(MTAwifiLayer);
		}
		else if(Math.abs(lat - e.latlng.lat) < lat_dif && Math.abs(long - e.latlng.lng) < long_dif)
		{
			console.log("Bye");
			L.marker([lat, long] , {icon:MTAwifiIcon}).bindPopup(name_msg +"<br>"+ line_msg +"<br>"+ carrier_msg).addTo(MTAwifiLayer);
		}
	}
	


	//Debugging
	// console.log("Station Name: " + data[0].station_name);
	// console.log("Lines: " + data[0].lines);
	// console.log("Latitude: " + data[0].location.latitude);
	// console.log("Longitude: " + data[0].location.longitude);
	
	// console.log(data.length);
	// for(i = 0; i < data.length; i++)
	// {
	// 	console.log(i);
	// 	let carrier_msg = "";
	// 	if(data[i].at_t === "Yes")
	// 	{
	// 		carrier_msg = carrier_msg + "AT&T ";
	// 	}
	// 	if(data[i].sprint === "Yes")
	// 	{
	// 		carrier_msg = carrier_msg + "Sprint ";
	// 	}
	// 	if(data[i].t_mobile === "Yes")
	// 	{
	// 		carrier_msg = carrier_msg + "T-Mobile ";
	// 	}
	// 	if(data[i].verizon === "Yes")
	// 	{
	// 		carrier_msg = carrier_msg + "Verizon ";
	// 	}
	// 	if(carrier_msg === "")
	// 	{
	// 		carrier_msg = "None"
	// 	}
	// 	console.log("Carrier: " + carrier_msg);
	// }
	// if(data[1].lines.length > 1)
	// {
	// 	let train_lines = "";
	// 	for(i = 0; i < data[19].lines.length; i++)
	// 	{
	// 		//Once we reach the last character in the string, it'll come here so that we don't add an unnecessary
	// 		if(i == data[19].lines.length - 1)
	// 		{
	// 			train_lines = train_lines + data[19].lines.slice(i);
	// 		}
	// 		else
	// 		{
	// 			train_lines = train_lines + data[19].lines.slice(i,i + 1) + ',';
	// 		}
	// 		console.log(train_lines);
	// 	}
	// 	console.log(train_lines);
	// }
}

// Adds menu items to the Layer list
var overlayMaps = {
	"Auto Toilet &#x1F916": autotoiletLayer,
    "Fountains &#x1F6B0": fountainLayer,
    "MTA Wi-Fi &#x1F689": MTAwifiLayer,
    "Recycling Bin &#x267B": recycleLayer,
    "Wi-Fi &#x1F4E1": wifiLayer
};

L.control.layers(null , overlayMaps).addTo(mymap);


//Zooms into the map with the detected location
mymap.locate({setView: true});

function onLocationFound(e) {
    //Store accuracy of location in meters into radius
    var radius = e.accuracy;
    //Adds marker using coords with popup message
    L.marker(e.latlng, {icon:personIcon}).addTo(mymap).bindPopup("You are here").openPopup();
    // Loads the assets into the layers after location is found
	loadFountain(e);
	loadWiFi(e);
	loadRecycle(e);
	loadAutoToilet(e);
	loadMTAwifi(e);
}

// .on(specfifed event, function to be called if event happens)
mymap.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
    // Loads the assets into the layers after location isn't found
	loadFountain(e);
	loadWiFi(e);
	loadRecycle(e);
	loadAutoToilet(e);
	loadMTAwifi(e);
}

mymap.on('locationerror', onLocationError);