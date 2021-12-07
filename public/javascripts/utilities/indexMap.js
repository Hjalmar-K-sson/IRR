mapboxgl.accessToken = mapboxToken;
const map = new mapboxgl.Map({
  container: "indexMap",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-103.5917, 40.6699],
  zoom: 3,
});

map.on("load", () => {
  map
    .addSource("restaurants", {
      type: "geojson",
      data: restaurants,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
    })
    .addControl(new mapboxgl.NavigationControl(), "bottom-right");
});
// // indexMap.addControl(new mapboxgl.NavigationControl(), "bottom-right");
