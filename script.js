document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('map-container').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const database = {
        "Brasil": [
            { "nome": "ATM Bitcoin São Paulo 1", "gps": "-23.5505,-46.6333", "endereco": "Avenida Paulista, São Paulo - SP" },
            { "nome": "Loja Bitcoin Rio 1", "gps": "-22.9068,-43.1729", "endereco": "Copacabana, Rio de Janeiro - RJ" },
            { "nome": "ATM Bitcoin Curitiba 1", "gps": "-25.4296,-49.2719", "endereco": "Centro, Curitiba - PR" }
        ],
        "Portugal": [
            { "nome": "ATM Bitcoin Lisboa 1", "gps": "38.7223,-9.1393", "endereco": "Baixa, Lisboa" },
            { "nome": "Loja Bitcoin Porto 1", "gps": "41.1579,-8.6291", "endereco": "Centro Histórico, Porto" },
            { "nome": "ATM Bitcoin Coimbra 1", "gps": "40.2111,-8.4116", "endereco": "Praça 8 de Maio, Coimbra" }
        ],
        "Estados Unidos": [
            { "nome": "ATM Bitcoin Nova York 1", "gps": "40.7128,-74.0060", "endereco": "Times Square, Nova York" },
            { "nome": "Loja Bitcoin Los Angeles 1", "gps": "34.0522,-118.2437", "endereco": "Hollywood Blvd, Los Angeles" },
            { "nome": "ATM Bitcoin Chicago 1", "gps": "41.8781,-87.6298", "endereco": "The Loop, Chicago" }
        ],
        "Canadá": [
            { "nome": "ATM Bitcoin Toronto 1", "gps": "43.6532,-79.3832", "endereco": "Downtown Toronto, Canadá" },
            { "nome": "Loja Bitcoin Vancouver 1", "gps": "49.2827,-123.1207", "endereco": "Granville Street, Vancouver" },
            { "nome": "ATM Bitcoin Montreal 1", "gps": "45.5017,-73.5673", "endereco": "Rue Sainte-Catherine, Montreal" }
        ],
        "Reino Unido": [
            { "nome": "ATM Bitcoin Londres 1", "gps": "51.5074,-0.1278", "endereco": "Oxford Street, Londres" },
            { "nome": "Loja Bitcoin Manchester 1", "gps": "53.4808,-2.2426", "endereco": "Deansgate, Manchester" },
            { "nome": "ATM Bitcoin Edimburgo 1", "gps": "55.9533,-3.1883", "endereco": "Royal Mile, Edimburgo" }
        ],
        "Austrália": [
            { "nome": "ATM Bitcoin Sydney 1", "gps": "-33.8688,151.2093", "endereco": "Circular Quay, Sydney" },
            { "nome": "Loja Bitcoin Melbourne 1", "gps": "-37.8136,144.9631", "endereco": "Bourke Street, Melbourne" },
            { "nome": "ATM Bitcoin Brisbane 1", "gps": "-27.4698,153.0251", "endereco": "Queen Street, Brisbane" }
        ],
        "Japão": [
            { "nome": "ATM Bitcoin Tóquio 1", "gps": "35.6895,139.6917", "endereco": "Shibuya, Tóquio" },
            { "nome": "Loja Bitcoin Osaka 1", "gps": "34.6937,135.5023", "endereco": "Dotonbori, Osaka" },
            { "nome": "ATM Bitcoin Quioto 1", "gps": "35.0116,135.7681", "endereco": "Gion, Quioto" }
        ],
        "Alemanha": [
            { "nome": "ATM Bitcoin Berlim 1", "gps": "52.5200,13.4050", "endereco": "Alexanderplatz, Berlim" },
            { "nome": "Loja Bitcoin Munique 1", "gps": "48.1351,11.5820", "endereco": "Marienplatz, Munique" },
            { "nome": "ATM Bitcoin Frankfurt 1", "gps": "50.1109,8.6821", "endereco": "Main Tower, Frankfurt" }
        ],
        "França": [
            { "nome": "ATM Bitcoin Paris 1", "gps": "48.8566,2.3522", "endereco": "Champs-Élysées, Paris" },
            { "nome": "Loja Bitcoin Lyon 1", "gps": "45.7640,4.8357", "endereco": "Place Bellecour, Lyon" },
            { "nome": "ATM Bitcoin Marselha 1", "gps": "43.2965,5.3698", "endereco": "Vieux-Port, Marselha" }
        ]
    };

    const searchInput = document.getElementById('country-search');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('results-container');

    function searchCountry() {
        const country = searchInput.value.trim();
        resultsContainer.innerHTML = "";

        if (database[country]) {
            resultsContainer.innerHTML = `<h3>Locais em ${country}:</h3>`;
            
            database[country].forEach(location => {
                const [lat, lng] = location.gps.split(",");
                const marker = L.marker([parseFloat(lat), parseFloat(lng)]).addTo(map)
                    .bindPopup(`<b>${location.nome}</b><br>${location.endereco}`);

                const resultItem = document.createElement("div");
                resultItem.innerHTML = `
                    <strong>${location.nome}</strong>  
                    <p>${location.endereco}</p>
                    <button onclick="focusOnMap(${lat}, ${lng}, '${location.endereco}')">Mostrar no mapa</button>
                    <hr>
                `;
                resultsContainer.appendChild(resultItem);
            });

        } else {
            resultsContainer.innerHTML = `<p>Nenhum local encontrado para "${country}".</p>`;
        }
    }

    searchButton.addEventListener("click", searchCountry);

    window.focusOnMap = function(lat, lng, endereco) {
        map.setView([lat, lng], 12);
        alert(`Endereço: ${endereco}`);
    };
});
