document.addEventListener("DOMContentLoaded", function () {
    // Verifica se o container do mapa existe antes de inicializar
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) {
        console.error("Erro: Elemento #map-container não encontrado!");
        return;
    }

    // Inicializa o mapa
    const map = L.map('map-container').setView([0, 0], 2);
    
    // Adiciona o tile layer do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    console.log("Mapa carregado com sucesso!");

    // Banco de dados de locais Bitcoin
    const database = {
        "Brasil": [
            { "nome": "ATM Bitcoin São Paulo", "gps": "-23.5505,-46.6333" },
            { "nome": "Loja Bitcoin Rio de Janeiro", "gps": "-22.9068,-43.1729" },
            { "nome": "ATM Bitcoin Curitiba", "gps": "-25.4296,-49.2719" }
        ],
        "Portugal": [
            { "nome": "ATM Bitcoin Lisboa", "gps": "38.7223,-9.1393" },
            { "nome": "Loja Bitcoin Porto", "gps": "41.1579,-8.6291" },
            { "nome": "ATM Bitcoin Coimbra", "gps": "40.2111,-8.4116" }
        ]
    };

    // Referências dos elementos da interface
    const searchInput = document.getElementById('country-search');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('results-container');

    // Função para buscar locais pelo país
    function searchCountry() {
        const country = searchInput.value.trim();
        resultsContainer.innerHTML = ""; // Limpa os resultados anteriores

        if (database[country]) {
            resultsContainer.innerHTML = `<h3>Locais em ${country}:</h3>`;

            database[country].forEach(location => {
                const [lat, lng] = location.gps.split(",");
                const marker = L.marker([parseFloat(lat), parseFloat(lng)]).addTo(map)
                    .bindPopup(`<b>${location.nome}</b>`);

                const resultItem = document.createElement("p");
                resultItem.innerHTML = `<strong>${location.nome}</strong> - <button onclick="focusOnMap(${lat}, ${lng})">Ver no mapa</button>`;
                resultsContainer.appendChild(resultItem);
            });

            console.log(`Locais carregados para ${country}`);
        } else {
            resultsContainer.innerHTML = `<p>Nenhum local encontrado para "${country}".</p>`;
        }
    }

    // Adiciona evento ao botão de busca
    searchButton.addEventListener("click", searchCountry);

    // Função para centralizar o mapa em um ponto específico
    window.focusOnMap = function(lat, lng) {
        map.setView([lat, lng], 12);
    };
});
