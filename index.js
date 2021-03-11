import { MAPBOX_API } from "./apikey.js";

mapboxgl.accessToken = MAPBOX_API;

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/hagenek/ckm4w5o7ra5sx17qomn47soit",
  center: [10.628401394407115, 59.9082778872939],
  zoom: 15.15,
  attributionControl: false,
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
    var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<div class="popup-card">
        <p>${marker.properties.label.text}</p>
        <img src="${marker.properties.photo}" width='150px'>
        </div>`
    );

    console.log(marker.properties);

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(popup)
      .addTo(map); // sets a popup on this marker
  });
};

getGeoJson("https://quiet-wildwood-47347.herokuapp.com/");
