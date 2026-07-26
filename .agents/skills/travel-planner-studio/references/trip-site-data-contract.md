# Interactive trip-site data contract

Use the bundled template in `assets/trip-site-template/`. Keep itinerary content in `trip-data.js` and presentation behavior in `index.html`.

## Required files

```text
trip-site/
├── index.html
└── trip-data.js
```

Create a new project with the skill-local script (resolve the script path relative to `SKILL.md`):

```text
python scripts/create-trip-project.py OUTPUT_DIR --title "Trip title" --destination "Destination" --dates "Dates"
```

Validate it with the skill-local validator:

```text
node scripts/validate-trip-site.mjs OUTPUT_DIR
```

## Top-level model

`trip-data.js` sets `globalThis.TRIP_PLAN`:

```js
globalThis.TRIP_PLAN = {
  meta: {},
  routeStops: [],
  stays: [],
  days: [],
  transportGuide: [],
  actionItems: [],
  feedback: [],
  sources: []
};
```

## `meta`

Required:

- `title`
- `subtitle`
- `destination`
- `dates`
- `checkedOn` using `YYYY-MM-DD`
- `slug` using lowercase letters, numbers, and hyphens

Optional:

- `eyebrow`
- `status`
- `footer`

## `stays`

Use one entry per confirmed or active accommodation:

```js
{
  date: "Day/date",
  name: "Traveler-facing name",
  localName: "Local-language name",
  status: "Confirmed",
  detail: "Location and operational note",
  mapUrl: "https://..."
}
```

Do not retain rejected hotel options unless they remain genuine fallbacks.

## `days`

Each day requires:

```js
{
  id: "day1",
  date: "Date",
  place: "Place",
  theme: "Theme",
  summary: "One-sentence day logic",
  status: "Confirmed | Recommended | Draft",
  timeline: [],
  map: {},
  alternatives: [],
  dining: [],
  notices: []
}
```

### Timeline item

```js
{
  time: "10:06–11:37",
  title: "Chinese/user-language title",
  english: "English or transliteration",
  local: "Local-language name",
  detail: "Execution note",
  status: "Verified | Confirmed | Estimate | Needs confirmation",
  hardGate: true
}
```

Use `hardGate: true` for last entry, reserved trains, meals, appointments, and departure cutoffs.

### Map

```js
{
  query: "Map search query",
  caption: "What this map represents",
  actions: [
    { label: "Segment label", url: "https://www.google.com/maps/..." }
  ]
}
```

Prefer several leg links over a single route with many waypoints.

### Alternative

```js
{
  name: "Rain plan",
  tag: "Weather fallback",
  detail: "When and why to use it",
  tradeoffs: ["What is removed", "What remains"]
}
```

### Dining

```js
{
  name: "Venue",
  localName: "Local name",
  meal: "Dinner",
  rating: "3.68",
  ratingSource: "Tabelog",
  checkedOn: "YYYY-MM-DD",
  price: "Currency range per person",
  booking: "Booked | Reserve | Walk-in | Needs confirmation",
  detail: "Why it fits this day",
  mapUrl: "https://...",
  sourceUrl: "https://..."
}
```

If a rating is unavailable or stale, use `Needs confirmation`; never fabricate a score.

## `transportGuide`

Create one entry per critical segment:

```js
{
  date: "Date",
  label: "Origin → destination",
  service: "Traveler-language service name",
  english: "English service name",
  local: "Local-language service name",
  origin: "Origin in all useful languages",
  destination: "Destination in all useful languages",
  direction: "Destination display",
  time: "Departure–arrival",
  reservation: "Reserved / Required / Not required",
  instructions: ["Step 1", "Step 2"],
  sourceUrl: "https://..."
}
```

## `actionItems`

Use priority, action, deadline, status, and reason. Keep only actions that still require attention.

## `feedback`

Use feedback only for unresolved or explicitly reviewable choices:

```js
{
  key: "day3",
  label: "Day 3 route",
  default: "Recommended option",
  options: ["Recommended option", "Rain fallback"]
}
```

Do not ask the user to select a hotel that is already confirmed. The template stores choices in browser local storage and provides a copy button.

## `sources`

Use descriptive labels and direct URLs. Keep citations near itinerary claims as well as in the source list when useful.

## Editing rules

- Escape user-supplied text through the renderer; do not inject raw HTML.
- Use direct official or booking URLs, not search-result pages, for factual claims.
- Keep map embeds query-based so the template works without an API key.
- Preserve all required fields when changing a confirmed item.
- Update `checkedOn` after material re-verification.
- Run validation after every content change and before publication.
