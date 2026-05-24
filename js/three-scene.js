
(function () {
    if (typeof THREE === "undefined") {
        console.warn("Three.js failed to load.");
        return;
    }

    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;

    const heroEl = document.getElementById("hero");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isNarrow = window.matchMedia("(max-width: 600px)").matches;
    const lowMem = (navigator.deviceMemory && navigator.deviceMemory < 4);
    const lowCpu = (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4);
    if (reduced || (isTouch && isNarrow) || (lowMem && lowCpu)) {
        canvas.style.display = "none";
        if (heroEl) {
            heroEl.style.background =
                "radial-gradient(ellipse 1100px 700px at 72% 45%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 35%, transparent 70%), " +
                "radial-gradient(ellipse 800px 600px at 20% 80%, rgba(255,255,255,0.04) 0%, transparent 60%), " +
                "#000";
        }
        return;
    }

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.045);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 9);

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(-6, -3, -4);
    scene.add(rimLight);

    const pointGlow = new THREE.PointLight(0xffffff, 1.5, 14);
    pointGlow.position.set(0, 0, 4);
    scene.add(pointGlow);

    const construct = new THREE.Group();
    scene.add(construct);

    const sphereGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const sphereMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
    });
    const outerSphere = new THREE.Mesh(sphereGeo, sphereMat);
    construct.add(outerSphere);

    const innerGeo = new THREE.IcosahedronGeometry(1.45, 0);
    const innerMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
    });
    const innerShape = new THREE.Mesh(innerGeo, innerMat);
    construct.add(innerShape);

    const cubeGroup = new THREE.Group();
    construct.add(cubeGroup);

    const cubeGeo = new THREE.BoxGeometry(0.42, 0.42, 0.42);
    const cubeMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.18,
        emissive: 0x111111,
    });
    const cubeEdgeMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.65 });

    const offsets = [
        [-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [-0.5, 0.5, -0.5], [0.5, 0.5, -0.5],
        [-0.5, -0.5, 0.5],  [0.5, -0.5, 0.5],  [-0.5, 0.5, 0.5],  [0.5, 0.5, 0.5],
    ];

    const cubes = [];
    offsets.forEach(([x, y, z], i) => {
        const m = new THREE.Mesh(cubeGeo, cubeMat);
        m.position.set(x, y, z);
        cubeGroup.add(m);

        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(cubeGeo), cubeEdgeMat);
        m.add(edges);

        cubes.push({ mesh: m, base: m.position.clone(), phase: i * 0.7 });
    });

    const ringGeo = new THREE.TorusGeometry(2.0, 0.008, 8, 120);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    construct.add(ring);

    const ring2 = ring.clone();
    ring2.rotation.x = Math.PI / 1.5;
    ring2.rotation.y = Math.PI / 4;
    construct.add(ring2);

    const PARTICLE_COUNT = 1400;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const seeds = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {

        const r = 3 + Math.pow(Math.random(), 0.5) * 18;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
        sizes[i] = Math.random() * 1.5 + 0.3;
        seeds[i] = Math.random() * 1000;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    function makeParticleTexture() {
        const c = document.createElement("canvas");
        c.width = c.height = 64;
        const cx = c.getContext("2d");
        const g = cx.createRadialGradient(32, 32, 0, 32, 32, 32);
        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(0.3, "rgba(255,255,255,0.6)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        cx.fillStyle = g;
        cx.fillRect(0, 0, 64, 64);
        const t = new THREE.CanvasTexture(c);
        t.minFilter = THREE.LinearFilter;
        return t;
    }

    const particleMat = new THREE.PointsMaterial({
        size: 0.08,
        map: makeParticleTexture(),
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0xffffff,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    function makeGlowTexture() {
        const c = document.createElement("canvas");
        c.width = c.height = 256;
        const cx = c.getContext("2d");
        const g = cx.createRadialGradient(128, 128, 0, 128, 128, 128);
        g.addColorStop(0, "rgba(255,255,255,0.6)");
        g.addColorStop(0.3, "rgba(255,255,255,0.25)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        cx.fillStyle = g;
        cx.fillRect(0, 0, 256, 256);
        return new THREE.CanvasTexture(c);
    }
    const glowSprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: makeGlowTexture(),
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    }));
    glowSprite.scale.set(8, 8, 1);
    glowSprite.position.z = -1;
    scene.add(glowSprite);

    let pointer = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };

    window.addEventListener("mousemove", (e) => {
        target.x = (e.clientX / window.innerWidth) * 2 - 1;
        target.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    let scrollY = 0;
    window.addEventListener("scroll", () => {
        scrollY = window.scrollY;
    });

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const clock = new THREE.Clock();

    function animate() {
        const t = clock.getElapsedTime();
        const dt = Math.min(clock.getDelta() + 0.016, 0.05);

        pointer.x += (target.x - pointer.x) * 0.06;
        pointer.y += (target.y - pointer.y) * 0.06;

        construct.rotation.y += dt * 0.18;
        construct.rotation.x = THREE.MathUtils.lerp(construct.rotation.x, pointer.y * 0.45, 0.05);
        construct.rotation.z = THREE.MathUtils.lerp(construct.rotation.z, pointer.x * 0.18, 0.05);

        innerShape.rotation.y -= dt * 0.45;
        innerShape.rotation.x += dt * 0.3;
        cubeGroup.rotation.y -= dt * 0.6;
        cubeGroup.rotation.x += dt * 0.25;

        cubes.forEach((c, i) => {
            const k = 1 + Math.sin(t * 1.4 + c.phase) * 0.04;
            c.mesh.scale.setScalar(k);
        });

        const heroH = window.innerHeight;
        const p = Math.min(scrollY / heroH, 1);
        construct.position.y = -p * 2;
        construct.position.z = -p * 3;
        glowSprite.material.opacity = 0.9 * (1 - p * 0.7);

        particles.rotation.y += dt * 0.02;
        particles.rotation.x += dt * 0.008;

        ring.material.opacity = 0.4 + Math.sin(t * 1.2) * 0.15;
        ring2.material.opacity = 0.4 + Math.cos(t * 1.4) * 0.15;

        camera.position.x += (pointer.x * 0.4 - camera.position.x) * 0.04;
        camera.position.y += (pointer.y * 0.3 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();
})();
