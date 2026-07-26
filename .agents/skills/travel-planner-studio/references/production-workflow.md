# Trip-plan production workflow

Use this workflow for multi-day trips, iterative planning, HTML review artifacts, and publishing.

## Contents

1. Intake and source of truth
2. Research and feasibility
3. Draft design
4. Consolidated review
5. Finalization and publishing
6. Post-trip learning

## 1. Intake and source of truth

Create one internal trip brief with:

- trip dates and accommodation nights
- travelers and decision maker
- arrival/departure details
- confirmed bookings and appointments
- pace, sleep schedule, mobility, heat and queue tolerance
- luggage, dietary, shopping, and language needs
- budget scope
- requested deliverable and publication status

Treat the latest confirmed artifact as the source of truth. Read it before editing. Merge feedback into it rather than answering with disconnected deltas.

Track decisions as:

| Item | State | Evidence | Downstream impact |
|---|---|---|---|
| Hotel, train, meal, activity, appointment | Confirmed / Recommended / Alternative / Unresolved | User statement or source | Days, maps, transport, luggage, budget, feedback |

Do not ask a long intake questionnaire. Produce a useful first pass and collect non-blocking decisions for one review gate.

## 2. Research and feasibility

Research only facts that affect execution. Check:

- arrival processing, ticket collection, and transfer buffers
- last entry and closing time
- train/bus service number, destination display, reservation status, and rural frequency
- hotel check-in/out and luggage handling
- walking distance, stairs, elevation, surface, shade, and bailout options
- restaurant branch, meal service, hours, booking/cancellation, price, rating source/date
- local transport payment and pass coverage
- weather, closures, events, holidays, and disruption notices

Create a hard-gate list before writing the day:

| Gate | Time | Required buffer | Consequence if missed | Fallback |
|---|---:|---:|---|---|

Work backward from each hard gate. Do not preserve a planned lunch, attraction, or shopping stop if it makes a fixed gate unrealistic.

## 3. Draft design

Build each day in this order:

1. Confirmed anchors
2. Intercity and airport transport
3. Luggage drop/retrieval
4. Geographic activity cluster
5. Meal anchors and nearby fallbacks
6. Rest/heat buffer
7. Weather/fatigue downgrade
8. Return and next-day preparation

Show one recommended main line. Add alternatives only when they solve a real risk or represent a meaningful tradeoff.

For maps, create separate links for:

- intercity segment
- station/airport to hotel
- hotel to first activity
- walking cluster
- meal/appointment transition
- final return/departure

Avoid one route with too many waypoints. Google Maps is a location and transit aid, not an authoritative hiking navigator.

## 4. Consolidated review

Default to an HTML review artifact when:

- the user asks for a webpage
- the trip is three days or longer
- two or more feedback rounds have made prose hard to compare
- the user needs to select among alternatives
- the plan will later be published

At the start of a new trip, tell the user this default in one compact confirmation and let them choose a different format. Do not repeatedly ask after they accept or leave the default unchanged.

The review artifact should expose:

- full-trip overview
- confirmed stays and bookings
- day timeline and hard gates
- maps and route buttons
- dining with rating source and booking status
- transport in the user's language plus English/local names
- luggage primary and backup options
- warnings and downgrade conditions
- action list
- one consolidated feedback section

Batch questions after the draft. Group them under:

1. Decisions that change the route
2. Preferences that change recommendations
3. Optional presentation/publishing choices

Do not ask the user to reconfirm facts they already confirmed.

## 5. Finalization and publishing

Before marking a plan final:

- replace “tentative” labels for confirmed items
- remove obsolete accommodation and route options
- reconcile all times with the latest bookings
- update maps, summaries, feedback defaults, copied text, and metadata
- display critical transport as an execution guide
- state the last checked date

Use two gates:

- **Content gate:** the user confirms itinerary content.
- **Launch gate:** the user authorizes public or private publication.

Publishing must use the exact validated source. Never publish an earlier review version after the content gate.

## 6. Post-trip learning

After travel, ask for a compact retrospective:

- What timing estimates were accurate or inaccurate?
- Which recommendations were worth repeating?
- Which restaurants, hotels, transfers, or storage options failed?
- Was the pace too light, right, or too full?
- Which preferences should become defaults?
- Which workflow rules should change for future trips?

Separate:

- personal preferences, saved only with explicit permission
- destination-specific facts, which may go stale
- reusable workflow improvements, which may update the Skill with explicit permission
