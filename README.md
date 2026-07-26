# Travel Planner Studio

A reusable Codex skill for turning bookings, preferences, live research, maps, dining options, luggage plans, and iterative feedback into an executable trip plan and a mobile on-trip companion.

## Defaults

- At the start of a new trip, summarize the saved traveler defaults once and let the user override them.
- For trips of three days or more, or after two substantive feedback rounds, default to an interactive HTML review site.
- After the itinerary content is confirmed, generate a separate mobile travel companion.
- Batch non-blocking questions after a useful first draft.
- Keep confirmed bookings, recommended plans, alternatives, and unresolved items distinct.
- Verify time-sensitive transport, restaurant, map, and operational details before presenting them as current.

## Use in a Codex project

1. Copy the repository's `.agents` folder into the root of a Codex project.
2. Optionally copy `.travel-planner/preferences.example.json` to `.travel-planner/preferences.json` and edit it.
3. Start a task with:

   `Use $travel-planner-studio to plan my trip. First confirm whether I want to change my saved defaults.`

4. When the plan is confirmed, the skill will create the companion with next-step timing, hard gates, progress controls, downgrade advice, maps, driver cards, destination guides, bookings, and useful local phrases.

Personal preferences belong in `.travel-planner/preferences.json`. This repository ignores that file so it is not uploaded accidentally.

## Upload this folder to GitHub

Create an empty GitHub repository, then run the following commands from this folder:

```text
git init
git add .
git commit -m "Add Travel Planner Studio skill"
git branch -M main
git remote add origin https://github.com/YOUR-USER/travel-planner-studio.git
git push -u origin main
```

If GitHub asks for authentication, sign in through GitHub Desktop, the GitHub CLI, or a browser-based credential prompt. Do not put a password or access token in this repository.

## Included

- Skill instructions and production workflow
- Japan and dining research playbooks
- Interactive trip-site template
- Mobile on-trip companion template
- Trip project generator
- Trip-site and companion validators
- Generic preference example
