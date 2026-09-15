"""Inline shared styles and local font declarations into every page (no dependencies)."""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
# Keep both CSS files as the source of truth. Inlining the complete small
# stylesheet removes the external CSS request and works without JavaScript.
css = "\n".join(
    (ROOT / path).read_text(encoding="utf-8")
    for path in ("css/fonts.css", "css/style.css")
)
if "@import" in css or "</style" in css.lower():
    raise ValueError("Inline CSS must not import stylesheets or close its style element")
critical = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
critical = re.sub(r"\s+", " ", critical).strip()
block = (
    '<!-- critical-css:start -->\n<style id="critical-css">'
    + critical
    + "</style>\n<!-- critical-css:end -->"
)

for page in [ROOT / "index.html", *sorted((ROOT / "articles").glob("*.html"))]:
    html = page.read_text(encoding="utf-8")
    html, count = re.subn(
        r"<!-- critical-css:start -->.*?<!-- critical-css:end -->",
        lambda _: block,
        html,
        flags=re.S,
    )
    if count != 1:
        raise ValueError(f"Expected one critical CSS block in {page}")
    page.write_text(html, encoding="utf-8")
    print(f"Updated {page.relative_to(ROOT)} ({len(critical.encode('utf-8'))} bytes)")
