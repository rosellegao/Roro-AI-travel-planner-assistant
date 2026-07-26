# Travel preference file

Use `.travel-planner/preferences.json` only when it already exists or the user explicitly asks to save preferences. Keep it inside the project so it is portable and auditable.

Recommended schema:

```json
{
  "schema_version": 1,
  "updated_at": "YYYY-MM-DD",
  "home_airports": [],
  "default_currency": "",
  "budget_style": "budget|mid-range|comfort|luxury",
  "pace": "relaxed|balanced|packed",
  "accommodation": {
    "preferred_types": [],
    "must_haves": [],
    "avoid": []
  },
  "interests": [],
  "dislikes": [],
  "dietary_requirements": [],
  "dining": {
    "favorite_cuisines": [],
    "disliked_foods": [],
    "meal_budget": "",
    "preferred_atmosphere": [],
    "queue_tolerance": "",
    "reservation_willingness": ""
  },
  "accessibility_needs": [],
  "languages": [],
  "usual_companions": "",
  "transport_preferences": [],
  "visited_destinations": [],
  "wishlist": [],
  "notes": []
}
```

Rules:

- Ask before saving or changing any preference.
- Store only information the user supplied intentionally.
- Do not store passport numbers, booking references, payment details, medical records, passwords, API keys, or precise home addresses.
- Let trip-specific instructions override saved defaults.
- When a saved preference materially shapes the plan, mention it briefly.
- Remove or correct a preference when the user asks; do not preserve stale conflicts.
