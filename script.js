// Bitcoin ATM and Store Database
const database = {
    "USA": [
        { "name": "ATM Bitcoin New York", "gps": "40.7128,-74.0060" },
        { "name": "Bitcoin Store Los Angeles", "gps": "34.0522,-118.2437" }
    ],
    "UK": [
        { "name": "ATM Bitcoin London", "gps": "51.5074,-0.1278" },
        { "name": "Bitcoin Store Manchester", "gps": "53.4808,-2.2426" }
    ],
    "Portugal": [
        { "name": "ATM Bitcoin Lisbon", "gps": "38.7223,-9.1393" },
        { "name": "Bitcoin Store Porto", "gps": "41.1579,-8.6291" }
    ]
};

// Initialize map
const map = L.map('map-container').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Search function
document.getElementById('search-button').addEventListener('click', function () {
    const country = document.getElementById('country-search').value.trim();
    const resultsContainer = document.getElementById('results-container');
    
    resultsContainer.innerHTML = ""; // Clear previous results
    map.eachLayer(layer => { if (layer instanceof L.Marker) map.removeLayer(layer); });

    if (database[country]) {
        database[country].forEach(location => {
            const [lat, lng] = location.gps.split(",");
            const marker = L.marker([lat, lng]).addTo(map)
                .bindPopup(`<b>${location.name}</b><br><a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank">Get Directions</a>`);
            
            resultsContainer.innerHTML += `<p>${location.name} - <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank">View on Google Maps</a></p>`;
        });

        map.setView(database[country][0].gps.split(","), 10); 
    } else {
        resultsContainer.innerHTML = `<p>No locations found for ${country}.</p>`;
    }
});
