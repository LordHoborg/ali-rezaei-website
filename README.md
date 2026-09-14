# ali-rezaei-website

Static Persian author website for https://alirezaeilegacy.ir/.

Serve the repository root with `python -m http.server 8765` for local review.
There is no package installation or application build step.

After editing `css/style.css`, run `python scripts/build-critical-css.py` and
commit the refreshed HTML files. The script copies base, header, hero and
responsive styles into each page for first paint. The remaining stylesheet and
Google Fonts load with `media="print"` and switch to `all` on load; `noscript`
links preserve styling when JavaScript is disabled.

`robots.txt` allows crawling and points to `sitemap.xml`. Add canonical public
HTML pages to the sitemap when publishing new articles; section anchors are not
separate pages. Deploy the repository root so both files are served at `/`.

The shared Open Graph/Twitter image is `images/social-preview.jpg` (1200×630).
It was created with the built-in Imagegen tool and resized for web delivery.
Prompt: a Persian author social banner with parchment and bronze colors, an
aged book and fountain pen, the name «علی رضائی», subtitle «نویسنده و پژوهشگر»,
and domain `alirezaeilegacy.ir`, with generous margins and no watermark.
