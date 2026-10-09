"""Validate the crawlable output, its routes, and the existing site links."""
import json
import re
import unittest
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
from xml.etree import ElementTree as ET

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://blackstackstudio.com"


def file_for(url):
    path = unquote(urlsplit(url).path)
    return ROOT / path.lstrip("/") / "index.html" if path.endswith("/") else ROOT / path.lstrip("/")


class SeoTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        xml = ET.parse(ROOT / "sitemap.xml")
        cls.urls = [node.text for node in xml.findall(".//{*}loc")]
        cls.pages = {url: BeautifulSoup(file_for(url).read_text(encoding="utf-8"), "html.parser") for url in cls.urls}

    def test_sitemap_and_robots(self):
        self.assertEqual(len(self.urls), 16)
        self.assertEqual(len(set(self.urls)), len(self.urls))
        self.assertIn("Sitemap: " + ORIGIN + "/sitemap.xml", (ROOT / "robots.txt").read_text())
        self.assertNotIn("Disallow: /", (ROOT / "robots.txt").read_text())
        self.assertTrue(all(url.startswith(ORIGIN + "/") and "#" not in url and "?" not in url for url in self.urls))
        self.assertFalse(any("template" in url or "bs-admin" in url for url in self.urls))

    def test_metadata_and_structured_data(self):
        titles = []
        descriptions = []
        for url, page in self.pages.items():
            with self.subTest(url=url):
                self.assertEqual(len(page.select("h1")), 1)
                self.assertEqual(len(page.select("title")), 1)
                titles.append(page.title.get_text())
                description = page.select_one('meta[name="description"]')["content"]
                self.assertTrue(50 < len(description) < 260)
                descriptions.append(description)
                self.assertEqual([el["href"] for el in page.select('link[rel="canonical"]')], [url])
                self.assertNotIn("noindex", page.select_one('meta[name="robots"]')["content"])
                self.assertEqual(page.select_one('meta[property="og:url"]')["content"], url)
                self.assertTrue(file_for(page.select_one('meta[property="og:image"]')["content"]).is_file())
                graph = json.loads(page.select_one('script[type="application/ld+json"]').string)["@graph"]
                self.assertIn("Organization", [node["@type"] for node in graph])
                webpage = next(node for node in graph if node["@type"] == "WebPage")
                self.assertEqual(webpage["url"], url)
                self.assertEqual(webpage["inLanguage"], page.html["lang"])
                if "/services/" in url:
                    service = next(node for node in graph if node["@type"] == "Service")
                    self.assertEqual(service["name"], page.h1.get_text())
        self.assertEqual(len(set(titles)), len(titles))
        self.assertEqual(len(set(descriptions)), len(descriptions))

    def test_reciprocal_languages_and_static_content(self):
        for url, page in self.pages.items():
            links = page.select("link[hreflang]")
            if not links:
                continue
            with self.subTest(url=url):
                alternates = {link["hreflang"]: link["href"] for link in links}
                self.assertEqual(set(alternates), {"ru", "en", "uk", "x-default"})
                self.assertEqual(alternates[page.html["lang"]], url)
                self.assertEqual(alternates["x-default"], alternates["ru"])
                for language in ("ru", "en", "uk"):
                    other = self.pages[alternates[language]]
                    self.assertEqual(other.html["lang"], language)
                    self.assertEqual({el["hreflang"]: el["href"] for el in other.select("link[hreflang]")}, alternates)
                    anchors = other.select(f'a[hreflang="{language}"]')
                    self.assertTrue(any(urljoin(alternates[language], a["href"]) == alternates[language] for a in anchors))
                self.assertGreater(len(page.body.get_text(" ", strip=True)), 1000)
                if page.html["lang"] == "en":
                    text = page.body.get_text(" ", strip=True)
                    text = text.replace("Русский", "").replace("Українська", "")
                    self.assertIsNone(re.search("[А-Яа-яЁёІіЇїЄє]", text))
                if "/services/" not in url:
                    self.assertTrue(page.select_one("#typewriter").get_text(strip=True))
                    scripts = [el.get("src", "") for el in page.select("script[src]")]
                    self.assertLess(scripts.index("/js/i18n.js?v=seo2"), scripts.index("/js/main.js?v=seo2"))

    def test_local_resources_and_internal_links(self):
        reached = set()
        for url, page in self.pages.items():
            for element in page.select("[href], [src]"):
                for attr in ("href", "src"):
                    raw = element.get(attr)
                    if not raw or raw.startswith(("data:", "mailto:", "tel:")):
                        continue
                    target = urljoin(url, raw)
                    if urlsplit(target).netloc != "blackstackstudio.com":
                        continue
                    with self.subTest(source=url, target=target):
                        self.assertTrue(file_for(target).is_file(), target)
                        if element.name == "a":
                            reached.add(target.split("#")[0])
                            fragment = urlsplit(target).fragment
                            if fragment:
                                destination = BeautifulSoup(file_for(target).read_text(encoding="utf-8"), "html.parser")
                                self.assertIsNotNone(destination.find(id=unquote(fragment)), target)
        self.assertTrue(set(self.urls).issubset(reached), set(self.urls) - reached)

    def test_template_is_not_indexable(self):
        for name in ("cases/template.html", "bs-admin/index.html"):
            page = BeautifulSoup((ROOT / name).read_text(encoding="utf-8"), "html.parser")
            self.assertIn("noindex", page.select_one('meta[name="robots"]')["content"])


if __name__ == "__main__":
    unittest.main()
