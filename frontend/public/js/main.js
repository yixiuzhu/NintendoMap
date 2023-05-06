$(document).ready(() => {
  const form = $('#route-form');
  const startLocation = $('#pickup-address');
  const endLocation = $('#destination');

  let map;
  let directionsService;
  let directionsRenderer;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 34.14481026163767, lng: -118.15108028900364},
      zoom: 17,
      mapId: "dcdc3b5f84400377",
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
  }

  form.on('submit', (event) => {
    event.preventDefault();

    const start = startLocation.val().trim();
    const end = endLocation.val().trim();

    if (start === '' || end === '') {
      alert('Please enter both a start and end location.');
      return;
    }

    $.post('http://localhost:3000/api/get-route', { startLocation: start, endLocation: end }, (data) => {
      const route = data.routes[0].legs[0];
      displayRoute(route);
    }).fail(() => {
      alert('An error occurred while fetching the route.');
    });
  });

  function displayRoute(route) {
    const directionsRequest = {
      origin: route.start_location,
      destination: route.end_location,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(directionsRequest, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        alert('An error occurred while displaying the route.');
      }
    });
  }

  window.initMap = initMap;
});
