let map;
let directionsService;
let directionsRenderer;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.144854685585784, lng: -118.15105346441807},
    zoom: 17,
    mapId: "dcdc3b5f84400377",
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  initializeAutocomplete($("#start")[0]);
  initializeAutocomplete($("#end")[0]);
}

function initializeAutocomplete(inputElement) {
  const autocomplete = new google.maps.places.Autocomplete(inputElement);
  autocomplete.setFields(["address_components", "geometry"]);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      alert("No details available for input: '" + place.name + "'");
      return;
    }
    inputElement.dataset.lat = place.geometry.location.lat();
    inputElement.dataset.lng = place.geometry.location.lng();
  });
}

function plotRoute(start, end) {
  const directionsRequest = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING,
  };

  directionsService.route(directionsRequest, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(result);
    } else {
      alert("An error occurred while displaying the route.");
    }
  });
}

window.initMap = initMap;
window.initializeAutocomplete = initializeAutocomplete;

$(document).ready(() => {
  const form = $("#route-form");
  const startLocation = $("#start");
  const endLocation = $("#end");

  form.on("submit", (event) => {
    event.preventDefault();

    const start = {
      lat: parseFloat(startLocation[0].dataset.lat),
      lng: parseFloat(startLocation[0].dataset.lng),
    };

    const end = {
      lat: parseFloat(endLocation[0].dataset.lat),
      lng: parseFloat(endLocation[0].dataset.lng),
    };

    if (!start.lat || !start.lng || !end.lat || !end.lng) {
      alert("Please select both a start and end location.");
      return;
    }

    plotRoute(start, end);
  });
});
