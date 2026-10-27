const SITE = {
    email: "blackstackst@gmail.com",
    tg: "blackstackmng",
    bot: "blackstackstudio_bot",
    ig: "blackstack_studio",
};

const SITE_TG_URL = `https://t.me/${SITE.tg}`;
const SITE_IG_URL = `https://www.instagram.com/${SITE.ig}/`;
const INSTAGRAM_SOURCE = "instagram_profile";
const ATTRIBUTION_KEY = "bs_instagram_attribution_v1";
const ATTRIBUTION_MAX_AGE = 24 * 60 * 60 * 1000;
const INSTAGRAM_PARAMS = {
    utm_source: "instagram",
    utm_medium: "social",
    utm_campaign: "profile",
};

function clearInstagramAttribution() {
    try { window.sessionStorage.removeItem(ATTRIBUTION_KEY); } catch (_) { /* Storage is optional. */ }
}

function instagramAttribution() {
    const source = new URLSearchParams(window.location.search).get("utm_source");
    if (source !== null && source.toLowerCase() !== "instagram") {
        clearInstagramAttribution();
        return null;
    }
    try {
        const record = JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY));
        const age = Date.now() - record?.at;
        if (record?.source === INSTAGRAM_SOURCE && Number.isFinite(record.at)
            && age >= 0 && age < ATTRIBUTION_MAX_AGE) return record;
    } catch (_) { /* URL attribution still works without storage. */ }
    clearInstagramAttribution();
    if (source !== null || /^\/instagram(?:\/|\/index\.html)?$/.test(window.location.pathname)) {
        return { source: INSTAGRAM_SOURCE, at: Date.now() };
    }
    return null;
}

function rememberInstagramAttribution(attribution) {
    if (!attribution) return;
    try { window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution)); } catch (_) { /* Optional. */ }
}

function decorateInternalLinks(attribution) {
    if (!attribution) return;
    document.querySelectorAll("a[href]").forEach((a) => {
        const raw = a.getAttribute("href");
        if (!raw || raw.startsWith("#") || a.hasAttribute("download")) return;
        let url;
        try { url = new URL(raw, window.location.href); } catch (_) { return; }
        if (url.origin !== window.location.origin || !/^https?:$/.test(url.protocol)
            || /^\/bs-admin(?:\/|$)/.test(url.pathname)
            || (/\.[^/]+$/.test(url.pathname) && !/\.html$/.test(url.pathname))) return;
        const source = url.searchParams.get("utm_source");
        if (source !== null && source.toLowerCase() !== "instagram") return;
        for (const key of [...url.searchParams.keys()]) {
            if (key.toLowerCase().startsWith("utm_")) url.searchParams.delete(key);
        }
        for (const [key, value] of Object.entries(INSTAGRAM_PARAMS)) url.searchParams.set(key, value);
        a.href = url.pathname + url.search + url.hash;
    });
}

function enquiryUrl(source = "contact") {
    if (instagramAttribution()) return `https://t.me/${SITE.bot}?start=${INSTAGRAM_SOURCE}`;
    const lang = ["ru", "en", "uk", "ka"].includes(document.documentElement.lang)
        ? document.documentElement.lang : "ru";
    const route = window.location.pathname.includes("/services/")
        ? window.location.pathname.split("/services/")[1].split("/")[0]
        : window.location.pathname.includes("/design/") ? "design"
        : window.location.pathname.includes("/montage/") ? "video" : "home";
    const payload = `web_${lang}_${route}_${source}`.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64);
    return `https://t.me/${SITE.bot}?start=${payload}`;
}

function gmailUrl(subject) {
    const q = new URLSearchParams({ view: "cm", fs: "1", to: SITE.email });
    if (subject) q.set("su", subject);
    return `https://mail.google.com/mail/?${q}`;
}

function initSiteLinks() {
    const attribution = instagramAttribution();
    rememberInstagramAttribution(attribution);
    document.querySelectorAll("[data-tg-link]").forEach((a) => {
        a.href = SITE_TG_URL;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
    });
    document.querySelectorAll("[data-bot-link]").forEach((a) => {
        a.href = enquiryUrl(a.dataset.botLink || "contact");
        a.target = "_blank";
        a.rel = "noopener noreferrer";
    });

    document.querySelectorAll("[data-ig-link]").forEach((a) => {
        a.href = SITE_IG_URL;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
    });

    document.querySelectorAll("[data-email-link]").forEach((a) => {
        if (a.dataset.emailBound) return;
        a.dataset.emailBound = "1";
        const subject = a.dataset.emailSubject || "";
        a.href = gmailUrl(subject);
        a.target = "_blank";
        a.rel = "noopener noreferrer";

        a.addEventListener("click", (e) => {
            if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return;
            e.preventDefault();
            const mailto = subject
                ? `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`
                : `mailto:${SITE.email}`;
            window.location.href = mailto;
        });
    });
    decorateInternalLinks(attribution);
}

document.addEventListener("DOMContentLoaded", () => {
    initSiteLinks();
});
