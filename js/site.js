const SITE = {
    email: "blackstackst@gmail.com",
    tg: "polyalina27",
    ig: "blackstack_studio",
};

const SITE_TG_URL = `https://t.me/${SITE.tg}`;
const SITE_IG_URL = `https://www.instagram.com/${SITE.ig}/`;
const VISITOR_TRACKED_KEY = "bs.unique-visitor-tracked.v1";
const VISITOR_COUNTER_HIT_URL = "https://api.countapi.xyz/hit/blackstackstudio-site/unique-visitors-v1";

function gmailUrl(subject) {
    const q = new URLSearchParams({ view: "cm", fs: "1", to: SITE.email });
    if (subject) q.set("su", subject);
    return `https://mail.google.com/mail/?${q}`;
}

function initSiteLinks() {
    document.querySelectorAll("[data-tg-link]").forEach((a) => {
        a.href = SITE_TG_URL;
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
}

function trackUniqueVisitor() {
    try {
        if (localStorage.getItem(VISITOR_TRACKED_KEY) === "1") return;
    } catch (error) {
        return;
    }

    fetch(VISITOR_COUNTER_HIT_URL, {
        method: "GET",
        cache: "no-store",
        mode: "cors",
        keepalive: true,
    })
        .then((response) => {
            if (!response.ok) return;
            try {
                localStorage.setItem(VISITOR_TRACKED_KEY, "1");
            } catch (error) {
            }
        })
        .catch(() => {
        });
}

document.addEventListener("DOMContentLoaded", () => {
    initSiteLinks();
    trackUniqueVisitor();
});
