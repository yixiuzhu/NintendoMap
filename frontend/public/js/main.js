$(document).ready(() => {
    const form = $('#route-form');
    const startLocation = $('#start-location');
    const endLocation = $('#end-location');
  
    let map;
    let directionsService;
    let directionsRenderer;
  
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
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
  