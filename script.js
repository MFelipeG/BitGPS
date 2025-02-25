// Inicializa o mapa Leaflet
const map = L.map('map-container').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let markers = [];

// Banco de dados com ATMs e lojas de Bitcoin (20 países)
const database = {
    "Brasil": [
        { "nome": "ATM Bitcoin São Paulo", "gps": "-23.5505,-46.6333", "endereco": "Av. Paulista, 1000, São Paulo, SP" },
        { "nome": "Bitcoin Store Rio", "gps": "-22.9068,-43.1729", "endereco": "Rua das Laranjeiras, 500, Rio de Janeiro, RJ" }
    ],
    "Portugal": [
        { "nome": "ATM Bitcoin Lisboa", "gps": "38.7223,-9.1393", "endereco": "Praça do Comércio, 50, Lisboa" },
        { "nome": "Bitcoin Store Porto", "gps": "41.1579,-8.6291", "endereco": "Avenida dos Aliados, 200, Porto" }
    ],
    "Espanha": [
        { "nome": "ATM Bitcoin Madri", "gps": "40.4168,-3.7038", "endereco": "Gran Via, 450, Madri" },
        { "nome": "Bitcoin Store Barcelona", "gps": "41.3851,2.1734", "endereco": "Passeig de Gràcia, 600, Barcelona" }
    ],
    "França": [
        { "nome": "ATM Bitcoin Paris", "gps": "48.8566,2.3522", "endereco": "Champs-Élysées, 150, Paris" },
        { "nome": "Bitcoin Store Lyon", "gps": "45.7640,4.8357", "endereco": "Place Bellecour, 220, Lyon" }
    ],
    "Itália": [
        { "nome": "ATM Bitcoin Roma", "gps": "41.9028,12.4964", "endereco": "Via del Corso, 100, Roma" },
        { "nome": "Bitcoin Store Milão", "gps": "45.4642,9.1900", "endereco": "Piazza del Duomo, 250, Milão" }
    ],
    "Alemanha": [
        { "nome": "ATM Bitcoin Berlim", "gps": "52.5200,13.4050", "endereco": "Alexanderplatz, 300, Berlim" },
        { "nome": "Bitcoin Store Frankfurt", "gps": "50.1109,8.6821", "endereco": "Zeil, 400, Frankfurt" }
    ],
    "Reino Unido": [
        { "nome": "ATM Bitcoin Londres", "gps": "51.5074,-0.1278", "endereco": "Oxford Street, 300, Londres" },
        { "nome": "Bitcoin Store Manchester", "gps": "53.4808,-2.2426", "endereco": "Piccadilly Gardens, 400, Manchester" }
    ],
    "Holanda": [
        { "nome": "ATM Bitcoin Amsterdã", "gps": "52.3676,4.9041", "endereco": "Dam Square, 500, Amsterdã" }
    ],
    "Estados Unidos": [
        { "nome": "ATM Bitcoin Nova York", "gps": "40.7128,-74.0060", "endereco": "Times Square, 500, Nova York, NY" },
        { "nome": "Bitcoin Store Los Angeles", "gps": "34.0522,-118.2437", "endereco": "Hollywood Blvd, 1000, Los Angeles, CA" }
    ],
    "Canadá": [
        { "nome": "ATM Bitcoin Toronto", "gps": "43.6532,-79.3832", "endereco": "Yonge Street, 600, Toronto" }
    ],
    "Austrália": [
        { "nome": "ATM Bitcoin Sydney", "gps": "-33.8688,151.2093", "endereco": "George Street, 1000, Sydney" }
    ],
    "Argentina": [
        { "nome": "ATM Bitcoin Buenos Aires", "gps": "-34.6037,-58.3816", "endereco": "Avenida Corrientes, 750, Buenos Aires" }
    ]
};

// Função para exibir locais no mapa
function showLocations(country) {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    const locations = database[country];
    if (!locations) {
        alert("País não encontrado.");
        return;
    }

    locations.forEach(location => {
        const [lat, lon] = location.gps.split(",").map(Number);
        const marker = L.marker([lat, lon]).addTo(map);

        const popupContent = `
            <b>${location.nome}</b><br>
            <p>${location.endereco}</p>
            <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank">
                <button style="background-color:#d4af37; color:black; border:none; padding:5px; cursor:pointer;">
                    Como Chegar
                </button>
            </a>
            <button onclick="addToFavorites('${location.nome}', '${location.endereco}', '${lat},${lon}')"
                style="margin-top:5px; background-color:#4CAF50; color:white; border:none; padding:5px; cursor:pointer;">
                Favoritar
            </button>
        `;

        marker.bindPopup(popupContent);
        markers.push(marker);
    });

    map.fitBounds(locations.map(loc => loc.gps.split(",").map(Number)));
}

// Função para adicionar aos Favoritos
function addToFavorites(nome, endereco, gps) {
    const favoritesList = document.getElementById("favorites-list");

    if ([...favoritesList.children].some(li => li.dataset.gps === gps)) {
        alert("Esse local já está nos favoritos.");
        return;
    }

    const li = document.createElement("li");
    li.dataset.gps = gps;
    li.innerHTML = `${nome} - ${endereco} <button onclick="removeFavorite(this)">Remover</button>`;
    favoritesList.appendChild(li);
}

// Função para remover dos Favoritos
function removeFavorite(button) {
    button.parentElement.remove();
}

// Evento de busca
document.getElementById("search-button").addEventListener("click", () => {
    const country = document.getElementById("country-search").value.trim();
    if (country) {
        showLocations(country);
    } else {
        alert("Digite um país para buscar.");
    }
});

// Exibir todos os marcadores inicialmente
Object.keys(database).forEach(showLocations);
