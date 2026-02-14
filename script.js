window.onload = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // --- REEMPLAZA ESTOS LINKS CON LOS TUYOS ---
     const urls = [
        'https://i.postimg.cc/9QHCST87/IMG_20240420_WA0011.jpg',
        'https://i.postimg.cc/RZx48fsW/IMG_20240420_WA0022.jpg',
        'https://i.postimg.cc/2SNrJvc3/IMG_20240420_WA0031.jpg',
        'https://i.postimg.cc/yxNy7kLR/IMG_20220710_WA0059.jpg',
        'https://i.postimg.cc/ZnqxJCw6/IMG_20221101_WA0019.jpg',
        'https://i.postimg.cc/cCJBdrFw/IMG_20221101_WA0022.jpg',
        'https://i.postimg.cc/J0h5RGp3/IMG_20240729_WA0011.jpg',
        'https://i.postimg.cc/nrLGnC34/IMG_20240729_WA0024.jpg',
        'https://i.postimg.cc/zvfFQVxn/IMG_20240729_WA0026.jpg',
        'https://i.postimg.cc/QdZhP54B/IMG_20221022_WA0010.jpg'
    ];


    const fotos = [];
    const loader = new THREE.TextureLoader();

    urls.forEach((url, i) => {
        loader.load(url, (texture) => {
            const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
            const mesh = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
            
            // Posición en Espiral (Efecto Galaxia)
                        // --- NUEVA FÓRMULA DE GALAXIA ---
            const angle = i * 0.9; // Hace que gire más suave
            const radius = i * 4.5 + 10; // Empuja las fotos hacia afuera
            
            mesh.position.x = Math.cos(angle) * radius;
            mesh.position.z = Math.sin(angle) * radius;
            mesh.position.y = (Math.random() - 0.5) * 8; // Les da altura
            
            scene.add(mesh);
            fotos.push(mesh);
        });
    });

    // --- AGREGAR ESTRELLAS ---
    const starGeo = new THREE.BufferGeometry();
    const starPos = [];
    for(let i=0; i<5000; i++) {
        starPos.push((Math.random()-0.5)*300, (Math.random()-0.5)*300, (Math.random()-0.5)*300);
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({color: 0xffffff, size: 0.1}));
    scene.add(stars);

    // Cámara viendo desde arriba
    camera.position.set(25, 45, 75);
    camera.lookAt(0, 0, 0);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Esto hace que el movimiento se sienta suave

    function animate() {
        requestAnimationFrame(animate);
        // La escena gira lento
        scene.rotation.y += 0.002;
        // Las fotos giran sobre sí mismas
        fotos.forEach(f => { f.rotation.y += 0.02; });
        renderer.render(scene, camera);
    }
    animate();
    function reproducir() {
    const audio = new Audio('TU_LINK_DE_MUSICA_AQUI.mp3');
    audio.play();
    audio.loop = true;
}
};
