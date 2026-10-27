"""Build crawlable pages for the existing static GitHub Pages site."""
import json
import re
import subprocess
from html import escape
from pathlib import Path
from xml.etree import ElementTree as ET

from bs4 import BeautifulSoup, NavigableString

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://blackstackstudio.com"
LANGS = ("ru", "en", "uk", "ka")
LOCALES = {"ru": "ru_RU", "en": "en_US", "uk": "uk_UA", "ka": "ka_GE"}
SERVICES = json.loads((ROOT / "seo/services.json").read_text(encoding="utf-8"))
I18N = json.loads(subprocess.check_output(
    ["node", "-e", "process.stdout.write(JSON.stringify(require('./js/i18n.js')))"],
    cwd=ROOT, encoding="utf-8",
))
I18N["ka"] = json.loads((ROOT / "seo/ka.json").read_text(encoding="utf-8"))
KA_SERVICES = json.loads((ROOT / "seo/ka-services.json").read_text(encoding="utf-8"))
PAGE_ROWS = json.loads((ROOT / "seo/page-translations.json").read_text(encoding="utf-8"))
PAGE_COPY = {lang: {row[0]: row[index] for row in PAGE_ROWS} for index, lang in enumerate(LANGS)}
PAGE_COPY["ka"].update(json.loads((ROOT / "seo/ka-design-tags.json").read_text(encoding="utf-8")))
VIDEO_I18N = json.loads(subprocess.check_output(["node", "-e", r"""
const fs = require('node:fs'), vm = require('node:vm');
const context = {};
vm.runInNewContext(fs.readFileSync('js/video-runtime.js','utf8').split('const STORAGE_KEY')[0] + ';result=I18N;', context);
const text = fs.readFileSync('js/video-page.js','utf8');
for (const match of text.matchAll(/Object\.assign\(I18N\.(ru|en|uk), (\{[\s\S]*?\})\);/g)) {
  vm.runInNewContext('Object.assign(result.' + match[1] + ',' + match[2] + ')', context);
}
process.stdout.write(JSON.stringify(context.result));
"""], cwd=ROOT, encoding="utf-8"))
VIDEO_I18N["ka"] = I18N["ka"]
for service in SERVICES:
    service["ka"] = KA_SERVICES[service["slug"]]
