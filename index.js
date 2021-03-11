const headLine = (document.querySelector("h1").style = "color: blue");

const getGeoJson = async (uri) => {
  const geojson = await fetch(uri)
    .then((response) => response.json())
    .then((data) => data);

  geojson.features.forEach(function (marker) {
    // create a HTML element for each feature
    var el = document.createElement("div");
    el.className = "marker";

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
  });
};

getGeoJson("http://localhost:5000");
