# Maintenance log

## 2026-10-08 — Support reply-based moderation targets

### Rationale

The README documented that `kick`, `promote`, and `demote` accept either a mention or a reply, but the implementation only read the first explicit mention. Replying to a participant's message without tagging them always produced the missing-target response.

### Files changed

- `lib/message.js` — centralize supported message text and reply-context extraction.
- `lib/parser.js` — preserve the replied-to participant alongside quoted content and mentions.
- `lib/target.js` — resolve a moderation target consistently, preferring an explicit mention over a reply.
- `commands/group/kick.js`, `promote.js`, and `demote.js` — use the shared resolver and accurate prompts.
- `test/message-target.test.js` — cover message context, mention precedence, reply fallback, and missing targets.
- `.github/maintenance-log.md` — record this maintenance work.

### Validation

- Ran `npm test` (seven tests).
- Ran `node --check` across every changed or added application, command, library, and test JavaScript file.
- Verified the branch tree and reviewed the complete diff.

### Risk

Low. Existing explicit-mention behavior and permission checks are preserved. The commands gain the documented reply fallback; no dependency, authentication, session, or network behavior changes.

### Rollback

Revert the pull request's squash commit to restore mention-only moderation targeting.

## 2026-10-04 — Limit read receipts to command messages

### Rationale

When `AUTO_READ=true`, the message handler marked every incoming WhatsApp message as read before checking whether it used the configured command prefix. This contradicted the documented command-only setting and could acknowledge ordinary chat messages that the bot otherwise ignores.

### Files changed

- `index.js` — identify command messages before sending optional read receipts.
- `lib/command.js` — centralize the command-prefix predicate.
- `test/command.test.js` — cover configured prefixes and ignored ordinary, empty, and malformed messages.
- `.github/maintenance-log.md` — record this maintenance work.

### Validation

- Ran `npm test`.
- Ran `node --check` across application, command, library, and test files.
- Ran `git diff --check` and reviewed the complete diff.

### Risk

Low. Command dispatch and command read receipts are preserved. Only non-command messages stop being marked as read when `AUTO_READ` is enabled.

### Rollback

Revert the pull request's squash commit to restore read receipts before command filtering.

## 2026-09-29 — Document setup and protect local bot state

### Rationale

The setup guide did not explain the complete configuration, command permission model, project structure, linked-device session behavior, or development workflow. The repository also tracked a duplicate local environment file, included a specific owner number in its example, and did not ignore Baileys session credentials or generated data.

### Files changed

- `README.md` — document requirements, setup, Termux usage, configuration, commands and permissions, project structure, validation, troubleshooting, and responsible use.
- `.env.example` — replace the owner contact with a safe international-format placeholder.
- `.env` — stop tracking the duplicate local environment file.
- `.gitignore` — exclude linked-device credentials and generated data.
- `.github/maintenance-log.md` — record this maintenance work.

### Validation

- Ran `npm test`.
- Ran `node --check` across application, command, library, and test files.
- Cross-checked documented environment variables, command aliases, permissions, scripts, and paths against the implementation.
- Ran `git diff --check` and reviewed the complete diff.

### Risk

Low. Runtime code and dependencies are unchanged. Existing local `.env`, `session/`, and `data/` files remain on developers' machines; this change only stops tracking the duplicate environment file and prevents future local state from being added accidentally.

### Rollback

Revert the pull request's squash commit to restore the previous documentation and tracked-file state.

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
