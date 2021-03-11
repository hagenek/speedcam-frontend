const headLine = (document.querySelector("h1").style = "color: blue");
const { token } = require("env.js");

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFnZW5layIsImEiOiJja2JveGdsZ3Mxam91MnFxbnJua3Nmamg4In0.5smhwVMhZaL70x3KvQ_qCw";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
});

map.addControl(new mapboxgl.NavigationControl());

const getGeoJson = async (uri) => {
  const geojson = await fetch(uri)
    .then((response) => response.json())
    .then((data) => data);

  geojson.features.forEach(function (marker) {
    // create a HTML element for each feature
    var el = document.createElement("div");
    el.className = "marker";

    // Popup with custom text from the JSON
    var popup = new mapboxgl.Popup({ offset: 25 }).setText(
      marker.properties.label.text
    );

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(popup)
      .addTo(map); // sets a popup on this marker
  });
};

getGeoJson("http://localhost:5000");
