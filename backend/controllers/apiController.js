require('dotenv').config();
const fetch = require('node-fetch');
const getGeocode = require('../utils/getGeocode'); 

exports.getRoute = async (req, res) => {
  const startLocation = req.body.origin;  
  const endLocation = req.body.destination; 

  try {
    // Geocode the start and end locations
    const geoCodeStart = await getGeocode(startLocation);
    const geoCodeEnd = await getGeocode(endLocation);

    //Test logs
    //console.log('geoCodeStart:', geoCodeStart);
    //console.log('geoCodeEnd:', geoCodeEnd);

    // Check if geocoding was successful
    if (!geoCodeStart || !geoCodeStart.results[0] || !geoCodeStart.results[0].geometry || !geoCodeStart.results[0].geometry.location) {
      return res.status(400).json({message: "Could not geocode start location: " + startLocation});
    }
    if (!geoCodeEnd || !geoCodeEnd.results[0] || !geoCodeEnd.results[0].geometry || !geoCodeEnd.results[0].geometry.location) {
      return res.status(400).json({message: "Could not geocode end location: " + endLocation});
    }

    const startLatLng = geoCodeStart.results[0].geometry.location;
    const endLatLng = geoCodeEnd.results[0].geometry.location;

    // Now you can use startLatLng.lat, startLatLng.lng, endLatLng.lat, and endLatLng.lng in your API request
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLatLng.lat},${startLatLng.lng}&destination=${endLatLng.lat},${endLatLng.lng}&key=AIzaSyCTjH3puEU6ebUWwsLZFGQJySp3IrRDe0o`
    );
    const data = await response.json();
    if (!data || !data.routes || !data.routes[0]) {
      return res.status(400).json({message: "Could not get directions"});
    }

    const responseData = {
      bounds: data.routes[0].bounds,
      copyrights: data.routes[0].copyrights,
      legs: data.routes[0].legs,
      overview_polyline: data.routes[0].overview_polyline,
      summary: data.routes[0].summary,
      warnings: data.routes[0].warnings,
      waypoint_order: data.routes[0].waypoint_order
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the route data." });
  }
};

