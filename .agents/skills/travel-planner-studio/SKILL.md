---
name: travel-planner-studio
description: Create, revise, validate, and publish personalized travel plans and mobile on-trip companions for vacations, outings, business trips, family travel, food trips, and multi-city itineraries. Use when the user asks to plan a trip, turn bookings and preferences into a day-by-day route, compare destinations or transport passes, recommend and verify restaurants, build maps and luggage contingencies, create an interactive HTML trip site, consolidate iterative feedback into one final plan, generate a time-aware travel assistant after itinerary confirmation, or conduct a post-trip retrospective. Combine current primary-source research with confirmed bookings, realistic buffers, decision-ready alternatives, explicit verification labels, and an execution-focused companion.
---

# Travel Planner Studio

Create an executable trip operating plan, not a destination article. Preserve confirmed decisions, verify time-sensitive facts, expose hard deadlines, and keep one cumulative source of truth.

## Load the right context

1. Read trip attachments, confirmations, screenshots, notes, existing itineraries, and current project files before proposing changes.
2. If `.travel-planner/preferences.json` exists, read it as defaults. At the start of each new trip, summarize the active defaults in one compact confirmation and let the user override them. Do not reconfirm every field separately. Never create or change the file without explicit permission. See [references/preferences.md](references/preferences.md).
3. For Japan, read [references/japan-playbook.md](references/japan-playbook.md).
4. For named restaurants or food-focused trips, read [references/dining-recommendations.md](references/dining-recommendations.md).
5. For a multi-day plan, iterative review, HTML deliverable, travel companion, or publishing request, read [references/production-workflow.md](references/production-workflow.md).
6. For an on-trip assistant, read [references/travel-companion-data-contract.md](references/travel-companion-data-contract.md).
7. For live flight/accommodation comparison or multi-city optimization, read `../../../integrations/nomad-travel-planner-mcp/SKILL.md` and use its tools when available.

## Establish the trip brief

Extract:

- destinations, dates, duration, arrival/departure points, and traveler count
- confirmed flights, trains, hotels, meals, appointments, tickets, and other immovable commitments
- pace, mobility, sleep pattern, heat tolerance, walking tolerance, accessibility, and luggage
- interests, must-dos, dislikes, shopping goals, and dining priorities
- budget, currency, accommodation and transport preferences
- dietary, medical, religious, language, safety, and passport constraints
- desired output: answer, itinerary, comparison, handbook, HTML review site, or published site

Ask only when a missing answer would materially change the route or create risk. Continue with clearly labeled assumptions otherwise.

Batch non-blocking questions. Keep a decision log while working, then present one consolidated decision list after a useful draft. Interrupt earlier only for a choice that changes dates, destination, bookings, safety, access, or irreversible external actions.

## Lock facts before designing

Maintain four states:

- **Confirmed:** user-booked or explicitly accepted; treat as fixed until changed.
- **Recommended:** current best plan.
- **Alternative:** a real fallback with a distinct tradeoff.
- **Unresolved:** requires confirmation or cannot yet be verified.

Do not keep stale hotel, route, or restaurant options after the user confirms one unless they remain operational fallbacks. When a confirmed fact changes, update every affected day, map, transport segment, budget, feedback control, and summary—not just the sentence where it appeared.

## Research current facts

Browse whenever schedules, rules, prices, openings, weather, safety, ratings, or recommendations may have changed.

Use this source order:

1. Official immigration, health, weather, transit, attraction, operator, restaurant, and hotel sources.
2. Official booking/provider results for prices, availability, reservations, and cancellation terms.
3. Reputable local or specialist sources for qualitative recommendations.
4. Review platforms and recent maps/reviews for sentiment and operational warnings.

For every material transport segment, verify departure/arrival station, operator, train/bus name, service number when useful, destination display, reservation requirement, last viable service, and realistic transfer buffer.

For every named restaurant, verify the current branch, relevant meal service, opening days/hours, price basis, booking route, cancellation exposure, geographic fit, and rating source/date. Use ratings as context, never as the sole ranking logic.

Use:

- `[Verified]` for a current primary/official source
- `[Live]` for a current provider result that may still change
- `[Estimate]` for a planning range
- `[Assumption]` for an inferred input
- `[Needs confirmation]` for a material unresolved fact

## Design the itinerary

1. Place confirmed anchors and hard gates first.
2. Work backward from last entry, reserved meals, rural return services, appointments, and departure check-in.
3. Add airport, immigration, baggage, ticket collection, station navigation, platform, transfer, taxi, and walking buffers.
4. Group activities geographically and make every hotel change include a luggage plan.
5. Match anchors to pace:
   - relaxed: 1–2 major anchors
   - balanced: 2–3
   - packed: 3–4 only when geography and energy support it
