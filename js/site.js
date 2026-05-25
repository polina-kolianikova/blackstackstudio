const SITE = {
    email: "blackstackst@gmail.com",
    tg: "blackstackstudio",
    ig: "blackstack_studio",
};

const SITE_TG_URL = `https://t.me/${SITE.tg}`;
const SITE_IG_URL = `https://www.instagram.com/${SITE.ig}/`;

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

document.addEventListener("DOMContentLoaded", initSiteLinks);
