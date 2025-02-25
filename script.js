// Inicialização do mapa Leaflet
const map = L.map('map-container').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Banco de dados com 15 países e vários locais por estado/região
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
    "Canadá": [
        { "nome": "ATM Bitcoin Toronto 1", "gps": "43.6532,-79.3832", "endereco": "Yonge Street, Toronto, ON" },
        { "nome": "Loja Bitcoin Vancouver 1", "gps": "49.2827,-123.1207", "endereco": "Granville St, Vancouver, BC" }
    ],
    "Reino Unido": [
        { "nome": "ATM Bitcoin Londres 1", "gps": "51.5074,-0.1278", "endereco": "Oxford Street, Londres" },
        { "nome": "Loja Bitcoin Manchester 1", "gps": "53.4808,-2.2426", "endereco": "Market Street, Manchester" }
    ],
    "Alemanha": [
        { "nome": "ATM Bitcoin Berlim 1", "gps": "52.5200,13.4050", "endereco": "Alexanderplatz, Berlim" },
        { "nome": "Loja Bitcoin Munique 1", "gps": "48.1351,11.5820", "endereco": "Marienplatz, Munique" }
    ],
    "França": [
        { "nome": "ATM Bitcoin Paris 1", "gps": "48.8566,2.3522", "endereco": "Champs-Élysées, Paris" },
        { "nome": "Loja Bitcoin Marselha 1", "gps": "43.2965,5.3698", "endereco": "Vieux-Port, Marselha" }
    ],
    "Espanha": [
        { "nome": "ATM Bitcoin Madri 1", "gps": "40.4168,-3.7038", "endereco": "Gran Vía, Madri" },
        { "nome": "Loja Bitcoin Barcelona 1", "gps": "41.3851,2.1734", "endereco": "La Rambla, Barcelona" }
    ],
    "Itália": [
        { "nome": "ATM Bitcoin Roma 1", "gps": "41.9028,12.4964", "endereco": "Piazza Venezia, Roma" },
        { "nome": "Loja Bitcoin Milão 1", "gps": "45.4642,9.1900", "endereco": "Corso Buenos Aires, Milão" }
    ],
    "Austrália": [
        { "nome": "ATM Bitcoin Sydney 1", "gps": "-33.8688,151.2093", "endereco": "George Street, Sydney" },
        { "nome": "Loja Bitcoin Melbourne 1", "gps": "-37.8136,144.9631", "endereco": "Flinders Street, Melbourne" }
    ],
    "Japão": [
        { "nome": "ATM Bitcoin Tóquio 1", "gps": "35.6895,139.6917", "endereco": "Shibuya, Tóquio" },
        { "nome": "Loja Bitcoin Osaka 1", "gps": "34.6937,135.5022", "endereco": "Dotonbori, Osaka" }
    ],
    "China": [
        { "nome": "ATM Bitcoin Pequim 1", "gps": "39.9042,116.4074", "endereco": "Wangfujing, Pequim" },
        { "nome": "Loja Bitcoin Xangai 1", "gps": "31.2304,121.4737", "endereco": "The Bund, Xangai" }
    ],
    "México": [
        { "nome": "ATM Bitcoin Cidade do México 1", "gps": "19.4326,-99.1332", "endereco": "Paseo de la Reforma, Cidade do México" },
        { "nome": "Loja Bitcoin Guadalajara 1", "gps": "20.6597,-103.3496", "endereco": "Avenida Chapultepec, Guadalajara" }
    ],
    "Argentina": [
        { "nome": "ATM Bitcoin Buenos Aires 1", "gps": "-34.6037,-58.3816", "endereco": "Avenida 9 de Julio, Buenos Aires" },
        { "nome": "Loja Bitcoin Córdoba 1", "gps": "-31.4201,-64.1888", "endereco": "Cañada de Córdoba, Córdoba" }
    ],
    "Rússia": [
        { "nome": "ATM Bitcoin Moscou 1", "gps": "55.7558,37.6173", "endereco": "Praça Vermelha, Moscou" },
        { "nome": "Loja Bitcoin São Petersburgo 1", "gps": "59.9343,30.3351", "endereco": "Nevsky Prospekt, São Petersburgo" }
    ]
};

// Agora, todas as agulhas aparecem no mapa automaticamente
Object.values(database).flat().forEach(addMarker);

function addMarker(location) {
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
            }
