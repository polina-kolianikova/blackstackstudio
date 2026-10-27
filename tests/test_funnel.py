import re
import unittest
from pathlib import Path
from urllib.parse import parse_qs, urlsplit
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]


class FunnelTests(unittest.TestCase):
    def test_every_primary_page_has_localized_bot_entry(self):
        for lang in ("ru", "en", "uk", "ka"):
            prefix = "" if lang == "ru" else lang + "/"
            for route in ("", "services/web-development/", "services/automation-ai/",
                          "services/custom-software/"):
                page = BeautifulSoup((ROOT / (prefix + route + "index.html")).read_text(encoding="utf-8"),
                                     "html.parser")
                links = page.select('a[href^="https://t.me/blackstackstudio_bot?start="]')
                self.assertGreaterEqual(len(links), 2, prefix + route)
                for link in links:
                    value = parse_qs(urlsplit(link["href"]).query)["start"][0]
                    self.assertTrue(value.startswith(f"web_{lang}_"))
                    self.assertRegex(value, r"^[A-Za-z0-9_-]{1,64}$")
                    self.assertFalse(link.has_attr("data-tg-link"))
                    self.assertTrue(link.has_attr("data-bot-link"))
                self.assertEqual(len(page.select('script[src="/js/site.js?v=instagram1"]')), 1)

    def test_design_and_video_use_distinct_sources(self):
        for route, source in (("design", "design"), ("montage", "video")):
            page = BeautifulSoup((ROOT / route / "index.html").read_text(encoding="utf-8"), "html.parser")
            links = page.select('a[href^="https://t.me/blackstackstudio_bot?start="]')
            self.assertGreaterEqual(len(links), 2)
            self.assertTrue(all(f"web_ru_{source}_" in link["href"] for link in links))
            self.assertEqual(len(page.select('script[src="/js/site.js?v=instagram1"]')), 1)

    def test_direct_contact_and_privacy_remain_available(self):
        page = BeautifulSoup((ROOT / "index.html").read_text(encoding="utf-8"), "html.parser")
        self.assertTrue(page.select('a[href="https://t.me/blackstackmng"]'))
        self.assertTrue(page.select('a[href="mailto:blackstackst@gmail.com"]'))
        self.assertTrue(page.select('a[href="/privacy.html"]'))

    def test_instagram_entry_and_material_work_without_javascript(self):
        page = BeautifulSoup((ROOT / "instagram/index.html").read_text(encoding="utf-8"), "html.parser")
        links = page.select('a[data-bot-link]')
        self.assertGreaterEqual(len(links), 1)
        self.assertTrue(all(link["href"] == "https://t.me/blackstackstudio_bot?start=instagram_profile" for link in links))
        self.assertEqual(page.select_one('link[rel="canonical"]')["href"], "https://blackstackstudio.com/instagram/")
        self.assertIn("noindex", page.select_one('meta[name="robots"]')["content"])
        material = page.select_one("#brief-template").get_text()
        self.assertEqual(material + "\n", (ROOT / "instagram/brief-template.txt").read_text())
        self.assertTrue(page.select_one('a[href="/instagram/brief-template.txt"][download]'))
        self.assertTrue(page.select_one('a[href$="#projects"]'))
        self.assertNotIn("t.me/+", str(page))
        self.assertEqual(len(page.select("h1")), 1)


if __name__ == "__main__":
    unittest.main()
