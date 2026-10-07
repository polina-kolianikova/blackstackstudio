// The URL and its static HTML determine the language for visitors and crawlers.
let currentLang = document.documentElement.lang || "ru";
if (!I18N[currentLang]) currentLang = "ru";

function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || I18N.ru[key] || key;
}

function applyTranslations() {
    document.documentElement.lang = currentLang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const attr = el.getAttribute("data-i18n-attr");
        const value = t(key);
        if (attr) el.setAttribute(attr, value);

        el.textContent = value;
    });

    resplit();

    updateLangPill();
    restartTypewriter();
}

function initLangSwitch() {
    const wrap = document.getElementById("langSwitch");
    if (!wrap) return;

    wrap.querySelectorAll("[data-lang]").forEach((b) =>
        b.classList.toggle("is-active", b.dataset.lang === currentLang)
    );
}

function updateLangPill() {
    const wrap = document.getElementById("langSwitch");
    const pill = document.getElementById("langPill");
    if (!wrap || !pill) return;
    const active = wrap.querySelector(".lang-switch__btn.is-active");
    if (!active) return;
    const rect = active.getBoundingClientRect();
    const parentRect = wrap.getBoundingClientRect();
    pill.style.width = rect.width + "px";
    pill.style.transform = `translateX(${rect.left - parentRect.left - 4}px)`;
}

function runLoader() {
    const loader = document.getElementById("loader");
    const fill = document.getElementById("loaderBarFill");
    const pct = document.getElementById("loaderPercent");
    if (!loader) return Promise.resolve();

    return new Promise((resolve) => {
        let finished = false;
        const start = performance.now();
        const minDuration = 1500;

        function finish() {
            if (finished) return;
            finished = true;
            if (window.__bsLoaderDeadline) {
                clearTimeout(window.__bsLoaderDeadline);
                window.__bsLoaderDeadline = null;
            }
            loader.classList.add("is-done");
            document.body.classList.add("is-loaded");
            resolve();
        }

        const safetyTimer = setTimeout(finish, 2400);

        function step(now) {
            const elapsed = now - start;
            const display = Math.min(100, Math.round((elapsed / minDuration) * 100));
            if (fill) fill.style.width = display + "%";
            if (pct) pct.textContent = display;
            if (display < 100 && !finished) {
                requestAnimationFrame(step);
            } else {
                setTimeout(() => {
                    clearTimeout(safetyTimer);
                    finish();
                }, 160);
            }
        }
        requestAnimationFrame(step);
    });
}

let typewriterTimer = null;

function restartTypewriter() {
    const el = document.getElementById("typewriter");
    if (!el) return;
    clearTimeout(typewriterTimer);
    el.textContent = t("hero.typed");
}

function splitText() {
    document.querySelectorAll("[data-split]").forEach((el) => {
        if (el.dataset.splitDone) return;
        const key = el.getAttribute("data-i18n");
        const text = (key ? t(key) : el.textContent).trim();
        el.textContent = "";

        const words = text.split(" ");
        words.forEach((word, wi) => {
            const wordSpan = document.createElement("span");
            wordSpan.style.display = "inline-block";
            wordSpan.style.overflow = "hidden";
            wordSpan.style.lineHeight = "1.05";
            [...word].forEach((ch, ci) => {
                const span = document.createElement("span");
                span.className = "char";
                span.style.transitionDelay = (wi * 0.05 + ci * 0.022) + "s";
                span.textContent = ch;
                wordSpan.appendChild(span);
            });
            el.appendChild(wordSpan);
            if (wi < words.length - 1) el.appendChild(document.createTextNode(" "));
        });
        el.dataset.splitDone = "1";
    });
}

function resplit() {
    document.querySelectorAll("[data-split]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (key) el.textContent = t(key);
        el.dataset.splitDone = "";
        el.classList.remove("is-in");
    });
    splitText();
    refreshSplitInView();
    observeReveal(true);
}

function refreshSplitInView() {
    const vh = window.innerHeight;
    document.querySelectorAll("[data-split]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) el.classList.add("is-in");
    });
}

let revealIO = null;

