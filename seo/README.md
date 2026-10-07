# SEO pages

The existing GitHub Pages site now has static Russian, English and Ukrainian home pages and three service pages in each language. The Russian home remains at `/`; English uses `/en/` and Ukrainian `/uk/`.

Edit `seo/home.html` for the home-page layout, `js/i18n.js` for translated copy, and `seo/services.json` for service content. Run the build after editing any of these inputs. The root home page and localized pages are generated files. The portfolio and legal pages keep their existing body content and receive metadata in place.

## Build and check

Requires Python 3.12+ and Node.js 22+.

```powershell
python -m pip install -r requirements-seo.txt
python scripts/build-seo.py
python -m unittest discover -s tests -v
node --check js/main.js
node --check js/i18n.js
python -m http.server 8876 --bind 127.0.0.1
```

The build writes 15 sitemap URLs: three home pages, nine service pages, the design portfolio and two legal pages. Each localized page has its own canonical URL, reciprocal hreflang links and content available without JavaScript. Language links navigate to the corresponding page; saved browser language no longer overrides a URL's language.

The site uses Organization, WebSite and WebPage structured data. Service pages additionally describe the visible service and breadcrumbs. No ratings, prices or office locations are invented. Social cards use the existing 640 by 640 studio logo because the old `/assets/og.png` URL does not exist.

`cases/template.html` and the existing administration page have noindex metadata and are absent from the sitemap. Robots are allowed to crawl so they can read noindex directives. Robots and noindex are not access controls. `_config.yml` excludes build inputs, dependencies and the source archive from the default GitHub Pages build.

The GitHub workflow checks syntax, static metadata, local resources, internal links, reciprocal translations, sitemap coverage and reproducibility. Generated files are committed so the existing Pages branch publishing can remain in use.

## Publishing and search verification

This change was prepared on 2026-10-07 against main commit `4c7c244`. The repository owner explicitly confirmed the connected GitHub account and authorized publication on 2026-10-07. Publish to the existing `main` branch and verify the GitHub Pages build and production responses before reporting completion.

After publication:

1. Confirm HTTP 200 for all sitemap URLs, robots.txt and sitemap.xml on the production domain. Confirm missing pages return 404.
2. Verify that language links and canonical URLs resolve to the production domain and that the old page content has not been restored by a separate deployment.
3. Keep the Google and Bing ownership files at the site root. Google Search Console ownership was verified on 2026-10-07. The home page was already indexed, with its last reported crawl on 2026-10-03. The new web-development page was accepted into Google's crawl queue on 2026-10-07. Queue submission does not establish indexing. The sitemap report still showed "Couldn't fetch", although Google's live inspection successfully fetched the same sitemap. Recheck this report in a later user-requested review; do not keep resubmitting unchanged URLs.
4. Check real search queries and indexed pages after Google has crawled the site. Schedule monitoring only if the user explicitly requests it.

A missing robots.txt or sitemap alone does not prohibit indexing. These changes provide crawlable content and discovery paths; they do not establish that Google has indexed the pages or guarantee rankings.

References: [Google's localized-page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions), [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).
