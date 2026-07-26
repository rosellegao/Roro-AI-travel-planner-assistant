#!/usr/bin/env python3
"""Create a portable interactive trip-site project from the bundled template."""

from __future__ import annotations

import argparse
import json
import re
import shutil
from datetime import date
from pathlib import Path


def js_string_content(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)[1:-1]


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "trip-plan"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output_dir", type=Path)
    parser.add_argument("--title", required=True)
    parser.add_argument("--destination", required=True)
    parser.add_argument("--dates", required=True)
    parser.add_argument("--force", action="store_true", help="Replace only the two template files.")
    args = parser.parse_args()

    skill_dir = Path(__file__).resolve().parent.parent
    template_dir = skill_dir / "assets" / "trip-site-template"
    output_dir = args.output_dir.resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    targets = [output_dir / "index.html", output_dir / "trip-data.js"]
    existing = [path for path in targets if path.exists()]
    if existing and not args.force:
        names = ", ".join(path.name for path in existing)
        raise SystemExit(f"Refusing to overwrite {names}; pass --force to replace template files.")

    shutil.copy2(template_dir / "index.html", output_dir / "index.html")
    data = (template_dir / "trip-data.js").read_text(encoding="utf-8")
    data = data.replace("__TRIP_TITLE__", js_string_content(args.title))
    data = data.replace("__DESTINATION__", js_string_content(args.destination))
    data = data.replace("__DATES__", js_string_content(args.dates))
    data = data.replace("YYYY-MM-DD", date.today().isoformat())
    data = data.replace('slug: "trip-plan"', f'slug: "{slugify(args.title)}"', 1)
    (output_dir / "trip-data.js").write_text(data, encoding="utf-8")

    print(output_dir)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