6. Keep arrival/departure days light.
7. Treat meals as geographic anchors. Reserve only meals worth constraining the day around.
8. Add a weather/fatigue fallback and define when to trigger it.
9. For low-mobility or heat-sensitive travelers, distinguish distance, stairs, elevation, surface, shade, and escape routes—not just kilometers.
10. For multi-city routes, compare orders when elapsed time, cost, or hotel changes materially differ.

Every day should answer:

- What happens and when?
- How do travelers move between stops?
- What is fixed, flexible, or optional?
- Where do they eat, and what is the fallback?
- Where is luggage stored?
- What can make the day fail?
- What is the simplest safe downgrade?

## Make routes usable on the ground

For major transport, show:

- traveler-facing local-language name
- English/transliteration
- Chinese name when the user works in Chinese
- origin, destination, direction display, transfer station, and reserved-seat status
- a segmented map link rather than one overloaded all-day route

For luggage, provide:

- primary option
- at least two realistic backups when capacity is uncertain
- hours, retrieval deadline, payment method, size caveat, and staffed-help fallback
- a useful local-language sentence when staff assistance may be needed

## Build the deliverable

Use [references/output-contract.md](references/output-contract.md) for the smallest complete output.

Default to an HTML review site when the trip is three days or longer, or after the second substantive feedback round. At the start of the work, ask once whether the user wants to change this output default; continue with HTML if they do not request a different format.

When building an HTML plan:

1. Read [references/trip-site-data-contract.md](references/trip-site-data-contract.md).
2. Create a project with the skill-local `scripts/create-trip-project.py`; resolve the path relative to this `SKILL.md`.
3. Populate `trip-data.js`; keep presentation logic in the template.
4. Include overview, stays, day timelines, alternatives, dining, maps, luggage, transport guide, action list, sources, and consolidated feedback where relevant.
5. Validate with the skill-local `scripts/validate-trip-site.mjs`.
6. Keep the existing visual direction unless the user asks for redesign.
7. Update the current artifact in place. Do not create a confusing series of partial versions.

Do not publish while substantive itinerary choices remain open unless the user explicitly asks for a draft deployment. Treat “review first” and “launch” as separate gates.

## Generate the on-trip companion

Treat itinerary confirmation as the trigger to build a mobile travel companion. Do not wait for the public-launch decision.

1. Read [references/travel-companion-data-contract.md](references/travel-companion-data-contract.md).
2. Use the latest confirmed plan as the only source of truth.
3. Recheck time-sensitive schedules, closures, reservations, links, and hard gates before copying them.
4. Create the companion with the skill-local `scripts/create-travel-companion.py`.
5. Populate `companion-data.js` with time-aware events, hard gates, downgrade advice, maps, local-language names, driver cards, guides, bookings, and useful phrases.
6. Validate with the skill-local `scripts/validate-travel-companion.mjs`.
7. Present the companion for review. Publish it only after the launch gate.

Keep the review site and companion distinct:

- the review site supports decisions and unresolved alternatives
- the companion executes confirmed decisions and preserves only explicit contingency branches
- the companion stores progress locally on the device and must not contain booking references, passport data, payment data, or credentials

## Budget, preparation, and safety

State budget scope and currency. Separate transport, accommodation, local movement, food, activities, fees, shopping, and contingency. Use ranges for uncertain inputs and mark live quotes.

Tailor packing, booking timeline, etiquette, entry, health, accessibility, and safety guidance. Use current official sources for visa, medical, legal, and emergency information. Do not store passport numbers, payment details, medical records, credentials, or precise home addresses.

## Quality gate

Before delivery or publication, verify:

- dates, nights, weekdays, and day counts reconcile
- all confirmed bookings appear consistently everywhere
- no stale option is presented as active
- arrival/departure and check-in/out constraints are feasible
- last entry, last train/bus, reservations, and appointments have buffers
- every hotel change has a luggage plan and capacity fallback
- geography, heat, elevation, stairs, and traveler energy are realistic
- named restaurants are the correct branch and current meal service
- map links match the written route
- local/English names are correct for critical transport
- time-sensitive claims include sources and a checked-on date
- feedback controls and copied summaries match the visible plan
- the largest operational risk has a clear downgrade
- the companion, when generated, comes from the latest confirmed plan and contains no stale alternatives
- companion hard gates, progress controls, driver cards, local names, maps, and offline notes work

End a full plan with the next three actions in priority order. After a completed trip, offer a short retrospective and update reusable preferences or the Skill only with explicit permission.
