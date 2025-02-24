// Dados de ATMs e lojas de Bitcoin em 20 países
const database = {
    "USA": [
        { "name": "ATM Bitcoin New York", "gps": "40.7128,-74.0060" },
        { "name": "Bitcoin Store Los Angeles", "gps": "34.0522,-118.2437" },
        { "name": "Bitcoin ATM Miami", "gps": "25.7617,-80.1918" },
        { "name": "Bitcoin Exchange Chicago", "gps": "41.8781,-87.6298" }
    ],
    "UK": [
        { "name": "ATM Bitcoin London", "gps": "51.5074,-0.1278" },
        { "name": "Bitcoin Store Manchester", "gps": "53.4808,-2.2426" },
        { "name": "Bitcoin Kiosk Birmingham", "gps": "52.4862,-1.8904" }
    ],
    "Portugal": [
        { "name": "ATM Bitcoin Lisbon", "gps": "38.7223,-9.1393" },
        { "name": "Bitcoin Store Porto", "gps": "41.1579,-8.6291" },
        { "name": "Bitcoin ATM Faro", "gps": "37.0194,-7.9304" }
    ],
    "Brazil": [
        { "name": "ATM Bitcoin São Paulo", "gps": "-23.5505,-46.6333" },
        { "name": "Bitcoin Store Rio de Janeiro", "gps": "-22.9068,-43.1729" },
        { "name": "Bitcoin ATM Brasília", "gps": "-15.8267,-47.9218" }
    ],
    "Germany": [
        { "name": "Bitcoin ATM Berlin", "gps": "52.5200,13.4050" },
        { "name": "Bitcoin Store Munich", "gps": "48.1351,11.5820" }
    ],
    "France": [
        { "name": "Bitcoin ATM Paris", "gps": "48.8566,2.3522" },
        { "name": "Bitcoin Kiosk Marseille", "gps": "43.2965,5.3698" }
    ],
    "Spain": [
        { "name": "Bitcoin ATM Madrid", "gps": "40.4168,-3.7038" },
        { "name": "Bitcoin Store Barcelona", "gps": "41.3851,2.1734" }
    ],
    "Italy": [
        { "name": "Bitcoin ATM Rome", "gps": "41.9028,12.4964" },
        { "name": "Bitcoin Store Milan", "gps": "45.4642,9.1900" }
    ],
    "Canada": [
        { "name": "Bitcoin ATM Toronto", "gps": "43.651070,-79.347015" },
        { "name": "Bitcoin Store Vancouver", "gps": "49.2827,-123.1207" }
    ],
    "Australia": [
        { "name": "Bitcoin ATM Sydney", "gps": "-33.8688,151.2093" },
        { "name": "Bitcoin Store Melbourne", "gps": "-37.8136,144.9631" }
    ],
    "Argentina": [
        { "name": "Bitcoin ATM Buenos Aires", "gps": "-34.6037,-58.3816" }
    ],
    "Mexico": [
        { "name": "Bitcoin ATM Mexico City", "gps": "19.4326,-99.1332" }
    ],
    "Netherlands": [
        { "name": "Bitcoin ATM Amsterdam", "gps": "52.3676,4.9041" }
    ],
    "Switzerland": [
        { "name": "Bitcoin ATM Zurich", "gps": "47.3769,8.5417" }
    ],
    "Japan": [
        { "name": "Bitcoin ATM Tokyo", "gps": "35.6895,139.6917" }
    ],
    "South Korea": [
        { "name": "Bitcoin ATM Seoul", "gps": "37.5665,126.9780" }
    ],
    "Russia": [
        { "name": "Bitcoin ATM Moscow", "gps": "55.7558,37.6173" }
    ],
    "India": [
        { "name": "Bitcoin ATM Mumbai", "gps": "19.0760,72.8777" }
    ],
    "South Africa": [
        { "name": "Bitcoin ATM Johannesburg", "gps": "-26.2041,28.0473" }
    ]
};

// Inicializa o mapa
const map = L.map('map-container').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Função de busca
document.getElementById('search-button').addEventListener('click', function () {
    const country = document.getElementById('country-search').value.trim();
    const resultsContainer = document.getElementById('results-container');
    
    resultsContainer.innerHTML = ""; // Limpa os resultados anteriores
    map.eachLayer(layer => { if (layer instanceof L.Marker) map.removeLayer(layer); });

    if (database[country]) {
        database[country].forEach(location => {
            const [lat, lng] = location.gps.split(",").map(Number);
            const marker = L.marker([lat, lng]).addTo(map)
                .bindPopup(`<b>${location.name}</b><br><a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank">Get Directions</a>`);
            
            resultsContainer.innerHTML += `<p>${location.name} - <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank">View on Google Maps</a></p>`;
        });

        // Corrigido: Agora o mapa foca no primeiro local encontrado
        const [lat, lng] = database[country][0].gps.split(",").map(Number);
        map.setView([lat, lng], 10);
    } else {
        resultsContainer.innerHTML = `<p>No locations found for ${country}.</p>`;
    }
});
