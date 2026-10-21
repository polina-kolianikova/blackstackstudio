const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "../js/site.js"), "utf8");
const key = "bs_instagram_attribution_v1";
const origin = "https://blackstackstudio.com";
const instagramBot = "https://t.me/blackstackstudio_bot?start=instagram_profile";

function visit(route, { lang = "ru", store = new Map(), blocked = false, links = [] } = {}) {
    const location = new URL(route, origin);
    const listeners = [];
    const anchors = links.map((attributes) => {
        const attrs = { ...attributes };
        const dataset = {};
        for (const [name, value] of Object.entries(attrs)) {
            if (name.startsWith("data-")) dataset[name.slice(5).replace(/-([a-z])/g, (_, x) => x.toUpperCase())] = value;
        }
        return {
            dataset,
            get href() { return new URL(attrs.href, location).href; },
            set href(value) { attrs.href = value; },
            getAttribute(name) { return attrs[name] ?? null; },
            hasAttribute(name) { return Object.hasOwn(attrs, name); },
            addEventListener() {},
        };
    });
    const sessionStorage = {
        getItem(k) { if (blocked) throw new Error("Storage disabled"); return store.get(k) ?? null; },
        setItem(k, value) { if (blocked) throw new Error("Storage disabled"); store.set(k, value); },
        removeItem(k) { if (blocked) throw new Error("Storage disabled"); store.delete(k); },
    };
    const document = {
        documentElement: { lang },
        addEventListener(name, handler) { if (name === "DOMContentLoaded") listeners.push(handler); },
        querySelectorAll(selector) {
            if (selector === "a[href]") return anchors;
            const attr = selector.match(/^\[([^\]]+)\]$/)?.[1];
            return anchors.filter((a) => a.hasAttribute(attr));
        },
    };
    const context = vm.createContext({ window: { location, sessionStorage }, document, navigator: { userAgent: "Desktop" }, URL, URLSearchParams });
    vm.runInContext(source, context);
    listeners.forEach((handler) => handler());
    return {
        anchors, store,
        bot(position = "contact") { return vm.runInContext(`enquiryUrl(${JSON.stringify(position)})`, context); },
        init() { vm.runInContext("initSiteLinks()", context); },
    };
}

test("ordinary visitors retain exact existing localized entry payloads", () => {
    for (const position of ["nav", "contact", "footer"]) {
        assert.equal(visit("/").bot(position), `https://t.me/blackstackstudio_bot?start=web_ru_home_${position}`);
    }
    assert.equal(visit("/en/services/automation-ai/", { lang: "en" }).bot("hero"), "https://t.me/blackstackstudio_bot?start=web_en_automation-ai_hero");
    assert.equal(visit("/design/").bot("hero"), "https://t.me/blackstackstudio_bot?start=web_ru_design_hero");
    assert.equal(visit("/montage/").bot("hero"), "https://t.me/blackstackstudio_bot?start=web_ru_video_hero");
});

test("profile entry preserves generic source through proof, services and language changes", () => {
    const first = visit("/instagram/", { links: [{ href: "/#projects" }, { href: "/services/web-development/" }] });
    assert.equal(first.bot(), instagramBot);
    const serviceUrl = new URL(first.anchors[1].href);
    assert.equal(serviceUrl.searchParams.get("utm_source"), "instagram");
    assert.equal(serviceUrl.searchParams.get("utm_campaign"), "profile");
    assert.equal(new URL(first.anchors[0].href).hash, "#projects");
    const stored = JSON.parse(first.store.get(key));
    assert.deepEqual(Object.keys(stored).sort(), ["at", "source"]);
    assert.equal(stored.source, "instagram_profile");
    const second = visit(serviceUrl.href, { store: first.store, links: [{ href: "/uk/services/automation-ai/" }] });
    assert.equal(second.bot("hero"), instagramBot);
    assert.equal(JSON.parse(first.store.get(key)).at, stored.at);
    assert.equal(visit(second.anchors[0].href, { lang: "uk", store: new Map() }).bot(), instagramBot);
    assert.equal(visit("/design/", { store: first.store }).bot(), instagramBot);
});

