const makeWASocket = require('@whiskeysockets/baileys').default;
const {
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  jidNormalizedUser
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const qrcode = require('qrcode-terminal');
const { loadCommands } = require('./lib/loader');
const { parseMessage } = require('./lib/parser');
const { createContext } = require('./lib/context');
const config = require('./config');

let commands = loadCommands();

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
    browser: ['GOJO-MD', 'Chrome', '1.0.0'],
    logger: pino({ level: 'silent' })
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log('\nScan this QR in WhatsApp > Linked Devices:\n');
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'open') {
      const id = jidNormalizedUser(sock.user.id);
      console.log(`✅ ${config.botName} is online as ${id}`);
    }

    if (connection === 'close') {
      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
      const shouldReconnect = reason !== DisconnectReason.loggedOut;
      console.log('Connection closed:', reason, shouldReconnect ? 'reconnecting...' : 'logged out');
      if (shouldReconnect) startBot();
      else console.log('Delete /session and scan again if you want to relink.');
    }
  });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    const raw = messages[0];
    if (!raw?.message || raw.key.fromMe) return;

    try {
      if (config.autoRead) await sock.readMessages([raw.key]);

      const msg = await parseMessage(sock, raw);
      if (!msg.body || !msg.body.startsWith(config.prefix)) return;

      const ctx = await createContext(sock, msg, commands);
      const commandName = msg.command.toLowerCase();
      const command = commands.get(commandName) || [...commands.values()].find(c => c.aliases?.includes(commandName));

      if (!command) return ctx.reply(`Unknown command: ${commandName}\nUse ${config.prefix}menu`);

      if (config.mode === 'private' && !ctx.isOwner) return;
      if (command.ownerOnly && !ctx.isOwner) return ctx.reply('Owner-only command.');
      if (command.groupOnly && !ctx.isGroup) return ctx.reply('This command only works in groups.');
      if (command.adminOnly && !ctx.isAdmin) return ctx.reply('You need to be a group admin.');
      if (command.botAdmin && !ctx.isBotAdmin) return ctx.reply('Make the bot admin first.');

      if (config.autoTyping) await sock.sendPresenceUpdate('composing', msg.chat);
      await command.run(ctx);
    } catch (err) {
      console.error('Command error:', err);
      await sock.sendMessage(raw.key.remoteJid, { text: 'Bot error. Check Termux logs.' }, { quoted: raw });
    }
  });
}

process.on('SIGINT', () => process.exit(0));
startBot();
