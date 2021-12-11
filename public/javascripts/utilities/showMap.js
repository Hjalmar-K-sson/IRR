mapboxgl.accessToken = mapboxToken;
const map = new mapboxgl.Map({
  container: "showMap", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: restaurant.address.geometry.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});
map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

new mapboxgl.Marker()
  .setLngLat(restaurant.address.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${restaurant.name}</h3><p>${restaurant.address.street} ${restaurant.address.houseNumber}, ${restaurant.address.city}</p>`
    )
  )
  .addTo(map);
