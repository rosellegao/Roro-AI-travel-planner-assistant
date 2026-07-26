# Release history

## v1.0.0 - 2026-07-26

- Type: Initial
- Summary: Establish the first formally versioned Travel Planner Studio release.
- Changes:
  - Create source-checked multi-day travel-planning and interactive review-site workflows.
  - Save opt-in traveler defaults and confirm them once at the start of each trip.
  - Default to HTML review for trips of three days or more or after two substantive feedback rounds.
  - Generate a separate time-aware mobile companion after itinerary confirmation.
  - Include maps, dining verification, luggage fallbacks, local names, hard gates, progress controls, driver cards, guides, and offline downgrade advice.
  - Add deterministic generators and validators for both review sites and on-trip companions.
  - Enforce semantic versioning, release notes, Git tags, and GitHub Releases.
- Migration: Existing projects should invoke `$travel-planner-studio`; no data migration is required.
- Validation:
  - Skill structure validation passed.
  - Interactive review-site generator and validator passed.
  - Mobile companion generator and validator passed.
  - Source Skill and GitHub repository copy matched byte-for-byte before release preparation.

