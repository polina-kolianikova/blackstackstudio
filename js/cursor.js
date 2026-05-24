
(function () {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = document.getElementById("cursor");
    const dot = document.getElementById("cursorDot");
    const trailCanvas = document.getElementById("cursorTrail");
    if (!cursor || !dot || !trailCanvas) return;

    const ctx = trailCanvas.getContext("2d");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        trailCanvas.width = window.innerWidth * dpr;
        trailCanvas.height = window.innerHeight * dpr;
        trailCanvas.style.width = window.innerWidth + "px";
        trailCanvas.style.height = window.innerHeight + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const particles = [];
    const MAX = 60;

    function spawn(x, y) {
        particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            life: 1,
            r: Math.random() * 1.8 + 0.4,
        });
        if (particles.length > MAX) particles.shift();
    }

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const dx = mouseX - dotX;
        const dy = mouseY - dotY;
        if (dx * dx + dy * dy > 4) {
            spawn(mouseX + (Math.random() - 0.5) * 6, mouseY + (Math.random() - 0.5) * 6);
        }
    });

    window.addEventListener("mousedown", () => cursor.classList.add("is-down"));
    window.addEventListener("mouseup", () => cursor.classList.remove("is-down"));

    function bindHover() {
        document.querySelectorAll("[data-cursor]").forEach((el) => {
            if (el.dataset.cursorBound) return;
            el.dataset.cursorBound = "1";
            const variant = el.dataset.cursor;
            el.addEventListener("mouseenter", () => {
                cursor.classList.remove("is-hover", "is-case");
                if (variant === "case") cursor.classList.add("is-case");
                else cursor.classList.add("is-hover");
            });
            el.addEventListener("mouseleave", () => {
                cursor.classList.remove("is-hover", "is-case");
            });
        });
    }
    bindHover();

    const obs = new MutationObserver(bindHover);
    obs.observe(document.body, { childList: true, subtree: true });

    function tick() {

        cursorX += (mouseX - cursorX) * 0.18;
        cursorY += (mouseY - cursorY) * 0.18;
        dotX += (mouseX - dotX) * 0.55;
        dotY += (mouseY - dotY) * 0.55;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;

        ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.018;
            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }
            const alpha = p.life * 0.9;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.shadowColor = `rgba(255, 255, 255, ${alpha})`;
            ctx.shadowBlur = 8;
            ctx.fill();
        }
        ctx.shadowBlur = 0;

        requestAnimationFrame(tick);
    }
    tick();

    document.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0";
        dot.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
        cursor.style.opacity = "1";
        dot.style.opacity = "1";
    });
})();
