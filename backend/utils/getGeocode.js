require('dotenv').config();
const fetch = require('node-fetch');


const getGeocode = async (address) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyCTjH3puEU6ebUWwsLZFGQJySp3IrRDe0o`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getGeocode;
