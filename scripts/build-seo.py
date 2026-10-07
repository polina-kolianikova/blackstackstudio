"""Build crawlable pages for the existing static GitHub Pages site."""
import json
import re
import subprocess
from html import escape
from pathlib import Path
from xml.etree import ElementTree as ET

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://blackstackstudio.com"
LANGS = ("ru", "en", "uk")
LOCALES = {"ru": "ru_RU", "en": "en_US", "uk": "uk_UA"}
SERVICES = json.loads((ROOT / "seo/services.json").read_text(encoding="utf-8"))
I18N = json.loads(subprocess.check_output(
    ["node", "-e", "process.stdout.write(JSON.stringify(require('./js/i18n.js')))"],
    cwd=ROOT, encoding="utf-8",
))
COPY = {
    "ru": {
        "title": "Разработка сайтов, ПО и AI-автоматизация | BlackStack Studio",
        "description": "BlackStack Studio: разработка сайтов и приложений, Telegram-боты, AI-агенты и автоматизация бизнеса. Дизайн, интеграции, запуск и поддержка проектов.",
        "home": "Главная", "services": "Услуги", "scope": "Какие задачи решаем",
        "delivery": "Как проходит работа", "estimate": "Стоимость, сроки и начало работы",
        "proof": "С чего начать", "related": "Другие направления", "more": "Подробнее об услуге",
        "cta": "Обсудить проект", "design": "Портфолио дизайна", "contact": "Связаться с BlackStack",
        "note": "Опишите задачу, текущий процесс и желаемый результат. Можно приложить ссылки и примеры.",
        "privacy": "Конфиденциальность", "terms": "Условия работы",
    },
    "en": {
        "title": "Web Development, Custom Software & AI | BlackStack Studio",
        "description": "BlackStack Studio builds websites, applications, Telegram bots and AI automation. Design, API integrations, launch and support for your business.",
        "home": "Home", "services": "Services", "scope": "What we build",
        "delivery": "How the work happens", "estimate": "Cost, timing and getting started",
        "proof": "Where to start", "related": "Related services", "more": "Explore this service",
        "cta": "Discuss your project", "design": "Design portfolio", "contact": "Contact BlackStack",
        "note": "Tell us about the task, your current process and the outcome you need. Links and examples are welcome.",
        "privacy": "Privacy policy (Russian)", "terms": "Terms (Russian)",
    },
    "uk": {
        "title": "Розробка сайтів, ПЗ та AI-автоматизація | BlackStack Studio",
        "description": "BlackStack Studio: розробка сайтів і застосунків, Telegram-боти, AI-агенти та автоматизація бізнесу. Дизайн, інтеграції, запуск і підтримка проєктів.",
        "home": "Головна", "services": "Послуги", "scope": "Які завдання вирішуємо",
        "delivery": "Як відбувається робота", "estimate": "Вартість, строки та початок роботи",
        "proof": "З чого почати", "related": "Інші напрями", "more": "Докладніше про послугу",
        "cta": "Обговорити проєкт", "design": "Портфоліо дизайну", "contact": "Зв’язатися з BlackStack",
        "note": "Опишіть завдання, поточний процес і бажаний результат. Можна додати посилання та приклади.",
        "privacy": "Конфіденційність (російською)", "terms": "Умови роботи (російською)",
    },
}


def path_for(lang, slug=""):
    return ("/" if lang == "ru" else f"/{lang}/") + (f"services/{slug}/" if slug else "")


def write(path, content):
    destination = ROOT / path
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(content.rstrip() + "\n", encoding="utf-8")


def soup_of(html):
    return BeautifulSoup(html, "html.parser")


def tag(soup, tag_name, **attrs):
    return soup.new_tag(tag_name, attrs=attrs)


