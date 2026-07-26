# Travel companion data contract

Use the bundled template in `assets/travel-companion-template/` only after the itinerary content gate. The review site helps decide the trip; the companion helps execute the confirmed trip on a phone.

## Required files

```text
travel-companion/
├── index.html
└── companion-data.js
```

Create and validate with the skill-local scripts:

```text
python scripts/create-travel-companion.py OUTPUT_DIR --title "Trip title" --destination "Destination" --dates "Dates"
node scripts/validate-travel-companion.mjs OUTPUT_DIR
```

`companion-data.js` sets `globalThis.TRAVEL_COMPANION`:

```js
globalThis.TRAVEL_COMPANION = {
  meta: {},
  days: [],
  bookings: [],
  toolkit: {},
  sources: []
};
```

## `meta`

Required: `title`, `subtitle`, `destination`, `dates`, `timezone`, `checkedOn`, and `storageKey`.

- Use an IANA timezone such as `Asia/Tokyo`.
- Keep `storageKey` stable across revisions so completion state survives updates.
- State that schedules and openings must still be reconfirmed when appropriate.

## `days`

```js
{
  id: "day1",
  date: "2026-07-21",
  dateLabel: "7月21日",
  city: "和歌山",
  route: "KIX → 和歌山",
  sunset: "19:08",
  hardGates: [],
  adjustments: {},
  events: []
}
```

### Event

```js
{
  id: "d1e1",
  time: "13:20",
  end: "14:30",
  kind: "arrival",
  icon: "✈️",
  title: "抵达机场",
  localName: "関西国際空港",
  romanized: "Kansai Kokusai Kuko",
  detail: "Collect bags and continue to the station.",
  duration: "About 70 minutes",
  destination: "Kansai International Airport",
  maps: {
    google: "https://...",
    apple: "https://...",
    official: "https://..."
  },
  hardGate: false,
  latest: "",
  consequence: "",
  fallback: "",
  physical: ["Indoor", "Luggage"],
  food: [],
  branches: [],
  guide: {}
}
```

Rules:

- Use stable, unique event IDs.
- Use local 24-hour `HH:MM` times. Do not put commentary in the time field.
- Mark reservations, last entry, rural departures, baggage retrieval, appointments, and airport cutoffs with `hardGate: true`.
- For a hard gate, populate `latest`, `consequence`, and `fallback`.
- Keep map links segmented and destination-specific.
- Use `branches` for simultaneous traveler routes; each branch may contain `label`, `title`, `localName`, `romanized`, `destination`, and `maps`.

### Guide

Use only when on-the-ground context is useful:

```js
guide: {
  tag: "Castle visit",
  summary: "What matters at this stop.",
  do: ["First action", "Second action"],
  see: ["Priority sight"],
  eat: ["Nearby useful order"],
  route: ["Step 1", "Step 2"],
  tips: ["Operational warning"],
  sources: [{ label: "Official source", url: "https://..." }]
}
```

### Adjustments

Provide offline, non-destructive downgrade advice:

```js
adjustments: {
  hot: { title: "Too hot", detail: "Take a taxi and drop the optional outdoor stop." },
  tired: { title: "Low energy", detail: "Keep the reservation and remove the flexible stop." },
  rain: { title: "Rain", detail: "Switch to the indoor fallback." }
}
```

Advice must preserve the next hard gate. Do not silently rewrite the confirmed plan.

## `bookings`

Include confirmed trains, flights, hotels, meals, tickets, and appointments. Use `id`, `icon`, `title`, `detail`, `date`, `time`, `localName`, and optional `referenceLabel`. Do not store booking reference numbers, passport data, payment details, or other secrets.

## `toolkit`

Use:

- `emergency`: concise destination-specific emergency or disruption actions
- `phrases`: traveler-facing phrases with `label`, `local`, and `romanized`
- `notes`: offline limitations, connectivity, and progress behavior

## Quality rules

- Generate only after itinerary content is confirmed.
- Copy from the latest confirmed source of truth; never from an earlier review artifact.
- Remove unresolved choices or label them as explicit contingency branches.
- Revalidate times, links, bookings, hard gates, local names, and checked-on date.
- Keep progress local to the device and provide reset/undo controls.
- Make the primary screen answer: where am I, what is next, when must I leave, and what is the safest downgrade?
- Validate after every material edit and before publishing.

