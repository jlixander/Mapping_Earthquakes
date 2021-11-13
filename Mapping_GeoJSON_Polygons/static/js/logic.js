// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layers that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
 attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
     maxZoom: 18,
     id: "satellite-streets-v11",
     accessToken: API_KEY
 });

 let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "streets-v11",
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
 let baseMaps = {
   Streets: streets,
   "Satellite Streets": satelliteStreets
 };

// Create the map object with a center and zoom level.
let map = L.map("mapid", {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/jlixander/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Create a style for the lines.
 let myStyle = {
   color: "#ffffa1",
   weight: 1
 }

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
  console.log(data);
// // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    style: myStyle,
    onEachFeature: function(feature, latlng) {
      console.log(latlng);
      latlng.bindPopup("<h3>Neighborhood: " + feature.properties.AREA_NAME + "</h3>");
    }
  }).addTo(map);
});