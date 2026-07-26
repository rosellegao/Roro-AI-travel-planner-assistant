# Release management

Treat release management as a hard completion gate for every change to this Skill, its templates, scripts, references, or interface metadata.

## Versioning

Use semantic versioning:

- **Major:** breaking data-contract, command, template, or migration change
- **Minor:** backward-compatible capability, workflow, template, or output addition
- **Patch:** bug fix, documentation correction, validation improvement, or other compatible change

Do not reuse, skip backward, or silently rewrite a released version.

## Required release sequence

Before saying an update is complete:

1. Read the current `VERSION`.
2. Choose and write the next semantic version.
3. Add the new version at the top of `references/release-history.md`.
4. Record the date, release type, user-visible changes, migration notes, and validation performed.
5. Run `scripts/validate-release.mjs` and the Skill's relevant functional validators.
6. Sync the exact validated Skill into the GitHub repository.
7. Commit with `Release vX.Y.Z: concise summary`.
8. Create the annotated Git tag `vX.Y.Z`.
9. If a remote exists, push the commit and tag; the repository workflow must create the matching GitHub Release.
10. If no remote exists, report that the release is complete locally but not yet published remotely.

Never treat an unversioned change, an updated version without release notes, or a release commit without its matching tag as finished.

## Release-history entry

Use:

```text
## vX.Y.Z - YYYY-MM-DD

- Type: Major | Minor | Patch | Initial
- Summary: one-sentence release outcome
- Changes:
  - user-visible or operational change
- Migration: none, or exact required action
- Validation:
  - checks that passed
```

Keep the newest release first. Do not include secrets, personal trip data, or booking references.