COPY = {
    "ka": {
        "title": "ვებსაიტები, პროგრამები და AI ავტომატიზაცია | BlackStack Studio",
        "description": "BlackStack Studio ქმნის ვებსაიტებს, აპლიკაციებს, Telegram ბოტებსა და AI ავტომატიზაციას ბიზნესისთვის. დიზაინი, ინტეგრაციები, გაშვება და მხარდაჭერა.",
        "home": "მთავარი", "services": "სერვისები", "scope": "რას ვქმნით",
        "delivery": "როგორ ვმუშაობთ", "estimate": "ფასი, ვადები და სამუშაოს დაწყება",
        "proof": "რით დავიწყოთ", "related": "სხვა მიმართულებები", "more": "ვრცლად სერვისის შესახებ",
        "cta": "განვიხილოთ პროექტი", "design": "დიზაინის პორტფოლიო", "contact": "დაუკავშირდით BlackStack-ს",
        "note": "აღწერეთ ამოცანა, მიმდინარე პროცესი და სასურველი შედეგი. შეგიძლიათ დაურთოთ ბმულები და მაგალითები.",
        "privacy": "კონფიდენციალურობა (რუსულად)", "terms": "მუშაობის პირობები (რუსულად)",
    },
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


def localized_route(lang, route):
    return ("" if lang == "ru" else f"/{lang}") + route


def language_menu(lang, route):
    names = {"ru": "Русский", "en": "English", "uk": "Українська", "ka": "ქართული"}
    labels = {"ru": "Выбрать язык", "en": "Choose language", "uk": "Обрати мову", "ka": "ენის არჩევა"}
    links = "".join(f'<a data-language="{code}" href="{localized_route(code, route)}" hreflang="{code}" lang="{code}"'
                    f'{" aria-current=\"page\"" if code == lang else ""}>{names[code]}</a>' for code in LANGS)
    return soup_of(f'''<details class="language-menu" data-ui="language"><summary aria-label="{labels[lang]}">
<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z"/></svg>
<span>{lang.upper()}</span><svg class="language-chevron" aria-hidden="true" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m2 4 4 4 4-4"/></svg>
</summary><nav aria-label="{labels[lang]}">{links}</nav></details>''').details


def language_assets(soup, lang, route):
    for old in soup.select('.language-menu, script[src^="/js/language.js"], link[href^="/css/language.css"], link[href="/assets/fonts/georgian.css"]'):
        old.decompose()
    menu = language_menu(lang, route)
    old = soup.select_one("#langSwitch") or soup.select_one('.service-nav nav[aria-label="Language"]')
    if old:
        old.replace_with(menu)
    else:
        header = soup.select_one(".design-nav, .terms-nav, .privacy-nav, .case-nav")
        if header:
            header.append(menu)
    soup.head.insert(0, tag(soup, "script", src="/js/language.js?v=20261027"))
    soup.head.append(tag(soup, "link", rel="stylesheet", href="/css/language.css?v=20261027"))
    if not soup.select_one('link[href="/assets/fonts/georgian.css"]'):
        soup.head.append(tag(soup, "link", rel="stylesheet", href="/assets/fonts/georgian.css"))
    if lang == "ka" and not soup.select_one('script[src^="/js/i18n-ka.js"]'):
        soup.head.insert(1, tag(soup, "script", src="/js/i18n-ka.js?v=20261027"))
    for link in soup.select('a[href]'):
        if link.has_attr("data-language"):
            continue
        href = link["href"]
        if href.startswith(("/design/", "/montage/", "/services/")):
            link["href"] = localized_route(lang, href)
        elif href == "/" or href.startswith("/#"):
            link["href"] = localized_route(lang, href)
    if lang != "ru":
        for link in soup.select('a[href="/privacy.html"], a[href="/terms.html"]'):
            link.string = COPY[lang]["privacy" if "privacy" in link["href"] else "terms"]


def translate_page(soup, lang):
    for text in list(soup.body.find_all(string=True)):
        if text.parent.name in ("script", "style"):
            continue
        value = text.strip()
        if value in PAGE_COPY[lang]:
            text.replace_with(str(text).replace(value, PAGE_COPY[lang][value]))
    for element in soup.select('[aria-label], [placeholder], [title]'):
        for attr in ("aria-label", "placeholder", "title"):
            if element.get(attr) in PAGE_COPY[lang]:
                element[attr] = PAGE_COPY[lang][element[attr]]


def portfolio_page(lang, route, source):
    soup = soup_of(source)
    soup.html["lang"] = lang
    translate_page(soup, lang)
    video = route == "/montage/"
    if not video:
        soup.body["class"] = list(soup.body.get("class", [])) + ["bs-design"]
    if video:
        for element in soup.select('[data-i18n]'):
            key = element["data-i18n"]
            if key not in VIDEO_I18N[lang]:
                raise ValueError(f'Missing {lang} video translation: {key}')
            element.string = VIDEO_I18N[lang][key]
    titles = {
        "ru": ("Дизайн | BlackStack Studio", "Видео | BlackStack Studio"),
        "en": ("Design | BlackStack Studio", "Video Editing | BlackStack Studio"),
        "uk": ("Дизайн-портфоліо | BlackStack Studio", "Відеомонтаж | BlackStack Studio"),
        "ka": ("დიზაინი | BlackStack Studio", "ვიდეომონტაჟი | BlackStack Studio"),
    }
    descriptions = {
        "ru": ("Инфографика, презентации, веб-дизайн, логотипы, фирменный стиль и графика. Портфолио участников BlackStack Studio.", "Монтаж BlackStack Studio: Reels, Shorts, YouTube, 2D- и 3D-анимация, горизонтальные и AI-видео. Работы специалистов нашей команды."),
        "en": ("Infographics, presentations, web design, logos, brand identities and graphics. Explore work by the designers at BlackStack Studio.", "BlackStack Studio video editing: Reels, Shorts, YouTube, 2D and 3D animation, landscape and AI videos. Work by our team’s editors."),
        "uk": ("Інфографіка, презентації, вебдизайн, логотипи, фірмовий стиль і графіка. Портфоліо учасників BlackStack Studio.", "Відеомонтаж BlackStack Studio: Reels, Shorts, YouTube, 2D- та 3D-анімація, горизонтальні й AI-відео. Роботи фахівців нашої команди."),
        "ka": ("ინფოგრაფიკა, პრეზენტაციები, ვებდიზაინი, ლოგოტიპები, ბრენდის იდენტობა და გრაფიკა. BlackStack Studio-ს დიზაინერების პორტფოლიო.", "BlackStack Studio: Reels, Shorts, YouTube, 2D და 3D ანიმაცია, ჰორიზონტალური და AI ვიდეოები. ჩვენი გუნდის მონტაჟის სპეციალისტების ნამუშევრები."),
    }
    for link in soup.select('a[data-bot-link]'):
        link["href"] = f'https://t.me/blackstackstudio_bot?start=web_{lang}_{"video" if video else "design"}_{link["data-bot-link"]}'
    path = localized_route(lang, route)
    alternates = {**{code: localized_route(code, route) for code in LANGS}, "x-default": route}
    metadata(soup, lang, path, titles[lang][int(video)], descriptions[lang][int(video)], alternates)
    language_assets(soup, lang, route)
    if not video:
        soup.head.insert(2, tag(soup, "script", src="/js/page-copy.js?v=20261027"))
    write(path.lstrip("/") + "index.html", str(soup))


def refinement(soup):
    """Keep the accepted visual layer on every generated public page."""
    soup.html["data-refined"] = "20261026b"
    classes = list(soup.body.get("class", []))
    if "bs-refined" not in classes:
        classes.append("bs-refined")
    if soup.select_one("#heroCanvas") and "bs-home" not in classes:
        classes.append("bs-home")
    soup.body["class"] = classes
    styles = ("/assets/fonts/onest.css", "/css/refinement.css?v=usability20261026")
    for href in styles:
        for old in soup.select("link[href]"):
            if old["href"].split("?")[0] == href.split("?")[0]:
                old.decompose()
        soup.head.append(tag(soup, "link", rel="stylesheet", href=href))
    for script in list(soup.select("script[src]")):
        path = script["src"].split("?")[0]
        if path == "/js/refinement.js":
            script.decompose()
        elif path in ("/js/main.js", "/js/cursor.js", "/js/three-scene.js", "/js/spiral-integration.js", "/portfolio/showcase.js"):
            script["src"] = path + "?v=usability20261026"
    for link in soup.select('link[href]'):
        if link["href"].split("?")[0] == "/css/spiral-integration.css":
            link["href"] = "/css/spiral-integration.css?v=usability20261026"
    soup.body.append(tag(soup, "script", src="/js/refinement.js?v=usability20261026", defer=""))


def metadata(soup, lang, path, title, description, alternates=None, service=None):
    refinement(soup)
    title, description = str(title), str(description)
    head = soup.head
    for item in head.select('title, meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], link[hreflang], script[type="application/ld+json"]'):
        item.decompose()
    for item in list(head.children):
        if isinstance(item, NavigableString) and not item.strip():
            item.extract()
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
    translate_page(soup, lang)
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
            el.string = {"ru": "1ч", "en": "1h", "uk": "1 год", "ka": "1 სთ"}[lang]
    # Preserve accessible, real numbers in HTML before counters animate.
    for el in soup.select("[data-count]"):
        suffixes = {"en": {"ч": "h", " дн": " days"}, "uk": {"ч": " год", " дн": " дн"}, "ka": {"ч": " სთ", " дн": " დღე"}}
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
    for el in soup.select("[data-bot-link]"):
        el["href"] = f"https://t.me/blackstackstudio_bot?start=web_{lang}_home_{el['data-bot-link']}"
        el["target"] = "_blank"
        el["rel"] = "noopener noreferrer"
    for el in soup.select("[data-ig-link]"):
        el["href"] = "https://www.instagram.com/blackstack_studio/"
    for index, key in ((0, "m1.name"), (1, "m2.name")):
        soup.select(".member__photo")[index]["alt"] = I18N[lang][key]
    for el in soup.select(".card__tags span"):
        if el.get_text() == "AI-агенты":
            el.string = {"ru": "AI-агенты", "en": "AI agents", "uk": "AI-агენტი", "ka": "AI აგენტები"}[lang]
    for service in SERVICES:
        title = soup.select_one(f'[data-i18n="card{service["card"]}.title"]')
        if title is None:
            continue
        article = title.find_parent("article")
        link = tag(soup, "a", href=path_for(lang, service["slug"]), **{"class": "service-link"})
        link.string = COPY[lang]["more"] + " →"
        article.append(link)
    for key, slug in (("footer.col1.1", "web-development"), ("footer.col1.2", "automation-ai"), ("footer.col1.4", "automation-ai")):
        soup.select_one(f'[data-i18n="{key}"]')["href"] = path_for(lang, slug)
    soup.select_one('[data-i18n="footer.col1.3"]')["href"] = "/design/"
    # Add real links on the interface-design card too.
    design_title = soup.select_one('[data-i18n="card3.title"]')
    if design_title is not None:
        design = design_title.find_parent("article")
        link = tag(soup, "a", href="/design/", **{"class": "service-link"})
        link.string = COPY[lang]["design"] + " →"
        design.append(link)
    main_script = soup.find("script", src=re.compile(r"/js/main\.js"))
    main_script["src"] = "/js/main.js?v=seo2"
    main_script.insert_before(tag(soup, "script", src="/js/i18n.js?v=seo2", defer=""))
    soup.find("link", href=re.compile(r"/css/style\.css"))["href"] = "/css/style.css?v=seo2"
    metadata(soup, lang, path_for(lang), COPY[lang]["title"], COPY[lang]["description"], alternatives())
    language_assets(soup, lang, "/")
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
<a class="cta" data-bot-link="hero" href="https://t.me/blackstackstudio_bot?start=web_{lang}_{service["slug"]}_hero">{ui["cta"]} →</a>
<section><h2>{ui["scope"]}</h2><ul>{points}</ul></section>{sections}
<section><h2>{ui["related"]}</h2><ul>{related}<li><a href="/design/">{ui["design"]}</a></li></ul></section>
<section class="contact"><h2>{ui["contact"]}</h2><p>{ui["note"]}</p>
<a class="cta" data-bot-link="contact" href="https://t.me/blackstackstudio_bot?start=web_{lang}_{service["slug"]}_contact">{ui["cta"]} · Telegram</a>
<a class="email" href="mailto:blackstackst@gmail.com">blackstackst@gmail.com</a></section></main>
<footer><a href="{path_for(lang)}">BlackStack Studio</a><a href="/privacy.html">{ui["privacy"]}</a>
<a href="/terms.html">{ui["terms"]}</a></footer>
<script defer src="/js/site.js?v=instagram1"></script></body></html>''')
    metadata(soup, lang, path, content["title"] + " | BlackStack Studio", content["description"], alternatives(service["slug"]), content)
    language_assets(soup, lang, f'/services/{service["slug"]}/')
    write(path.lstrip("/") + "index.html", str(soup))


def main():
    write("js/i18n-ka.js", "window.BlackStackGeorgian = " + json.dumps(I18N["ka"], ensure_ascii=False) + ";")
    write("js/page-copy.js", "window.BlackStackPages = " + json.dumps(PAGE_COPY, ensure_ascii=False) + ";")
    paths = []
    for lang in LANGS:
        home(lang)
        paths.append(path_for(lang))
        for service in SERVICES:
            service_page(lang, service)
            paths.append(path_for(lang, service["slug"]))
    for route in ("/design/", "/montage/"):
        template_path = ROOT / ("seo/" + route.strip("/") + ".html")
        source = template_path.read_text(encoding="utf-8")
        for lang in LANGS:
            portfolio_page(lang, route, source)
            paths.append(localized_route(lang, route))
    for filename, path in (("privacy.html", "/privacy.html"), ("terms.html", "/terms.html")):
        soup = soup_of((ROOT / filename).read_text(encoding="utf-8"))
        metadata(soup, "ru", path, soup.title.string, soup.find("meta", attrs={"name": "description"})["content"])
        language_assets(soup, "ru", "/")
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