def metadata(soup, lang, path, title, description, alternates=None, service=None):
    title, description = str(title), str(description)
    head = soup.head
    for item in head.select('title, meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], link[hreflang], script[type="application/ld+json"]'):
        item.decompose()
    title_tag = tag(soup, "title")
    title_tag.string = title
    head.append(title_tag)
    head.append(tag(soup, "meta", **{"name": "description", "content": description}))
    head.append(tag(soup, "meta", **{"name": "robots", "content": "index, follow, max-image-preview:large"}))
    head.append(tag(soup, "link", rel="canonical", href=ORIGIN + path))
    for key, href in (alternates or {}).items():
        head.append(tag(soup, "link", rel="alternate", hreflang=key, href=ORIGIN + href))
    values = {
        "og:type": "website", "og:site_name": "BlackStack Studio", "og:title": title,
        "og:description": description, "og:url": ORIGIN + path,
        "og:image": ORIGIN + "/assets/logo.png", "og:image:width": "640", "og:image:height": "640",
        "og:image:alt": "BlackStack Studio", "og:locale": LOCALES[lang],
    }
    for key, value in values.items():
        head.append(tag(soup, "meta", property=key, content=value))
    for key in (alternates or {}):
        if key in LOCALES and key != lang:
            head.append(tag(soup, "meta", property="og:locale:alternate", content=LOCALES[key]))
    for key, value in {"card": "summary", "title": title, "description": description,
                       "image": ORIGIN + "/assets/logo.png", "image:alt": "BlackStack Studio"}.items():
        head.append(tag(soup, "meta", **{"name": "twitter:" + key, "content": value}))
    graph = [
        {"@type": "Organization", "@id": ORIGIN + "/#organization", "name": "BlackStack Studio",
         "url": ORIGIN + "/", "logo": ORIGIN + "/assets/logo.png", "email": "blackstackst@gmail.com",
         "sameAs": ["https://t.me/blackstackmng", "https://www.instagram.com/blackstack_studio/"]},
        {"@type": "WebSite", "@id": ORIGIN + "/#website", "url": ORIGIN + "/",
         "name": "BlackStack Studio", "publisher": {"@id": ORIGIN + "/#organization"}, "inLanguage": list(LANGS)},
        {"@type": "WebPage", "@id": ORIGIN + path + "#webpage", "url": ORIGIN + path,
         "name": title, "description": description, "inLanguage": lang,
         "isPartOf": {"@id": ORIGIN + "/#website"}, "about": {"@id": ORIGIN + "/#organization"}},
    ]
    if service:
        graph.append({"@type": "Service", "@id": ORIGIN + path + "#service", "name": service["title"],
                      "description": service["description"], "url": ORIGIN + path,
                      "provider": {"@id": ORIGIN + "/#organization"}})
        graph[2]["mainEntity"] = {"@id": ORIGIN + path + "#service"}
        graph.append({"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": COPY[lang]["home"], "item": ORIGIN + path_for(lang)},
            {"@type": "ListItem", "position": 2, "name": service["title"], "item": ORIGIN + path},
        ]})
    script = tag(soup, "script", type="application/ld+json")
    script.string = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False).replace("<", "\\u003c")
    head.append(script)


def alternatives(slug=""):
    return {**{lang: path_for(lang, slug) for lang in LANGS}, "x-default": path_for("ru", slug)}


def home(lang):
    soup = soup_of((ROOT / "seo/home.html").read_text(encoding="utf-8"))
    soup.html["lang"] = lang
    for el in soup.select("[data-i18n]"):
        key = el["data-i18n"]
        if key not in I18N[lang]:
            raise ValueError(f"Missing {lang} translation: {key}")
        el.string = I18N[lang][key]
        if el.get("data-i18n-attr"):
            el[el["data-i18n-attr"]] = I18N[lang][key]
    soup.select_one("#typewriter").string = I18N[lang]["hero.typed"]
    for el in soup.select(".now__val"):
        if el.get_text() == "1ч":
            el.string = {"ru": "1ч", "en": "1h", "uk": "1 год"}[lang]
    # Preserve accessible, real numbers in HTML before counters animate.
    for el in soup.select("[data-count]"):
        suffixes = {"en": {"ч": "h", " дн": " days"}, "uk": {"ч": " год", " дн": " дн"}}
        if el.get("data-suffix") in suffixes.get(lang, {}):
            el["data-suffix"] = suffixes[lang][el["data-suffix"]]
        el.string = el.get("data-prefix", "") + el["data-count"] + el.get("data-suffix", "")
    for el in soup.select("#langSwitch [data-lang]"):
        language = el["data-lang"]
        el.name = "a"
        el["href"] = path_for(language)
        el["hreflang"] = language
        el["lang"] = language
        el["aria-label"] = {"ru": "Русский", "en": "English", "uk": "Українська"}[language]
        el["class"] = ["lang-switch__btn"] + (["is-active"] if language == lang else [])
        if language == lang:
            el["aria-current"] = "page"
    for el in soup.select("[href], [src]"):
        for attr in ("href", "src"):
            value = el.get(attr, "")
            if value and not value.startswith(("/", "#", "https:", "http:", "mailto:", "data:")):
                el[attr] = "/" + value
    for el in soup.select("[data-email-link]"):
        el["href"] = "mailto:blackstackst@gmail.com"
    for el in soup.select("[data-ig-link]"):
        el["href"] = "https://www.instagram.com/blackstack_studio/"
    for index, key in ((0, "m1.name"), (1, "m2.name")):
        soup.select(".member__photo")[index]["alt"] = I18N[lang][key]
    for el in soup.select(".card__tags span"):
        if el.get_text() == "AI-агенты":
            el.string = {"ru": "AI-агенты", "en": "AI agents", "uk": "AI-агенти"}[lang]
    for service in SERVICES:
        article = soup.select_one(f'[data-i18n="card{service["card"]}.title"]').find_parent("article")
        link = tag(soup, "a", href=path_for(lang, service["slug"]), **{"class": "service-link"})
        link.string = COPY[lang]["more"] + " →"
        article.append(link)
    for key, slug in (("footer.col1.1", "web-development"), ("footer.col1.2", "automation-ai"), ("footer.col1.4", "automation-ai")):
        soup.select_one(f'[data-i18n="{key}"]')["href"] = path_for(lang, slug)
    soup.select_one('[data-i18n="footer.col1.3"]')["href"] = "/portfolio/"
    # Add real links on the interface-design card too.
    design = soup.select_one('[data-i18n="card3.title"]').find_parent("article")
    link = tag(soup, "a", href="/portfolio/", **{"class": "service-link"})
    link.string = COPY[lang]["design"] + " →"
    design.append(link)
    main_script = soup.find("script", src=re.compile(r"/js/main\.js"))
    main_script["src"] = "/js/main.js?v=seo1"
    main_script.insert_before(tag(soup, "script", src="/js/i18n.js?v=seo1", defer=""))
    soup.find("link", href=re.compile(r"/css/style\.css"))["href"] = "/css/style.css?v=seo1"
    metadata(soup, lang, path_for(lang), COPY[lang]["title"], COPY[lang]["description"], alternatives())
    write(path_for(lang).lstrip("/") + "index.html", str(soup))


