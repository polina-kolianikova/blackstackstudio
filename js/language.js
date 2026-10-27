(function (root) {
    "use strict";
    const languages = ["ru", "en", "uk", "ka"];
    const storageKey = "blackstack.language";
    const supported = (value) => languages.includes(value);
    function browserLanguage(preferences) {
        for (const preference of preferences || []) {
            const code = String(preference).toLowerCase().split(/[-_]/)[0];
            if (supported(code)) return code;
        }
        return "en";
    }
    function localizedPath(path, language) {
        if (!supported(language)) return path;
        const route = path.replace(/^\/(?:en|uk|ka)(?=\/|$)/, "").replace(/\/index\.html$/, "/") || "/";
        return (language === "ru" ? "" : "/" + language) + route;
    }
    const api = {languages, storageKey, browserLanguage, localizedPath};
    if (typeof module !== "undefined") module.exports = api;
    if (!root.document) return;

    function remember(language) {
        try { root.localStorage.setItem(storageKey, language); return true; }
        catch (_) { return false; }
    }
    function savedLanguage() {
        try {
            const value = root.localStorage.getItem(storageKey);
            if (supported(value)) return value;
            const legacy = root.localStorage.getItem("bs.lang");
            return supported(legacy) ? legacy : null;
        }
        catch (_) { return null; }
    }
    const url = new URL(root.location.href);
    const requested = url.searchParams.get("lang");
    if (supported(requested)) remember(requested);
    // Explicit localized URLs remain shareable. Negotiate only the common home address.
    if (url.pathname === "/" || url.pathname === "/index.html") {
        const language = supported(requested) ? requested : savedLanguage() || browserLanguage(root.navigator.languages?.length ? root.navigator.languages : [root.navigator.language]);
        if (language !== "ru") {
            url.pathname = localizedPath(url.pathname, language);
            root.location.replace(url.href);
            return;
        }
    }
    root.document.addEventListener("DOMContentLoaded", () => {
        root.document.querySelectorAll(".language-menu").forEach((menu) => {
            menu.querySelectorAll("a[data-language]").forEach((link) => {
                const target = new URL(link.href, root.location.href);
                target.search = root.location.search;
                target.searchParams.delete("lang");
                target.hash = root.location.hash;
                link.href = target.href;
                link.addEventListener("click", () => {
                    const language = link.dataset.language;
                    if (!supported(language)) return;
                    const destination = new URL(link.href);
                    destination.search = root.location.search;
                    destination.searchParams.delete("lang");
                    destination.hash = root.location.hash;
                    if (!remember(language)) {
                        destination.searchParams.set("lang", language);
                    }
                    link.href = destination.href;
                });
            });
            menu.addEventListener("keydown", (event) => {
                if (event.key === "Escape" && menu.open) {
                    menu.open = false;
                    menu.querySelector("summary").focus();
                }
            });
            root.document.addEventListener("click", (event) => {
                if (!menu.contains(event.target)) menu.open = false;
            });
            root.document.addEventListener("focusin", (event) => {
                if (!menu.contains(event.target)) menu.open = false;
            });
        });
    });
})(typeof window !== "undefined" ? window : globalThis);
