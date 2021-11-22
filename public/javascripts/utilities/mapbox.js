const mapboxgl = require("mapbox-gl");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocoder = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });
