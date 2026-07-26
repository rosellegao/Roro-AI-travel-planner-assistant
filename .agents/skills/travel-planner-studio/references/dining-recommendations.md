# Dining recommendations

Recommend restaurants that fit the itinerary and traveler, not a generic popularity list.

## Collect the decision inputs

Use known trip preferences first. Ask only for missing factors that materially change the shortlist:

- neighborhood, date, meal, and acceptable travel radius
- cuisine or dishes sought and foods disliked
- price per person, including drinks or excluding them
- dietary restrictions, allergies, religious requirements, and cross-contamination sensitivity
- casual, local, lively, scenic, romantic, child-friendly, or fine-dining atmosphere
- willingness to queue, reserve, prepay, provide a card guarantee, or use a hotel concierge
- counter/table preference, accessibility, smoking tolerance, and children in the party

## Research in source order

1. Restaurant official website or official booking page.
2. Official hotel/restaurant group page when the venue has several branches.
3. Local reservation and review platforms with recent activity.
4. Michelin or another professional guide for editorial selection.
5. Recent maps/reviews for operational warnings and diner sentiment.
6. Social media only for recent atmosphere, menus, or temporary notices; do not treat influencer popularity as quality proof.

Cross-check every named restaurant with at least two sources when possible. One must be the restaurant or its authorized booking page for hours, menu, price, and reservation policy.

## Verify each candidate

Confirm during the current task:

- exact name in local language and English/transliteration
- correct branch and full address or map link
- current operating status and official contact/booking URL
- relevant meal service, opening days, hours, and last order
- cuisine, signature dishes, and current menu type
- realistic price per person and whether tax, service, drinks, cover, or booking fees are included
- reservation availability or walk-in/queue policy
- cancellation, no-show, prepayment, and card-guarantee terms
- dietary and allergy fit; distinguish explicit confirmation from inference
- children, accessibility, dress, smoking, seating, and time-limit rules when relevant

If a material field cannot be verified, label it `[Needs confirmation]`. Never infer that a venue can accommodate an allergy from menu appearance alone.

## Select, do not dump

For each important meal, return:

- one best fit
- one nearby alternative with a different tradeoff
- one low-friction fallback when queues, closures, or fatigue are plausible

Normally recommend no more than 3-5 restaurants per city unless the user asks for a food guide. Explain why each one fits this traveler and this day.

Balance the trip across:

- destination specialties and seasonal food
- high-value everyday meals and one or two memorable anchors
- different formats, such as market breakfast, noodle shop, izakaya, regional specialty, and fine dining
- geographic fit with the day's activities

Do not overbook every meal. A reservation that forces cross-city travel or removes useful flexibility is a planning defect.

## Present a decision-ready shortlist

| Meal/date | Recommendation | Why it fits | Area/detour | Price pp | Booking | Dietary fit | Confidence |
|---|---|---|---|---:|---|---|---|

Under the table, list:

- what to order
- exact booking link or walk-in strategy
- cancellation deadline and financial exposure
- arrival buffer and table-time limit
- fallback within the same area
- `checked on` date

Keep ratings in context. Do not rank venues by a single platform score or review count. Mention score systems only when they help interpret local sentiment.

For an interactive trip site, show the rating source and `checked on` date next to the score. Remove restaurants that no longer fit the confirmed route instead of leaving them as distracting options.

Mark which meals are:

- confirmed reservations that constrain the day
- advance-reservation recommendations
- walk-in choices
- neighborhood fallbacks

If arrival, transport, or an appointment removes a meal window, delete that meal from the schedule rather than forcing an unrealistic stop.

## Booking boundary

Research and prepare booking steps without approval. Do not place a reservation, submit contact/payment information, accept cancellation terms, or make a deposit unless the user explicitly authorizes that action after seeing the terms.
