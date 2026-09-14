"""Refresh inline first-paint styles from the shared stylesheet (no dependencies)."""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
css = (ROOT / "css/style.css").read_text(encoding="utf-8")
# Base, header and hero styles, plus responsive layout rules. Keep the full
# stylesheet as the source of truth; never edit the generated HTML block.
critical = css[:css.index(".hero-portrait {")]
responsive_start = css.index("@media (max-width: 1024px)")
responsive_end = css.index("/* ============ ANIMATIONS", responsive_start)
critical += css[responsive_start:responsive_end]
critical = re.sub(r"/\*.*?\*/", "", critical, flags=re.S)
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
