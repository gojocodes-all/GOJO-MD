# GOJO-MD WhatsApp Bot

GOJO-MD is a modular WhatsApp Multi-Device bot built with Node.js and
[WhiskeySockets Baileys](https://github.com/WhiskeySockets/Baileys). It loads
commands by category, supports public and owner-only modes, and can optionally
answer prompts through the OpenAI API.

> Baileys connects through WhatsApp's linked-device protocol and is not an
> official WhatsApp product. Account restrictions remain possible, especially
> when a bot is used for spam or aggressive automation.

## Features

- QR-based WhatsApp login with persistent multi-file authentication
- Commands discovered automatically from category folders
- Public and owner-only operating modes
- Group, administrator, bot-administrator, and owner permission checks
- Configurable read receipts and typing indicators
- Optional OpenAI-powered question answering

## Requirements

- Node.js and npm
- Git
- A WhatsApp account that can link a new device
- A terminal where you can scan the displayed QR code
- An OpenAI API key only if you want to use the AI commands

## Setup

```bash
git clone https://github.com/gojocodes-all/GOJO-MD.git
cd GOJO-MD
npm install
cp .env.example .env
npm start
```

Edit `.env` before starting the bot. On first launch, scan the QR code from
WhatsApp's **Linked devices** screen. Baileys stores the linked-device
credentials in `session/` so later starts can reconnect without another scan.
Keep that directory private.

For development with automatic restarts, use:

```bash
npm run dev
```

### Termux

```bash
pkg update
pkg install nodejs git -y
git clone https://github.com/gojocodes-all/GOJO-MD.git
cd GOJO-MD
npm install
cp .env.example .env
npm start
```

If you downloaded an archive instead, change into the directory where you
actually extracted it before running the npm commands.

## Configuration

| Variable | Default/example | Purpose |
| --- | --- | --- |
| `BOT_NAME` | `GOJO-MD` | Name shown in menus and status replies. |
| `PREFIX` | `.` | Character placed before commands, such as `.menu`. |
| `OWNER_NUMBER` | `234XXXXXXXXXX` | Owner's WhatsApp number with country code. Punctuation is removed when the bot loads it. |
| `TIMEZONE` | `Africa/Lagos` | Time zone used by date-aware responses. |
| `OPENAI_API_KEY` | empty | Enables the AI commands when set. |
| `OPENAI_MODEL` | `gpt-5.5` | Model requested by the AI command. Choose one available to your API account. |
| `MODE` | `public` | `public` accepts commands from everyone; `private` accepts only the owner. |
| `AUTO_READ` | `false` | Set to `true` to mark incoming command messages as read. |
| `AUTO_TYPING` | `true` | Set to `false` to disable the typing indicator before replies. |

Never commit `.env`, API keys, owner contact details, or the contents of
`session/`. The repository's ignore rules exclude these local files.

## Commands

The examples below use the default `.` prefix. If you change `PREFIX`, use the
new value instead.

| Command | Aliases | Access | Description |
| --- | --- | --- | --- |
| `.menu` | `.help` | Everyone | Show the available command menu. |
| `.ping` | `.speed` | Everyone | Check whether the bot is responding. |
| `.alive` | — | Everyone | Show the bot's current status. |
| `.owner` | — | Everyone | Show the configured owner contact. |
| `.dice` | — | Everyone | Roll a six-sided die. |
| `.ship` | — | Everyone | Produce a playful compatibility result. |
| `.calc` | `.math` | Everyone | Evaluate a supported arithmetic expression. |
| `.quote` | — | Everyone | Return a quote. |
| `.ask` | `.ai`, `.gpt` | Everyone | Ask the configured OpenAI model a question. |
| `.tagall` | `.everyone` | Group administrator | Mention every participant in a group. |
| `.hidetag` | — | Group administrator | Send a message while mentioning all participants. |
| `.kick` | — | Group administrator; bot must be an administrator | Remove the replied-to or mentioned participant. |
| `.promote` | — | Group administrator; bot must be an administrator | Promote the replied-to or mentioned participant. |
| `.demote` | — | Group administrator; bot must be an administrator | Demote the replied-to or mentioned participant. |
| `.mode` | — | Owner | Switch between public and private mode. |
| `.reload` | — | Owner | Reload command modules without restarting the process. |

Commands that require group context or administrator privileges are rejected
when those requirements are not met. In private mode, non-owner commands are
ignored.

## Project structure

```text
commands/       Command modules grouped by category
config.js       Environment parsing and default settings
index.js        WhatsApp connection, reconnect, and command dispatch
lib/context.js  Reply helpers and permission context
lib/loader.js   Command discovery and reload support
lib/parser.js   Prefix and argument parsing
lib/upsert.js   Incoming-message batch processing
test/           Node.js regression tests
```

Each command module exports its name, optional aliases, description, permission
flags, and a `run` function. Add new commands to the appropriate category
under `commands/`; the loader discovers JavaScript command files automatically.

## Development and validation

Run the regression tests with:

```bash
npm test
```

Before opening a pull request, also syntax-check changed JavaScript files with
`node --check <file>`. A live bot connection is not required by the current
unit tests, but starting the bot can create or update sensitive files in
`session/`.

## Troubleshooting

- **No QR code appears:** stop the bot and remove only your local `session/`
  directory, then restart. This resets the bot's linked-device credentials and
  requires a new scan.
- **Owner commands are ignored:** set `OWNER_NUMBER` to the full international
  number, including the country code, and restart the bot.
- **Moderation commands fail:** both the sender and the bot need the permissions
  listed in the command table.
- **AI commands fail:** confirm that `OPENAI_API_KEY` is valid, the configured
  model is available to the account, and the machine has network access.
- **A command is unknown:** run `.menu` to see the commands loaded by the current
  process, or use `.reload` as the owner after adding a command module.

## Responsible use

Use the bot only in chats where participants expect it. Do not use it for spam,
scams, harassment, unauthorized data collection, or attempts to bypass
WhatsApp's rules.
