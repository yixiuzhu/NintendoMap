let map;
let directionsService;
let directionsRenderer;
let coinSound;
let powerupSound;
let bgMusic;
let bgMusicSource;

// Load audio files
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const loadAudioFile = async (fileUrl) => {
  const response = await fetch(fileUrl);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
};

window.onload = async () => {
  coinSound = await loadAudioFile('sounds/coin.wav');
  powerupSound = await loadAudioFile('sounds/powerup.wav');
  bgMusic = await loadAudioFile('sounds/super-mario-theme.mp3');
};

function playSound(audioBuffer) {
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
}

function playBgMusic() {
  // Only create a new source if the previous one has ended
  if (!bgMusicSource || bgMusicSource.playbackState === 'finished') {
    bgMusicSource = audioContext.createBufferSource();
    bgMusicSource.buffer = bgMusic;
    bgMusicSource.loop = false;

    // Create a GainNode to control the volume
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.1;

    // Connect the source to the GainNode and the GainNode to the destination
    bgMusicSource.connect(gainNode);
    gainNode.connect(audioContext.destination);

    bgMusicSource.start();

    // Stop the music after 10 seconds
    setTimeout(() => {
      bgMusicSource.stop();
    }, 7200);
  }
}


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.148036179717224, lng: -118.14525452668002},
    zoom: 17,
    mapId: "dcdc3b5f84400377",
    mapTypeControl:false,
    fullscreenControl:false,
    streetViewControl:false
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  initializeAutocomplete($("#start")[0]);
  initializeAutocomplete($("#end")[0]);

  
  // Name + Lat.lng + imageurl + scaledSize width height
  const markers = [
    [
      "University of Phoenix",
      34.15112113329335, 
      -118.14327780253646,
      "img/star.svg",
      76,
      62,
    ],
    [
      "Pasadena Language Center",
      34.14640365349365, 
      -118.1507211511464,
      "img/pointer.svg",
      76,
      62,
    ],
    [
      "Hot 8 Yoga",
      34.146363016923004, 
      -118.14709217370068,
      "img/pipe.svg",
      76,
      62,
    ],
    [
      "[solidcore]",
      34.148525290969005, 
      -118.15084457370054,
      "img/hill_with_eyes.svg",
      76,
      62,
    ],
    [
      "Providence Christian College",
      34.14947327289324, 
      -118.14092940253637,
      "img/castle.svg",
      76,
      62,
    ],
    [
      "Buttercup",
      34.145305298754714, 
      -118.14310310253661,
      "img/ghosthouse.svg",
      76,
      62,
    ]
  ];
  
  for(let i = 0; i < markers.length; i++) {
    const currMarker = markers[i];

    const marker = new google.maps.Marker({
      position: {lat: currMarker[1], lng: currMarker[2]},
      map,
      title: currMarker[0],
      icon:{
        url: currMarker[3],
        scaledSize: new google.maps.Size(currMarker[4],currMarker[5])
      },
      animation:google.maps.Animation.DROP
    });

    const infowindow = new google.maps.InfoWindow({
      content: currMarker[0],
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  }

  const marker = new google.maps.Marker({
    position: {lat: 34.14465283170275, lng: -118.15105263756271},
    map,
    title: "SupplyFrame\'s Place (LA)",
    icon:{
      url: "img/yoshi_house.svg",
      scaledSize: new google.maps.Size(76,62)
    },
    animation:google.maps.Animation.DROP
  });

  const infowindow = new google.maps.InfoWindow({
    content:"BOOM! YOU GOT IT!     ",
  });

  marker.addListener("click", () => {
    infowindow.open(map, marker);
    playBgMusic();
  });
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

    playSound(powerupSound);

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

