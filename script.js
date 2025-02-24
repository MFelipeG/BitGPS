// Inicialização do mapa Leaflet
const map = L.map('map-container').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Banco de dados com 25 países e múltiplos endereços (exemplo com alguns países)
const database = {
    "Brasil": [
        { "nome": "ATM Bitcoin São Paulo 1", "gps": "-23.5505,-46.6333", "endereco": "Av. Paulista, 1000, São Paulo, SP" },
        { "nome": "Loja Bitcoin Rio 1", "gps": "-22.9068,-43.1729", "endereco": "Rua das Laranjeiras, 500, Rio de Janeiro, RJ" },
        { "nome": "ATM Bitcoin Curitiba 1", "gps": "-25.4296,-49.2719", "endereco": "Praça Tiradentes, 300, Curitiba, PR" }
    ],
    "Portugal": [
        { "nome": "ATM Bitcoin Lisboa 1", "gps": "38.7223,-9.1393", "endereco": "Praça do Comércio, Lisboa" },
        { "nome": "Loja Bitcoin Porto 1", "gps": "41.1579,-8.6291", "endereco": "Avenida dos Aliados, Porto" },
        { "nome": "ATM Bitcoin Coimbra 1", "gps": "40.2111,-8.4116", "endereco": "Praça da República, Coimbra" }
    ],
    "Estados Unidos": [
        { "nome": "ATM Bitcoin Nova York 1", "gps": "40.7128,-74.0060", "endereco": "Times Square, Nova York, NY" },
        { "nome": "Loja Bitcoin Los Angeles 1", "gps": "34.0522,-118.2437", "endereco": "Hollywood Blvd, Los Angeles, CA" },
        { "nome": "ATM Bitcoin Chicago 1", "gps": "41.8781,-87.6298", "endereco": "Millennium Park, Chicago, IL" }
    ],
    // Adicione mais países conforme necessário
};

// Função para exibir locais no mapa
function showLocations(country) {
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    const locations = database[country];
    if (!locations) {
        alert("País não encontrado no banco de dados.");
        return;
    }

    locations.forEach(location => {
        const [lat, lon] = location.gps.split(",");
        const marker = L.marker([lat, lon]).addTo(map);

        // Criar botão "Como Chegar"
        const popupContent = `
            <b>${location.nome}</b><br>
            <p>${location.endereco}</p>
            <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank">
                <button style="background-color:#d4af37; color:black; border:none; padding:5px; cursor:pointer;">
                    Como Chegar
                </button>
            </a>
        `;

        marker.bindPopup(popupContent);
    });

    // Ajustar a visão do mapa para os locais encontrados
    const bounds = locations.map(loc => loc.gps.split(",").map(Number));
    map.fitBounds(bounds);
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
