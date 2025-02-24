// Dados de ATMs e lojas de Bitcoin em vários países
const database = {
    "Brasil": [
        { "name": "ATM Bitcoin São Paulo", "gps": "-23.5505,-46.6333" },
        { "name": "Bitcoin Store Rio de Janeiro", "gps": "-22.9068,-43.1729" }
    ],
    "Portugal": [
        { "name": "ATM Bitcoin Lisboa", "gps": "38.7223,-9.1393" },
        { "name": "Bitcoin Store Porto", "gps": "41.1579,-8.6291" }
    ],
    "Estados Unidos": [
        { "name": "ATM Bitcoin Nova York", "gps": "40.7128,-74.0060" },
        { "name": "Bitcoin Store Los Angeles", "gps": "34.0522,-118.2437" }
    ],
    "Reino Unido": [
        { "name": "ATM Bitcoin Londres", "gps": "51.5074,-0.1278" },
        { "name": "Bitcoin Store Manchester", "gps": "53.4808,-2.2426" }
    ],
    "França": [
        { "name": "ATM Bitcoin Paris", "gps": "48.8566,2.3522" },
        { "name": "Bitcoin Store Lyon", "gps": "45.7640,4.8357" }
    ],
    "Alemanha": [
        { "name": "ATM Bitcoin Berlim", "gps": "52.5200,13.4050" },
        { "name": "Bitcoin Store Munique", "gps": "48.1351,11.5820" }
    ],
    "Espanha": [
        { "name": "ATM Bitcoin Madri", "gps": "40.4168,-3.7038" },
        { "name": "Bitcoin Store Barcelona", "gps": "41.3851,2.1734" }
    ],
    "Itália": [
        { "name": "ATM Bitcoin Roma", "gps": "41.9028,12.4964" },
        { "name": "Bitcoin Store Milão", "gps": "45.4642,9.1900" }
    ],
    "México": [
        { "name": "ATM Bitcoin Cidade do México", "gps": "19.4326,-99.1332" },
        { "name": "Bitcoin Store Cancún", "gps": "21.1619,-86.8515" }
    ],
    "Canadá": [
        { "name": "ATM Bitcoin Toronto", "gps": "43.6510,-79.3470" },
        { "name": "Bitcoin Store Vancouver", "gps": "49.2827,-123.1207" }
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
                .bindPopup(`<b>${location.name}</b><br><a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank">Obter Direções</a>`);
            
            resultsContainer.innerHTML += `<p>${location.name} - <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank">Ver no Google Maps</a></p>`;
        });

        // Centraliza o mapa na primeira localização encontrada
        const [lat, lng] = database[country][0].gps.split(",").map(Number);
        map.setView([lat, lng], 10);
    } else {
        resultsContainer.innerHTML = `<p>Nenhuma localização encontrada para ${country}.</p>`;
    }
});
