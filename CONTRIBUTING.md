# Contributing to GOJO-MD

Keep contributions focused on the existing modular WhatsApp bot. Do not commit
real environment values, phone numbers, linked-device credentials, chat
content, or generated runtime data.

## Set up and validate

Use Node.js 20 or newer and install the exact dependency graph:

```bash
npm ci
npm run validate
npm audit --audit-level=high
```

`npm run validate` syntax-checks every project JavaScript file and runs the
regression suite. It does not connect to WhatsApp, require a bot session, or
call OpenAI. GitHub Actions repeats these commands for pull requests targeting
`Main`.

## Add or change a command

Command modules live under `commands/<category>/` and export an object with:

- `name`: required primary command name, without the configured prefix;
- `aliases`: optional alternative names;
- `category`: the menu grouping;
- `description`: user-facing command summary;
- `run(ctx)`: required async command handler.

The dispatcher also recognises these optional permission flags:

| Flag | Effect |
| --- | --- |
| `ownerOnly` | Require the configured owner number. |
| `groupOnly` | Require a WhatsApp group chat. |
| `adminOnly` | Require the sender to be a group administrator. |
| `botAdmin` | Require the bot account to be a group administrator. |

Use the narrowest permissions that match the operation. Group moderation
commands normally combine `groupOnly`, `adminOnly`, and `botAdmin`.

Before opening a pull request:

1. Keep primary names and aliases distinct from existing commands.
2. Use `ctx.reply`, `ctx.send`, or `ctx.react` instead of reaching around the
   existing context boundary unless the WhatsApp operation requires `ctx.sock`.
3. Validate missing arguments and expected chat or permission states.
4. Add or update a focused test under `test/` for parsing, permission, target,
   or batch-processing behavior that can be exercised without a live account.
5. Update the command table in `README.md` when the public command surface or
   access requirements change.
6. Run the complete validation and audit commands above.

During local development, the configured owner can run `.reload` to reload
command modules from disk. Restart the process after changing configuration or
shared startup code.

## Protect private state

- Keep real values in an untracked `.env`; only safe placeholders belong in
  `.env.example`.
- Treat `session/` as account credentials. Never attach it to an issue, pull
  request, build artifact, or log.
- Do not add logging for message bodies, prompts, quoted messages, contacts, or
  participant lists unless the privacy need and redaction strategy are clear.
- Do not weaken owner, group, sender-admin, or bot-admin checks to make a command
  easier to test.
- Avoid automated messaging patterns that could become spam or violate
  WhatsApp's rules.

## Pull request checklist

- Explain the problem, solution, verification, risk, and rollback path.
- Keep behavior compatible unless the change is intentional and tested.
- Update `.github/maintenance-log.md` with the date, rationale, files changed,
  validation, risk level, and rollback note.
- Confirm `git diff --check` reports no whitespace errors.
- Review the complete diff for exposed secrets, private data, permission
  regressions, dependency changes, and command-table accuracy.