def service_page(lang, service):
    content = service[lang]
    ui = COPY[lang]
    path = path_for(lang, service["slug"])
    langs = " ".join(f'<a href="{path_for(code, service["slug"])}" hreflang="{code}" lang="{code}"'
                     f'{" aria-current=\"page\"" if code == lang else ""}>{code.upper()}</a>' for code in LANGS)
    points = "".join(f"<li>{escape(point)}</li>" for point in content["scope"])
    related = "".join(f'<li><a href="{path_for(lang, other["slug"])}">{escape(other[lang]["title"])}</a></li>'
                      for other in SERVICES if other != service)
    sections = "".join(f'<section><h2>{escape(ui[key])}</h2><p>{escape(content[key])}</p></section>'
                       for key in ("delivery", "estimate", "proof"))
    soup = soup_of(f'''<!DOCTYPE html>
<html lang="{lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#080808"><link rel="icon" href="/assets/logo.png" type="image/png">
<link rel="stylesheet" href="/css/services.css?v=1"></head><body>
<header class="service-nav"><a class="brand" href="{path_for(lang)}">BlackStack Studio</a>
<nav aria-label="Language">{langs}</nav></header>
<main><nav class="breadcrumb" aria-label="Breadcrumb"><a href="{path_for(lang)}">{ui["home"]}</a> / {ui["services"]}</nav>
<h1>{escape(content["title"])}</h1><p class="intro">{escape(content["intro"])}</p>
<a class="cta" href="https://t.me/blackstackmng">{ui["cta"]} →</a>
<section><h2>{ui["scope"]}</h2><ul>{points}</ul></section>{sections}
<section><h2>{ui["related"]}</h2><ul>{related}<li><a href="/portfolio/">{ui["design"]}</a></li></ul></section>
<section class="contact"><h2>{ui["contact"]}</h2><p>{ui["note"]}</p>
<a class="cta" href="https://t.me/blackstackmng">Telegram: @blackstackmng</a>
<a class="email" href="mailto:blackstackst@gmail.com">blackstackst@gmail.com</a></section></main>
<footer><a href="{path_for(lang)}">BlackStack Studio</a><a href="/privacy.html">{ui["privacy"]}</a>
<a href="/terms.html">{ui["terms"]}</a></footer></body></html>''')
    metadata(soup, lang, path, content["title"] + " | BlackStack Studio", content["description"], alternatives(service["slug"]), content)
    write(path.lstrip("/") + "index.html", str(soup))


def main():
    paths = []
    for lang in LANGS:
        home(lang)
        paths.append(path_for(lang))
        for service in SERVICES:
            service_page(lang, service)
            paths.append(path_for(lang, service["slug"]))
    for filename, path in (("portfolio/index.html", "/portfolio/"), ("privacy.html", "/privacy.html"), ("terms.html", "/terms.html")):
        soup = soup_of((ROOT / filename).read_text(encoding="utf-8"))
        metadata(soup, "ru", path, soup.title.string, soup.find("meta", attrs={"name": "description"})["content"])
        write(filename, str(soup))
        paths.append(path)
    template = soup_of((ROOT / "cases/template.html").read_text(encoding="utf-8"))
    if not template.find("meta", attrs={"name": "robots"}):
        template.head.append(tag(template, "meta", **{"name": "robots", "content": "noindex, follow"}))
    write("cases/template.html", str(template))
    ET.register_namespace("", "http://www.sitemaps.org/schemas/sitemap/0.9")
    ns = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
    urlset = ET.Element(ns + "urlset")
    for path in paths:
        ET.SubElement(ET.SubElement(urlset, ns + "url"), ns + "loc").text = ORIGIN + path
    ET.indent(urlset)
    write("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n' + ET.tostring(urlset, encoding="unicode"))
    write("robots.txt", "User-agent: *\nAllow: /\n\nSitemap: " + ORIGIN + "/sitemap.xml")
    print(f"Built {len(paths)} indexable pages with static content and metadata.")


if __name__ == "__main__":
    main()
