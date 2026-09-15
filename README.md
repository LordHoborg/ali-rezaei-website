# ali-rezaei-website

Static Persian author website for https://alirezaeilegacy.ir/.

Serve the repository root with `python -m http.server 8765` for local review.
There is no package installation or application build step.

After editing `css/style.css` or `css/fonts.css`, run
`python scripts/build-critical-css.py` and commit the refreshed HTML files.
The script now embeds the complete shared CSS, including local font declarations,
in each page. No external stylesheet request or JavaScript is needed for styling.
The existing `critical-css` markers remain the generated block boundaries.
Font files live in `fonts/`, use `font-display: swap`, and retain their OFL licenses.
Serve the site from the domain root so `/fonts/` URLs resolve on article pages too.

`robots.txt` allows crawling and points to `sitemap.xml`. Add canonical public
HTML pages to the sitemap when publishing new articles; section anchors are not
separate pages. Deploy the repository root so both files are served at `/`.

The shared Open Graph/Twitter image is `images/social-preview.jpg` (1200×630).
It is also displayed in the homepage hero; the header keeps the original logo.
It was created with the built-in Imagegen tool and resized for web delivery.
Prompt: a Persian author social banner with parchment and bronze colors, an
aged book and fountain pen, the name «علی رضائی», subtitle «نویسنده و پژوهشگر»,
and domain `alirezaeilegacy.ir`, with generous margins and no watermark.

The fantasy thriller essay (۲۲ شهریور ۱۴۰۵ / 2026-09-13) is the final journal
entry at `/#fantasy-thriller-ingredients`, using the existing expand/collapse UI.
