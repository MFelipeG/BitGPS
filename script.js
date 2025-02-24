// Inicialização do Three.js para o globo 3D
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, 500);
document.getElementById('globe-container').appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(5, 32, 32);
const textureLoader = new THREE.TextureLoader();
textureLoader.load(
    'globe_texture.jpg', // Substitua pelo caminho da sua textura
    function (texture) {
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);
    },
    undefined,
    function (err) {
        console.error('Ocorreu um erro ao carregar a textura.', err);
    }
);

camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.005; // Rotação automática
    renderer.render(scene, camera);
}
animate();

// Banco de dados
const database = {
    "Brasil": [
        { "nome": "ATM Bitcoin São Paulo 1", "gps": "-23.5505,-46.6333" },
        { "nome": "Loja Bitcoin Rio 1", "gps": "-22.9068,-43.1729" },
        { "nome": "ATM Bitcoin Curitiba 1", "gps": "-25.4296,-49.2719" }
    ],
    "Portugal": [
        { "nome": "ATM Bitcoin Lisboa 1", "gps": "38.7223,-9.1393" },
        { "nome": "Loja Bitcoin Porto 1", "gps": "41.1579,-8.6291" },
        { "nome": "ATM Bitcoin Coimbra 1", "gps": "40.2111,-8.4116" }
    ],
    "Estados Unidos": [
        { "nome": "ATM Bitcoin Nova York 1", "gps": "40.7128,-74.0060" },
        { "nome": "Loja Bitcoin Los Angeles 1", "gps": "34.0522,-118.2437" },
        { "nome": "ATM Bitcoin Chicago 1", "gps": "41.8781,-87.6298" }
    ],
    "Canadá": [
        { "nome": "ATM Bitcoin Toronto 1", "gps": "43.6532,-79.3832" },
        { "nome": "Loja Bitcoin Vancouver 1", "gps": "49.2827,-123.1207" },
        { "nome": "ATM Bitcoin Montreal 1", "gps": "45.5017,-73.5673" }
    ],
    "Reino Unido": [
        { "nome": "ATM Bitcoin Londres 1", "gps": "51.5074,-0.1278" },
        { "nome": "Loja Bitcoin Manchester 1", "gps": "53.4808,-2.2426" },
        { "nome": "ATM Bitcoin Edimburgo 1", "gps": "55.9533,-3.1883" }
    ],
    "Austrália": [
        { "nome": "ATM Bitcoin Sydney 1", "gps": "-33.8688,151.2093" },
        { "nome": "Loja Bitcoin Melbourne 1", "gps": "-37.8136,144.9631" },
        { "nome": "ATM Bitcoin Brisbane 1", "gps": "-27.4698,153.0251" }
    ],
    "Japão": [
        { "nome": "ATM Bitcoin Tóquio 1", "gps": "35.6895,139.6917" },
        { "nome": "Loja Bitcoin Osaka 1", "gps": "34.6937,135.5023" },
        { "nome": "ATM Bitcoin Quioto 1", "gps": "35.0116,135.7681" }
    ],
    "Alemanha": [
        { "nome": "ATM Bitcoin Berlim 1", "gps": "52.5200,13.4050" },
        { "nome": "Loja Bitcoin Munique 1", "gps": "48.1351,11.5820" },
        { "nome": "ATM Bitcoin Frankfurt 1", "gps": "50.1109,8.6821" }
    ],
    "França": [
        { "nome": "ATM Bitcoin Paris 1", "gps": "48.8566,2.3522" },
        { "nome": "Loja Bitcoin Lyon 1", "gps": "45.7640,4.8357" },
        { "nome": "ATM Bitcoin Marselha 1", "gps": "43.2965,5.3698" }
    ],
    "Itália": [
        { "nome": "ATM Bitcoin Roma 1", "gps": "41.9028,12.4964" },
        { "nome": "Loja Bitcoin Milão 1", "gps": "45.4654,9.1859" },
        { "nome": "ATM Bitcoin Nápoles 1", "gps": "40.8522,14.2681" }
    ],
    "Espanha": [
        { "nome": "ATM Bitcoin Madrid 1", "gps": "40.4168,-3.7038" },
        { "nome": "Loja Bitcoin Barcelona 1", "gps": "41.3851,2.1734" },
        { "nome": "ATM Bitcoin Valência 1", "gps": "39.4699,-0.3774" }
    ],
    "Argentina": [
        { "nome": "ATM Bitcoin Buenos Aires 1", "gps": "-34.6037,-58.3816" },
        { "nome": "Loja Bitcoin Córdoba 1", "gps": "-31.4170,-64.1833" },
        { "nome": "ATM Bitcoin Rosário 1", "gps": "-32.9468,-60.6393" }
    ],
    "México": [
        { "nome": "ATM Bitcoin Cidade do México 1", "gps": "19.4326,-99.1332" },
        { "nome": "Loja Bitcoin Guadalajara 1", "gps": "20.6597,-103.3496" },
        { "nome": "ATM Bitcoin Monterrey 1", "gps": "25.6866,-100.3161" }
    ],
    "Índia": [
        { "nome": "ATM Bitcoin Nova Deli 1", "gps": "28.6139,77.2090" },
        { "nome": "Loja Bitcoin Mumbai 1", "gps": "19.0760,72.8777" },
        { "nome": "ATM Bitcoin Bangalore 1", "gps": "12.9716,77.5946" }
    ],
    "China": [
        { "nome": "ATM Bitcoin Pequim 1", "gps": "39.9042,116.4074" },
        { "nome": "Loja Bitcoin Xangai 1", "gps": "31.2304,121.4737" },
        
