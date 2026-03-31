// inside the setView([latitude, longitude], map view distance)
const map =L.map('map').setView([61.52, 12.74], 4);

// This is purely the map object itself
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// This function runs every single time the map stops moving to see latitude and longitude
map.on('moveend', function() {
    var center = map.getCenter();
    console.log(`Map stopped at: lat: ${center.lat.toFixed(2)}, long: ${center.lng.toFixed(2)}`);
});

// Creates the search function
L.Control.geocoder().addTo(map);
