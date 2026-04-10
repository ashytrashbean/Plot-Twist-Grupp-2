import { getBaseUrl } from "./src/utils/api.js";

const form = document.querySelector("#add-plant-form");
const plantName = document.querySelector("#plant-name");
const plantType = document.querySelector("#plant-type");
const plantImage = document.querySelector("#plant-image");
const plantLocation = document.querySelector("#plant-location");
const plantTime = document.querySelector("#plant-time");
const brightnessLevel = document.querySelector("#brightnessLevel");


let pinIcon = L.icon({
    iconUrl: './images/pin-logo.png',

    iconSize:     [38, 50], // size of the icon
    iconAnchor:   [19, 50], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -50] // point from which the popup should open relative to the iconAnchor
});

// inside the setView([latitude, longitude], map view distance)
const map =L.map('map').setView([61.52, 12.74], 4);

// This is purely the map object itself
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Creates the search function
L.Control.geocoder().addTo(map);

const mockLibraries = [
    {
        city: "Stockholm",
        library: "Stockholm Public Library (Asplundhuset)",
        coordinates:[59.3434,18.0543]
    },
    {
        city: "Stockholm",
        library: "National Library of Sweden (Kungliga bibl.)",
        coordinates:[59.3384, 18.0722]
    },
    {
        city: "Uppsala",
        library: "Uppsala Public Library",
        coordinates:[59.8604, 17.6366]
    },
    {
        city: "Uppsala",
        library: "Carolina Rediviva (Uppsala University)",
        coordinates:[59.8549, 17.6311]
    },
    {
        city: "Västerås",
        library: "Västerås City Library",
        coordinates:[59.6119, 16.5448]
    },
]

function GetMeetups(map){
    const markers = new L.MarkerClusterGroup();
    const markerMap= {};

    mockLibraries.forEach(biblio =>{
        const marker = L.marker(biblio.coordinates, {icon: pinIcon});

        marker.bindPopup(`<b>${biblio.library}</b>`)
        markers.addLayer(marker);
        markerMap[biblio.library] = marker;
    })
    map.addLayer(markers)
}

GetMeetups(map);


form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPlant = {
        name: plantName.value.trim(),
        image: plantImage.value.trim(),
        species: plantType.value.trim(),
        lightLevels: brightnessLevel.value,
        ownerId: "65f1a2b3c4d5e6f7a8b9c001",
        coordinates: ["59.858", "17.644"], // Placeholder coordinates
        meetingTime: plantTime.value,
    };

    console.log("Submitting new plant:", newPlant);

    try {
    const response = await fetch(getBaseUrl() + "plants", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlant),
    });

    console.log("Status:", response.status);

    const text = await response.text();
    console.log("Response from backend:", text);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    alert("Plant added successfully!");
    form.reset();
    } catch (error) {
        console.error("Error adding plant:", error);
        alert("An error occurred. Please try again.");
    }
});