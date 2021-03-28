// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


var graymap = L.tileLayer(  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",  {    attribution:      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",    tileSize: 512,    maxZoom: 18,    zoomOffset: -1,    id: "mapbox/light-v10",    accessToken: API_KEY  }); 


// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapid",
//   accessToken: API_KEY
// }).addTo(myMap);

// Creating map object
var myMap = L.map("mapid", {
  center: [40.7, -73.95],
  zoom: 5,
  maxZoom: 17
});

graymap.addTo(myMap);

// Grab the data with d3
d3.json(queryUrl, function(response) {


  console.log(response.features[0])

  // Loop through data
  for (var i = 0; i < response.features.length; i++) {

    // // // Set the data properties to variablies
    var location = response.features[i].geometry.coordinates;
    var descript = "LOC: " + response.features[i].properties.place + "<br>" + "MAG: " + response.features[i].properties.mag + "<br>" + "DEP: " + location[2];
    var mag = response.features[i].properties.mag;

    // console.log(location[2]);  



    if (location[2] < 10)  {
      colordep = '#00FF00'
    }

    else if (location[2] >= 10 && location[2] < 30)  {
      colordep = '#FFFF00'
    }

    else if (location[2] >= 30 && location[2] < 50)  {
      colordep = '#FFCC00'
    }

    else if (location[2] >= 50 && location[2] < 70)  {
      colordep = '#FF3300'
    }

    else if (location[2] >= 70 && location[2] < 90)  {
      colordep = '#FF0000'
    }

    else if (location[2] >= 90)  {
      colordep = '#C82538'
    }

    
    // // Check for location property
    if (location) {

    //   // Add a new marker to the cluster group and bind a pop-up
      var circle = L.circle([location[1], location[0]], {
        color: colordep,
        fillColor: colordep,
        fillOpacity: 0.5,
        radius: mag * 20000
      });
    
      circle.bindPopup(descript);
  
    }

    // Add our marker cluster layer to the map
    myMap.addLayer(circle);
    // myMap.addLegend(legend)
  };
  
  
  // Here we create a legend control object.
  var legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");

    var grades = [-10, 10, 30, 50, 70, 90];
    var colors = [
      "#00FF00",
      "#FFFF00",
      "#FFCC00",
      "#FF3300",
      "#FF0000",
      "#C82538"
    ];

    // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML += "<i style='background: " + colors[i] + "'></i> " + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(myMap);
});
  


