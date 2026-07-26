# Full travel-plan output contract

Use the smallest useful version of this structure. A short outing does not need an international-trip handbook.

## 1. Trip at a glance

- destination, dates, trip days, and accommodation nights
- travelers and trip purpose
- pace and budget scope
- recommended base or route
- one-sentence planning logic
- assumptions that materially affect the plan

## 2. Before you book

List the decisions and reservations in priority order:

| Priority | Action | Deadline or lead time | Cost/status | Why it matters |
|---|---|---|---|---|

## 3. Day-by-day itinerary

For each day include:

```text
Day N - date - area/theme
Morning: time, activity, duration, booking status, cost
Lunch: neighborhood or verified venue
Afternoon: time, activity, duration, booking status, cost
Evening: activity/meal and return plan
Movement: route, mode, realistic duration, buffer
Dining: verified anchor or neighborhood shortlist, booking status, fallback
Daily spend: per person or group, with currency
Fallback: weather/fatigue/closure alternative
Notes: dress, tickets, accessibility, or timing constraints
```

Use a table only when it remains readable. Dense days are usually clearer as short subsections.

For every hard gate, show the consequence of missing it and the fallback. For critical transport, add the English/transliterated and local-language names plus the destination display.

## 4. Budget

| Category | Per person | Group total | Confidence/source |
|---|---:|---:|---|

Include scope, currency, `as of` date, contingency, total range, and budget gap or surplus. Separate live quotes from planning estimates.

## 5. Logistics

Cover only what is relevant:

- arrival and departure transfers
- local and intercity transport
- neighborhood or accommodation strategy
- connectivity and payment
- luggage handling and check-in/check-out gaps
- reservation links or official information pages

For uncertain luggage capacity, provide one primary method and at least two realistic backups with hours and retrieval deadlines.

## 6. Dining plan

For food-focused trips or whenever named restaurants are requested, include a compact shortlist using [dining-recommendations.md](dining-recommendations.md). Show price per person, geographic fit, exact booking method, cancellation exposure, dietary fit, fallback, and `checked on` date.

## 7. Preparation and packing

Organize into:

- documents and bookings
- money and connectivity
- clothing by actual weather and activities
- health and personal needs
- activity-specific equipment
- group-shared items

Mark unusual essentials and items that must stay in carry-on. Avoid generic exhaustive lists.

## 8. Culture, safety, and entry

Include concise, destination-specific guidance. Cite official sources for entry rules, advisories, laws, health requirements, and emergency numbers. Separate confirmed requirements from general advice.

## 9. Verification notes

Summarize:

- what was checked and on what date
- what remains an estimate
- what must be reconfirmed before booking or departure
- the plan's biggest operational risk and fallback

## 10. Interactive review site

When the user requests HTML, maps, restaurant ratings, several alternatives, or an easier review surface, create one cumulative interactive site using [trip-site-data-contract.md](trip-site-data-contract.md). Include:

- route and confirmed-stay overview
- one section per day with timing, movement, dining, maps, and fallback
- hard-gate warnings
- luggage primary and backup options
- transport guide in the user's language, English, and local language
- current rating source/date and reservation status
- consolidated feedback controls only for unresolved choices
- sources and checked-on date

Update the same artifact throughout review. Separate content confirmation from publication approval.

## 11. Next three actions

End with exactly three prioritized actions that move the trip forward.

## 12. On-trip companion

After itinerary content is confirmed, create the mobile companion using [travel-companion-data-contract.md](travel-companion-data-contract.md). Keep it separate from the review site and optimize it for execution:

- current day and next step
- countdown and hard gates
- complete, skip, undo, reset, and resume controls
- heat, fatigue, and rain downgrade advice
- maps, local names, driver cards, guides, bookings, and useful phrases
- local progress storage and offline limitations

Do not carry unresolved review choices into the companion unless they are explicit operational contingency branches.
