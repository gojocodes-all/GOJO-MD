# Maintenance log

## 2026-09-22 — Process complete message batches

### Rationale

Baileys can deliver more than one message in a `messages.upsert` event, but the bot read only `messages[0]`. Any additional commands in the same notification batch were silently dropped.

### Files changed

- `index.js` — process every eligible incoming message in order while preserving per-message validation and error handling.
- `lib/upsert.js` — centralize filtering of notify events, outbound messages, and empty message records.
- `test/upsert.test.js` — cover multi-message batches and ignored upsert records.
- `package.json` — add the repository's first repeatable test command.
- `.github/maintenance-log.md` — record this maintenance work.

### Validation

- Ran `npm test`.
- Ran `node --check` across application, command, library, and test files.
- Ran `git diff --check` and reviewed the complete diff.

### Risk

Low. Single-message behavior is preserved. Multi-message notification batches now process each valid incoming record sequentially, preventing dropped commands without adding concurrency or dependencies.

### Rollback

Revert the pull request's squash commit to restore first-message-only handling.
