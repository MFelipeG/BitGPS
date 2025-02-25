// Inicialização do mapa Leaflet
const map = L.map('map-container').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Banco de dados com 15 países e vários locais
const database = {
    "Brasil": [
        { "nome": "ATM Bitcoin São Paulo", "gps": "-23.5505,-46.6333", "endereco": "Av. Paulista, 1000, São Paulo, SP" },
        { "nome": "Loja Bitcoin Rio", "gps": "-22.9068,-43.1729", "endereco": "Rua das Laranjeiras, 500, Rio de Janeiro, RJ" }
    ],
    "Portugal": [
        { "nome": "ATM Bitcoin Lisboa", "gps": "38.7223,-9.1393", "endereco": "Praça do Comércio, Lisboa" },
        { "nome": "Loja Bitcoin Porto", "gps": "41.1579,-8.6291", "endereco": "Avenida dos Aliados, Porto" }
    ],
    "Estados Unidos": [
        { "nome": "ATM Bitcoin Nova York", "gps": "40.7128,-74.0060", "endereco": "Times Square, Nova York, NY" },
        { "nome": "Loja Bitcoin Los Angeles", "gps": "34.0522,-118.2437", "endereco": "Hollywood Blvd, Los Angeles, CA" }
    ],
    "Canadá": [
        { "nome": "ATM Bitcoin Toronto", "gps": "43.6532,-79.3832", "endereco": "Yonge Street, Toronto, ON" },
        { "nome": "Loja Bitcoin Vancouver", "gps": "49.2827,-123.1207", "endereco": "Granville St, Vancouver, BC" }
    ],
    "Reino Unido": [
        { "nome": "ATM Bitcoin Londres", "gps": "51.5074,-0.1278", "endereco": "Oxford Street, Londres" },
        { "nome": "Loja Bitcoin Manchester", "gps": "53.4808,-2.2426", "endereco": "Market Street, Manchester" }
    ],
    "Alemanha": [
        { "nome": "ATM Bitcoin Berlim", "gps": "52.5200,13.4050", "endereco": "Alexanderplatz, Berlim" }
    ],
    "França": [
        { "nome": "ATM Bitcoin Paris", "gps": "48.8566,2.3522", "endereco": "Champs-Élysées, Paris" }
    ],
    "Espanha": [
        { "nome": "ATM Bitcoin Madri", "gps": "40.4168,-3.7038", "endereco": "Gran Vía, Madri" }
    ],
    "Itália": [
        { "nome": "ATM Bitcoin Roma", "gps": "41.9028,12.4964", "endereco": "Piazza Venezia, Roma" }
    ],
    "Austrália": [
        { "nome": "ATM Bitcoin Sydney", "gps": "-33.8688,151.2093", "endereco": "George Street, Sydney" }
    ],
    "Japão": [
        { "nome": "ATM Bitcoin Tóquio", "gps": "35.6895,139.6917", "endereco": "Shibuya, Tóquio" }
    ],
    "China": [
        { "nome": "ATM Bitcoin Pequim", "gps": "39.9042,116.4074", "endereco": "Wangfujing, Pequim" }
    ],
    "México": [
        { "nome": "ATM Bitcoin Cidade do México", "gps": "19.4326,-99.1332", "endereco": "Paseo de la Reforma, Cidade do México" }
    ],
    "Argentina": [
        { "nome": "ATM Bitcoin Buenos Aires", "gps": "-34.6037,-58.3816", "endereco": "Avenida 9 de Julio, Buenos Aires" }
    ],
    "Rússia": [
        { "nome": "ATM Bitcoin Moscou", "gps": "55.7558,37.6173", "endereco": "Praça Vermelha, Moscou" }
    ]
};

// Adiciona os locais automaticamente no mapa ao carregar a página
Object.values(database).flat().forEach(location => {
    const [lat, lon] = location.gps.split(",");
    L.marker([lat, lon]).addTo(map).bindPopup(`
        <b>${location.nome}</b><br>
        <p>${location.endereco}</p>
        <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank">
            <button style="background-color:#d4af37; color:black; border:none; padding:5px; cursor:pointer;">
                Como Chegar
            </button>
        </a>
    `);
});

// Obtém a localização do usuário e marca no mapa
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        // Adiciona o marcador da localização do usuário
        L.marker([userLat, userLon], { icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png', 
            iconSize: [30, 30]
        })}).addTo(map)
        .bindPopup("<b>Você está aqui!</b>").openPopup();

        // Centraliza o mapa na localização do usuário
        map.setView([userLat, userLon], 10);
    }, () => {
        console.log("Não foi possível obter a localização do usuário.");
    });
} else {
    console.log("Geolocalização não suportada pelo navegador.");
}