function observeReveal(splitOnly = false) {
    const selector = splitOnly ? "[data-split]" : "[data-reveal], [data-split]";
    if (typeof window.IntersectionObserver !== "function") {
        document.querySelectorAll(selector).forEach((el) => el.classList.add("is-in"));
        return;
    }

    if (!revealIO) {
        revealIO = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("is-in");
                        revealIO.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
        );
    }

    document.querySelectorAll(selector).forEach((el) => {
        if (el.hasAttribute("data-split") && el.classList.contains("is-in")) return;
        revealIO.observe(el);
    });
}

function navScroll() {
    const nav = document.getElementById("nav");
    if (!nav) return;
    let last = -1;
    window.addEventListener("scroll", () => {
        const y = window.scrollY;
        const scrolled = y > 40;
        if (scrolled !== last) {
            nav.classList.toggle("is-scrolled", scrolled);
            last = scrolled;
        }
    });
}

function tilt() {
    document.querySelectorAll("[data-tilt]").forEach((el) => {
        let raf = null;
        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rx = (0.5 - y) * 8;
            const ry = (x - 0.5) * 10;
            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
                el.style.setProperty("--mx", (x * 100) + "%");
                el.style.setProperty("--my", (y * 100) + "%");
            });
        });
        el.addEventListener("mouseleave", () => {
            el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
        });
    });
}

function magnetic() {
    document.querySelectorAll(".magnetic").forEach((el) => {
        const strength = 0.35;
        const radius = 120;
        let raf = null;

        function onMove(e) {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > radius) {
                el.style.transform = "";
                return;
            }
            const f = (1 - dist / radius) * strength;
            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                el.style.transform = `translate(${dx * f}px, ${dy * f}px)`;
            });
        }

        function reset() {
            el.style.transform = "";
        }

        window.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", reset);
    });
}

function parallaxMark() {
    const mark = document.querySelector(".hero__mark");
    const title = document.querySelector(".hero__title");
    const sub = document.querySelector(".hero__sub");
    if (!mark) return;

    window.addEventListener("scroll", () => {
        const y = window.scrollY;
        const h = window.innerHeight;
        const p = Math.min(y / h, 1);
        mark.style.transform = `translateY(${p * -38}px) scale(${1 - p * 0.04})`;
        if (title) title.style.transform = `translateY(${p * -22}px)`;
        if (sub)   sub.style.transform   = `translateY(${p * -11}px)`;
    }, { passive: true });
}

function startClock() {
    const el = document.getElementById("footerTime");
    const cityEl = document.getElementById("footerCity");
    if (!el) return;

    let tz = "UTC";
    let city = "Local";
    try {
        tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
        const parts = tz.split("/");
        city = (parts[parts.length - 1] || "Local").replace(/_/g, " ");
    } catch (e) {  }

    if (cityEl) cityEl.textContent = `${city} · ${tz}`;

    function pad(n) { return String(n).padStart(2, "0"); }
    function offsetStr(d) {
        const off = -d.getTimezoneOffset();
        const sign = off >= 0 ? "+" : "−";
        const h = Math.floor(Math.abs(off) / 60);
        const m = Math.abs(off) % 60;
        return `UTC${sign}${pad(h)}${m ? ":" + pad(m) : ""}`;
    }
    function tick() {
        const d = new Date();
        el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} · ${offsetStr(d)}`;
    }
    tick();
    setInterval(tick, 1000);
}

function initStats() {
    const stats = document.querySelectorAll("[data-count]");
    if (!stats.length) return;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const animate = (el) => {
        const target   = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const prefix   = el.dataset.prefix || "";
        const suffix   = el.dataset.suffix || "";
        const duration = 1800;
        const start    = performance.now();

        function step(now) {
            const p = Math.min(1, (now - start) / duration);
            const v = (target * easeOut(p)).toFixed(decimals);
            el.textContent = prefix + v + suffix;
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    };

    if (typeof window.IntersectionObserver !== "function") {
        stats.forEach(animate);
        return;
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                animate(e.target);
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.35 });

    stats.forEach((s) => io.observe(s));
}

document.addEventListener("DOMContentLoaded", () => {
    const loaderReady = runLoader();

    try {
        initLangSwitch();
        applyTranslations();

        navScroll();
        parallaxMark();
        tilt();
        magnetic();
        startClock();
        initStats();
    } catch (error) {
        console.error("Page initialization failed.", error);
    }

    loaderReady.then(() => {
        observeReveal();

        setTimeout(restartTypewriter, 300);
    });
});

window.addEventListener("resize", updateLangPill);
