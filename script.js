// Inicialização do Three.js para o globo 3D
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, 500);
document.getElementById('globe-container').appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(5, 32, 32);
const texture = new THREE.TextureLoader().load('caminho/para/textura-do-globo.jpg'); // Substitua pelo caminho da sua textura
const material = new THREE.MeshBasicMaterial({ map: texture });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.005; // Rotação automática
    renderer.render(scene, camera);
}
animate();

// Lógica de pesquisa e exibição de resultados (a ser implementada)
document.getElementById('search-button').addEventListener('click', () => {
    const country = document.getElementById('country-search').value;
    // Aqui você buscaria os dados do país e exibiria em results-container
    console.log(`Pesquisando por: ${country}`);
});
