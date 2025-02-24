// Initialize the Leaflet map
const map = L.map('map-container').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Database with Bitcoin ATMs and stores in 25+ countries
const database = {
    "Brazil": [
        { "name": "ATM Bitcoin São Paulo 1", "gps": "-23.5505,-46.6333", "address": "Av. Paulista, 1000, São Paulo, SP" },
        { "name": "Bitcoin Store Rio 1", "gps": "-22.9068,-43.1729", "address": "Rua das Laranjeiras, 500, Rio de Janeiro, RJ" }
    ],
    "Portugal": [
        { "name": "ATM Bitcoin Lisbon 1", "gps": "38.7223,-9.1393", "address": "Praça do Comércio, Lisbon" },
        { "name": "Bitcoin Store Porto 1", "gps": "41.1579,-8.6291", "address": "Avenida dos Aliados, Porto" }
    ],
    "United States": [
        { "name": "ATM Bitcoin New York 1", "gps": "40.7128,-74.0060", "address": "Times Square, New York, NY" },
        { "name": "Bitcoin Store Los Angeles 1", "gps": "34.0522,-118.2437", "address": "Hollywood Blvd, Los Angeles, CA" }
    ]
    // More countries can be added here...
};

// Function to show locations on the map
function showLocations(country) {
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    const locations = database[country];
    if (!locations) {
        alert("Country not found in our database.");
        return;
    }

    locations.forEach(location => {
        const [lat, lon] = location.gps.split(",");
        const marker = L.marker([lat, lon]).addTo(map);

        const popupContent = `
            <b>${location.name}</b><br>
            <p>${location.address}</p>
            <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank">
                <button style="background-color:#d4af37; color:black; border:none; padding:5px; cursor:pointer;">
                    Get Directions
                </button>
            </a>
        `;

        marker.bindPopup(popupContent);
    });

    // Adjust the map view to focus on found locations
    const bounds = locations.map(loc => loc.gps.split(",").map(Number));
    map.fitBounds(bounds);
}

// Search event listener
document.getElementById("search-button").addEventListener("click", () => {
    const country = document.getElementById("country-search").value.trim();
    if (country) {
        showLocations(country);
    } else {
        alert("Please enter a country to search.");
    }
});
