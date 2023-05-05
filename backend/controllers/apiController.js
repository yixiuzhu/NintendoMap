const fetch = require('node-fetch');

exports.getRoute = async (req, res) => {
  const startLocation = req.body.startLocation;
  const endLocation = req.body.endLocation;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLocation}&destination=${endLocation}&key=YOUR_GOOGLE_MAPS_API_KEY`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the route data.' });
  }
};
