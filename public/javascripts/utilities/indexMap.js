console.log(restaurants.features[0].address.geometry);

mapboxgl.accessToken = mapboxToken;
const map = new mapboxgl.Map({
  container: "indexMap",
  style: "mapbox://styles/mapbox/streets-v11",
  center: centerPoint,
  zoom: 3,
});

map.on("load", () => {
  map.addSource("restaurants", {
    type: "geojson",
    data: restaurants,
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
  });

  map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "restaurants",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#0D6EFD",
        10,
        "#0D6EFD",
        30,
        "#0D6EFD",
      ],
      "circle-radius": ["step", ["get", "point_count"], 25, 10, 20, 30, 25],
    },
  });

  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "restaurants",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
    paint: {
      "text-color": "#fff",
    },
  });

  map.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: "restaurants",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#0D6EFD",
      "circle-radius": 5,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  });

  // inspect a cluster on click
  map.on("click", "clusters", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["clusters"],
    });
    const clusterId = features[0].properties.cluster_id;
    map
      .getSource("restaurants")
      .getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return;

        map.easeTo({
          center: features[0].address.geometry.coordinates,
          zoom: zoom,
        });
      });
  });

  map.on("click", "unclustered-point", (e) => {
    const coordinates = e.features[0].address.geometry.coordinates.slice();
    const { popUpMarkup } = e.features[0].properties;
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup().setLngLat(coordinates).setHTML(popUpMarkup).addTo(map);
  });

  map.on("mouseenter", "clusters", () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "clusters", () => {
    map.getCanvas().style.cursor = "";
  });
});