test("disabled storage still preserves the source in actual internal hrefs", () => {
    const first = visit("/instagram", { blocked: true, links: [{ href: "/en/" }] });
    assert.equal(first.bot(), instagramBot);
    const second = visit(first.anchors[0].href, { blocked: true, lang: "en", links: [{ href: "/en/services/custom-software/" }] });
    assert.equal(second.bot("nav"), instagramBot);
    assert.equal(visit(second.anchors[0].href, { blocked: true, lang: "en" }).bot("contact"), instagramBot);
});

test("arbitrary campaign values never enter the payload, stored record or inherited UTM", () => {
    const first = visit("/?utm_source=instagram&utm_campaign=%3Cscript%3E&start=secret&email=private%40example.com", {
        links: [{ href: "/design/?view=work&utm_content=private%40example.com#featured" }],
    });
    assert.equal(first.bot("evil/<>"), instagramBot);
    const inherited = new URL(first.anchors[0].href);
    assert.deepEqual([...inherited.searchParams.keys()].sort(), ["utm_campaign", "utm_medium", "utm_source", "view"]);
    assert.equal(inherited.searchParams.get("utm_campaign"), "profile");
    assert.equal(inherited.searchParams.get("view"), "work");
    assert.equal(inherited.hash, "#featured");
    assert.doesNotMatch(first.store.get(key), /secret|private|script/);
    first.init();
    assert.equal(new URL(first.anchors[0].href).searchParams.getAll("utm_source").length, 1);
});

test("an explicit different source ends inherited website attribution", () => {
    const store = new Map([[key, JSON.stringify({ source: "instagram_profile", at: Date.now() })]]);
    const page = visit("/?utm_source=newsletter", { store, links: [{ href: "/design/" }] });
    assert.equal(page.bot(), "https://t.me/blackstackstudio_bot?start=web_ru_home_contact");
    assert.equal(store.has(key), false);
    assert.equal(page.anchors[0].href, origin + "/design/");
});

test("corrupt, expired, future and foreign storage records fail closed", () => {
    for (const record of ["{broken", JSON.stringify({ source: "other", at: Date.now() }),
        JSON.stringify({ source: "instagram_profile", at: Date.now() - 86400001 }),
        JSON.stringify({ source: "instagram_profile", at: Date.now() + 100000 }),
        JSON.stringify({ source: "instagram_profile", at: "yesterday" })]) {
        const store = new Map([[key, record]]);
        assert.equal(visit("/", { store }).bot(), "https://t.me/blackstackstudio_bot?start=web_ru_home_contact");
        assert.equal(store.has(key), false);
    }
});

test("manager, email, external links, downloads and admin never receive campaign params", () => {
    const links = [
        { href: "https://t.me/blackstackmng", "data-tg-link": "" },
        { href: "mailto:blackstackst@gmail.com" },
        { href: "https://example.com/proof" },
        { href: "/instagram/brief-template.txt", download: "brief.txt" },
        { href: "/bs-admin" }, { href: "/bs-admin/" }, { href: "#material" },
        { href: "/design/?utm_source=newsletter" },
    ];
    const page = visit("/instagram/", { links });
    links.forEach((original, index) => assert.equal(page.anchors[index].href, new URL(original.href, origin + "/instagram/").href));
    assert.equal(page.anchors[0].target, "_blank");
    assert.equal(page.anchors[0].rel, "noopener noreferrer");
});

test("real managed CTA receives the fixed payload and public manager remains separate", () => {
    const page = visit("/instagram/index.html", { links: [
        { href: "https://t.me/blackstackstudio_bot?start=web_ru_home_nav", "data-bot-link": "nav" },
        { href: "https://t.me/blackstackmng", "data-tg-link": "" },
    ] });
    assert.equal(page.anchors[0].href, instagramBot);
    assert.equal(page.anchors[1].href, "https://t.me/blackstackmng");
    assert.match(new URL(page.bot()).searchParams.get("start"), /^[A-Za-z0-9_-]{1,64}$/);
});
