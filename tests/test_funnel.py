import re
import unittest
from pathlib import Path
from urllib.parse import parse_qs, urlsplit
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]


class FunnelTests(unittest.TestCase):
    def test_every_primary_page_has_localized_bot_entry(self):
        for lang in ("ru", "en", "uk"):
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

    def test_design_and_video_use_distinct_sources(self):
        for route, source in (("design", "design"), ("montage", "video")):
            page = BeautifulSoup((ROOT / route / "index.html").read_text(encoding="utf-8"), "html.parser")
            links = page.select('a[href^="https://t.me/blackstackstudio_bot?start="]')
            self.assertGreaterEqual(len(links), 2)
            self.assertTrue(all(f"web_ru_{source}_" in link["href"] for link in links))

    def test_direct_contact_and_privacy_remain_available(self):
        page = BeautifulSoup((ROOT / "index.html").read_text(encoding="utf-8"), "html.parser")
        self.assertTrue(page.select('a[href="https://t.me/blackstackmng"]'))
        self.assertTrue(page.select('a[href="mailto:blackstackst@gmail.com"]'))
        self.assertTrue(page.select('a[href="/privacy.html"]'))


if __name__ == "__main__":
    unittest.main()
