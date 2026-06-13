# GOJO-MD WhatsApp Bot

A modular WhatsApp Multi-Device bot built with Node.js + WhiskeySockets Baileys.

## Termux install

```bash
pkg update && pkg upgrade -y
pkg install nodejs git unzip -y
cd /sdcard/Download/gojo-md-bot
npm install
cp .env.example .env
nano .env
npm start
```

Scan QR from WhatsApp > Linked Devices > Link a device.

## Commands

Default prefix is `.`. Try:

```txt
.menu
.ping
.alive
.owner
.help kick
.ask explain JavaScript in simple words
.kick @user
.tagall message
.calc 2*(10+5)
```

## Safety

Do not use for spam, mass unsolicited messaging, scams, or harassment. WhatsApp can restrict accounts that automate aggressively.
